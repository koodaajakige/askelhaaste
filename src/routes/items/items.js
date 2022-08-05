import { Link } from 'react-router-dom';
import Item from '../../components/item';
import { FloatingButton, ButtonContainer } from '../../shared/uibuttons';

//Komponentti vastaa yksittäisten merkintöjen tulostamisesta.
function Items (props) {

    //Käydään läpi kaikki yksittäiset merkinnät avain-arvo -pareina.
    const items = props.data.map((item) => <Item key={item.id} data={item} />);

    //Palautetaan merkinnän tiedot.
    //Leijuvasta napista linkki tietojen lisäykseen.
    //ButtonContainer -apukomponentti käärii sisällön, jotta linkkinappi 
    //saadaan muotoiltua halutusti.
    return(
      <ButtonContainer>
        <div>
            { items }
            <Link to="/add"><FloatingButton secondary>+</FloatingButton></Link>
        </div>
      </ButtonContainer>
    );
}

export default Items;