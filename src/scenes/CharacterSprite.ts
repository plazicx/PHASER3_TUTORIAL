export class CharacterSprite extends Phaser.Physics.Arcade.Sprite{
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
       scene.physics.world.enableBody(this);
       this.setImmovable(true);
       this.hp = 20;
   }
}