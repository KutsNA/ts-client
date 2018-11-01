import {Message} from "semantic-ui-react";
import * as React from "react";

export interface IProps {
    errorBody: string;
    hidden: boolean;
};

export default function MessageComponent({errorBody, hidden}:IProps) {
    return (
        <Message
            style={{maxWidth: 450}}
            error
            header='There was some errors with your submission'
            hidden={hidden}
            content={errorBody}
        />
    );
}