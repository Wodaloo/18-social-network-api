const router = require('express').Router();
const {
    getAllThoughts,
    // getThought,
    createThought,
    // updateThought,
    // deleteThought,
    // addReaction,
    // removeReaction,
} = require('../../controllers/thoughtController');

// /api/students
router.route('/').get(getAllThoughts).post(createThought);

// // /api/students/:studentId
// router.route('/:studentId').get(getSingleStudent).delete(deleteStudent);

// // /api/students/:studentId/assignments
// router.route('/:studentId/assignments').post(addAssignment);

// // /api/students/:studentId/assignments/:assignmentId
// router.route('/:studentId/assignments/:assignmentId').delete(removeAssignment);

// module.exports = router;
