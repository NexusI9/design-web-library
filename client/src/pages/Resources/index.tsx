import { CardContainer } from "@components/CardContainer";
import { ICard } from "@components/Card/Card";
import { PageHeader } from "@components/PageHeader";

export interface IResources {
  filter?: boolean;
  header?: {
    title?: string;
    subtitle?: string;
    picture?: string;
  };
  type: ICard["type"];
}

export default ({ header, type, filter }: IResources) => {
  return (
    <div className="flex f-col gap-4xl">
      {header && (
        <PageHeader
          title={header?.title}
          subtitle={header?.subtitle}
          picture={header?.picture}
        />
      )}

      <CardContainer type={type} filter={filter} />
    </div>
  );
};
