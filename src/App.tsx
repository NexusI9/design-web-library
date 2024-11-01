//styles
import { Container } from "@components/Container";
import { Sidepanel } from "@components/Sidepanel";
import { ISidepanelItem } from "@components/Sidepanel/SidepanelItem";
import "@styles/index.scss";

import HomeIcon from '@icons/home.svg';
import LayoutIcon from '@icons/layout.svg';
import GridIcon from '@icons/grid.svg';
import FileIcon from '@icons/file-text.svg';


const pagesMap: ISidepanelItem[] = [
    { icon: HomeIcon, path: '/', label: 'Home' },
    { icon: LayoutIcon, path: '/templates', label: 'Templates' },
    { icon: GridIcon, path: '/modules', label: 'Modules' },
    { icon: FileIcon, path: '/documents', label: 'Documents' },
];

export default () => {
    return (
        <Container>
            <Sidepanel items={pagesMap} />
        </Container>
    );
}