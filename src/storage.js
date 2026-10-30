export function getPleyers(){
    return JSON.parse(localStorage.getItem("users"))
}
export function setPlayers(data){
    return localStorage.setItem("users",JSON.stringify(data))
}


export function getChoosePlayer(){
    return JSON.parse(localStorage.getItem("player"))
}
export function setChoosePlayer(data){
    return localStorage.setItem("player",JSON.stringify(data))
}