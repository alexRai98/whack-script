
function time(time,buton){
    for(let i=1; i<time ; i++){
        buton.texContent = i;
        delay(1000);
    }
}
function run(){
    time(buton);
 }
let buton = document.querySelector(".timer");
buton.addEventListener("click",() => run())

const moles = [
    {
        id : 1,
        lives : 1,
        type : "newbie",
        stade : "hided",
        level : "easy"
    },
    {
        id : 2,
        lives : 2,
        type : "mole",
        stade : "hided",
        level : "regular"
    },
    {
        id : 3,
        lives : 3,
        type : "moster mole",
        stade : "hided",
        level : "hard"
    }
]
