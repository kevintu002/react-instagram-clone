import '../styles/Post.css'
import { Avatar } from '@material-ui/core'

export default function Post({ username, caption, imageUrl }) {
  return (
    <div className="post">
      <div className="post__header">
        <Avatar
          className="post__avatar"
          src=""
          alt=""
        >
        </Avatar>
        <h3>{username}</h3>
      </div>
      
      <img 
        className="post__image" 
        src={imageUrl}
        alt=""
      ></img>

      <h4 className="post__text"><strong>{username}</strong> {caption}</h4>
    </div>
  )
}
