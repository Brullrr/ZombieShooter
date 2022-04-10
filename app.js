const body = document.querySelector('.body')
const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
ctx.font = '50px Georgia';


//global variables 

let gameFrame = 0;
let gameOver = false;
let level = 1;
let numberOfPlayers = false;
let player1killed = 0;
let player2killed = 0;

//player

let playerState = {
    x: 100,
    y: 100,
    angle: 0,
    forward: false,
    back: false,
    fire: false,
    projectileFired: false,
    turnLeft: false,
    turnRight: false,
    alive: true
}
class PlayerProjectile {
    constructor(props) {
        this.radius = 10
        this.x = props.x;
        this.y = props.y;
        this.endingX = 0 + props.x + props.radius * Math.cos(-props.angle*Math.PI/180)*20;
        this.endingY = 0 + props.y + props.radius * Math.sin(-props.angle*Math.PI/180)*20;
        // projectile ending position
        //this.x = 0 + props.x + props.radius * Math.cos(-props.angle*Math.PI/180)*10;
        //this.y = 0 + props.y + props.radius * Math.sin(-props.angle*Math.PI/180)*10;
        this.angle = playerState.angle;
    }
    update() {
        const dx =   this.x - this.endingX;
        const dy =  this.y - this.endingY;
        if( Math.ceil(this.y) != Math.ceil(this.endingY)) {
            this.y -= Math.floor(dy/20);
        }
        if(Math.ceil(this.x) != Math.ceil(this.endingX)) {
            this.x -= Math.floor(dx/20);
        } 
        //makes projectile dissapear
        if( dx > -20 && dx < 20  && dy > -20 && dy < 20 ) {
            playerState.projectileFired = false;
        }
        //collision with 
        enemyStates.forEach(e => {
            const checkX = this.x - e.x;
            const checkY = this.y - e.y; 
            const distance = Math.sqrt( checkX*checkX + checkY*checkY);
            if(distance < this.radius*2 + e.radius) {
                enemyDeaths.push({
                    x: e.x,
                    y: e.y,
                    radius: e.radius,
                    angle: this.angle
                })
                e.alive = false;
                e.x = -100;
                e.y = -100;
                player1killed++;
            }
        })
        
    }
    draw(){
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius/2, 0, 2 * Math.PI);
        ctx.fillStyle = 'black';
        ctx.fill();
        ctx.closePath();
    }
}
let playerProjectile;
const playerImage = new Image();
playerImage.src = './Images/player.png';
class Player {
    constructor () {
        this.x = 100;
        this.y = 100;
        this.radius = 30;
        this.angle = 0;
        this.spriteWidth = 186;
        this.spriteHeight = 270;
        this.frame =0;
        this.frameX = 0;
        this.frameY = 0;
    };
    update(){
        //move player up or down left or right bsed on angle
        if(playerState.angle >= 360) playerState.angle = 0;
        if(playerState.angle < 0) playerState.angle = 359; 
        if(playerState.forward) {
            let maxSpeed = 4.5;
            let increasedBy = 0.1;
            let differenceOne = 0;
            let differenceTwo = maxSpeed;

            for(let i = 0; i< 45; i++) {
                if(i === playerState.angle % 45) {
                    break;
                }
                differenceOne = differenceOne + increasedBy;
                differenceTwo = differenceTwo - increasedBy
            }
            if(playerState.angle >= 0 && playerState.angle < 45) {
                playerState.x = playerState.x + maxSpeed;
                playerState.y = playerState.y - differenceOne;
            }
            if(playerState.angle >= 45 && playerState.angle < 90) {
                playerState.x = playerState.x + differenceTwo;
                playerState.y = playerState.y - maxSpeed;
            }
            if(playerState.angle >= 90 && playerState.angle < 135) {
                playerState.x = playerState.x - differenceOne;
                playerState.y = playerState.y - maxSpeed;
            }
            if(playerState.angle >= 135 && playerState.angle < 180) {
                playerState.x = playerState.x - maxSpeed;
                playerState.y = playerState.y - differenceTwo;
            }
            if(playerState.angle >= 180 && playerState.angle < 225) {
                playerState.x = playerState.x - maxSpeed;
                playerState.y = playerState.y + differenceOne;
            }
            if(playerState.angle >= 225 && playerState.angle < 270) {
                playerState.x = playerState.x - differenceTwo;
                playerState.y = playerState.y + maxSpeed;
            }
            if(playerState.angle >= 270 && playerState.angle < 315) {
                playerState.x = playerState.x + differenceOne;
                playerState.y = playerState.y + maxSpeed;
            }
            if(playerState.angle >= 315 && playerState.angle < 360) {
                playerState.x = playerState.x + maxSpeed;
                playerState.y = playerState.y + differenceTwo;
            }
        }      
        if(playerState.back) {
            playerState.forward = false;
            let maxSpeed = 2.25;
            let increasedBy = maxSpeed/45;
            let differenceOne = 0;
            let differenceTwo = maxSpeed;

            for(let i = 0; i< 45; i++) {
                if(i === playerState.angle % 45) {
                    break;
                }
                differenceOne = differenceOne + increasedBy;
                differenceTwo = differenceTwo - increasedBy
            }
            if(playerState.angle >= 0 && playerState.angle < 45) {
                playerState.x = playerState.x - maxSpeed;
                playerState.y = playerState.y + differenceOne;
            }
            if(playerState.angle >= 45 && playerState.angle < 90) {
                playerState.x = playerState.x - differenceTwo;
                playerState.y = playerState.y + maxSpeed;
            }
            if(playerState.angle >= 90 && playerState.angle < 135) {
                playerState.x = playerState.x + differenceOne;
                playerState.y = playerState.y + maxSpeed;
            }
            if(playerState.angle >= 135 && playerState.angle < 180) {
                playerState.x = playerState.x + maxSpeed;
                playerState.y = playerState.y + differenceTwo;
            }
            if(playerState.angle >= 180 && playerState.angle < 225) {
                playerState.x = playerState.x + maxSpeed;
                playerState.y = playerState.y - differenceOne;
            }
            if(playerState.angle >= 225 && playerState.angle < 270) {
                playerState.x = playerState.x + differenceTwo;
                playerState.y = playerState.y - maxSpeed;
            }
            if(playerState.angle >= 270 && playerState.angle < 315) {
                playerState.x = playerState.x - differenceOne;
                playerState.y = playerState.y - maxSpeed;
            }
            if(playerState.angle >= 315 && playerState.angle < 360) {
                playerState.x = playerState.x - maxSpeed;
                playerState.y = playerState.y - differenceTwo;
            }
        } 
        if(playerState.x != this.x)  this.x = playerState.x; 
        if(playerState.y != this.y) this.y = playerState.y; 
        
        playerState.angle != this.angle ? this.angle = playerState.angle : null;
        
        // reached border checks
        if(playerState.x <= this.radius) playerState.x = this.radius;
        if(playerState.y <= this.radius) playerState.y = this.radius;
        if(playerState.x >= canvas.width - this.radius) playerState.x = canvas.width - this.radius;
        if(playerState.y >= canvas.height - this.radius) {playerState.y = canvas.height - this.radius;}
        enemyStates.forEach(e => {
            const checkX = this.x - e.x;
            const checkY = this.y - e.y; 
        
            const distance = Math.sqrt( checkX*checkX + checkY*checkY);
            if(distance < this.radius + e.radius) {
                playerState.alive = false;
                 
            }
        })
    };
    draw(){
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2)
        ctx.fillStyle = 'transparent';
        ctx.fill();
        ctx.closePath();

        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate((-1)*(this.angle -90)/57);
        ctx.drawImage(playerImage, this.frameX * this.spriteWidth, this.frameY * this.
            spriteHeight, this.spriteWidth, this.spriteHeight, 0 - 35, 0 - 60, this.
            spriteWidth/3, this.spriteHeight/3)
        ctx.restore();
        
