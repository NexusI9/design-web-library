import { Link, Route, RouteComponent, createRoute } from "@tanstack/react-router";
import { createElement } from "react";

export interface ISidepanelItem{
    icon: string;
    label: string;
    path:string;
};

export default ({ icon, label, path }: ISidepanelItem) => {

    return (
        <li className="sidepanel-item cursor-default bd-radius-m">
            <Link to={path} className="flex f-row f-center-h gap-m  padding-l">{createElement(icon)}{label}</Link>
        </li>
    );

};
