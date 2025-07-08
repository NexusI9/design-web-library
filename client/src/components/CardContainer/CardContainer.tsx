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

type Section = { headline: string; body: ICard[] };

export default ({ type, filter }: ICardContainer) => {
  const [sections, setSections] = useState<Section[]>([]);
  const [tags, setTags] = useState<ITag[]>([]);
  const [activeTag, setActiveTag] = useState<number | undefined>(0);
  const lang = useContext(LangContext);

  useEffect(() => {
    if (filter !== false) {
      // fetch and set top categories filter
      fetch(`${process.env.API_URL}/${lang}/tags/resource/${type}`)
        .then((e) => e.json())
        .then((data: ITag[]) => {
          // go through each object entry, each key corresspond to a tag
          setTags(data);
        });
    }

    // fetch resrouces sections
    const tag = activeTag || 0;
    fetch(`${process.env.API_URL}/${lang}/resources/${type}/category/${tag}`)
      .then((e) => e.json())
      .then((data) => {
        const sections: Section[] = [];

        // map data key to tags by id and build sections
        Object.keys(data).map((key) =>
          sections.push({
            headline: key,
            body: data[key],
          }),
        );

        setSections(sections);
      });
  }, [activeTag]);

  return (
    <div className="card-wrapper flex f-col gap-l">
      {filter !== false && tags.length > 0 && (
        <Toggle.Root className="flex f-row gap-s">
          {tags.map((tag) => (
            <Toggle.Item
              className="flex f-row f-center"
              key={tag.id}
              size={2}
              index={Number(tag.id)}
              onClick={() => setActiveTag(Number(tag.id))}
            >
              {tag.name}
            </Toggle.Item>
          ))}
        </Toggle.Root>
      )}
      <div className="card-container flex f-col gap-5xl">
        {sections.map(({ headline, body }, i) => (
          <CardSections
            key={`${headline}${i}`}
            headline={headline}
            items={body}
          />
        ))}
      </div>
    </div>
  );
};
