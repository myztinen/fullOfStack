import { gql } from '@apollo/client'

export const CREATE_BOOK = gql`
  mutation addBook($title: String!, $published: Int!, $author: String!, $genres: [String!]!) {
    addBook(title: $title, published: $published, author: $author, genres: $genres) {
      title
      published
      author {
        name
        id
      }
      genres
      id
    }
  }
`

export const ALL_BOOKS = gql`
  query AllBooks($genre: String) {
    allBooks(genre: $genre) {
      title
      published
      author {
        name
      }
      genres
      id
    }
  }
`


export const USER_INFO = gql`
  query Me {
    me {
      username
      favoriteGenre
      id
    }
}
`



export const ALL_AUTHORS = gql`
    query {
      allAuthors {
        name
        born
        bookCount
      }
    }
  `

export const EDIT_BORN = gql`
  mutation editBorn($name: String!, $setBornTo: Int!) {
    editAuthor(name: $name, setBornTo: $setBornTo)  {
      name
      born
    }
  }
`

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      value
    }
  }
`
