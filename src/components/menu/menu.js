import { Link } from 'react-router-dom';
import styles from './menu.module.scss';
import { MdHome } from 'react-icons/md';
import { MdAreaChart } from 'react-icons/md';
import { MdPersonAdd } from 'react-icons/md';

//Käyttöliittymän alareunan menu-valikko, navigointilinkit 
//Koti, Tilastot ja Asetukset -sivuille.
function Menu() {
    return (
        <div className={styles.menu}>
            <div><Link to="/"><MdHome /></Link></div>
            <div><Link to="/stats"><MdAreaChart /></Link></div>
            <div><Link to="/settings"><MdPersonAdd /></Link></div>
        </div>
    );
}
export default Menu;
