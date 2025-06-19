import "./PageHeader.scss";

export interface IPageHeader {
  title?: string;
  subtitle?: string;
  picture?: string;
}

export default ({ title, subtitle, picture }: IPageHeader) => (
  <header
    className="page-header full-width flex f-col round"
    data-picture={!!picture}
  >
    {picture && (
      <div className="page-header-visual">
        <img src={picture} />
      </div>
    )}
    {title && <h1 className="heading-4">{title}</h1>}
    {subtitle && <h2 className="heading-5">{subtitle}</h2>}
  </header>
);
