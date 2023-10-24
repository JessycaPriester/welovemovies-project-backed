const theatersService = require("./theaters.service");


// List all the theaters and their movies
function list(req, res, next) {
    theatersService
        .list()
        .then((data) => res.json({ data }))
        .catch(next)
}

module.exports = {
    list
}