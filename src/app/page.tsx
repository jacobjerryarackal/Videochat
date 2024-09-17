"use client";

import Image from "next/image";
import logo from "../assets/logo.png";
import useUser from "@/hooks/useUser";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { v4 as uuid } from "uuid";

export default function Home() {
  const { fullName, setFullName } = useUser();
  const [roomId, setRoomId] = useState<string>("");
  const router = useRouter();

  useEffect(() => {
    setFullName("");
  }, [setFullName]);

  const handleJoin = () => {
    if (roomId.trim()) {
      router.push(`/room/${roomId}`);
    }
  };

  const handleCreateMeeting = () => {
    router.push(`/room/${uuid()}`);
  };

  return (
    <div className="w-full h-screen">
      <section className="bg-gray-950 text-white">
        <div className="mx-auto max-w-screen-xl px-4 py-16 sm:py-32 flex flex-col gap-12 md:gap-24 h-screen items-center justify-center">
          <Image src={logo} alt="logo" width={200} height={200} />
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 bg-clip-text font-extrabold text-transparent text-4xl sm:text-5xl">
              Have a smooth Meeting
            </h1>
            <h1 className="bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 bg-clip-text font-extrabold text-transparent text-4xl sm:text-5xl">
              <span className="block">with team Members</span>
            </h1>
            <p className="mx-auto mt-4 sm:mt-6 max-w-xl text-base sm:text-xl sm:leading-relaxed">
              Video call is a global communication service provider which
              provides developer-friendly and powerful SDK & APIs
            </p>

            <div className="flex items-center justify-center gap-4 mt-6">
              <input
                type="text"
                id="name"
                onChange={(e) => setFullName(e.target.value)}
                className="border rounded-md focus:border-transparent focus:outline-none focus:ring-0 px-4 py-2 w-full max-w-xs text-black"
                placeholder="Enter your name"
              />
            </div>

            {fullName && fullName.length >= 3 && (
              <>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-6">
                  <input
                    type="text"
                    id="roomid"
                    value={roomId}
                    onChange={(e) => setRoomId(e.target.value)}
                    className="border rounded-md focus:border-transparent focus:outline-none focus:ring-0 px-4 py-2 w-full max-w-xs text-black"
                    placeholder="Enter room ID"
                  />
                  <button
                    className="rounded-md bg-blue-600 px-6 py-[11px] text-sm font-medium w-full sm:w-auto"
                    onClick={handleJoin}
                    disabled={!roomId.trim()}
                  >
                    Join
                  </button>
                </div>

                <div className="mt-4 flex items-center justify-center">
                  <button
                    className="text-lg font-medium hover:text-blue-400 hover:underline"
                    onClick={handleCreateMeeting}
                  >
                    Or create a new Meeting
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