        // changes frame to make it look like walking
            if(gameFrame % 5 == 0 && playerState.forward || gameFrame % 5 == 0 && playerState.back ) {
                this.frame++;
            if(this.frame >= 6) {
                this.frame = 0;
                this.frameX = 0
            }
            
            if(this.frame == 5 ){
                this.frameX = 0
            } else {
                this.frameX++;
            }
        } 
    };
    fire() {
        this.frame = 7;
        this.frameX = 6;
        playerProjectile = new PlayerProjectile({angle:this.angle, radius: this.radius , x: this.x, y: this.y});
    }
};
const player = new Player();
//Player controls 
document.onkeydown = keydown; 
function keydown (evt) { 
 
    let controlKey = evt.keyCode;

    if(playerState.alive) {
        switch (controlKey) {
            case 38:
                playerState.forward = true;
                break;
                case 40:
                playerState.back = true;
                break;
            case 37:
                playerState.turnLeft = true;
                break;
            case 39:
                playerState.turnRight = true;
                break; 
            case 13:
            //!playerState.projectileFired && player.fire();
            player.fire();
            playerState.projectileFired = true;
            break;   
        default:
            break;
        }
    }
    if(player2State.alive) {
        switch (controlKey) {
            case 87:
                player2State.forward = true;
                break;
                case 83:
                player2State.back = true;
                break;
            case 65:
                player2State.turnLeft = true;
                break;
            case 68:
                player2State.turnRight = true;
                break; 
            case 50:
            //!player2State.projectileFired && player2.fire();
            player2.fire();
            player2State.projectileFired = true;
            break; 
        }
    } 
}
document.onkeyup = keyup; 
function keyup (evt) { 
 
    let controlKey = evt.keyCode;

    if(playerState.alive) {
        switch (controlKey) {
            case 38:
                playerState.forward = false;
                break;
            case 40:
                playerState.back = false;
                break;
            case 37:
                playerState.turnLeft = false;
                break;
            case 39:
                playerState.turnRight = false;
                break; 
        default:
            break;
        }
    }

    if(player2State.alive) {
        switch (controlKey) {
            case 87:
                player2State.forward = false;
                break;
            case 83:
                player2State.back = false;
                break;
            case 65:
                player2State.turnLeft = false;
                break;
            case 68:
                player2State.turnRight = false;
                break;
            default:
        break;
        }
    }
}



