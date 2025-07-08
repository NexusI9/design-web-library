import { BaseSyntheticEvent, createElement, useContext, useEffect, useState } from "react";
import "./CardContainer.scss";
import Card, { ICard } from "@components/Card/Card";
import CardSections, { ICardSection } from "./CardSections";
import { Button } from "@components/Button";
import { IButtonToggle, IToggleCallback } from "@components/Button/Toggle";

import AIIcon from "@icons/ai.svg";
import DesignSystemIcon from "@icons/module.svg";
import ColorIcon from "@icons/paint.svg";
import FoundryIcon from "@icons/type.svg";
import IconoIcon from "@icons/image.svg";
import StockIcon from "@icons/camera.svg";
import UXIcon from "@icons/click.svg";
import { LangContext } from "@components/Language/Language";

interface ICardContainer {
  type: ICard["type"];
  filter?: boolean;
}

interface ITag {
  id: string;
  name: string;
  icon: string;
}

type Section = { [key: string]: ICard[] };

export default ({ type, filter }: ICardContainer) => {
  const [sections, setSections] = useState<Section>({});
  const [categories, setCategories] = useState<IButtonToggle[]>([]);
  const [activeTag, setActiveTag] = useState<string>("");
  const lang = useContext(LangContext);

  const onTagClick = ({ source }: IToggleCallback<IButtonToggle>) =>
    setActiveTag(source.text);

  useEffect(() => {
    if (filter !== false) {
      // fetch and set top categories filter
      fetch(`${process.env.API_URL}/${lang}/tags/resource/${type}`)
        .then((e) => e.json())
        .then((data: ITag[]) => {
	  console.log(data);
          // go through each object entry, each key corresspond to a tag
          setCategories(
            data.map<IButtonToggle>(({ name, icon }) => ({
              icon: createElement(icon),
              text: name,
              size: 2,
            })),
          );
        });
    }

    // fetch resrouces sections
    const tag = activeTag.length ? activeTag : "all";
    fetch(`${process.env.API_URL}/${lang}/resources/${type}/category/${tag}`)
      .then((e) => e.json())
      .then((data) => {
        setSections(data);
      });
  }, [activeTag]);

  return (
    <div className="card-wrapper flex f-col gap-l">
      {filter !== false && categories.length > 0 && (
        <Button.Toggle items={categories} onChange={onTagClick} />
      )}
      <div className="card-container flex f-col gap-5xl">
        {Object.keys(sections)?.map((key, i) => (
          <CardSections
            key={`${key}${i}`}
            headline={key}
            items={sections[key as keyof typeof sections]}
          />
        ))}
      </div>
    </div>
  );
};
