
let animals = [
  { name: 'Fluttkins', species: 'rabbit'},
  { name: 'Caro', species: 'dog'},
  { name: 'Hamilton', species: 'dog'},
  { name: 'Harold', species: 'fish'},
  { name: 'Ursula', species: 'cat'},
  { name: 'Jimmy', species: 'cat'}
]



// Map

var names = animals.map((animal) => animal.name);
console.log(names)

// var names = animals.map(function(animal) {
//   return animal.name + ' is a ' + animal.species;
// });
// console.log(names)
// console.log(names[0])

// For loop

// let names2 = [];
// for (let i = 0; i < animals.length; i++) {
//   names2.push(animals[i].name);
// }
// console.log(names2);

