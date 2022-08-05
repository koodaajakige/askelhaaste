import styles from './stats.module.scss';
import { Line, LineChart, XAxis, YAxis, ResponsiveContainer, Label, CartesianGrid, Tooltip, Pie, PieChart, LabelList, Legend, Cell } from 'recharts';
import randomColor from 'randomcolor';

//Tilastot-sivu, jolla kuvataan viivadiagrammissa ryhmän aktiivisuus.

//Viivadiagrammin alla on ympyrädiagrammi, josta nähdään askelten kokonaisjakauma osallistujittain.
//Tooltip, selittävä tekstikenttä, ilmestyy näkyviin osoitettaessa kohdetta hiirellä.
function Stats (props) {

    //Tehdään alkuperäisille yksittäisille tiedoille (=item) mäppäys ja luodaan uusi taulukko.
    //Tämän uuden taulukon tiedot, päivämäärät ja askeleet, voidaan käyttää suoraan viivakaavion piirtämisessä.
    const linedata = props.data.map(item => ({ date: new Date(item.today).getTime(), steps: item.steps }));

    //Luodaan apufunktio reducer, jonka avulla ryhmitellään kuljetut askeleet indeksihaun avulla osallistujittain.
    const reducer = (groupedData, item) => {
        const index = groupedData.findIndex( arrayItem => arrayItem.name === item.name );
        if (index >= 0) {
            groupedData[index].steps = groupedData[index].steps + item.steps;
        } else {
            groupedData.push({name: item.name, steps: item.steps});
        }
        return groupedData;
    }
    
    //Koostetaan reducer-funktiosta piedata-taulukko, jossa on osallistujittain 
    //heidän suoritustensa yhteisaskelmäärät.
    //Taulukkoa tarvitaan piirakkadiagrammin luomisessa.
    const piedata = props.data.reduce(reducer, []);

    //Määritetään ympyräkaaviossa  eri osallistujen lohkot erivärisiksi piecolors-taulukon avulla.
    //Värit määrittyvät kullakin latauskerralla satunnaisesti eritavoin.
    const piecolors = randomColor({count: piedata.length, luminosity: 'bright', seed: "askelhaaste"});

    //Kaaviosivun tulostus ja palautus.
    //x-akseli kuvaa suorituspäiviä. XAxis määrittelee viivakaavion x-akselin määreet.  
    //y-akseli kuvaa kuljettuja askelmääriä/suoritus. YAxis määrittelee viivakaavion y-akselin määreet.
    //Tickformatter muotoilee päivämäärät luettavaan muotoon.
    //CartesianGrid strokeDasharray lisää viivakaavioon taustaviivoituksen.
    //ResponsiveContainer käärii viiva- ja ympyräkaaviot, jolloin niiden kokoa suhteessa sivuun voidaan skaalata.
    //LabelList lisää piirakkakaavioon kunkin osallistujan yhteisaskeleet piirakkalohkon sisälle.
    //Legend lisää piirakkakaavion alle osallistujalistan ja väriopasteen. 
    return (
        <div className={styles.stats}>
            <h2>Tilastot</h2>
            <h3>Ryhmän aktiivisuus</h3>

            <ResponsiveContainer width={"100%"} height={360}>
              <LineChart data={linedata} margin={{ top: 20, left: 20, right: 20, bottom: 40}}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" 
                        dataKey="date"
                        domain={["dataMin", "dataMax"]}
                        scale="time"
                        tickFormatter={timeStr => new Date(timeStr).toLocaleDateString("fi-FI")}
                />
                <YAxis>
                    <Label value="askeleet"
                           position="left"
                           angle={-90}
                           style={{ textAnchor: "middle"}} />
                </YAxis>


                <Line dataKey="steps" name="suoritus" unit=" askelta" />  
                <Tooltip labelFormatter={value => new Date(value).toLocaleDateString("fi-FI")} />
              </LineChart>
            </ResponsiveContainer>

            <h3>Askeleet / osallistuja</h3>

            <ResponsiveContainer width={"100%"} height={360}>
              <PieChart>
                <Pie data={piedata} dataKey="steps" nameKey="name">
                  <LabelList dataKey="steps" position="inside" />
                  { piecolors.map(color => <Cell fill={color} key={color} />) }
                </Pie>
                <Legend />
                <Tooltip formatter={value => value + " askelta"} />
              </PieChart>
            </ResponsiveContainer>

        </div>
    );
}

export default Stats;