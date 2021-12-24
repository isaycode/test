const startSpeed = 8;

const ballSize = 10;
const velocityX= 5;
const velocityY= 5;
//const ctx = canvas.getContext('2d');
/**
 * The ball that bounces back and forth
 */
class Ball {
    constructor(id, x, y) {
        this.id = id;
        this.X = x;
        this.Y = y;
        //this.direction=1;
        this.velocityX= velocityX;
        this.velocityY=velocityY;        
        this.width = ballSize;
        this.height = ballSize;
        this.radius = ballSize / 2;
        this.color = 'white';
        this.resetPosition();
        //this.drawBall();
    }

   

    resetPosition() {
        
        this.x = app.width / 2;
        this.y = app.height / 2;
        this.speed = startSpeed;
        this.velocityX = -this.velocityX;
        this.velocityY = -this.velocityY;
        // this.velocityY = 0;
        // while (this.velocityY == 0) 
        // {
        //     this.velocityY = (Math.random() * 10) - 5;

        // }
        // this.velocityX = this.direction * (6 - Math.abs(this.velocityY));
        
    }

    #move() {
        this.x += this.velocityX;
        this.y += this.velocityY;
    }

    #collisionDetect(paddle) {
        paddle.top = paddle.y;
        paddle.right = paddle.x + paddle.width;
        paddle.bottom = paddle.y + paddle.height;
        paddle.left = paddle.x;

        this.top = this.y;
        this.right = this.x + this.width;
        this.bottom = this.y + this.height;
        this.left = this.x;

        return this.left < paddle.right && this.top < paddle.bottom && this.right > paddle.left && this.bottom > paddle.top;
    }

    #checkForPlayercollision() {

        if (this.x < app.width / 2)
        {
            var paddle=app.getNode('player1');
            if (this.#collisionDetect(paddle, this)) {
                // default angle is 0deg in Radian
               let angle = 0;
     
               // if ball hit the top of paddle
               if (this.y < (paddle.y + paddle.height / 2)) 
               {
                   // then -1 * Math.PI / 4 = -45deg
                   angle = -1 * Math.PI / 4;
               } 
               else if (this.y > (paddle.y + paddle.height / 2)) 
               {
                   // if it hit the bottom of paddle
                   // then angle will be Math.PI / 4 = 45deg
                   angle = Math.PI / 4;
               }
   
               // change velocity of ball according to which paddle the ball hits
               this.velocityX = (paddle ===app.getNode('player1') ? 1 : -1) * this.speed * Math.cos(angle);
               this.velocityY = this.speed * Math.sin(angle);
   
               // increase ball speed
               this.speed +=.5;
           }
        }
        else
        {
            var paddle=app.getNode('player2');
            if (this.#collisionDetect(paddle, this)) {
                // default angle is 0deg in Radian
               let angle = 0;
     
               // if ball hit the top of paddle
               if (this.y < (paddle.y + paddle.height / 2)) 
               {
                   // then -1 * Math.PI / 4 = -45deg
                   angle = -1 * Math.PI / 4;
               } 
               else if (this.y > (paddle.y + paddle.height / 2)) 
               {
                   // if it hit the bottom of paddle
                   // then angle will be Math.PI / 4 = 45deg
                   angle = Math.PI / 4;
               }
   
               // change velocity of ball according to which paddle the ball hits
               this.velocityX = (paddle ===app.getNode('player2') ? -1 : 1) * this.speed * Math.cos(angle);
               this.velocityY = this.speed * Math.sin(angle);
   
               // increase ball speed
               this.speed +=.5;
           }
        }
        
        
    }

    #checkForWallHit() {
        // check if ball hits top or bottom wall
        if (this.y + this.height >= app.height || this.y <= 0) {
            this.velocityY = -this.velocityY;
        }

        // right side
        if (this.x > app.width) {
            app.getNode('player1').addScore();
            app.restartMatch();
        }
        // left side
        else if (this.x + this.width < 0) {
            app.getNode('player2').addScore();
            app.restartMatch();
        }
    }

    update(time) {
        this.#move();
        this.#checkForPlayercollision();
        this.#checkForWallHit();
    }

    draw(context) {
        context.beginPath();
        context.fillStyle = this.color;
        // syntax --> arc(x, y, radius, startAngle, endAngle, antiClockwise_or_not)
        context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);// π * 2 Radians = 360 degrees
        context.fill();
    }
}

