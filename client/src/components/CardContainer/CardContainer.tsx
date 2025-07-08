import {
  BaseSyntheticEvent,
  createElement,
  useContext,
  useEffect,
  useState,
} from "react";
import "./CardContainer.scss";
import Card, { ICard } from "@components/Card/Card";
import CardSections, { ICardSection } from "./CardSections";

import AIIcon from "@icons/ai.svg";
import DesignSystemIcon from "@icons/module.svg";
import ColorIcon from "@icons/paint.svg";
import FoundryIcon from "@icons/type.svg";
import IconoIcon from "@icons/image.svg";
import StockIcon from "@icons/camera.svg";
import UXIcon from "@icons/click.svg";
import { LangContext } from "@components/Language/Language";
import { Toggle } from "@components/Toggle";
import { IToggleItem } from "@components/Toggle/Item";

interface ICardContainer {
  type: ICard["type"];
  filter?: boolean;
}

interface ITag {
  id: string;
  name: string;
  icon: string;
}

console.log(IconoIcon);
type Section = { [key: string]: ICard[] };

export default ({ type, filter }: ICardContainer) => {
  const [sections, setSections] = useState<Section>({});
  const [tags, setTags] = useState<IToggleItem[]>([]);
  const [activeTag, setActiveTag] = useState<number | undefined>(0);
  const lang = useContext(LangContext);

  useEffect(() => {
    if (filter !== false) {
      // fetch and set top categories filter
      fetch(`${process.env.API_URL}/${lang}/tags/resource/${type}`)
        .then((e) => e.json())
        .then((data: ITag[]) => {
          // go through each object entry, each key corresspond to a tag
          setTags(
            data.map<IToggleItem>(({ name, icon, id }) => ({
              index: Number(id),
              children: <>{name}</>,
              size: 2,
            })),
          );
        });
    }

    // fetch resrouces sections
    const tag = activeTag || "all";
    fetch(`${process.env.API_URL}/${lang}/resources/${type}/category/${tag}`)
      .then((e) => e.json())
      .then((data) => {
        setSections(data);
      });
  }, [activeTag]);

  return (
    <div className="card-wrapper flex f-col gap-l">
      {filter !== false && tags.length > 0 && (
        <Toggle.Root className="flex f-row gap-s">
          {tags.map((tag) => (
            <Toggle.Item
	      className="flex f-row f-center"
              key={tag.index}
              size={tag.size}
              index={tag.index}
              onClick={() => setActiveTag(tag.index)}
            >
              {tag.children}
            </Toggle.Item>
          ))}
        </Toggle.Root>
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
