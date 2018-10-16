import * as React from 'react';
import {Dimmer, Divider, Menu, Segment, Loader, Message} from 'semantic-ui-react';
import LogTable from '../Common/LogTable/LogTable';
import UserLogsApi from '../API/UserLogsApi';

 export interface IProps {
     phoneNumber: string;
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

export interface IProps {
    logsPerPage: number;
    // match: {
    //     path: string;
    //     url: string;
    //     location: string;
    //     params: {
    //         userId: string;
    //     };
    //
    // };
}

class ActionScreen extends React.Component<IProps, IState> {
    constructor(props: any) {
        super(props);
        this.state = {
            activePage: 1,
            logsData: [],
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
        this.setState({loadingInProcess: true}, () => this.getLogsPage(1));
    };

    async getLogsPage(page: any) {
        const {
            logsPerPage,
            match: {
                params: {userId},
            },
        } = this.props;
        const {filters, showHistogram} = this.state;

        let request = `${userId}?pageNum=${page}&perPage=${logsPerPage}`;

        if (filters) {
            request += filters;
        }

        const logsData = await UserLogsApi.getRegistrationLogs(request);

        this.setState({
            logsData,
            loadingInProcess: false,
            errorMessage: '',
            minTime: logsData.minTime,
            maxTime: logsData.maxTime,
        });

        if (showHistogram) {
            this.getLogsHistogram();
        }
    };

    async getLogsHistogram() {
        const {
            match: {
                params: {userId},
            },
        } = this.props;
        const {filters, histogramWidth, minTime, maxTime} = this.state;

        let request = `${userId}?timeFrom=${minTime}&timeTo=${maxTime}&histogram=${histogramWidth}`;

        if (filters) {
            request = `${userId}?histogram=${histogramWidth}`;
            request += filters;
        }

        const histogram = await UserLogsApi.getLogs(request);

        this.setState({
            histogram: Array.isArray(histogram) ? histogram : [],
        });
    };

    handleShowFilters(showFiltersPanel: boolean) {
        this.setState({showFiltersPanel: !showFiltersPanel});
    };

    handleApplyFilters(filters: Array<string>) {
        this.setState({loadingInProcess: true, filters, histogram: []}, () => this.getLogsPage(1));
    };

    handleResetFilters() {
        this.setState({loadingInProcess: true, filters: []}, () => this.getLogsPage(1));
    };

    handleChangeHistogramWidth(histogramWidth: number) {
        this.setState({histogramWidth});
    };

    handleApplyTimeFrame(filters: Array<string>) {
        this.setState({loadingInProcess: true, filters}, () => this.getLogsPage(1));
    }

    handlePageChange(event: any, {activePage}: any) {
        this.setState({loadingInProcess: true, activePage}, () => this.getLogsPage(activePage));
    };

    render() {
        const {
            logsPerPage = 30,
        } = this.props;
        const {
            loadingInProcess,
            logsData,
            activePage,
            showFiltersPanel,
        } = this.state;

        const totalLogsCount = logsData && logsData.total <= 10000 ? logsData.total : 1000;

        return (
            <Dimmer.Dimmable as={Segment} blurring={true} dimmed={loadingInProcess} style={{minHeight: 150}}>
                <Menu>
                    <Menu.Item icon='list' name='table' content='таблица'/>
                    <Menu.Item icon="exchange" name="timeline" content="Таймлайн"/>
                    <Menu.Item position="right" icon="settings"
                               onClick={() => this.handleShowFilters(showFiltersPanel)}/>
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

export default ActionScreen;
/*
import LogTimeLine from '../../Common/LogTimeline';
import LogFilters from '../../Common/LogFilters';
import TimeFrameSelector from '../../Common/TimeFrameSelector';

class ActionsScreen extends Component {
            this should be after Menu
            {showFiltersPanel && logsData ? (
                <LogFilters
                    minTime={logsData.minTime}
                    maxTime={logsData.maxTime}
                    handleApplyFilters={this.handleApplyFilters}
                    handleResetFilters={this.handleResetFilters}
                />
            ) : null}

            <Divider />

            {showHistogram && logsData ? (
                <TimeFrameSelector
                    histogram={histogram}
                    handleChangeHistogramWidth={this.handleChangeHistogramWidth}
                    handleApplyTimeFrame={this.handleApplyTimeFrame}
                />
            ) : null}

            {errorMessage ? <Message error>{errorMessage}</Message> : null}

            <Divider />


        </Dimmer.Dimmable>
    );
}
}
export default withRouter(ActionsScreen);

*/