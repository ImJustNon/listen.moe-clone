import { Button, ButtonGroup } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import thumnail from "../assets/t2.jpg";
import shigure_ui from "../assets/shigure-ui.gif";
import { Slider, SliderTrack, SliderFilledTrack, SliderThumb, SliderMark, Tooltip } from '@chakra-ui/react';
import donateGif from "../assets/donate.gif";
import holderImage from "../assets/blank-dark.png";

function Home({ playing, toggle, volume, changeVolume }){
    const [isPlaying, setIsPlaying] = useState(false);
    const [volumeSliderValue, setVolumeSliderValue] = useState(30);
    const [isShowTooltip, setIsShowTooltip] = useState(false);
    const [isShowVolumeSlider, setIsShowVolumeSlider] = useState(false);
    const [isShowAddFavoriteTip, setIsShowAddFavoriteTip] = useState(false);
    const [isShowPreviousSongsBtn, setIsShowPreviouseSongsBtn] = useState(false);
    const [isShowListenersTip, setIsShowListenersTip] = useState(false);
    const [wsData, setWsData] = useState({});
    const [listenersCount, setListenersCount] = useState(0);
    const [playingSongTitle, setPlayingSongTitle] = useState("");
    const [playingSongArtists, setPlayingSongArtists] = useState([]);
    const [playingSongAlbums, setPlayingSongAlbums] = useState([]);

    function handleTogglePlayBtn(){
        toggle(!isPlaying);
        setIsPlaying(prev => !prev);
    }
    useEffect(() =>{
        if(isPlaying) changeVolume(volumeSliderValue * 0.01);
    }, [isPlaying]);

    function handleChangeVolumeSlider(value){
        setVolumeSliderValue(value);
        changeVolume(value * 0.01);
    }

    useEffect(() =>{
        let heartbeatInterval;
        let ws;
        function heartbeat(interval) {
            heartbeatInterval = setInterval(() => {
                ws.send(JSON.stringify({ op: 9 }));
            }, interval);
        }
        function connect() {
            ws = new WebSocket('wss://listen.moe/gateway_v2');
            ws.onopen = () => {
                clearInterval(heartbeatInterval);
                heartbeatInterval = null;
                console.log("Connected to Websocket")
            };
            ws.onmessage = message => {
                if (!message.data.length) return;
                let response;
                try {
                    response = JSON.parse(message.data);
                } catch (error) {
                    return;
                }
                switch (response.op) {
                    case 0:
                        ws.send(JSON.stringify({ op: 9 }));
                        heartbeat(response.d.heartbeat);
                        break;
                    case 1:
                        if (response.t !== 'TRACK_UPDATE' && response.t !== 'TRACK_UPDATE_REQUEST' && response.t !== 'QUEUE_UPDATE' && response.t !== 'NOTIFICATION') break;
                            console.log(response.d);
                            setWsData(response.d);
                            setListenersCount(response.d.listeners);
                            setPlayingSongTitle(response.d.song.title);
                            setPlayingSongArtists(response.d.song.artists);
                            setPlayingSongAlbums(response.d.song.albums);
                        break;
                    default:
                        break;
                }
            };

            ws.onclose = error => {
                clearInterval(heartbeatInterval);
                heartbeatInterval = null;
                if (ws) {
                    ws.close();
                    ws = null;
                }
                setTimeout(() => connect(), 5000);
            };
        }
        connect();
    }, []);

    return (
        <>
            <div className='relative'>
                <div className="container mx-auto">
                    <div className="flex flex-col min-h-screen justify-center items-center p-10 md:px-28 ">
                        <div className="flex flex-col w-full gap-3 relative">
                            {/* Img */}
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2407 533" className='w-auto md:w-[400px]'>
                                <path fill="#fff" d="M1881.17 460.63h-133.84L1609.35 194.5h-2.32q4.9 62.78 4.9 95.86v170.27h-90.43V82.88h133.33l137.46 262.5h1.5q-3.6-57.1-3.6-91.7V82.88h91zm-425.8 0h-224.3V82.88h224.3v81.9h-122.24v59.43h113.2v81.9h-113.2v71.4h122.23zm-370.8 0H982.53v-294.3h-92.25V82.88h286.28v83.45h-91.98zM859.03 345.9q0 35.15-17.83 62.54-17.82 27.2-51.4 42.4-33.6 15-78.82 15-37.72 0-63.3-5.2-25.58-5.4-53.23-18.6v-90.9q29.2 15 60.72 23.5 31.52 8.3 57.88 8.3 22.73 0 33.33-7.7 10.6-8 10.6-20.4 0-7.7-4.4-13.4-4.14-5.9-13.7-11.9-9.3-5.9-50.12-24.2-36.94-16.8-55.54-32.5-18.4-15.73-27.4-36.14-8.8-20.42-8.8-48.32 0-52.2 38-81.35 37.9-29.3 104.3-29.3 58.6 0 119.6 27.13l-31.3 78.8q-53-24.3-91.5-24.3-19.9 0-28.93 6.98-9.1 7-9.1 17.3 0 11.1 11.4 19.9 11.6 8.8 62.5 32.1 48.8 22 67.7 47.3 19.1 25.1 19.1 63.3zm-431 114.73V82.88H530.6v377.75zm-308 0V82.88H222.1V378.2h145.47v82.43zM0 142.87V0h77.48v22.3h-56.7v120.95z"></path>
                                <path fill="#FF015B" d="M2407.96 391.07v142.86h-77.48v-22.3h56.7V390.7zm-140.16 70.98c-14.62 0-26-3.87-34.1-11.62-8.06-7.8-12.1-18.9-12.1-33.26 0-14.83 3.75-26.2 11.25-34.1 7.5-7.96 18.2-11.94 32.1-11.94 13.22 0 23.42 3.46 30.6 10.4 7.24 6.86 10.86 16.78 10.86 29.75v13.5h-54.1c.2 4.9 2 8.75 5.4 11.54 3.4 2.7 8.04 4.1 13.88 4.1 5.3 0 12.34-1.3 16.8-2.3 4.48-1.1 10.95-1.7 16.16-4.2v21.8c-4.74 2.44-11.25 3.05-16.32 3.98-5.04.92-13.23 2.2-20.25 2.2zm-1.8-70.3c-3.54 0-6.54 1.13-8.97 3.4-2.37 2.23-3.77 5.74-4.18 10.55h26.04c-.1-4.24-1.4-7.62-3.7-10.15-2.3-2.54-5.4-3.8-9.3-3.8zm-57.8 24.65c0 14.36-3.9 25.58-11.63 33.64-7.7 8.1-18.5 12.1-32.4 12.1-13.33 0-23.95-4.1-31.86-12.3-7.8-8.2-11.7-19.3-11.7-33.3 0-14.3 3.9-25.4 11.6-33.3 7.76-7.9 18.6-11.9 32.56-11.9 8.63 0 16.26 1.9 22.87 5.5 6.64 3.7 11.7 9 15.3 15.8 3.6 6.9 5.4 14.9 5.4 24zm-56.9 0c0 7.54 1 13.3 3.03 17.28 2 3.93 5.4 5.9 10.15 5.9 4.7 0 8-1.97 9.92-5.9 1.97-3.98 2.95-9.74 2.95-17.28 0-7.5-.98-13.15-2.95-16.98-1.96-3.9-5.32-5.8-10.08-5.8-4.7 0-8 1.9-10 5.7-2.1 3.7-3.1 9.4-3.1 16.9zm-77.9 44.1v-47.75c0-5.94-.83-10.38-2.5-13.33-1.6-3-4.14-4.5-7.65-4.5-4.66 0-8.07 1.9-10.24 5.9-2.1 4-3.2 10.2-3.2 18.7v40.9h-30.4v-47.7c0-5.92-.7-10.36-2.3-13.3-1.5-3-4-4.5-7.5-4.5-4.7 0-8.2 2.1-10.4 6.34s-3.2 11.16-3.2 20.78v38.5h-30.3v-87.8h22.87l3.8 10.84h1.8c2.4-4.03 5.7-7.1 10.1-9.22 4.5-2.1 9.5-3.17 15.1-3.17 12.7 0 21.6 3.8 26.7 11.5h2.4c2.5-3.7 5.9-6.5 10.3-8.5 4.5-2.1 9.4-3.1 14.7-3.1 10.4 0 18.1 2.6 23 8 5 5.3 7.5 13.4 7.5 24.2v57.1zm-157.5-12.86c0-4.7 1.4-8.4 4.2-11 2.82-2.6 6.93-3.8 12.3-3.8 5.12 0 9.04 1.3 11.8 3.9 2.72 2.6 4.1 6.3 4.1 11s-1.43 8.3-4.27 11c-2.8 2.6-6.67 3.9-11.63 3.9-5.1 0-9.15-1.2-12.1-3.8-2.94-2.6-4.4-6.2-4.4-10.9z"></path>
                            </svg>
                            {/* Player control */}
                            <div className="flex h-16 flex-row gap-3 items-center justify-center">
                                <div className='rounded-md shadow-xl bg-[#1d1f2b] w-16 h-16 flex justify-center items-center text-white hover:text-[#FF015B] hover:cursor-pointer' onClick={() => handleTogglePlayBtn()} >
                                    {isPlaying ?
                                        <i className="fa-solid fa-pause text-xl"></i>
                                        :
                                        <i className="fa-solid fa-play text-xl"></i>
                                    }
                                </div>
                                <div className='text-white rounded-md shadow-xl bg-[#1d1f2b] w-16 h-16 block justify-center content-center relative py-2 px-4 grow shrink-0 basis-2'>
                                    <div className='w-full overflow-hidden whitespace-nowrap flex text-[#FF015B]'>
                                        <div className='w-auto inline'>
                                            <a className=''>{playingSongArtists[0]?.name}{playingSongArtists[0]?.nameRomaji ? `(CV. ${playingSongArtists[0]?.nameRomaji})` : ""}</a>
                                        </div>
                                    </div>
                                    <div className='w-full overflow-hidden whitespace-nowrap flex text-[#aab]'>
                                        <div className='w-auto inline'>
                                            <a className=''>{playingSongTitle}</a>
                                        </div>
                                    </div>
                                    <img src={shigure_ui} className='top-[-220px] right-[-18px] h-auto max-w-full absolute cursor-pointer hidden xl:flex' />
                                </div>
                                <div className='rounded-md shadow-xl bg-[#1d1f2b] w-16 h-16 flex relative' >
                                    <div className='w-full flex justify-center items-center text-white hover:text-[#FF015B] hover:cursor-pointer' onMouseEnter={() => setIsShowAddFavoriteTip(true)} onMouseLeave={() => setIsShowAddFavoriteTip(false)}>
                                        <i className="fa-regular fa-star text-xl"></i>
                                    </div>
                                    {isShowAddFavoriteTip ? 
                                        <div className='absolute min-w-32 bottom-[70px] left-[-25px] hidden lg:flex'>
                                            <p className='text-[#8a8f9b] text-md'>Add to favorites</p>
                                        </div>
                                    : 
                                        <></>
                                    }
                                    
                                </div>
                                <div className='rounded-md shadow-xl bg-[#1d1f2b] w-16 h-16 flex relative'>
                                    <div className='w-full flex justify-center items-center text-white hover:text-[#FF015B] hover:cursor-pointer' onClick={() => setIsShowVolumeSlider(prev => !prev)}>
                                        <i className="fa-solid fa-volume-low text-xl"></i>
                                    </div>
                                    {isShowVolumeSlider ? 
                                        <div className="absolute min-w-48 top-24 right-0">
                                            <Slider
                                                focusThumbOnChange={false}
                                                defaultValue={30}
                                                min={0}
                                                max={100}
                                                value={volumeSliderValue}
                                                onChange={(value) => handleChangeVolumeSlider(value)}
                                                onMouseEnter={() => setIsShowTooltip(true)}
                                                onMouseLeave={() => setIsShowTooltip(false)}
                                            >
                                                <SliderTrack bg={"#1d1f2b"} height={2} rounded={100}>
                                                    <SliderFilledTrack bg={"#ff015b"} />
                                                </SliderTrack>
                                                <Tooltip
                                                    bg={"#1d1f2b"}
                                                    color='white'
                                                    placement={"bottom"}
                                                    isOpen={isShowTooltip}
                                                    label={`${volumeSliderValue}`}
                                                    rounded={5}
                                                >
                                                    <SliderThumb bg={"#c40447"}/>
                                                </Tooltip>
                                            </Slider>
                                        </div>
                                    :
                                        <></>
                                    }
                                    
                                </div>
                                <div className='w-52 justify-center items-center hidden lg:flex md:ml-8 hover:cursor-pointer'>
                                    <a>
                                        <img src={playingSongAlbums[0]?.image ? `https://cdn.listen.moe/covers/${playingSongAlbums[0].image}` : holderImage} className='w-auto rounded-lg' />
                                    </a>
                                </div>
                            </div>
                            <div className='flex flex-row gap-3' onMouseEnter={() => setIsShowPreviouseSongsBtn(true)} onMouseLeave={() => setIsShowPreviouseSongsBtn(false)}>
                                <div className='w-16'></div>
                                <div className='grow shrink-0 basis-2 flex flex-row gap-2'>
                                    <div className='text-[#ccd] flex items-center gap-2 pl-4 relative'>
                                        <div className='w-full' onMouseEnter={() => setIsShowListenersTip(true)} onMouseLeave={() => setIsShowListenersTip(false)}>
                                            <i className="fa-solid fa-headphones-simple"></i> {listenersCount}
                                        </div>
                                        {isShowListenersTip ? 
                                            <div className='absolute top-6 right-[-5px]'>
                                                <p className='text-[#8a8f9b] text-md'>Listeners</p>
                                            </div>
                                            : 
                                            <></>
                                        }
                                        
                                    </div>
                                    {isShowPreviousSongsBtn ? 
                                        <div className='text-[#ccd] hover:text-[#FF015B] hover:underline hover:cursor-pointer'>
                                            . Previous songs
                                        </div>
                                        :
                                        <></>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>				
                <a className="absolute bottom-0 right-0 px-0 h-40 hover:cursor-pointer" >
                    <img src={donateGif} className='hidden md:flex' />
                </a>
            </div>
        </>
    );
}

export default Home;