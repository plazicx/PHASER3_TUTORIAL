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