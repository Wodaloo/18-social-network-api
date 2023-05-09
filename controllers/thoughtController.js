// ObjectId() method for converting studentId string into an ObjectId for querying database
const { ObjectId } = require('mongoose').Types;
const { Thought, User } = require('../models');


module.exports = {
    // getAllThoughts,
    // getThought,
    // createThought,
    // updateThought,
    // deleteThought,
    // addReaction,
    // removeReaction,


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
            const thoughtData = await Thought.findOne({ _id: req.params.studentId })
                .select('-__v')
                .lean();

            if (!thoughtData) {
                return res.status(404).json({ message: 'No thought with that ID' });
            }

            res.json({
                student,
                grade: await grade(req.params.studentId),
            });
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
    // Delete a Thought and remove them from the course
    async deleteThought(req, res) {
        try {
            const thoughtData = await Thought.findOneAndRemove({ _id: req.params.studentId });

            if (!student) {
                return res.status(404).json({ message: 'No such student exists' })
            }

            const course = await Course.findOneAndUpdate(
                { students: req.params.studentId },
                { $pull: { students: req.params.studentId } },
                { new: true }
            );

            if (!course) {
                return res.status(404).json({
                    message: 'Student deleted, but no courses found',
                });
            }

            res.json({ message: 'Student successfully deleted' });
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },

    // Add an Reaction to a student
    async addReaction(req, res) {
        try {
            console.log('You are adding an assignment');
            console.log(req.body);
            const student = await Thought.findOneAndUpdate(
                { _id: req.params.studentId },
                { $addToSet: { assignments: req.body } },
                { runValidators: true, new: true }
            );

            if (!student) {
                return res
                    .status(404)
                    .json({ message: 'No student found with that ID :(' })
            }

            res.json(student);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // Remove Reaction from a student
    async removeReaction(req, res) {
        try {
            const student = await Thought.findOneAndUpdate(
                { _id: req.params.studentId },
                { $pull: { assignment: { assignmentId: req.params.assignmentId } } },
                { runValidators: true, new: true }
            );

            if (!student) {
                return res
                    .status(404)
                    .json({ message: 'No student found with that ID :(' });
            }

            res.json(student);
        } catch (err) {
            res.status(500).json(err);
        }
    },
};
