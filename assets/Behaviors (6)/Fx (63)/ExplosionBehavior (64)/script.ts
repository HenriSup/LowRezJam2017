class ExplosionBehavior extends Sup.Behavior {
  
  private framesAlive=0;
  
  awake() {
    this.actor.spriteRenderer.setAnimation("Explosion",false)
  }

  update() {
    if (this.actor.spriteRenderer.getAnimationFrameIndex()>=7){
      this.actor.destroy();
    }  
  }
}
Sup.registerBehavior(ExplosionBehavior);
