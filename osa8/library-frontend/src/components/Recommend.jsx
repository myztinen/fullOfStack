import { ALL_BOOKS, USER_INFO } from '../queries'
import { useQuery } from '@apollo/client'


const Recommend = () => {

  const { data: userData, loading: userLoading } = useQuery(USER_INFO)
  const favouriteGenre = userData?.me?.favoriteGenre

  const { data: booksData, loading: booksLoading } = useQuery(ALL_BOOKS, 
    {
    skip: !favouriteGenre,
    variables: { genre: favouriteGenre}
  })

  if (userLoading || booksLoading) return <div>loading...</div>

  const books = booksData?.allBooks ?? []

  return (
    <div>
      <h2>Recommendations</h2>
      <div>in your favourite genre <b>{favouriteGenre}</b></div>
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

    </div>
  )
}

export default Recommend
