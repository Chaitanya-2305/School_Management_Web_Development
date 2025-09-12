// File: app/addSchool/page.js

'use client';

import { useForm } from "react-hook-form";
import { useState } from "react";

export default function AddSchool() {
    const { register, handleSubmit, reset, formState: { errors }, watch } = useForm();
    const [submitting, setSubmitting] = useState(false);
    const [message, setMessage] = useState(null);

    const imageFile = watch("image");

    const onSubmit = async (data) => {
        setSubmitting(true);
        setMessage(null);
        const formData = new FormData();
        
        formData.append("name", data.name);
        formData.append("address", data.address);
        formData.append("city", data.city);
        formData.append("state", data.state);
        formData.append("contact", data.contact);
        formData.append("email_id", data.email_id);
        
        if (data.image && data.image.length > 0) {
            formData.append("image", data.image[0]);
        }
        
        try {
            const res = await fetch("/api/addSchool", { method: "POST", body: formData });
            const msg = await res.json();
            setMessage(res.ok ? { text: msg.message, type: 'success' } : { text: msg.error, type: 'error' });
            if (res.ok) reset();
        } catch (error) {
            console.error('An error occurred on the client side:', error);
            setMessage({ text: 'An error occurred. Please try again.', type: 'error' });
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="max-w-xl mx-auto my-6 p-4 border border-gray-200 rounded-lg shadow-sm bg-white">
            <h1 className="text-3xl font-bold mb-3 text-center text-gray-800">Add New School</h1>
            <p className="text-center mb-5 text-gray-600">Fill in the details below to add a new school to the system.</p>

            {message && (
                <div className={`fixed inset-0 flex items-center justify-center z-50 bg-gray-900 bg-opacity-50`}>
                    <div className={`p-6 bg-white rounded-lg shadow-xl text-center max-w-sm ${message.type === 'success' ? 'border-green-500' : 'border-red-500'} border`}>
                        <p className="mb-4 text-lg font-semibold">{message.text}</p>
                        <button 
                            onClick={() => setMessage(null)}
                            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                        >
                            OK
                        </button>
                    </div>
                </div>
            )}
            
            <form onSubmit={handleSubmit(onSubmit)} className="grid gap-5">
                <div>
                    <label htmlFor="name" className="block mb-1 font-semibold text-gray-700">School Name</label>
                    <input id="name" placeholder="Enter school name" {...register("name", { required: "Name is required" })} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
                    {errors.name && <small className="text-red-500 block mt-1">{errors.name.message}</small>}
                </div>

                <div>
                    <label htmlFor="address" className="block mb-1 font-semibold text-gray-700">Address</label>
                    <input id="address" placeholder="Enter school address" {...register("address", { required: "Address is required" })} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
                    {errors.address && <small className="text-red-500 block mt-1">{errors.address.message}</small>}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                        <label htmlFor="city" className="block mb-1 font-semibold text-gray-700">City</label>
                        <input id="city" placeholder="Enter city" {...register("city", { required: "City is required" })} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
                        {errors.city && <small className="text-red-500 block mt-1">{errors.city.message}</small>}
                    </div>
                    <div>
                        <label htmlFor="state" className="block mb-1 font-semibold text-gray-700">State</label>
                        <input id="state" placeholder="Enter state" {...register("state", { required: "State is required" })} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
                    </div>
                </div>

                <div>
                    <label htmlFor="contact" className="block mb-1 font-semibold text-gray-700">Contact Number</label>
                    <input id="contact" placeholder="Enter contact number" type="tel" {...register("contact", { required: "Contact is required", pattern: { value: /^[0-9]{7,15}$/, message: "Enter valid number" } })} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
                    {errors.contact && <small className="text-red-500 block mt-1">{errors.contact.message}</small>}
                </div>
                
                <div>
                    <label htmlFor="email_id" className="block mb-1 font-semibold text-gray-700">Email Address</label>
                    <input id="email_id" placeholder="Enter school email" type="email" {...register("email_id", { required: "Email is required", pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Invalid email" } })} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
                    {errors.email_id && <small className="text-red-500 block mt-1">{errors.email_id.message}</small>}
                </div>

                <div>
                    <label htmlFor="image" className="block mb-1 font-semibold text-gray-700">School Image</label>
                    <div className="border-2 border-dashed border-gray-300 rounded-md p-10 text-center bg-gray-50 cursor-pointer">
                        <input type="file" id="image" accept="image/*" {...register("image", { required: "Image is required" })} className="hidden" />
                        <label htmlFor="image" className="cursor-pointer text-gray-600 block w-full h-full">
                            {imageFile && imageFile.length > 0 ? (
                                <>
                                    <div className="mb-2">
                                        <p className="text-gray-800 font-medium">{imageFile[0].name}</p>
                                    </div>
                                    <div className="flex justify-center items-center">
                                        <img src={URL.createObjectURL(imageFile[0])} alt="Image Preview" className="max-h-48 object-contain rounded-md" />
                                    </div>
                                    <span className="text-blue-500 font-bold mt-2 inline-block">Click to change</span>
                                </>
                            ) : (
                                <>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="block mx-auto mb-2">
                                        <path d="M4 14.899A5 5 0 0 1 13.203 8H15a6 6 0 0 1 0 12H6a3 3 0 0 1 0-6h.085" />
                                        <path d="M7 16l5-5 5 5" />
                                        <path d="M12 11v9" />
                                    </svg>
                                    <span>Upload a file or drag and drop</span>
                                    <br />
                                    <small className="text-gray-400">PNG, JPG, GIF up to 10MB</small>
                                </>
                            )}
                        </label>
                    </div>
                    {errors.image && <small className="text-red-500 block mt-1">{errors.image.message}</small>}
                </div>

                <button disabled={submitting} className="w-full py-3 bg-blue-600 text-white rounded-md font-bold text-lg transition-colors hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed">
                    {submitting ? "Saving..." : "Add School"}
                </button>
            </form>
        </div>
    );
}

