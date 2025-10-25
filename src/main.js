import { Boot } from "./scenes/Boot.js";
import { Preloader } from "./scenes/Preloader.js";
import { Game } from "./scenes/Game.js";
import { GameOver } from "./scenes/GameOver.js";
import { COMMON_CONST_MAP } from "./Const.js";

//  Find out more information about the Game Config at:
//  https://newdocs.phaser.io/docs/3.70.0/Phaser.Types.Core.GameConfig
const config = {
    type: Phaser.AUTO,
    width: COMMON_CONST_MAP.SCREEN_WIDTH,
    height: COMMON_CONST_MAP.SCREEN_HEIGHT,
    parent: "game-container",
    backgroundColor: "#2d3436",
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    physics: {
        default: "arcade",
        arcade: {
            debug: true,
            gravity: { y: 0 },
        },
    },
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    scene: [Boot, Preloader, Game, GameOver],
};

new Phaser.Game(config);
