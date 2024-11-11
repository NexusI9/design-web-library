import "./Card.scss";

export interface ICard{
    title:string;
    description: string;
    type: "TOOL" | "TEMPLATE" | "MODULE" | "DOCUMENT" | "PLUGIN";
    tag: number;
    link: "EXTERNAL" | "DOWNLOAD",
    href: string;
    picture:string;
}

export default ({title, description, type, tag, link, href, picture}:ICard) => {

    return (
        <div className="card round">
            <img src={picture} />
            <p>{title}</p>
        </div>
    );
}