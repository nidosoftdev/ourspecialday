"use client";
import { useUser } from "./components/context/UserContext";
import Image from "next/image";
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
        
        <div className="flex flex-col md:flex-row gap-8 mt-20">
          <div className="">
            <h1 className="text-left text-3xl">Why Havagala?</h1>
          
              <p className="text-3xl font-bold mt-6">
                We’re positive your invitations look amazing! 
              </p>
              <p className="text-xl mt-8">
              Let us help you send it to those who want to see it! 
              (We can’t let those photoshoot outfits go to waste🔥🔥🔥)
              </p>

     
            <p className="mt-4 text-xl">
              Planning your special day should be joyous, not costly. We help get your invitations to more people, 
              get more people on your registry, and make your day so much more special. 
            </p>
            <p className="mt-4">(and get this, we’ll even buy you a gift card on your registry too, just because we care.)</p>
            <a className="bg-primary rounded px-4 py-2 mt-8 block w-fit" href="/login">Start today</a>
          </div>
          <Image src="https://images.unsplash.com/photo-1481841580057-e2b9927a05c6?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
          className="top-0 right-0 rounded-md"
          alt="picture of couple dancing"
          width={500} height={500} />
        </div>
      </section>
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
