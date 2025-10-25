export default class InputManager {
    constructor(scene) {
        this.scene = scene;
        // 矢印キーの入力を監視
        this.cursors = this.scene.input.keyboard.createCursorKeys();
        /**
         * 監視対象のキーオブジェクト群
         */
        this.keys = {};
    }

    /**
     * 監視するキーの追加
     * @param {string} keyName キー名
     * @param {number} keyCode キーコード
     * @returns 追加したキーオブジェクト
     */
    addKey(keyName, keyCode) {
        if (this.keys[keyName]) {
            // すでに追加されている場合はそれを返す
            return this.keys[keyName];
        } else {
            // 新たにキーを追加して返す
            const key = this.scene.input.keyboard.addKey(keyCode);
            this.keys[keyName] = key;
            return key;
        }
    }
}