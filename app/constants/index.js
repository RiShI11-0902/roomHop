// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Textarea } from "@/components/ui/textarea";

// const formComponents = {
//   "Your Details": (
//     <>
//       <Input placeholder="Full Name" name="fullName" value={formData.fullName} onChange={handleChange} required />
//       <Input placeholder="Email Address" type="email" name="email" value={formData.email} onChange={handleChange} required />
//       <Input placeholder="Phone Number" type="tel" name="phone" value={formData.phone} onChange={handleChange} required />
//       <Input placeholder="Age" type="number" name="age" value={formData.age} onChange={handleChange} required />
//       <select className="input-field" name="gender" value={formData.gender} onChange={handleChange}>
//         <option value="">Select Gender</option>
//         <option value="male">Male</option>
//         <option value="female">Female</option>
//         <option value="other">Other</option>
//       </select>
//     </>
//   ),

//   "Room Details": (
//     <>
//       <Input placeholder="Listed By (Your Name or ID)" name="listedBy" value={formData.listedBy} onChange={handleChange} required />
//       <Input placeholder="Listing Title" name="title" value={formData.title} onChange={handleChange} required />
//       <Input placeholder="Address" name="address" value={formData.address} onChange={handleChange} required />
//       <Input placeholder="Rent (in ₹)" type="number" name="rent" value={formData.rent} onChange={handleChange} required />
//       <Textarea placeholder="Room Description" name="description" value={formData.description} onChange={handleChange} />
//       <Textarea placeholder="Amenities (WiFi, AC, etc.) - Separate with commas" name="amenities" value={formData.amenities} onChange={handleChange} />

//       <Label>Available From</Label>
//       <Input type="date" name="availableFrom" value={formData.availableFrom} onChange={handleChange} required />

//       <Label>Gender Preference</Label>
//       <select name="genderPreference" value={formData.genderPreference} onChange={handleChange} className="input-field">
//         <option value="Any">Any</option>
//         <option value="Male">Male</option>
//         <option value="Female">Female</option>
//       </select>

//       <Label>Is this a roommate request?</Label>
//       <input type="checkbox" name="isRoommateRequest" checked={formData.isRoommateRequest} onChange={handleCheckboxChange} />
//     </>
//   ),

//   "Other Details": (
//     <>
//       <Textarea placeholder="Additional Preferences (Veg/Non-Veg, Smoker, etc.)" name="preferences" value={formData.preferences} onChange={handleChange} />
//       <Input placeholder="Preferred Roommate Age Range" type="text" name="roommateAge" value={formData.roommateAge} onChange={handleChange} />
//       <Input placeholder="Contact Number" type="tel" name="contact" value={formData.contact} onChange={handleChange} required />
//     </>
//   ),

//   "Add Image": (
//     <>
//       <Label>Upload Images</Label>
//       <input type="file" name="images" multiple onChange={handleFileChange} />
//     </>
//   ),
// };

// export default formComponents

// // import { useState } from "react";
// // import { Input } from "@/components/ui/input";
// // import { Label } from "@/components/ui/label";
// // import { Textarea } from "@/components/ui/textarea";

// // const FormRenderer = ({ type }) => {
// //   const [formData, setFormData] = useState({
// //     fullName: "",
// //     email: "",
// //     phone: "",
// //     age: "",
// //     gender: "",
// //     listedBy: "",
// //     title: "",
// //     address: "",
// //     rent: "",
// //     description: "",
// //     amenities: "",
// //     images: null,
// //     availableFrom: "",
// //     genderPreference: "Any",
// //     isRoommateRequest: false,
// //     contact: "",
// //     preferences: "",
// //     roommateAge: "",
// //   });

// //   // Handle text input changes
// //   const handleChange = (e) => {
// //     const { name, value } = e.target;
// //     setFormData((prevData) => ({
// //       ...prevData,
// //       [name]: value,
// //     }));
// //   };

// //   // Handle checkbox change
// //   const handleCheckboxChange = (e) => {
// //     setFormData((prevData) => ({
// //       ...prevData,
// //       [e.target.name]: e.target.checked,
// //     }));
// //   };

// //   // Handle file input
// //   const handleFileChange = (e) => {
// //     setFormData((prevData) => ({
// //       ...prevData,
// //       images: e.target.files,
// //     }));
// //   };

// //   // Handle form submission
// //   const handleSubmit = async (e) => {
// //     e.preventDefault();

