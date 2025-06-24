export interface IRouteComponent {
  path: string;
  component: (props: any) => JSX.Element;
  validateSearch?: any;
  props: Parameters<IRouteComponent["component"]>[0];
}
