import './App.css';
import ImageBackground from './components/ImageBackground';
import ListenMoeIcon from "./assets/logo-listenmoe.png";
import { ChakraProvider } from '@chakra-ui/react'
import AppRouter from './routes/AppRouter';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { config } from './config/config';


function App() {
	useEffect(() =>{
		document.title = "It's time to ditch other radios. | LISTEN.moe";
		const favicon = document.getElementById('favicon');
    	favicon.setAttribute('href', ListenMoeIcon);
	}, []);
  	return (
		<>
			<ChakraProvider>
				<ImageBackground />
				<div className="relative">
					<AppRouter />
				</div>
			</ChakraProvider>
		</>
	);
}

export default App;