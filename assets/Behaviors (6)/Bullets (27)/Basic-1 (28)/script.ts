class Basic1Behavior extends Sup.Behavior {
  public moveSpeed = 3;
  private framesAlive=0;
  private lifeTime=3*60;
  awake() {
    
  }

  update() {
    this.actor.moveY(this.moveSpeed);
    if (this.framesAlive>this.lifeTime){
      this.actor.destroy();
    }
    this.framesAlive++;
    if (this.isOffScreen){
      this.destruct();
    }
  }
  
  isOffScreen():boolean{
    var isOffScreen = false;
    var position = this.actor.getPosition();
    if (position.x > 32 || position.x<-32 || position.y > 32 || position.y < -32){
      isOffScreen = true;
    } 
    return isOffScreen;
  }
  
  destruct(){
    
  }
}
Sup.registerBehavior(Basic1Behavior);
