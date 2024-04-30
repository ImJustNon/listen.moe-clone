const localStorageKey = "user_musictype";

function setMusicType(value){
    if(value === "kpop" || value === "jpop") localStorage.setItem(localStorageKey, value);
}

function getMusicType(){    
    return localStorage.getItem(localStorageKey);
}

function removeMusicType(){
    return localStorage.removeItem(localStorageKey);
}


export {
    setMusicType,
    getMusicType,
    removeMusicType,
}