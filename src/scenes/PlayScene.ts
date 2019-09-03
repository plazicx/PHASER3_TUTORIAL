import {CST} from "../CST";
export class PlayScene extends Phaser.Scene{
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
            key: "right",
            frameRate: 10,
            frames: this.anims.generateFrameNumbers("hooded", {
                frames: [143, 144, 145, 146, 147, 148, 149, 150, 151]
            })
        });

        this.anims.create({
            key: "left",
            frameRate: 10,
            frames: this.anims.generateFrameNumbers("anna", {
                frames: [10, 11, 12, 13, 14, 15, 16, 17, 18]
            })
        });

    }

    create(){
       // this.add.sprite(100, 100, "daze", "daze015.png");
       let pimple: Phaser.GameObjects.Sprite = this.add.sprite(100, 100, "daze", "daze015.png");
       pimple.play("dazzle");

       // this would use the whole spritesheet!
       //let mandy: Phaser.GameObjects.Sprite = this.add.sprite(0, 0, "characters", "mandy");

       let anna: Phaser.GameObjects.Sprite = this.add.sprite(400, 400, "anna").setScale(2).play("left");

       let hooded: Phaser.GameObjects.Sprite = this.add.sprite(200, 200, "hooded").setScale(2).play("right");

       // making a sprite global so we can use it in a console (GLOBAL!)
       window.hooded = hooded;
       window.anna = anna;
       // pimple will keep track of animation events
       window.pimple = pimple;

       /*
       gameobject events:
            animationstart
            animationrepeat
            animationupdate
            animationcomplete
        */

        pimple.on("animationupdate", ()=> {
            console.log("ahhhh");
        })

        pimple.on("animationrepeat", ()=> {
            console.log("LEVELUP");
        })



    }
    init(){
        console.log("Play scene init!");

    }
}