const reviewsService = require("./reviews.service")
const hasProperties = require("../errors/hasProperties")

// Update an existing review
// Check that the review exists
function reviewExists(req, res, next) {
    reviewsService
        .read(req.params.reviewId)
        .then((review) => {
            if (review) {
                res.locals.review = review;
                return next()
            }
            next({
                status: 404,
                message: "Review cannot be found"
            })
        })
        .catch(next)
}
// Check that it only has valid properties 
const VALID_PROPERTIES = [
    "score",
    "content"
]

function hasOnlyValidProperties(req, res, next) {
    const { data = {}} = req.body;

    const invalidFields = Object.keys(data).filter((field) => !VALID_PROPERTIES.includes(field))

    if (invalidFields.length) {
        return next({
            status: 400,
            message: `Invalid field(s): ${invalidFields.join(", ")}`
        });
    }
    next()
}


// Update the review
async function update(req, res, next) {
    const review = res.locals.review.review_id
    
    const updatedReview = {
        ...req.body.data,
        review_id: res.locals.review.review_id
    };

    await reviewsService.update(updatedReview)
    res.json({ data: await reviewsService.read(review) })
}

function destroy(req, res, next) {
    reviewsService
        .delete(res.locals.review.review_id)
        .then(() => res.sendStatus(204))
        .catch(next);
}

// List the review with the matching id
function read(req, res, next) {
    reviewsService
        .read(req.params.reviewId)
        .then((data) => res.json({ data }) )

}
  

module.exports = {
    update: [reviewExists, hasOnlyValidProperties, update],
    delete: [reviewExists, destroy],
    read
}