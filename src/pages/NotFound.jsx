import notfoundImage from "../assets/404.png";

function NotFound(){
    return (
        <>
            <div className="container mx-auto">
                <div className="min-h-screen flex flex-col justify-center items-center gap-3">
                    <img src={notfoundImage} className="h-auto max-w-full" />
                    <p className="text-[#c7ccd8] font-semi text-[2em]">Whoops, not found!</p>
                </div>
            </div>
        </>
    );
}

export default NotFound;