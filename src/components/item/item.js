import styles from './item.module.scss';

function Item(props) {
    return(
      <div className={styles.item}>
        <div className={styles.item_data}>
            <div className={styles.item_name}>Tiina</div>
            <div className={styles.item_steps}>17850</div>
            <div className={styles.item_date}>1.6.2022</div>
            <div className={styles.item_timespan}>28.5.2022 - 31.5.2022</div>
        </div>
      </div>
    );
}

export default Item;