import React, { useState, useEffect } from 'react'
import { Link, json } from 'react-router-dom'

function Plant() {
  const baseUrl = 'http://localhost:3000/api/plants';
  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selectedCategory, setSelectedCategory] = useState("")

  useEffect(() => {
    const fetchData = async () => {
      try {

        let url = baseUrl;
        if(selectedCategory) {
          url += `?category=${selectedCategory}`
        }

        const response = await fetch(url)
        if (!response.ok) {
          throw new Error("Failed to fetch data!")
        }

        const jsonData = await response.json();
        setData(jsonData);
        setIsLoading(false);

      } catch (error) {
        console.log(error)
        setError("Error fetching data. Please try again later.")
        setIsLoading(false)
      }
    }
    fetchData();
  }, [selectedCategory])

  return (
    <div>
      <h1>Plants</h1>
      <h2>Always Believe Good Things Happen with Plants.</h2>
      {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
      <Link to='/createplant'>+ Add New Plant</Link>

      <div className='filters'>
        <label>Categories</label>
          <select onChange={(event) => setSelectedCategory(event.target.value)}>
            <option value=''>All</option>
            <option value='lowlight'>Low Light Plants</option>
            <option value='airpurifying'>Air Purifying Plants</option>
            <option value='easycare'>Easy Care Beginner PLants</option>
            <option value='petfriendly'>Pet Friendly Plants</option>
            <option value='hangingplant'>Hanging Plants</option>
            <option value='outdoorplant'>Outdoor Plants</option>
          </select>
      </div>

      {isLoading ? (<p>Loading...</p>) : error ? (<p>{error}</p>) : (
        <ul className='plants'>
          {data.map((item) => (
            <li key={item._id}>
              <Link to={`/plants/${item.slug}`}>
                <img src={`http://localhost:3000/uploads/${item.thumbnail}`} alt={item.name} />
                <h3>{item.name}</h3>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default Plant