// Player 2
const player2Image1 = new Image();
player2Image1.src = './Images/player2Top.png';
const player2Image2 = new Image();
player2Image2.src = './Images/player2Bottom.png';
let player2State = {
    x: 100,
    y: 200,
    angle: 0,
    forward: false,
    back: false,
    fire: false,
    projectileFired: false,
    turnLeft: false,
    turnRight: false,
    alive: true
}
class Player2Projectile {
    constructor(props) {
        this.radius = 10
        this.x = props.x;
        this.y = props.y;
        this.endingX = 0 + props.x + props.radius * Math.cos(-props.angle*Math.PI/180)*20;
        this.endingY = 0 + props.y + props.radius * Math.sin(-props.angle*Math.PI/180)*20;
        // projectile ending position
        //this.x = 0 + props.x + props.radius * Math.cos(-props.angle*Math.PI/180)*10;
        //this.y = 0 + props.y + props.radius * Math.sin(-props.angle*Math.PI/180)*10;
        this.angle = player2State.angle;
    }
    update() {
        const dx =   this.x - this.endingX;
        const dy =  this.y - this.endingY;
        if( Math.ceil(this.y) != Math.ceil(this.endingY)) {
            this.y -= Math.floor(dy/20);
        }
        if(Math.ceil(this.x) != Math.ceil(this.endingX)) {
            this.x -= Math.floor(dx/20);
        } 
        //makes projectile dissapear
        if( dx > -20 && dx < 20  && dy > -20 && dy < 20 ) {
            player2State.projectileFired = false;
        }
        //collision with 
        enemyStates.forEach(e => {
            const checkX = this.x - e.x;
            const checkY = this.y - e.y; 
        
            const distance = Math.sqrt( checkX*checkX + checkY*checkY);
            if(distance < this.radius*2 + e.radius) {
                enemyDeaths.push({
                    x: e.x,
                    y: e.y,
                    radius: e.radius,
                    angle: this.angle
                })
                e.alive = false;
                e.x = -100;
                e.y = -100;
                player2killed++;
            }
        })
        
    }
    draw(){
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius/2, 0, 2 * Math.PI);
        ctx.fillStyle = 'black';
        ctx.fill();
        ctx.closePath();
    }
}
let player2Projectile;

