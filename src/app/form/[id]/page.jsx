'use client'
import { getEventById, getEventForm } from "@/app/server_layer/event"
import { useEffect, useState } from "react"
import Image from 'next/image'
import { createAddress } from "@/app/server_layer/address"
import { useRouter, useParams } from "next/navigation"
import { Input, NextUIProvider, Textarea, Tooltip, Button } from "@nextui-org/react";
import { useUser } from "@/app/components/context/UserContext";

export default function Form() {
    const [event, setEvent] = useState(undefined);

    // Address form
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [addressLine, setAddressLine] = useState("");
    const [addressLine2, setAddressLine2] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [zipCode, setZipCode] = useState("");
    

    const params = useParams();
    const router = useRouter();

    const { userData, loading } = useUser();


    useEffect(() => {
        const fetchData = async () => {
            try {
                console.log(params.id)
                const result = await getEventForm(params.id);
                console.log(result);
                if (result !== null) {
                    console.log(result[0])
                    setEvent(result[0]);
                }
            } catch (error) {
                console.log(error);
            }
        };
    
        fetchData();

    }, []); 

 
    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = {
            name,
            email,
            completeAddess: `${addressLine} ${addressLine2} ${city} ${state} ${zipCode}`,
            eventUrl: event?.eventURL,
        };
        const result = await createAddress(data);
        if (result) {
            router.push("/thankyou");
        }
    }


    const calculateTimeLeft = () => {
        const eventDate = new Date(event?.eventDate);
        const now = new Date().getTime();
        const difference = eventDate - now;
    
        let timeLeft = {};
    
        if (difference > 0) {
          timeLeft = {
            days: Math.floor(difference / (1000 * 60 * 60 * 24)),
            hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
            minutes: Math.floor((difference / 1000 / 60) % 60),
            seconds: Math.floor((difference / 1000) % 60),
          };
        }
    
        return timeLeft;
    };
    
    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

    useEffect(() => {
        const timer = setTimeout(() => {
          setTimeLeft(calculateTimeLeft());
        }, 1000);
    
        return () => clearTimeout(timer);
      });
    const countdown = timeLeft.days !== undefined ? (
        <p>Countdown: {timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m {timeLeft.seconds}s</p>
    ) : (
        <p>Event has passed</p>
    );

  

    return (
        <div className="flex flex-col md:flex-row gap-8 container">
            <section className="w-full md:w-1/2 h-[300px] md:h-[850px] grid place-items-center rounded-md bg-amber-100 relative">

                {/* <h1 className="text-3xl md:text-6xl md:hidden font-bold absolute z-50 bg-white p-2">{event?.formTitle}</h1> */}
                
                <Image src={event?.picture} className="w-full h-full object-cover absolute" alt="Picture of the author" width={500} height={550} />
            </section>
            <div className="w-full md:w-1/2 md:p-6">
                <section>
                    <h1 className="text-6xl text-center font-bold z-50 bg-white p-2">{event?.formTitle}</h1>
                    <p className="z-50 text-center w-full mt-8 text-xl font-bold">
                    { event?.eventDate &&
                        `${new Intl.DateTimeFormat('en-US', {month: 'long', day: "numeric", year:"numeric"}).format(new Date(`${event?.eventDate}T00:00`))}`
                    }
                    </p>
                    {/* <p className="z-50 text-center w-full">{countdown}</p> */}
                    
                </section>
                <section className="mt-8">
                    <h1 className="text-3xl font-bold"></h1>

                    <p className="text-">{event?.formDescription}</p>
                </section>
                
                <section className="mt-20 flex flex-col gap-8">
                    <Input
                    label="Name"
                    type="text"
                    labelPlacement="outside"
                    placeholder="Mr. & Mrs. Jhon Doe"
                    isRequired
                    onChange={(e) => setName(e.target.value)}
                    />
                    <Input
                    label="Email"
                    type="text"
                    labelPlacement="outside"
                    placeholder="your@mail.com"
                    isRequired
                    onChange={(e) => setEmail(e.target.value)}
                    />
                    <Input
                    label="Street address"
                    type="text"
                    labelPlacement="outside"
                    placeholder="123 E 4 S St"
                    isRequired
                    onChange={(e) => setAddressLine(e.target.value)}
                    />
                     <Input
                    label="Apt, suite, etc. (optional)"
                    type="text"
                    labelPlacement="outside"
                    placeholder="Reedwood"
                    onChange={(e) => setAddressLine2(e.target.value)}
                    />
                    <div className="flex gap-4">
                        <Input
                        label="City"
                        type="text"
                        labelPlacement="outside"
                        placeholder="New York"
                        isRequired
                        onChange={(e) => setCity(e.target.value)}
                        />
                        <Input
                        label="State"
                        type="text"
                        labelPlacement="outside"
                        placeholder="NY"
                        isRequired
                        onChange={(e) => setState(e.target.value)}
                        />
                        <Input
                        label="Zip Code"
                        type="text"
                        labelPlacement="outside"
                        placeholder="10001"
                        isRequired
                        onChange={(e) => setZipCode(e.target.value)}
                        />
                    </div>
                    <Button color="primary" className="text-black" onClick={(e)=>handleSubmit(e)}>
                        Send address
                    </Button>
                </section>
            </div>
        </div>
    )
}