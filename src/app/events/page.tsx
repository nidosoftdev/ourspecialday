"use client"
import { useEffect, useState } from 'react'
import { getAllEvent } from '../server_layer/event'
import { useUser } from "../components/context/UserContext";

export default function page() {
  const [events, setEvents] = useState<any>([])

  const { userData } = useUser()
  console.log(userData)
  useEffect(()=> {
    const fetchEvents = async ()=> {
      const result = await getAllEvent(userData?.uid)
      setEvents(result)
    }
    fetchEvents()
  
  }, [userData])
  console.log(events)
  return (
    <div className='container min-h-screen'>
        <div>
          <h1 className='text-3xl font-bold'>Manage Events</h1>
          <p className='text-xs text-slate-500 mt-4'>Select an event to edit or delet it</p>
        </div>
        <div className='mt-8 flex flex-col md:flex-row gap-3 flex-wrap'>
            {events.map((event: any, key:any)=> {
                return (
                    <a key={event.id}
                    href={`/events/${event.eventURL}`}
                    className="flex items-center md:w-1/2 w-full  cursor-pointer gap-4 
                    border rounded-md shadow-sm 
                   hover:bg-zinc-50"
                    >
                        <div className='bg-violet-200 text-sm md:text-md h-ful py-3 px-6 rounded-sm grid place-items-center w-1/5'>
                          <h2>{
                            `${new Intl.DateTimeFormat('en-US', {month: 'long', day: "numeric"}).format(new Date(event.eventDate))}`
                            }</h2>
                            <h2>{
                            `${new Intl.DateTimeFormat('en-US', { year: "numeric"}).format(new Date(event.eventDate))}`
                            }</h2>
                        </div>
                        <p className='text-md md:text-xl'>{event.eventName}</p>
                    </a>
                )
            })}
        </div>
        <div>
          <a href="./newevent" className='block bg-primary rounded-md py-3 px-2 mt-8 w-fit'>Create new event</a>
        </div>
    </div>
  )
}