class Player2 {
    constructor () {
        this.x = 100;
        this.y = 100;
        this.radius = 30;
        this.angle = 0;
        this.spriteWidth = 313;
        this.spriteHeight = 190;
        this.frame = 0;
        this.frameX = 0;
        this.frameY = 0;
        this.sprite2Width = 172;
        this.sprite2Height = 190;
    };
    update(){
        //move player2 up or down left or right bsed on angle
        if(player2State.angle >= 360) player2State.angle = 0;
        if(player2State.angle < 0) player2State.angle = 359; 
        if(player2State.forward) {
            let maxSpeed = 4.5;
            let increasedBy = 0.1;
            let differenceOne = 0;
            let differenceTwo = maxSpeed;

            for(let i = 0; i< 45; i++) {
                if(i === player2State.angle % 45) {
                    break;
                }
                differenceOne = differenceOne + increasedBy;
                differenceTwo = differenceTwo - increasedBy
            }
            if(player2State.angle >= 0 && player2State.angle < 45) {
                player2State.x = player2State.x + maxSpeed;
                player2State.y = player2State.y - differenceOne;
            }
            if(player2State.angle >= 45 && player2State.angle < 90) {
                player2State.x = player2State.x + differenceTwo;
                player2State.y = player2State.y - maxSpeed;
            }
            if(player2State.angle >= 90 && player2State.angle < 135) {
                player2State.x = player2State.x - differenceOne;
                player2State.y = player2State.y - maxSpeed;
            }
            if(player2State.angle >= 135 && player2State.angle < 180) {
                player2State.x = player2State.x - maxSpeed;
                player2State.y = player2State.y - differenceTwo;
            }
            if(player2State.angle >= 180 && player2State.angle < 225) {
                player2State.x = player2State.x - maxSpeed;
                player2State.y = player2State.y + differenceOne;
            }
            if(player2State.angle >= 225 && player2State.angle < 270) {
                player2State.x = player2State.x - differenceTwo;
                player2State.y = player2State.y + maxSpeed;
            }
            if(player2State.angle >= 270 && player2State.angle < 315) {
                player2State.x = player2State.x + differenceOne;
                player2State.y = player2State.y + maxSpeed;
            }
            if(player2State.angle >= 315 && player2State.angle < 360) {
                player2State.x = player2State.x + maxSpeed;
                player2State.y = player2State.y + differenceTwo;
            }
        }  
        if(player2State.back) {
            player2State.forward = false;
            let maxSpeed = 2.25;
            let increasedBy = maxSpeed/45;
            let differenceOne = 0;
            let differenceTwo = maxSpeed;

            for(let i = 0; i< 45; i++) {
                if(i === player2State.angle % 45) {
                    break;
                }
                differenceOne = differenceOne + increasedBy;
                differenceTwo = differenceTwo - increasedBy
            }
            if(player2State.angle >= 0 && player2State.angle < 45) {
                player2State.x = player2State.x - maxSpeed;
                player2State.y = player2State.y + differenceOne;
            }
            if(player2State.angle >= 45 && player2State.angle < 90) {
                player2State.x = player2State.x - differenceTwo;
                player2State.y = player2State.y + maxSpeed;
            }
            if(player2State.angle >= 90 && player2State.angle < 135) {
                player2State.x = player2State.x + differenceOne;
                player2State.y = player2State.y + maxSpeed;
            }
            if(player2State.angle >= 135 && player2State.angle < 180) {
                player2State.x = player2State.x + maxSpeed;
                player2State.y = player2State.y + differenceTwo;
            }
            if(player2State.angle >= 180 && player2State.angle < 225) {
                player2State.x = player2State.x + maxSpeed;
                player2State.y = player2State.y - differenceOne;
            }
            if(player2State.angle >= 225 && player2State.angle < 270) {
                player2State.x = player2State.x + differenceTwo;
                player2State.y = player2State.y - maxSpeed;
            }
            if(player2State.angle >= 270 && player2State.angle < 315) {
                player2State.x = player2State.x - differenceOne;
                player2State.y = player2State.y - maxSpeed;
            }
            if(player2State.angle >= 315 && player2State.angle < 360) {
                player2State.x = player2State.x - maxSpeed;
                player2State.y = player2State.y - differenceTwo;
            }
        }      
        if(player2State.x != this.x)  this.x = player2State.x; 
        if(player2State.y != this.y) this.y = player2State.y; 
        
        player2State.angle != this.angle ? this.angle = player2State.angle : null;
        
        // reached border checks
        if(player2State.x <= this.radius) player2State.x = this.radius;
        if(player2State.y <= this.radius) player2State.y = this.radius;
        if(player2State.x >= canvas.width - this.radius) player2State.x = canvas.width - this.radius;
        if(player2State.y >= canvas.height - this.radius) player2State.y = canvas.height - this.radius;
        enemyStates.forEach(e => {
            const checkX = this.x - e.x;
            const checkY = this.y - e.y; 
        
            const distance = Math.sqrt( checkX*checkX + checkY*checkY);
            if(distance < this.radius + e.radius) {
                player2State.alive = false;
            }
        })
    };
    draw(){
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2)
        ctx.fillStyle = 'transparent';
        ctx.fill();
        ctx.closePath();

        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate((-1)*(this.angle)/57);
        ctx.drawImage(player2Image2, this.frameX * this.sprite2Width, this.frameY * this.
            sprite2Height, this.sprite2Width, this.sprite2Height, 0 - 30, 0 - 20, this.
            sprite2Width/3, this.sprite2Height/3)
        ctx.drawImage(player2Image1, this.frameX * this.spriteWidth, this.frameY * this.
            spriteHeight, this.spriteWidth, this.spriteHeight, 0 - 40, 0 - 50, this.
            spriteWidth/3, this.spriteHeight/3)
        
