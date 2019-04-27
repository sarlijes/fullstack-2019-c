
// const course = [
//   {
//     id: 1,
//     name: 'Half Stack -sovelluskehitys',
//     parts: [
//       {
//         name: 'Reactin perusteet',
//         exercises: 10
//       },
//       {
//         name: 'Tiedonvälitys propseilla',
//         exercises: 7
//       },
//       {
//         name: 'Komponenttien tila',
//         exercises: 14
//       }
//     ]
//   }
// ]

const notes = [
  {
    id: 1,
    content: 'HTML on helppoa',
    date: '2017-12-10T17:30:31.098Z',
    important: true,
  },
  {
    id: 2,
    content: 'Selain pystyy suorittamaan vain javascriptiä',
    date: '2017-12-10T18:39:34.091Z',
    important: false,
  },
  {
    id: 3,
    content: 'HTTP-protokollan tärkeimmät metodit ovat GET ja POST',
    date: '2017-12-10T19:20:14.298Z',
    important: true,
  },
]

// let courseNames = courses.map( => key = course.id course = course);
// console.log('', courseNames)

// let courseNames = course.parts.map((part) => part);
// console.log('', courseNames)


const result = notes.map(note => note.content)
console.log(result)

const result = notes.map(note => {note.content} )
console.log(result)


// let names = [];
// for (let i = 0; i < course.length; i++) {
//   console.log('', course.length)
//   console.log('name',course.parts)
//   names.push(course.parts)
// }
// console.log('', names);