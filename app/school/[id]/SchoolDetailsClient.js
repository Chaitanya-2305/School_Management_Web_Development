// File: app/school/[id]/SchoolDetailsClientComponent.js

'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

const Header = ({ currentPage }) => (
  <header className="flex justify-between items-center py-4 px-5 border-b-0 bg-gray-100">
    <div className="flex items-center gap-2">
      <h2 className="text-2xl font-bold text-gray-800">School Data Manager</h2>
    </div>
    <nav className="flex items-center gap-4">
      <a
        href="/showSchools"
        className={`no-underline text-gray-600 ${currentPage === 'showSchools' ? 'font-bold' : ''}`}
      >
        Show Schools
      </a>
      <a
        href="/addSchool"
        className={`no-underline text-gray-600 ${currentPage === 'addSchool' ? 'font-bold' : ''}`}
      >
        Add School
      </a>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="cursor-pointer text-gray-600"
      >
        <circle cx="12" cy="7" r="4" />
        <path d="M12 15a8 8 0 0 0-8 8H4a8 8 0 0 0 16 0z" />
      </svg>
    </nav>
  </header>
);

export default function SchoolDetailsClientComponent({ id }) {
  const [school, setSchool] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (!id) return;

    const fetchSchoolDetails = async () => {
      try {
        const response = await fetch(`/api/getSchool?id=${Number(id)}`);
        if (!response.ok) {
          if (response.status === 404) {
            setSchool(null);
            return;
          }
          throw new Error('Failed to fetch school details');
        }
        const data = await response.json();
        setSchool(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSchoolDetails();
  }, [id]);

  const handleDelete = async () => {
    if (!window.confirm(`Are you sure you want to delete ${school.name}?`)) return;

    try {
      const response = await fetch(`/api/deleteSchool/${Number(id)}`, { method: 'DELETE' });
      if (!response.ok) throw new Error('Failed to delete school');

      alert('School deleted successfully!');
      router.push('/showSchools');
    } catch (error) {
      console.error('Error deleting school:', error);
      alert('Failed to delete school. Please try again.');
    }
  };

  if (loading)
    return <div className="text-center mt-12 text-gray-500">Loading school details...</div>;

  if (!school)
    return <div className="text-center mt-12 text-gray-500">School not found.</div>;

  return (
    <>
      <Header currentPage="showSchools" />
      <div className="max-w-4xl mx-auto my-6 p-6 bg-white rounded-lg shadow-lg">
        <div className="relative w-full h-80 mb-6 rounded-lg overflow-hidden">
          {school.image ? (
            <Image
              src={school.image}
              alt={school.name}
              fill
              style={{ objectFit: 'cover' }}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          ) : (
            <div className="bg-gray-200 w-full h-full flex items-center justify-center">
              <span className="text-gray-400 text-3xl">No Image</span>
            </div>
          )}
        </div>
        <h1 className="text-4xl font-bold mb-4 text-gray-900">{school.name}</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-lg text-gray-700">
          <div className="bg-gray-50 p-4 rounded-md">
            <span className="font-semibold text-gray-800">Address:</span> {school.address}
          </div>
          <div className="bg-gray-50 p-4 rounded-md">
            <span className="font-semibold text-gray-800">City:</span> {school.city}
          </div>
          <div className="bg-gray-50 p-4 rounded-md">
            <span className="font-semibold text-gray-800">State:</span> {school.state}
          </div>
          <div className="bg-gray-50 p-4 rounded-md">
            <span className="font-semibold text-gray-800">Contact:</span> {school.contact}
          </div>
          <div className="bg-gray-50 p-4 rounded-md">
            <span className="font-semibold text-gray-800">Email:</span> {school.email_id}
          </div>
        </div>
        <div className="mt-8 flex justify-end gap-4">
          <button
            onClick={handleDelete}
            className="bg-red-500 text-white font-bold py-2 px-6 rounded-full shadow-lg hover:bg-red-600 transition-colors duration-300"
          >
            Delete
          </button>
          <button
            onClick={() => router.back()}
            className="bg-gray-500 text-white font-bold py-2 px-6 rounded-full shadow-lg hover:bg-gray-600 transition-colors duration-300"
          >
            Back
          </button>
        </div>
      </div>
    </>
  );
}
