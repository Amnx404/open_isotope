import { hash } from "bcryptjs";
import { NextResponse } from "next/server";
import { z } from "zod";

import { db } from "~/server/db";

const signUpSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  name: z.string().optional(),
});

export async function POST(req: Request) {
  try {
    const body: unknown = await req.json();
    const { email, password, name } = signUpSchema.parse(body);

    // Check if user already exists
    const existingUser = await db.user.findUnique({
      where: { email },
      include: {
        accounts: true,
      },
    });

    if (existingUser) {
      // If user exists with Google provider
      if (existingUser.accounts.some(account => account.provider === "google")) {
        return NextResponse.json(
          { error: "An account with this email already exists. Please sign in with Google." },
          { status: 400 },
        );
      }
      
      // If user exists with password
      if (existingUser.password) {
        return NextResponse.json(
          { error: "User already exists" },
          { status: 400 },
        );
      }
      
      // Edge case: If user exists without password (possible incomplete registration)
      // Update the user with a password
      const hashedPassword = await hash(password, 12);
      const updatedUser = await db.user.update({
        where: { id: existingUser.id },
        data: {
          password: hashedPassword,
          name: name ?? existingUser.name,
        },
      });
      
      return NextResponse.json(
        { message: "Account updated successfully", userId: updatedUser.id },
        { status: 200 },
      );
    }

    const hashedPassword = await hash(password, 12);

    // Create new user
    const user = await db.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
      },
    });

    return NextResponse.json(
      { message: "User created successfully", userId: user.id },
      { status: 201 },
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.issues }, { status: 400 });
    }

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}