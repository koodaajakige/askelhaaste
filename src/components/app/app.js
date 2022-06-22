import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
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
import testdata from '../../testdata.js';

function App() {

  const [data, setData] = useState([]);
  const [namelist, setNamelist] = useState([]);

  useEffect(() => {
    setData(testdata);
    setNamelist(["Kerttu", "Arttu", "Ville", "Pirkko", "Valtteri", "Juuso"])
  }, []);

  const handleItemSubmit = (newitem) => {
    let storeddata = data.slice();
    const index = storeddata.findIndex(item => item.id === newitem.id);
    if (index >= 0 ) {
      storeddata[index] = newitem;
    } else {
    storeddata.push(newitem);
    }

    storeddata.sort( (a,b) => {
      const aDate = new Date(a.today);
      const bDate = new Date(b.today);
      return bDate.getTime() - aDate.getTime();   
    } );

    setData(storeddata);
  }

  const handleItemDelete = (id) => {
    let storeddata = data.slice();
    storeddata = storeddata.filter(item => item.id !== id);
    setData(storeddata);
  }

  const handleNameSubmit = (newname) => {
    let storednamelist = namelist.slice();
    storednamelist.push(newname);
    storednamelist.sort();
    setNamelist(storednamelist);
  }

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
