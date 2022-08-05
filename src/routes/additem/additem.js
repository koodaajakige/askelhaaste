import styles from './additem.module.scss';
import ItemForm from '../../components/itemform';

//Uuden merkinnän lisääminen.
//Palautetaan lomakesivu. 
//Välitetään propsien kautta eteenpäin uuden suorituksen tiedot.
function AddItem(props) {
    return (
      <div className={styles.additem}>
        <h2>Uusi suoritus</h2>
        <ItemForm onItemSubmit={props.onItemSubmit} types={props.types} />
      </div>
    );
}

export default AddItem;