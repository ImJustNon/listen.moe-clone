import { AnimatePresence, motion } from 'framer-motion';
import React from "react";
import { useState, useEffect } from "react";
import { useLocation } from 'react-router-dom';
import { useParams, useNavigate } from 'react-router-dom';
import Home from '../pages/Home';
import Navbar from '../components/Navbar';
import usePlayer from '../components/usePlayer';
import { config } from '../config/config';

function AppLayout({ children }){
    const [playing, toggle, volume, changeVolume] = usePlayer(config.sources.listenMoe_Jpop);
    
    return(
        <>
            <Navbar />
            {/* <div className="pt-16"></div>        */}
            {/* App Page Chidren */}
            {React.Children.map(children, (child) =>{
                return React.cloneElement(child, { 
                    playing: playing,
                    toggle: toggle,
                    volume: volume,
                    changeVolume: changeVolume
                });
            })}     
        </>
    );
}

export default AppLayout;