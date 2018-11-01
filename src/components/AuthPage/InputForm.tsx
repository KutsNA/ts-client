import {Form} from "semantic-ui-react";
import * as React from "react";

export interface IProps {
    handleChange: any;
    field: {
        name: string;
        value: string;
    };
}

export default function InputForm({field, handleChange}: IProps) {
    return (
        <Form.Input
            required
            placeholder={field.name}
            name={field.name}
            value={field.value}
            onChange={handleChange}/>
    );
};