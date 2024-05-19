import { Link } from "react-router-dom";
import logoImage from "../assets/logo-listenmoe.png";
import { Input, useStatStyles, useDisclosure } from '@chakra-ui/react';
import { useNavigate } from "react-router-dom";
import { setMusicType } from "../../utils/musicType";
import { useState } from "react";
import MobileDrawer from "./MobileDrawer";

function Navbar({ themeBg, setThemeBg, currentMusicType, setCurrentMusicType, isPlaying, setPlaying }){
    const navigate = useNavigate();
    
    const mobileDrawerDisclosure = useDisclosure();
    const mobileDrawerIsOpen = mobileDrawerDisclosure.isOpen;
    const mobileDrawerOnOpen = mobileDrawerDisclosure.onOpen;
    const mobileDrawerOnClose = mobileDrawerDisclosure.onClose;
    
    function handleLink(locationPath){
        navigate(locationPath);
    }

    function handleSwitchSong(){
        let isPlayingDefault = isPlaying;
        if(isPlaying){
            setPlaying(false);
        }
         // stop  music before start new source
        if(themeBg === "jpop"){
            setThemeBg("kpop");
            setMusicType("kpop"); // set to localstorage
            setCurrentMusicType("kpop");
            if(isPlayingDefault){
                setPlaying(true); // continue playing
            }
        }
        else if(themeBg === "kpop"){
            setThemeBg("jpop");
            setMusicType("jpop"); // set to localstorage 
            setCurrentMusicType("jpop");
            if(isPlayingDefault){
                setPlaying(true); // continue playing
            }
        }
        else {
            setThemeBg("jpop");
            setMusicType("jpop"); // set to localstorage
            setCurrentMusicType("jpop");
            if(isPlayingDefault){
                setPlaying(true); // continue playing
            }
        }
    }

    return (
        <>
            <div className="navbar fixed z-10 pt-8">
                <div className="mx-auto relative container">
                    <div className="w-full max-h-[112px] flex flex-row content-center items-center px-0 pt-2 gap-1 xl:px-36">
                        <Link to={"/"} className="inline-block lg:px-3">
                            <img src={logoImage} className="h-8 min-h-8 min-w-8" alt="logo" />
                        </Link>
                        <div className="grow shrink-0 basis-2 lg:hidden"></div>{/* Spacer */}
                        <div className="text-[#ccccdd] font-normal h-full text-[1rem] hover:text-white hover:cursor-pointer px-[0.5rem] lg:px-[1rem]" onClick={() => handleLink("/music")}> 
                            Music
                        </div>
                        <div className="text-[#ccccdd] font-normal h-full text-[1rem] hover:text-white hover:cursor-pointer px-[0.5rem] lg:px-[1rem]" onClick={() => handleLink("/apps")}>
                            Apps
                        </div>
                        <div className="text-[#ccccdd] font-normal h-full px-[1rem] text-[1rem] hover:text-white hover:cursor-pointer hidden lg:flex" onClick={() => handleLink("/chat")}> 
                            Chat
                        </div>
                        <div className="text-[#ccccdd] font-normal h-full px-[1rem] text-[1rem] hover:text-white hover:cursor-pointer hidden lg:flex" onClick={() => handleLink("/docs")}> 
                            Docs
                        </div>
                        <div className="text-[#ccccdd] font-normal h-full px-[1rem] text-[1rem] hover:text-white hover:cursor-pointer hidden lg:flex" onClick={() => handleSwitchSong()}> 
                            {/* {currentMusicType.charAt(0).toUpperCase() + "-" + currentMusicType.slice(1)} */}
                            {currentMusicType === "jpop" ? "K-pop" : "J-pop"}
                        </div>
                        <div className="text-[#ccccdd] font-normal h-full text-[1rem] hover:text-white hover:cursor-pointer px-[0.5rem] lg:px-[1rem]" onClick={() => handleLink("/danate")}>
                            Donate
                        </div>
                        <div className="text-[#ccccdd] font-normal h-full text-[1rem] hover:text-white hover:cursor-pointer px-[0.5rem] lg:px-[1rem]" onClick={() => handleLink("/shop")}>
                            Shop
                        </div>
                        <div className="text-[#ccccdd] font-normal h-full px-[1rem] text-[1rem] hover:text-white hover:cursor-pointer hidden lg:flex" onClick={() => handleLink("/partners")}> 
                            Partners
                        </div>
                        <div className="grow shrink-0 basis-2 lg:hidden"></div>{/* Spacer */}
                        <div className="flex justify-end items-center grow gap-1">
                            <div className="w-auto hidden lg:flex">
                                <Input 
                                    placeholder='Search...' 
                                    size={"md"} 
                                    rounded={100} 
                                    color={"white"} 
                                    focusBorderColor={"hsla(0, 0%, 100%, .1)"}
                                    blur={"10px"}  
                                    border={"none"}
                                    bg={"hsla(0, 0%, 100%, .1)"}
                                    _placeholder={{
                                        color: "#9998a4"
                                    }} 
                                />
                            </div>
                            <div className="text-[#ccccdd] font-normal h-full px-[1rem] text-[1rem] hover:text-white hover:cursor-pointer hidden lg:flex">
                                Login
                            </div>
                            <div className="lg:hidden mx-auto items-center hover:cursor-pointer hover:text-white" onClick={() => mobileDrawerOnOpen()}>
                                <i className="fa-solid fa-bars text-[#ccccdd] fa-lg"></i>
                            </div>
                            <MobileDrawer isOpen={mobileDrawerIsOpen} onOpen={mobileDrawerOnOpen} onClose={mobileDrawerOnClose} currentMusicType={currentMusicType} handleSwitchSonge={handleSwitchSong} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Navbar;