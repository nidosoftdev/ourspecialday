import { useUser } from "./context/UserContext";
import { signOut, getAuth } from "firebase/auth";
import { useRouter } from "next/navigation";
import '@/app/server_layer/config'
export default function Component() {
  
  const auth = getAuth();
  
  const router = useRouter();

  const { userData } = useUser();
  if (true) {
    return (
      <div className="flex items-center gap-2">
        <a href="/dashboard" className="text-sm font-normal">{userData ? userData.email: ""}</a>
        {userData?  <button
          className="bg-red-50 p-1 text-sm font-normal rounded px-2 border border-red-100"
          onClick={()=>{signOut(auth); router.push("/")}}
        >
          Sign out
        </button>: <a href="/login" className="bg-[#FFD687] font-normal text-sm rounded px-2 py-1">Login</a>}
       
      </div>
    );
  }
  
}
