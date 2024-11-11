import { Link, Route, RouteComponent, createRoute } from "@tanstack/react-router";
import { createElement } from "react";

export interface ISidepanelItem{
    icon: string;
    label: string;
    path:string;
    component: (props:any) => JSX.Element;
};

export default ({ icon, label, path }: ISidepanelItem) => {

    return (
        <li className="sidepanel-item flex f-row f-center-h padding-l gap-m cursor-default bd-radius-m">
            {createElement(icon)}<Link to={path}>{label}</Link>
        </li>
    );

};
