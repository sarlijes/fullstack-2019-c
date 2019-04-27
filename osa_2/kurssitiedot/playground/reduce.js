
var orders = [
  { amount: 250 },
  { amount: 400 },
  { amount: 100 },
  { amount: 325 }
]

// Reduce

let totalAmount = orders.reduce((sum, order) => sum + order.amount, 0)
console.log('', totalAmount)

let totalAmount2 = orders.reduce(function(sum, order) {
  // console.log('', sum , order)
  return sum + order.amount
}, 0)
console.log('', totalAmount2)

// For loop

// let totalAmount = 0;
// for (let i = 0; i < orders.length; i++) {
//   totalAmount += orders[i].amount;
// }
// console.log('', totalAmount);