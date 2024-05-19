import { Drawer, DrawerBody, DrawerFooter, DrawerHeader, DrawerOverlay, DrawerContent, DrawerCloseButton, Input, Button, Divider } from '@chakra-ui/react';
import patreonSVG from "../assets/patreon.svg";

function MobileDrawer({ isOpen, onOpen, onClose, currentMusicType, handleSwitchSonge, loginModalOnOpen }){
    return (
        <>
            <Drawer
                isOpen={isOpen}
                size={"xs"}
                placement='right'
                onClose={onClose}
                variant={"secondary"}
            >
                <DrawerOverlay bgColor={"rgba(0, 0, 0, .45098)"} />
                <DrawerContent bgColor={"#1d1f2b"}>
                    <DrawerBody padding={"25px"}>
                            <div className='flex flex-col text-end gap-[2px]'>
                                <div className='text-[#c7ccd8] cursor-pointer'>
                                    Songs
                                </div>
                                <div className='text-[#c7ccd8] cursor-pointer'>
                                    Bounties
                                </div>
                                <div className='text-[#c7ccd8] cursor-pointer'>
                                    Latest additions
                                </div>
                                <div className='text-[#c7ccd8] cursor-pointer' onClick={() => handleSwitchSonge()}>
                                    {currentMusicType == "jpop" ? "K-pop" : "J-pop"}
                                </div>
                                <Divider orientation='horizontal' marginY={"1rem"} borderColor={"rgba(199, 204, 216, .23137)"} />
                                <div className='text-[#c7ccd8] cursor-pointer'>
                                    Official apps
                                </div>
                                <div className='text-[#c7ccd8] cursor-pointer'>
                                    Discord Bots
                                </div>
                                <Divider orientation='horizontal' marginY={"1rem"} borderColor={"rgba(199, 204, 216, .23137)"} />
                                <div className='text-[#c7ccd8] cursor-pointer' onClick={() => loginModalOnOpen()}>
                                    Login
                                </div>
                                <Divider orientation='horizontal' marginY={"1rem"} borderColor={"rgba(199, 204, 216, .23137)"} />
                                <div className='text-[#c7ccd8] cursor-pointer'>
                                    Shop
                                </div>
                                <div className='text-[#c7ccd8] cursor-pointer'>
                                    Join chat
                                </div>
                                <div className='text-[#c7ccd8] cursor-pointer'>
                                    Docs
                                </div>
                                <div className='text-[#c7ccd8] cursor-pointer'>
                                    Partners
                                </div>
                                <Divider orientation='horizontal' marginY={"1rem"} borderColor={"rgba(199, 204, 216, .23137)"} />
                                <div className='flex flex-row justify-end gap-[10px] items-center'>
                                    <div className='cursor-pointer text-[#c7ccd8]'>
                                        <i className="fa-brands fa-square-github fa-2xl"></i>
                                    </div>
                                    <div className='cursor-pointer text-[#c7ccd8]'>
                                        <i className="fa-brands fa-square-twitter fa-2xl"></i>
                                    </div>
                                    <div className='cursor-pointer text-[#c7ccd8]'>
                                        <i className="fa-brands fa-patreon fa-xl"></i>
                                    </div>
                                </div>
                            </div>
                    </DrawerBody>
                </DrawerContent>
            </Drawer>
        </>
    );
}

export default MobileDrawer;