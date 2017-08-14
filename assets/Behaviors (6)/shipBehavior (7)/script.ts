class ShipBehavior extends Sup.Behavior {
  
  public playerNumber=0;
  private cannonBody:CANNON.Body;
  private controleScheme;
  private maxSpeed=50;
  private moveSpeed=50;
  private coolddown = 0.5*60;
  private lastShootFrame = -10 ;
  private frameCounter = 0;
  private fusionOMeter= 0;
  private hitBoxShip:Sup.ArcadePhysics2D.Body;
  
  awake() {
    this.cannonBody = this.actor.cannonBody.body;
    this.hitBoxShip = this.actor.arcadeBody2D;
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
    if (this.playerNumber == 0){
      this.controleScheme = {left:'Q',right:'D',up:'Z',down:'S',shoot:'V',jump:'B',dash:'N',
                             left2:'A',right2:'D',up2:'W',down2:'S',shoot2:'V',jump2:'B',dash2:'N'};
    } 
    if (this.playerNumber == 1){
      this.controleScheme = {left:'LEFT',right:'RIGHT',up:'UP',down:'DOWN',shoot:'I',jump:'O',dash:'P',
                             left2:'LEFT',right2:'RIGHT',up2:'UP',down2:'DOWN',shoot2:'NUMPAD1',jump2:'NUMPAD2',dash2:'NUMPAD3'};
    }
    var upIsDown = Sup.Input.getGamepadButtonValue(this.playerNumber,12) || Sup.Input.isKeyDown(this.controleScheme.up);
    var downIsDown = Sup.Input.getGamepadButtonValue(this.playerNumber,13) || Sup.Input.isKeyDown(this.controleScheme.down);
    var leftIsDown = Sup.Input.getGamepadButtonValue(this.playerNumber,14) || Sup.Input.isKeyDown(this.controleScheme.left);
    var rightIsDown = Sup.Input.getGamepadButtonValue(this.playerNumber,15) || Sup.Input.isKeyDown(this.controleScheme.right);
    var shootIsDown = Sup.Input.getGamepadButtonValue(this.playerNumber,5) || Sup.Input.isKeyDown(this.controleScheme.shoot);
    var multiplicator = 0.707;
      
    if (shootIsDown && (this.frameCounter - this.lastShootFrame > this.coolddown)){
      this.shoot();
    }
    
    
    
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
    
    
    // Border Limits 
    if(this.cannonBody.position.x > 32){
      this.cannonBody.position.x  = 32;
    }
    if(this.cannonBody.position.x < -32){
      this.cannonBody.position.x  = -32;
    }
    if(this.cannonBody.position.y > 32){
      this.cannonBody.position.y  = 32;
    }
    if(this.cannonBody.position.y < -32){
      this.cannonBody.position.y  = -32;
    }
    
    this.actor.cannonBody.body.position.x=Math.round(this.actor.cannonBody.body.position.x);
    this.actor.cannonBody.body.position.y=Math.round(this.actor.cannonBody.body.position.y);
    
    this.moveHitBox();
    
    this.animate(xPad,yPad);
    
    
    this.incrementFrameCounter();
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
  
  shoot(){
    var shot = Sup.appendScene("Prefab/Bullets/Basic-1")[0];
    var actorPosition:Sup.Math.Vector3 = this.actor.getPosition();
    shot.setPosition(new Sup.Math.Vector3(actorPosition.x,actorPosition.y,actorPosition.z-1));
    this.lastShootFrame = this.frameCounter;
  }
  
  incrementFrameCounter(){
    this.frameCounter++;
  }
  
  moveHitBox(){
    this.hitBoxShip.warpPosition(this.actor.getPosition().x,this.actor.getPosition().y);
  }
  
  public getHitBox(){
    return this.hitBoxShip;
  }
  
  public pickedUpFusionToken(){
    if (this.fusionOMeter<100) {
      this.fusionOMeter+=20;
    }
  }
  
  private instantiateTrail(){
    var trail = Sup.appendScene("Prefab/ShipTrail")[0];
    var actorPosition:Sup.Math.Vector3 = this.actor.getPosition();
    trail.setPosition(new Sup.Math.Vector3(actorPosition.x,actorPosition.y,actorPosition.z-1));
    trail.getBehavior(ShipTrailBehavior).setShipNumber(this.playerNumber);
  }
  
  private animate(x,y){
    var actualIndex = this.actor.spriteRenderer.getAnimationFrameIndex();
    if (x<0 && this.actor.spriteRenderer.getAnimation()!="Hit"){
      this.actor.spriteRenderer.setAnimation("Hit",true);
      this.actor.spriteRenderer.setAnimationFrameTime(actualIndex);
    }
    if (x>0 && this.actor.spriteRenderer.getAnimation()!="Spawning"){
      this.actor.spriteRenderer.setAnimation("Spawning",true);
      this.actor.spriteRenderer.setAnimationFrameTime(actualIndex);
    }   
    if (x==0 && this.actor.spriteRenderer.getAnimation()!="Moving"){
      this.actor.spriteRenderer.setAnimation("Moving",true);
      this.actor.spriteRenderer.setAnimationFrameTime(actualIndex);
    }
  }
  
}
Sup.registerBehavior(ShipBehavior);
