import React, { useState } from 'react'
import NoImageSelected from '../../assets/no-image-selected.jpg'

function CreatePlant() {
    const [name, setName] = useState("");
    const [slug, setSlug] = useState("");
    const [waterLevel, setWaterLevel] = useState(0);
    const [sunLevel, setSunLevel] = useState(0);
    const [humidityLevel, setHumidityLevel] = useState(0);
    const [description, setDescription] = useState("");
    const [categories, setCategories] = useState([]);
    const [thumbnail, setThumbnail] = useState(null);
    const [submitted, setSubmitted] = useState("");
    const [image, setImage] = useState(NoImageSelected)

    const createPlant = async(event) => {
        event.preventDefault()
        //console.table([name, slug])

        const formData = new FormData();
        formData.append("name", name);
        formData.append("slug", slug);
        formData.append("thumbnail", thumbnail);
        formData.append("description", description);
        formData.append("category", categories);
        formData.append("waterLevel", waterLevel);
        formData.append("humidityLevel", humidityLevel);
        formData.append("sunLevel", sunLevel);

        try {
            const response = await fetch("https://greenmart-server-gamma.vercel.app/api/plants", {
                method: "POST",
                body: formData,
            })

            if(response.ok) {
                setName("")
                setSlug("")
                setSubmitted(true)
            } else {
                console.log("Failed to submit new data")
            }
        } catch (error) {
            console.log(error)
        }
    }

    /* const handleCategoryChange = (event) => {
        setCategories(event.target.value.split(',').map((c) => c.trim()))
    } */
    const handleCategoryChange = (event) => {
        setCategories(event.target.value)
    }

    const onImageChange = (event) => {
        if(event.target.files && event.target.files[0]) {
            setImage(URL.createObjectURL(event.target.files[0]))
            setThumbnail(event.target.files[0])
        }
    }


  return (
    <div>
        <h1>Add a New Plant</h1>
        <p>
            You can add your favorite plant here, along with the level of water, sunlight and humidity needed for the plant. 
            Don't forget to add a small description and a nice photo of the plant!
            As soon as you hit submit, this information will be saved in the Plants collection on MongoDB on the backend and show on the 'Plants' page on the frontend.
        </p>

        {submitted ? (
            <p>Data submitted successfully!</p>
            ) : (
                    <form className='plantdetails' onSubmit={createPlant}>
                        <div className='col-1'>
                            <label>Upload Thumbnail</label>
                            <img src={image} alt='Preview image'/>
                            <input 
                                onChange={onImageChange}
                                type='file' 
                                accept='image/gif, image/jpeg, image/png, image/jpg' 
                            />
                        </div>
        
                        <div className='col-2'>
                            <div>
                                <h3>Plant Details</h3>
                                <label>Plant Name</label>
                                <input 
                                    placeholder='Snake Plant'
                                    required
                                    type='text' 
                                    value={name} 
                                    onChange={(event) => setName(event.target.value)} />
                            </div>
                            <div>
                                <label>Slug</label>
                                <input 
                                    placeholder='snake-plant'
                                    required
                                    type='text' 
                                    value={slug} 
                                    onChange={(event) => setSlug(event.target.value)} />
                            </div>
                            <div>
                                <h3>Care Level 🥰</h3>
                                <p>This section shows how much water, sunlight and humidity are needed to maintain this plant. </p>
                                <p>1 = Not at all, 2 = Low, 3 = Medium, 4 = Moderate-Medium, 5 = High</p>
                                <label>Water Level</label>
                                <input 
                                    required
                                    type='text' 
                                    value={waterLevel} 
                                    onChange={(event) => setWaterLevel(event.target.value)} 
                                />
                                <label>Sun Level</label>
                                <input 
                                    required
                                    type='text' 
                                    value={sunLevel} 
                                    onChange={(event) => setSunLevel(event.target.value)} 
                                />
                                <label>Humidity Level</label>
                                <input 
                                    required
                                    type='text' 
                                    value={humidityLevel} 
                                    onChange={(event) => setHumidityLevel(event.target.value)} 
                                />
                            </div>
                            <div>
                                <h3>Description</h3>
                                <textarea 
                                    placeholder='Write a short paragraph about the plant'
                                    rows='4'
                                    cols='50'
                                    type='text' 
                                    value={description} 
                                    onChange={(event) => setDescription(event.target.value)} />
                            </div>
                            {/* <div>
                                <label>Categories (comma-separated)</label>
                                <input 
                                    type='text' 
                                    value={categories}
                                    onChange={handleCategoryChange} 
                                />
                            </div> */}
                            <h3>Categories</h3>
                            <p>Choose a category your plant belongs to</p>
                            <div className='filters'>
                                <select onChange={handleCategoryChange}>
                                    <option value=''>All</option>
                                    <option value='lowlight'>Low Light Plants</option>
                                    <option value='airpurifying'>Air Purifying Plants</option>
                                    <option value='easycare'>Easy Care Beginner PLants</option>
                                    <option value='petfriendly'>Pet Friendly Plants</option>
                                    <option value='hangingplant'>Hanging Plants</option>
                                    <option value='outdoorplant'>Outdoor Plants</option>
                                </select>
                            </div>
        
                            <input type='submit' />
                        </div>
                    </form>
        )} 
    </div>
  )
}

export default CreatePlant