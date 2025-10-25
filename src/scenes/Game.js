/*
 * Asset from: https://kenney.nl/assets/pixel-platformer
 */
import ASSETS from "../assets.js";
import ANIMATION from "../animation.js";
import Player from "../gameObjects/Player.js";
import Enemy from "../gameObjects/Enemy.js";
import Coin from "../gameObjects/Coin.js";
import Bomb from "../gameObjects/Bomb.js";
import {
    GAME_CONST_MAP,
    MAP_CONST_MAP,
    COMMON_CONST_MAP,
    KEY_NAME_MAP,
} from "../Const.js";
import InputManager from "../InputManager.js";

export class Game extends Phaser.Scene {
    constructor() {
        super("Game");
    }

    create() {
        // 入力管理クラスの初期化
        this.inputManager = new InputManager(this);

        // 背景色設定
        this.cameras.main.setBackgroundColor(0x00ff00);

        // UIカメラの作成
        this.uiCamera = this.cameras.add(
            0,
            0,
            COMMON_CONST_MAP.SCREEN_WIDTH,
            COMMON_CONST_MAP.SCREEN_HEIGHT
        );
        // UIレイヤーの設定
        this.uiLayer = this.add.layer();

        // 各種初期化処理
        this.initVariables();
        this.initGameUi();
        this.initAnimations();
        this.initInput();
        this.initGroups();
        this.initPlayer();
        this.initMap();
        this.initPhysics();
    }

    update(time, delta) {
        // スペースキー押下時
        if (this.inputManager.keys[KEY_NAME_MAP.SPACE].isDown) {
            // ゲーム開始処理
            this.startGame();
        }
        // ゲーム開始前は更新処理を行わない
        if (!this.gameStarted) return;

        // プレイヤーの更新
        this.player.update(delta);
        console.log(this.player.x, this.player.y);

        // 入力処理
        if (this.inputManager.cursors.left.isDown) {
            // 左キーが押されている
            this.player.isMoving = true;
            this.player.moveLeft = true;
            this.player.moveRight = false;
            this.player.moveUp = false;
            this.player.moveDown = false;
        } else if (this.inputManager.cursors.right.isDown) {
            // 右キーが押されている
            this.player.isMoving = true;
            this.player.moveLeft = false;
            this.player.moveRight = true;
            this.player.moveUp = false;
            this.player.moveDown = false;
        } else if (this.inputManager.cursors.up.isDown) {
            // 上キーが押されている
            this.player.isMoving = true;
            this.player.moveLeft = false;
            this.player.moveRight = false;
            this.player.moveUp = true;
            this.player.moveDown = false;
        } else if (this.inputManager.cursors.down.isDown) {
            // 下キーが押されている
            this.player.isMoving = true;
            this.player.moveLeft = false;
            this.player.moveRight = false;
            this.player.moveUp = false;
            this.player.moveDown = true;
        } else {
            // キーが押されていない
            this.player.isMoving = false;
        }
    }

    /**
     * 初期変数の設定
     */
    initVariables() {
        this.gameStarted = false;
        this.score = 0;
        this.centreX = this.scale.width * 0.5;
        this.centreY = this.scale.height * 0.5;

        this.playerStart = { x: 0, y: 0 };
    }

    initGameUi() {
        // Create tutorial text
        this.tutorialText = this.add
            .text(
                this.centreX,
                this.centreY,
                "Arrow keys to move!\nPress Spacebar to Start",
                {
                    fontFamily: "Arial Black",
                    fontSize: 42,
                    color: "#ffffff",
                    stroke: "#000000",
                    strokeThickness: 8,
                    align: "center",
                }
            )
            .setOrigin(0.5)
            .setDepth(100);

        // Create score text
        this.scoreText = this.add
            .text(20, 20, "Score: 0", {
                fontFamily: "Arial Black",
                fontSize: 28,
                color: "#ffffff",
                stroke: "#000000",
                strokeThickness: 8,
            })
            .setDepth(100);

        // Create game over text
        this.gameOverText = this.add
            .text(
                this.scale.width * 0.5,
                this.scale.height * 0.5,
                "Game Over",
                {
                    fontFamily: "Arial Black",
                    fontSize: 64,
                    color: "#ffffff",
                    stroke: "#000000",
                    strokeThickness: 8,
                    align: "center",
                }
            )
            .setOrigin(0.5)
            .setDepth(100)
            .setVisible(false);
    }

    /**
     * アニメーションの初期化
     */
    initAnimations() {
        const playerAnimations = ANIMATION.player;
        for (const key in playerAnimations) {
            const animation = playerAnimations[key];

            this.anims.create({
                key: animation.key,
                frames: this.anims.generateFrameNumbers(
                    animation.texture,
                    animation.config
                ),
                frameRate: animation.frameRate,
                repeat: animation.repeat,
            });
        }

        const enemyAnimations = ANIMATION.enemy;
        for (const key in enemyAnimations) {
            const animation = enemyAnimations[key];

            this.anims.create({
                key: animation.key,
                frames: this.anims.generateFrameNumbers(
                    animation.texture,
                    animation.config
                ),
                frameRate: animation.frameRate,
                repeat: animation.repeat,
            });
        }
    }

