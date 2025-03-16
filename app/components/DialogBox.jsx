"use client"

import { useState } from "react";
import FormRenderer from "./FormRenderer";
import axios from "axios";

export default function DialogBox({ setOpen, open }) {
    if (!open) return null;

    const [selectedTab, setselectedTab] = useState("Your Details")

    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        phone: "",
        age: "",
        gender: "",
        listedBy: "",
        title: "",
        address: "",
        rent: "",
        description: "",
        amenities: "",
        images: null,
        availableFrom: "",
        genderPreference: "Any",
        isRoommateRequest: false,
        contact: "",
        preferences: "",
        roommateAge: "",
      });
    
      // Handle text input changes
      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
      };
    
      // Handle checkbox change
      const handleCheckboxChange = (e) => {
        setFormData((prevData) => ({
          ...prevData,
          [e.target.name]: e.target.checked,
        }));
      };
    
      // Handle file input
      const handleFileChange = (e) => {
        setFormData((prevData) => ({
          ...prevData,
          images: e.target.files,
        }));
      };
    
      // Handle form submission
      const handleSubmit = async (e) => {
        e.preventDefault();

        console.log(formData , "formdata");
        
    
        const formDataToSend = new FormData();
        Object.keys(formData).forEach((key) => {
          if (key === "images") {
            if (formData.images) {
              Array.from(formData.images).forEach((file) => {
                formDataToSend.append("images", file);
              });
            }
          } else {
            formDataToSend.append(key, formData[key]);
          }
        });
    
        try {
          const response = await axios.post("/api/listroom", formData)
    
          if (response.status == 200) {
            setFormData({
              fullName: "",
              email: "",
              phone: "",
              age: "",
              gender: "",
              listedBy: "",
              title: "",
              address: "",
              rent: "",
              description: "",
              amenities: "",
              images: null,
              availableFrom: "",
              genderPreference: "Any",
              isRoommateRequest: false,
              contact: "",
              preferences: "",
              roommateAge: "",
            });
          } else {
            alert("Failed to submit.");
          }
        } catch (error) {
          console.error("Error submitting form:", error);
        }

        setOpen(false)
      };


    return (
        <div className="fixed top-0 left-0 z-50 w-full h-screen flex justify-center items-center bg-black bg-opacity-60">
            <div className="bg-white p-6 rounded-lg shadow-lg w-fit">
                <main>
                    <div className="topBar flex flex-row justify-center items-center space-x-5 ">
                        {
                            ["Your Details", "Room Details", "Other Details", "Add Image"].map((i, key) => {
                                return <div key={key} onClick={() => setselectedTab(i)} className={`text-[#F99417] border border-yellow-400 px-3 py-2 cursor-pointer rounded-2xl ${selectedTab == i ? "bg-yellow-400 text-white" : "hover:bg-yellow-200"}`}>{i}</div>
                            })
                        }
                    </div>
                    <div className="mt-6 bg-white p-6 rounded-lg shadow-md space-y-4">
                        {<FormRenderer handleCheckboxChange={handleCheckboxChange} formData={formData} handleChange={handleChange} handleFileChange={handleFileChange} type={selectedTab} />}
                    </div>
                </main>
                <div className="flex flex-row justify-around items-center">
                    <div
                        className="text-red-700 cursor-pointer mt-4 text-center"
                        onClick={() => setOpen(false)}
                    >
                        Close
                    </div>
                    <button onClick={handleSubmit} type="submit" className="px-4 py-2 bg-green-600 text-white rounded-lg mt-4">
                        Submit
                    </button>
                </div>
            </div>
        </div>
    );
}
