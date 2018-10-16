import * as React from 'react';
import {Container, Grid, Menu, Icon,} from 'semantic-ui-react';
import PhoneNumberSearch from '../Common/PhoneNumberSearch/PhoneNumberSearch';
import SberKidsLogo from '../Common/SberKidsLogo/SberKidsLogo';
//import ActionScreen from "../Screens/ActionScreen";
import ActScr from '../Screens/ActScr';

/*
import { changeCommon } from 'client/actions';
import UserProfile from '../UserProfile';
import PhoneNumberSearch from '../Common/PhoneNumberSearch';
import ActionsScreen from '../Screens/Actions';
import RegistrationsScreen from '../Screens/Registrations';
import TransactionsScreen from '../Screens/Transactions';
import ModificationsScreen from '../Screens/Modifications'
*/
interface IState {
    userId: string;
    phoneNumber: string;
    parameter: string;
    hits: any;
};

class Dashboard extends React.Component<object, IState> {
    constructor(props: any) {
        super(props);
        this.state = {
            phoneNumber: '',
            parameter: '',
            userId: '',
            hits: [],
        };
    };

    setPhoneNumber = (number: string) => {
        this.setState({phoneNumber: number});
    };
        addLogs = (logs: any) => {
        this.setState({hits: logs} );
    };

    render() {

        return (
            <div>
                <Container fluid={true}>
                    <Menu id="menu">
                        <Menu.Item position="left">
                            <SberKidsLogo/>
                        </Menu.Item>
                        <Menu.Item position="right">
                            <PhoneNumberSearch addPhoneNumber={this.setPhoneNumber}
                                               getUserLogs={this.addLogs}/>
                        </Menu.Item>
                    </Menu>
                </Container>
                <Container fluid>
                    <Grid columns={3}>
                        <Grid.Column computer={2} tablet={2} mobile={16}>
                            <Menu attached fluid icon="labeled" vertical>
                                <Menu.Item name="Actions Screen">
                                    <Icon name="tasks"/>
                                    Действия
                                </Menu.Item>
                                <Menu.Item name="Registrations Screen">
                                    <Icon name="address card"/>
                                    Регистрация
                                </Menu.Item>
                                <Menu.Item name="Transactions Screen">
                                    <Icon name="money bill alternate outline"/>
                                    Транзакции
                                </Menu.Item>
                                <Menu.Item name="Modifications Screen">
                                    <Icon name="wrench"/>
                                    Модификации
                                </Menu.Item>
                            </Menu>
                        </Grid.Column>
                        <Grid.Column computer={12} tablet={12} mobile={16}>

                            {'Logs\n'}

                            {console.log('dashboard' + this.state.hits)}
                            {console.log(this.state)}
                            {this.state.phoneNumber ? <ActScr phoneNumber={this.state.phoneNumber} logsPerPage={30}/> : "No phone number"}
                        </Grid.Column>
                        <Grid.Column computer={4} tablet={4} mobile={16}>
                            {'UserProfile />'}
                        </Grid.Column>
                    </Grid>
                </Container>
            </div>
        );
    };
}

export default Dashboard;

/*
class Dashboard1 extends React.Component {
    constructor(props) {
        super(props);
        const { userId, phoneNumber } = props.match.params;
        const { onChangeCommon } = props;
        onChangeCommon('phoneNumber', phoneNumber);
        onChangeCommon('userId', userId);
    }
    render() {
        return (
            <Container fluid>
                <Grid columns={3}>
                    <Grid.Column computer={2} tablet={2} mobile={16}>
                    </Grid.Column>

                    <Grid.Column computer={14} tablet={14} mobile={16}>
                        <Grid container columns={2} reversed="mobile vertically">
                            <Grid.Column computer={12} tablet={12} mobile={16}>

                            </Grid.Column>

                            <Grid.Column computer={4} tablet={4} mobile={16}>
                                <Switch>
                                    <Route
                                        exact
                                        path="/phone/:phoneNumber"
                                        render={() => (phoneNumber ? <UserProfile /> : null)}
                                    />

                                    <Route
                                        path="/user/:userId/transactions"
                                        render={() =>
                                            userId ? (
                                                <UserProfile disableRendering />
                                            ) : null
                                        }
                                    />

                                    <Route
                                        path="/user/:userId/modifications"
                                        render={() =>
                                            userId ? (
                                                <UserProfile disableRendering />
                                            ) : null
                                        }
                                    />

                                    <Route
                                        path="/user/:userId/*"
                                        render={() =>
                                            userId ? <UserProfile /> : null
                                        }
                                    />
                                </Switch>
                            </Grid.Column>
                        </Grid>
                    </Grid.Column>
                </Grid>
            </Container>
        );
    }
}
*/