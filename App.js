import './App.css';
import React, { useState, useEffect } from 'react';
import axios from "./axios";
//import Select from 'react-select';



function App() {

  const [data,setData] = useState([]);
  const [fName,setfName] = useState('');
  const [fWins,setfWins] = useState(0);
  const [fLose,setfLose] = useState(0);
  const [fTie,setfTie] = useState(0);
  const [fScore,setfScore] = useState(0);
  const [sName,setsName] = useState('');
  const [sWins,setsWins] = useState(0);
  const [sLose,setsLose] = useState(0);
  const [sTie,setsTie] = useState(0);
  const [sScore,setsScore] = useState(0);
  let resultTeam1 = '';
  let resultTeam2 = '';

  //selecting two  teams and assigning win and lose or tie.
  useEffect(() => {
    axios.get('/teams')
    .then((response) => {
      const Data = response.data;
      setData(Data);
    })
    .catch(err => {
      console.log(err ,' error in getting data');
    });
  }, [])

/*
  useEffect(() => {
    console.log('rkishna')
    axios.post('/teams/update',resultTeam1)
    .then((response) => {
      console.log('updated successfully', response);
    })
    .catch(err => {
      console.log(err, ' failed to update');
    })
  }, [])
  useEffect(() => {
    axios.post('/teams/update',resultTeam2)
    .then((response) => {
      console.log('updated2 successfully', response);
    })
    .catch(err => {
      console.log(err, ' failed to update2');
    })
  }, [])
  */
/*
  useEffect(() => {
    if (firstTeam){
      data.map(item => {
      if (firstTeam === item.name){
        setFirstTeamData(Object.values(item));
        console.log('match team1',firstTeamData);
      }
    })
    }
  }, [])
  */

  const handleTeam1 = (e) => {
    var item;
    for (item of data){
      if (e.target.value === item.name){
        setfName(item.name);
        console.log(item.wins,item.lose,item.tie,item.score);
        setfWins(item.wins);
        setfLose(item.lose);
        setfTie(item.tie);
        setfScore(item.score);
        break;
      }
    }
  }

  const handleTeam2 = (e) => {
    var item;
    for (item of data) {
      if (e.target.value === item.name){
        //setSecondTeamData(Object.values(item));
        setsName(item.name);
        setsWins(item.wins);
        setsLose(item.lose);
        setsTie(item.tie);
        setsScore(item.score);
        break;
      }
    }
  }
  const declareResult = (e) => {
    if(e.target.value === 'winner'){
      resultTeam1 = {
        name:fName,
        wins:fWins+1,
        lose:fLose,
        tie:fTie,
        score:fScore+3
      }
      resultTeam2 = {
        name:sName,
        wins:sWins,
        lose:sLose+1,
        tie:sTie,
        score:sScore,
      }
    }
    else if(e.target.value === 'loser'){
      resultTeam1 = {
        name:fName,
        wins:fWins,
        lose:fLose+1,
        tie:fTie,
        score:fScore
      }
      resultTeam2 = {
        name:sName,
        wins:sWins+1,
        lose:sLose,
        tie:sTie,
        score:sScore+3,
      }
    }
    else {
        resultTeam1 = {
          name:fName,
          wins:fWins,
          lose:fLose,
          tie:fTie+1,
          score:fScore+1
        }
        resultTeam2 = {
          name:sName,
          wins:sWins,
          lose:sLose,
          tie:sTie+1,
          score:sScore+1,
        }
    }
  }

  const sendDetails = () => {
    axios.put(`/teams/update`,resultTeam2)
    .then((response) => {
      console.log('updated2 successfully', response);
    })
    .catch(err => {
      console.log(err, ' failed to update2');
    })

    axios.put(`/teams/update`,resultTeam1)
    .then((response) => {
      console.log('updated successfully', response);
    })
    .catch(err => {
      console.log(err, ' failed to update');
    })
    axios.get('/teams')
    .then(response => {
      setData(response.data);
    })
    .catch(err => {
      console.log(err , 'error getting the data updaated')
    })
  }

  var num = 1;






  return (
    <div className="app">
      <div className='user_selection'>
{/*
            <Select
              defaultValue={[option[2], option[3]]}
              isMulti
              name="teams"
              options={colourOptions}
              className="basic-multi-select"
              classNamePrefix="select"
            />
*/}
        <span> Select Team 1:</span>
        <select name="select1" onChange={handleTeam1}>
          {data.map(item => (
              <option value={item.name}>{item.name?item.name:'team1'}</option>
          ))}  
        </select >
        <span> Select Team 2:</span>
        <select name="select2" onChange={handleTeam2}>
        {data.map(item => (
          <option value={item.name}>{item.name}</option>
          ))}
        </select>
        <p className='para'>select Both teams to set winner and loser </p>
{ fName && sName && (
    <>
    <table id='teams'>
        <thead>
            <tr>
              <th>#</th>
              <th>Team Name</th>
              <th>Wins</th>
              <th>Lose</th>
              <th>Tie</th>
              <th>Score</th>
              <th>Declare</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>{fName}</td>
              <td>{fWins}</td>
              <td>{fLose}</td>
              <td>{fTie}</td>
              <td>{fScore}</td>
              <td><select onChange={declareResult}>
                    <option value='winner'>winner</option>
                    <option value='loser'>loser</option>
                    <option value='tie'>tie</option>
                  </select>
              </td>
            </tr>
            <tr>
              <td>2</td>
              <td>{sName}</td>
              <td>{sWins}</td>
              <td>{sLose}</td>
              <td>{sTie}</td>
              <td>{sScore}</td>
              <td>No need</td>
            </tr>
                </tbody>
          
        </table>
        <button type='submit' onClick={sendDetails}>submit</button>
        </>
  )

}
        
      </div>

        
      
     
      <div className='table'>
        <table id='teams'>
          <thead>
            <tr>
              <th>#</th>
              <th>Team Name</th>
              <th>Wins</th>
              <th>Lose</th>
              <th>Tie</th>
              <th>Score</th>
            </tr>
          </thead>
            <tbody>
              {data.map((item) => {
                return(
                <tr>
                  <td>{num++}</td>
                  <td>{item.name}</td>
                  <td>{item.wins}</td>
                  <td>{item.lose}</td>
                  <td>{item.tie}</td>
                  <td>{item.score}</td>
                </tr>
              )
            }
              )}
           
            </tbody>
      </table>
        
      </div>
    </div>
  );
}

export default App;
