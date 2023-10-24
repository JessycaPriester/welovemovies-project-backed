const knex = require("../db/connection");

// Lists all the movies
function list() {
    return knex("movies").select("*");
}

// Lists the movie with the matching movie id
function read(movieId) {
    return knex("movies")
        .select("*")
        .where({ movie_id: movieId}).first()
}

// Lists all the movies that are currently showing 
// Uses is_showing from the movies_theaters table
function listShowing() {
   return knex("movies as m")
     .join("movies_theaters as mt", "m.movie_id", "mt.movie_id")
     .select("m.*")
     .distinct("m.movie_id")
     .where("mt.is_showing", true)
 }

 // Gets the critic with the matching id
 function getCritic(criticId) {
    return knex("critics")
      .select("*")
      .where({"critic_id": criticId})
  }
  
  // Gets the movie reviews for the movie with the movie id. Returns the reviews and the critic
  function getMovieReviews(movieId) {
    return knex("reviews as r")
      .join("critics as c", "r.critic_id", "c.critic_id" )
      .select("r.*")
      .where({ "r.movie_id":movieId })
  }

  // Gets the theaters that are showing the movie with the matching movie id
  function getMovieTheaters(movieId) {
    return knex("movies_theaters as mt")
        .join("theaters as t", "mt.theater_id", "t.theater_id")
        .select("t.name")
        .where({ "mt.movie_id": movieId})
  }
  

module.exports = {
    list,
    listShowing,
    read,
    getCritic,
    getMovieReviews,
    getMovieTheaters
}