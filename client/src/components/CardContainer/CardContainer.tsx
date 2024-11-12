import { useEffect, useState } from "react";
import "./CardContainer.scss";
import Card, { ICard } from "@components/Card/Card";
import { API_URL } from "@lib/constant";
import CardSections, { ICardSection } from "./CardSections";


interface ICardContainer {
    type: ICard["type"];
}

type Section = { [key:string]: ICard[] };

export default ({ type }: ICardContainer) => {

    const [sections, setSections] = useState<Section>({});

    useEffect(() => {

        fetch(`${API_URL}/resources/category/all`).then(e => e.json()).then(setSections);

    }, []);

    return (
        <div className="card-wrapper flex f-col gap-l">

            <div className="card-container flex f-col gap-5xl">
                {Object.keys(sections)?.map((key, i) => <CardSections key={`${key}${i}`} headline={key} items={sections[key as keyof typeof sections]}  />)}
            </div>

        </div>
    );
}