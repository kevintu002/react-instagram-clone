import { useEffect, useState } from 'react';
import { db } from '../service/firebase';
import '../styles/App.css';
import Post from './Post'

// export const App = () => {}
function App() {
  const [posts, setPosts] = useState([
    // {
    //   username: "Sana",
    //   caption: "this is a caption",
    //   imageUrl: "https://cdn.discordapp.com/attachments/486306839659806730/869288369560092704/cP_AAX4gMAw.jpg"
    // },
    // {
    //   username:"Minato",
    //   caption:"wow another caption",
    //   imageUrl:"https://cdn.discordapp.com/attachments/486306839659806730/868521082620104724/Hfo7umcxnQM.jpg"
    // },
    // {
    //   username:"Zaki",
    //   caption:"maybe last caption",
    //   imageUrl:"https://cdn.discordapp.com/attachments/486306839659806730/867879040861339658/KrF5NSj_4S4.jpg"
    // }
  ])

  useEffect(() => {
    db.collection('posts').onSnapshot(snapshot => {
      setPosts(snapshot.docs.map(doc => doc.data()))
    })
  }, [])

  return (
    <div className="app">

      <div className="app__header">
        <img
          className="app__headerImage"
          src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
          alt=""
        ></img>
      </div>

      {
        posts.map(post => (
          <Post username={post.username} caption={post.caption} imageUrl={post.imageUrl} />
        ))
      }
    </div>
  );
}

export default App;
