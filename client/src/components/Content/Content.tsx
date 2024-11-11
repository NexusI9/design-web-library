import './Content.scss';

export interface IContainer{
    children:JSX.Element;
}

export default ({children}:IContainer) => {
    return(
        <div className='content full-width'>
            {children}
        </div>
    );
}