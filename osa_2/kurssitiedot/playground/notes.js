
  const course = {
    name: 'Half Stack -sovelluskehitys',
    parts: [
      {
        name: 'Reactin perusteet',
        exercises: 10
      },
      {
        name: 'Tiedonvälitys propseilla',
        exercises: 7
      },
      {
        name: 'Komponenttien tila',
        exercises: 14
      }
    ]
  } 

// console.log('',course.name);
// console.log('', course.parts);
// console.log('',course.parts[0].name);

// var parts = course.map((part) => part.name)
// console.log('',parts)

// let courseNames = course.parts.map((part) => part.name);
// console.log('',courseNames);

let courseNames = course.parts.map((part) => part);
console.log('',courseNames)

let courseNames2 = course.parts.map((part) => part);
console.log('',courseNames2[0].name);

console.log('----------------')

// let names = [];
// for (let i = 0; i < course.parts.length; i++) {
//   console.log('name',course.parts[i].name)
//   names.push(course.parts[i].name)
// }
// console.log('', names);