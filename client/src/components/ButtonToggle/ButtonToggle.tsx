import Label, { ILabel } from "@components/Label/Label";
import { BaseSyntheticEvent, useState } from "react";
import './ButtonToggle.scss';

interface IButton extends ILabel {
    onClick?: Function;
}

export interface IButtonToggle extends Omit<IButton, 'onClick'> {

}

export interface IButtonToggleBar {
    items: IButtonToggle[];
    onChange?: Function;
}

export interface IToggleCallback<T> {
    event: BaseSyntheticEvent,
    index: number;
    source: T
}


export default ({ items, onChange }: IButtonToggleBar) => {

    const [active, setActive] = useState<number>(0);

    const onButtonClick = ({ event, index, source }: IToggleCallback<IButtonToggle>) => {
        if (onChange) onChange({ event, source });
        setActive(index);
    }

    return (<div className="button-toggle-bar flex f-row gap-m">
        {
            items.map((item, index) =>
                <div
                    key={`toggle${index}${item.text}`}
                    className="button-toggle"
                    data-active={index === active}
                    onClick={event => onButtonClick({ event, index, source: item })}
                    data-size={2}
                >
                    <Label {...item} />
                </div>)
        }
    </div>);
}