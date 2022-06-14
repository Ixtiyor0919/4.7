// const films = []
var moviesed = [];

var sortType = 1; //Default o'sish tartibida sortlangsn;
var sortBy = 1; //Id bo'yicha sortlangan;
//Sort movies
var sortButtonsEl = document.querySelector('.boxSelects');

//Functions
const moviesOpts = [
    {value:1, text:'Sort by id'},
    {value:2, text:'Sort by title'},
    {value:3, text:'Sort by year'},
];

let sortBySelectEl = document.querySelector('.moviesOpts');
sortBySelectEl.addEventListener('change', (e) => {
    sortBy = e.target.value - 0;
    sortAndRender(sortType, sortBy);
})

const optsGreaterOrLess = [
    {value:1, text:`O'sish`},
    {value:-1, text:`Kamayish`},
]

let typeSortSelectEl = document.querySelector('.optsGreaterOrLess');
typeSortSelectEl.addEventListener('change', (e) => {
    sortType = e.target.value - 0;
    sortAndRender(sortType, sortBy);
})
var todoForm = document.querySelector('.main-container');
var todoInput = document.querySelector('.form-control');

// todoForm.addEventListener('submit', (event) => {
//     event.preventDefault();
//     const id = bookmarkedMovie.length > 0 ? bookmarkedMovie[bookmarkedMovie.length-1].id + 1: 1;
//     const moviesTodo = {
//         id, 
//         title: todoInput.value, 
//         year: 2022
//     } 
//     bookmarkedMovie.push(moviesTodo);
//     todoInput.value = '';
//     renderBookmarkTodos(bookmarkedMovie, todoListEl)
// })
var movieContainer = document.querySelector('.movie-container')
var moviesRow = document.querySelector('[data-element=movie-container]');

var todoListEl = document.querySelector('.todo-list');

var bookmarkedMovie = [];

function createCloneTodo(todo) {
    let templateTodoEl = document.querySelector('#todo-item');
    let cloneTodoItem = templateTodoEl.content.cloneNode(true);
    
    cloneTodoItem.querySelector('.todo-id').textContent = 'id: ' + todo.id;
    cloneTodoItem.querySelector('.todo-title').textContent = todo.title;
    cloneTodoItem.querySelector('.todo-year').textContent = todo.year + '-y.';
    
    let deleteBtn = cloneTodoItem.querySelector('.todo-delete-btn');
    deleteBtn.dataset.todoId = todo.id;
    deleteBtn.dataset.task = 'delete';
    return cloneTodoItem;
    
}
renderBookmarkTodos(bookmarkedMovie, todoListEl)

function cloneAndRender(movie) {
    let singleMovieTemplate = document.querySelector('#movie-item');
    let movieItemElClone = singleMovieTemplate.content.cloneNode(true);
    
    let movieImageEl = movieItemElClone.querySelector('[data-element=movie-img]');
    movieImageEl.src = movie.imageUrl;
    movieImageEl.style.height = '200px';
    movieImageEl.addEventListener('error', () => {
        movieImageEl.src = 'http://picsum.photos/200/200';
        // movieImageEl.src = 'movie.poster';
    })

    movieItemElClone.querySelector('[data-element=movie-id]').textContent = `id: ` + movie.id;
    movieItemElClone.querySelector('[data-element=movie-title]').textContent = `Title: ` + movie.title;
    movieItemElClone.querySelector('[data-element=movie-year]').textContent = `Year: ` + movie.year;

    // movieItemElClone.querySelector('[data-element=movie-id-films]').textContent = `id-films: ` + movie.imdbID;
    // movieItemElClone.querySelector('[data-element=movie-title-films]').textContent = `Title-films: ` + movie.Title;
    // movieItemElClone.querySelector('[data-element=movie-year-films]').textContent = `year-films: ` + movie.Year;
    // movieItemElClone.querySelector('[data-element=movie-type]').textContent = `type: ` + movie.Type;

    let movieInfoBtn = movieItemElClone.querySelector('[data-element=movie-info]');
    movieInfoBtn.textContent = 'More info';
    movieInfoBtn.dataset.todoId = movie.id
    movieInfoBtn.dataset.task = 'Info'

    let movieBtn = movieItemElClone.querySelector('[data-element=movie-bookmark]');
    movieBtn.textContent = 'Bookmark';
    movieBtn.dataset.todoId = movie.id
    movieBtn.dataset.task = 'bookmark'
    movieBtn.addEventListener("click", (event) => {
        movies.forEach((movie) => {
            if(event.target.dataset.todoId == movie.id) {
                bookmarkedMovie.push(movie);
            };
        });
        renderBookmarkTodos(bookmarkedMovie, todoListEl);
    })
    return movieItemElClone;
}
renderMovies(movies, moviesRow)

