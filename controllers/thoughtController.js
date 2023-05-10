// ObjectId() method for converting studentId string into an ObjectId for querying database
const { ObjectId } = require('mongoose').Types;
const { Thought, User } = require('../models');


module.exports = {

    // Get all Thoughts
    async getAllThoughts(req, res) {
        try {
            const thoughtData = await Thought.find();


            res.json(thoughtData);
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },
    // Get a single Thought
    async getThought(req, res) {
        try {
            const thoughtData = await Thought.findOne({ _id: req.params.thoughtId })
                .select('-__v')
                .lean();

            if (!thoughtData) {
                return res.status(404).json({ message: 'No thought with that ID' });
            }

            res.json(thoughtData);
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },
    // create a new Thought
    async createThought(req, res) {
        console.log("createThought");
        try {
            const thoughtData = await Thought.create(req.body);
            // res.json(thoughtData);

            if (thoughtData) {
                await User.findOneAndUpdate(
                    { _id: req.body.userId },
                    { $push: { thoughts: thoughtData._id } },
                    { new: true }
                );
            }



        } catch (err) {
            res.status(500).json(err);
        }
    },

    // Update Thought
    async updateThought(req, res) {
        console.log("Update User")
        try {
            const thoughtData = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $set: req.body },
                { runValidators: true, new: true }
            );

            if (!thoughtData) {
                return res.status(404).json({ message: 'No course with this id!' });
            }

            res.json(userData);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // Delete a Thought and remove them from the course
    async deleteThought(req, res) {
        try {
            const thoughtData = await Thought.findOneAndRemove({ _id: req.params.thoughtId });

            if (!thoughtData) {
                return res.status(404).json({ message: 'No such thought exists' })
            }

            const userData = await User.findOneAndUpdate(
                { thoughts: req.params.thoughtId },
                { $pull: { thoughts: req.params.thoughtId } },
                { new: true }
            );

            if (!userData) {
                return res.status(404).json({
                    message: 'Thought deleted, but no user found',
                });
            }

            res.json({ message: 'Student successfully deleted' });
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },

    // Add an Reaction 
    async addReaction(req, res) {
        try {
            console.log('You are adding an reaction');
            console.log(req.body);
            const thoughtData = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $addToSet: { reactions: req.body } },
                { runValidators: true, new: true }
            );

            if (!thoughtData) {
                return res
                    .status(404)
                    .json({ message: 'No thought found with that ID :(' })
            }

            res.json(thoughtData);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // Remove Reaction from a student
    async removeReaction(req, res) {
        try {
            const thoughtData = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $pull: { reactions: { reactionId: req.params.reactionId } } },
                { runValidators: true, new: true }
            );

            if (!thoughtData) {
                return res
                    .status(404)
                    .json({ message: 'No thought found with that ID :(' });
            }

            res.json(thoughtData);
        } catch (err) {
            res.status(500).json(err);
        }
    },
};
