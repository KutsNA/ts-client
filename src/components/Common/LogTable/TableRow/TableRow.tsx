import * as React from 'react';
import { Table, Item } from 'semantic-ui-react';
import LogItemAccordion from './LogItemAccordion';
import LogsListElement from './LogsListElement';

interface IState {
    activeIndex: number;
}

interface IProps {
    time: Date;
    result: any;
    resolver: string;
    type: string;
}

class TableRow extends React.Component<IProps, IState>{
    constructor(props: any) {
        super(props);
        this.state = {
            activeIndex: -1,
        };
    };

    handleClick = (event: any, titleProps: number) => {
        const { index } = titleProps;
        const { activeIndex } = this.state;
        const newIndex = activeIndex === index ? -1 : index;

        this.setState({ activeIndex: newIndex });
    };

    renderResolver = (isError: boolean) => {
        const { activeIndex } = this.state;
        const { result, resolver } = this.props;
        const entries = result ? Object.entries(result) : null;

        const mappedEntries = entries
            ? entries.map((element: any, index: number) => (
                <LogsListElement
                    data={isError ? entries[index][1] : entries[index]}
                    key={index}
                />
            ))
            : null;

        let listRender;

        if (entries) {
            listRender = typeof result === 'string' ? result : mappedEntries;
        } else listRender = 'empty listRender in Table Row';

        const LogItemTemplate = (
            <LogItemAccordion
                active={activeIndex === 0}
                handleClick={this.handleClick}
                name={resolver}
                body={listRender}
            />
        );

        return listRender && listRender.length ? LogItemTemplate : resolver;
    };

    renderResult = (result: any, isError?: boolean) => {
        let res = '';

        if (result === undefined || result === null) return '';
        if (typeof result === 'object') {
            const keys = Object.keys(result);
            if (isError) {
                console.log(result[keys]);
                return (result[keys]);
            }
            keys.forEach(key => {
                if (key.search(/id/i) === -1 && Number.isInteger(parseInt(result[key]))) {
                    res += result[key].toString().length > 2 ?
                        key + ' : ' + result[key].toString().slice(0, result[key].toString().length - 2) + '.' +
                        result[key].toString().slice(result[key].toString().length - 2) + ' ':
                        key + ': ' + '0.' + result[key] + ' ';
                } else {
                    res += isNaN(parseInt(key)) ? key + ' : ' + this.renderResult(result[key]) + ' ' :
                        this.renderResult(result[key]) + ' ';
                }
            });
            return res;
        }
        return result;
    };

    render() {
        const { type, time, result } = this.props;
        const { activeIndex } = this.state;

        let res = this.renderResult(result, type === 'error');
        res = res && res.length > 80 ? res.substr(0, 79) + '...' : res;

        return (
            <Table.Row error={type === 'error'}>
                <Table.Cell>{new Date(time).toLocaleString()}</Table.Cell>
                <Table.Cell>
                    <Item>
                        <Item.Header>{this.renderResolver(type === 'error')}</Item.Header>
                        {activeIndex ? <Item.Description>{res}</Item.Description> : null}
                    </Item>
                </Table.Cell>
            </Table.Row>
        );
    }
}

export default TableRow;
