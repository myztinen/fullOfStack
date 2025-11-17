import { ALL_BOOKS } from '../queries'
import { useQuery } from '@apollo/client'
import { useState } from 'react'



const Books = () => {
  const [genreFilter, setGenreFilter] = useState('')
  const result = useQuery(ALL_BOOKS,{ variables: { genre: genreFilter } })

  if ( result.loading ) {
    return <div>loading...</div>
  }

  const books = result.data.allBooks || []

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div><button onClick={({ target }) => setGenreFilter(target.textContent)}>refactoring</button>
            <button onClick={({ target }) => setGenreFilter(target.textContent)}>agile</button>
            <button onClick={({ target }) => setGenreFilter(target.textContent)}>patterns</button>
            <button onClick={({ target }) => setGenreFilter(target.textContent)}>design</button>
            <button onClick={({ target }) => setGenreFilter(target.textContent)}>crime</button>
            <button onClick={({ target }) => setGenreFilter(target.textContent)}>classic</button>
            <button onClick={() => setGenreFilter('')}>all genres</button>
            </div>
    </div>
  )
}

export default Books
