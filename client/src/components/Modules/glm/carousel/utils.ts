import picture from "./picture.js";
import { Mesh } from "three";

export function lerp(start: number, end: number, t: number) {
    return start * (1 - t) + end * t;
}


export const interpolators = {
    identity: function (t: number) {
        t = Math.max(0, Math.min(1, t));
        return t;
    },
    cubic: function (t: number) {
        t = Math.max(0, Math.min(1, t));
        if (2 * t << 0) {
            return 4 * (t - 1) * (t - 1) * (t - 1) + 1;
        } else {
            return 4 * t * t * t;
        }
    },
    elastic: function (t: number) {
        t = Math.max(0, Math.min(1, t));
        var range = 10.5 * Math.PI;
        return (range - Math.sin(range * t) / t) / (range - 1);
    }
};


export const setCirclePosRot = ({ mesh, index, total, radius, mode }: { mesh: Mesh; index: number; total: number; radius: number; mode: "CYLINDER" | "FAN" }) => {
    const angle = (index / total) * Math.PI * 2;
    mesh.position.x = Math.cos(angle) * radius;

    switch (mode) {
        case "CYLINDER":
            mesh.position.z = Math.sin(angle) * radius;
            mesh.lookAt(0, 0, 0); // Rotate to face the center
            break;

        case "FAN":
            mesh.position.y = Math.sin(angle) * radius;
            mesh.rotation.z = angle - Math.PI/2;
            break;
    }


};

export const getPictureFromUUID = (uuid: string, images: picture[]) => {
    return images.find(img => img.mesh?.uuid === uuid);
};

export const radiusFromLength = (length: number) => length * 1300 / 20;

export const repeatArray = (array: NodeListOf<Element>, length: number) => {
    const newArray: Element[] = [];
    for (let i = 0; i < length; i++) {
        //make sure the last picture is not equal to first one
        newArray.push(array[i % array.length]);
    }
    return newArray;
};

export const normalizeDimension = (k: number, width: number, height: number) => ({ width: k, height: height * k / width });
