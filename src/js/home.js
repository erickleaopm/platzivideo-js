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

  function videoItemTemplate(movie) {
    return (
      `<div class="primaryPlaylistItem">
        <div class="primaryPlaylistItem-image">
          <img src="${movie.medium_cover_image}">
        </div>
        <h4 class="primaryPlaylistItem-title">
          ${movie.title}
        </h4>
      </div>`
    )
  }

  function createTemplate(HTMLString) {
    // $actionContainer.innerHTML += HTMLString
    const html = document.implementation.createHTMLDocument()
    html.body.innerHTML = HTMLString
    return html.body.children[0]
  }

  function renderMovieList(list, $container) {
    //actionList.data.movies
    $container.children[0].remove()
    list.forEach((movie) => {
      const HTMLString = videoItemTemplate(movie)
      const movieElement = createTemplate(HTMLString)
      $container.append(movieElement)
    })
  }

  // GET List of Movies
  const actionList =  await getData('https://yts.am/api/v2/list_movies.json?genre=action')
  const dramaList =  await getData('https://yts.am/api/v2/list_movies.json?genre=drama')
  const animationList =  await getData('https://yts.am/api/v2/list_movies.json?genre=animation')
  
  // Render Movie List
  const $actionContainer = document.querySelector('#action')
  renderMovieList(actionList.data.movies, $actionContainer)
  
  const $dramaContainer = document.getElementById('drama')
  renderMovieList(dramaList.data.movies, $dramaContainer)

  const $animationContainer = document.getElementById('animation')
  renderMovieList(animationList.data.movies, $animationContainer)

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

  //console.log(videoItemTemplate('src/images/covers/bitcoin.jpg', 'Bitcoins'))
})()

