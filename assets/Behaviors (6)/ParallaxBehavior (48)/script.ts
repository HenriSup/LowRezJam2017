class ParallaxBehavior extends Sup.Behavior {
  
  public parallaxNumber:number=0
  private framesTillMove=1;
  private instantiatingPosition:Sup.Math.Vector2;
  private whereBroShouldBeInstantiated:Sup.Math.Vector2;
  private frameCounter =0;
  private instantiatedBrother=false;
  
  awake() {
    if (this.parallaxNumber==1){
      this.instantiatingPosition=new Sup.Math.Vector2(0,0);
      this.whereBroShouldBeInstantiated=new Sup.Math.Vector2(0,63);
      this.framesTillMove=1;
    } 
    if (this.parallaxNumber==2){
      this.instantiatingPosition=new Sup.Math.Vector2(0,-32);
      this.whereBroShouldBeInstantiated=new Sup.Math.Vector2(0,95);
      this.framesTillMove=3;
    } 
    if (this.parallaxNumber==3){
      this.instantiatingPosition=new Sup.Math.Vector2(0,-64);
      this.whereBroShouldBeInstantiated=new Sup.Math.Vector2(0,127);
      this.framesTillMove=5;
    }  
  }

  update() {
    if ((this.actor.getPosition().y<=this.instantiatingPosition.y)&&!this.instantiatedBrother){
      var brother = Sup.appendScene("Prefab/Parallax/"+this.parallaxNumber)[0];
      brother.setPosition(new Sup.Math.Vector3(this.whereBroShouldBeInstantiated.x,this.whereBroShouldBeInstantiated.y,this.actor.getPosition().z));
      this.instantiatedBrother=true;
    }
    if (this.frameCounter%this.framesTillMove==0){
      this.actor.moveY(-1);
    }
    this.frameCounter++;
  }
  
}
Sup.registerBehavior(ParallaxBehavior);
