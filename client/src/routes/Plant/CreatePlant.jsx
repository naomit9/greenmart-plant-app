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
            const response = await fetch("http://localhost:3000/api/plants", {
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

    const handleCategoryChange = (event) => {
        setCategories(event.target.value.split(',').map((c) => c.trim()))
    }

    const onImageChange = (event) => {
        if(event.target.files && event.target.files[0]) {
            setImage(URL.createObjectURL(event.target.files[0]))
            setThumbnail(event.target.files[0])
        }
    }


  return (
    <div>
        <h1>Create Plant</h1>
        <h2>subheading for this page</h2>
        <p>to add a paragraph</p>

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
                                    type='text' 
                                    value={name} 
                                    onChange={(event) => setName(event.target.value)} />
                            </div>
                            <div>
                                <label>Slug</label>
                                <input 
                                    type='text' 
                                    value={slug} 
                                    onChange={(event) => setSlug(event.target.value)} />
                            </div>
                            <div>
                                <h3>Care Level 🥰</h3>
                                <label>Water Level</label>
                                <input 
                                    type='text' 
                                    value={waterLevel} 
                                    onChange={(event) => setWaterLevel(event.target.value)} 
                                />
                                <label>Sun Level</label>
                                <input 
                                    type='text' 
                                    value={sunLevel} 
                                    onChange={(event) => setSunLevel(event.target.value)} 
                                />
                                <label>Humidity Level</label>
                                <input 
                                    type='text' 
                                    value={humidityLevel} 
                                    onChange={(event) => setHumidityLevel(event.target.value)} 
                                />
                            </div>
                            <div>
                                <label>Description</label>
                                <textarea 
                                    rows='4'
                                    cols='50'
                                    type='text' 
                                    value={description} 
                                    onChange={(event) => setDescription(event.target.value)} />
                            </div>
                            <div>
                                {/* <h3>Categories</h3> */}
                                <label>Categories (comma-separated)</label>
                                <input 
                                    type='text' 
                                    value={categories}
                                    onChange={handleCategoryChange} 
                                />
                            </div>
        
                            <input type='submit'/>
                        </div>
                    </form>
        )} 
    </div>
  )
}

export default CreatePlant