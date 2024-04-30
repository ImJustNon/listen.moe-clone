import { BrowserRouter, Routes, Route, redirect } from "react-router-dom";
import AppLayout from "../layouts/AppLayout";
import Home from "../pages/Home";
import NotFound from "../pages/NotFound";


function AppRouter({ setThemeBg, themeBg, setCurrentMusicType, currentMusicType }){
    return(
        <Routes>
            <Route 
                path={'/'} 
                element={
                    <AppLayout setThemeBg={setThemeBg} themeBg={themeBg} setCurrentMusicType={setCurrentMusicType} currentMusicType={currentMusicType}>
                        <Home />
                    </AppLayout>
                } 
            />
            <Route 
                path={'*'} 
                element={
                    <AppLayout setThemeBg={setThemeBg} themeBg={themeBg} setCurrentMusicType={setCurrentMusicType} currentMusicType={currentMusicType}>
                        <NotFound />
                    </AppLayout>
                } 
            />
        </Routes>
    );
} 

export default AppRouter;