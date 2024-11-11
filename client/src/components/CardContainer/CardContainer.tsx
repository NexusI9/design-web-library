import { useEffect, useState } from "react";
import "./CardContainer.scss";
import Card, { ICard } from "@components/Card/Card";
import { API_URL } from "@lib/constant";
import CardSections, { ICardSection } from "./CardSections";


interface ICardContainer {
    type: ICard["type"];
}



export default ({ type }: ICardContainer) => {

    const [sections, setSections] = useState<ICardSection[]>();

    useEffect(() => {

        fetch(`${API_URL}`).then(e => e.json()).then(setSections);

    }, []);

    return (
        <div className="card-wrapper flex f-col gap-l">

            <div className="card-container">
                {sections?.map((item, i) => <CardSections key={`${item.headline}${i}`} {...item} />)}
            </div>

        </div>
    );
}