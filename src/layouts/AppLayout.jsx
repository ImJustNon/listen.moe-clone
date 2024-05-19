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
import LoginModal from '../components/LoginModal';
import { useDisclosure } from '@chakra-ui/react';

function AppLayout({ children, setThemeBg, themeBg, setCurrentMusicType, currentMusicType }){
    const [musicSource, setMusicSource] = useState(config.sources.listenmoe["jpop"]);
    const [isPlaying, setPlaying, volume, setNewVolume, audioError] = usePlayer(musicSource);
    const [wsResponse] = useListenMoeWebsocket({ currentMusicType: currentMusicType });

    useEffect(() =>{
        setMusicSource(config.sources.listenmoe[currentMusicType]);
        console.log(`[Info] Switched to : ${currentMusicType}`)
    }, [currentMusicType]);

    const loginModalDisclosure = useDisclosure();
    const loginModalIsOpen = loginModalDisclosure.isOpen;
    const loginModalOnOpen = loginModalDisclosure.onOpen;
    const loginModalOnClose = loginModalDisclosure.onClose;

    return(
        <>
            <Navbar setThemeBg={setThemeBg} themeBg={themeBg} setCurrentMusicType={setCurrentMusicType} currentMusicType={currentMusicType} isPlaying={isPlaying} setPlaying={setPlaying} loginModalOnOpen={loginModalOnOpen} />
            <LoginModal isOpen={loginModalIsOpen} onOpen={loginModalOnOpen} onClose={loginModalOnClose} />
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
                    currentMusicType: currentMusicType
                });
            })}     
        </>
    );
}

export default AppLayout;