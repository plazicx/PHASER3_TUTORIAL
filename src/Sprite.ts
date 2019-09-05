// to use our sprite class we just switch the factory function with out own
// see PlayScene $%$
export class Sprite extends Phaser.GameObjects.Sprite{
    /**
    *
    */
   constructor(scene: Phaser.Scene, x: number, y: number, texture: string, frame?: string | number){
       super(scene, x, y, texture, frame);
       // we pass them (this) to the scene update list and display list
       // without that - they will not animate or show
       scene.sys.updateList.add(this);
       scene.sys.displayList.add(this);

       this.setScale(2.0);
       this.setOrigin(0,0);
   }
}