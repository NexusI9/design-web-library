import "./Sidepanel.scss";
import Logo from "@assets/logo/akacia.svg";
import { ISidepanelItem } from "./SidepanelItem";


export interface ISidepanel {
    items: ISidepanelItem[];

};

export default ({ items }: ISidepanel) => {


    return(
        <nav className='sidepanel border-radius-l color-bg-base-700'>
            <header className="flex f-row f-end-h gap-l padding-h-xl padding-v-xl">
                <Logo/>
                <p>Web Library</p>
            </header>
        </nav>
    );
};