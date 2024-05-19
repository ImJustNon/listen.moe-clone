import React, { useState, useEffect, useRef } from "react";
import { Howl, Howler } from 'howler';
import { animateVisualElement } from "framer-motion";

function usePlayer(url) {
    const [audio, setAudio] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [volume, setVolume] = useState(1); // Default volume is 1 (max)
    const [error, setError] = useState(false);


    useEffect(() => {
        const newAudio = new Howl({
            src: [url],
            html5: true, // Force to HTML5 Audio
            volume: volume, // Default volume
            onloaderror: () => setError(true), // Handle loading errors
        });
        setAudio(newAudio);

        return () => {
            newAudio.unload();
        };
    }, [url]);

    const setPlaying = (value) => setIsPlaying(value);

    const setNewVolume = (newVolume) => {
        if (newVolume >= 0 && newVolume <= 1) {
            audio.volume(newVolume);
            setVolume(newVolume);
        }
    };

    useEffect(() => {
        if (audio) {
            if (isPlaying) {
                audio.play();
            } else {
                audio.stop();
            }
        }
    }, [isPlaying, audio]);

    useEffect(() => {
        if (audio) {
            audio.volume(volume); // Update volume when it changes
        }
    }, [volume, audio]);
  
    useEffect(() => {
        if (audio) {
            audio.on('end', () => setIsPlaying(false));
            return () => {
                audio.off('end', () => setIsPlaying(false));
            };
        }
    }, [audio]);
    
    
    useEffect(() => {
        console.error(`[Error] Cannot Load Sound Source : `, error);
    }, [error]);
    return [isPlaying, setPlaying, volume, setNewVolume, error];
}

export default usePlayer;