import * as React from 'react';
import {Table, Pagination} from 'semantic-ui-react';
import TableRow from './TableRow/TableRow';


export interface IProps {
    logsData: any;
    totalLogsCount: number;
    logsPerPage: number;
    handlePageChange: any;
    activePage: number;
}

class LogTable extends React.Component<IProps> {
    render() {
        const {
            logsData,
            totalLogsCount,
            logsPerPage,
            handlePageChange,
            activePage,
        } = this.props;

        return (
            <Table celled selectable fixed compact>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell width={4}>Время</Table.HeaderCell>
                        <Table.HeaderCell width={12}>Действия пользователя</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {logsData
                        ? logsData.hits.map((log: any) => (
                            <TableRow
                                key={log.id}
                                time={log.time}
                                resolver={log.resolver}
                                result={log.result}
                                type={log.type}
                            />
                        ))
                        : null}
                </Table.Body>
                <Table.Footer>
                    <Table.Row>
                        <Table.HeaderCell>{totalLogsCount ? `Всего: ${totalLogsCount}` : null}</Table.HeaderCell>
                        <Table.HeaderCell>
                            <Pagination
                                activePage={activePage}
                                totalPages={Math.ceil(totalLogsCount / logsPerPage)}
                                onPageChange={handlePageChange}
                            />
                        </Table.HeaderCell>
                    </Table.Row>
                </Table.Footer>
            </Table>
        );
    }
};

export default LogTable;