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
  }
}
Sup.registerBehavior(Basic1Behavior);
