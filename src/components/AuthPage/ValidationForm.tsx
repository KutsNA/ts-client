import * as React from 'react';
import {Container, Grid, Header, Segment, Form,} from 'semantic-ui-react';
import SberKidsLogo from "../Common/SberKidsLogo/SberKidsLogo";
import ValidationApi from '../API/ValidationApi';

interface IState {
    pincode: string;
    submittedPincode: string;
}

const isInteger = /^[0-9]*$/;

class ValidationForm extends React.Component<Object, IState> {
    constructor(props) {
        super(props);
        this.state = {
            pincode: '',
            submittedPincode: '',
        };
    };

    handleSubmit = () => {
        const { pincode } = this.state;
        this.setState({submittedPincode: pincode});
        this.validatePincode(this.state.submittedPincode);
    };

    handleChange = ({target: {value: pincode}}) => {
        if(isInteger.test(pincode))
            this.setState({pincode: pincode});
    };

    async validatePincode(submittedPincode: string) {
        try {
            const pincodeIsValid = ValidationApi.validatePincode(submittedPincode);
            if (pincodeIsValid) {
                alert('Pincode is correct! You are now able to continue working!');
            }
        } catch (error) {
            console.log(error);
            console.log('Pincode is incorrect!');
        }

    };

    render() {
        const {pincode} = this.state;
        return (
            <div className='pincode-form'>
                <Container fluid={true}>
                    <style>{`
                     body > div,
                     body > div > div,
                     body > div > div > div.pincode-form {
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
                                                placeholder='pincode'
                                                name='pincode'
                                                value={pincode}
                                                onChange={this.handleChange}/>
                                            <Form.Button content='Enter pincode'/>
                                        </Form>
                                    </Segment>
                                </Form>
                            </Container>
                        </Grid.Column>
                    </Grid>
                </Container>
            </div>
        );
    };
};

export default ValidationForm;