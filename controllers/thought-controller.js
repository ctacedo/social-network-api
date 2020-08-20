const { Thought, User } = require('../models');

const thoughtController = {
    ///Thoughts keep getting add but I also keep receiving and error message idk why though
    addThought({ body }, res) {
        Thought.create(body)
            .then(({ _id }) => {
                return User.findOneAndUpdate(
                    { _id: body.userId },
                    { $push: { thoughts: _id } },
                    { new: true }
                );
            })
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'But seriously, thought added' });
                    return;
                }
                res.json(dbUserData)
            })
            .catch(err => res.status(400).json(err));
    },
    
    getThoughts(req, res) {
        Thought.find({})
            .select('-__v')
            .then(dbThoughtData => res.json(dbThoughtData))
            .catch(err => res.status(400).json(err));
    },
    
    getThoughtById({ params}, res) {
        Thought.findOne({ _id: params.id })
            .populate('reactions')
            .select('-__v')
            .then(dbThoughtData => {
                if (!dbThoughtData) {
                    return res.status(404).json({ message: 'No thought with id!' })
                }
                res.json(dbThoughtData)
            })
            .catch(err => res.status(400).json(err))
    },

    updateThought({ params, body }, res) {
        Thought.findOneAndUpdate(
            { _id: params.id },
            body,
            { new: true, runValidators: true }
        )
        .then(dbThoughtData => {
            if (!dbThoughtData) {
                return res.status(404).json({ message: 'No thought with id!' })
            }
            res.json(dbThoughtData)
        })
        .catch(err => res.status(400).json(err))
    },

    deleteThought({ params }, res) {
        Thought.findOneAndDelete({ _id: params.id })
            .then(dbThoughtData => {
                if (!dbThoughtData) {
                    return res.status(404).json({ message: 'No thought with id!' })
                }
                res.json(dbThoughtData)
            })
            .catch(err => res.status(400).json(err))
    },

    addReaction({ params, body }, res) {
        Thought.findOneAndUpdate(
            {_id: params.thoughtId },
            { $push: { reactions: body } },
            { new: true, runValidators: true }
        )
        .then(dbThoughtData => {
            if (!dbThoughtData) {
                res.status(404).json({ message: 'No thought with id!' });
                return
            }
            res.json(dbThoughtData)
        })
        .catch(err => res.status(400).json(err));
    },
 
    removeReaction({ params }, res) {
        Thought.findOneAndUpdate(
            { _id: params.thoughtId },
            { $pull: { reactions: { reactionId: params.reactionId } } },
            { new: true }
        )
        .then(dbThoughtData => {
            if (!dbThoughtData) {
                return res.status(404).json({ message: 'No thought with id!' })
            }
            res.json(dbThoughtData)
        })
        .catch(err => res.status(400).json(err));
    }
}

module.exports = thoughtController