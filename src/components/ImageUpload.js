import { useState } from 'react';
import { Button } from '@material-ui/core';
import firebase from 'firebase/app';
import { storage, db } from 'service/firebase';

export default function ImageUpload({username}) {
  const [image, setImage] = useState(null)
  const [progress, setProgress] = useState(0)
  const [caption, setCaption] = useState('')


  const handleFile = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0])
    }
  }

  const handleUpload = (e) => {
    const uploadTask = storage.ref(`images/${image.name}`).put(image)

    uploadTask.on('state_changed',
      (snapshot) => {
        // progress bar
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        )
        setProgress(progress)
      },
      (error) => {
        console.log(error.message)
      },
      () => {
        // successful uplo
        storage.ref('images').child(image.name).getDownloadURL()
        .then(url => {
          db.collection("posts").add({
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            caption: caption,
            imageUrl: url,
            username: username
          })

          setImage(null)
          setProgress(0)
          setCaption('')
        })
      }
    )
  }

  return (
    <div>
      <progress value={progress} max="100" />
      <input 
        type="text" 
        placeholder="Enter a caption" 
        onChange={event => setCaption(event.target.value)}
        value={caption}>
      </input>
      <input type="file" onChange={handleFile}></input>
      <Button onClick={handleUpload}>Upload</Button>
    </div>
  )
}
