import {CST} from "../CST";
export class PlayScene extends Phaser.Scene{
    // these are declarations as far as I understnad in order to get better suggestions
    // from the TypeScript
    //anna!: Phaser.GameObjects.Sprite;
    //hooded!: Phaser.GameObjects.Sprite;
    anna!: Phaser.Physics.Arcade.Sprite;
    hooded!: Phaser.Physics.Arcade.Sprite;
    keyboard!: {[index: string] : Phaser.Input.Keyboard.Key}
    assassins!: Phaser.Physics.Arcade.Group;
    fireAttacks!: Phaser.Physics.Arcade.Group;
    constructor(){
        super({
            key: CST.SCENES.PLAY
        })
    }

    /* init(data){
        console.log(data);
        console.log("I got it!");

    }  */

    preload(){
        this.anims.create({
            key:"dazzle",
            frameRate: 10,
            frames: this.anims.generateFrameNames("daze",{
                prefix: "daze0",
                suffix: ".png",
                start: 0,
                end: 41
                // frames: [0, 1, 2, 3, 4, 5]

            }), 
            repeat: -1,
        });
        
        this.textures.addSpriteSheetFromAtlas("hooded",{frameHeight: 64, frameWidth: 64, atlas: "characters", frame: "hooded"});
        this.textures.addSpriteSheetFromAtlas("mandy",{frameHeight: 64, frameWidth: 64, atlas: "characters", frame: "mandy"});

        console.log(this.textures.list);

        this.anims.create({
            key: "right_hooded",
            frameRate: 10,
            frames: this.anims.generateFrameNumbers("hooded", {
                frames: [143, 144, 145, 146, 147, 148, 149, 150, 151]
            })
        });

        this.anims.create({
            key: "left",
            frameRate: 10,
            frames: this.anims.generateFrameNumbers("anna", {
                //frames: [10, 11, 12, 13, 14, 15, 16, 17, 18]
                start: 9,
                end: 17
            })
        });

        this.anims.create({
            key: "down",
            frameRate: 10,
            frames: this.anims.generateFrameNumbers("anna", {
                //frames: [10, 11, 12, 13, 14, 15, 16, 17, 18]
                start: 18,
                end: 26
            })
        });

        this.anims.create({
            key: "up",
            frameRate: 10,
            frames: this.anims.generateFrameNumbers("anna", {
                //frames: [10, 11, 12, 13, 14, 15, 16, 17, 18]
                start: 0,
                end: 8
            })
        });

        this.anims.create({
            key: "right",
            frameRate: 10,
            frames: this.anims.generateFrameNumbers("anna", {
                //frames: [10, 11, 12, 13, 14, 15, 16, 17, 18]
                start: 27,
                end: 35
            })
        });




        this.anims.create({
            key: "blaze",
            duration: 50,
            frames: this.anims.generateFrameNames("daze", {
                prefix: "fire0",
                suffix: ".png",
                end: 55
            }),
            showOnStart: true,
            hideOnComplete: true
        });

    }

