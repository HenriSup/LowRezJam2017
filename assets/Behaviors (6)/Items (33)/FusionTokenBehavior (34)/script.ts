class FusionTokenBehavior extends Sup.Behavior {
  
  private framesAlive=0;
  private lifeTime=10*60;
  private hitBoxToken:Sup.ArcadePhysics2D.Body;
  private gameManager:GameManagerBehavior;
  private ship1:ShipBehavior;
  private ship2:ShipBehavior;
  private hasBeenPicked=false;
  
  awake() {
    this.hitBoxToken = this.actor.arcadeBody2D;
    this.gameManager = Sup.getActor("GameManager").getBehavior(GameManagerBehavior);
    this.ship1 = this.gameManager.getShipByNumber(0);
    this.ship2 = this.gameManager.getShipByNumber(1);
  }

  update() {
    var buffer =0
    
    if (this.framesAlive%5==0){
      buffer=-1;
    }
    
    if (!this.hasBeenPicked){
      this.actor.moveX((Math.cos(this.framesAlive/10)));
      this.actor.moveY(buffer);
    }
    
    
    var actualPos = this.actor.getPosition();
    this.actor.setPosition(new Sup.Math.Vector3 (Math.round(actualPos.x),actualPos.y,actualPos.z))
    if (this.framesAlive>this.lifeTime){
      this.actor.destroy();
    }
    this.moveHitBox();
    if (!this.hasBeenPicked){
      this.checkCollision();
    }
    this.framesAlive++;
    this.animate();
  }
  
  moveHitBox(){
    this.hitBoxToken.warpPosition(this.actor.getPosition().x,this.actor.getPosition().y);
  }
  
  checkCollision(){
    //collides with player 1
    if (!this.hasBeenPicked){
      if(Sup.ArcadePhysics2D.intersects(this.hitBoxToken,this.ship1.getHitBox())){
        this.ship1.pickedUpFusionToken();
        this.hasBeenPicked=true;
      } 
      //collides with player 2
      if(Sup.ArcadePhysics2D.intersects(this.hitBoxToken,this.ship2.getHitBox())){
        this.ship2.pickedUpFusionToken();
        this.hasBeenPicked=true;
      }  
    }
   
  }
  animate() {
    if (this.hasBeenPicked && this.actor.spriteRenderer.getAnimation()!="Picked"){
      this.actor.spriteRenderer.setAnimation("Picked")
    }
    
    if (this.actor.spriteRenderer.getAnimation()=="Picked" && (this.actor.spriteRenderer.getAnimationFrameIndex()>=7) ){
      this.actor.destroy();
    }
  }
}
Sup.registerBehavior(FusionTokenBehavior);
