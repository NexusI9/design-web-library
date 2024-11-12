import { CardContainer } from "@components/CardContainer";
import "./Home.scss"

export default () => {

    return(<div className="flex f-col gap-4xl">
        <header className="home-header full-width flex f-col f-center round">
            <h1 className="heading-4">Browse Latest Web Design Tool </h1>
            <h2 className="heading-5">Improve and ease your workflow with extensive design tools</h2>
        </header>

        <CardContainer type="TOOL" />
    </div>);
}