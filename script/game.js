var myGameArea;
var myGamePiece;
var myBackground;
var myObstacles = [];
var myscore;

function restartGame() {
document.getElementById("myfilter").style.display = "none";
document.getElementById("myrestartbutton").style.display = "none";
myGameArea.stop();
myGameArea.clear();
myGameArea = {};
myGamePiece = {};
myObstacles = [];
myscore = {};
document.getElementById("canvascontainer").innerHTML = "";
startGame()
}

function startGame() {
    myGameArea = new gamearea();
    myGamePiece = new component(50, 50, "../image/sail.png", 10, 120, "image");
    mySound = new sound("https://www.w3schools.com/graphics/bounce.mp3");
    myMusic = new sound("https://www.w3schools.com/graphics/gametheme.mp3");
    myMusic.play();
    myscore = new component("30px", "Open Sans", "red", 280, 40, "text");
    myGameArea.start();
}
function gamearea() {
    this.canvas = document.createElement("canvas");
    this.canvas.width = 500;
    this.canvas.height = 500;    
    document.getElementById("canvascontainer").appendChild(this.canvas);
    this.context = this.canvas.getContext("2d");
    this.pause = false;
    this.frameNo = 0;
    this.start = function() {
        this.interval = setInterval(updateGameArea, 20);
    }
    this.stop = function() {
        clearInterval(this.interval);
        this.pause = true;
    }
    this.clear = function(){
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}

function component(width, height, color, x, y, type) {

    this.type = type;
 if (type == "image") {
    this.image = new Image();
    this.image.src = color;
  }
    this.score = 0;    this.width = width;
    this.height = height;
    this.speedX = 0;
    this.speedY = 0;    
    this.x = x;
    this.y = y;    
    this.update = function() {
    ctx = myGameArea.context;
    if (type == "image") {
      ctx.drawImage(this.image,
        this.x,
        this.y,
        this.width, this.height);
    }else if (this.type == "text") {
            ctx.font = this.width + " " + this.height;
            ctx.fillStyle = color;
            ctx.fillText(this.text, this.x, this.y);
        } else {
      ctx.fillStyle = color;
      ctx.fillRect(this.x, this.y, this.width, this.height);
    }
  }
    this.crashWith = function(otherobj) {
        var myleft = this.x;
        var myright = this.x + (this.width);
        var mytop = this.y;
        var mybottom = this.y + (this.height);
        var otherleft = otherobj.x;
        var otherright = otherobj.x + (otherobj.width);
        var othertop = otherobj.y;
        var otherbottom = otherobj.y + (otherobj.height);
        var crash = true;
        if ((mybottom < othertop) || (mytop > otherbottom) || (myright < otherleft) || (myleft > otherright)) {
            crash = false;
        }
        return crash;
    }
}

function updateGameArea() {
    var x, y, min, max, height, gap;
    for (i = 0; i < myObstacles.length; i += 1) {
        if (myGamePiece.crashWith(myObstacles[i])) {
            mySound.play();
            myMusic.stop();  
            myGameArea.stop();
            document.getElementById("myfilter").style.display = "block";
            document.getElementById("myrestartbutton").style.display = "block";
            return;
        } 
    }
    if (myGameArea.pause == false) {
        myGameArea.clear();
        myGameArea.frameNo += 1;
        myscore.score +=1;        
        if (myGameArea.frameNo == 1 || everyinterval(150)) {
            x = myGameArea.canvas.width;
            y = myGameArea.canvas.height - 100;
            min = 25;
            max = 400;
            height = Math.floor(Math.random()*(max-min+1)+min);
            min = 100
            max = 150;
            gap = Math.floor(Math.random()*(max-min+1)+min);
            myObstacles.push(new component(10, height, "../image/rockwall.png", x, 0, "image"));
            myObstacles.push(new component(10, x - height - gap, "../image/rockwall.png", x, height + gap, "image"));


        }
        for (i = 0; i < myObstacles.length; i += 1) {
            myObstacles[i].x += -1;
            myObstacles[i].update();
        }
        myscore.text="SCORE: " + myscore.score;        
        myscore.update();
        myGamePiece.x += myGamePiece.speedX;
        myGamePiece.y += myGamePiece.speedY;    
        myGamePiece.update();
    }
}
function sound(src) {
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
    document.body.appendChild(this.sound);
    this.play = function(){
        this.sound.play();
    }
    this.stop = function(){
        this.sound.pause();
    }    
}

function everyinterval(n) {
    if ((myGameArea.frameNo / n) % 1 == 0) {return true;}
    return false;
}

function moveup(e) {
    myGamePiece.image.src = "../image/fast-sail.png";
    myGamePiece.speedY = -5; 
}

function movedown() {
    myGamePiece.image.src = "../image/fast-sail.png";
    myGamePiece.speedY = 5; 
}

function moveleft() {
    myGamePiece.image.src = "../image/fast-sail.png";
    myGamePiece.speedX = -5; 
}

function moveright() {
    myGamePiece.image.src = "../image/fast-sail.png";
    myGamePiece.speedX = 5; 
}

function clearmove(e) {
    myGamePiece.image.src = "../image/sail.png";
    myGamePiece.speedX = 0; 
    myGamePiece.speedY = 0; 
}
startGame();
