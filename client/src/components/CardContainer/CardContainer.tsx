import { useEffect, useState } from "react";
import "./CardContainer.scss";
import Card, { ICard } from "@components/Card/Card";
import { API_URL } from "@lib/constant";


interface ICardContainer {
    type: ICard["type"];
}

export default ({ type }: ICardContainer) => {

    const [cards, setCards] = useState<ICard[]>();

    useEffect(() => {

        fetch(`${API_URL}`).then(e => e.json()).then(setCards);

    }, []);

    return (
        <div className="card-container">
            {cards?.map( (item,i) => <Card key={`${item.href}${i}`} {...item} />)}
        </div>
    );
}