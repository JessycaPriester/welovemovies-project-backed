const moviesService = require("./movies.service");

// List all the movies
async function list(req, res) {
    const is_showing = req.query.is_showing;
    let data = [];

    if (is_showing) {
      data = await moviesService.listShowing();
    } else {
      data = await moviesService.list();
    }
    res.json({ data });
  }

// List the movie that matches the inputted movie id
// Check that the movie exists
function movieExists(req, res, next) {
  moviesService
      .read(req.params.movieId)
      .then((movie) => {
          if (movie) {
              res.locals.movie = movie;
              return next()
          }
          next({
              status: 404,
              message: "Movie cannot be found."
          })
      })
      .catch(next)
}
// List the movie
function read(req, res, next) {
  const { movie: data } = res.locals;
  res.json({ data });
}

// Gets all the reviews for the movie with the matching movie id
async function getReviews(req, res) {
    const { movieId } = req.params;
    // Get all the reviews for that movie
    const reviews = await moviesService.getMovieReviews(movieId);
    // Store all the reviews here after their critcs are added
    const allReviews = [];
    
    // Loops through all the reviews
    for (let i = 0; i < reviews.length; i++) {
      const review = reviews[i];
      // Gets the critic information for that review
      const critic = await moviesService.getCritic(review.critic_id);
      // Adds that critics information to the that review
      review.critic = critic[0];
      // Adds the reveiw to the collection/array of reviews
      allReviews.push(review);
    }
    
    // Respond with all the reviews
    res.status(200).json({data: allReviews});
  }


// Lists all the theaters that are showing the movie with the matching movie id
async function getTheaters(req, res) {
    const { movieId } = req.params;
    // Get the theaters that are showing the movie
    const theaters = await moviesService.getMovieTheaters(movieId);
    
    // Respond with the theaters
    res.status(200).json({ data: theaters });
}

module.exports = {
    list,
    read: [movieExists, read],
    getReviews: [movieExists, getReviews],
    getTheaters: [movieExists, getTheaters]
}