        ctx.restore();
        
        // changes frame to make it look like walking
            if(gameFrame % 5 == 0 && player2State.forward || gameFrame % 5 == 0 && player2State.back) {
                this.frame++;
            if(this.frame >= 19) {
                this.frame = 0;
                this.frameX = 0
            }
            
            if(this.frame == 20 ){
                this.frameX = 0
            } else {
                this.frameX++;
            }
        
        } 




    };
    fire() {
        player2Projectile = new Player2Projectile({angle:this.angle, radius: this.radius , x: this.x, y: this.y});
    }
};
const player2 = new Player2();


//enemies
let enemyStates = [];
let enemiesArray = [];
const enemyImage = new Image();
enemyImage.src = './Images/ZombieSprites.png';

class Enemy {
    constructor (index) {
        this.x = 100;
        this.y = 100;
        this.radius = 30;
        this.angle = 0;
        this.spriteWidth = 288;
        this.spriteHeight = 280;
        this.index = index;
        this.frame = 12;
        this.frameX = 0;
        this.frameY = 0;
    };
    update(){
        //move enemy up or down left or right bsed on angle
        
        if(true) {
            let maxSpeed = Math.floor(Math.random()* 2.25) + (level*.1) + 1;
            let increasedBy = maxSpeed/45;
            let differenceOne = 0;
            let differenceTwo = maxSpeed;

            for(let i = 0; i< 45; i++) {
                if(i === enemyStates[this.index].angle % 45) {
                    break;
                }
                differenceOne = differenceOne + increasedBy;
                differenceTwo = differenceTwo - increasedBy
            }
            if(enemyStates[this.index].angle >= 0 && enemyStates[this.index].angle < 45) {
                enemyStates[this.index].x = enemyStates[this.index].x + maxSpeed;
                enemyStates[this.index].y = enemyStates[this.index].y - differenceOne;
            }
            if(enemyStates[this.index].angle >= 45 && enemyStates[this.index].angle < 90) {
                enemyStates[this.index].x = enemyStates[this.index].x + differenceTwo;
                enemyStates[this.index].y = enemyStates[this.index].y - maxSpeed;
            }
            if(enemyStates[this.index].angle >= 90 && enemyStates[this.index].angle < 135) {
                enemyStates[this.index].x = enemyStates[this.index].x - differenceOne;
                enemyStates[this.index].y = enemyStates[this.index].y - maxSpeed;
            }
            if(enemyStates[this.index].angle >= 135 && enemyStates[this.index].angle < 180) {
                enemyStates[this.index].x = enemyStates[this.index].x - maxSpeed;
                enemyStates[this.index].y = enemyStates[this.index].y - differenceTwo;
            }
            if(enemyStates[this.index].angle >= 180 && enemyStates[this.index].angle < 225) {
                enemyStates[this.index].x = enemyStates[this.index].x - maxSpeed;
                enemyStates[this.index].y = enemyStates[this.index].y + differenceOne;
            }
            if(enemyStates[this.index].angle >= 225 && enemyStates[this.index].angle < 270) {
                enemyStates[this.index].x = enemyStates[this.index].x - differenceTwo;
                enemyStates[this.index].y = enemyStates[this.index].y + maxSpeed;
            }
            if(enemyStates[this.index].angle >= 270 && enemyStates[this.index].angle < 315) {
                enemyStates[this.index].x = enemyStates[this.index].x + differenceOne;
                enemyStates[this.index].y = enemyStates[this.index].y + maxSpeed;
            }
            if(enemyStates[this.index].angle >= 315 && enemyStates[this.index].angle < 360) {
                enemyStates[this.index].x = enemyStates[this.index].x + maxSpeed;
                enemyStates[this.index].y = enemyStates[this.index].y + differenceTwo;
            }
        }      
        if(enemyStates[this.index].x != this.x)  this.x = enemyStates[this.index].x; 
        if(enemyStates[this.index].y != this.y) this.y = enemyStates[this.index].y; 
        enemyStates[this.index].angle != this.angle ? this.angle = enemyStates[this.index].angle : null;
        // reached border checks
        if(enemyStates[this.index].x <= this.radius) {
            enemyStates[this.index].angle = Math.floor(Math.random()*359);
            enemyStates[this.index].x = this.radius;} 
        if(enemyStates[this.index].y <= this.radius) {
            enemyStates[this.index].angle = Math.floor(Math.random()*359);
            enemyStates[this.index].y = this.radius;}
        if(enemyStates[this.index].x >= canvas.width - this.radius){
            enemyStates[this.index].angle = Math.floor(Math.random()*359);
            enemyStates[this.index].x = canvas.width - this.radius;
            
        } 
        if(enemyStates[this.index].y >= canvas.height - this.radius) {
            enemyStates[this.index].angle = Math.floor(Math.random()*359);
            enemyStates[this.index].y = canvas.height - this.radius;
            
        } 
    };
    draw(){
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2);
        ctx.fillStyle = 'transparent';
        ctx.fill();
        ctx.closePath();

        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate((-1)*(this.angle)/57);
        ctx.drawImage(enemyImage, this.frameX * this.spriteWidth, this.frameY * this.
            spriteHeight, this.spriteWidth, this.spriteHeight, 0 - 45, 0 - 57, this.
            spriteWidth/2.8, this.spriteHeight/2.8)
        ctx.restore();

