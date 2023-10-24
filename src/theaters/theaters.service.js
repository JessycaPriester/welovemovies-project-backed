const knex = require("../db/connection");
const reduceProperties = require("../utils/reduce-properties")

// Lists the the theaters and the movies they have
function list() {
    // Format the movies
    const addMovies = reduceProperties("theater_id", {
      movie_id: ["movies", null, "movies.movie_id"],
      title: ["movies", null, "title"],
      runtime_in_minutes: ["movies", null, "runtime_in_minutes"],
      rating: ["movies", null, "rating"],
      description: ["movies", null, "description"],
      image_url: ["movies", null, "image_url"],
      created_at: ["movies", null, "movies.created_at"],
      updated_at: ["movies", null, "movies.updated_at"],
      is_showing: ["movies_theaters", null, "movies_theaters.is_showing"],
      theater_id: ["movies_theaters", null, "movies_theaters.theater_id"]
    })

    // Respond with the theater and the information about the movies they're showing
    return knex("theaters as t")
      .join("movies_theaters as mt", "t.theater_id", "mt.theater_id")
      .join("movies as m", "m.movie_id", "mt.movie_id")
      .select("*")
      .then(theaters => addMovies(theaters))
        
  }


module.exports = {
    list
}