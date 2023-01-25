import mongoose from "mongoose";

const userAuthSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, required: true, default: false },
  },
  {
    timestamps: true,
  }
);

const UserAuth =
  mongoose.models.UserAuth || mongoose.model("UserAuth", userAuthSchema);
export default UserAuth;
