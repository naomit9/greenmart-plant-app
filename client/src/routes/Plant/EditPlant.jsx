import React, { useState, useEffect } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom';
import NoImageSelected from '../../assets/no-image-selected.jpg'

function EditPlant() {
    const navigate = useNavigate()
    const urlSlug = useParams()
    const baseUrl = `http://localhost:3000/api/plants/${urlSlug.slug}`

    const [plantID, setPlantID] = useState("");
    const [name, setName] = useState("");
    const [slug, setSlug] = useState("");
    const [waterLevel, setWaterLevel] = useState(0);
    const [sunLevel, setSunLevel] = useState(0);
    const [humidityLevel, setHumidityLevel] = useState(0);
    const [description, setDescription] = useState("");
    const [categories, setCategories] = useState([]);
    const [thumbnail, setThumbnail] = useState(null);
    const [submitted, setSubmitted] = useState("");
    const [image, setImage] = useState()

    const fetchData = async () => {
        try {
            const response = await fetch(baseUrl)
            if (!response.ok) {
                throw new Error("Failed to fetch data")
            }
            const data = await response.json()
            setPlantID(data._id)
            setName(data.name)
            setSlug(data.slug)
            setWaterLevel(data.waterLevel)
            setSunLevel(data.sunLevel)
            setHumidityLevel(data.humidityLevel)
            setDescription(data.description)
            setCategories(data.category)
            setThumbnail(data.thumbnail)


        } catch (error) {

        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    const updatePlant = async (event) => {
        event.preventDefault()
        //console.table([name, slug])

        const formData = new FormData();
        formData.append("plantID", plantID)
        formData.append("name", name);
        formData.append("slug", slug);
        formData.append("description", description);
        formData.append("category", categories);
        formData.append("waterLevel", waterLevel);
        formData.append("humidityLevel", humidityLevel);
        formData.append("sunLevel", sunLevel);

        if (thumbnail) {
            formData.append("thumbnail", thumbnail);
        }

        try {
            const response = await fetch("http://localhost:3000/api/plants", {
                method: "PUT",
                body: formData,
            })

            if (response.ok) {
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
        if (event.target.files && event.target.files[0]) {
            setImage(URL.createObjectURL(event.target.files[0]))
            setThumbnail(event.target.files[0])
        }
    }

const removePlant = async (event) => {
    event.preventDefault()

    try {
        const response = await fetch(
            `http://localhost:3000/api/plants/${plantID}`, 
            {
                method: "DELETE"
            }
        )
        if(response.ok) {
            navigate("/plants")
            console.log("Plant is removed.")
        }
    } catch (error) {
        console.log(error)
    }
}
    return (
        <div>
            <h1>Edit Plant</h1>
            <p>This is where we fill out the form to edit Plant input</p>

            <button onClick={removePlant} className='delete'>
                Delete
            </button>

            {submitted ? (
                <p>Data submitted successfully!</p>
            ) : (
                <form className='plantdetails' onSubmit={updatePlant}>
                    <div className='col-1'>
                        <label>Upload Thumbnail</label>

                        {image ? (
                            <img src={`${image}`} alt='Preview image' />
                        ) : (
                            <img src={`http://localhost:3000/uploads/${thumbnail}`} alt='Preview image' />
                        )}
                        <input
                            onChange={onImageChange}
                            type='file'
                            accept='image/gif, image/jpeg, image/png, image/jpg'
                        />
                    </div>

                    <div className='col-2'>
                        <div>
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
                            <p>Care Level 🥰</p>
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
                            <label>Categories (comma-separated)</label>
                            <input
                                type='text'
                                value={categories}
                                onChange={handleCategoryChange} />
                        </div>

                        <input type='submit' />
                    </div>
                </form>
            )}
        </div>
    )
}

export default EditPlant