import { NextResponse } from "next/server";
import { createUser } from "@/queries/users";
import { User } from "@/model/user-model";

import bcrypt from "bcryptjs";
import  dbConnect  from "@/lib/mongo";

export const POST = async (request: any) => {
  const {name, email, password, role} = await request.json();

  console.log(name, email, password, role);

  // Create a DB Conenction
  await dbConnect();
  // Encrypt the password
  const hashedPassword = await bcrypt.hash(password, 5);
  // Form a DB payload
  const newUser = new User({
    name,
    email,
    password: hashedPassword,
    role,
  });

  // Update the DB
  try {
    await createUser(newUser);
  } catch (err: any) {
    return new NextResponse(err.mesage, {
      status: 500,
    });
  }

  return new NextResponse("User has been created", {
    status: 201,
  });

 }