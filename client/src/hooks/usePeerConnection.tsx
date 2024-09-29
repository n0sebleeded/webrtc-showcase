import React, { useState, useEffect } from "react";

interface PeerConnectionProps {
    videoRef: React.RefObject<HTMLVideoElement>;
}

const usePeerConnection = ({ videoRef }: PeerConnectionProps) => {
    const [pc, setPc] = useState<RTCPeerConnection | null>(null);

    useEffect(() => {
        const createPeerConnection = () => {
            const pc = new RTCPeerConnection();
            setPc(pc);

            // ICE Gathering
            pc.addEventListener("icegatheringstatechange", () => {
                console.log("ICE Gathering State:", pc.iceGatheringState);
            });

            // ICE Connection State
            pc.addEventListener("iceconnectionstatechange", () => {
                console.log("ICE Connection State:", pc.iceConnectionState);
            });

            // Signaling State
            pc.addEventListener("signalingstatechange", () => {
                console.log("Signaling State:", pc.signalingState);
            });

            pc.addEventListener("track", (evt) => {
                if (videoRef.current) {
                    videoRef.current.srcObject = evt.streams[0];
                }
            });

            return () => {
                if (pc) {
                    pc.close();
                }
            };
        };

        createPeerConnection();
    }, [videoRef]);

    return { pc };
};

export default usePeerConnection;
