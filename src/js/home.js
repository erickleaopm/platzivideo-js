// console.log('hola mundo!');
// const noCambia = "Erick";

// let cambia = "@erickleaopm"

// function cambiarNombre(nuevoNombre) {
//   cambia = nuevoNombre
// }

// /** Las promesas al igual que las funciones reciben argumentos. */
// const getUser = new Promise(function(todoBien, todoMal) {
//   //llamar a un api
//   // setInterval
//   setTimeout(function() {
//     //luego de 3 segundos
//     // todoBien()
//     todoBien('Todo bien, aquí está el usuario.')
//   }, 3000)
// })

// const getUserAll = new Promise(function(todoBien, todoMal) {
//   //llamar a un api
//   // setInterval
//   setTimeout(function() {
//     //luego de 3 segundos
//     // todoBien()
//     todoBien('Todo bien, aquí está el listado de todos los usuarios.')
//   }, 5000)
// })

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

// $.ajax('https://randomuser.me/api/dsajhdahk', {
//   method: 'GET',
//   dataType: 'json',
//   success: function(data) {
//     console.log(data);
//   },
//   error: function(error) {
//     console.log(error)
//   }
// })

// fetch('https://randomuser.me/api/')
// .then(function(response) {
//   // console.log(response)
//   return response.json()
// })
// .then(function(user){
//   console.log(user)
//   console.log('user', user.results[0].name.first)
// })
// .catch(function (error) {
//   console.log(error)
// });

