import styles from './edititem.module.scss';
import ItemForm from '../../components/itemform';
import { useParams } from 'react-router-dom';

//Aiemmin luodun merkinnän muokkaaminen ja poisto lomakkeella.
function EditItem(props) {

    //React Routerin useParams() koukku URL-parametrien arvon saamiseksi. 
    //Kutsuttaessa useParams() palauttaa objektin, 
    //joka yhdistää URL-parametrien nimet niiden arvoihin nykyisessä URL-osoitteessa.

    //Noudetaan muokattavan merkinnän id-parametri.
    const { id } = useParams();
    //Noudetaan muokattavan merkinnän id:tä vastaava indeksi.
    const index = props.data.findIndex(item => item.id === id);
    //Haetaan yksittäinen merkintä taulukosta.
    let item = props.data[index];

    //Palautetaan lomakesivu. 
    //Välitetään propsien kautta eteenpäin tallennettava/poistettava tieto.
    return (
      <div className={styles.edititem}>
        <h2>Merkinnän muokkaaminen</h2>
        <ItemForm onItemSubmit={props.onItemSubmit} data={item} types={props.types} onItemDelete={props.onItemDelete} />
      </div>
    );
}

export default EditItem;