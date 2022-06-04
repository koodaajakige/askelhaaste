import styles from './menu.module.scss';
import { MdViewList } from 'react-icons/md';
import { MdAreaChart } from 'react-icons/md';
import { MdPersonAdd } from 'react-icons/md';

function Menu() {
    return (
        <div className={styles.menu}>
            <div><MdViewList /></div>
            <div><MdAreaChart /></div>
            <div><MdPersonAdd /></div>
        </div>
    );
}
export default Menu;