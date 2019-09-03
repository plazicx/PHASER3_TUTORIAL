import {CST} from "../CST";
// we are not using MenuScene from here any longer - added some load later see $$
//import { MenuScene } from "./MenuScene"; - 
export class LoadScene extends Phaser.Scene{
    constructor(){
        super({
            key: CST.SCENES.LOAD
        })
    }

    init(){

    }

    loadImages(){
        //looping through constant CST objects!
        this.load.setPath("./assets/image");
        console.log("load Images");
        for(let prop in CST.IMAGE){
            // the key to the object is the same as the path in the constants
            // TS is gonna complain because CST.IMAGE will not have defined type
            //@ts-ignore
            this.load.image(CST.IMAGE[prop],CST.IMAGE[prop]);
        }
    }

    loadAudio(){
        //looping through constant CST objects!
        this.load.setPath("./assets/audio");
        console.log("load Audio");
        for(let prop in CST.AUDIO){
            // the key to the object is the same as the path in the constants
            // TS is gonna complain because CST.IMAGE will not have defined type
            //@ts-ignore
            this.load.audio(CST.AUDIO[prop],CST.AUDIO[prop]);
        }
    }

    // with ? added below - thype can be of type undefined!
    //@ts-ignore
    loadSprites(frameConfig?: Phaser.Loader.FileTypes.ImageFrameConfig){
    //loadSprites(frameConfig){
        //looping through constant CST objects!
        console.log("load sprites");
        this.load.setPath("./assets/sprite");
        for(let prop in CST.SPRITE){
            //@ts-ignore
            // the key to the object is the same as the path in the constants
            // TS is gonna complain because CST.IMAGE will not have defined type
            this.load.spritesheet(CST.SPRITE[prop],CST.SPRITE[prop],frameConfig);
        }
    }



    preload(){

        this.load.spritesheet("anna","./assets/sprite/anna.png", {frameHeight: 64, frameWidth: 64});
        //load atlases
        this.load.atlas("characters","./assets/sprite/characters.png", "./assets/sprite/characters.json");
        this.load.atlas("daze","./assets/sprite/daze.png", "./assets/sprite/daze.json");

        this.loadImages();
        /*this.load.image("title_bg","./assets/image/title_bg.jpg");
        this.load.image("options_button","./assets/image/options_button.png");
        this.load.image("play_button","./assets/image/play_button.png");
        this.load.image("logo","./assets/image/logo.png");
        */

        this.loadSprites({
            frameHeight: 32,
            frameWidth:32
        });
       
        /* this.load.spritesheet("cat","./assets/sprite/cat.png", {
            frameHeight: 32,
            frameWidth: 32
        });
        */

        this.loadAudio();
        //this.load.audio("title_music", "./assets/audio/shuinvy-childhood.mp3");

        //create loading bar - think of add - as creates!

        let loadingBar = this.add.graphics({
            fillStyle: {
                color: 0xffffff //white
            }
        })

        console.log("loading bar");
        /*
        Loader Events: (loader emmits events)
            complete - when done loading everything
            progress - loader number progress in decimal
        */

        for(let i=0; i < 3; i++) {
            this.load.spritesheet("cat" + i,"./assets/cat.png", {
                frameHeight: 32,
                frameWidth: 32
            });
        }

        console.log("Loaded cat 3 times");

        // percent would get underlined here if we don't define the type - number (TS)
        this.load.on("progress",(percent:number)=>{
            loadingBar.fillRect(0, this.game.renderer.height / 2., this.game.renderer.width * percent, 50);
            //console.log(percent)
        })
        console.log("on complete");

        /* this.load.on("complete", ()=>{
            console.log("done")
        })
        */

        // this should be some example of typescript doing something - vid 04@3:55
        this.load.on("load", (file: Phaser.Loader.File) => {
            console.log(file.src, "Loading this")
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

        //$$
        //this.scene.add(CST.SCENES.MENU, MenuScene, false); /* last option is autostart */

        /* this transfers control to the menu scene */
        // here we need to pass an object so typescript was underlinign the Hello from....
        //this.scene.start(CST.SCENES.MENU, "Hello from load scene!");
        console.log("now the menu scene should start!");
        this.scene.start(CST.SCENES.MENU);

    }
}