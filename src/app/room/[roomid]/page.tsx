"use client";
import useUser from "@/hooks/useUser";
import React, { useEffect, useRef } from "react";
import { v4 as uuid } from "uuid";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";

const Room = ({ params }: { params: { roomid: string } }) => {
  const { fullName } = useUser(); 
  const roomID = params.roomid;
  const meetingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window !== "undefined" && meetingRef.current) {
      const appID = parseInt(process.env.NEXT_PUBLIC_ZEGO_APP_ID!); 
      const serverSecret = process.env.NEXT_PUBLIC_ZEGO_SERVER_SECRET!; 

      
      if (meetingRef.current.childElementCount > 0) return;

      
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
            mode: ZegoUIKitPrebuilt.VideoConference, 
          },
        });
      } catch (error: any) {
        console.error("Failed to join room:", error);

  
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
