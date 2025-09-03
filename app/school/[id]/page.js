// // File: app/school/[id]/page.js

// 'use client';

// import { useEffect, useState } from 'react';
// import { useParams, useRouter } from 'next/navigation';
// import Image from 'next/image';

// export default function SchoolDetails() {
//     const params = useParams();
//     const id = params.id;

//     const [school, setSchool] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const router = useRouter();

//     useEffect(() => {
//         if (id) {
//             const fetchSchoolDetails = async () => {
//                 try {
//                     const response = await fetch(`/api/getSchool?id=${id}`);
//                     if (!response.ok) {
//                         throw new Error('Failed to fetch school details');
//                     }
//                     const data = await response.json();
//                     setSchool(data);
//                 } catch (error) {
//                     console.error('Error fetching data:', error);
//                 } finally {
//                     setLoading(false);
//                 }
//             };
//             fetchSchoolDetails();
//         }
//     }, [id]);

//     const handleDelete = async () => {
//         if (!window.confirm(`Are you sure you want to delete ${school.name}?`)) {
//             return;
//         }

//         try {
//             const response = await fetch(`/api/deleteSchool/${id}`, {
//                 method: 'DELETE',
//             });
//             if (!response.ok) {
//                 throw new Error('Failed to delete school');
//             }
//             alert('School deleted successfully!');
//             router.push('/showSchools');
//         } catch (error) {
//             console.error('Error deleting school:', error);
//             alert('Failed to delete school. Please try again.');
//         }
//     };

//     if (loading) {
//         return <div className="text-center mt-12 text-gray-500">Loading school details...</div>;
//     }

//     if (!school) {
//         return <div className="text-center mt-12 text-gray-500">School not found.</div>;
//     }

//     return (
//         <div className="max-w-4xl mx-auto my-6 p-6 bg-white rounded-lg shadow-lg">
//             <div className="relative w-full h-80 mb-6 rounded-lg overflow-hidden">
//                 {school.image ? (
//                     <Image
//                         src={school.image}
//                         alt={school.name}
//                         fill
//                         style={{ objectFit: 'cover' }}
//                         sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
//                     />
//                 ) : (
//                     <div className="bg-gray-200 w-full h-full flex items-center justify-center">
//                         <span className="text-gray-400 text-3xl">No Image</span>
//                     </div>
//                 )}
//             </div>
//             <h1 className="text-4xl font-bold mb-4 text-gray-900">{school.name}</h1>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-lg text-gray-700">
//                 <div className="bg-gray-50 p-4 rounded-md">
//                     <span className="font-semibold text-gray-800">Address:</span> {school.address}
//                 </div>
//                 <div className="bg-gray-50 p-4 rounded-md">
//                     <span className="font-semibold text-gray-800">City:</span> {school.city}
//                 </div>
//                 <div className="bg-gray-50 p-4 rounded-md">
//                     <span className="font-semibold text-gray-800">State:</span> {school.state}
//                 </div>
//                 <div className="bg-gray-50 p-4 rounded-md">
//                     <span className="font-semibold text-gray-800">Contact:</span> {school.contact}
//                 </div>
//                 <div className="bg-gray-50 p-4 rounded-md">
//                     <span className="font-semibold text-gray-800">Email:</span> {school.email_id}
//                 </div>
//             </div>
//             <div className="mt-8 flex justify-end gap-4">
//                 <button
//                     onClick={handleDelete}
//                     className="bg-red-500 text-white font-bold py-2 px-6 rounded-full shadow-lg hover:bg-red-600 transition-colors duration-300"
//                 >
//                     Delete
//                 </button>
//                 <button
//                     onClick={() => router.back()}
//                     className="bg-gray-500 text-white font-bold py-2 px-6 rounded-full shadow-lg hover:bg-gray-600 transition-colors duration-300"
//                 >
//                     Back
//                 </button>
//             </div>
//         </div>
//     );
// }



'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';

export default function SchoolDetails() {
  const params = useParams();
  const id = params.id;

  const [school, setSchool] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (id) {
      const fetchSchoolDetails = async () => {
        try {
          const response = await fetch(`/api/getSchool?id=${id}`);
          if (!response.ok) throw new Error('Failed to fetch school details');

          const data = await response.json();

          // Make sure image path is relative to /public
          if (data.image && !data.image.startsWith('/')) {
            data.image = `/uploads/${data.image}`;
          }

          setSchool(data);
        } catch (error) {
          console.error('Error fetching data:', error);
        } finally {
          setLoading(false);
        }
      };
      fetchSchoolDetails();
    }
  }, [id]);

  const handleDelete = async () => {
    if (!window.confirm(`Are you sure you want to delete ${school.name}?`)) return;

    try {
      const response = await fetch(`/api/deleteSchool/${id}`, { method: 'DELETE' });
      if (!response.ok) throw new Error('Failed to delete school');

      alert('School deleted successfully!');
      router.push('/showSchools');
    } catch (error) {
      console.error('Error deleting school:', error);
      alert('Failed to delete school. Please try again.');
    }
  };

  if (loading) return <div className="text-center mt-12 text-gray-500">Loading school details...</div>;
  if (!school) return <div className="text-center mt-12 text-gray-500">School not found.</div>;

  return (
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
  );
}
