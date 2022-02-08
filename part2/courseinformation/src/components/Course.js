// doing so because this is a react component; 
import React from 'react'; 

// Header Component to display the Class Description;
const Header = () => {
    return(
        <h1>Web Development Curriculum</h1>
    )
}

// Content Component will display headers, class names, and class exercises;
// It will also display the total sum of exercises for each group; 
const Content = (props) => {
    
    const content = props.course.map(courses =>
        <div key={courses.id}>
            <h3>{courses.name}</h3>
            {courses.parts.map(part => 
                <div key={part.id}>
                    <p>{part.name} {part.exercises}</p>
                </div>
            )}
            <div key={courses.id}>
                <h4>
                    Total of {courses.parts.reduce(
                        (currentValue, previousValue) => 
                            currentValue + previousValue.exercises
                    ,0)} exercises
                </h4>
                <hr/>
            </div>
            
        </div>
    )
    return(
        <div>
            {content}
        </div>
    )
}

const Course = ({course}) => {

    return (
        <div>
            <Header />
            <hr/>
            <Content course={course}/>
        </div>
    )
}
export default Course;