import { useUser } from "./context/UserContext";
import { signOut, getAuth } from "firebase/auth";
import { useRouter } from "next/navigation";

export default function Component() {
  
  const auth = getAuth();
  
  const router = useRouter();

  const { userData } = useUser();
  if (true) {
    return (
      <div className="flex items-center gap-2">
        <p className="text-sm font-normal">{userData ? userData.email: "Welcome"}</p>
        {userData?  <button
          className="bg-red-50 p-1 text-sm font-normal"
          onClick={()=>{signOut(auth); router.push("/")}}
        >
          Sign out
        </button>: <a href="/login">Login</a>}
       
      </div>
    );
  }
  
}