// //     const formDataToSend = new FormData();
// //     Object.keys(formData).forEach((key) => {
// //       if (key === "images") {
// //         if (formData.images) {
// //           Array.from(formData.images).forEach((file) => {
// //             formDataToSend.append("images", file);
// //           });
// //         }
// //       } else {
// //         formDataToSend.append(key, formData[key]);
// //       }
// //     });

// //     try {
// //       const response = await fetch("/api/rooms", {
// //         method: "POST",
// //         body: formDataToSend,
// //       });

// //       if (response.ok) {
// //         alert("Form submitted successfully!");
// //         setFormData({
// //           fullName: "",
// //           email: "",
// //           phone: "",
// //           age: "",
// //           gender: "",
// //           listedBy: "",
// //           title: "",
// //           address: "",
// //           rent: "",
// //           description: "",
// //           amenities: "",
// //           images: null,
// //           availableFrom: "",
// //           genderPreference: "Any",
// //           isRoommateRequest: false,
// //           contact: "",
// //           preferences: "",
// //           roommateAge: "",
// //         });
// //       } else {
// //         alert("Failed to submit.");
// //       }
// //     } catch (error) {
// //       console.error("Error submitting form:", error);
// //     }
// //   };

// //   const formComponents = {
// //     "Your Details": (
// //       <>
// //         <Input placeholder="Full Name" name="fullName" value={formData.fullName} onChange={handleChange} required />
// //         <Input placeholder="Email Address" type="email" name="email" value={formData.email} onChange={handleChange} required />
// //         <Input placeholder="Phone Number" type="tel" name="phone" value={formData.phone} onChange={handleChange} required />
// //         <Input placeholder="Age" type="number" name="age" value={formData.age} onChange={handleChange} required />
// //         <select className="input-field" name="gender" value={formData.gender} onChange={handleChange}>
// //           <option value="">Select Gender</option>
// //           <option value="male">Male</option>
// //           <option value="female">Female</option>
// //           <option value="other">Other</option>
// //         </select>
// //       </>
// //     ),

// //     "Room Details": (
// //       <>
// //         <Input placeholder="Listed By (Your Name or ID)" name="listedBy" value={formData.listedBy} onChange={handleChange} required />
// //         <Input placeholder="Listing Title" name="title" value={formData.title} onChange={handleChange} required />
// //         <Input placeholder="Address" name="address" value={formData.address} onChange={handleChange} required />
// //         <Input placeholder="Rent (in ₹)" type="number" name="rent" value={formData.rent} onChange={handleChange} required />
// //         <Textarea placeholder="Room Description" name="description" value={formData.description} onChange={handleChange} />
// //         <Textarea placeholder="Amenities (WiFi, AC, etc.) - Separate with commas" name="amenities" value={formData.amenities} onChange={handleChange} />

// //         <Label>Available From</Label>
// //         <Input type="date" name="availableFrom" value={formData.availableFrom} onChange={handleChange} required />

// //         <Label>Gender Preference</Label>
// //         <select name="genderPreference" value={formData.genderPreference} onChange={handleChange} className="input-field">
// //           <option value="Any">Any</option>
// //           <option value="Male">Male</option>
// //           <option value="Female">Female</option>
// //         </select>

// //         <Label>Is this a roommate request?</Label>
// //         <input type="checkbox" name="isRoommateRequest" checked={formData.isRoommateRequest} onChange={handleCheckboxChange} />
// //       </>
// //     ),

// //     "Other Details": (
// //       <>
// //         <Textarea placeholder="Additional Preferences (Veg/Non-Veg, Smoker, etc.)" name="preferences" value={formData.preferences} onChange={handleChange} />
// //         <Input placeholder="Preferred Roommate Age Range" type="text" name="roommateAge" value={formData.roommateAge} onChange={handleChange} />
// //         <Input placeholder="Contact Number" type="tel" name="contact" value={formData.contact} onChange={handleChange} required />
// //       </>
// //     ),

// //     "Add Image": (
// //       <>
// //         <Label>Upload Images</Label>
// //         <input type="file" name="images" multiple onChange={handleFileChange} />
// //       </>
// //     ),
// //   };

// //   return (
// //     <form onSubmit={handleSubmit} className="space-y-4">
// //       {formComponents[type] || <p>No form available for this type.</p>}
// //       <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded-lg mt-4">
// //         Submit
// //       </button>
// //     </form>
// //   );
// // };

// // export default FormRenderer;
