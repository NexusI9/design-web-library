import { CardContainer } from "@components/CardContainer";
import { PageHeader } from "@components/PageHeader";

export interface IResources {
  filter?: boolean;
  header?: {
    title?: string;
    subtitle?: string;
    banner?: string;
  };
  resource_id: number;
}

export default ({ header, resource_id, filter }: IResources) => {
  return (
    <div className="flex f-col gap-4xl">
      {header && (
        <PageHeader
          title={header?.title}
          subtitle={header?.subtitle}
          picture={header?.banner}
        />
      )}

      <CardContainer resource_id={resource_id} filter={filter} />
    </div>
  );
};
