import * as React from 'react';
import {Button, Icon, Input,} from 'semantic-ui-react';

interface IState {
    phoneNumber: string;
    parameter: string;
}
interface IProps {
    addPhoneNumberToHistory: any;
    addParameter: any;
}

const isPhoneNumber = /^((7)+([0-9]){10})$/;
const isInteger = /^[0-9]*$/;

class PhoneNumberSearch extends React.Component<IProps, IState> {
    constructor(props: any){
        super(props);
        this.state = {
            parameter: '',
            phoneNumber: '',
        };
    };

    handlePhoneNumberInput = ({target: {value: phoneNumber}}: any) => {
        if (isInteger.test(phoneNumber) && phoneNumber.length <= 11) {
            this.setState({
                phoneNumber: phoneNumber ? `7${phoneNumber.substr(1)}` : '',
            });
        }
    };

    handleParametrInput = ({target: {value: parameter}}: any) => {
        this.setState({parameter: parameter});
    };

    handleKeyboardInput = (event: any) => {
        const {phoneNumber} = this.state;
        if (event.key === 'Enter' && isPhoneNumber.test(phoneNumber)) {
            this.props.addPhoneNumberToHistory(phoneNumber);
            this.setState({
                phoneNumber: '',
            });
        }
    };
    handleKeyPress = (event: any) => {
        const {parameter} = this.state;
        if (event.key === 'Enter') {
            this.props.addParameter(parameter);
            this.setState({
                parameter: '',
            });
        }
    };

    render() {
        const {phoneNumber, parameter} = this.state;
        const isButtonActive = isPhoneNumber.test(phoneNumber.toString());
        return (
            <div>
                <Input label={<Icon name={'phone'}/>}
                       name="numberInputValue"
                       value={phoneNumber}
                       onChange={this.handlePhoneNumberInput}
                       onKeyPress={this.handleKeyboardInput}
                       placeholder="7XXXXXXXXXX"
                       action={
                           <Button
                               disabled={!isButtonActive}
                               icon='search'
                               onClick={() => {
                                   this.setState({phoneNumber: ''});
                               }}
                           />
                       }
                />
                <Input
                    value={parameter}
                    onChange={this.handleParametrInput}
                    onKeyPress={this.handleKeyPress}
                    placeholder="parameter"
                    action={
                        <Button
                            disabled={!isButtonActive}
                            icon='search'
                            onClick={() => {
                                this.setState({parameter: ''});
                            }}
                        />
                    }
                />
            </div>
        );
    };

}

export default PhoneNumberSearch;
