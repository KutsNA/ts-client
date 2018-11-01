import * as React from 'react';
import InputComponent from './InputComponent'
import ValidationApi from '../API/ValidationApi'

interface IState {
    login: string;
    password: string;
    pincode: string;
    validUser: boolean;
    validPincode: boolean;
    errorMessage: string;
    hideError: boolean;
}

const isInteger = /^[0-9]*$/;
const isToken = /^[0-9]{6}$/;

class InputContainer extends React.Component<Object, IState> {
    constructor(props: any) {
        super(props);
        this.state = {
            login: '',
            password: '',
            pincode: '',
            validUser: false,
            validPincode: false,
            errorMessage: '',
            hideError: true,
        };
    };

    handleChange = (event, {name, value}) => this.setState({[name]: value});

    handleSubmit = () => {
        const {login, password} = this.state;
        console.log(this.state);
        this.validateUser(login, password);

    };

    handlePincodeInput = ({target: {value: pincode}}) => {
        if (isInteger.test(pincode))
            this.setState({pincode: pincode});
    };

    handlePincodeSubmit = () => {
        const {pincode} = this.state;
        if (isToken.test(pincode)) {
            console.log(this.state);
            this.validatePinCode(pincode);
        }
        else
            console.log('Pincode is incorrect');
    };

    async validatePinCode(pincode: string) {
        try{
            const validPincode = ValidationApi.validatePincode(pincode);
            this.setState({validPincode});
        } catch (error) {
            this.setState({hideError: false, errorMessage: error});
        }
    };

    async validateUser(submittedLogin: string, submittedPassword: string) {
        try{
            const validUser = await ValidationApi.validateUser(submittedLogin, submittedPassword);
            this.setState({validUser});
        } catch (error) {
            console.log(error.message);
            this.setState({hideError: false, errorMessage: error.message});
        }
        //this.setState({validUser: true});
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
        const {validUser, login, password, pincode, hideError, errorMessage} = this.state;

        const fieldsToRequire = [
            {
                name: 'login',
                value: login,
            },
            {
                name: 'password',
                value: password,
            },
        ];

        const pincodeField = [
            {
                name: 'pincode',
                value: pincode,
            }];

        return (
            <div className='login-form'>
                <style>{`
                            body > div,
                            body > div > div,
                            body > div > div > div.login-form {
                            height: 100%;
                            `}
                </style>
                {
                    validUser ?
                        <InputComponent pincode={true} fields={pincodeField} handleChange={this.handlePincodeInput}
                                        handleSubmit={this.handleSubmit} hideError={hideError} errorBody={errorMessage}/> :
                        <InputComponent pincode={false} fields={fieldsToRequire} handleChange={this.handleChange}
                                        handleSubmit={this.handleSubmit} hideError={hideError} errorBody={errorMessage}/>
                }
            </div>
        );
    };
}

export default InputContainer;