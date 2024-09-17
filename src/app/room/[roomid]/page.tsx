"use client";
import useUser from "@/hooks/useUser";
import React, { useEffect, useRef } from "react";
import { v4 as uuid } from "uuid";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";

const Room = ({ params }: { params: { roomid: string } }) => {
  const { fullName } = useUser(); // Custom hook to get the user's full name
  const roomID = params.roomid;
  const meetingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window !== "undefined" && meetingRef.current) {
      const appID = parseInt(process.env.NEXT_PUBLIC_ZEGO_APP_ID!); // Get ZegoCloud App ID from env
      const serverSecret = process.env.NEXT_PUBLIC_ZEGO_SERVER_SECRET!; // Get ZegoCloud Server Secret from env

      // Prevent multiple room joins by checking if the UI is already rendered
      if (meetingRef.current.childElementCount > 0) return;

      // Generate a kit token for Zego UIKit
      const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
        appID,
        serverSecret,
        roomID,
        uuid(),
        fullName || "user" + Date.now(),
        720
      );

      const zp = ZegoUIKitPrebuilt.create(kitToken);

      try {
        // Try to join the room
        zp.joinRoom({
          container: meetingRef.current,
          sharedLinks: [
            {
              name: "Sharable link",
              url:
                window.location.protocol +
                "//" +
                window.location.host +
                window.location.pathname +
                "?roomID=" +
                roomID,
            },
          ],
          scenario: {
            mode: ZegoUIKitPrebuilt.VideoConference, // Using video conference mode
          },
        });
      } catch (error: any) {
        console.error("Failed to join room:", error);

        // Handle device access errors
        if (error.message.includes("NotReadableError")) {
          alert(
            "Cannot access camera or microphone. Please check your device and browser permissions."
          );
        }
      }
    }
  }, [fullName, roomID]);

  return <div className="w-full h-screen" ref={meetingRef}></div>;
};

export default Room;
