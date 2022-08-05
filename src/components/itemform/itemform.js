import styles from './itemform.module.scss';
import Button from '../../shared/uibuttons';
import useForm from '../../shared/useform';
import { useHistory } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

//Suoritusmerkinnän käsittelylomake: uuden merkinnän lisääminen
//tai vanhan merkinnän muokkaaminen.
function ItemForm(props) {
  //Muodostetaan useHistory()-koukku, istunnon selainhistorian työkalu.
  const history = useHistory();

  //Määritetään mitä tapahtuu lomakkeen lähetysvaiheessa. 
  //Otetaan kopio oliosta, mikä on tallennettu lomakkeella values-muuttujiin. 
  //Muokataan askelien arvo tekstimuodosta luvuksi.
  //Määritetään tiedolle id-arvo.
  //Kutsutaan onItemSubmit-toiminnallisuutta, tallennetaan tieto.
  //Navigointi takaisin pää- eli aloitussivulle history-hooksin avulla.
  const submit = () => {
    let storedvalues = Object.assign({}, values);
    storedvalues.steps = parseFloat(storedvalues.steps);
    storedvalues.id = storedvalues.id ? storedvalues.id : uuidv4();
    props.onItemSubmit(storedvalues);
    history.push("/");
  }

  //Asetetaan alkutilanne lomakkeen merkinnöille.
  //Osallistujalistasta oletukseksi 1. alkio osallistujista.
  //Askelten määrä on lähtökohtaisesti 0.
  //Kirjauspäivälle asetetaan oletukseksi kyseinen tämä päivä.
  //Suorituskauden alku- ja loppupäivät tyhjiksi kentiksi. Voidaan jättää merkitsemättä.
  const initialState = props.data ? props.data : {
    name: props.types ? props.types[0] : "",
    steps: 0,
    today: new Date().toISOString().substring(0,10),
    periodStart: "",
    periodEnd:"" 
  };

  //Hooksien käyttö lomakkeen käsittelyyn. 
  const {values, handleChange, handleSubmit} = useForm(submit, initialState, false);

  //Paluu ja navigointi selainhistoriassa edelliselle sivulle.
  const handleCancel = (event) => {
    event.preventDefault();
    history.goBack();
  }

  //Merkinnän poisto. Käsittelijä, jolta poistetaan oletustoiminto.
  //Välitetään poistettavan tiedon id.
  //Navigointi takaisin pää- eli aloitussivulle historyn avulla.
  const handleDelete =(event) => {
    event.preventDefault();
    props.onItemDelete(values.id);
    history.push("/");
  }

  //Lomakkeella kirjattujen tietojen tallennus/lisäys tilanteen mukaan.
  //Required -määritelmä niillä kentillä, mihin vaaditaan kirjaus eli ei voida jättää tyhjäksi.
  //Askelten määrän porrasväli nuolivalitsijasta 10 askelta kerrallaan.
  //Napit: peruuta (palaataan alkusivulle), tallenna/lisää (riippuen onko lomakesivuksi valittu 
  //suorituksen muokkaus/lisäys) ja poista (poistaa merkinnän alkusivulta).
  return (
    <div>
        <form onSubmit={handleSubmit}>
          <div className={styles.form}>

            <div className={styles.form_row}>
              <div>
                <label htmlFor="name">Nimi</label>
                <select name="name" onChange={handleChange} value={values.name} required>
                    { props.types.map( (name) => <option key= {name} value={name}>{name}</option> ) }
                </select>
              </div>
            </div>

            <div className={styles.form_row}>
              <div>
                <label htmlFor="steps">Askeleet</label>
                <input type="number" name="steps" step="10" onChange={handleChange} value={values.steps} required />
              </div>
              <div>
                <label htmlFor="today">Tänään</label>
                <input type="date" name="today" onChange={handleChange} value={values.today} required />
              </div>
            </div>

            <div className={styles.form_row}>
              <div>
                <label htmlFor="periodStart">Suorituksen alku</label>
                <input type="date" name="periodStart" onChange={handleChange} value={values.periodStart}/>
              </div>
              <div>
                <label htmlFor="periodEnd">Suorituksen loppu</label>
                <input type="date" name="periodEnd" onChange={handleChange} value={values.periodEnd}/>
              </div>
            </div>

            <div className={styles.form_button}>
              <div>
                <Button onClick={handleCancel}>PERUUTA</Button>
              </div>
              
              <div>
                <Button secondary type="submit">{ props.data ? "TALLENNA" : "LISÄÄ" }</Button>
              </div>

              { props.onItemDelete ?
              <div>
                <Button primary onClick={handleDelete}>POISTA</Button>
              </div> : ""}
            </div>
          </div>
        </form>
    </div>
  );
}

export default ItemForm;