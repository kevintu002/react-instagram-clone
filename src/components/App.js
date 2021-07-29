import { useEffect, useState } from 'react';
import { auth, db } from '../service/firebase';
import { Button, Input, Modal, makeStyles, InputLabel } from '@material-ui/core';

import '../styles/App.css';
import Post from './Post'
import ImageUpload from './ImageUpload'

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default function App() {
  const classes = useStyles()
  const [modalStyle] = useState(getModalStyle)

  const [openSignUp, setOpenSignUp] = useState(false)
  const [openSignIn, setOpenSignIn] = useState(false)
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const [posts, setPosts] = useState([])

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(authUser => {
      if (authUser) {
        // user is logged in
        // console.log(authUser)
        setUser(authUser)
      } else {
        setUser(null)
      }
    })

    return () => {
      unsubscribe()
    }
  }, [user, username])

  useEffect(() => {
    // populate posts from db. newest will be at the top.
    db.collection('posts').orderBy('timestamp', 'desc').onSnapshot(snapshot => {
      setPosts(snapshot.docs.map(doc => ({
        id: doc.id,
        post: doc.data()
      })))
    })
  }, [])

  const signUp = (e) => {
    e.preventDefault()

    auth.createUserWithEmailAndPassword(email, password)
    .then(authUser => {
      return authUser.user.updateProfile({
        displayName: username
      })
    })
    .then(() => handleClose())
    .catch(error => alert(error.message))
  }

  const signIn = (useGuestAccount = false) => (e) => {
    e.preventDefault()

    if (useGuestAccount) {
      // sign in with guest account
      auth.signInWithEmailAndPassword('guest@account.com', 'guestaccount')
      .then(authUser => {
        authUser.user.updateProfile({
          displayName: 'Guest'
        })
      })
      .then(() => handleClose())
      .catch(error => console.log(error.message))
    } else {
      auth.signInWithEmailAndPassword(email, password)
      .then(() => handleClose())
      .catch(error => {
        console.log(error.message)
        alert("No matching email and password found")
      })
    }
  }

  const handleClose = () => {
    setUsername('')
    setEmail('')
    setPassword('')
    setOpenSignUp(false)
    setOpenSignIn(false)
  }

  return (
    <div className="app">

      <Modal
        open={openSignUp || openSignIn}
        onClose={handleClose}
      >
        <div style={modalStyle} className={classes.paper}>
          <form className="app__signUp">
            <center>
              <img
                className="app__headerImage"
                src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
                alt=""
              ></img>
            </center>

            {openSignUp ? (
              <Input
                type="text"
                placeholder="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              ></Input>
            ): (
              null
            )}
            <Input
              type="text"
              placeholder="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></Input>
            <Input
              type="password"
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></Input>

            {openSignIn ? (
              <Button 
                disabled={!email || !password}
                type="submit" 
                onClick={signIn()}
              >Sign In</Button>
            ): (
              <Button 
                disabled={!username || !email || !password}
                type="submit" 
                onClick={signUp}
              >Sign Up</Button>
            )}
            <Button type="submit" onClick={signIn(true)} >Use guest account</Button>
          </form>
        </div>
      </Modal>

      <div className="app__header">
        <img
          className="app__headerImage"
          src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
          alt=""
        />

        {user ? (
          <div className="app__user">
            <InputLabel className="app__userDisplayName">
              {user.displayName ? user.displayName : null}
            </InputLabel>
            <Button onClick={() => auth.signOut()}>Logout</Button>
          </div>
        ): (
          <div className="app__loginContainer">
            <Button onClick={() => setOpenSignIn(true)}>Sign In</Button>
            <Button onClick={() => setOpenSignUp(true)}>Sign Up</Button>
          </div>
        )}
      </div>

      {/* list of posts in the db */}
      <div className="app__posts">
        {posts.map(({id, post}) => (
          <Post 
            key={id} 
            postId={id}
            user={user}
            username={post.username} 
            caption={post.caption} 
            imageUrl={post.imageUrl} 
          />
        ))}
      </div>

      {user?.displayName ? (
        <ImageUpload username={user.displayName} />
      ): (
        null
      )}
    </div>
  );
}
