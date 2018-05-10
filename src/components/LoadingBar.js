/**
 * A multipurpose loading bar that can be added to any scene.
 * TODO: Less hardcoding of x, y, w, h values of the actual progressBar. Set it up as a group/use another image and mask it in/out.
 */
export default class LoadingBar {
    x = 0;
    y = 0;
    parentScene = null;

    constructor(parentScene, x = 400, y = 400) {
        this.x = x;
        this.y = y;
        this.parentScene = parentScene;
        this.loaderBg = parentScene.add.image(x, y, 'loading-bg');
        this.loaderBg.setOrigin(0.5, 0.5);
        this.progressBar = parentScene.add.graphics();
        const text = parentScene.add.text(x, y - 40, 'Loading...', {
            font: '16px Arial',
            fill: '#eeeeee',
            align: 'center',
        });
        text.setOrigin(0.5, 0.5);

        parentScene.load.on('progress', this.updateProgressBar, this);
    }

    updateProgressBar(progress) {
        if (this.progressBar) {
            this.progressBar.clear();
            this.progressBar.fillStyle(0xcccccc, 1);
            this.progressBar.fillRect(this.x - 145, this.y - 10, 290 * progress, 20);
        }
    }

    destroy() {
        if (this.loaderBg) this.loaderBg.destroy();
        if (this.progressBar) this.progressBar.destroy();
        if (this.text) this.text.destroy();
    }
}
