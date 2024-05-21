'use client'
import { getEventById, getEventForm } from "@/app/server_layer/event"
import { useEffect, useState } from "react"
import Image from 'next/image'
import { toast } from 'react-hot-toast'
import { createAddress } from "@/app/server_layer/address"
import { useRouter, useParams } from "next/navigation"
import { Input, NextUIProvider, Textarea, Tooltip, Button } from "@nextui-org/react";
import { useUser } from "@/app/components/context/UserContext";
import { Event } from "@/app/components/interfaces/interfaces";
import { CustomSpinner } from '@/app/components/customSpinner';
export default function Form() {
    const [loading, setloading] = useState(true);
    const [event, setEvent] = useState<Event | any>(undefined);

    // Address form
    const [name, setName] = useState<string | null>(null);
    const [email, setEmail] = useState<string | null>(null);
    const [addressLine, setAddressLine] = useState<string | null>(null);
    const [addressLine2, setAddressLine2] = useState<string | null>(null);
    const [city, setCity] = useState<string | null>(null);
    const [state, setState] = useState<string | null>(null);
    const [zipCode, setZipCode] = useState<string | null>(null);
    
    const [invalidName, setInvalidName] = useState<boolean>(false);
    const [invalidEmail, setInvalidEmail] = useState<boolean>(false);
    const [invalidAddressLine, setInvalidAddressLine] = useState<boolean>(false);
    const [invalidCity, setInvalidCity] = useState<boolean>(false);
    const [invalidState, setInvalidState] = useState<boolean>(false);
    const [invalidZipCode, setInvalidZipCode] = useState<boolean>(false);

    const params = useParams();
    const router = useRouter();

    const { userData } = useUser();

    const eventURL: string = typeof params.id === 'string' ? params.id : '';

    useEffect(() => {
        const fetchData = async () => {
            try {
            
                const result = await getEventForm(eventURL);
            
                if (result !== null) {
                    setEvent(result);
                    setloading(false)
                }
            } catch (error) {
                console.log(error);
            }
        };
    
        fetchData();

    }, []); 

    console.log(event);
    const handleSubmit = async (e:any) => {
        const validateEmail = (email:any) => email.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i);
        e.preventDefault();

        let errors:number = 0
        
        // Validate data
        if (name === null) {
            setInvalidName(true);
            errors++
        } else {
            setInvalidName(false);
            
        }
        if (email === null) {
            setInvalidEmail(true);
            errors++
        } else if (!validateEmail(email)) {
            setInvalidEmail(true);
            errors++
        } else {
            setInvalidEmail(false);
            
        }
        if (addressLine === null) {
            setInvalidAddressLine(true);
            errors++
        } else {
            setInvalidAddressLine(false);
            
        }
        if (city === null) {
            setInvalidCity(true);
            errors++
        } else {
            setInvalidCity(false);
            
        }
        if (state === null) {
            setInvalidState(true);
            errors++
        } else {
            setInvalidState(false);
            
        }
        if (zipCode === null) {
            setInvalidZipCode(true);
            errors++
        } else {
            setInvalidZipCode(false);
            errors--
        }

        if (errors > 0) {
            toast.error("Please fill in all the required fields.");
            return;
        }

        const data = {
            name,
            email,
            completeAddress: `${addressLine} ${addressLine2}, ${city}, ${state} ${zipCode}`,
            eventUrl: event?.eventURL,
        };
        const result = await createAddress(data);
        if (result) {
            router.push(`/thankyou/${event?.eventURL}`);
        }
    }


    // const calculateTimeLeft = () => {
    //     const eventDate = new Date(event?.eventDate);
    //     const now = new Date().getTime();
    //     const difference = eventDate - now;
    
    //     let timeLeft = {};
    
    //     if (difference > 0) {
    //       timeLeft = {
    //         days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    //         hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
    //         minutes: Math.floor((difference / 1000 / 60) % 60),
    //         seconds: Math.floor((difference / 1000) % 60),
    //       };
    //     }
    
    //     return timeLeft;
    // };
    
    // const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

    // useEffect(() => {
    //     const timer = setTimeout(() => {
    //       setTimeLeft(calculateTimeLeft());
    //     }, 1000);
    
    //     return () => clearTimeout(timer);
    //   });
    // const countdown = timeLeft.days !== undefined ? (
    //     <p>Countdown: {timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m {timeLeft.seconds}s</p>
    // ) : (
    //     <p>Event has passed</p>
    // );

  

    return (
        <div className="flex flex-col md:flex-row gap-8 container min-h-screen">
            {loading?
            <div className="w-full grid place-items-center">
                <CustomSpinner/>
            </div>:
            <>
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
                    isInvalid={invalidName}
                    errorMessage={invalidName && "Please enter a valid name"}
                    onChange={(e) => setName(e.target.value)}
                    />
                    <Input
                    label="Email"
                    type="text"
                    labelPlacement="outside"
                    placeholder="your@mail.com"
                    isRequired
                    isInvalid={invalidEmail}
                    errorMessage={invalidEmail && "Please enter a valid email"}
                    onChange={(e) => setEmail(e.target.value)}
                    />
                    <Input
                    label="Street address"
                    type="text"
                    labelPlacement="outside"
                    placeholder="123 E 4 S St"
                    isRequired
                    isInvalid={invalidAddressLine}
                    errorMessage={invalidAddressLine && "Please enter a valid address"}
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
                        isInvalid={invalidCity}
                        errorMessage={invalidCity && "Please enter a valid city"}
                        onChange={(e) => setCity(e.target.value)}
                        />
                        <Input
                        label="State"
                        type="text"
                        labelPlacement="outside"
                        placeholder="NY"
                        isRequired
                        isInvalid={invalidState}
                        errorMessage={invalidState && "Please enter a valid state"}
                        onChange={(e) => setState(e.target.value)}
                        />
                        <Input
                        label="Zip Code"
                        type="text"
                        labelPlacement="outside"
                        placeholder="10001"
                        isRequired
                        isInvalid={invalidZipCode}
                        errorMessage={invalidZipCode && "Please enter a valid zip code"}
                        onChange={(e) => setZipCode(e.target.value)}
                        />
                    </div>
                    <Button color="primary" className="text-black" onClick={(e)=>handleSubmit(e)}>
                        Send address
                    </Button>
                </section>
            </div>
            </>
            }
        </div>
    )
}