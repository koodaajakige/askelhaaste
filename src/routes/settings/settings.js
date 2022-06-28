import styles from './settings.module.scss';
import Button from '../../shared/uibuttons';
import { useUser, useAuth } from 'reactfire';


function Settings(props) {

    const user = useUser();
    const auth = useAuth();

    const signOut = async () => {
        await auth.signOut();
    }

    const handleNameSubmit = (event) => {
        event.preventDefault();
        const newname = event.target.elements.name.value;
        props.onNameSubmit(newname);
        event.target.elements.name.value = "";
    }

    return (
        <div className={styles.settings}>
            <h2>Asetukset</h2>

            <h3>Profiili</h3>

            <div className={styles.settings_profile}>
              <div className={styles.settings_user}>
                <div><img src={user.data.photoURL} alt="" /></div>
                <div>{user.data.displayName}<br/>{user.data.email}</div>
              </div>
              <div>
                <Button primary onClick={signOut}>Kirjaudu ulos</Button>
              </div>
            
            </div>

            <h3>Osallistujat</h3>
            <div className={styles.settings_types}>
                {props.types.map((name) => <div key={name}>{name}</div>)}
                <form onSubmit={handleNameSubmit}>
                    <div className={styles.typeform}>
                        <input type="text" name="name" />
                        <Button type="submit" secondary>LISÄÄ</Button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Settings;