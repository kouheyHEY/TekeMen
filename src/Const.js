/**
 * ゲームシーン用の定数
 */
export const GAME_CONST_MAP = {
    /** ジャンプ力 */
    JUMP_VELOCITY: -800,
    /** 最大移動スピード */
    PLAYER_SPEED: 360,
    /** 加速度 */
    PLAYER_ACCELERATION: 3600,
    /** コインの生成間隔 */
    COIN_DISTANCE_MAX: 200,
    /** カメラのオフセット切り替え時の速度 */
    CAMERA_OFFSET_LERP: 0.05,
    /** 重力設定 */
    GRAVITY_Y: 1600,
    /** 「超加速」の初期継続時間 */
    SUPER_SPEED_DURATION_INITIAL: 1000,
    /** 「超加速」のカメラの注目倍率 */
    SUPER_SPEED_CAMERA_LERP: 1.05,
    /** 「超加速」のカメラの注目速度 */
    SUPER_SPEED_CAMERA_FOCUS_TIME: 200,
    /** 「超加速」のカメラシェイクの激しさ */
    SUPER_SPEED_CAMERA_SHAKE_INTENSITY: 0.0025,
};

/**
 * アセット用の定数
 */
export const ASSETS_CONST_MAP = {
    /** 画像アセットのキー */
    IMAGE_KEY: 'image',
    /** スプライトシートアセットのキー */
    SPRITESHEET_KEY: 'spritesheet',
    /** コイン */
    COIN_KEY: 'coin',
    /** コインの幅 */
    COIN_FRAME_WIDTH: 36,
    /** コインの高さ */
    COIN_FRAME_HEIGHT: 36,
};

/**
 * 共通定数
 */
export const COMMON_CONST_MAP = {
    /** 画面の幅 */
    SCREEN_WIDTH: 1280,
    /** 画面の高さ */
    SCREEN_HEIGHT: 720,
};

/** キー名定数 */
export const KEY_NAME_MAP = {
    /** スペースキー */
    SPACE: 'space',
    /** Zキー */
    Z: 'z',
    /** Xキー */
    X: 'x',
    /** Cキー */
    C: 'c',
};