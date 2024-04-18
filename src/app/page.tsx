"use client";
import { useUser } from "./components/context/UserContext";
export default function Home() {
  // const session = getServerSession(authOptions);

  const { userData } = useUser();

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
          <a className="bg-primary rounded px-4 py-2 mt-4 block w-fit" href="/login">Start here</a>
        </section>

        
      </div>

      <section className="container mt-10">
          <h1 className="text-center text-3xl">How does it work?</h1>
          <div className="mt-20 flex md:flex-row flex-col gap-4 justify-between">
            <div className="flex flex-col justify-around">
              <div className="flex gap-3">

                <div className="bg-blue-100 text-blue-500 font-bold text-xl w-[40px] h-[40px] rounded-full flex items-center justify-center">1</div>
              
                <p className="w-full md:max-w-[150px]">Create a new event.</p>
              </div>
              <div className="w-full md:w-[250px] h-[250px] bg-gray-100 mt-4 rounded-md"></div>
            </div>
            <div className="flex flex-col justify-around">
              <div className="flex gap-3 items-center">

                <div className="bg-red-100 text-red-500 font-bold text-xl w-[40px] h-[40px] rounded-full flex items-center justify-center">2</div>
              
                <p className="w-full md:max-w-[150px]">Create a form to collect addresses.</p>
              </div>
              <div className="w-full md:w-[250px] h-[250px] bg-gray-100 mt-4 rounded-md"></div>
            </div>
            <div className="flex flex-col justify-around">
              <div className="flex gap-3 items-center">

                <div className="bg-cyan-100 text-cyan-500 font-bold text-xl w-[40px] h-[40px] rounded-full flex items-center justify-center">3</div>
              
                <p className="w-full md:max-w-[150px]">Create a site for your event.</p>
              </div>
              <div className="w-full md:w-[250px] h-[250px] bg-gray-100 mt-4 rounded-md"></div>
            </div>
            <div className="flex flex-col justify-around">
              <div className="flex gap-3 items-center">

                <div className="bg-violet-100 text-violet-500 font-bold text-xl w-[40px] h-[40px] rounded-full flex items-center justify-center">4</div>
              
                <p className="w-full md:max-w-[150px]">Share the link with your friends.</p>
              </div>
              <div className="w-full md:w-[250px] h-[250px] bg-gray-100 mt-4 rounded-md"></div>
            </div>
          </div>
        </section>
    </div>
  );
}
