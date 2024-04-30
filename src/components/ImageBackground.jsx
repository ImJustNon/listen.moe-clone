import jpopBackground from "../assets/jpop-bg.jpg";
import kpopBackground from "../assets/kpop-bg.jpg";

function ImageBackground({ themeBg }){
    const chooseBg = {
        "jpop": jpopBackground, 
        "kpop": kpopBackground
    }
    return (
        <>
            <div className="fixed w-full">
                {/* <video autoPlay muted loop className="fixed top-0 left-0 min-w-full min-h-full object-cover z-0">
                    <source src={Background} type="video/mp4" />
                    Your browser does not support the video tag.
                </video> */}
                <img className="fixed top-0 left-0 min-w-full min-h-full object-cover z-0" src={chooseBg[themeBg]} />
            </div>
            <div className="fixed top-0 left-0 w-full h-full bg-black opacity-5 z-1"></div>
        </>
    );
}


export default ImageBackground;