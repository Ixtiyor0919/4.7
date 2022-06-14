function renderSortBookmarkedMovies(todosData){
    todoListEl.innerHTML = null
    if(todosData.length > 0){
        todosData.forEach((movie, index) => {
            let todoEl = createCloneTodo(movie)
            todoListEl.appendChild(todoEl)
        })
    }else{
        todoListEl.textContent = "Todos not found";
    }
}

var itemPerpage = 10;
var currentPage = 1;
function renderTodos(todos=[], node) {
    node.innerHTML = null;
    todos.slice(itemPerpage * (currentPage - 1), currentPage * itemPerpage).forEach((todo) => {
        node.appendChild(cloneAndRender(todo));
    });
};
function sortAndRender(sortType = 1, sortBy = 1) {
    bookmarkedMovie = bookmarkedMovie.sort((a, b) => {
        switch(sortBy) {
            case 1:
                return sortType * (a.id - b.id);
                case 2: return sortType * (a.title.charCodeAt() - b.title.charCodeAt());
                case 3: return sortType * ( a.year - b.year);
            default: return sortType *(a.id - b.id);
        }
    })
    renderSortBookmarkedMovies(bookmarkedMovie);
}
function renderPagination() {
    paginationEl.innerHTML = null;
    for(let i=1; i<= Math.ceil(movies.length / itemPerpage); i++) {
        let templatePageItem = document.querySelector('#pagination-item');
        let pageItem = templatePageItem.content.cloneNode(true);
        
        let itemEl = pageItem.querySelector('.page-item');
        if(i == currentPage) {
            itemEl.classList.add('active');
        }else{
            itemEl.classList.remove('active');
        }
        
        let linkEl = pageItem.querySelector('.page-link');
        linkEl.textContent = i;
        linkEl.dataset.pageId = i;
        linkEl.dataset.task = 'page';
        paginationEl.appendChild(pageItem);
    }
}
function renderBookmarkTodos(todos=[], node) {
    node.innerHTML = null;
    todos.forEach((todo) => {
        node.appendChild(createCloneTodo(todo));
    })
}
function renderMovies(movies=[], node) {
    node.innerHTML = null;
    
    movies.forEach((movie) => {
        let movieItemEl =  cloneAndRender(movie);
        node.appendChild(movieItemEl);
    })
};
function renderModal(modal) {
    let modalEl = document.querySelector('.my-modal');
    let modalContent = modalEl.querySelector('.my-modal-content');
    modalContent.innerHTML = null;
    modalContent.appendChild(modal);    
    modalEl.classList.add('my-modal--active')
    return modalEl
}
// function renderFilms(films=[], node) {
//     movies.innerHTML = null;

//     films.forEach((movie) => {
//         let movieItemEl = cloneFilms(movie);
//         node.appendChild(movieItemEl);
//     })
// }