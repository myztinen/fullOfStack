import { useState } from "react";
import {
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";


const Menu = ({clickHandler}) => {

  const padding = {
    paddingRight: 5
  }


  return (
    <div>
      <button type="button" style={padding} onClick={() => clickHandler("/")}>authors</button>
      <button type="button" style={padding} onClick={() => clickHandler("/books")}>books</button>
      <button type="button" style={padding} onClick={() => clickHandler("/newBook")}>create new</button>
    </div>
  )
}


const App = () => {
  const [page, setPage] = useState("authors");

  const navigate = useNavigate()


const handleClick = (e) => {
    console.log(e)
    navigate(e)
    if(e==='/') {setPage("authors")}
    if(e==='/books') {setPage("books")}
    if(e==='/newBook') {setPage("add")}
  }

  return (
    <div>
        <Menu clickHandler={ handleClick}/>
        <Routes>
          <Route path="/" element={<Authors show={page === "authors"}  />} />
          <Route path="/books" show={page === "books"} element={<Books />} />
          <Route path="/newBook" show={page === "add"} element={<NewBook  />} />
        </Routes>
    </div>
  );
};

export default App;
