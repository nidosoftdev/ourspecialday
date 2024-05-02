'use client'
import Image from 'next/image'
import  { useState, useEffect } from 'react'
import { Event } from '../../components/interfaces/interfaces'
import { getEventById, getEventForm } from "@/app/server_layer/event"
import { useRouter, useParams } from "next/navigation"
export default function Thankyou() {
    const [event, setEvent] = useState<Event | any>(undefined);
    const params = useParams();
    const eventURL: string = typeof params.id === 'string' ? params.id : '';
    useEffect(() => {
        const fetchData = async () => {
            try {
            
                const result = await getEventForm(eventURL);
            
                if (result !== null) {
                    setEvent(result);
                }
            } catch (error) {
                console.log(error);
            }
        };
    
        fetchData();

    }, []); 

    return (
        <div className="flex flex-col md:flex-row gap-8 container">
            <section className="w-full md:w-1/2 h-[300px] md:h-[850px] grid place-items-center rounded-md bg-amber-100 relative">

            {/* <h1 className="text-3xl md:text-6xl md:hidden font-bold absolute z-50 bg-white p-2">{event?.formTitle}</h1> */}

            <Image src={event?.picture} className="w-full h-full object-cover absolute" alt="Picture of the author" width={500} height={550} />
            </section> 
            <div>
                <h1 className="text-3xl font-bold">Thank you for sending us you address!</h1>
                <p className="mt-8">Your address has been successfully submitted. We appreciate your participation.</p>

            </div>
        </div>
    )
}