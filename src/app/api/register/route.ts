import { NextResponse } from "next/server";
import { User } from "@/model/user-model";
import bcrypt from "bcryptjs";
import mongoose from "mongoose";
import dbConnect from "@/lib/mongo";

export const POST = async (request: any) => {
  const { name, email, password, role } = await request.json();

  await dbConnect();

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    // Check if the email already exists
    const existingUser = await User.findOne({ email }).session(session);
    if (existingUser) {
      await session.abortTransaction();
      session.endSession();
      return new NextResponse("Email already registered", {
        status: 400,
      });
    }

    // Encrypt the password
    const hashedPassword = await bcrypt.hash(password, 5);

    // Create a new user
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role,
    });

    // Save the user to the database
    await newUser.save({ session });

    await session.commitTransaction();
    session.endSession();

    return new NextResponse("User has been created", {
      status: 201,
    });
  } catch (err: any) {
    await session.abortTransaction();
    session.endSession();

    // Log the error for debugging
    console.error("Error registering user:", err);

    return new NextResponse(err.message, {
      status: 500,
    });
  }
};