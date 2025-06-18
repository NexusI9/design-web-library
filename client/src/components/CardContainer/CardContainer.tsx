import { BaseSyntheticEvent, useEffect, useState } from "react";
import "./CardContainer.scss";
import Card, { ICard } from "@components/Card/Card";
import { API_URL } from "@lib/constant";
import CardSections, { ICardSection } from "./CardSections";
import { ButtonToggle } from "@components/ButtonToggle";
import {
  IButtonToggle,
  IToggleCallback,
} from "@components/ButtonToggle/ButtonToggle";

import AIIcon from "@icons/ai.svg";
import DesignSystemIcon from "@icons/module.svg";
import ColorIcon from "@icons/paint.svg";
import FoundryIcon from "@icons/type.svg";
import IconoIcon from "@icons/image.svg";
import StockIcon from "@icons/camera.svg";
import UXIcon from "@icons/click.svg";

interface ICardContainer {
  type: ICard["type"];
  filter?: boolean;
}

type Section = { [key: string]: ICard[] };

export default ({ type, filter }: ICardContainer) => {
  const [sections, setSections] = useState<Section>({});
  const [categories, setCategories] = useState<IButtonToggle[]>([]);
  const [activeTag, setActiveTag] = useState<string>("");

  const onTagClick = ({ event, source }: IToggleCallback<IButtonToggle>) =>
    setActiveTag(source.text);

  useEffect(() => {
    if (filter !== false) {
      const iconTagMap = {
        AI: AIIcon,
        "Design System": DesignSystemIcon,
        Color: ColorIcon,
        Foundry: FoundryIcon,
        Iconography: IconoIcon,
        Stock: StockIcon,
        UX: UXIcon,
      };

      fetch(`${API_URL}/resources/${type}/category/all`)
        .then((e) => e.json())
        .then((data) => {
          data = { All: [], ...data };

          setCategories(
            Object.keys(data).map<IButtonToggle>((key) => ({
              ...(iconTagMap[key as keyof typeof iconTagMap] && {
                leftIcon: iconTagMap[key as keyof typeof iconTagMap],
              }),
              text: key,
              size: 2,
            })),
          );
        });
    }

    const tag = activeTag.length ? activeTag : "all";
    fetch(`${API_URL}/resources/${type}/category/${tag}`)
      .then((e) => e.json())
      .then((data) => {
        setSections(data);
      });
  }, [activeTag]);

  return (
    <div className="card-wrapper flex f-col gap-l">
      {filter !== false && categories.length > 0 && (
        <ButtonToggle items={categories} onChange={onTagClick} />
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
