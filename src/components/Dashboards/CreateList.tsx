import * as React from 'react';

export interface IProps {
    phoneNumbersArray: Array<string>;
    parametr: string;
}
function CreateList({phoneNumbersArray, parametr}: IProps){
    const phoneNumbers = phoneNumbersArray;
        const listOfElements: any = phoneNumbers.map(el => {
            console.log('create list ' + el);
            return(<li>{el.toString()}</li>);
        });
        return (
            <div className="createListElement">
                {parametr}
                <ul>
                    {listOfElements}
                </ul>
            </div>
        );

}

export default CreateList;