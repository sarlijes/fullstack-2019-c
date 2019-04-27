import React from 'react'
import ReactDOM from 'react-dom'


// const Course = (props) => {
//   return (
//     <div>
//       <i>Course: {props.course[0].name}</i>
//     </div>
//   )
// }

const Note = ({ note }) => {
  return (
    <li>{note.id} {note.name} {note.exercises}</li>
  )
}

const App = () => {
  const notes = [
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

    const rows = () =>
    notes.map(note =>
      <Note
        key={note.id}
        note={note}
      />
    )

    return (
      <div>
        <h1>Muistiinpanot</h1>
        <ul>
          {rows()}
        </ul>
      </div>
    )
}

// <Course course={course.parts} />

ReactDOM.render(React.createElement(App, null), 
document.getElementById('root'))