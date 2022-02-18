const http = require('http'); // imports nodes built-in web server module; 
const express = require('express'); // imports express for ease of server side development; 
const morgan = require('morgan'); // import morgan middleware to log events in the server; 
const app = express(); // creates an instance of express; 


// activates the express json-parser to send all information in json format; 
app.use(express.json());


/* using the morgan middleware to log the following data: 

    1. request method being used to handle the event; 
    2. http status code; 
    3. response time of the request. 
    4. body content of the request

*/
morgan.token('body', (req, res) => JSON.stringify(req.body));
app.use(morgan(':method :url :status :response-time ms - :body'));


// hardcoded resources; 
let persons = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]



// root endpoint of the api will simply send hello world; 
app.get('/', (request, response) => {
    response.send('hello world'); 
})


// get request to retrieve the persons resources from above; 
app.get('/api/persons', (request, response) => {
    response.json(persons)
})



// simple functions that capture the length and the current date. 
const resources = () => {

    return persons.length;
}

const currentTime = () => {
    return new Date(); 

}

// sends the number of resources and current time to the info endpoint; 
app.get('/api/info', (request, response) => {
    response.send(`<p>Phonebook has info for ${resources()} people<p>
    <p>${currentTime()}<p>
    `)
})



// get request to retrieve a specific resource; 
app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)

    // using the find method we locate the resource id send the response in json format; 
    // if the Resource ID does not exist, we respond with a 404 Page Not Found Http response.
    const person = persons.find(person => person.id === id); 

    if(person){
        response.json(person)
    }
    else
    {
        response.status(404).send("Page does not exist.")
    }
    response.json(person)
})


// delete request to remove a resource
app.delete('/api/persons/:id', (request, response) => {

    const id = Number(request.params.id); 
    
    persons = persons.filter(person => person.id !== id);
    
    response.status(201).json({
        message:"Resource was successfully deleted"
    }).end(); 
})

/* 
    function to generate a new ID for the new resource. the function says if the length is greater than 0 then we want to locate the max ID 
    using the map function if true, otherwise if false we will return 0. finally we increment that value by one. 
*/
const generateId = () => {
    const maxId = persons.length > 0 
    ? Math.max(...persons.map(n => n.id))
    : 0 
    return maxId + 1;
}


// post request
app.post('/api/persons', (request, response) => {

    // setting body to the body property of the request
    const body = request.body; 
    
    // logging the body, will be blank only until we actually execute a post request; 
    console.log(body)

    // if either the name or number are falsey, then the app will respond with a 400 http response 
    // which is a bad request. this is something percieved to be a client error; 
    if(!body.name || !body.number){
        return response.status(400).json({
            error:'both name and number fields must be filled'
        })
    }

    // if a name matches a name in the phonebook the user will again receive a 400 http client error response.
    if(persons.find(person => person.name.toLowerCase() === body.name.toLowerCase()) !== undefined)
    {
        return response.status(400).json({
            error:'name must be unique'
        })
    }

    // if conditions are satisfied our person object is created and in it we call the generteId function from above to 
    // create the new ID. 
    const person = {
        name: body.name, 
        number: body.number, 
        id: generateId(),
    }


    // we concatenate the person object/resource to our existing persons array; 
    persons = persons.concat(person); 

    // the response that is logged is a 201 http successfully created response. 
    // with the successful message, and the body content of the post. 
    response.status(201).json({ 
        message: 'The request succeded, and the new resource was created.',
        body: body
    }).end(); 

})

// custome middleware function that receives three parameters 
// this is done without any sort of middleware library; 
const requestLogger = (request, response, next) => {
    console.log('Method:', request.method)
    console.log('Path: ', request.path)
    console.log('Body: ', request.body)
    console.log('---')
    next(); 
}

// middleware functions are called in the order that they're taken into use with the express server object's use method; 
app.use(requestLogger); 

// when the user has entered an unknown endpoint in the api address, they will be presented with a 404 error. 
const unknownEndpoint = (request, response) => {
    response.status(404).send({error: 'unknown endpoint'})
}


// middlewares are called in the order that they are taken into use
app.use(unknownEndpoint); 


//declaring the constanct port variable; 
const PORT = 3001; 

// listening on port 3001 
app.listen(PORT)

console.log(`App listening on port ${PORT}`)


