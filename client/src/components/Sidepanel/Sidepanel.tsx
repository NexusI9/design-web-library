import "./Sidepanel.scss";
import Logo from "@assets/logo/akacia.svg";
import SidepanelItem, { ISidepanelItem } from "./SidepanelItem";


export interface ISidepanel {
    items: ISidepanelItem[];

};

export default ({ items }: ISidepanel) => {

    return(
        <nav className='sidepanel bd-radius-m flex f-col gap-xl padding-h-s padding-v-2xl'>
            <header className="flex f-row f-end-h gap-l padding-h-xl padding-v-xl">
                <Logo/>
                <p>Web Library</p>
            </header>
            <ul className="flex f-col gap-s padding-h-xl">
                { items.map( item => <SidepanelItem {...item} key={`sidepanelitem${item.path}`} />) }
            </ul>
        </nav>
    );
};