import { Link } from "react-router-dom";
import logoImage from "../assets/logo-listenmoe.png";
import { Input } from '@chakra-ui/react';

function Navbar(){
    return (
        <>
            <div className="navbar fixed z-10 pt-8">
                <div className="mx-auto relative container">
                    <div className="w-full max-h-[112px] flex flex-row content-center items-center px-0 pt-2 gap-1 xl:px-36">
                        <Link to={"/"} className="inline-block lg:px-3">
                            <img src={logoImage} className="h-8 min-h-8 min-w-8" alt="logo" />
                        </Link>
                        <div className="grow shrink-0 basis-2 lg:hidden"></div>{/* Spacer */}
                        <div className="text-[#ccccdd] font-normal h-full text-[1rem] hover:text-white hover:cursor-pointer px-[0.5rem] lg:px-[1rem]"> 
                            Music
                        </div>
                        <div className="text-[#ccccdd] font-normal h-full text-[1rem] hover:text-white hover:cursor-pointer px-[0.5rem] lg:px-[1rem]">
                            Apps
                        </div>
                        <div className="text-[#ccccdd] font-normal h-full px-[1rem] text-[1rem] hover:text-white hover:cursor-pointer hidden lg:flex"> 
                            Chat
                        </div>
                        <div className="text-[#ccccdd] font-normal h-full px-[1rem] text-[1rem] hover:text-white hover:cursor-pointer hidden lg:flex"> 
                            Docs
                        </div>
                        <div className="text-[#ccccdd] font-normal h-full px-[1rem] text-[1rem] hover:text-white hover:cursor-pointer hidden lg:flex"> 
                            K-pop
                        </div>
                        <div className="text-[#ccccdd] font-normal h-full text-[1rem] hover:text-white hover:cursor-pointer px-[0.5rem] lg:px-[1rem]">
                            Donate
                        </div>
                        <div className="text-[#ccccdd] font-normal h-full text-[1rem] hover:text-white hover:cursor-pointer px-[0.5rem] lg:px-[1rem]">
                            Shop
                        </div>
                        <div className="text-[#ccccdd] font-normal h-full px-[1rem] text-[1rem] hover:text-white hover:cursor-pointer hidden lg:flex"> 
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
                            <div className="lg:hidden mx-auto items-center hover:cursor-pointer hover:text-white" onClick={() => console.log("OPEN MODAL")}>
                                <i className="fa-solid fa-bars text-[#ccccdd] fa-lg"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Navbar;