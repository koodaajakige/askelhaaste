import styles from './header.module.scss';
import { MdOutlineDirectionsWalk } from 'react-icons/md';

function Header() {
    return(
        <div className={styles.header}>
            <div>Askelhaaste</div>
            <div><MdOutlineDirectionsWalk /></div>
        </div>
    );
}

export default Header;