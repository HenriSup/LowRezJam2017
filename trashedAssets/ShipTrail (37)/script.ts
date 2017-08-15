class ShipTrailBehavior extends Sup.Behavior {
  private spriteRenderer;
  private framesAlive=0;
  private shipNumber=0;
  private opacity=1;
  
  awake() {
    this.spriteRenderer = this.actor.spriteRenderer;
    
    if (this.shipNumber==0){
      this.spriteRenderer.setSprite("Sprites/Ship/Blu");
    }  
    if (this.shipNumber==1){
      this.spriteRenderer.setSprite("Sprites/Ship/Red");
    }
  }

  update() {
    this.actor.spriteRenderer.setOpacity(0.1);
    this.actor.moveY(-1);
    
  
  
    
    
  }
  
  public setShipNumber(number:number){
    this.shipNumber=number;
  }
}
Sup.registerBehavior(ShipTrailBehavior);
