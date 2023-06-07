const movieCards = document.querySelectorAll('.movieCard')
const searchBar = document.getElementById('searchText')
const searchButton = document.getElementById('searchButton')

const getId = (element) =>{
    let movieId = element.id
    window.location.href = `/movie/${movieId}` 
}


const search = () => {
    let query = searchBar.value.trim()
    if(query.length != 0){
        window.location.href = `?search=${query}`
    }
    else{
        console.log('ERROR: field is empty')
    }
}

searchButton.addEventListener('click', search)
movieCards.forEach(function (el) {
    el.addEventListener("click", getId.bind(null, el));
});

