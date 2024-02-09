"use client";
import { Input, Textarea } from "@nextui-org/react";
import { useState } from "react";

export default function CreateSite() {
  const [sections, setSections] = useState([]);
  const [sectionTitle, setSectionTitle] = useState("");
  const [content, setContent] = useState("");
  const [sectionImage, setSectionImage] = useState("");
  const [month, setMonth] = useState();
  const [day, setDay] = useState();
  const [year, setYear] = useState();

  const handleMonthChange = (e) => {
    const value = e.target.value;
    const regex = /^[0-9]{0,2}$/; // Allows up to 2 digits

    if (regex.test(value) && (value === "" || parseInt(value, 10) < 13)) {
      setMonth(value);
    }
  };

  const handleDayChange = (e) => {
    const value = e.target.value;
    const regex = /^[0-9]{0,2}$/; // Allows up to 2 digits

    if (regex.test(value) && (value === "" || parseInt(value, 10) < 32)) {
      setDay(value);
    }
  };

  const handleYearChange = (e) => {
    const value = e.target.value;
    const regex = /^[0-9]{0,4}$/; // Allows up to 2 digits

    if (regex.test(value) && (value === "" || parseInt(value, 10) < 2100)) {
      setYear(value);
    }
  };

  const addSection = () => {
    // Use a timestamp as a simple unique ID
    const newSection = {
      id: Date.now(),
      title: sectionTitle,
      content: content,
      image: sectionImage,
    };
    if (sections.length < 0) {
      setSections([newSection]);
    } else {
      setSections([...sections, newSection]);
    }
  };

  const removeSection = (id) => {
    setSections(sections.filter((section) => section.id !== id));
  };
  console.log(sections);
  return (
    <div>
      <h1 className="text-3xl font-bold">Create Site</h1>
      <div className="mt-8 flex flex-col gap-8">
        <Input
          label="Site Title"
          placeholder="I.E Jhon & Alicia"
          labelPlacement="outside"
        />
        <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
          Header Image
          <input
            className="mt-2 block w-full cursor-pointer rounded-xl bg-[#F5F5F5] p-2 text-sm text-gray-900 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-gray-400 dark:placeholder-gray-400"
            type="file"
          />
        </label>
        <h2 className="text-xl font-bold">Event Date</h2>
        <div className="flex gap-4">
          <Input
            label="Month"
            type="text"
            labelPlacement="outside"
            placeholder="MM"
            isRequired
            value={month}
            onChange={(e) => handleMonthChange(e)}
          />
          <Input
            label="Day"
            type="text"
            labelPlacement="outside"
            placeholder="DD"
            isRequired
            value={day}
            onChange={(e) => handleDayChange(e)}
          />
          <Input
            label="Year"
            type="text"
            placeholder="YYYY"
            labelPlacement="outside"
            isRequired
            value={year}
            onChange={(e) => handleYearChange(e)}
          />
        </div>
      </div>

      {/* Sections */}
      <h2 className="mt-12 text-xl font-bold">Sections</h2>
      {sections.length < 1 ? (
        <p className="mt-8">Start by adding a section</p>
      ) : (
        ""
      )}
      <div className="mt-8 flex flex-col gap-8">
        {sections.map((section) => (
          <div key={section.id} className="flex flex-col gap-8">
            <Input
              label="Section Title"
              labelPlacement="outside"
              placeholder="I.E: Our Story"
              onChange={(e) => setSectionTitle(e.target.value)}
            />
            <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
              Section Image
              <input
                className="mt-2 block w-full cursor-pointer rounded-xl bg-[#F5F5F5] p-2 text-sm text-gray-900 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-gray-400 dark:placeholder-gray-400"
                type="file"
                onChange={(e) => setSectionImage(e.target.value)}
              />
            </label>
            <Textarea
              label="Section Content"
              labelPlacement="outside"
              onChange={(e) => setContent(e.target.value)}
            />
            <a
              className="flex cursor-pointer items-center text-sm text-red-500 underline"
              onClick={() => removeSection(section.id)}
            >
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="icon icon-tabler icon-tabler-trash"
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
              </span>
              Remove section
            </a>

            <hr></hr>
          </div>
        ))}
      </div>
      <button
        className="bg-primary mt-8 rounded-md p-2 text-white"
        onClick={() => addSection()}
      >
        Add Section
      </button>
    </div>
  );
}
