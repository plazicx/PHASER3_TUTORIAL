import {CST} from "../CST";
import { MenuScene } from "./MenuScene";
export class LoadScene extends Phaser.Scene{
    constructor(){
        super({
            key: CST.SCENES.LOAD
        })
    }

    init(){

    }

    preload(){
        this.load.image("title_bg","./assets/title_bg.jpg");

        this.load.image("options_button","./assets/options_button.png");

        this.load.image("play_button","./assets/play_button.png");

        this.load.image("logo","./assets/logo.png");

        this.load.spritesheet("cat","./assets/cat.png", {
            frameHeight: 32,
            frameWidth: 32
        });

        this.load.audio("title_music", "./assets/shuinvy-childhood.mp3");

        //create loading bar - think of add - as creates!

        let loadingBar = this.add.graphics({
            fillStyle: {
                color: 0xffffff //white
            }
        })
        /*
        Loader Events: (loader emmits events)
            complete - when done loading everything
            progress - loader number progress in decimal
        */

        this.load.on("progress",(percent)=>{
            loadingBar.fillRect(0, this.game.renderer.height / 2., this.game.renderer.width * percent, 50);
            console.log(percent)
        })



    }

    create(){
        /*this line adds a scene dynamically - so that we can change a line in main.js
        from
        scene:[
        LoadScene, MenuScene
            to
        scene:[
        LoadScene
        since now the LoadScene will be added here dynamically! */
        this.scene.add(CST.SCENES.MENU, MenuScene, false); /* last option is autostart */

        /* this transfers control to the menu scene */
        this.scene.start(CST.SCENES.MENU, "Hello from load scene!");

    }
}