import { BaseSyntheticEvent, useEffect, useState } from "react";
import "./CardContainer.scss";
import Card, { ICard } from "@components/Card/Card";
import { API_URL } from "@lib/constant";
import CardSections, { ICardSection } from "./CardSections";
import { ButtonToggle } from "@components/ButtonToggle";
import { IButtonToggle, IToggleCallback } from "@components/ButtonToggle/ButtonToggle";


interface ICardContainer {
    type: ICard["type"];
}

type Section = { [key: string]: ICard[] };

export default ({ type }: ICardContainer) => {

    const [sections, setSections] = useState<Section>({});
    const [categories, setCategories] = useState<IButtonToggle[]>([]);
    const [activeTag, setActiveTag] = useState<string>('');

    const onTagClick = ({ event, source }: IToggleCallback<IButtonToggle>) => setActiveTag(source.text);

    useEffect(() => {

        const tag = activeTag.length ? activeTag : 'all';

        fetch(`${API_URL}/resources/category/all`).then(e => e.json()).then(data => {
            setCategories(Object.keys(data).map<IButtonToggle>(key => ({ text: key, size: 2 })));
        });

        fetch(`${API_URL}/resources/category/${tag}`).then(e => e.json()).then(data => {
            
            setSections(data);
        });


    }, [activeTag]);

    return (
        <div className="card-wrapper flex f-col gap-l">
            {categories.length > 0 && <ButtonToggle items={categories} onChange={onTagClick} />}
            <div className="card-container flex f-col gap-5xl">
                {Object.keys(sections)?.map((key, i) => <CardSections key={`${key}${i}`} headline={key} items={sections[key as keyof typeof sections]} />)}
            </div>

        </div>
    );
}