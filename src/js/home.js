console.log('hola mundo!');
const noCambia = "Leonidas";

let cambia = "@LeonidasEsteban"

function cambiarNombre(nuevoNombre) {
  cambia = nuevoNombre
}

/** Las promesas al igual que las funciones reciben argumentos. */
const getUser = new Promise(function(todoBien, todoMal) {
  //llamar a un api
  // setInterval
  setTimeout(function() {
    //luego de 3 segundos
    // todoBien()
    todoBien('Todo bien, aquí está el usuario.')
  }, 3000)
})

const getUserAll = new Promise(function(todoBien, todoMal) {
  //llamar a un api
  // setInterval
  setTimeout(function() {
    //luego de 3 segundos
    // todoBien()
    todoBien('Todo bien, aquí está el listado de todos los usuarios.')
  }, 5000)
})

// getUser
//   .then(function() {
//     console.log('Todo está bien en la vida')
//   })
//   .catch(function(message) {
//     console.log(message)
//   })

/** Para evaluar múltiples promesas */
// Promise.all([
//   getUser,
//   getUserAll
// ])
//   .then(function(message) {
//     console.log(message)
//   })
//   .catch(function(message) {
//     console.log(message)
//   })

/** Muestra el resultado de la primer promesa que se cumple */
// Promise.race([
//   getUser,
//   getUserAll
// ])
//   .then(function(message) {
//     console.log(message)
//   })
//   .catch(function(message) {
//     console.log(message)
//   })

$.ajax('https://randomuser.me/api/dsajhdahk', {
  method: 'GET',
  dataType: 'json',
  success: function(data) {
    console.log(data);
  },
  error: function(error) {
    console.log(error)
  }
})

fetch('https://randomuser.me/api/')
.then(function(response) {
  // console.log(response)
  return response.json()
})
.then(function(user){
  console.log('user', user.results[0].name.first)
})
.catch(function (error) {
  console.log(error)
})