'use client'
import { getEventById, getEventUrl } from "@/app/server_layer/event"
import { useEffect, useState } from "react"
import Image from 'next/image'
import { createAddress } from "@/app/server_layer/address"
import { useRouter, useParams } from "next/navigation"
import { Input, NextUIProvider, Textarea, Tooltip, Button } from "@nextui-org/react";
import { useUser } from "@/app/components/context/UserContext";
interface Event {
    formTitle: string;
    formDescription: string;
    formUrl: string;
    day: string;
    month: string;
    year: string;
    picture: string;
    id: string;
}

export default function Form() {
    const [event, setEvent] = useState({} || undefined);

    // Address form
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [address, setAddress] = useState("");
    

    const params = useParams();
    const router = useRouter();

    const { userData, loading } = useUser();


    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await getEventUrl(params.id);
                console.log(result);
                if (result !== null) {
                    setEvent(result[0]);
                }
            } catch (error) {
                console.log(error);
            }
        };
    
        fetchData();
    }, []); // Don't forget to add your dependencies array here if needed
    
    const handleSubmit = async (e: any) => {
        e.preventDefault();
        const data = {
            name,
            email,
            address,
            eventId: "AC8WTOtkY6P4oxtYdXFU"
        };
        const result = await createAddress(data);
        if (result) {
            router.push("/thankyou");
        }
    }


    const calculateTimeLeft = () => {
        const eventDate = new Date(`${event?.month} ${event?.day}, ${event?.year}`).getTime();
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
        <div className="flex flex-col md:flex-row gap-8">
            <section className="w-1/2 h-[300px] md:h-[700px] grid place-items-center rounded-md bg-amber-100 relative">

                <h1 className="text-3xl md:text-6xl md:hidden font-bold absolute z-50 bg-white p-2">{event?.formTitle}</h1>
                
                <Image src="/couple.avif" className="w-full h-full object-cover absolute" alt="Picture of the author" width={500} height={250} />
            </section>
            <div className="w-1/2">
                <section>
                    <h1 className="text-6xl text-center hidden md:block font-bold z-50 bg-white p-2">{event?.formTitle}</h1>
                    <p className="z-50 text-center w-full mt-8 text-xl font-bold">{event?.month} {event?.day}, {event?.year}</p>
                    <p className="z-50 text-center w-full">{countdown}</p>
                    
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
                    label="Address"
                    type="email"
                    labelPlacement="outside"
                    placeholder="123 E 4 S St, New York, NY 10001, USA"
                    isRequired
                    onChange={(e) => setAddress(e.target.value)}
                    />
                    <Button color="primary" onClick={(e)=>handleSubmit(e)}>
                        Send address
                    </Button>
                </section>
            </div>
        </div>
    )
}