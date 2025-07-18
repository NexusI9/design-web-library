import "./Card.scss";
import { Link } from "@tanstack/react-router";
import { createElement, ReactNode } from "react";

export interface ICard {
  title: string;
  description: string;
  type: "TOOL" | "TEMPLATE" | "MODULE" | "DOCUMENT" | "PLUGIN";
  tag: number;
  link: "EXTERNAL" | "DOWNLOAD" | "INTERNAL";
  href: string;
  picture: string;
}

interface ICardLinkElement {
  href: ICard["href"];
  link: ICard["link"];
  children: ReactNode;
}

interface ICardContent {
  title: ICard["title"];
  picture: ICard["picture"];
  description: ICard["description"];
}

const AnchorElement = ({ href, link, children }: ICardLinkElement) => (
  <a
    className="card round"
    href={href}
    {...(link == "EXTERNAL" && { target: "_blank" })}
  >
    {children}
  </a>
);

const RouterElement = ({ href, children }: ICardLinkElement) => (
  <Link className="card round" to={`$lang/${href}`} from="/">
    {children}
  </Link>
);

const CardContent = ({ picture, title, description }: ICardContent) => (
  <>
    <div className="card-picture">
      <img src={picture} className="full-width" draggable="false"/>
    </div>

    <div className="padding-l flex f-col gap-l">
      <div className="flex f-col gap-s">
        <p className="subtitle-1">{title}</p>
      </div>
      <p className="card-desc body-2-regular">{description}</p>
    </div>
  </>
);

export default ({
  title,
  description,
  type,
  tag,
  link,
  href,
  picture,
}: ICard) => {
  const LinkElement = link == "INTERNAL" ? RouterElement : AnchorElement;
  const LinkContent = createElement(CardContent, {
    picture,
    title,
    description,
  });

  return createElement(LinkElement, { href, link, children: LinkContent });
};
