import uibuttons from '../../shared/uibuttons';
import styles from './startup.module.scss';
import Button from '../../shared/uibuttons';
import firebase from 'firebase/app';
import { useAuth } from 'reactfire';

function Startup (props) {

    const auth = useAuth();

    const signIn = async () => {
        await auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
    }

    return (
        <div className={styles.startup}>
            <h1>Askelhaaste</h1>
            <div>Tervetuloa käyttämään Askelhaaste -kuntoilusovellusta,
                 johon voit kirjata päivittäiset askeleesi.
                 Kirjaudu sisään Google-tunnuksillasi käyttääksesi sovellusta.
            </div>
            <Button onClick={signIn} secondary>Kirjaudu sisään</Button>
        </div>
    );
}

export default Startup;