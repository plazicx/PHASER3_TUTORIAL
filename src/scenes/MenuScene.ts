import {CST} from "../CST";
export class MenuScene extends Phaser.Scene{
    constructor(){
        super({
            key: CST.SCENES.MENU
        })
    }

    /* init(data){
        console.log(data);
        console.log("I got it!");

    }  */

    init(){
        console.log("Menu scene init!")

    }

    /* only mandatory method for the scene */
    create(){
        console.log("menu scene create!")
        //create image (z order)
        
        //this.add.image(this.game.renderer.width / 2., this.game.renderer.height * 0.2, "logo").setDepth(1);
        this.add.image(this.game.renderer.width / 2., this.game.renderer.height * 0.2, CST.IMAGE.LOGO).setDepth(1);

        //this.add.image(0,0,"title_bg").setOrigin(0).setDepth(0);
        this.add.image(0,0,CST.IMAGE.TITLE).setOrigin(0).setDepth(0);

        //let playButton = this.add.image(this.game.renderer.width / 2., this.game.renderer.height / 2., "play_button").setDepth(1);
        let playButton = this.add.image(this.game.renderer.width / 2., this.game.renderer.height / 2., CST.IMAGE.PLAY).setDepth(1);

        //let optionsButton = this.add.image(this.game.renderer.width / 2., this.game.renderer.height / 2. + 100, "options_button").setDepth(1);
        let optionsButton = this.add.image(this.game.renderer.width / 2., this.game.renderer.height / 2. + 100, CST.IMAGE.OPTIONS).setDepth(1);

        // create sprites (if using pixel art, remove sharpen)

//        let hoverSprite = this.add.sprite(100, 100, "cat");
        let hoverSprite: Phaser.GameObjects.Sprite= this.add.sprite(100, 100, CST.SPRITE.CAT);
        hoverSprite.setScale(2.0);
        hoverSprite.setVisible(false);


        // create audio, disable pauseonblur
        //this.sound.pauseOnBlur = false;
        this.sound.play(CST.AUDIO.TITLE, {
            loop:true
        })

        //create animation

        this.anims.create({
            key:"walk",
            frameRate: 4,
            repeat: -1, //repeat forever
            frames: this.anims.generateFrameNumbers(CST.SPRITE.CAT,{
                frames: [0,1,2,3]  // generate by numbers on the sprite sheet
            })
        })

        /*
            PointerEvents:
                pointerover -   hovering
                pointerout  -   not hovering
                pointerup   -   click and release
                pointerdown -   just click
        */

        //set interactivity so that we can listen to events
        playButton.setInteractive();

        playButton.on("pointerover", ()=>{
            console.log("hovahh!");
            hoverSprite.setVisible(true);
            hoverSprite.play("walk");
            hoverSprite.x = playButton.x - playButton.width;
            hoverSprite.y = playButton.y;

        })

        playButton.on("pointerout", ()=>{
            console.log("Outtahere!");
            hoverSprite.setVisible(false);
        })

        playButton.on("pointerup", ()=>{
            console.log("open the gates!")  
            // scene.start -> closes this scene (menu) and goes to game scene
            this.scene.start(); 
        })







        optionsButton.setInteractive();

        optionsButton.on("pointerover", ()=>{
            console.log("hovahh!");
            hoverSprite.setVisible(true);
            hoverSprite.play("walk");
            hoverSprite.x = optionsButton.x - optionsButton.width;
            hoverSprite.y = optionsButton.y;

        })

        optionsButton.on("pointerout", ()=>{
            console.log("Outtahere options!");
            hoverSprite.setVisible(false);
        })

        optionsButton.on("pointerup", ()=>{
            console.log("open the options!");   
            //this.scene.launch();
        })



    }
}