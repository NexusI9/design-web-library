import "./Card.scss";

export interface ICard {
    title: string;
    description: string;
    type: "TOOL" | "TEMPLATE" | "MODULE" | "DOCUMENT" | "PLUGIN";
    tag: number;
    link: "EXTERNAL" | "DOWNLOAD",
    href: string;
    picture: string;
}

export default ({ title, description, type, tag, link, href, picture }: ICard) => {

    return (
        <div className="card round">
            <div className="card-picture">
                <img src={picture} />
            </div>

            <div className="padding-l flex f-col gap-l">
                <div className="flex f-col gap-s">
                    <p className="subtitle-1">{title}</p>
                </div>
                <p className="card-desc body-2-regular">{description}</p>
            </div>
        </div>
    );
}