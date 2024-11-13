import Card, { ICard } from "@components/Card/Card";

export interface ICardSection {
    headline: string;
    items: ICard[];
}

export default ({ headline, items }: ICardSection) => {
    
    return (
        <div className="card-section flex f-col gap-2xl">
            <h3 className="heading-5">{headline}</h3>
            <div className="card-grid">
                {items?.map((item, i) => <Card key={`${item.href}${i}`} {...item} />)}
            </div>

        </div>
    );

};