    create(){
       // this.add.sprite(100, 100, "daze", "daze015.png");
       let pimple: Phaser.GameObjects.Sprite = this.add.sprite(100, 100, "daze", "daze015.png");
       pimple.play("dazzle");

       // this would use the whole spritesheet!
       //let mandy: Phaser.GameObjects.Sprite = this.add.sprite(0, 0, "characters", "mandy");

       /* before we had this with let!!!!!
       let anna: Phaser.GameObjects.Sprite = this.add.sprite(400, 400, "anna").setScale(2);

       let hooded: Phaser.GameObjects.Sprite = this.add.sprite(200, 200, "hooded").setScale(2).play("right");
        
       */
       // now we have this.anna and this.hooded - previously with let anna - later this.anna.x did not work!
       
       //this.anna = this.add.sprite(400, 400, "anna").setScale(2);
       this.anna = this.physics.add.sprite(400, 400, "anna").setScale(2);
       //this.hooded = this.add.sprite(200, 200, "hooded").setScale(2).play("right_hooded");
       //this.hooded = this.add.sprite(200, 200, "hooded").setScale(2);
       this.hooded = this.physics.add.sprite(200, 200, "hooded").setScale(2).setImmovable(true); //this is only movement due to collision!

       //this.physics.add.existing() additng physics to the already existing sprite

       this.assassins = this.physics.add.group({immovable: true});
       this.assassins.add(this.hooded);

       this.fireAttacks = this.physics.add.group({immovable: true});

        



       // making a sprite global so we can use it in a console (GLOBAL!)
      // window.hooded = this.hooded;
      // window.anna = this.anna;
       // pimple will keep track of animation events
     //  window.pimple = pimple;

       /*
       gameobject events:
            animationstart
            animationrepeat
            animationupdate
            animationcomplete
        */

        /*pimple.on("animationupdate", ()=> {
            console.log("ahhhh");
        })

        pimple.on("animationrepeat", ()=> {
            console.log("LEVELUP");
        })
        */

        //set smaller hitbox
        this.anna.setSize(40,50).setOffset(10,10);
        this.anna.setCollideWorldBounds(true);

        this.keyboard = this.input.keyboard.addKeys("W, A, S, D");

        this.input.on("pointermove", (pointer: Phaser.Input.Pointer)=>{
            if(pointer.isDown){ //is clicking
                let fire=this.add.sprite(pointer.x, pointer.y, "daze", "fire00.png").play("blaze");
                this.fireAttacks.add(fire);
                fire.on("animationcomplete", ()=>{
                    fire.destroy();
                })
            }
        })

        //this.physics.world.addCollider(this.anna,this.hooded, (anna:Phaser.Physics.Arcade.Sprite, hooded:Phaser.Physics.Arcade.Sprite)=>{
       
        this.physics.world.addCollider(this.anna, this.assassins, (anna:Phaser.Physics.Arcade.Sprite, assassins:Phaser.Physics.Arcade.Sprite)=>{
            anna.destroy();
            assassins.destroy();
        });
        
        // so collider is a bit strange detector - if the objects overlap in the moment of creation! - it will not be reported as collision!!!!!
        this.physics.world.addCollider(this.fireAttacks, this.assassins, (fireAttacks:Phaser.Physics.Arcade.Sprite, assassins:Phaser.Physics.Arcade.Sprite)=>{
            fireAttacks.destroy();
            assassins.destroy();

            let x = 0;
            let y = 0;
            switch (Phaser.Math.Between(0, 1)){
                case 0: x = Phaser.Math.Between(0, this.game.renderer.width);
                    break;
                case 1: y = Phaser.Math.Between(0, this.game.renderer.height);
            }

            for (let i = 0; i<2; i++ ) { //spwan 2 for every killed one
                this.assassins.add(this.physics.add.sprite(x, y, "hooded", 26).setScale(2).setImmovable(true));
            }
        });

       
        

    }

    update(time: number, delta: number) {// delta 16.666 @ 60 FPS 

        //this.physics.world.collide(this.anna, this.hooded, ()=>{});
        // now collide with callback!
        /* this is moved up into create to addCollider - which should optimize it - see $$$
        this.physics.world.collide(this.anna, this.hooded, (anna:Phaser.Physics.Arcade.Sprite, hooded:Phaser.Physics.Arcade.Sprite)=>{
            anna.destroy();
            hooded.destroy();
        });
        */

        
        // we need to check if anna is alive! othewise if she is destroyed before this calls for 
        // movement - we will get program to crash
        if (this.anna.active === true) {

                for(let i=0; i < this.assassins.getChildren().length; i++) {
                    this.physics.accelerateToObject(this.assassins.getChildren()[i], this.anna);
                }
                //this.physics.accelerateToObject(this.hooded, this.anna); // one object accelerates to the other

                if(this.keyboard.D.isDown === true){
                    console.log("D pressed");

                    //this.anna.x = this.anna.x + 64 * (delta/1000.);
                    // after adding physics we can use velocity
                    this.anna.setVelocityX(128);
                    this.anna.play("right", true);
                }
            
                if(this.keyboard.A.isDown === true){
                    //console.log("A pressed", this.anna.x);
                    //this.anna.x = this.anna.x - 64 * (delta/1000.);
                    this.anna.setVelocityX(-128);
                    //this.anna.anims.playReverse("left", true);
                }

                if(this.keyboard.A.isUp && this.keyboard.D.isUp){ //not moving on the X axis
                    this.anna.setVelocityX(0);
                }



                if(this.keyboard.W.isDown === true){
                    this.anna.setVelocityY(-128);
                    //this.anna.play("down", true);
                }
            
                if(this.keyboard.S.isDown === true){
                    this.anna.setVelocityY(128);
                    //this.anna.anims.play("up", true);
                }

                if(this.keyboard.S.isUp && this.keyboard.W.isUp){ //not moving on the X axis
                    this.anna.setVelocityY(0);
                }

                if(this.anna.body.velocity.x > 0) { //moving right
                    this.anna.play("right",true);    
                }
                if(this.anna.body.velocity.x < 0) { //moving left
                    this.anna.anims.playReverse("left",true);    
                }
                if(this.anna.body.velocity.y < 0) { //moving up
                    this.anna.play("up",true);    
                }
                if(this.anna.body.velocity.y > 0) { //moving down
                    this.anna.play("down",true);    
                }


            }        

    }



    init(){
        console.log("Play scene init!");

    }
}