const http = require('http'); 
const express = require('express'); 
const app = express();

app.use(express.json());

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


app.get('/', (request, response) => {
    response.send('<h1>Hello World<h1>'); 
})

app.get('/api/persons', (request, response) => {
    response.json(persons)
})

// making an information page that will show the number of people in the phonebook and the current 
// time the request was made
const phonebook = () => {

    return persons.length;
}

const currentTime = () => {
    return new Date(); 

}


app.get('/api/info', (request, response) => {
    response.send(`<p>Phonebook has info for ${phonebook()} people<p>
    <p>${currentTime()}<p>
    `)
})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)

    const person = persons.find(person => person.id === id); 

    if(person){
        response.json(person)
    }
    else
    {
        response.status(404)
        response.send(`Page does not exist.`)
    }
    response.json(person)
})

app.delete('/api/persons/:id', (request, response) => {

    const id = Number(request.params.id); 
    
    persons = persons.filter(person => person.id !== id);
    
    response.status(204).end(); 
})

// post new person contact 
const generateId = () => {
    const maxId = persons.length > 0 
    ? Math.max(...persons.map(n => n.id))
    : 0 
    return maxId + 1;
}

app.post('/api/persons', (request, response) => {

    const body = request.body; 
    
    console.log(body)
    if(!body.name || !body.number){
        return response.status(400).json({
            error:'both name and number fields must be filled'
        })
    }

    if(persons.find(person => person.name.toLowerCase() === body.name.toLowerCase()) !== undefined)
    {
        return response.status(400).json({
            error:'name must be unique'
        })
    }

    

    const person = {
        name: body.name, 
        number: body.number, 
        id: generateId(),
    }

    persons = persons.concat(person); 

    response.json(body)
})




const PORT = 3001; 

app.listen(PORT)

console.log(`App listening on port ${PORT}`)