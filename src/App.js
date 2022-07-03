import './App.css';
import { useState} from 'react';
import './Wheel.png'

const MAX_LIMIT=999999;
const MIN_LIMIT=100000

function App() {
  const [ticketList, setTicketList] = useState([])

  const maxLengthCheck = (item) => {
    if (item.target.value.length > item.target.maxLength) {
     item.target.value = item.target.value.slice(0, item.target.maxLength)
      }
    }
  const [input,setInput]=useState('');   // to store the input values as tiket num
   
  const getData=(val)=>{
    setInput(val.target.value)   // seting new value from input 
    console.log(input)
  }
 
  const handleClick=(val)=>{    // gui num click handler
    if(input.length<6){
      setInput(input.concat(val.target.name))
    }
  }

  function backspace(){      // backspace button function
    setInput(input.slice(0,-1))
  }
  function deleteButton(){    //delate button function
    setInput('')
  }

  function addTicket() {
    if (ticketList.length >= 5) { alert('Max ticket limit reached'); return;}
    if (+input < MIN_LIMIT) {alert(`Please insert value greater or equal to ${MIN_LIMIT}`); return;}

    setTicketList( arr => [...arr, input]);
    setInput('');
  }
  
  function Random(){
      setInput(Math.floor(Math.random() * (MAX_LIMIT - MIN_LIMIT + 1)) + MIN_LIMIT);
  }

  function deleteTicket(event, index) {
    console.log({index})
    ticketList.splice(index, 1);
    setTicketList( () => [...ticketList]);

  }

  return (
<div className="container">
    <h1>Ticket Generator</h1>
    <div id='main'>
        <div className='numcc'> <input type='number' value={input} maxLength="6" onInput={maxLengthCheck}
                onChange={getData} placeholder='enter 6 digit Num' />

            <div className='keypad'>
                <button name='7' onClick={handleClick}> 7 </button>
                <button name='8' onClick={handleClick}> 8 </button>
                <button name='9' onClick={handleClick}> 9 </button>
                <button name='4' onClick={handleClick}> 4 </button>
                <button name='5' onClick={handleClick}> 5 </button>
                <button name='6' onClick={handleClick}> 6 </button>
                <button name='1' onClick={handleClick}> 1 </button>
                <button name='2' onClick={handleClick}> 2 </button>
                <button name='3' onClick={handleClick}> 3 </button>
                <button onClick={backspace}> X </button>
                <button name='0' onClick={handleClick}> 0</button>
                <button onClick={deleteButton}> delete</button>

            </div>
            <button className='button' onClick={addTicket}> + Add Ticket </button>
        </div>

        <div className='wheelsec'>
            <p>Click The Wheel To Generate Random Tickets</p>
            <div onClick={Random}>
                <img src={ require("./Wheel.png") } height="250px" width="250px" />
            </div>
            <p>Ticket Num Range 100000-999999</p>


        </div>
    </div>
    <div className='ticketList'>
        <h3>your Tickets : </h3>
        <ul>
            {ticketList.map((t, i) => {
            return <li key={i}>
              <span className='ticketNumber'>ticket #{i+1}</span><br/><br/>
              {t} 
              <span className='ticketDel' onClick={ event => deleteTicket(event, i)}>X</span></li>
            })}
        </ul>
    </div>

</div>

  );
}

export default App;
