export function getPleyers(){
    return JSON.parse(localStorage.getItem("users"))
}
export function setPlayers(data){
    return localStorage.setItem("users",JSON.stringify(data))
}