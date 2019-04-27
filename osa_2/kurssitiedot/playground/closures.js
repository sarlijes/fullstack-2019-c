
// Closures

// traditional not closure type
// function greetMe2(me) {
//   console.log('Hello, ' + me + '!' )
// }
// greetMe2('Bruce Wayne')

let me = 'Bruce Wayne'
function greetMe() {
  console.log('Hello, ' + me + '!' )
}
me = 'Batman'
greetMe()