    initGroups() {
        this.enemyGroup = this.add.group();
        this.itemGroup = this.add.group();
    }

    initPhysics() {
        this.physics.add.overlap(
            this.player,
            this.itemGroup,
            this.collectItem,
            null,
            this
        );
    }

    /**
     * プレイヤーの初期化
     */
    initPlayer() {
        // プレイヤーの生成
        this.player = new Player(this, this.playerStart.x, this.playerStart.y);
    }

    /**
     * 入力の初期化
     */
    initInput() {
        // スペースキーの監視を追加
        this.inputManager.addKey(
            KEY_NAME_MAP.SPACE,
            Phaser.Input.Keyboard.KeyCodes.SPACE
        );
    }

    /**
     * マップの初期化
     */
    initMap() {
        // マップデータ読み込み
        const mapData = this.make.tilemap({ key: MAP_CONST_MAP.MAP_NAME_1 });
        // タイルセットの読み込み
        const tileset_normal_1 = mapData.addTilesetImage(
            ASSETS.spritesheet.tiles_normal_1.key,
            ASSETS.spritesheet.tiles_normal_1.key
        );

        // フィールドレイヤーを作成
        const fieldLayer = mapData.createLayer(
            MAP_CONST_MAP.LAYER_NAME_FIELD,
            tileset_normal_1,
            0,
            0
        );
        this.uiCamera.ignore([fieldLayer]);

        // (オプション) 衝突判定
        fieldLayer.setCollisionByExclusion([-1]);
        this.physics.add.collider(this.player, fieldLayer);

        // // アイテムレイヤーを作成 (JSONのレイヤー名 "Items")
        // const itemsLayer = mapData.getObjectLayer('Items');
        // // アイテムレイヤーからアイテムを生成
        // itemsLayer.objects.forEach((item) => {
        //     if (item.name === 'coin') {
        //         // コインの生成
        //         this.addCoin(item.x, item.y);
        //     } else if (item.name === 'flag') {
        //         // ゴールフラグの生成
        //         const flag = this.physics.add.sprite(item.x, item.y, ASSETS.spritesheet.flag.key);
        //         this.uiCamera.ignore([flag]);
        //         flag.anims.play(ANIMATION.flag.key, true);
        //         flag.body.setAllowGravity(false);
        //         // プレイヤーとフラグの衝突判定
        //         this.physics.add.overlap(this.player, flag, () => {
        //             // フラグ消去
        //             flag.destroy();
        //             // ゲームクリア処理
        //             this.GameClear();
        //         }, null, this);
        //     }
        // });

        // 背景レイヤー
        const bgLayer = mapData.createLayer(
            MAP_CONST_MAP.LAYER_NAME_BACKGROUND,
            tileset_normal_1,
            0,
            0
        );
        bgLayer.setDepth(-100);
        this.uiCamera.ignore([bgLayer]);

        // マップの幅と高さを取得
        const mapWidth = mapData.widthInPixels;
        const mapHeight = mapData.heightInPixels;
        // ワールドの境界をマップのサイズに設定
        this.physics.world.setBounds(0, 0, mapWidth, mapHeight);
        this.cameras.main.setBounds(0, 0, mapWidth, mapHeight);

        // プレイヤーの初期位置設定
        this.player.setPosition(
            MAP_CONST_MAP.TILE_SIZE * 2,
            MAP_CONST_MAP.TILE_SIZE * 2
        );
    }

    /**
     * ゲーム開始処理
     */
    startGame() {
        this.gameStarted = true;
        this.tutorialText.setVisible(false);
    }

    addEnemy() {
        // spawn enemy every 3 seconds
        if (this.spawnCounterEnemy-- > 0) return;
        this.spawnCounterEnemy = this.spawnRateEnemy;

        const enemy = new Enemy(this, this.enemyStart.x, this.enemyStart.y);
        this.enemyGroup.add(enemy);
    }

    addCoin(x, y) {
        this.itemGroup.add(new Coin(this, x, y));
    }

    removeItem(item) {
        this.itemGroup.remove(item, true, true);

        // check if all items have been collected
        if (this.itemGroup.getChildren().length === 0) {
            this.GameOver();
        }
    }

    addBomb(x, y) {
        this.itemGroup.add(new Bomb(this, x, y));
    }

    destroyEnemies() {
        this.updateScore(100 * this.enemyGroup.getChildren().length);
        this.enemyGroup.clear(true, true);
    }

    hitPlayer(player, obstacle) {
        player.hit();

        this.GameOver();
    }

    collectItem(player, item) {
        item.collect();
    }

    updateScore(points) {
        this.score += points;
        this.scoreText.setText(`Score: ${this.score}`);
    }

    getTileAt(x, y) {
        const tile = this.levelLayer.getTileAtWorldXY(x, y, true);
        return tile ? this.tileIds.walls.indexOf(tile.index) : -1;
    }

    GameOver() {
        this.gameStarted = false;
        this.gameOverText.setVisible(true);
    }
}
