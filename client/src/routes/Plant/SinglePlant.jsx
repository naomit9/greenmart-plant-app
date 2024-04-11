import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'

function SinglePlant() {
    const [data, setData] = useState([])
    const urlSlug = useParams()
    const baseUrl = `https://greenmart-server-gamma.vercel.app/api/plants/${urlSlug.slug}`;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(baseUrl)

                if (!response.ok) {
                    throw new Error("Failed to fetch data!")
                }

                const jsonData = await response.json();
                setData(jsonData);

            } catch (error) {
                console.log(error)
            }
        }
        fetchData();
    }, [])

    function WaterLevelFunc({waterNeeded}) {
        const waterLevel = [];

        for (let i = 0; i < waterNeeded; i++) {
            waterLevel.push(<span key={i}>💧</span>)
        }
        return <>
                <p className='care-container'>Water Level: {waterLevel}</p>
            </> 
    }

    function SunLevelFunc({sunNeeded}) {
        const sunLevel = [];

        for (let i = 0; i < sunNeeded; i++) {
            sunLevel.push(<span key={i}>☀️</span>)
        }
        return <>
                <p className='care-container'>Sun Level: {sunLevel}</p>
            </> 
    }

    function HumidityLevelFunc({humidityNeeded}) {
        const humidityLevel = [];

        for (let i = 0; i < humidityNeeded; i++) {
            humidityLevel.push(<span key={i}>🌧️</span>)
        }
        return <>
                <p className='care-container'>Humidity Level: {humidityLevel}</p>
            </> 
    }

    return (
        <div>
            {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
            <Link to={'/plants'}>Back to Plants 🪴</Link>

            <div className='plantdetails'>
                <div className='col-1'>
                    <img src={`https://greenmart-server-gamma.vercel.app/uploads/${data?.thumbnail}`} alt={data.name} />
                    <Link to={`/editplant/${data.slug}`}>Edit</Link>
                </div>
                <div className='col-2'>
                    <h1>{data?.name}</h1>
                    <p>{data?.description}</p>

                    <WaterLevelFunc waterNeeded={data?.waterLevel} />
                    <SunLevelFunc sunNeeded={data?.sunLevel}/>
                    <HumidityLevelFunc humidityNeeded={data?.humidityLevel} />

                    <p>Category</p>
                        <ul>{data?.category?.map((item, index) => (
                            <li key={index}>{item}</li>
                        ))}</ul>
                </div>
            </div>
        </div>
    )
}

export default SinglePlant