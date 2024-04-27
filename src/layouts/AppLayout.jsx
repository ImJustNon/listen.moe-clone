import { AnimatePresence, motion } from 'framer-motion';
import React from "react";
import { useState, useEffect } from "react";
import { useLocation } from 'react-router-dom';
import { useParams, useNavigate } from 'react-router-dom';
import Home from '../pages/Home';

function AppLayout({ children }){

    return(
        <>
            {/* <div className="pt-16"></div>        */}
            {/* App Page Chidren */}
            {React.Children.map(children, (child) =>{
                return React.cloneElement(child, { 
                });
            })}
        </>
    );
}

export default AppLayout;