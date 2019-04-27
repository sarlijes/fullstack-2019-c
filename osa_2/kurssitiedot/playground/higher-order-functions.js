// function triple(x){
//   return x * 3;
// } 

// let triple=(x) => x * 3;
// console.log(triple(3))

// let waffle = triple;
// console.log(waffle(2))



let animals = [
  { name: 'Fluttkins', species: 'rabbit'},
  { name: 'Caro', species: 'dog'},
  { name: 'Hamilton', species: 'dog'},
  { name: 'Harold', species: 'fish'},
  { name: 'Ursula', species: 'cat'},
  { name: 'Jimmy', species: 'cat'}
]

// Old for loop style

// var dogs = [];
// for (let i= 0; i < animals.length; i++) {
//   if(animals[i].species === 'dog')
//     dogs.push(animals[i]);
// }
// console.log('dogs: ', dogs)

// Filter

let isDog = animals.filter(function(animal) {
  return animal.species == 'dog';
});
console.log('isDog', isDog)


let name_Ursula = animals.find(function(animal) {
  return animal.name === 'Ursula';
});
console.log('ursula', name_Ursula)

// Longer way separate filtering

// let isDog2 = function(animals) {
//   return animals.species === 'dog';
// }
// let dogs2 = animals.filter(isDog2);
// console.log('isDog', dogs2);


