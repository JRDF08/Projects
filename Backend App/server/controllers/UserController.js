import userModel from "../models/userModel.js";
import tokenModel from "../models/tokenModel.js";
import { isValidEmail, isValidPassword } from "../utils/validation.js";
import bcrypt from "bcrypt";

import {
  generateAccessToken,
  generateRefreshToken,
} from "../utils/jwtHelper.js";

const UserController = {
  list: async (req, res) => {
    const records = await userModel.find();

    res.send(records);
  },

  register: async (req, res) => {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res
          .status(400)
          .send({ message: "Email and password are required." });
      }

      if (!isValidEmail(email)) {
        return res.status(400).send({ message: "Invalid email format." });
      }

      if (!isValidPassword(password)) {
        return res.status(400).send({
          message:
            "Password must be at least 8 characters long and contain a number, an uppercase letter, and a special character.",
        });
      }

      const existingUser = await userModel.findOne({ email });
      if (existingUser) {
        return res.status(400).send({ message: "Email already in use" });
      }

      const hashPassword = await bcrypt.hash(password, 10);

      const newUser = new userModel({ email, password: hashPassword });
      const savedUser = await newUser.save();

      res.status(201).send(savedUser);
    } catch (error) {
      console.error("Registration error:", error);
      res.status(500).send({
        message: "An error occurred during registration",
        error: error.message,
      });
    }
  },

  login: async (req, res) => {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res
          .status(400)
          .send({ message: "Email and password are required." });
      }

      const user = await userModel.findOne({ email });
      if (!user) return res.status(404).send({ message: "User not found!" });

      const passwordCorrect = await bcrypt.compare(password, user.password);
      if (!passwordCorrect)
        return res
          .status(400)
          .send({ message: "Invalid Password. Please try again." });

      const accessToken = generateAccessToken(user);
      const refreshToken = generateRefreshToken(user);

      await new tokenModel({ token: refreshToken, userId: user._id }).save();

      res.status(200).send({
        message: "Login Successful",
        accessToken,
        refreshToken,
      });
    } catch (error) {
      res.status(500).send({ message: "Server error", error: error.message });
    }
  },

  refreshToken: async (req, res) => {
    const { token } = req.body;
    if (!token) return res.status(401).send({ message: Unauthorized });
    try {
      const dbToken = await tokenModel.findOne({ token }).populate("userId");
      if (!dbToken) return res.status(403).send({ message: "Forbidden" });
      jwt.verify(
        dbToken.token,
        process.env.REFRESH_TOKEN_SECRET_KEY,
        (error, decoded) => {
          if (error) return res.status(403).send({ message: "Forbidden" });
          const newAccessToken = generateAccessToken(dbToken.userId);
          res.status(200).send({ accessToken: newAccessToken });
        }
      );
    } catch (error) {
      res
        .status(500)
        .send({ message: "Error refreshing token", error: error.message });
    }
  },

  logout: async (req, res) => {
    const { refreshToken } = req.body;

    try {
      await tokenModel.deleteOne({ token: refreshToken });
      res.status(200).send({ message: "Logout successful" });
    } catch (error) {
      res
        .status(500)
        .send({ message: "Error logging out", error: error.message });
    }
  },
};

export default UserController;
