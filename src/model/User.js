const { Schema, model, models } = require("mongoose");

const userSchema = new Schema(
  {
    name: {
      type: String,
      maxLength: [50, "Name cannot exceed 50 characters "],
      minLength: [5, "Name must be more than 5 characters"],
      required: [true, "Please provide your name"],
      trim: true,
    },
    username: {
      type: String,
      required: [true, "Please provide a username"],
      unique: true,
      trim: true,
      lowercase: true,
      maxLength: [50, "Username cannot exceed 50 characters "],
      minlength: [3, "Username must be at least 3 characters"],
    },
    email: {
      type: String,
      unique: true,
      required: [true, "Provide your email"],
      lowercase: true,
      trim: true, // Good practice: remove accidental whitespace
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please fill a valid email address",
      ],
    },
    password: {
      type: String,
      required: [true, "Please provide a password"],
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },

    status: {
      type: String,

      // pending, approved, blocked, decline
      enum: ["pending", "approved", "blocked", "decline"],
      default: "pending",
    },
  },
  { timestamps: true, id: true },
);

const User = model("User", userSchema);

// To insert them all at once:
// await User.insertMany(users);

module.exports = User;