        // changes frame to make it look like walking
        if(gameFrame % 5 == 0) {
                this.frame++;
            if(this.frame >= 16) {
                this.frame = 0;
                this.frameX = 0
            } else { 
                this.frameX++;
            }
        } 
    };
    fire() {
        enemyProjectile = new EnemyProjectile({angle:this.angle, radius: this.radius, x: this.x, y: this.y});
    }
};


//changes direction (angle) ofzombie at random
let enemyDeaths = [];
const createEnemies = () => {
    enemyDeaths = [];
    enemyStates = [];
    enemiesArray = [];
    for(let i = 0; i< level*5; i++) {
        enemiesArray.push(new Enemy(i));
        enemyStates.push(
            {
                index: i,
                x: Math.floor(Math.random()* (canvas.width/4)) + canvas.width - canvas.width/4,
                y: Math.floor(Math.random()*(canvas.height/4)) + canvas.height - canvas.height/4,
                radius: 30,
                angle: Math.floor(Math.random()*359),
                forward: false,
                projectileFired: false,
                alive: true,

            }
        )
    }

    enemyStates.forEach(e => {
        let randomTime = Math.floor(Math.random()*2500) + 500;
        setInterval(()=> { 
            e.angle = Math.floor(Math.random()*359)
        }, randomTime);
    })
}
createEnemies();

let blood = new Image();
blood.src = './Images/BloodSplat1.png';
const drawEnemyDeath = (x, y, radius, angle) => {
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate((-1)*(angle/65));
        ctx.drawImage(blood, 0, 0, 150, 150, 0-30, 0-90, 150, 150)
        ctx.restore();
    }

const checkEnemies = () => {
    let nextLevel = true;
    enemyStates.forEach(e => {
        if(e.alive) { nextLevel = false} 
    })
    return nextLevel;
}
//background
const background = new Image();
background.src = './Images/Wasteland.png';
const BG = {
    x1: 0,
    x2: canvas.width,
    y: 0,
    width: canvas.width,
    height: canvas.height
}
const handleBackground = () => {
    BG.x1--;
    if(BG.x1 < -BG.width) BG.x1 = BG.width
    ctx.drawImage(background, BG.x1, BG.y, BG.width, BG.height);
    ctx.drawImage(background, BG.x2, BG.y, BG.width, BG.height);
}

