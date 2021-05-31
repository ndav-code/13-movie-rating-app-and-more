// list of all movies in memory for sorting
let moviesList = [];

//create id to keep track of element to remove
let currentId = 0;

//create html tabl for the movies

$(function () {
  $('#new-movie-form').on('submit', function (evt) {
    evt.preventDefault();

    let title = $('#title').val();
    let rating = $('#rating').val();

    let movieData = { title, rating, currentId };
    const HTMLtoAppend = createMovieDataHTML(movieData)

    currentId++
    moviesList.push(movieData);

    $('#movie-table-body').append(HTMLtoAppend);
    $('#new-movie-form').trigger('reset');
  });

  //when the delete button is clicked remove the closest parent tr and remove the movi object from the moviesList array

  $('tbody').on('click', '.btn.btn-danger', function (evt) {
    //find the index where this movie is
    let indexToremoveAt = moviesList.findIndex(movie => movie.currentId === +$('evt.target').data('deleteId'));
    moviesList.splice(indexToremoveAt, 1);
    //remove it form DOM
    $(evt.target).closest('tr').remove();
  });


  //when an arrow is clicked figure out what direction we are sorting and the key to sort by
  $('.fas').on('click', function (evt) {

    let direction = $(evt.target).hasClass('fa-sort-down') ? 'down' : 'up';
    let keyToSortBy = $(evt.target).attr('id');
    let sortedMovies = sortBy(moviesList, keyToSortBy, direction);
    //empty the table
    $('#movie-table-body').empty();

    //     //loop over oour object od sorted movies and append a new row
    for (let movie of sortedMovies) {
      const HTMLtoAppend = createMovieDataHTML(movie);
      $('#movie-table-body').append(HTMLtoAppend);
    }
    //toggle the arrow
    $(evt.target).toggleClass('fa-sort-down');
    $(evt.target).toggleClass('fa-sort-up');


  });
});
// loop over our object of sortedMovies and append a new row






//accept an array of objects and a key and sort them by that key
function sortBy(array, keyToSortBy, direction) {
  return array.sort(function (a, b) {
    //since rating is a number we convert these strings to numbers
    if (keyToSortBy === 'rating') {
      a[keyToSortBy] = +a[keyToSortBy]
      b[keyToSortBy] = +b[keyToSortBy]
    }
    if (a[keyToSortBy] > b[keyToSortBy]) {
      return direction === "up" ? 1 : -1;
    }
    else if (b[keyToSortBy] > a[keyToSortBy]) {
      return direction === "up" ? -1 : 1;
    }
    return 0;
  });
}
//create MovieDataHTML accepts an object title and rating keys and return html string including a delete button.
function createMovieDataHTML(data) {
  return `
   <tr>
   <td>${data.title}</td>
   <td>${data.rating}</td>
   <td>
     <button class="btn btn-danger" data-delete-id=${data.currentId}>Delete</button>

   </td>
   
   <tr>
   `;
}

