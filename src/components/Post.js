import '../styles/Post.css'
import { Avatar } from '@material-ui/core'

function Post() {
  return (
    <div className="post">
      <div className="post__header">
        <Avatar
          className="post__avatar"
          src=""
          alt=""
        >
        </Avatar>
        <h3>Username</h3>
      </div>
      
      <img 
        className="post__image" 
        src="https://cdn.discordapp.com/attachments/486306839659806730/869288369560092704/cP_AAX4gMAw.jpg"
        alt=""
      ></img>

      <h4 className="post__text"><strong>Username</strong> caption</h4>
    </div>
  )
}

export default Post
