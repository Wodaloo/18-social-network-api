const { User, Thought } = require('../models');

module.exports = {


  // addFriend,
  // RemoveFriend,


  // Get all User
  async getAllUsers(req, res) {
    try {
      const userData = await User.find();
      res.json(userData);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Get a user
  async getUser(req, res) {
    try {
      const userData = await User.findOne({ _id: req.params.userId })
        .select('-__v')
        .populate('thoughts')
        .populate("friends");

      if (!userData) {
        return res.status(404).json({ message: 'No course with that ID' });
      }

      res.json(userData);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Create a user
  async createUser(req, res) {
    try {
      const userData = await User.create(req.body);
      res.json(userData);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
  // Delete a user
  async deleteUser(req, res) {
    try {
      const userData = await User.findOneAndDelete({ _id: req.params.userId });

      if (!userData) {
        return res.status(404).json({ message: 'No user with that ID' });
      }

      await Thought.deleteMany({ _id: { $in: userData.thoughts } });
      res.json({ message: 'User and thoughts deleted!' });
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // update User
  async updateUser(req, res) {
    try {
      const userData = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $set: req.body },
        { runValidators: true, new: true }
      );

      if (!userData) {
        return res.status(404).json({ message: 'No course with this id!' });
      }

      res.json(userData);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  //add friend
  async addFriend(req, res) {
    try {
      console.log('You are adding an friend');
      console.log(req.body);

      const userData = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $addToSet: { friends: req.params.friendId } },
        { new: true }
      );

      if (!userData) {
        return res
          .status(404)
          .json({ message: 'No friend found with that ID :(' })
      }

      res.json(userData);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Remove friend
  async removeFriend(req, res) {
    try {
      const userData = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $pull: { friends: req.params.friendId } },
        { new: true }
      );

      if (!userData) {
        return res
          .status(404)
          .json({ message: 'No thought found with that ID :(' });
      }

      res.json(userData);
    } catch (err) {
      res.status(500).json(err);
    }
  },

};