let lastFrame = false;
//animate
const animate = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'black';
    ctx.drawImage(background, BG.x1, BG.y, BG.width, BG.height);
    enemyDeaths.forEach(e => {
        drawEnemyDeath(e.x, e.y, e.radius, e.angle)
    })
    
    if(playerState.alive) {
        playerState.turnLeft && playerState.angle++;
        playerState.turnRight && playerState.angle--;
        player.update();
        player.draw();
    }
    
    if(playerState.projectileFired) {
        playerProjectile.update()
        playerProjectile.draw();
    }
    if(!numberOfPlayers){
        player2State.alive = false;
    }
    if(numberOfPlayers) {
        if(player2State.alive) {
            player2State.turnLeft && player2State.angle++;
            player2State.turnRight && player2State.angle--;
            player2.update();
            player2.draw();
        }
        
        if(player2State.projectileFired) {
            player2Projectile.update()
            player2Projectile.draw();
        }
    }
    enemyStates.forEach((e, index) => {
        if(e.alive) {
            enemiesArray[index].update();
            enemiesArray[index].draw();            
        }
    })

    
    
    let nextLevel = checkEnemies();

    if (nextLevel) {
        level++;
        createEnemies();
        player2State = {
            x: 100,
            y: 200,
            angle: 0,
            forward: false,
            back: false,
            fire: false,
            projectileFired: false,
            turnLeft: false,
            turnRight: false,
            alive: true
        }
        playerState = {
            x: 100,
            y: 100,
            angle: 0,
            forward: false,
            back: false,
            fire: false,
            projectileFired: false,
            turnLeft: false,
            turnRight: false,
            alive: true
        }
    }
    ctx.font = '50px Georgia';
    ctx.fillStyle = 'black';
    let p2killdisplay = numberOfPlayers ? ' P2: ' + player2killed : '';
    ctx.fillText('Level: ' + level + ' P1: ' + player1killed + p2killdisplay  , 10, 50);

    if(!player2State.alive && !playerState.alive){
        gameOver = true;
    }

    if(!lastFrame) {
        requestAnimationFrame(animate);
    }

    

    if(gameOver) {
        lastFrame = true;
        endModalCreate();
    }
    gameFrame++;
}


let gameStart = false;

const startGameHandler = (ToF) => {
    gameStart = true;
    numberOfPlayers = ToF;
    animate();
    
}

