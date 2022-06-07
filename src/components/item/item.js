import styles from './item.module.scss';
//import { MdOutlineArrowForwardIos } from 'react-icons/md';
import { MdPlayArrow } from 'react-icons/md';

function Item(props) {
    return(
      <div className={styles.item}>
        <div className={styles.item_data}>
            <div className={styles.item_name}>KERTTU</div>
            <div className={styles.item_steps}>17850</div>
            <div className={styles.item_date}>1.6.2022</div>
            <div className={styles.item_timespan}>28.5.2022 - 31.5.2022</div>
        </div>
        <div className={styles.item_edit}>
          <div><MdPlayArrow /></div>
        </div>
      </div>
    );
}

export default Item;
