import { ICustomTouch } from "../types/Events";
import { ISceneConfig } from "../types/Scene";

export const touchMovement = (() => {

    let prevTouch: ICustomTouch;

    return (e: TouchEvent, multiplier = 1) => {

        if (!(e as TouchEvent).touches) { return e; }
        
        const touch: ICustomTouch = {
            ...(e as TouchEvent).touches[0],
            movementX: 0,
            movementY: 0
        };

        if (prevTouch) {
            touch.movementX = (touch.pageX - prevTouch.pageX) * multiplier;
            touch.movementY = (touch.pageY - prevTouch.pageY) * multiplier;
        }
        prevTouch = touch;
        return prevTouch;
    };

})();


export const clamp = (min: number, max: number) => {
    return (value: number) => Math.max(Math.min(value, max), min);
};



export const configFromDataSet = (config: ISceneConfig, dataset: HTMLElement['dataset']) => {
    const newConfig: ISceneConfig = {};
    Object.keys(config).forEach(key => newConfig[key] = dataset[key] || config[key]);
    return newConfig;
}
