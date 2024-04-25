"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import { Appbar } from "@cashx/ui/appbar";

export default function Home() {
  const session = useSession();

  return (
    <main className="text-2xl font-bold">
      <Appbar onSignin={signIn} onSignout={signOut} user={session.data?.user} />
    </main>
  );
}
