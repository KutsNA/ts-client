import * as React from 'react';
import Logo from './logo.png';

function SberKidsLogo() {
    const style = {
        color: 'white', fontSize: '1em', paddingLeft: '0.3em', textDecoration: 'underline'
    };

    return (
        <React.Fragment>
            <img  src={Logo} alt='Логотип СберКидс' />
            <span style={style}>СберKids</span>
        </React.Fragment>
    );
}

export default SberKidsLogo;
