import { useState, useEffect } from 'react'
import '../styles/Post.css'
import { Avatar } from '@material-ui/core'
import { db } from 'service/firebase'
import firebase from 'firebase/app';

export default function Post({ postId, user, username, caption, imageUrl }) {
  const [comments, setComments] = useState([])
  const [comment, setComment] = useState('')

  useEffect(() => {
    let unsubscribe
    if (postId) {
      // populate comments on postId from db
      unsubscribe = db.collection('posts').doc(postId)
        .collection('comments').orderBy('timestamp', 'asc').onSnapshot((snapshot) => {
          setComments(snapshot.docs.map((doc) => doc.data()))
      })
    }

    return () => {
      unsubscribe()
    }
  }, [postId])

  const postComment = (event) => {
    event.preventDefault()

    // store current user comment into comments collection of postId
    db.collection('posts').doc(postId).collection('comments').add({
      username: user.displayName,
      text: comment,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    })
    setComment('')
  }

  return (
    <div className="post">
      <div className="post__header">
        <Avatar
          className="post__avatar"
          src=""
          alt="Cool"
        >
          {username[0]}
        </Avatar>
        <h3>{username}</h3>
      </div>
      
      <img 
        className="post__image" 
        src={imageUrl}
        alt=""
      ></img>

      <h4 className="post__text"><strong>{username}</strong> {caption}</h4>

      <div className="post__comments">
        {comments.map((comment, id) => (
          <p key={id}>
            <strong>{comment.username}</strong> {comment.text}
          </p>
        ))}
      </div>

      {user ? (
        <form className="post__commentBox">
        <input
          className="post__input"
          type="text"
          placeholder="Add a comment..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <button 
          className="post__button"
          disabled={!comment}
          type="submit"
          onClick={postComment}
        >
          Post
        </button>
      </form>
      ): (
        null
      )}
      
    </div>
  )
}
