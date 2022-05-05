console.log(a + '11')

var a = 100
// var a
function foo() {
  console.log(a + '22')
  var a = 200
  console.log(a + '33')
}

foo()
console.log(a + '44')

