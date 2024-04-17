"use client";
import { useUser } from "./components/context/UserContext";
export default function Home() {
  // const session = getServerSession(authOptions);

  const { userData } = useUser();
  console.log(userData)
  return (
    <div>
      <div className="bg-[#F8E8DA]">
        <section className="container !py-20">
          <h1 className="text-6xl">
            Gather addresses and emails for your Special Day.
          </h1>
          <p className="mt-4">
            Mail and email your invitations to everyone you love..
          </p>
          <button className="bg-primary rounded px-4 py-2 mt-4">Start here</button>
        </section>

        
      </div>

      <section className="container">
          <h1 className="text-center text-3xl">How does it work?</h1>
          <div className="mt-8">
            <div>
              <div className="flex gap-3 items-center">

                <div className="bg-blue-100 text-blue-500 font-bold text-xl w-[40px] h-[40px] rounded-full flex items-center justify-center">1</div>
              
                <p>Create a new form for your event.</p>
              </div>
              <div className="w-[300px] h-[300px] bg-gray-100 mt-4 rounded-md"></div>
            </div>
            <div>
              <div className="flex gap-3 items-center">

                <div className="bg-blue-100 text-blue-500 font-bold text-xl w-[40px] h-[40px] rounded-full flex items-center justify-center">1</div>
              
                <p>Create a new form for your event.</p>
              </div>
              <div className="w-[300px] h-[300px] bg-gray-100 mt-4 rounded-md"></div>
            </div>
          </div>
        </section>
    </div>
  );
}
