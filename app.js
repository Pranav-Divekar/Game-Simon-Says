let gameSeq=[];
let userSeq=[];
let started =false;
let level=0
let h2=document.querySelector("h2");
let btns=["red","green","yellow","blue"];
let body=document.querySelector("body");
let highScore=0;

const modal = document.getElementById('game-info-modal');
const closeBtn = document.querySelector('.close-btn');

modal.style.display = 'flex';

closeBtn.onclick = function() {
    modal.style.display = 'none';
}

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = 'none';
    }
}



document.addEventListener("keypress",function(e){
    if(started==false)
    {
        console.log("Game Started");
        started=true;
        levelUp();
    }
});
function sysflashButton(btn)
{
    btn.classList.add("flashsys");
    setTimeout(function(){
        btn.classList.remove("flashsys");
    },150);
}

function userflashButton(btn)
{
    btn.classList.add("flashuser");
    setTimeout(function(){
        btn.classList.remove("flashuser");
    },150);
}

function flashback()
{
    body.classList.add("flashback");
    setTimeout(function(){
        body.classList.remove("flashback");
    },1500);
}

function levelUp()
{
    userSeq=[];
    level++;
    h2.innerHTML=`Level ${level} <br> Highest Score ${highScore}`;
    let rand_indx = Math.floor(Math.random()*3);
    let rand_col=btns[rand_indx];
    let rand_butt = document.querySelector(`.${rand_col}`);
    gameSeq.push(rand_col);
    console.log(gameSeq);
    sysflashButton(rand_butt);
}

let allBtn = document.querySelectorAll(".btn");
for(a of allBtn)
{
    a.addEventListener("click",btn_press);
}

function checkAns(indx)
{
    console.log(`Current level : ${level}`);
    if(gameSeq[indx]===userSeq[indx])
    {
        if(gameSeq.length==userSeq.length)
        {
            setTimeout(levelUp,500);
        }
    }
    else{
        gameover();
    }
}
function gameover()
{
    h2.innerHTML = `Game Over...!! | Your Score was: <b>${level}</b> <br> Press any key to start again`;
    h2.classList.add("flash-text");
    flashback();
    if(highScore<level)
    {
        highScore=level;
    }
    started=false;
    level=0;
    userSeq=[];
    gameSeq=[];
}
function btn_press()
{   let btn=this;
    console.log(btn.getAttribute("id"));
    userflashButton(btn);
    userSeq.push(btn.getAttribute("id"));
    checkAns(userSeq.length-1);
}
