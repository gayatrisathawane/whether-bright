import { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';
import cloud from './clouds.png';
import visibility from './view.png'
import wind from './speedometer.png'
import humidity from './humidity.png'
import pressure  from './down-arrow.png'

function App() {
  const[weatherData,setWeatherData]=useState({})
  const[city,setCity]=useState('pune')
const[weatherDataDescription,setweatherDataDescription]=useState("")

  async function loadweatherData(){
    try{
    const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}
    &appid=d86fbbbed5891c355a672c96d08a996b`)
    setWeatherData(response.data)
    console.log(response.data)

  }
  catch(error){
    console.log("error");
  }
}
  

  useEffect(()=>{
    loadweatherData();

  },[])

  useEffect(()=>{
    setweatherDataDescription(weatherData?.weather?.[0]?.description);

  },[weatherData])

  useEffect(()=>{
       loadweatherData();
  },[city])


  return (
    <div className="app">
          <h1 className='tittle'>WHETHER <span style={{color:"blue"}}>BRIGHT</span></h1>

          <input type="text"  value={city} onChange={(e)=>{
            setCity(e.target.value)
          }} className='searchbar' placeholder="search city"/>

          <p className='cityname'>{weatherData?.name}</p>
          
          <div className='temp'> 
          <img src={cloud} className='cloud'/>
          <div className='tempdesc'>
          <h1 className='temp-tittle'>{(weatherData?.main?.temp -  273).toFixed(2) } °C</h1>
          <p className='description'>{weatherDataDescription}</p>
            </div>
           
           </div>
          
           <p className='feelslike'> 🌡 Feels like : {(weatherData?.main?.feels_like -273).toFixed(2)}°C</p>

         
         <div className="flex-box-container">
          <div className="child-flex">
          <div className='visi'>
          <img src={humidity} className='visibilty'/>
          <div className="divpropery">

          <p className='descproperty'>Humidity</p>
          <p className='descans'>{weatherData?.main?.humidity} F</p>
         
          </div>
          </div>
          </div>

          <div className="child-flex">
          <div className='visi'>
          <img src={pressure} className='visibilty'/>
          <div className="divpropery">

          <p className='descproperty'>pressure</p>
          <p className='descans'>{weatherData?.main?.pressure} pa</p>
         
          </div>
          </div>
          </div>


          <div className="child-flex">
          <div className='visi'>
          <img src={wind} className='visibilty'/>
          <div className="divpropery">

          <p className='descproperty'>wind</p>
          <p className='descans'>{weatherData?.wind?.speed} Km/h</p>
          </div>
          </div>
         

          </div>

          <div className="child-flex">
            <div className='visi'>
            <img src={visibility} className='visibilty'/>
               <div className="divpropery">
          <p className='descproperty'>visibility</p>
          <p className='descans'>{weatherData.visibility} Mtr</p>
          </div>
         </div>
          </div>






         </div>
         
     </div>
  );
}

export default App;
