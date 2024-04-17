"use client";
import { useState, useEffect } from "react";
import { getAllAddress } from "../server_layer/address";
import data from "./data.json";

export default function ContactList() {
  const [filter, setFilter] = useState("");
  const [filteredContacts, setFilteredContacts] = useState(data);
  const [isPrintView, setIsPrintView] = useState(false);


  useEffect(() => {
    const getAddresses = async () => {
      try {
        console.log("here")
        const result:any = await getAllAddress("AC8WTOtkY6P4oxtYdXFU");
        console.log(result);
        const filteredData = result.filter((contact:any) =>
        contact.name.toLowerCase().includes(filter.toLowerCase()),
      );
        setFilteredContacts(filteredData);
      } catch (error) {
        console.log(error);
      }
    }
    // getAddresses();
 

  }, [filter]);

  console.log(filteredContacts)
  const handlePrint = () => {
    setIsPrintView(true);
    window.print();
  };



  return (
    <div>
      <input
        type="text"
        placeholder="Search by name..."
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        className={`mb-4 rounded border p-2 no-print`}
      />
      <button
        className="no-print bg-primary mt-8 rounded-md p-4 text-white"
        onClick={handlePrint}
      >
        Download as PDF
      </button>
      <ul className="flex flex-col gap-4">
        {filteredContacts.map((contact:any, index:any) => {
          return (
            <li
              key={index}
              className="flex items-center justify-between rounded-md border p-6"
            >
              <div>
                <h2 className="text-lg font-bold">{contact.name}</h2>
                <div className="mt-2 flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="icon icon-tabler icon-tabler-mail"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    fill="none"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M3 7a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v10a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-10z" />
                    <path d="M3 7l9 6l9 -6" />
                  </svg>
                  <p>{contact.email}</p>
                </div>
                <div className="mt-2 flex gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="icon icon-tabler icon-tabler-map-pin"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    fill="none"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M9 11a3 3 0 1 0 6 0a3 3 0 0 0 -6 0" />
                    <path d="M17.657 16.657l-4.243 4.243a2 2 0 0 1 -2.827 0l-4.244 -4.243a8 8 0 1 1 11.314 0z" />
                  </svg>
                  <p>{contact.address}</p>
                </div>
              </div>
              <div className="hover:text-red-600 cursor-pointer">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="icon icon-tabler icon-tabler-trash"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  fill="none"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M4 7l16 0" />
                  <path d="M10 11l0 6" />
                  <path d="M14 11l0 6" />
                  <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
                  <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
                </svg>
              </div>
            </li>
          );
        })}
      </ul>
      
    </div>
  );
}
