import React, { useContext, useEffect, useState } from 'react'
import Header from '../components/header/Header'
import { covidContext } from '../context/CovidApi';
import WorldMapChart from '../components/worldmapchart/WorldMapChart';
import symptom from '../assets/symptom.png'
import map from '../assets/map.png'

const Dashboard = () => {
    const [topFiveActiveCasesState, setTopFiveActiveCasesState] = useState([]);
    const [allStateData, setAllStateData] = useState({
        Cases: 0,
        Death: 0,
        Recovered: 0
    });
    const data = useContext(covidContext);

    useEffect(() => {

        const covidTotalData = data && data.length > 0 && data.filter((item) => item.state === 'Total');
        console.log(covidTotalData, 'covidTotalDatacovidTotalData')
        const topTenActiveState = data && data.length > 0 && data.filter((item) => item.state !== 'Total').sort((a, b) => parseInt(b.active) - parseInt(a.active)).slice(0, 5);
        if (covidTotalData && topTenActiveState) {
            setAllStateData({
                Cases: covidTotalData[0].active,
                Death: covidTotalData[0].deaths,
                Recovered: covidTotalData[0].recovered
            });
            setTopFiveActiveCasesState([...topTenActiveState]);
        }
    }, [data]);

    return (
        <>
            <div className='container'>
                <div className='row'>
                    <Header />
                    <div className='col-md-10 col-sm-12'>
                        <section className='totalcases w-100 '>
                            <div className=' d-md-flex flex-sm-column  flex-md-row justify-content-between '>
                                {Object.keys(allStateData).map((key, index) => (
                                    <div className='col-md-3 col-sm-12 mx-2 my-4' key={index}>
                                        <div className="card border-0 bg-light  p-4">
                                            <div className="card-body bg-light">
                                                <h5 className="card-title bg-light">{key}</h5>
                                                <p className="card-text bg-light">{allStateData[key]}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                        <section className='state_chart w-100 mt-4 '>
                            <div className='col-md-12  d-md-flex flex-sm-column  flex-md-row justify-content-between '>
                                <div className='col-md-6 col-sm-12 d-flex bg-light'>
                                    <div>
                                        <ul class="list-group list-group-flush">
                                            <li class="list-group-item border-bottom-0" style={{ fontSize: '10px' }}> Top  5 Active Cases state </li>
                                            {topFiveActiveCasesState.length > 0 && topFiveActiveCasesState.map((state) => {
                                                return (
                                                    <>
                                                        <li class="list-group-item border-bottom-0 pb-0">{state.active} Active cases in {state.state}</li>
                                                    </>
                                                )
                                            })}
                                        </ul>
                                    </div>
                                    <div className='chart__container bg-light' style={{ height: '200px', }}>
                                        <WorldMapChart allStateData={allStateData} />
                                    </div>
                                </div>
                                <div className='col-md-6 col-sm-12'>
                                    <img src={map} width='100%' height='100%' alt='map' />
                                </div>
                            </div>
                        </section>
                    </div>
                    <div className='col-md-2 bg-light'>
                        <ul class="list-group list-group-flush">
                            <li class="list-group-item border-bottom-0" style={{ fontSize: '10px' }}> Top  5 Active Cases state </li>
                            {topFiveActiveCasesState.length > 0 && topFiveActiveCasesState.map((state) => {
                                return (
                                    <>
                                        <li class="list-group-item border-bottom-0 pb-0">{state.active} Active cases in {state.state}</li>
                                    </>
                                )
                            })}
                        </ul>
                        <img className='mt-4' src={symptom} width={'100%'} alt='symptom' />
                    </div>
                </div>
            </div>
        </>
    );
}

export default Dashboard;
