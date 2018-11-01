import {Container, Header, Segment, Grid, Form} from "semantic-ui-react";
import SberKidsLogo from "../Common/SberKidsLogo/SberKidsLogo";
import InputForm from './InputForm';
import MessageComponent from './MessageComponent';
import * as React from "react";

export interface IProps {
    handleSubmit: any;
    handleChange: any;
    pincode: boolean;
    fields: Array<any>;
    hideError: boolean;
    errorBody: string;
}

export default function InputComponent({fields, handleSubmit, handleChange, hideError, errorBody}: IProps) {

    const fieldsToRender = fields.map(field => <InputForm handleChange={handleChange} field={field}/>);

    return (
        <Container fluid={true}>
            <Grid textAlign='center' style={{height: '100%'}} verticalAlign='middle'>
                <Grid.Column style={{maxWidth: 450}}>
                    <Header as='h2' color='teal' textAlign='center'>
                        <SberKidsLogo/> Log-in to your account
                    </Header>
                    <Container textAlign={'center'}>
                        <Form onSubmit={handleSubmit} size='large'>
                            <Segment stacked>
                                <Form>
                                    {fieldsToRender}
                                    <Form.Button content='Submit'/>
                                </Form>
                            </Segment>
                        </Form>
                        <MessageComponent errorBody={errorBody} hidden={hideError}/>
                    </Container>
                </Grid.Column>
            </Grid>
        </Container>
    );
}