import styles from './stats.module.scss';
import { Line, LineChart, XAxis, YAxis, ResponsiveContainer, Label, CartesianGrid, Tooltip, Pie, PieChart, LabelList, Legend, Cell } from 'recharts';
import randomColor from 'randomcolor';


function Stats(props) {

    const linedata = props.data.map(item => ({ date: new Date(item.today).getTime(), steps: item.steps }));

    const reducer = (groupedData, item) => {
      const index = groupedData.findIndex( arrayItem => arrayItem.name === item.name);
      if (index >= 0) {
        groupedData[index].steps = groupedData[index].steps + item.steps;
      } else {
        groupedData.push({name: item.name, steps: item.steps });
      }
      return groupedData;
    }

    const piedata = props.data.reduce(reducer, []);
    const piecolors = randomColor({count: piedata.length, seed: "askelhaaste"});

    return (
        <div className={styles.stats}>
          <h2>Tilastot</h2>
          <h3>Askeleet aikajanalla</h3>

          <ResponsiveContainer width={"100%"} height={360}>
            <LineChart data={linedata} margin={{ top: 20, left: 20, right: 20, bottom: 20}} >
              <CartesianGrid strokeDasharray= "3 3" />
              <XAxis  type="number" 
                      dataKey="date" 
                      domain={["dataMin", "dataMax"]} 
                      scale="time" 
                      tickFormatter={timeStr => new Date(timeStr).toLocaleDateString("fi-FI")}
              />
              <YAxis>
                <Label  value="askeleet"
                        position="left" 
                        angle={-90}
                        style={{ textAnchor: "middle" }} />
              </YAxis>
              <Line dataKey="steps" name="suoritukset" unit=" askelta" />
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
              <Tooltip formatter={value => value + " askelta"}/>
            </PieChart>
          </ResponsiveContainer>

        </div>
    )
}

export  default Stats;