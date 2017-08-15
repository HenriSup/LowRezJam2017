class Basic1Behavior extends Sup.Behavior {
  
  private framesAlive=0;
  private lifeTime=3*60;
  awake() {
    
  }

  update() {
    this.actor.moveY(3);
    if (this.framesAlive>this.lifeTime){
      this.actor.destroy();
    }
    this.framesAlive++;
  }
}
Sup.registerBehavior(Basic1Behavior);
