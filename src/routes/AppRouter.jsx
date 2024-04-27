import { BrowserRouter, Routes, Route, redirect } from "react-router-dom";
import AppLayout from "../layouts/AppLayout";
import Home from "../pages/Home";

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
            {/* <Route 
                path={'*'} 
                element={
                    <NotFound />
                } 
            /> */}
        </Routes>
    );
} 

export default AppRouter;