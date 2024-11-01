import { createElement } from "react";

export interface ISidepanelItem {
    icon: string;
    label: string;
    path: string;
};

export default ({ icon, label, path }: ISidepanelItem) => {

    return (
        <li className="sidepanel-item flex f-row f-center-h padding-l gap-m cursor-default bd-radius-m">
            {createElement(icon)}<p>{label}</p>
        </li>
    );

};
