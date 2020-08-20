const router = require('express').Router()
const {
    getThoughts,
    getThoughtById,
    addThought,
    updateThought,
    deleteThought,
    addReaction,
    removeReaction
} = require('../controllers/thought-controller');

router.route('/thoughts').get(getThoughts).post(addThought)

router.route('/thoughts/:id').get(getThoughtById).put(updateThought).delete(deleteThought)

router.route('/thoughts/:thoughtId/reactions').post(addReaction)

router.route('/thoughts/:thoughtId/reactions/:reactionId').delete(removeReaction)

module.exports = router