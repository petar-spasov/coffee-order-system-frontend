import React from "react";
import styles from './Header.module.scss'

export enum Tag {
    H1= 'h1',
    H2 = 'h2',
    H3 = 'h3',
    H4 = 'h4',
    H5 = 'h5',
    H6 = 'h6',
}

type Props = {
    text: string,
    Element: Tag,
}

const Header: React.FC<Props> = ({text, Element}) => {


    return (
        <Element className={styles.header}>
            {text}
        </Element>
    );

}

export default Header;
