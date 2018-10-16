import * as React from 'react';
import {Dimmer, Divider, Menu, Segment, Loader, } from 'semantic-ui-react';
import LogTable from '../Common/LogTable/LogTable';
import UserLogsApi from '../API/UserLogsApi';

export interface IProps {
    phoneNumber: string;
    logsPerPage: number;
}

export interface IState {
    activePage: number;
    logsData: any;
    showFiltersPanel: boolean;
    showHistogram: boolean;
    filters: Array<string>;
    histogram: Array<any>;
    histogramWidth: number;
    loadingInProcess: boolean;
    errorMessage: string;
    minTime: string;
    maxTime: string;
};

class ActScr extends React.Component<IProps, IState> {
    constructor(props: any) {
        super(props);
        this.state = {
            activePage: 1,
            logsData: undefined,
            showFiltersPanel: true,
            showHistogram: true,
            filters: [],
            histogram: [],
            histogramWidth: 0,
            loadingInProcess: false,
            errorMessage: '',
            minTime: '',
            maxTime: '',
        };
    };

    componentDidMount() {
        this.setState({loadingInProcess: true}, () => this.getLogsPage(this.props.phoneNumber));
    };

    // async getLogs(phoneNumber: string) {
    //     try {
    //         const logs = await UserLogsApi.getRegistrationLogs(phoneNumber);
    //         return logs;
    //     } catch (error) {
    //         console.log(error);
    //     }
    // };

    async getLogsPage(number: string) {

        const logsData = await UserLogsApi.getRegistrationLogs(number);

        this.setState({
            logsData,
            loadingInProcess: false,
            errorMessage: '',
        });
    };
    handlePageChange(event: any, {activePage}: any) {
        this.setState({loadingInProcess: true, activePage}, () => this.getLogsPage(activePage));
    };

    render() {
        const { logsPerPage } = this.props;
        const { loadingInProcess, logsData, activePage, showFiltersPanel, } = this.state;
        console.log(logsData);
        const totalLogsCount = logsData && logsData.total <= 10000 ? logsData.total : 1000;

        return (
            <Dimmer.Dimmable as={Segment} blurring={true} dimmed={loadingInProcess} style={{minHeight: 150}}>
                <Menu>
                    <Menu.Item icon='list' name='table' content='таблица'/>
                    <Menu.Item icon="exchange" name="timeline" content="Таймлайн"/>
                    <Menu.Item position="right" icon="settings"/>
                </Menu>
                <Divider/>
                {logsData ? (
                    <LogTable
                        logsData={logsData}
                        logsPerPage={logsPerPage}
                        totalLogsCount={totalLogsCount}
                        activePage={activePage}
                        handlePageChange={this.handlePageChange}
                    />
                ) : null
                }
                <Dimmer inverted active={loadingInProcess}>
                    <Loader size="massive">Loading</Loader>
                </Dimmer>
            </Dimmer.Dimmable>
        );
    };
};

export default ActScr;