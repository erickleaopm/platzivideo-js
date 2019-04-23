console.log('hola mundo!');
const noCambia = "Erick";

let cambia = "@erickleaopm"

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
});

(async function load() {
  // await
  // action
  // drama
  // animation
  async function getData(url) {
    const response = await fetch(url)
    const data = await response.json()
    return data
  }
  const actionList =  await getData('https://yts.am/api/v2/list_movies.json?genre=action')
  const dramaList =  await getData('https://yts.am/api/v2/list_movies.json?genre=drama')
  const animationList =  await getData('https://yts.am/api/v2/list_movies.json?genre=animation')
  console.log(actionList, dramaList, animationList)

  // Containers
  const $actionContainer = document.querySelector('#action')
  const $dramaContainer = document.getElementById('drama')
  const $animationContainer = document.getElementById('animation')

  const $featuringContainer = document.getElementById('featuring')
  const $form = document.getElementById('form')
  const $home = document.getElementById('home')

  // const $home = $('.home .list #item')
  const $modal = document.getElementById('modal')
  const $overlay = document.getElementById('overlay')
  const $hideModal = document.getElementById('hide-modal')

  // Se busca dentro de modal
  const $modalTitle = $modal.querySelector('#modal h1')
  const $modalImage = $modal.querySelector('#modal img')
  const $modalDescription = $modal.querySelector('#modal p')
})()

