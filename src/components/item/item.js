import styles from './item.module.scss';
import { MdPlayArrow } from 'react-icons/md';
import { FcLike } from "react-icons/fc";
import { FcOk } from "react-icons/fc";
import {FcHighPriority } from "react-icons/fc";
import {FcBadDecision } from "react-icons/fc";
import { Link } from 'react-router-dom';

//Komponentti tulostaa yksittäisen merkinnän tiedot, linkki merkinnän muokkaukseen.
function Item(props) {

  //Määritetään Suomen aikavyöhyke.
  const locale = "fi-Fi";
  //Määritetään suorituksen kirjauksen oletuspäivä, tämä päivä (=today).
  const today = new Date(props.data.today).toLocaleDateString(locale);

  //Selvitetään aikavälillä (=period), keskimäärin kuljetut askeleet/pv (=average).
  //Määritetään suorituksen alku- ja loppupäivämäärät (=periodStart ja periodEnd).
  //Lasketaan suoritusaikavälin päivien lukumäärä (=days).
  let average;
  let period;
  if (props.data.periodStart && props.data.periodEnd) {
    const periodStart = new Date(props.data.periodStart);
    const periodEnd = new Date(props.data.periodEnd);
    period = periodStart.toLocaleDateString(locale) + " - " + periodEnd.toLocaleDateString(locale);
    const days = ((periodEnd - periodStart) / (1000*60*60*24))+1;
    average = parseInt(props.data.steps / days);
  }

  //Mikäli suorituksen alku- ja loppupäivämääriä ei ole määritelty, suorituksen askeleet ovat 
  //yhdeltä päivältä eli keskimäärin kuljetut askeleet/pv = suorituksen askelmäärä.
  else{
    average = props.data.steps;
  }
  
  //Määritetään keskimääräisen päiväkohtaisen askelsuorituksen oikeuttama "tsemppikuvake":
  //10 000 askelta ja yli /pv = punainen sydän (optimi liikuntasuoritus),
  //7 500 askelta ja yli / pv = vihreä ok (liikuntaa on riittävästi),
  //5 000 askelta ja yli / pv = keltainen varoitus (pitäisi liikkua hieman enemmän),
  //alle 5000 askelta / pv = punainen !-hälytys (aivan liian vähän liikuntaa päivän aikana).
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

  //Palautetaan tulostuksena yksittäisen suorituksen tiedot.
  //Linkki nuolikuvakkeesta suorituksen muokkaukseen.
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
