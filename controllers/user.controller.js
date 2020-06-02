const User = require("../models/user.model");

// create a user
const create = async (req, res) => {
  const userData = new User(req.body);
  try {
    let isUserExist = await User.find({ email: userData.email });
    if (isUserExist && isUserExist.length == 1) {
      return res.status(503).json({
        data: userData,
        errorMessage: "User already exist",
      });
    } else {
      await userData.save();
      return res.status(200).json({
        data: userData,
        message: "Successfully signed up!",
      });
    }
  } catch (err) {
    return res.status(403).json({
      data: null,
      error: err.name,
      errorMessage: err.message,
    });
  }
};

const userByID = async (req, res) => {
  try {
    console.log("you hit me badly bro");
    const { userId } = req.params;

    let fetchUser = await User.findById(userId);
    return res.status(200).json({
      data: fetchUser,
      message: "hi",
    });
  } catch (err) {
    return res.status(400).json({
      data: null,
      error: err.name,
      errorMessage: err.message,
    });
  }
};

// list of all users

const listOfUsers = async (req, res) => {
  try {
    let users = await User.find();
    return res.status(200).json({
      data: users,
    });
  } catch (err) {
    return res.status(400).json({
      data: null,
      error: err.name,
      errorMessage: err.message,
    });
  }
};

// removed user
const removeUser = async (req, res) => {
  try {
    let user = req.body;
    let deletedUser = await User.deleteOne({ _id: user.id });
    return res.status(200).json({
      data: deletedUser.deletedCount,
      message:
        deletedUser.deletedCount == 0
          ? "User already deleted"
          : "Successfully user deleted!",
    });
  } catch (err) {
    return res.status(400).json({
      data: null,
      error: err.name,
      errorMessage: err.message,
    });
  }
};

const updateUser = async (req, res) => {
  try {
    const userData = new User(req.body);
    let updatedUser = await User.updateOne(
      { email: userData.email },
      {
        $set: {
          name: userData.name,
          title: userData.title,
          description: userData.description,
        },
      }
    );
    if (updatedUser && updatedUser.n == 1) {
      return res.status(200).json({
        message: "Successfully updated user!",
      });
    } else {
      return res.status(400).json({
        data: null,
        errorMessage: "user not exists",
      });
    }
  } catch (err) {
    return res.status(400).json({
      data: null,
      error: err.name,
      errorMessage: err.message,
    });
  }
};

module.exports = {
  create,
  listOfUsers,
  removeUser,
  updateUser,
  userByID,
};
