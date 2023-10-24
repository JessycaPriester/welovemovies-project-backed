const router = require("express").Router();
const controller = require("./movies.controller");
const theatersRouter = require("../theaters/theaters.router");
const reviewsRouter = require("../reviews/reviews.router");
const methodNotAllowed = require("../errors/methodNotAllowed");

// Routes
router.route("/:movieId/reviews").get(controller.getReviews).all(methodNotAllowed);
router.route("/:movieId/theaters").get(controller.getTheaters).all(methodNotAllowed);

router.route("/").get(controller.list).all(methodNotAllowed);
router.route("/:movieId").get(controller.read).all(methodNotAllowed);

router.use("/:movieId/reviews", reviewsRouter);
router.use("/:movieId/theaters", theatersRouter);



module.exports = router