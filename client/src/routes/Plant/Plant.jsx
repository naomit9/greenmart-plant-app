import React, { useState, useEffect } from 'react'
import { Link, json } from 'react-router-dom'

function Plant() {
  const baseUrl = 'https://greenmart-server-gamma.vercel.app/api/plants';
  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selectedCategory, setSelectedCategory] = useState("")
  const [search, setSearch] = useState("")

  useEffect(() => {
    const fetchData = async () => {
      try {

        let url = baseUrl;
        if(selectedCategory) {
          url += `?category=${selectedCategory}`
        }
        if(search) {
          url +=  `?search=${search}`
      }

        const response = await fetch(url)
        if (!response.ok) {
          throw new Error("Failed to fetch data!")
        }

        const jsonData = await response.json();
        setData(jsonData);
        setIsLoading(false);

        const sort = jsonData.sort((a,b) => a.name.localeCompare(b.name))

      } catch (error) {
        console.log(error)
        setError("Error fetching data. Please try again later.")
        setIsLoading(false)
      }
    }
    fetchData();
  }, [selectedCategory, search])

  return (
    <div>
      <h1>Plant Dashboard</h1>
      <p>This is a dashboard where you can add new plants, edit and delete existing plants. 
        Here, you can search for the name of the plant you want and filter them by the following categories: 
        Low Light, Pet Friendly, Easy Care for Beginners, Air Purifying, Hanging Plants and Outdoor Plants.
      </p>
      {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
      <Link to='/createplant'>+ Add New Plant</Link>

      <div className='search'>
        <label>Search Plants</label>
        <input 
          className='search-input'
          onChange={(event) => setSearch(event.target.value)}
        />
      </div>

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
          {data.filter((item) => {
                return search.toLowerCase() === '' ? item: item.name.toLowerCase().includes(search)
          }).map((item) => (
            <li key={item._id}>
              <Link to={`/plants/${item.slug}`}>
                <img src={`https://greenmart-server-gamma.vercel.app/uploads/${item.thumbnail}`} alt={item.name} />
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