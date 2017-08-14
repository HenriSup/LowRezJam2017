class GameManagerBehavior extends Sup.Behavior {
  ship1:ShipBehavior;
  ship2:ShipBehavior;
  awake() {
    this.ship1=Sup.getActor("Player1").getBehavior(ShipBehavior);
    this.ship2=Sup.getActor("Player2").getBehavior(ShipBehavior);
  }

  update() {
    
  }
  
  public getShipByNumber(number:number):ShipBehavior{
    var ship:ShipBehavior	;
    if (number == 0){
      ship = this.ship1;
    }
    if (number == 1) {
      ship = this.ship2;
    }
    return ship;
  }
}
Sup.registerBehavior(GameManagerBehavior);
