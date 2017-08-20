class NanoBehavior extends Sup.Behavior {
  
  public horizontalMaxMovement = 10;
  public life = 3;
  public shotDamages = 1;
  public damagesDoneWhenCollide = 1;
  public damagesTakenWhenCollide = 3;
  public invulerabilityFrame = 10;
  public framesBeforeVerticalMovement = 10;
  
  private framesAlive=0;
  private gameManager:GameManagerBehavior;
  private ship1:ShipBehavior;
  private ship2:ShipBehavior;
  private shouldDie=false;
  private shouldShoot =false;
  private lastFrameHit =-10;
  private shouldGoRight = true;
  private initialPos:Sup.Math.Vector3;
  private hitBoxToken:Sup.ArcadePhysics2D.Body;
  private framesDead=0;
  
  awake() {
    this.hitBoxToken = this.actor.arcadeBody2D;
    this.gameManager = Sup.getActor("GameManager").getBehavior(GameManagerBehavior);
    this.ship1 = this.gameManager.getShipByNumber(0);
    this.ship2 = this.gameManager.getShipByNumber(1);
    this.initialPos = this.actor.getPosition();
  }

  update() {
    
    if (this.actor.getPosition().x >= this.initialPos.x + this.horizontalMaxMovement){
      this.shouldGoRight = false;
    }
    if (this.actor.getPosition().x <= this.initialPos.x - this.horizontalMaxMovement){
      this.shouldGoRight = true;
    }
    
    if (this.life <= 0){
      this.shouldDie=true;
    }
    var bufferY =0
    
    if (this.framesAlive%this.framesBeforeVerticalMovement==0){
      bufferY=-1;
    }
    
    if (this.framesAlive%30==0 && this.i){
      this.shoot();
    }

    var bufferX = 0
    
    if (this.framesAlive%5==0){
      if (this.shouldGoRight) {
        bufferX=1; 
      }
      else {
        bufferX=-1;
      }
    }
    
    if (!this.shouldDie){
      this.actor.moveX(bufferX);
      this.actor.moveY(bufferY);
    }
    
    
    var actualPos = this.actor.getPosition();
    this.actor.setPosition(new Sup.Math.Vector3 (Math.round(actualPos.x),actualPos.y,actualPos.z))
    
    if (this.isOffScreen){
      this.shouldDie=true;
    }
    
    this.moveHitBox();
    if (!this.shouldDie){
      this.checkCollision();
    }
    if (this.shouldDie){
      this.framesDead++;
      this.instantiateExplosions();
    }
    
    this.framesAlive++;
    this.animate(this.shouldShoot);
  }
  
  moveHitBox(){
    this.hitBoxToken.warpPosition(this.actor.getPosition().x,this.actor.getPosition().y);
  }
  
  checkCollision(){
    //collides with player 1
    if (!this.shouldDie && (this.lastFrameHit+this.invulerabilityFrame>this.framesAlive)){
      if(Sup.ArcadePhysics2D.intersects(this.hitBoxToken,this.ship1.getHitBox())){
        this.ship1.hit(this.damagesDoneWhenCollide);
        this.hit(this.damagesTakenWhenCollide)
        this.lastFrameHit = this.framesAlive;
      } 
      //collides with player 2
      if(Sup.ArcadePhysics2D.intersects(this.hitBoxToken,this.ship2.getHitBox())){
        this.ship2.hit(this.damagesDoneWhenCollide);
        this.hit(this.damagesTakenWhenCollide)
        this.lastFrameHit = this.framesAlive;
      }  
    }   
  }
  
  animate(shoot) {
    if (this.shouldDie){
      if ((this.actor.spriteRenderer.getAnimation()!="Shoot")){
        this.actor.spriteRenderer.setAnimation("Shoot",true)
      }
    } 
    else {
      if (shoot){
        this.actor.spriteRenderer.setAnimation("Shoot")
        this.shouldShoot=false;
      } 
      if ((this.actor.spriteRenderer.getAnimation()=="Shoot") && (this.actor.spriteRenderer.getAnimationFrameIndex() >=2)){
        this.actor.spriteRenderer.setAnimation("Idle")
      }
    }
   
  }
  
  shoot(){
    this.shouldShoot=true;
    var bullet = Sup.appendScene("Prefab/Bullets/Enemies-1")[0];
    bullet.setPosition(this.actor.getPosition().x,this.actor.getPosition().y,this.actor.getPosition().z-1)
  }
  
  hit(damages:number){
    this.life -= damages;
  }
  
  isOffScreen():boolean{
    var isOffScreen = false;
    var position = this.actor.getPosition();
    if (position.x<-32){
      isOffScreen = true;
    } 
    return isOffScreen;
  }
  
  instantiateExplosions(){
    if (this.framesDead%20 == 0){
      var actorPosX = this.actor.getPosition().x;
      var actorPosY = this.actor.getPosition().y;
      var actorPosZ = this.actor.getPosition().z;
      var width = 3;
      var lowerX = actorPosX-width;
      var higherX = actorPosX+width;
      var lowerY = actorPosY-width;
      var higherY = actorPosY+width;
      
      
      var posX = (Math.random() * (higherX-lowerX)) + lowerX;
      var posY = (Math.random() * (higherY-lowerY)) + lowerY;

      var explosion = Sup.appendScene("Prefab/Fx/Explosion")[0];
      explosion.setPosition(posX,posY,actorPosZ+1)
    }
  }

}
Sup.registerBehavior(NanoBehavior);
