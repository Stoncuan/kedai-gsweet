import jwt from "jsonwebtoken";

const generateToken = (user) => {
  if (!process.env.JWT_ACCESS_SECRET) {
    throw new Error("JWT_ACCESS_SECRET tidak ditemukan di .env");
  }

  return jwt.sign(
    {
      id: user.id,
      username: user.username,
    },
    process.env.JWT_ACCESS_SECRET,
    { expiresIn: "7d" }
  );
};

export default generateToken;
