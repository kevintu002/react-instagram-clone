import '../styles/App.css';
import Post from './Post'

// export const App = () => {}
function App() {
  return (
    <div className="app">

      <div className="app__header">
        <img
          className="app__headerImage"
          src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
          alt=""
        ></img>
      </div>

      <Post />
    </div>
  );
}

export default App;
