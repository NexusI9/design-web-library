interface ITimer {
    duration: number;
    onComplete?: Function | undefined;
    onUpdate?: (arg: ITimerUpdateArgument) => any | undefined;
    loop?: boolean;
    delay?: number;
}


interface ITimerUpdateArgument {
    currentTime: number;
    duration: number;
    completion: number;
}

export class Timer {

    duration: number = 1000;
    onComplete?: Function;
    onUpdate?: (arg: ITimerUpdateArgument) => any;
    loop: boolean = false;
    delay?: number = 0;

    playhead: number = 0.0;
    framerate: number = 10;
    interval: any;
    timeout: any;

    constructor({ duration, onComplete, onUpdate, loop, delay }: ITimer) {
        this.duration = duration;
        this.onComplete = onComplete || this.onComplete;
        this.onUpdate = onUpdate || this.onUpdate;
        this.loop = !!loop;
        this.delay = delay || this.delay;
    }

    reset() {
        clearTimeout(this.timeout);
        clearInterval(this.interval);
        this.playhead = 0.0;
    }

    start() {
        this.reset();
        this.timeout = setTimeout(this.run.bind(this), this.delay);
    }

    run() {
        this.interval = setInterval(() => {
            this.playhead += this.framerate;

            if (this.onUpdate) this.onUpdate({ currentTime: this.playhead, duration: this.duration, completion: this.playhead / this.duration });

            if (this.playhead >= this.duration) {
                this.reset();
                if (this.onComplete) this.onComplete();
                if (this.loop) this.start();
            }

        }, this.framerate);
    }

    stop() {

    }

    getTime() {
        return this.playhead;
    }



}