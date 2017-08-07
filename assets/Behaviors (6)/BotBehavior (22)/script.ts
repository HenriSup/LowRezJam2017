class BotBehavior extends Sup.Behavior {
  
  private cannonBodyBody:CANNON.Body;
  private cannonBodyHands:CANNON.Body;
  private driverControleScheme;
  private shooterControleScheme;
  private maxSpeedBody=50;
  private maxSpeedHand=50;
  private moveSpeedHands=50;
  private moveSpeedBody=50;
  private moveBuffer:Sup.Math.Vector2;
  private driverPlayerNumber=0;
  private shooterPlayerNumber=1;
  
  awake() {
    this.cannonBodyBody = this.actor.cannonBody.body;
    this.cannonBodyHands = this.actor.getChild("Hands").cannonBody.body;
    this.moveBuffer = new Sup.Math.Vector2(0,0);
  }

  update() {
    //0 = croix
    //1 = rond
    //2 = carré
    //3 = triangle
    //4 = L1
    //5 = R1
    //6 = L2
    //7 = R2
    //8 = select
    //9 = start
    //10 = L3
    //11 = R3
    //12 = up
    //13 = down
    //14 = left
    //15 = right
    if (this.driverPlayerNumber==0 && this.shooterPlayerNumber==1){
      this.driverControleScheme = {left:'Q',right:'D',up:'Z',down:'S',punch:'V',jump:'B',dash:'N',
      left2:'A',right2:'D',up2:'W',down2:'S',punch2:'V',jump2:'B',dash2:'N'};
    
      this.shooterControleScheme = {left:'LEFT',right:'RIGHT',up:'UP',down:'DOWN',punch:'I',jump:'O',dash:'P',
      left2:'LEFT',right2:'RIGHT',up2:'UP',down2:'DOWN',punch2:'NUMPAD1',jump2:'NUMPAD2',dash2:'NUMPAD3'};
    }
    if (this.driverPlayerNumber==1 && this.shooterPlayerNumber==0){
      this.driverControleScheme = {left:'LEFT',right:'RIGHT',up:'UP',down:'DOWN',punch:'I',jump:'O',dash:'P',
      left2:'LEFT',right2:'RIGHT',up2:'UP',down2:'DOWN',punch2:'NUMPAD1',jump2:'NUMPAD2',dash2:'NUMPAD3'};
    
      this.shooterControleScheme = {left:'Q',right:'D',up:'Z',down:'S',punch:'V',jump:'B',dash:'N',
      left2:'A',right2:'D',up2:'W',down2:'S',punch2:'V',jump2:'B',dash2:'N'};
    }
  
  
    
    var upIsDownDriver = Sup.Input.getGamepadButtonValue(this.driverPlayerNumber,12) || Sup.Input.isKeyDown(this.driverControleScheme.up);
    var downIsDownDriver = Sup.Input.getGamepadButtonValue(this.driverPlayerNumber,13) || Sup.Input.isKeyDown(this.driverControleScheme.down);
    var leftIsDownDriver = Sup.Input.getGamepadButtonValue(this.driverPlayerNumber,14) || Sup.Input.isKeyDown(this.driverControleScheme.left);
    var rightIsDownDriver = Sup.Input.getGamepadButtonValue(this.driverPlayerNumber,15) || Sup.Input.isKeyDown(this.driverControleScheme.right);
    var upIsDownShooter = Sup.Input.getGamepadButtonValue(this.shooterPlayerNumber,12) || Sup.Input.isKeyDown(this.shooterControleScheme.up);
    var downIsDownShooter = Sup.Input.getGamepadButtonValue(this.shooterPlayerNumber,13) || Sup.Input.isKeyDown(this.shooterControleScheme.down);
    var leftIsDownShooter = Sup.Input.getGamepadButtonValue(this.shooterPlayerNumber,14) || Sup.Input.isKeyDown(this.shooterControleScheme.left);
    var rightIsDownShooter = Sup.Input.getGamepadButtonValue(this.shooterPlayerNumber,15) || Sup.Input.isKeyDown(this.shooterControleScheme.right);
    
   
    
    var multiplicatorDriver = 0.707;
    var multiplicatorShooter = 0.707;
    
    
    var xPadDriver=0;
    var yPadDriver=0;
    var xPadShooter=0;
    var yPadShooter=0;
    
    if (upIsDownDriver){
      yPadDriver+=1
    }
    if (downIsDownDriver){
      yPadDriver-=1
    }
    if (leftIsDownDriver){
      xPadDriver-=1
    }
    if (rightIsDownDriver){
      xPadDriver+=1
    }  
    if (upIsDownShooter){
      yPadShooter+=1
    }
    if (downIsDownShooter){
      yPadShooter-=1
    }
    if (leftIsDownShooter){
      xPadShooter-=1
    }
    if (rightIsDownShooter){
      xPadShooter+=1
    }
    //var angle= Sup.Math.toDegrees(Math.atan2(xPad,yPad));
    
    this.cannonBodyBody.linearDamping=0.19;
    this.cannonBodyHands.linearDamping=0.19;
    
     // if (xPad!=0 && yPad!=0){
     //   multiplicator=0.707;
     // }

    
    this.cannonBodyBody.velocity=new CANNON.Vec3((xPadDriver*this.moveSpeedBody),(yPadDriver*this.moveSpeedBody),0);
    this.cannonBodyHands.velocity=new CANNON.Vec3((xPadShooter*this.moveSpeedHands),(yPadShooter*this.moveSpeedHands),0);
    //Sup.log(this.cannonBodyHands);
    
    //this.moveBuffer = new Sup.Math.Vector2(this.actor.cannonBody.body.position.x%1,this.actor.cannonBody.body.position.y%1)
    
    // Si 
    if(this.cannonBodyHands.position.x > this.cannonBodyBody.position.x+5){
      this.cannonBodyHands.position.x = this.cannonBodyBody.position.x+5;
    }
    if(this.cannonBodyHands.position.x < this.cannonBodyBody.position.x-5){
      this.cannonBodyHands.position.x = this.cannonBodyBody.position.x-5;
    }
    if(this.cannonBodyHands.position.y > this.cannonBodyBody.position.y+12){
      this.cannonBodyHands.position.y = this.cannonBodyBody.position.y+12;
    }
    if(this.cannonBodyHands.position.y < this.cannonBodyBody.position.y-3){
      this.cannonBodyHands.position.y = this.cannonBodyBody.position.y-3;
    }
   

    this.cannonBodyBody.position.x=Math.round(this.cannonBodyBody.position.x);
    this.cannonBodyBody.position.y=Math.round(this.cannonBodyBody.position.y);
    this.cannonBodyHands.position.x=Math.round(this.cannonBodyHands.position.x);
    this.cannonBodyHands.position.y=Math.round(this.cannonBodyHands.position.y);
      
    Sup.log(this.cannonBodyHands.position)
 
  }
}
Sup.registerBehavior(BotBehavior);
