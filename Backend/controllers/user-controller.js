import { request } from "express";
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import Bookings from "../models/Bookings.js";

export const getAllUsers = async (req, res, next) => {
  let users;
  try {
    users = await User.find();
  } catch (err) {
    return console.log(err);
  }
  if (!users) {
    return res.status(500).json({ message: "Unexpected Error Occured" });
  }

  return res.status(200).json({ users });
};

export const signup = async (req, res, next) => {
  const {
    name,

    email,

    password,
  } = req.body;
  if (
    !name &&
    name.trim() === "" &&
    !email &&
    email.trim() === "" &&
    !password &&
    password.trim === ""
  ) {
    return res.status(422).json({ message: "Invalid Input" });
  }
  const hashedPassword = bcrypt.hashSync(password);
  let user;

  try {
    user = new User({
      name,

      email,

      password: hashedPassword,
    });
    user = await user.save();
  } catch (err) {
    return console.log(err);
  }
  if (!user) {
    return res.status(500).json({ message: "Unexpected Error Occured" });
  }
  return res.status(201).json({ id: user._id });
};

export default getAllUsers;

export const updateUser = async (req, res, next) => {
  const id = req.params.id;
  const {
    name,

    email,

    password,
  } = req.body;
  if (
    !name &&
    name.trim() === "" &&
    !email &&
    email.trim() === "" &&
    !password &&
    password.trim === ""
  ) {
    return res.status(422).jason({ message: "Invalid Input" });
  }

  const hashedPassword = bcrypt.hashSync(password);
  let user;
  try {
    user = await User.findByIdAndUpdate(id, {
      name,

      email,

      password: hashedPassword,
    });
  } catch (errr) {
    return console.log(errr);
  }
  if (!user) {
    return res.status(500).json({ message: "Something went wrong" });
  }
  res.status(200).json({ Message: "Update Succesfully" });
};

export const deleteUser = async (req, res, next) => {
  const id = req.params.id;
  let user;
  try {
    user = await User.findByIdAndDelete(id);
  } catch (err) {
    return console.log(err);
  }
  if (!user) {
    return res.status(500).json({ message: "Something went wrong" });
  }
  return res.status(200).json({ Message: "Deleted Succesfully" });
};

export const login = async (req, res, next) => {
  const { email, password } = req.body;
  if (email.trim() === "" && !password && password.trim === "") {
    return res.status(422).json({ message: "Invalid Input" }); // jason
  }

  let existingUser;
  try {
    existingUser = await User.findOne({ email });
  } catch (err) {
    return console.log(err);
  }
  if (!existingUser) {
    return res
      .status(404)
      .message({ message: "Unable to find User from This ID" });
  }
  const isPasswordCorrect = bcrypt.compareSync(password, existingUser.password);

  if (!isPasswordCorrect) {
    return res.status(400).json({ message: "Password Incorrect" });
  }

  return res
    .status(200)
    .json({ message: "Login Successfull", id: existingUser._id }); //id passed
};

export const getBookingsOfUser = async (req, res, next) => {
  let bookings;

  const id = req.params.id;
  try {
    bookings = await Bookings.find({ user: id });
  } catch (err) {
    return res.status(500).json({ message: "Unable to get bookings" });
  }

  if (!bookings) {
    return res.status(500).json({ message: "No bookings" });
  }

  return res.status(200).json({ bookings });
};
