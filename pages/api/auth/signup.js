import bcryptjs from "bcryptjs";
import UserAuth from "../../../database/models/UserAuth";
import db from "../../../database/db";
import connectMongo from "../../../database/db";

async function handler(req, res) {
  if (req.method !== "POST") {
    return;
  }
  const { name, email, password } = req.body;
  if (
    !name ||
    !email ||
    !email.includes("@") ||
    !password ||
    password.trim().length < 5
  ) {
    res.status(422).json({
      message: "Validation error",
    });
    return;
  }

  await connectMongo();

  const existingUser = await UserAuth.findOne({ email: email });
  if (existingUser) {
    res.status(422).json({ message: "User exists already!" });
    // await db.disconnect();
    return;
  }

  const newUser = new UserAuth({
    name,
    email,
    password: bcryptjs.hashSync(password),
    isAdmin: false,
  });

  const user = await newUser.save();
  // await db.disconnect();
  res.status(201).send({
    message: "Created user!",
    _id: user._id,
    name: user.name,
    email: user.email,
    isAdmin: user.isAdmin,
  });
}

export default handler;
