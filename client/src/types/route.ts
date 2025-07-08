export interface IRouteComponent {
  path: string;
  component?: (props: any) => JSX.Element;
  validateSearch?: any;
  parseParams?: any;
  props: Parameters<any>[0];
  id?: string;
}

export interface IBackendRoute {
  name: string;
  path: string;
  icon: string;
  resource_id: number;
  banner: string;
  title: string;
  subtitle: string;
  filter?: boolean;
}
