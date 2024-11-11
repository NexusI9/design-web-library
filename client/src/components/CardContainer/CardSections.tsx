import Card, { ICard } from "@components/Card/Card";

export interface ICardSection {
    headline: string;
    cards: ICard[];
}

export default ({ headline, cards }: ICardSection) => {

    return(
        <div className="card-section flex f-col gap-m">
            <h3>{headline}</h3>
            {cards?.map((item, i) => <Card key={`${item.href}${i}`} {...item} />)}
        </div>
    );

};