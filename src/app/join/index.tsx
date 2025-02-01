
"use client";

import { useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { Input } from "@/components/ui/input";
import { getArena } from "../arena/_store/_api";
import { RoomWithRelations } from "../arena/[cuid]/page";
export const Loading = () => {
  return (
    <div className="flex items-center justify-center h-[90vh]">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
    </div>
  );
}
const JoinArena = () => {
  const searchParams = useSearchParams();
  const cuid = searchParams.get("arena");

  // Always call the hook. The query only runs if `cuid` is truthy.
  const { data: room, isLoading, isError } = useQuery<RoomWithRelations>({
    queryKey: ["arena", cuid],
    queryFn: () => getArena({ cuid: cuid! }),
    enabled: Boolean(cuid),
    staleTime: 1000 * 60 * 5, // Cache for 5 minutes
  });

  // 1. No arena id? Render the "Join Battle Arena" form.
  if (!cuid) {
    return (
      <section className="flex flex-col items-center justify-center h-[80vh] overflow-hidden px-4">
        <h1 className="text-3xl font-bold text-white mb-6">Join Battle Arena</h1>
        <Input type="text" placeholder="Enter Arena ID" className="w-full max-w-md text-black" />
      </section>
    );
  }

  // 2. Better Loading Component: A full-screen centered spinner.
  if (isLoading) {
    <Loading />
  }

  // 3. 404 Page: Room doesn't exist or an error occurred.
  if (isError || !room) {
    return (
      <div className="flex flex-col items-center justify-center h-[90vh]">
        <h1 className="text-4xl font-bold text-red-500 mb-4">404</h1>
        <p className="text-lg text-gray-300">Battle Arena doesn&apos;t exist.</p>
      </div>
    );
  }

  // 4. Room exists: Render room details along with a "Join Arena" button.
  return (
    <section className="max-w-md mx-auto mt-10 p-6 bg-gray-800 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-white mb-4">{room.title}</h1>
      <p className="text-gray-300 mb-2">
        <span className="font-semibold">Status:</span> {room.status}
      </p>
      <p className="text-gray-300 mb-2">
        <span className="font-semibold">Created by:</span> {room.createdBy.name}
      </p>
      <p className="text-gray-300 mb-2">
        <span className="font-semibold">Entry Token:</span> {room.entryToken}
      </p>
      <p className="text-gray-300 mb-4">
        <span className="font-semibold">Created At:</span>{" "}
        {new Date(room.createdAt).toLocaleString()}
      </p>

      <div className="mt-4">
        <h2 className="text-xl font-semibold text-white">Configurations</h2>
        <ul className="mt-2">
          {room.config.map((cfg) => (
            <li key={cfg.id} className="text-gray-300">
              <span className="font-semibold">{cfg.key}:</span> {cfg.value}
            </li>
          ))}
        </ul>
      </div>

      <button
        className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors"
      // onClick={() => joinArena(room.id)} // Implement join logic here if needed
      >
        Join Arena
      </button>
    </section>
  );
};

export default JoinArena;

