import React from 'react'

export default function ImageUpload() {
  const [caption, setCaption] = useState('')

  return (
    <div>
      <input 
        type="text" 
        placeholder="Enter a caption" 
        onChange={event => setCaption(event.target.value)}
        value={caption}>
      </input>
      <input type="file" onChange="handleChange"></input>
      <Button onClick={handleUpload}>
        Upload
      </Button>
    </div>
  )
}
