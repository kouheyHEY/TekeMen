import ASSETS from "../assets.js";
import ANIMATION from "../animation.js";
import { GAME_CONST_MAP } from "../Const.js";

export default class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, ASSETS.spritesheet.characters.key, 1);

        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.setCollideWorldBounds(true);
        this.setDepth(100);
        this.scene = scene;

        this.isMoving = false;
        this.moveLeft = false;
        this.moveRight = false;
        this.moveUp = false;
        this.moveDown = false;
    }

    /**
     * 毎フレーム更新処理
     * @param {number} delta 前フレームからの経過時間（ms）
     */
    update(delta) {
        if (!this.isMoving) {
            // 停止中は速度を0に設定して終了
            this.setVelocity(0);
            return;
        }

        // 移動中は方向に応じて速度とアニメーションを設定
        if (this.moveLeft) {
            this.setVelocityX(-GAME_CONST_MAP.PLAYER_SPEED);
            this.setVelocityY(0);
            this.anims.play(ANIMATION.player.left.key, true);
        } else if (this.moveRight) {
            this.setVelocityX(GAME_CONST_MAP.PLAYER_SPEED);
            this.setVelocityY(0);
            this.anims.play(ANIMATION.player.right.key, true);
        } else if (this.moveUp) {
            this.setVelocityX(0);
            this.setVelocityY(-GAME_CONST_MAP.PLAYER_SPEED);
            this.anims.play(ANIMATION.player.up.key, true);
        } else if (this.moveDown) {
            this.setVelocityX(0);
            this.setVelocityY(GAME_CONST_MAP.PLAYER_SPEED);
            this.anims.play(ANIMATION.player.down.key, true);
        }
    }

    hit() {
        this.destroy();
    }
}
