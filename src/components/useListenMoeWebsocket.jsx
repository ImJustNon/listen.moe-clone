import { useRef, useState } from "react";
import { useEffect } from "react";

const wsEnpointOptions = {
    "jpop": "wss://listen.moe/gateway_v2",
    "kpop": "wss://listen.moe/kpop/gateway_v2"
}

function useListenMoeWebsocket({ currentMusicType }){
    const [wsResponse, setWsResponse] = useState({});
    const [wsEnpoint, setWsEnpoint] = useState(undefined);
    const wsRef = useRef();

    
    // watch for when music source has changed
    useEffect(() =>{
        setWsEnpoint(wsEnpointOptions[currentMusicType]);    
        console.log("[Info] Swithed WS to : ", currentMusicType);
    }, [currentMusicType]);

    useEffect(() =>{
        let heartbeatInterval;
        let ws;
        function heartbeat(interval) {
            heartbeatInterval = setInterval(() => {
                ws.send(JSON.stringify({ op: 9 }));
            }, interval);
        }
        function connect() {
            ws = new WebSocket(wsEnpoint);
            wsRef.current = ws;
            ws.onopen = () => {
                clearInterval(heartbeatInterval);
                heartbeatInterval = null;
                console.log("[Info] WS Connected to : ", wsEnpoint.replace("wss://listen.moe", ""));
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
                            setWsResponse(response.d);
                            // console.log(response.d);
                            // setWsData(response.d);
                            // setListenersCount(response.d.listeners);
                            // setPlayingSongTitle(response.d.song.title);
                            // setPlayingSongArtists(response.d.song.artists);
                            // setPlayingSongAlbums(response.d.song.albums);
                        break;
                    default:
                        break;
                }
            };

            ws.onclose = error => {
                console.error("[Error] Ws Error : ", error);
                clearInterval(heartbeatInterval);
                heartbeatInterval = null;
                if (ws) {
                    ws.close();
                    ws = null;
                }
                setTimeout(() => connect(), 5000);
            };
        }

        // wait until "wsEnpoint" is not undifined
        if(typeof wsEnpoint !== "undefined"){
            connect();
        }
    }, [wsEnpoint]);

    return [wsResponse];
}

export default useListenMoeWebsocket;