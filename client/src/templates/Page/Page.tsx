import { Container } from "@components/Container";
import { Sidepanel } from "@components/Sidepanel";
import { ISidepanel } from "@components/Sidepanel/Sidepanel";

export interface IPageTemplate {
    sidepanel: ISidepanel;
    children: Element;
};

export default ({ sidepanel, children }: IPageTemplate) => {

    return (
        <Container>
            <>
                <Sidepanel items={sidepanel.items} />
                {children}
            </>
        </Container>
    );

};