export interface IRouteComponent {
  path: string;
  component?: (props: any) => JSX.Element;
  validateSearch?: any;
  parseParams?: any;
  props: Parameters<any>[0];
  id?: string;
}
