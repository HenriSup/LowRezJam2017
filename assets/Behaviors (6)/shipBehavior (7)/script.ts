class ShipBehavior extends Sup.Behavior {
  
  public playerNumber=0;
  private cannonBody:CANNON.Body;
  private controleScheme;
  private maxSpeed=50;
  private moveSpeed=50;
  private moveBuffer:Sup.Math.Vector2;
  
  awake() {
    this.cannonBody = this.actor.cannonBody.body;
    this.moveBuffer = new Sup.Math.Vector2(0,0);
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
    var multiplicator = 0.707;
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
    var angle= Sup.Math.toDegrees(Math.atan2(xPad,yPad));
    
    this.cannonBody.linearDamping=0.19;
    
    if (xPad!=0 && yPad!=0){
      multiplicator=0.707;
    }
    
    
    
    this.actor.cannonBody.body.velocity=new CANNON.Vec3((xPad*this.moveSpeed*multiplicator),(yPad*this.moveSpeed*multiplicator),0);
    Sup.log("vertical ="+this.actor.cannonBody.body.velocity);


    this.moveBuffer = new Sup.Math.Vector2(this.actor.cannonBody.body.position.x%1,this.actor.cannonBody.body.position.y%1)


    this.actor.cannonBody.body.position.x=Math.round(this.actor.cannonBody.body.position.x);
    this.actor.cannonBody.body.position.y=Math.round(this.actor.cannonBody.body.position.y);

   
    
    
  }
  
  getVelocityX() {
    var x=this.cannonBody.velocity.x;
  
      if (-1<x && x<1){
        x=0;
      }

    return x;
  }
  
  getVelocityY() {
    var y=this.cannonBody.velocity.y;
  
      if (-1<y && y<1){
        y=0;
      }

    return y;
  }
}
Sup.registerBehavior(ShipBehavior);
