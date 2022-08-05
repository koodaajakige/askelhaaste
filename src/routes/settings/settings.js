import styles from './settings.module.scss';
import Button from '../../shared/uibuttons';
import { useUser, useAuth } from 'reactfire';
import { useHistory } from "react-router-dom";

//ASetukset ja profiilisivu
function Settings(props) {

    //Funktio noutaa kirjautuneen käyttäjän tiedot kuten profiilikuvan ja -nimen.
    const user = useUser();
    //Kirjautumisfunkion kutsu.
    const auth = useAuth();
    //useHistory()-koukku, istunnon selainhistorian työkalu.
    const history = useHistory();

    //Uloskirjautumisfunktio.
    const signOut = async () => {
        await auth.signOut();
        history.push('.');
        window.location.reload();
    }

    //Uuden osallistujan lisääminen.
    //Luodaan käsittelijä, jolle tapahtumakutsu. Estetään oletustoiminto.
    //Tallennetaan uusi osallistuja newname-vakioon nappia painettaessa.
    //Välitetään uusi nimi eteenpäin. Tyhjennetään lomake, kun uusi nimi tallennettu.
    const handleNameSubmit = (event) => {
        event.preventDefault();
        const newname = event.target.elements.name.value;
        props.onNameSubmit(newname);
        event.target.elements.name.value = "";
    }
    
    //Palautetaan Asetukset -sivu, jolla on käyttäjän profiilikuva, -nimi ja email-osoite,
    //sovelluksesta uloskirjautumisnappi, sekä liikuntahaasteen osallistujalistalomakekenttä, 
    //minkä avulla voi lisätä sovellukseen uusia jäseniä.
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