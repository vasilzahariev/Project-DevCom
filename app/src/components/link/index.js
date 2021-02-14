import styles from './index.module.css';
import { useState } from 'react';

const Link = (props) => {
    const [style, setStyle] = useState({color: props.color, textDecoration: 'none', transition: '1s all'});

    const onHover = () => {
        console.log('tes');
        setStyle({
            color: props.hover
        });
    }

    const onAbort = () => {
        console.log('tes2');
        setStyle({
            color: props.color
        });
    }

    return(
        <a href={props.to} style={style} onFocus={onHover} onAbort={onAbort}>{props.children}</a>
    );
}

export default Link;
