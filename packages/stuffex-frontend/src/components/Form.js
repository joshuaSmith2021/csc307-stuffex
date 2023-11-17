import React, { useState, useRef } from 'react'

function Form(props) {
  const [item, setItem] = useState({
    title: '',
    images: [],
    description: '',
  })

  const fileInputRef = useRef(null)

  function submitForm() {
    props.handleSubmit(item)
    setItem({ title: '', images: [], description: '' })

    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  function handleChange(event) {
    const { name, value } = event.target
    setItem((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  function handleImageChange(event) {
    const files = Array.from(event.target.files)

    files.forEach((file) => {
      const reader = new FileReader()
      reader.onloadend = () => {
        setItem((prevState) => ({
          ...prevState,
          images: [...prevState.images, reader.result],
        }))
      }
      reader.readAsDataURL(file)
    })
  }

  function handleDeleteImage(indexToDelete) {
    setItem((prevState) => ({
      ...prevState,
      images: prevState.images.filter((_, index) => index !== indexToDelete),
    }))
  }

  return (
    <form>
      <label htmlFor="title">Title</label>
      <input
        type="text"
        name="title"
        id="title"
        value={item.title}
        onChange={handleChange}
      />

      <label htmlFor="images">Image Upload</label>
      <input
        type="file"
        name="images"
        id="images"
        ref={fileInputRef}
        onChange={handleImageChange}
        multiple
      />

      {/* Displaying uploaded images horizontally with fixed space */}
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {item.images.map((imageSrc, index) => (
          <div
            key={index}
            style={{
              marginRight: '10px',
              marginBottom: '10px',
              width: '100px', // Set a fixed width for the image container
              backgroundColor: 'white', // Set background color to white
              display: 'flex',
              flexDirection: 'column', // Stack items vertically
            }}
          >
            <img
              src={imageSrc}
              alt={`uploaded-${index}`}
              style={{
                maxWidth: '100%',
                maxHeight: '100%', // Ensure the image fits within the container
                display: 'block',
                margin: 'auto', // Center the image horizontally
              }}
            />
            <button type="button" onClick={() => handleDeleteImage(index)}>
              Delete
            </button>
          </div>
        ))}
      </div>

      <label htmlFor="description">Description</label>
      <input
        type="text"
        name="description"
        id="description"
        value={item.description}
        onChange={handleChange}
      />

      <input type="button" value="Submit" onClick={submitForm} />
    </form>
  )
}

export default Form
