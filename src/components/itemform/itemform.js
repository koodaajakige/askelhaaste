import styles from './itemform.module.scss';
import Button from '../../shared/uibuttons';
import useForm from '../../shared/useform';
import { useHistory } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

function ItemForm(props) {

  const history = useHistory();

  const submit = () => {
    let storedvalues = Object.assign({}, values);
    storedvalues.amount = parseFloat(storedvalues.amount);
    storedvalues.id = storedvalues.id ? storedvalues.id : uuidv4();
    props.onItemSubmit(storedvalues);
    history.push("/");
  }

  const initialState = props.data ? props.data : {
    name: "",
    steps: 0,
    today: "",
    periodStart: "",
    periodEnd:"" 
  };

  const {values, handleChange, handleSubmit} = useForm(submit, initialState, false);

  const handleCancel = (event) => {
    event.preventDefault();
    history.goBack();
  }

  const handleDelete =(event) => {
    event.preventDefault();
    props.onItemDelete(values.id);
    history.push("/");
  }

  return (
    <div>
        <form onSubmit={handleSubmit}>
          <div className={styles.form}>

            <div className={styles.form_row}>
              <div>
                <label htmlFor="name">Nimi</label>
                <select name="name" onChange={handleChange} value={values.name} >
                    { props.types.map( (name) => <option key= {name} value={name}>{name}</option> ) }
                </select>
              </div>
            </div>

            <div className={styles.form_row}>
              <div>
                <label htmlFor="steps">Askeleet</label>
                <input type="number" name="steps" step="10" onChange={handleChange} value={values.steps}/>
              </div>
              <div>
                <label htmlFor="today">Tänään</label>
                <input type="date" name="today" onChange={handleChange} value={values.today}/>
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