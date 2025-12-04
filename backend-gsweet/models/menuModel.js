import { DataTypes } from "sequelize";
import db from "../config/db.js";
import User from "./userModel.js";

const Post = db.define("posts", {
  title: DataTypes.STRING,
  content: DataTypes.TEXT,
});

User.hasMany(Post, { foreignKey: "userId" });
Post.belongsTo(User, { foreignKey: "userId" });

export default Post;
