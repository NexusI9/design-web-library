export interface IRouteComponent {
  path: string;
  component: (props: any) => JSX.Element;
  props: Parameters<IRouteComponent["component"]>[0];
}
