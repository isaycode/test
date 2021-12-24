const PADDLE_WIDTH = 4;
const PADDLE_HEIGHT = 100;
const PADDLE_SPEED = 4;
const TEXT_SIZE = 30;
const MAX_SCORE = 5;


class paddle {
    constructor(id, x, y, upKey, downKey, color) {
        this.id = id;
        this.X = x;
        this.Y = y;
        this.width = PADDLE_WIDTH ;
        this.height = PADDLE_HEIGHT;
        this.color = color;
        this.upKey = upKey;
        this.downKey = downKey;
        this.score = 0;
        this.resetPosition();

        document.addEventListener("keydown", event => this.#keyboardEvent(event));
        document.addEventListener("keyup", event => this.#keyboardEvent(event));

        
    }

    resetPosition() {
        this.x = this.X;
        this.y = this.Y;
        this.up = false;
        this.down = false;
    }

   

    #keyboardEvent(key) {
        if (key.type === "keydown") {
            if (key.key === this.upKey) {
                this.up = true;
            } else if (key.key === this.downKey) {
                this.down = true;
            }
        } else if (key.type === "keyup") {
            if (key.key === this.upKey) {
                this.up = false;
            } else if (key.key === this.downKey) {
                this.down = false;
            }
        }
    }

    #movePaddle(){
        if(this.up) {
            this.moveUp();
          
        }
        if(this.down) {
            this.moveDown();
          
        }
      }
    
      moveUp() {
        //this.y = Math.max(0, this.y - this.moveSpeed);
        // // this.y = this.y - this.speed;
       this.y -= PADDLE_SPEED;
    
      }
    
    
      moveDown() {
        //this.y = Math.min(app.height - this.height, this.y + this.moveSpeed);
        this.y += PADDLE_SPEED;
      }

      



    update(time) {
        this.#movePaddle();
    }

    addScore() {
        this.score += 1;
        
    }

    getScore() {
        return this.score;
    }
}

