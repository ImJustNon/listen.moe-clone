import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Input } from '@chakra-ui/react';
import listenMoeLogo from "../assets/logo-listenmoe-64.png";
import { useEffect, useState } from 'react';
import { getMusicType } from '../../utils/musicType';

function LoginModal({ isOpen, onOpen, onClose }){
    const [isLogin, setIsLogin] = useState(true);
    const [userName, setUserName] = useState("");
    const [userPassword, setUserPassword] = useState("");
    const [userEmail, setUserEmail] = useState("");
    const [userPasswordRepeat, setUserPasswordRepeat] = useState("");
    const [musicType, setMusicType] = useState("");

    useEffect(() =>{
        setMusicType(getMusicType());
    }, []);

    function handleSubmit(){
        if(isLogin){ // login mode
            console.table([
                {
                    userName: userName, 
                    userPassword: userPassword
                }
            ]);
        }
        else {  // register mode
            console.table([
                {
                    userName: userName, 
                    userEmail: userEmail,
                    userPassword: userPassword,
                    userPasswordRepeat: userPasswordRepeat
                }
            ]);
        }
    }


    return(
        <>
            <Modal 
                isOpen={isOpen} 
                onClose={onClose}
                isCentered={true}
                size={"xs"}
                motionPreset={'slideInBottom'}
                closeOnOverlayClick={false}
            >
                <ModalOverlay />
                <ModalContent bgColor={"#17181f"} borderRadius={"5px"}>
                    <ModalCloseButton 
                        color={"rgb(199, 204, 216)"} 
                        _hover={{
                            color: musicType === "jpop" ? "#ff015b" : "#30a9ed"
                        }} />
                    <ModalBody paddingY={"3rem"} paddingX={"1.5rem"}>
                        <div className='flex flex-col grow shrink basis-auto text-center justify-center max-h-[600px]'>
                            <img src={listenMoeLogo} className='h-auto mx-auto mb-[3rem]' />
                            <Input 
                                placeholder={isLogin ? 'Username / Email' : "Username"}
                                type={'text'}
                                fontSize={"0.875rem"}
                                size={"xl"}
                                focusBorderColor={"#262838"}
                                border={"none"}
                                bg={"#262838"}
                                rounded={"5px"}
                                width={"100%"}
                                color={"#9998a4"}  
                                paddingX={"0.75rem"}
                                paddingY={"0.625rem"}
                                _placeholder={{
                                    color: "#9998a4",
                                }} 
                                marginBottom={"1rem"}
                                value={userName}
                                onChange={(event) => setUserName(event.target.value)}
                            />
                            <Input 
                                hidden={isLogin}
                                placeholder='Email' 
                                type={'email'}
                                fontSize={"0.875rem"}
                                size={"xl"}
                                focusBorderColor={"#262838"}
                                border={"none"}
                                bg={"#262838"}
                                rounded={"5px"}
                                width={"100%"}
                                color={"#9998a4"}  
                                paddingX={"0.75rem"}
                                paddingY={"0.625rem"}
                                _placeholder={{
                                    color: "#9998a4",
                                }} 
                                marginBottom={"1rem"}
                                value={userEmail}
                                onChange={(event) => setUserEmail(event.target.value)}
                            />
                            <Input 
                                placeholder='Password'
                                type={'password'}
                                fontSize={"0.875rem"} 
                                size={"xl"}
                                focusBorderColor={"#262838"}
                                border={"none"}
                                bg={"#262838"}
                                rounded={"5px"}
                                width={"100%"}
                                color={"#9998a4"}  
                                paddingX={"0.75rem"}
                                paddingY={"0.625rem"}
                                _placeholder={{
                                    color: "#9998a4",
                                }} 
                                marginBottom={"1rem"}
                                value={userPassword}
                                onChange={(event) => setUserPassword(event.target.value)}
                            />
                            <Input 
                                hidden={isLogin}
                                placeholder='Password again'
                                type={'password'}
                                fontSize={"0.875rem"} 
                                size={"xl"}
                                focusBorderColor={"#262838"}
                                border={"none"}
                                bg={"#262838"}
                                rounded={"5px"}
                                width={"100%"}
                                color={"#9998a4"}  
                                paddingX={"0.75rem"}
                                paddingY={"0.625rem"}
                                _placeholder={{
                                    color: "#9998a4",
                                }} 
                                marginBottom={"1rem"}
                                value={userPasswordRepeat}
                                onChange={(event) => setUserPasswordRepeat(event.target.value)}
                            />
                            <div className='flex flex-row justify-center items-center gap-1'>
                                <div className='text-[#c7ccd8] text-[0.875rem] font-[400] mr-[1rem] cursor-pointer' onClick={() => setIsLogin(prev => !prev)}>
                                    {isLogin ? "Create account" : "Back to login"}
                                </div>
                                <div className='text-[#c7ccd8] text-[0.875rem] py-[0.625rem] px-[1.25rem] font-[600] border-[1px] border-transparent border-solid text-center rounded-[5px] bg-[#262838] cursor-pointer hover:bg-[#ff015b]' onClick={() => handleSubmit()}>
                                    {isLogin ? "Login" : "Create account"}
                                </div>
                            </div>
                        </div>
                    </ModalBody>

                </ModalContent>
            </Modal>
        </>
    );
}

export default LoginModal;