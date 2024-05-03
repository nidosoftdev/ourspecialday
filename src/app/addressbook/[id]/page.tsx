"use client";
import ContactList from "../../components/ContactList";
import { getAllAddress } from "@/app/server_layer/address";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function AdressBook() {

  
  


  return (
    <div className="container">
      <h1 className="text-3xl font-bold">Address Book</h1>
      <div className="mt-8">
        <ContactList />
      </div>
    </div>
  );
}
