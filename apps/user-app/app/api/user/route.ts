import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";

import { authOptions } from "~/lib/auth";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!!session && !!session.user) {
      return NextResponse.json({
        user: session.user,
      });
    }
  } catch (err) {
    return NextResponse.json(
      {
        message: "You are not logged in",
      },
      {
        status: 403,
      }
    );
  }
  return NextResponse.json(
    {
      message: "You are not logged in",
    },
    {
      status: 403,
    }
  );
}
