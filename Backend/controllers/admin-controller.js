import Admin from "../models/admin.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import "dotenv/config";

export const addAdmin = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email && email.trim() === "" && !password && password.trim === "") {
    return res.status(422).json({ message: "Invalid Input" });
  }

  let existingAdmin;

  try {
    existingAdmin = await Admin.findOne({ email });
  } catch (err) {
    return console.log(err);
  }
  if (existingAdmin) {
    return res.status(400).json({ message: "Admin already exists" });
  }

  const hashedPassword = await bcrypt.hash(password, 12);
  let admin;
  try {
    admin = new Admin({ email, password: hashedPassword });
    admin = await admin.save();
  } catch (err) {
    return console.log(err);
  }
  if (!admin) {
    return res.status(500).json({ message: "Unable to store domains" });
  }
  return res.status(201).json({ admin });
};

export const adminLogin = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email && email.trim() === "" && !password && password.trim === "") {
    return res.status(422).json({ message: "Invalid Input" });
  }
  let existingAdmin;
  try {
    existingAdmin = await Admin.findOne({ email });
  } catch (err) {
    return console.log(err);
  }
  if (!existingAdmin) {
    return res.status(404).json({ message: "Admin not found" });
  }

  const isPasswordCorrect = bcrypt.compareSync(
    password,
    existingAdmin.password
  );

  if (!isPasswordCorrect) {
    return res.status(400).json({ message: "Incorrect Password" });
  }

  const token = jwt.sign(
    { id: existingAdmin._id },
    /*process.env.SECRET_KEY*/ "10", //ERROR
    {
      expiresIn: "1d",
    }
  );
  return res
    .status(200)
    .json({ message: "Authentication complete", token, id: existingAdmin._id });
};

export const getAdmins = async (req, res, next) => {
  let admins;
  try {
    admins = await Admin.find();
  } catch (err) {
    return console.log(err);
  }
  if (!admins) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
  return res.status(200).json({ admins });
};
