import * as React from 'react';
import {List, Accordion, Icon} from 'semantic-ui-react';

export interface IProps {
    data: any;
}

interface IState {
    activeIndex: number;
}

class LogsListElement extends React.Component<IProps, IState> {
    constructor(props: any) {
        super(props);
        this.state = {
            activeIndex: -1,
        };
    };

    handleClick(event: any, titleProps: any) {
        const {index} = titleProps;
        const {activeIndex} = this.state;
        const newIndex = activeIndex === index ? -1 : index;
        this.setState({activeIndex: newIndex});
    };

    render() {
        const {activeIndex} = this.state;
        const {data} = this.props;
        const listTemplate = data ? (
            <List.Content>
                {typeof data[1] !== 'object' ? <List.Header>{data[0]}</List.Header> : null}
                <List.Description>
                    {typeof data[1] !== 'object' ?
                        data[1].toString().length > 0 ?
                            data[0].search(/id/i) === -1 && Number.isInteger(parseInt(data[1])) ?
                                data[1].toString().length > 2 ?
                                    data[1].toString().slice(0, data[1].toString().length - 2) + '.' +
                                    data[1].toString().slice(data[1].toString().length - 2) :
                                    '0.' + data[1]
                                :
                                data[1].toString()
                            :
                            'No info'
                        :
                        <Accordion>
                            <Accordion.Title active={activeIndex === 0} index={0} onClick={this.handleClick}>
                                <Icon name="dropdown"/>
                                {data[0]}
                            </Accordion.Title>
                            <Accordion.Content active={activeIndex === 0}>
                                <List>
                                    {data[1]
                                        ? Object.entries(data[1]).map((element, index) => (
                                            <LogsListElement
                                                data={Object.entries(data[1])[index]}
                                                key={Math.random() * 2}
                                            />
                                        ))
                                        : null}
                                </List>
                            </Accordion.Content>
                        </Accordion>
                    }
                </List.Description>
            </List.Content>
        ) : null;

        const renderTemplate = typeof data === 'string' ? data : listTemplate;
        return <List.Item>{renderTemplate}</List.Item>;
    };
}

export default LogsListElement;