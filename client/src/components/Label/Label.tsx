import { createElement } from 'react';
import './Label.scss';

export interface ILabel {
    size: 1 | 2 | 3;
    leftIcon?: string;
    rightIcon?: string;
    text: string;
}

export default (props: ILabel) => (
    <p className={`label label-${props.size} flex f-row f-center-h gap-m`} data-size={props.size}>
        {props.leftIcon && createElement(props.leftIcon)}
        {props.text}
        {props.rightIcon && createElement(props.rightIcon)}
    </p>
);