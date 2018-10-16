import * as React from 'react';
import {Button, Icon, Input,} from 'semantic-ui-react';
import UserLogsApi from '../../API/UserLogsApi';

interface IState {
    phoneNumber: string;
}

interface IProps {
    addPhoneNumber: any;
    getUserLogs: any;
}

const isPhoneNumber = /^((7)+([0-9]){10})$/;
const isInteger = /^[0-9]*$/;

class PhoneNumberSearch extends React.Component<IProps, IState> {
    constructor(props: any) {
        super(props);
        this.state = {
            phoneNumber: '',
        };
        this.getLogs = this.getLogs.bind(this);
    };

    handlePhoneNumberInput = ({target: {value: phoneNumber}}: any) => {
        if (isInteger.test(phoneNumber) && phoneNumber.length <= 11) {
            this.setState({
                phoneNumber: phoneNumber ? `7${phoneNumber.substr(1)}` : '',
            });
        }
    };
     handleKeyboardInput = (event: any) => {
        const {phoneNumber} = this.state;
        if (event.key === 'Enter' && isPhoneNumber.test(phoneNumber)) {
            this.props.addPhoneNumber(phoneNumber);

            this.setState({
                phoneNumber: '',
            });
        }
    };

    async getLogs(phoneNumber: string) {
        try {
            const logs = await UserLogsApi.getRegistrationLogs(phoneNumber);
            return logs;
        } catch (error) {
            console.log(error);
        }
    };

    render() {
        const {phoneNumber} = this.state;
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
                               onClick={async () => {
                                   const logs = await this.getLogs(this.state.phoneNumber);
                                   this.props.getUserLogs(logs);
                                   console.log(logs);
                                   this.setState({phoneNumber: ''});
                               }}
                           />
                       }
                />
            </div>
        );
    };

}

export default PhoneNumberSearch;