if(!gameStart) {
    let modal = document.createElement('div');
    modal.classList.add('modal');
    let player1Img = document.createElement('img');
    player1Img.src = './Images/Solo.png';
    let player2Img = document.createElement('img');
    player2Img.src = './Images/Coop.png';
    let player1Label = document.createElement('button');
    player1Label.classList.add('Button');
    player1Label.innerHTML = 'Solo';
    
    let player2Label = document.createElement('button');
    player2Label.classList.add('Button');
    player2Label.innerHTML = 'Co-Op';
    let controlsPlayer1 = document.createElement('div');
    let controlsPlayer1Forward = document.createElement('p');
    let controlsPlayer1ForwardText = document.createTextNode('Forward');
    let controlsPlayer1TurnLeft = document.createElement('p');
    let controlsPlayer1TurnLeftText = document.createTextNode('Turn Left');
    let controlsPlayer1TurnRight = document.createElement('p');
    let controlsPlayer1TurnRightText = document.createTextNode('Turn Right');
    let controlsPlayer1Shoot = document.createElement('p');
    let controlsPlayer1ShootText = document.createTextNode('Shoot');
    let controlsPlayer1Up = document.createElement('p');
    let controlsPlayer1UpText = document.createTextNode('↑');
    let controlsPlayer1Left = document.createElement('p');
    let controlsPlayer1LeftText = document.createTextNode('←');
    let controlsPlayer1Right = document.createElement('p');
    let controlsPlayer1RightText = document.createTextNode('→');
    let controlsPlayer1Enter = document.createElement('p');
    let controlsPlayer1EnterText = document.createTextNode('Enter');
    let controlsPlayer2 = document.createElement('div');
    let controlsPlayer2Forward = document.createElement('p');
    let controlsPlayer2ForwardText = document.createTextNode('Forward');
    let controlsPlayer2TurnLeft = document.createElement('p');
    let controlsPlayer2TurnLeftText = document.createTextNode('Turn Left');
    let controlsPlayer2TurnRight = document.createElement('p');
    let controlsPlayer2TurnRightText = document.createTextNode('Turn Right');
    let controlsPlayer2Shoot = document.createElement('p');
    let controlsPlayer2ShootText = document.createTextNode('Shoot');
    let controlsPlayer2Up = document.createElement('p');
    let controlsPlayer2UpText = document.createTextNode('W');
    let controlsPlayer2Left = document.createElement('p');
    let controlsPlayer2LeftText = document.createTextNode('A');
    let controlsPlayer2Right = document.createElement('p');
    let controlsPlayer2RightText = document.createTextNode('D');
    let controlsPlayer2Enter = document.createElement('p');
    let controlsPlayer2EnterText = document.createTextNode('2');


    modal.appendChild(player1Img);
    modal.appendChild(player2Img);
    modal.appendChild(player1Label);
    modal.appendChild(player2Label);
    modal.appendChild(controlsPlayer1);
    modal.appendChild(controlsPlayer2);
    player1Img.classList.add('ImageOne');
    player2Img.classList.add('ImageTwo');
    controlsPlayer1.classList.add('Controls');
    controlsPlayer2.classList.add('Controls');



    controlsPlayer1.appendChild(controlsPlayer1Forward);
    controlsPlayer1Forward.appendChild(controlsPlayer1ForwardText);
    controlsPlayer1.appendChild(controlsPlayer1TurnLeft);
    controlsPlayer1TurnLeft.appendChild(controlsPlayer1TurnLeftText);
    controlsPlayer1.appendChild(controlsPlayer1TurnRight);
    controlsPlayer1TurnRight.appendChild(controlsPlayer1TurnRightText);
    controlsPlayer1.appendChild(controlsPlayer1Shoot);
    controlsPlayer1Shoot.appendChild(controlsPlayer1ShootText);
    
    controlsPlayer1.appendChild(controlsPlayer1Up);
    controlsPlayer1Up.appendChild(controlsPlayer1UpText);
    controlsPlayer1.appendChild(controlsPlayer1Left);
    controlsPlayer1Left.appendChild(controlsPlayer1LeftText);
    controlsPlayer1.appendChild(controlsPlayer1Right);
    controlsPlayer1Right.appendChild(controlsPlayer1RightText);
    controlsPlayer1.appendChild(controlsPlayer1Enter);
    controlsPlayer1Enter.appendChild(controlsPlayer1EnterText);

    controlsPlayer2.appendChild(controlsPlayer2Forward);
    controlsPlayer2Forward.appendChild(controlsPlayer2ForwardText);
    controlsPlayer2.appendChild(controlsPlayer2TurnLeft);
    controlsPlayer2TurnLeft.appendChild(controlsPlayer2TurnLeftText);
    controlsPlayer2.appendChild(controlsPlayer2TurnRight);
    controlsPlayer2TurnRight.appendChild(controlsPlayer2TurnRightText);
    controlsPlayer2.appendChild(controlsPlayer2Shoot);
    controlsPlayer2Shoot.appendChild(controlsPlayer2ShootText);
    
    controlsPlayer2.appendChild(controlsPlayer2Up);
    controlsPlayer2Up.appendChild(controlsPlayer2UpText);
    controlsPlayer2.appendChild(controlsPlayer2Left);
    controlsPlayer2Left.appendChild(controlsPlayer2LeftText);
    controlsPlayer2.appendChild(controlsPlayer2Right);
    controlsPlayer2Right.appendChild(controlsPlayer2RightText);
    controlsPlayer2.appendChild(controlsPlayer2Enter);
    controlsPlayer2Enter.appendChild(controlsPlayer2EnterText);



    body.appendChild(modal);

    player2Label.addEventListener('click', () => {
        startGameHandler(true);
        modal.style.display = 'none';
    })
    player1Label.addEventListener('click', () => {
        startGameHandler(false);
        modal.style.display = 'none';
    })

};
let endModal = document.createElement('div');
const restartGame = () => {
    console.log('heyo')
    endModal.innerHTML = '';
    endModal.classList.remove('EndModal');
    
    player1killed = 0;
    player2killed = 0;
    
    player2State = {
        x: 100,
        y: 200,
        angle: 0,
        forward: false,
        back: false,
        fire: false,
        projectileFired: false,
        turnLeft: false,
        turnRight: false,
        alive: true
    }
    player2State.alive = numberOfPlayers;
    playerState = {
        x: 100,
        y: 100,
        angle: 0,
        forward: false,
        back: false,
        fire: false,
        projectileFired: false,
        turnLeft: false,
        turnRight: false,
        alive: true
    }

    gameOver = false;
    lastFrame = false;
    
    enemyDeaths = [];
    enemyStates = [];
    enemiesArray = [];
    level = 1;
    createEnemies();
    gameStart = true;
    startGameHandler(numberOfPlayers)

}

const endModalCreate = ( ) =>{
        
        endModal.classList.add('EndModal');
        endModal.innerHTML = '';
        let gameOverP = document.createElement('p');
        let gameOverText = document.createTextNode('Game Over');
        gameOverP.appendChild(gameOverText);

        let zombosKilledP = document.createElement('p');
        let zombosKilledText = document.createTextNode('Zombies Elimated:  '  + (player1killed*1 + player2killed*1));
        zombosKilledP.appendChild(zombosKilledText);

        let playAgainButton = document.createElement('button');
        playAgainButton.classList.add('Button');
        playAgainButton.innerHTML = 'Play again?'
        playAgainButton.addEventListener('click', restartGame);
    
        endModal.appendChild(gameOverP)
        endModal.appendChild(zombosKilledP)
        endModal.appendChild(playAgainButton);
        body.appendChild(endModal);
}