const model = {
  URL: 'https://movie-list.alphacamp.io/api/v1/movies/',
  data: [],
  genresList: {
    '1': 'Action',
    '2': 'Adventure',
    '3': 'Animation',
    '4': 'Comedy',
    '5': 'Crime',
    '6': 'Documentary',
    '7': 'Drama',
    '8': 'Family',
    '9': 'Fantasy',
    '10': 'History',
    '11': 'Horror',
    '12': 'Music',
    '13': 'Mystery',
    '14': 'Romance',
    '15': 'Science Fiction',
    '16': 'TV Movie',
    '17': 'Thriller',
    '18': 'War',
    '19': 'Western'
  },
  newGenresList: [],
  initalNewGenresList() {
    Object.values(model.genresList).forEach(e => {
      model.newGenresList.push({ genreName: e, movieIds: [] });
    });
  }
};
const view = {
  showMovies(idList) {
    let htmlContent = '';
    const moviesWrapper = document.querySelector('#movies-wrapper');
    idList.forEach(id => {
      genresText = ``;
      // text of genres
      model.data[id - 1].genres.forEach(e => {
        genresText += `
          <div class="m-1 p-1 border rounded">
          ${model.genresList[e]}
          </div>
        `;
      });
      //
      htmlContent += `
        <div class="col-sm-6 col-lg-3">
          <div class="card mb-2">
            <img class="card-img-top " src="https://movie-list.alphacamp.io/posters/${
              model.data[id - 1].image
            }" alt="Card image cap">
            <div class="card-body movie-item-body">
              <h6 class="card-title">${model.data[id - 1].title}</h5>
            </div>
            <!-- genres -->
            <div class="d-flex flex-wrap">
              ${genresText}
            </div>
          </div>
        </div>
      `;
    });
    moviesWrapper.innerHTML = htmlContent;
  },
  showGenresBtns() {
    const genresWrapper = document.querySelector('#genres-wrapper');
    let htmlcontent = '';
    model.newGenresList.forEach((e, index) => {
      htmlcontent += `
        <button data-id ="${index +
          1}" type="button" class="btn btn-light btn-sm text-left">
          ${e.genreName}
        </button> `;
    });
    genresWrapper.innerHTML = htmlcontent;
  }
};
const controller = {
  getAPIdata(URL) {
    axios
      .get(URL)
      .then(response => {
        // model.data.push(...response.data.results);
        response.data.results.forEach(movie => {
          model.data.push(movie);

          movie.genres.forEach(genre => {
            model.newGenresList[genre - 1].movieIds.push(movie.id);
          });
        });
      })
      .catch(error => console.log(error));
  },
  listenGenresBtns() {
    const genresWrapper = document.querySelector('#genres-wrapper');
    genresWrapper.addEventListener('click', event => {
      genreId = event.target.dataset.id;
      if (event.target.tagName === 'BUTTON') {
        view.showMovies(model.newGenresList[+genreId - 1].movieIds);
      }
    });
  }
};

model.initalNewGenresList();
controller.getAPIdata(model.URL);
view.showGenresBtns();
controller.listenGenresBtns();
