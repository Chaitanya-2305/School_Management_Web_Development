// // File: app/showSchools/page.js

// 'use client';

// import { useEffect, useState } from 'react';
// import Image from 'next/image';
// import Link from 'next/link';
// import { useSearchParams, usePathname, useRouter } from 'next/navigation';

// const indianStates = [
//   "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
//   "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka",
//   "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram",
//   "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu",
//   "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal"
// ];

// export default function ShowSchools() {
//   const searchParams = useSearchParams();
//   const pathname = usePathname();
//   const { push } = useRouter();

//   const [schools, setSchools] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // local input state (no lag on typing)
//   const [inputValue, setInputValue] = useState('');
//   const [searchQuery, setSearchQuery] = useState('');
//   const [selectedState, setSelectedState] = useState('');

//   useEffect(() => {
//     const fetchSchools = async () => {
//       try {
//         const response = await fetch('/api/getSchool');
//         if (!response.ok) throw new Error('Failed to fetch schools');
//         const data = await response.json();
//         setSchools(data);
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchSchools();
//   }, []);

//   // Sync URL -> state
//   useEffect(() => {
//     const urlSearchQuery = searchParams.get('search') || '';
//     const urlSelectedState = searchParams.get('state') || '';
//     setInputValue(urlSearchQuery);
//     setSearchQuery(urlSearchQuery);
//     setSelectedState(urlSelectedState);
//   }, [searchParams]);

//   // Debounce search (wait 300ms after typing stops)
//   useEffect(() => {
//     const timeout = setTimeout(() => {
//       const params = new URLSearchParams(searchParams);
//       if (inputValue) {
//         params.set('search', inputValue);
//       } else {
//         params.delete('search');
//       }
//       push(`${pathname}?${params.toString()}`);
//     }, 300);

//     return () => clearTimeout(timeout);
//   }, [inputValue]);

//   const handleFilterState = (e) => {
//     const state = e.target.value;
//     const params = new URLSearchParams(searchParams);
//     if (state) {
//       params.set('state', state);
//     } else {
//       params.delete('state');
//     }
//     push(`${pathname}?${params.toString()}`);
//   };

//   const filteredSchools = schools.filter((school) => {
//     const matchesSearch =
//       (school.name ?? '').toLowerCase().includes(searchQuery.toLowerCase()) ||
//       (school.address ?? '').toLowerCase().includes(searchQuery.toLowerCase()) ||
//       (school.city ?? '').toLowerCase().includes(searchQuery.toLowerCase());

//     const matchesState =
//       !selectedState ||
//       (school.state ?? '').toLowerCase() === selectedState.toLowerCase();

//     return matchesSearch && matchesState;
//   });

//   if (loading) {
//     return <div className="text-center mt-12 text-gray-500">Loading schools...</div>;
//   }

//   return (
//     <div className="max-w-6xl mx-auto my-6 p-4">
//       <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">List of Schools</h1>
//       <div className="flex justify-center items-center mb-6 gap-4">
//         <input
//           type="text"
//           placeholder="Search by name, address or city..."
//           value={inputValue}
//           onChange={(e) => setInputValue(e.target.value)}
//           className="w-1/2 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//         />
//         <select
//           value={selectedState}
//           onChange={handleFilterState}
//           className="w-1/2 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//         >
//           <option value="">All States</option>
//           {indianStates.map((state, index) => (
//             <option key={index} value={state}>
//               {state}
//             </option>
//           ))}
//         </select>
//       </div>
//       {filteredSchools.length === 0 ? (
//         <div className="text-center mt-12 text-gray-500">No schools found matching your criteria.</div>
//       ) : (
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//           {filteredSchools.map((school) => (
//             <div
//               key={school.id}
//               className="bg-white rounded-lg shadow-lg overflow-hidden transform transition-transform duration-300 hover:scale-105"
//             >
//               <div className="relative w-full h-48">
//                 {school.image ? (
//                   <Image
//                     src={school.image}
//                     alt={school.name}
//                     fill
//                     style={{ objectFit: 'cover' }}
//                     sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
//                   />
//                 ) : (
//                   <div className="bg-gray-200 w-full h-full flex items-center justify-center">
//                     <span className="text-gray-400 text-lg">No Image</span>
//                   </div>
//                 )}
//               </div>
//               <div className="p-5 flex flex-col justify-between items-center">
//                 <h2 className="text-xl font-semibold text-gray-800 mb-2">{school.name}</h2>
//                 <p className="text-sm text-gray-500 mb-4">
//                   {school.city ?? 'N/A'}, {school.state ?? 'N/A'}
//                 </p>
//                 <Link
//                   href={`/school/${school.id}`}
//                   className="bg-blue-500 text-white font-bold py-2 px-6 rounded-full shadow-lg hover:bg-blue-600 transition-colors duration-300"
//                 >
//                   View Details
//                 </Link>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }


import { Suspense } from "react";
import ShowSchoolsClient from "./ShowSchoolsClient";

// 👇 Force this page to be rendered on the client, not prerendered
export const dynamic = "force-dynamic";

export default function ShowSchoolsPage() {
  return (
    <Suspense fallback={<div className="text-center mt-12 text-gray-500">Loading...</div>}>
      <ShowSchoolsClient />
    </Suspense>
  );
}


