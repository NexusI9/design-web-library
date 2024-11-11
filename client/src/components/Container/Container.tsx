import './Container.scss';

export interface IContainer{
    children:JSX.Element;
}

export default ({children}:IContainer) => {
    return(
        <div className='container main'>
            {children}
        </div>
    );
}