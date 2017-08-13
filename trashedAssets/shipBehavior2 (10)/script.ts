class ShipBehavior2 extends Sup.Behavior {
  
  public playerNumber=0;
  //private cannonBody:CANNON.Body;
  private controleScheme;
  private maxSpeed=50;
  private moveSpeed=40;
  private rightBuffer;
  private upRightBuffer;
  private upBuffer;
  private upLeftBuffer;
  private leftBuffer;
  private downLeftBuffer;
  private downBuffer;
  private downRightBuffer;
  
  private bufferIncrement;
 
  private maxBufferVH;
  private maxBufferD;
  
  awake() {
    //this.cannonBody = this.actor.cannonBody.body;
    this.rightBuffer=0;
    this.upRightBuffer=0;
    this.upBuffer=0;
    this.upLeftBuffer=0;
    this.leftBuffer=0;
    this.downLeftBuffer=0;
    this.downBuffer=0;
    this.downRightBuffer=0;
    this.maxBufferVH = 7;
    this.maxBufferD = 10;
    this.bufferIncrement = 10;
  }

  update() {
    //0 = croix
    //1 = rond
    //2 = carré
    //3 = triangle
    //4 = L1
    //5 = R1
    //6 = L2
    //7 = R2
    //8 = select
    //9 = start
    //10 = L3
    //11 = R3
    //12 = up
    //13 = down
    //14 = left
    //15 = right
    var upIsDown = Sup.Input.getGamepadButtonValue(this.playerNumber,12) || Sup.Input.isKeyDown("Z");
    var downIsDown = Sup.Input.getGamepadButtonValue(this.playerNumber,13) || Sup.Input.isKeyDown("S");
    var leftIsDown = Sup.Input.getGamepadButtonValue(this.playerNumber,14) || Sup.Input.isKeyDown("Q");
    var rightIsDown = Sup.Input.getGamepadButtonValue(this.playerNumber,15) || Sup.Input.isKeyDown("D");
    var multiplicator = 1;
    var xPad=0;
    var yPad=0;
    
    if (upIsDown){
      yPad+=1
    }
    if (downIsDown){
      yPad-=1
    }
    if (leftIsDown){
      xPad-=1
    }
    if (rightIsDown){
      xPad+=1
    }
    
    this.handleBuffer(xPad,yPad)

    
    //Sup.log("xpad:"+ xPad)
    
   
    }
  
    handleBuffer(x,y){
      if (x==1&&y==0){
        this.incrementBuffer("right");
      }
      if (x==1&&y==1){
        this.incrementBuffer("upRight");
      }
      if (x==0&&y==1){
        this.incrementBuffer("up");
      }
      if (x==-1&&y==1){
        this.incrementBuffer("upLeft");
      }
      if (x==-1&&y==0){
        this.incrementBuffer("left");
      }
      if (x==-1&&y==-1){
        this.incrementBuffer("downLeft");
      }
      if (x==0&&y==-1){
        this.incrementBuffer("down");
      }
      if (x==1&&y==-1){
        this.incrementBuffer("downRight");
      }
    }
  
    incrementBuffer(value:string){
      var buffer
      switch (value){
        case "right":
          buffer=this.rightBuffer;
          this.resetBuffers()
          this.rightBuffer=buffer;
          this.rightBuffer+=this.bufferIncrement;
          if(this.rightBuffer>=this.maxBufferVH){
            this.move(1,0)
            this.rightBuffer = 0;
          }
          Sup.log(this.rightBuffer);
        break; 
        case "upRight":
          buffer=this.upRightBuffer;
          this.resetBuffers()
          this.upRightBuffer=buffer;
          this.upRightBuffer+=this.bufferIncrement;
          if(this.upRightBuffer>=this.maxBufferD){
            this.move(1,1)
            this.upRightBuffer = 0;
          }
        break; 
        case "up":
          buffer=this.upBuffer;
          this.resetBuffers()
          this.upBuffer=buffer;
          this.upBuffer+=this.bufferIncrement;
          if(this.upBuffer>=this.maxBufferVH){
            this.move(0,1)
            this.upBuffer = 0;
          }
        break; 
        case "upLeft":
          buffer=this.upLeftBuffer;
          this.resetBuffers()
          this.upLeftBuffer=buffer;
          this.upLeftBuffer+=this.bufferIncrement;
          if(this.upLeftBuffer>=this.maxBufferD){
            this.move(-1,1)
            this.upLeftBuffer = 0;
          }
        break; 
        case "left":
          buffer=this.leftBuffer;
          this.resetBuffers()
          this.leftBuffer=buffer;
          this.leftBuffer+=this.bufferIncrement;
          if(this.leftBuffer>=this.maxBufferVH){
            this.move(-1,0)
            this.leftBuffer = 0;
          }
        break; 
        case "downLeft":
          buffer=this.downLeftBuffer;
          this.resetBuffers()
          this.downLeftBuffer=buffer;
          this.downLeftBuffer+=this.bufferIncrement;
          if(this.downLeftBuffer>=this.maxBufferD){
            this.move(-1,-1)
            this.downLeftBuffer = 0;
          }  
        break; 
        case "down":
          buffer=this.downBuffer;
          this.resetBuffers()
          this.downBuffer=buffer;
          this.downBuffer+=this.bufferIncrement;
          if(this.downBuffer>=this.maxBufferVH){
            this.move(0,-1)
            this.downBuffer = 0;
          }
        break; 
        case "downRight":
          buffer=this.downRightBuffer;
          this.resetBuffers()
          this.downRightBuffer=buffer;
          this.downRightBuffer+=this.bufferIncrement;
          if(this.downRightBuffer>=this.maxBufferD){
            this.move(1,-1)
            this.downRightBuffer = 0;
          }
        break;
      }
    }
    
    resetBuffers(){
      this.rightBuffer=0;
      this.upRightBuffer=0;
      this.upBuffer=0;
      this.upLeftBuffer=0;
      this.leftBuffer=0;
      this.downLeftBuffer=0;
      this.downBuffer=0;
      this.downRightBuffer=0;
    }
  
    move(x,y){
      var actualPosition:Sup.Math.Vector3=this.actor.getPosition();
      this.actor.move(x,y,0);
      Sup.log("move bitch");
      Sup.log(actualPosition);
    }
}
  
 
Sup.registerBehavior(ShipBehavior2);
