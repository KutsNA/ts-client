/*
import * as React from 'react';
import {Container, Grid, Header, Segment, Form, Modal} from 'semantic-ui-react';
import SberKidsLogo from "../Common/SberKidsLogo/SberKidsLogo";
import ValidationApi from '../API/ValidationApi';
import ValidationForm from './ValidationForm';

interface IState {
    login: string;
    password: string;
    submittedLogin: string;
    submittedPassword: string;
    validUser: boolean;
}

class AuthPage extends React.Component<Object, IState> {
    constructor(props: any) {
        super(props);
        this.state = {
            login: '',
            password: '',
            submittedLogin: '',
            submittedPassword: '',
            validUser: false,
        };
    };

    handleChange = (event, {name, value}) => this.setState({[name]: value});

    handleSubmit = () => {
        const {login, password} = this.state;
        this.setState({submittedLogin: login, submittedPassword: password});
        this.validateUser(this.state.submittedLogin, this.state.submittedPassword);
    };

    async validateUser(submittedLogin: string, submittedPassword: string) {
        this.setState({validUser: true});
        //<ValidationForm/>
        // try{
        //     const userExist = await ValidationApi.validateUser(submittedLogin, submittedPassword);
        //     if (userExist) {
        //         <ValidationForm/>
        //     }
        // } catch (error) {
        //     console.log(error);
        //     console.log('user does not exist!');
        // }
    }

    render() {
        const {login, password, validUser} = this.state;

        return (
            <div className='login-form'>
                {validUser ?
                    <ValidationForm/> :
                    <Container fluid={true}>
                        <style>{`
                            body > div,
                            body > div > div,
                            body > div > div > div.login-form {
                            height: 100%;
                            `}
                        </style>
                        <Grid textAlign='center' style={{height: '100%'}} verticalAlign='middle'>
                            <Grid.Column style={{maxWidth: 450}}>
                                <Header as='h2' color='teal' textAlign='center'>
                                    <SberKidsLogo/> Log-in to your account
                                </Header>
                                <Container textAlign={'center'}>
                                    <Form onSubmit={this.handleSubmit} size='large'>
                                        <Segment stacked>
                                            <Form>
                                                <Form.Input
                                                    required
                                                    placeholder='login'
                                                    name='login'
                                                    value={login}
                                                    onChange={this.handleChange}/>
                                                <Form.Input
                                                    required
                                                    type={'password'}
                                                    placeholder='password'
                                                    name='password'
                                                    value={password}
                                                    onChange={this.handleChange}
                                                />
                                                <Form.Button content='Log in'/>
                                            </Form>
                                        </Segment>
                                    </Form>
                                </Container>
                            </Grid.Column>
                        </Grid>
                    </Container>}
            </div>
        );
    };
}

export default AuthPage;*/

import * as React from 'react';
import InputContainer from './InputContainer';

interface IState {
    login: string;
    password: string;
    submittedLogin: string;
    submittedPassword: string;
    validUser: boolean;
}

class AuthPage extends React.Component<Object, IState> {
    render(){
      return(
          <InputContainer constructor={} toString={} toLocaleString={} valueOf={} hasOwnProperty={} isPrototypeOf={} propertyIsEnumerable={}/>
      );  
    };
};
export default AuthPage;