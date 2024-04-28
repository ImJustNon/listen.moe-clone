import { BrowserRouter, Routes, Route, redirect } from "react-router-dom";
import AppLayout from "../layouts/AppLayout";
import Home from "../pages/Home";
import NotFound from "../pages/NotFound";


function AppRouter(){
    return(
        <Routes>
            <Route 
                path={'/'} 
                element={
                    <AppLayout>
                        <Home />
                    </AppLayout>
                } 
            />
            <Route 
                path={'*'} 
                element={
                    <AppLayout>
                        <NotFound />
                    </AppLayout>
                } 
            />
        </Routes>
    );
} 

export default AppRouter;