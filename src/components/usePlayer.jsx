import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function usePlayer(url){
    const [audio] = useState(new Audio(url));
    const [playing, setPlaying] = useState(false);
    const [volume, setVolume] = useState(1); // Default volume is 1 (max)

    const toggle = (v) => setPlaying(v);
    const changeVolume = (newVolume) => {
        if (newVolume >= 0 && newVolume <= 1) {
            audio.volume = newVolume;
            setVolume(newVolume);
        }
    };

    useEffect(() => {
        playing ? audio.play() : audio.pause();
    }, [playing]);

    useEffect(() => {
        audio.volume = volume; // Update volume when it changes
    }, [volume]);
  
    useEffect(() => {
        audio.addEventListener('ended', () => setPlaying(false));
        return () => {
            audio.removeEventListener('ended', () => setPlaying(false));
        };
    }, []);
  
    return [playing, toggle, volume, changeVolume];
}

export default usePlayer;
