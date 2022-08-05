import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { useFirestore, useFirestoreCollectionData, useUser } from 'reactfire';
import 'firebase/firestore';
import 'firebase/auth';
import styles from './app.module.scss';
import Header from '../header';
import Content from '../content';
import Items from '../../routes/items';
import Stats from '../../routes/stats';
import Settings from '../../routes/settings';
import AddItem from '../../routes/additem';
import EditItem from '../../routes/edititem';
import Menu from '../menu';
import { ButtonAppContainer} from '../../shared/uibuttons';
//import testdata from '../../testdata.js';

//Komponentti renderöi sovelluksen sisällön.
function App() {

  //Tallennetaan data ja osallistujalistat funktion avulla, lähtökohtana tyhjä taulukko.
  const [data, setData] = useState([]);
  const [namelist, setNamelist] = useState([]);

  //Funktio noutaa kirjautuneen käyttäjän tiedot kuten profiilikuvan ja -nimen.
  const user = useUser();

  //Tiedon, data-tietueen, pilvitallennus Firestoreen.
  const itemCollectionRef = useFirestore().collection('user').doc(user.data.uid).collection('item');
  const { data: itemCollection } = useFirestoreCollectionData(itemCollectionRef.orderBy("today", "desc"), {initialData: [], idField: "id"});

  //Nimilistan pilvitallennus Firestoreen.
  const nameCollectionRef = useFirestore().collection('user').doc(user.data.uid).collection('name');
  const { data: nameCollection } = useFirestoreCollectionData(nameCollectionRef.orderBy('name'), { initialData: []});

  //useEffectille annetaan 2 arvoa: toinen on funktio, joka tekee toiminnallisuuden 
  //ja toinen lista niistä tilanteista, jolloin toiminnallisuus tapahtuu.
  //Käytetään useEffectiä merkintöjen listan käsittelyssä.
  useEffect(() => {
    setData(itemCollection);
  }, [itemCollection]);

  //Käytetään useEffectiä osallistujalistan käsittelyssä.
  useEffect(() => {
    const types = nameCollection.map(obj => obj.name);
    setNamelist(types);
  }, [nameCollection]);

  //Itemin käsittelijä, joka lähetetään eteenpäin merkinnän lisäämiseksi
  //saa parametrinä lisättävän itemin.
  const handleItemSubmit = (newitem) => {
    itemCollectionRef.doc(newitem.id).set(newitem);

    /* Uuden merkinnän lisäys suorituksiin. 
    Ei käytetä lopullisessa pilvitallentavassa sovelluksessa.
    let storeddata = data.slice();
    const index = storeddata.findIndex(item => item.id === newitem.id);
    if (index >= 0 ) {
      storeddata[index] = newitem;
    } else {
    storeddata.push(newitem);
    }

    Järjestetään suoritukset päivämäärien mukaan laskevaan järjestykseen.
    storeddata.sort( (a,b) => {
      const aDate = new Date(a.today);
      const bDate = new Date(b.today);
      return bDate.getTime() - aDate.getTime();   
    } );

    Listan päivitys.
    setData(storeddata);
    */
  }

  //Tiedon poistaminen. Funktio saa parametrina poistettavan tiedon id:n.
  //Id:n mukainen merkintä poistetaan.
  const handleItemDelete = (id) => {
    itemCollectionRef.doc(id).delete();
    /*Tiedon tallennus, välivaihe ennen pilvitallennusta. 
    Filteröidään poistettava item.
    let storeddata = data.slice();
    storeddata = storeddata.filter(item => item.id !== id);
    setData(storeddata);
    */
  }

  //Lisää uuden nimen osallistujien listaan.
  const handleNameSubmit = (newname) => {
    nameCollectionRef.doc().set({name: newname});
    /* Nimilistan uudelleenjärjestys (ei käytetä lopullisessa 
      pilvitallentavassa sovelluksessa).
    let storednamelist = namelist.slice();
    storednamelist.push(newname);
    storednamelist.sort();
    setNamelist(storednamelist);
    */
  }

  //Sovelluksen renderöinti. Pääsivu, tilastot, asetukset, tietojen lisäys ja muokkaus.
  //Koko sovellus on kääritty apukomponentin ButtonAppContainerin avulla, jotta 
  //merkinnän lisäys -nappi saadaan sijoittumaan sivulle oikein.
  return (
    <ButtonAppContainer>
      <div className={styles.app}>
        <Router>
          <Header />
          <Content>
            <Route exact path="/">
              <Items data={data} />
            </Route>
            <Route path="/stats">
              <Stats data={data} />
            </Route>
            <Route path="/settings">
              <Settings types={namelist} onNameSubmit={handleNameSubmit}/>
            </Route>
            <Route path="/add">
              <AddItem onItemSubmit={handleItemSubmit} types={namelist} />
            </Route>
            <Route path="/edit/:id">
              <EditItem onItemSubmit={handleItemSubmit} data={data} types={namelist} onItemDelete={handleItemDelete} />
            </Route>
          </Content>
          <Menu />
        </Router>
      </div>
    </ButtonAppContainer>
  );
}

export default App;
