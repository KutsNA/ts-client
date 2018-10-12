import * as React from 'react';
import {Container, Menu,} from 'semantic-ui-react';
import PhoneNumberSearch from '../Comons/PhoneNumberSearch/PhoneNumberSearch';
import SberKidsLogo from '../Comons/SberKidsLogo/SberKidsLogo';
import CreateList from './CreateList';

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
    phoneNumbersArray: Array<string>;
    parameter: string;
};

class Dashboard extends React.Component<object, IState> {
    constructor(props: any) {
        super(props);
        this.state = {
            parameter: '',
            phoneNumbersArray: [],
            userId: '',
        };
    };

    addPhoneNumberToHistory = (number: string) => {
        let tmp = this.state.phoneNumbersArray;
        tmp.push(number);
        console.log('add phone number ' + tmp);
        this.setState({phoneNumbersArray: tmp});
    };

    addParameter = (parameter: string) => {
        this.setState({parameter: parameter});
        console.log(this.state.parameter);
    };

    render() {
        const {phoneNumbersArray, parameter} = this.state;
        return (
            <Container fluid={true}>
                <Menu id="menu">
                    <Menu.Item position="left">
                        <SberKidsLogo/>
                    </Menu.Item>
                    <Menu.Item position="right">
                        <PhoneNumberSearch addPhoneNumberToHistory={this.addPhoneNumberToHistory}
                                           addParameter={this.addParameter}/>
                    </Menu.Item>
                </Menu>
                <Container>
                    <CreateList phoneNumbersArray={phoneNumbersArray} parametr={parameter}/>
                </Container>
            </Container>
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
                        <Menu attached fluid icon="labeled" vertical>
                            <Menu.Item
                                as={Link}
                                to={`${url}/actions`}
                                name="Actions Screen"
                                active={location.pathname.includes(`/user/${userId}/actions`)}
                                disabled={!userId}
                            >
                                <Icon name="tasks" />
                                Действия
                            </Menu.Item>

                            <Menu.Item
                                as={Link}
                                to={`${url}/registration`}
                                name="Registrations Screen"
                                disabled={!phoneNumber || userId}
                                active={location.pathname.includes(`/phone/${phoneNumber}/registration`)}
                            >
                                <Icon name="address card" />
                                Регистрация
                            </Menu.Item>

                            <Menu.Item
                                as={Link}
                                to={`${url}/transactions`}
                                name="Transactions Screen"
                                active={location.pathname.includes(`/user/${parentID}/transactions`)}
                                disabled={!parentID || !userId}
                            >
                                <Icon name="money bill alternate outline" />
                                Транзакции
                            </Menu.Item>

                            <Menu.Item
                                as={Link}
                                to={`${url}/modifications`}
                                name="Modifications Screen"
                                active={location.pathname.includes(`/user/${parentID}/modifications`)}
                                disabled={!parentID || !userId}
                            >
                                <Icon name="wrench" />
                                Модификации
                            </Menu.Item>
                        </Menu>
                    </Grid.Column>
                    <Grid.Column computer={14} tablet={14} mobile={16}>
                        <Grid container columns={2} reversed="mobile vertically">
                            <Grid.Column computer={12} tablet={12} mobile={16}>
                                <Switch>
                                    <Route
                                        path={`${path}/actions`}
                                        component={ActionsScreen}
                                    />
                                    <Route path={`${path}/registration`} component={RegistrationsScreen} />
                                    {children ? (
                                        <Redirect
                                            exact
                                            from="/user/:userId/transactions"
                                            to={`/user/${parentID}/transactions/${children[0].id}`}
                                        />
                                    ) : null}
                                    <Route
                                        path={`${path}/transactions`}
                                        render={() => (
                                            <TransactionsScreen parentID={parentID} childrenProfiles={children} />
                                        )}
                                    />
                                    <Route
                                        path={`${path}/modifications`}
                                        render={() => (
                                            <ModificationsScreen parentID={parentID} childrenProfiles={children} />
                                        )}
                                    />
                                    <Redirect from="/user/:userId" to="/user/:userId/actions" />
                                </Switch>
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