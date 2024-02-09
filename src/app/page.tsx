"use client";
import { useSession } from "next-auth/react";
export default function Home() {
  // const session = getServerSession(authOptions);
  const { data: session } = useSession();

  if (session) {
    return (
      <div>
        <p>Signed in as {session?.user.email}</p>
        <p>Name: {session?.user.name}</p>
        <p>{JSON.stringify(session)}</p>
      </div>
    );
  }
  return <p>You are not signed in.</p>;
}
