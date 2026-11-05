export function getPleyers(){
    return JSON.parse(localStorage.getItem("users"))
}
export function setPlayers(data){
    return localStorage.setItem("users",JSON.stringify(data))
}


export function getChoosePlayer(){
    return JSON.parse(localStorage.getItem("player")) || null
}
export function setChoosePlayer(data){
    return localStorage.setItem("player",JSON.stringify(data))
}


export function setHistory(data){
    return localStorage.setItem("history",JSON.stringify(data))
}


export function getHistory(){
    return JSON.parse(localStorage.getItem("history")) || []
}