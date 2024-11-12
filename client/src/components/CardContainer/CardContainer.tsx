import { BaseSyntheticEvent, useEffect, useState } from "react";
import "./CardContainer.scss";
import Card, { ICard } from "@components/Card/Card";
import { API_URL } from "@lib/constant";
import CardSections, { ICardSection } from "./CardSections";
import { ButtonToggle } from "@components/ButtonToggle";
import { IButtonToggle } from "@components/ButtonToggle/ButtonToggle";


interface ICardContainer {
    type: ICard["type"];
}

type Section = { [key: string]: ICard[] };

export default ({ type }: ICardContainer) => {

    const [sections, setSections] = useState<Section>({});
    const [categories, setCategories] = useState<IButtonToggle[]>([]);
    const [activeTag, setActiveTag] = useState<string>('');

    const onTagClick = (event:BaseSyntheticEvent) => {
        console.log(event.target);
    };

    useEffect(() => {

        const tag = activeTag.length ? activeTag : 'all';

        fetch(`${API_URL}/resources/category/${tag}`).then(e => e.json()).then(data => {
            setSections(data);
            setCategories(Object.keys(data).map<IButtonToggle>(key => ({ text: key, size: 2 })));
        });


    }, [activeTag]);

    
    return (
        <div className="card-wrapper flex f-col gap-l">
            {categories.length > 1 && <ButtonToggle items={categories}onChange={onTagClick}/>}
            <div className="card-container flex f-col gap-5xl">
                {Object.keys(sections)?.map((key, i) => <CardSections key={`${key}${i}`} headline={key} items={sections[key as keyof typeof sections]} />)}
            </div>

        </div>
    );
}