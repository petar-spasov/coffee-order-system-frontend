import React from "react";
import {NavLink} from "react-router-dom";

type Props = {
    path: string,
}

const Link: React.FC<Props> = ({path, children}) => {
    return (
        <NavLink to={path}>{children}</NavLink>
    );
}

 export default Link;
