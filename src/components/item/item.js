import styles from './item.module.scss';
import { MdPlayArrow } from 'react-icons/md';
import { FcLike } from "react-icons/fc";
import { FcOk } from "react-icons/fc";
import {FcHighPriority } from "react-icons/fc";
import {FcBadDecision } from "react-icons/fc";
import { Link } from 'react-router-dom';

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

  let result;
  if (average >= 10000) {
    result = <FcLike />;
  }

  else if (average >= 7500) {
    result = <FcOk />;
  }

  else if (average >= 5000) {
    result = <FcBadDecision />;
  }

  else{
    result = <FcHighPriority />;
  }

  return(
    <div className={styles.item}>
      <div className={styles.item_data}>
          <div className={styles.item_name}>{props.data.name}</div>
          <div className={styles.item_steps}>{props.data.steps}</div>
          <div className={styles.item_date}>{today}</div>
          <div className={styles.item_timespan}>{period}</div>
          <div>{result}</div>
          <div className={styles.item_average}>{average?  average + " askelta/pv" : ""}</div>
      </div>
        <div className={styles.item_edit}>
          <Link to={"/edit/"+props.data.id}><MdPlayArrow /></Link>
        </div>
      </div>
    );
}

export default Item;
