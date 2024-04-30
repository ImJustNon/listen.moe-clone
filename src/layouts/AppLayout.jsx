import { AnimatePresence, motion } from 'framer-motion';
import React from "react";
import { useState, useEffect } from "react";
import { useLocation } from 'react-router-dom';
import { useParams, useNavigate } from 'react-router-dom';
import Home from '../pages/Home';
import Navbar from '../components/Navbar';
import usePlayer from '../components/usePlayer';
import { config } from '../config/config';
import useListenMoeWebsocket from '../components/useListenMoeWebsocket';

function AppLayout({ children, setThemeBg, themeBg, setCurrentMusicType, currentMusicType }){
    const [isPlaying, setPlaying, volume, setNewVolume, audioError] = usePlayer(config.sources.listenMoe_Jpop);
    const [wsResponse] = useListenMoeWebsocket();

    
    return(
        <>
            <Navbar setThemeBg={setThemeBg} themeBg={themeBg} setCurrentMusicType={setCurrentMusicType} currentMusicType={currentMusicType} />
            {/* <div className="pt-16"></div>        */}
            {/* App Page Chidren */}
            {React.Children.map(children, (child) =>{
                return React.cloneElement(child, { 
                    isPlaying: isPlaying,
                    setPlaying: setPlaying,
                    volume: volume,
                    setNewVolume: setNewVolume,
                    wsResponse: wsResponse,
                    audioError: audioError,
                });
            })}     
        </>
    );
}

export default AppLayout;