import './App.css';
import ImageBackground from './components/ImageBackground';
import ListenMoeIcon from "./assets/logo-listenmoe.png";
import { ChakraProvider } from '@chakra-ui/react'
import AppRouter from './routes/AppRouter';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { config } from './config/config';
import { getMusicType } from '../utils/musicType';
import theme from './theme';

function App() {
	useEffect(() =>{
		document.title = "It's time to ditch other radios. | LISTEN.moe";
		const favicon = document.getElementById('favicon');
    	favicon.setAttribute('href', ListenMoeIcon);
	}, []);

	const [themeBg, setThemeBg] = useState("");
	const [currentMusicType, setCurrentMusicType] = useState("");

	useEffect(() =>{
		const getUserLastListenMusicType = getMusicType() ?? "jpop";
		setThemeBg(getUserLastListenMusicType);
		setCurrentMusicType(getUserLastListenMusicType);
	}, []);

  	return (
		<>
			<ChakraProvider theme={theme}>
				<ImageBackground themeBg={themeBg} />
				<div className="relative">
					<AppRouter setThemeBg={setThemeBg} themeBg={themeBg} setCurrentMusicType={setCurrentMusicType} currentMusicType={currentMusicType} />
				</div>
			</ChakraProvider>
		</>
	);
}

export default App;