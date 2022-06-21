import styles from './settings.module.scss';
import Button from '../../shared/uibuttons';

function Settings(props) {

    const handleNameSubmit = (event) => {
        event.preventDefault();
        const newname = event.target.elements.name.value;
        props.onNameSubmit(newname);
        event.target.elements.name.value = "";
    }

    return (
        <div className={styles.settings}>
            <h2>Asetukset</h2>
            <h3>Osallistujat</h3>
            <div className={styles.settings_types}>
                {props.types.map((type) => <div key={type}>{type}</div>)}
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