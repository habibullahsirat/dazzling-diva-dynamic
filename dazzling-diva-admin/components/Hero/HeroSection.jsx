// "use client";

// import { useEffect, useState } from "react";
// import HeroList from "./HeroList";
// import HeroForm from "./HeroForm";

// export default function HeroSection() {
//   const [heroes, setHeroes] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [open, setOpen] = useState(false);

//   async function fetchHeroes() {
//     setLoading(true);

//     try {
//       const res = await fetch("/api/heroes");
//       const data = await res.json();

//       setHeroes(data);
//     } finally {
//       setLoading(false);
//     }
//   }

//   useEffect(() => {
//     fetchHeroes();
//   }, []);

//   return (
//     <>
//       <div className="mb-8 flex items-center justify-between">
//         <h2 className="text-3xl font-bold">Total Heroes ({heroes.length})</h2>

//         <button
//           onClick={() => setOpen(true)}
//           className="rounded bg-blue-600 px-5 py-2 text-white"
//         >
//           Add Hero
//         </button>
//       </div>

//       {loading ? (
//         <p>Loading...</p>
//       ) : (
//         <HeroList heroes={heroes} setHeroes={setHeroes} />
//       )}

//       {open && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
//           <div className="w-full max-w-xl rounded-lg bg-white p-6">
//             <div className="mb-5 flex items-center justify-between">
//               <h3 className="text-2xl font-bold">Add Hero</h3>

//               <button onClick={() => setOpen(false)} className="text-2xl">
//                 ✕
//               </button>
//             </div>

//             <HeroForm
//               onClose={() => setOpen(false)}
//               onSuccess={(hero) => setHeroes((prev) => [hero, ...prev])}
//             />
//           </div>
//         </div>
//       )}
//     </>
//   );
// }

"use client";

import { useEffect, useState } from "react";
import HeroForm from "./HeroForm";
import HeroList from "./HeroList";

export default function HeroSection() {
  const [heroes, setHeroes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);

  async function fetchHeroes() {
    try {
      setLoading(true);

      const res = await fetch("/api/heroes");

      if (!res.ok) {
        throw new Error("Failed to fetch heroes");
      }

      const data = await res.json();
      setHeroes(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchHeroes();
  }, []);

  return (
    <>
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-bold">Total Heroes ({heroes.length})</h2>

        <button
          onClick={() => setOpen(true)}
          className="rounded bg-blue-600 px-5 py-2 text-white hover:bg-blue-700"
        >
          Add Hero
        </button>
      </div>

      {/* Hero List */}
      {loading ? (
        <p className="text-center py-10">Loading...</p>
      ) : (
        <HeroList heroes={heroes} setHeroes={setHeroes} />
      )}

      {/* Modal */}
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="w-full max-w-2xl rounded-lg bg-white p-6">
            <div className="mb-5 flex items-center justify-between">
              <h3 className="text-2xl font-bold">Add Hero</h3>

              <button
                onClick={() => setOpen(false)}
                className="text-2xl font-bold"
              >
                ×
              </button>
            </div>

            <HeroForm onSuccess={fetchHeroes} onClose={() => setOpen(false)} />
          </div>
        </div>
      )}
    </>
  );
}
