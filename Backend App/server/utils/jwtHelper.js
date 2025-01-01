import dotEnv from "dotenv";
import jwt from "jsonwebtoken";

dotEnv.config();

export const generateAccessToken = (userInfo) => {
  return jwt.sign(
    { userId: userInfo._id, email: userInfo.email },
    process.env.ACCESS_TOKEN_SECRET_KEY,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRATION,
    }
  );
};

export const generateRefreshToken = (userInfo) => {
  return jwt.sign(
    { userId: userInfo._id, email: userInfo.email },
    process.env.REFRESH_TOKEN_SECRET_KEY,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRATION,
    }
  );
};
