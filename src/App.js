import { useEffect, useRef, useState } from 'react';
import './App.css';

function App() {
  const [isLoaded,setIsLoaded] = useState(false);
  const [data,setData] = useState([]);
  const [error,setError] = useState(new Error());
  const [cep,setCep] = useState("");
  const inputEl = useRef(null);

  useEffect(() => {
      fetch(`https://brasilapi.com.br/api/cep/v1/${cep}`)
        .then(res => res.json())
        .then(
          (result) => {
            setIsLoaded(true);
            setData(result);
            console.log(result);
          },
          (error) => {
            setIsLoaded(true);
            setError(error);
            console.log(error);
          }
        )
    },[cep])

  function searchCep(event){
      setCep(inputEl.current.value)
  }

  return (
    <div className="App">
          <h1>buscador de CEP</h1>
          <input ref={inputEl} type="text"/>
          <button onClick={searchCep}>BUSCAR</button>
          {
            
            data 
            &&

            <div>
                  <h1>{data.city}</h1>
                  <span>{data.neighborhood}</span>
                  <h1>{data.cep}</h1>
                  <h1>{data.street}</h1>
                  <h1>{data.service}</h1>
                  <h1>{data.state}</h1>
              </div>
          }
    </div>
  );
}

export default App;
