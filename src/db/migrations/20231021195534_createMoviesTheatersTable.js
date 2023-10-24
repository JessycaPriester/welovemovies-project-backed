
exports.up = function(knex) {
    return knex.schema.createTable("movies_theaters", (table) => {
        table
            .integer("movie_id")
            .unsigned()
            .references("movie_id")
            .inTable("movies")
            .onDelete("cascade");
        table
            .integer("theater_id") // Define the "theater_id" column
            .unsigned()
            .references("theater_id")
            .inTable("theaters")
            .onDelete("cascade");
        table.boolean("is_showing");
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable("movies_theaters")
};