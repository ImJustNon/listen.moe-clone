const localStorageKey = "user_character";

function setCharacter(value){
    return localStorage.setItem(localStorageKey, value);
}

function getCharacter(){    
    return localStorage.getItem(localStorageKey);
}

function removeCharacter(){
    return localStorage.removeItem(localStorageKey);
}


export {
    setCharacter,
    getCharacter,
    removeCharacter,
}