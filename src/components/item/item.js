import styles from './item.module.scss';
//import { MdOutlineArrowForwardIos } from 'react-icons/md';
import { MdPlayArrow } from 'react-icons/md';

function Item(props) {

  const locale = "fi-Fi";
  const today = new Date(props.data.today).toLocaleDateString(locale);

  let average;
  let period;
  if (props.data.periodStart && props.data.periodEnd) {
    const periodStart = new Date(props.data.periodStart);
    const periodEnd = new Date(props.data.periodEnd);
    period = periodStart.toLocaleDateString(locale) + " - " + periodEnd.toLocaleDateString(locale);
    const days = ((periodEnd - periodStart) / (1000*60*60*24))+1;
    average = parseInt(props.data.steps / days);
  }

  else{
    average = props.data.steps;
  }

  return(
    <div className={styles.item}>
      <div className={styles.item_data}>
          <div className={styles.item_name}>{props.data.name}</div>
          <div className={styles.item_steps}>{props.data.steps}</div>
          <div className={styles.item_date}>{today}</div>
          <div className={styles.item_timespan}>{props.data.periodStart}-{props.data.periodEnd}</div>
          <div></div>
          <div className={styles.item_average}>{average?  average + " askelta/pv" : ""}</div>
      </div>
        <div className={styles.item_edit}>
          <div><MdPlayArrow /></div>
        </div>
      </div>
    );
}

export default Item;
