import { CardContainer } from "@components/CardContainer";
import "./Resources.scss"
import { ICard } from "@components/Card/Card";

export interface IResources {
    filter?: boolean;
    header?: {
        title?: string;
        subtitle?: string;
        picture?: string;
    }
    type: ICard["type"];
}

export default ({ header, type, filter }: IResources) => {

    return (<div className="flex f-col gap-4xl">
        {header && <header className="resources-header full-width flex f-col round" data-picture={!!header?.picture}>
            {header?.picture && <div className="resources-header-visual">
                <img src={header?.picture} />
            </div>}
            {header?.title && <h1 className="heading-4">{header.title}</h1>}
            {header?.subtitle && <h2 className="heading-5">{header.subtitle}</h2>}
        </header>}

        <CardContainer type={type} filter={filter} />
    </div>);
}
