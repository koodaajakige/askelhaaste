import { MdOutlineDirectionsWalk } from 'react-icons/md';
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
          <div className={styles.header2}>
            <div>Askelhaaste</div>
            <div><MdOutlineDirectionsWalk /></div>
          </div>
            <div>Tervetuloa käyttämään Askelhaaste -kuntoilusovellusta.
            <div>Kirjaa päivittäiset askeleesi ja haastaa ystäväsikin liikkumaan!</div>
            <div>Kirjaudu sisään Google-tunnuksillasi.</div>
          </div>
          <div></div>
          <Button onClick={signIn} secondary>Kirjaudu sisään</Button>
        </div>
    );
}

export default Startup;

