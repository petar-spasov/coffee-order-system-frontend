import React, {useContext} from 'react';
import styles from './Navigation.module.scss';
import Link from "../../atoms/Link/Link";
import {useHistory} from "react-router-dom";
import {AuthContext} from "../../../authContext/AuthContext";

const Navigation = () => {

    const authContext = useContext(AuthContext);
    const history = useHistory();

    const logout = () => {
        authContext.logout();
        history.push('/');
    }
    return (
        <>

            <div className={styles.navigationWrapper}>
                {!authContext.authenticated ?

                        <div className={styles.linksWrapper}>
                            <Link path={'/login'}>Anmelden</Link>
                            <Link path={'/register'}>Registrieren</Link>
                        </div>
                     :
                    <>
                        <div className={styles.linksWrapper}>
                            <Link path={'/'}>Bestellen</Link>
                            <Link path={'/orders'}>Alle Bestellungen</Link>
                        </div>
                        <p onClick={() => logout()}>Abmelden</p>
                    </>
                }
            </div>
        </>
    );
}

export default Navigation;
