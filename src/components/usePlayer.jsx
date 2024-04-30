import React, { useState, useEffect } from "react";
import { Howl, Howler } from 'howler';
import { animateVisualElement } from "framer-motion";

function usePlayer(url) {
    const [sound, setSound] = useState(null);
    const [playing, setPlaying] = useState(false);
    const [volume, setVolume] = useState(1); // Default volume is 1 (max)
    const [error, setError] = useState(false);

    useEffect(() => {
        const newSound = new Howl({
            src: [url],
            html5: true, // Force to HTML5 Audio
            volume: volume, // Default volume
            onloaderror: () => setError(true), // Handle loading errors
        });
        setSound(newSound);

        return () => {
            newSound.unload();
        };
    }, [url, volume]);

    const toggle = () => setPlaying(!playing);

    const changeVolume = (newVolume) => {
        if (newVolume >= 0 && newVolume <= 1) {
            sound.volume(newVolume);
            setVolume(newVolume);
        }
    };

    useEffect(() => {
        if (sound) {
            if (playing) {
                sound.play();
            } else {
                sound.pause();
            }
        }
    }, [playing, sound]);

    useEffect(() => {
        if (sound) {
            sound.volume(volume); // Update volume when it changes
        }
    }, [volume, sound]);
  
    useEffect(() => {
        if (sound) {
            sound.on('end', () => setPlaying(false));
            return () => {
                sound.off('end', () => setPlaying(false));
            };
        }
    }, [sound]);
  
    return [playing, toggle, volume, changeVolume, error];
}

export default usePlayer;