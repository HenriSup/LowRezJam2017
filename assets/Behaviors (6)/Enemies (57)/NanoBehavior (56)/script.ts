class NanoBehavior extends Sup.Behavior {
  
  private framesAlive=0;
  private lifeTime=20*60;
  private hitBoxToken:Sup.ArcadePhysics2D.Body;
  private gameManager:GameManagerBehavior;
  private ship1:ShipBehavior;
  private ship2:ShipBehavior;
  private isDead=false;
  private shouldShoot =false;
  private shotDamages = 1;
  private damagesDoneWhenCollide = 1;
  private damagesTakenWhenCollide = 3;
  private lastFrameHit =-10;
  private invulerabilityFrame = 10;
  private life = 3;
  private shouldGoRight = true;
  private initialPos:Sup.Math.Vector3;
  private horizontalMaxMovement = 10;
  
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
      this.isDead=true;
    }
    var bufferY =0
    
    if (this.framesAlive%10==0){
      bufferY=-1;
    }
    
    if (this.framesAlive%30==0){
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
    
    if (!this.isDead){
      this.actor.moveX(bufferX);
      this.actor.moveY(bufferY);
    }
    
    
    var actualPos = this.actor.getPosition();
    this.actor.setPosition(new Sup.Math.Vector3 (Math.round(actualPos.x),actualPos.y,actualPos.z))
    if (this.framesAlive>this.lifeTime){
      this.actor.destroy();
    }
    this.moveHitBox();
    if (!this.isDead){
      this.checkCollision();
    }
    this.framesAlive++;
    this.animate(this.shouldShoot);
  }
  
  moveHitBox(){
    this.hitBoxToken.warpPosition(this.actor.getPosition().x,this.actor.getPosition().y);
  }
  
  checkCollision(){
    //collides with player 1
    if (!this.isDead && (this.lastFrameHit+this.invulerabilityFrame>this.framesAlive)){
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
    if (shoot){
      this.actor.spriteRenderer.setAnimation("Shoot")
      this.shouldShoot=false;
    } 
    if ((this.actor.spriteRenderer.getAnimation()=="Shoot") && (this.actor.spriteRenderer.getAnimationFrameIndex() >=2)){
      this.actor.spriteRenderer.setAnimation("Idle")
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
}
Sup.registerBehavior(NanoBehavior);
