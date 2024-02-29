import React, { useEffect, useState } from 'react'
import { createContext } from 'react';
export const covidContext = createContext(null);

const CovidApiProvider = (props) => {
    const [ covidData, setCovidData ] = useState([]);

    const fetchCovidApiFunc = async()=>{
        const url = 'https://data.covid19india.org/data.json';
        const getCovidData = await fetch(url);
        const parseCovidData = await getCovidData.json();
        console.log(parseCovidData)
        setCovidData([...covidData, ...parseCovidData.statewise])
    }

    useEffect(()=>{
        fetchCovidApiFunc();
    }, [])

  return (
    <>
    <covidContext.Provider value={covidData}>
    {props.children}
    </covidContext.Provider>
    </>
  )
}

export default CovidApiProvider