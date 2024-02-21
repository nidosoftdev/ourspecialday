"use client";
import { useState } from "react";
import ContactList from "../components/ContactList";
export default function AdressBook() {
  return (
    <div>
      <h1 className="text-3xl font-bold">Adress Book</h1>
      <div className="mt-8">
        <ContactList />
      </div>
    </div>
  );
}
