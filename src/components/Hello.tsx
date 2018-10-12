import * as React from 'react';

export interface IProps {
    name: string;
    enthusiasmLevel?: number;
    message: string;
}

function Hello({ name, enthusiasmLevel = 1 , message}: IProps) {
    if (enthusiasmLevel <= 0) {
        throw new Error('You could be a little more enthusiastic. :D');
    }

    return (
        <div className="hello">
            <div className="greeting">
                Hello {name + getExclamationMarks(enthusiasmLevel)} You {message}
            </div>
        </div>
    );
}

export default Hello;

// helpers

function getExclamationMarks(numChars: number) {
    return Array(numChars + 1).join('!');
}