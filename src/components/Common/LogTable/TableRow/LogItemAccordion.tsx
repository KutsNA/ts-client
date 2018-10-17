import * as React from 'react';
import { Accordion, Icon, List } from 'semantic-ui-react';
export interface IProps {
    active: boolean;
    handleClick: any;
    name: string;
    body: any | string;
}

function LogItemAccordion(props: IProps){
    const {active, handleClick, name, body} = props;
    return(
        <Accordion>
            <Accordion.Title active={active} index={0} onClick={handleClick}>
                <Icon name="dropdown" />
                {name}
            </Accordion.Title>
            <Accordion.Content active={active}>
                <List>{body}</List>
            </Accordion.Content>
        </Accordion>
    );
}

export default LogItemAccordion;