// function cloneFilms(film) {
//     let singleMovieTemplate = document.querySelector('#movie-item');
//     let movieItemElClone = singleMovieTemplate.content.cloneNode(true);
    
//     let movieImageEl = movieItemElClone.querySelector('[data-element=movie-img]');
//     movieImageEl.src = film.Poster;
//     movieImageEl.style.height = '200px';
//     movieImageEl.addEventListener('error', () => {
//             movieImageEl.src = 'http://picsum.photos/200/200';
//     })

//     movieItemElClone.querySelector('[data-element=movie-id]').textContent = `id: ` + film.;
//     movieItemElClone.querySelector('[data-element=movie-title]').textContent = `Title: ` + film.Title;
//     movieItemElClone.querySelector('[data-element=movie-year]').textContent = `year: ` + film.Year;
//     movieItemElClone.querySelector('[data-element=movie-type]').textContent = `type: ` + film.Type;
// }
// renderFilms(films, moviesRow)

document.body.addEventListener('click', (event) => {
    let clickedEl = event.target;

    // if(clickedEl.dataset.todoId = movies.id) {
    //     movies.forEach((movie) => {
    //         clickedEl.dataset.todoId == movie.id
    //         bookmarkedMovie.push(movie);
    //     });
    // }//ishlamadi`
    // renderBookmarkTodos(bookmarkedMovie, todoListEl);
    // renderTodos(bookmarkedMovie, todoListEl);
    // renderPagination();
    
    if(clickedEl.dataset.task === 'delete') {
        bookmarkedMovie = bookmarkedMovie.filter(movie => movie.id != event.target.dataset.todoId)
        renderBookmarkTodos(bookmarkedMovie, todoListEl);
    }//ishladi

    if(clickedEl.dataset.task === 'Info') {
        let todoId = clickedEl.dataset.todoId;
        let todo = movies.find(item => item.id == todoId)
        let content = createModalInfo(todo);
        let modal = renderModal(content);
        document.body.appendChild(modal)
    }//ishladi

    if(clickedEl.dataset.task === 'delete') {
        let modalEl = document.querySelector('.my-modal');
        modalEl.classList.remove('my-modal--active');
    }//ishladi
})

function createModalInfo(movie) {
    let modalTemplate = document.querySelector('#modal-template');
    let modalEl = modalTemplate.content.cloneNode(true);
    let modalImg = modalEl.querySelector('.movie-modal-img');
    modalImg.src = movie.imageUrl;
    modalImg.addEventListener('error', () => {
        modalImg.src = 'http://picsum.photos/200/200';
    })
    modalId = modalEl.querySelector('.movie-modal-id').textContent = movie.id;
    modalTitle = modalEl.querySelector('.movie-modal-title').textContent = movie.title;
    modalDirector = modalEl.querySelector('.movie-modal-director').textContent = movie.director;
    modalActors = modalEl.querySelector('.movie-modal-actors').textContent = movie.actors;
    modalGenres = modalEl.querySelector('.movie-modal-genres').textContent = movie.genres;
    modalDescription = modalEl.querySelector('.movie-modal-description').textContent = movie.description;
    modalYear = modalEl.querySelector('.movie-modal-year').textContent = movie.year;
    
    let modalBtn = modalEl.querySelector('.movie-modal-btn');
    modalBtn.dataset.todoId = movie.id
    modalBtn.dataset.task = 'delete';
    return modalEl
}

// Pagination
var itemPerpage = 10;
var currentPage = 1;
   
var paginationEl = document.querySelector('.todo-pagination');
   
paginationEl.addEventListener('click', (event) => {
    if(event.target.dataset.task == 'page') {
        currentPage = event.target.dataset.pageId;
        renderMovies(movies, moviesRow)
        renderTodos(movies, moviesRow);
        renderPagination()
    }
})
   
renderPagination();
// todoForm.addEventListener('submit', (event) => {
//     event.preventDefault();
//     var todoInput = document.querySelector('.form-control');
//     let valued = todoInput.value;
//     getMovies(valued).then((result) => {
//         moviesed.push(result.Search)
//         moviesed.forEach((movie) => {
//             movies.innerHTML = false;
//             movie.forEach((move) => {
//                 movies.push(move)
//                 renderMovies(movies, moviesRow)
//             })
//         })
//         console.log(movies);
//         console.log(moviesed);
//         renderMovies(movies, moviesRow)
//     }).catch(err => console.log(err))
// })