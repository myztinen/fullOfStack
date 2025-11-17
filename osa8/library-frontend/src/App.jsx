import { useState, useEffect } from "react"
import {
  Routes,
  Route,
  useNavigate,
} from "react-router-dom"
import Authors from "./components/Authors"
import Books from "./components/Books"
import NewBook from "./components/NewBook"
import LoginForm from "./components/LoginForm"
import Recommend from "./components/Recommend"
import { useApolloClient } from "@apollo/client"


const Menu = ({token, clickHandler}) => {

  const padding = {
    paddingRight: 5
  }

  if(!token ) {
    return(
    <div>
      <button type="button" style={padding} onClick={() => clickHandler("/")}>authors</button>
      <button type="button" style={padding} onClick={() => clickHandler("/books")}>books</button>
      <button type="button" style={padding} onClick={() => clickHandler("/login")}>login</button>
    </div>
    )
  } else {
    return (
      <div>
        <button type="button" style={padding} onClick={() => clickHandler("/")}>authors</button>
        <button type="button" style={padding} onClick={() => clickHandler("/books")}>books</button>
        <button type="button" style={padding} onClick={() => clickHandler("/newBook")}>create new</button>
        <button type="button" style={padding} onClick={() => clickHandler("/recommendations")}>recommend</button>
        <button type="button" style={padding} onClick={() => clickHandler("/logout")}>logout</button>
      </div>
    )
  }
}


const App = () => {
  const [page, setPage] = useState("authors")
  const [token, setToken] = useState(null)
  const navigate = useNavigate()
  const client = useApolloClient()

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()  
  }

  useEffect(() => {
    const savedToken = localStorage.getItem('blogs-user-token')
    if (savedToken) {
      setToken(savedToken)
      setPage('authors')
    }
  }, [])



const handleClick = (e) => {
    console.log(e)
    navigate(e)
    if(e==='/') {setPage("authors")}
    if(e==='/books') {setPage("books")}
    if(e==='/newBook') {setPage("add")}
    if(e==='/login') {setPage("login")}
    if(e==='/recommendations') {setPage("recommendations")}

    if(e==='/logout') {
      setPage("authors")
      logout()
    }
  }

const handleLogin = (token) => {
  setToken(token)
  navigate('/')
  setPage('authors')
}


  return (
    <div>
        <Menu clickHandler={ handleClick} token={token}/>
        <Routes>
          <Route path="/" show={page === "authors"} element={<Authors   />} />
          <Route path="/books" show={page === "books"} element={<Books />} />
          <Route path="/newBook" show={page === "add"} element={<NewBook  />} />
          <Route path="/login" show={page === "login"} element={<LoginForm loginHandler={handleLogin} />} />
          <Route path="/logout" show={page === "authors"} element={<Authors   />} />
          <Route path="/recommendations" show={page === "recommendations"} element={<Recommend   />} />

        </Routes>
    </div>
  );
};

export default App;
