import styles from './header.module.scss';
import { MdOutlineDirectionsWalk } from 'react-icons/md';

//Kaikilla sovelluksen sivuilla käytettävä komponentti, otsakepalkki.
function Header() {
    return(
        <div className={styles.header}>
            <div>Askelhaaste</div>
            <div><MdOutlineDirectionsWalk /></div>
        </div>
    );
}

export default Header;