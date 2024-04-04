"use client";
import { useUser } from "./components/context/UserContext";
export default function Home() {
  // const session = getServerSession(authOptions);

  const { userData } = useUser();
  console.log(userData)
  return <p>You are not signed in.</p>;
}