(async function load() {
  
  const BASE_API = 'https://yts.am/api/v2/'

  // await
  async function getData(url, type = 'movie') {
    const response = await fetch(url)
    const data = await response.json()
    switch(type) {
      case 'user': {
        return data
      }
      default: {
        if(data.data.movie_count > 0) {
          return data
        }
        throw new Error('No se encontró ningún resultado.')
      }
    }
  }

  async function cacheExist(category) {
    switch(category) {
      case 'user': {
        const cacheUser = window.localStorage.getItem('user')
        if(cacheUser) {
          return JSON.parse(cacheUser)
        } else {
          const { results: { 0: user } } = await getData(`https://randomuser.me/api/`, 'user')
          window.localStorage.setItem('user', JSON.stringify(user))
          
          return user
        }
        break
      }
      case 'friends': {
        const cacheFriends = window.localStorage.getItem('friends')
        if(cacheFriends) {
          return JSON.parse(cacheFriends)
        } else {
          const { results: friends } = await getData('https://randomuser.me/api/?results=8', 'user')
          window.localStorage.setItem('friends', JSON.stringify(friends))
          
          return friends
        }
        break
      }
      default: {
        const listName = `${category}List`
        const cacheList = window.localStorage.getItem(listName)
        if(cacheList) {
          return JSON.parse(cacheList)
        } else {
          let apiUrl = `${BASE_API}list_movies.json?genre=${category}`
          if(category === 'top') {
            apiUrl = `${BASE_API}list_movies.json?sort_by=rating&limit=10`
          }
          const { data: { movies: data } } = await getData(apiUrl)
          window.localStorage.setItem(listName, JSON.stringify(data))
    
          return data
        }
      }
    }
  }

  function setAttributes($element, attributes) {
    for (let attribute in attributes) {
      $element.setAttribute(attribute, attributes[attribute])
    }
  }

  /** User */
  function userTemplate(user) {
    return (
      `<div class="user">
        <p>
          <img src="${user.picture.thumbnail}" alt="${user.name.title}. ${user.name.first} ${user.name.last}"/>
          <span>${user.name.title}. ${user.name.first} ${user.name.last}</span>
        </p>
      </div>`
    )
  }

  const user = await cacheExist('user')
  const $userContainer = document.getElementById('user')
  $userContainer.innerHTML = userTemplate(user)
  $userContainer.classList.add('fadeIn')

  function friendTemplate(friend) {
    debugger
    return (
      `<li class="playlistFriends-item">
        <a href="mailto:${friend.email}">
          <img src="${friend.picture.thumbnail}" alt="${friend.name.first} ${friend.name.last}" />
          <span>
            ${friend.name.first} ${friend.name.last}
          </span>
        </a>
      </li>`
    )
  }

  function renderFriends(friends, $container) {
    $container.children[0].remove()
    friends.forEach((friend) => {
      const HTMLString = friendTemplate(friend)
      const friendElement = createTemplate(HTMLString)
      $container.append(friendElement)
      const image = friendElement.querySelector('img')
      image.addEventListener('load', (event) => {
        event.srcElement.classList.add('fadeIn')
      })
    })
  }

  const friends = await cacheExist('friends')
  const $friendsContainer = document.querySelector('.playlistFriends')
  renderFriends(friends, $friendsContainer)

  function videoItemTemplate(movie, category) {
    return (
      `<div class="primaryPlaylistItem" data-id="${movie.id}" data-category="${category}">
        <div class="primaryPlaylistItem-image">
          <img src="${movie.medium_cover_image}">
        </div>
        <h4 class="primaryPlaylistItem-title">
          ${movie.title}
        </h4>
      </div>`
    )
  }
  
  function topItemTemplate(movie) {
    return (
      `<li class="myPlaylist-item" data-id="${movie.id}">
        <a href="#">
          <span>
            ${movie.title} - ${movie.rating}
          </span>
        </a>
      </li>`
    )
  }

  function createTemplate(HTMLString) {
    // $actionContainer.innerHTML += HTMLString
    const html = document.implementation.createHTMLDocument()
    html.body.innerHTML = HTMLString
    return html.body.children[0]
  }

  function addEventClick($element) {
    $element.addEventListener('click', () => {
      showModal($element)
    })
  }

  function renderMovieList(list, $container, category) {
    //actionList.data.movies
    $container.children[0].remove()
    list.forEach((movie) => {
      const HTMLString = videoItemTemplate(movie, category)
      const movieElement = createTemplate(HTMLString)
      $container.append(movieElement)
      const image = movieElement.querySelector('img')
      image.addEventListener('load', (event) => {
        event.srcElement.classList.add('fadeIn')
      })
      addEventClick(movieElement)
    })
  }

  function renderTopList(list, $container) {
    //actionList.data.movies
    $container.children[0].remove()
    list.forEach((movie) => {
      const HTMLString = topItemTemplate(movie)
      const movieElement = createTemplate(HTMLString)
      $container.append(movieElement)
      addEventClick(movieElement)
    })
  }

  const $form = document.getElementById('form')
  const $home = document.getElementById('home')
  const $featuringContainer = document.getElementById('featuring')

  function featuringTemplate(peli) {
    return (
      `<div class="featuring">
        <div class="featuring-image">
          <img src="${peli.medium_cover_image}" width="70" height="100" alt="">
        </div>
        <div class="featuring-content">
          <p class="featuring-title">Película Encontrada</p>
          <p class="featuring-album">${peli.title}</p>
        </div>
      </div>`
    )
  }

  $form.addEventListener('submit', async (event) => {
    event.preventDefault()
    $home.classList.add('search-active')
    const $loader = document.createElement('img')
    setAttributes($loader,  {
      src: 'src/images/loader.gif',
      width: 50,
      height: 50,
    })
    $featuringContainer.append($loader)
    const data = new FormData($form);
    // Destructuring assigment
    try {
      const {
        data: {
          movies: pelis
        }
      } = await getData(`${BASE_API}list_movies.json?limit=1&query_term=${data.get('name')}`)
      const HTMLString = featuringTemplate(pelis[0])
      $featuringContainer.innerHTML = HTMLString
    } catch (error) {
      alert(error.message)
      $loader.remove()
      $home.classList.remove('search-active')
    }
  })

  // GET List of Movies
  // Render Movie List
  const actionList =  await cacheExist('action')
  const $actionContainer = document.querySelector('#action')
  renderMovieList(actionList, $actionContainer, 'action')
  
  const dramaList = await cacheExist('drama')
  const $dramaContainer = document.getElementById('drama')
  renderMovieList(dramaList, $dramaContainer, 'drama')
  
  const animationList = await cacheExist('animation')
  const $animationContainer = document.getElementById('animation')
  renderMovieList(animationList, $animationContainer, 'animation')
  
  const topMoviesList =  await cacheExist('top')
  const $topContainer = document.querySelector('.myPlaylist')
  renderTopList(topMoviesList, $topContainer)

  /** Modals */
  const $modal = document.getElementById('modal')
  const $overlay = document.getElementById('overlay')
  const $hideModal = document.getElementById('hide-modal')

  const $modalTitle = $modal.querySelector('#modal h1')
  const $modalImage = $modal.querySelector('#modal img')
  const $modalDescription = $modal.querySelector('#modal p')

  function findById(list, id) {
    return list.find(movie => movie.id === parseInt(id, 10))
  }

  function findMovie(id, category) {
    let categoryList = null
    switch(category) {
      case 'action': {
        return findById(actionList, id)
      }
      case 'drama': {
        return findById(dramaList, id)
      }
      default: {
        return findById(animationList, id)
      }
    }
  }

  function showModal($element) {
    $overlay.classList.add('active')
    $modal.style.animation = 'modalIn .8s forwards'
    const id = $element.dataset.id
    const category = $element.dataset.category
    const data = findMovie(id, category)

    $modalTitle.textContent = data.title
    $modalImage.setAttribute('src', data.medium_cover_image)
    $modalDescription.textContent = data.description_full
  }
  
  $hideModal.addEventListener('click', hideModal)
  function hideModal() {
    $overlay.classList.remove('active')
    $modal.style.animation = 'modalOut .8s forwards'
  }

})()

