import {CST} from "../CST";
export class MenuScene extends Phaser.Scene{
    constructor(){
        super({
            key: CST.SCENES.MENU
        })
    }

    init(data){
        console.log(data);
        console.log("I got it!");

    }

    /* only mandatory method for the scene */
    create(){

        //create image (z order)
        this.add.image(this.game.renderer.width / 2., this.game.renderer.height * 0.2, "logo").setDepth(1);
        
        this.add.image(0,0,"title_bg").setOrigin(0).setDepth(0);
       
        let playButton = this.add.image(this.game.renderer.width / 2., this.game.renderer.height / 2., "play_button").setDepth(1);

        let optionsButton = this.add.image(this.game.renderer.width / 2., this.game.renderer.height / 2. + 100, "options_button").setDepth(1);

    }
}