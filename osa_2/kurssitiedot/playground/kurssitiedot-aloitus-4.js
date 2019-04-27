import React from 'react'
import ReactDOM from 'react-dom'

const Course = ({ course }) => {
  return (
    <div>
      <Header name={course.name} />
      <Content parts={course.parts} />
      <Part parts={course.parts} />
    </div>
  )
}

const Header = ({ name }) => {
  console.log(name)
  return (
    <div>
      <h1>{name}</h1>
    </div>
  )
}

const Part = ({ part }) => {
  return (
    <div>
      {part.name} {part.exercises}
    </div>
  )
}

const Content = ({ parts }) => (
  <div>
    {parts.map(part => (
      <Part key={part.id} part={part} />
    ))}
  </div>
);

// {courses.map(course => (
//   <Course key={course.id} course={course} />
// ))}



const App = () => {
  const courses = [
    {
      name: 'Half Stack -sovelluskehitys',
      id: 1,
      parts: [
        {
          name: 'Reactin perusteet',
          exercises: 10,
          id: 1
        },
        {
          name: 'Tiedonvälitys propseilla',
          exercises: 7,
          id: 2
        },
        {
          name: 'Komponenttien tila',
          exercises: 14,
          id: 3
        }
      ]
    },
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewaret',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  return (
    <div>
      {courses.map(course => (
        <Course key={course.id} course={course} />
      ))}
    </div>
  )
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)