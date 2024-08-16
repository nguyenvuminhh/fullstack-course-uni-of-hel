import { gql } from "@apollo/client";

export const AUTHOR_DETAILS = gql`
    fragment AuthorDetails on Author {
        name
        id
        born
        bookCount
    }
`

export const BOOK_DETAILS = gql`
    fragment BookDetails on Book {
        title
        author{
            ...AuthorDetails
        }
        published
        genres
    }
    ${AUTHOR_DETAILS}
`

export const NEW_BOOK = gql`
  mutation createBook ($title: String!, $author: String!, $published: Int!, $genres: [String!]!) {
  addBook(title: $title, author: $author, published: $published, genres: $genres) {
      ...BookDetails
  }
  }
  ${BOOK_DETAILS}
`

export const ALL_BOOKS = gql`
  query {
    allBooks {
        ...BookDetails
  }
  }
  ${BOOK_DETAILS}
`

export const ALL_GENRES = gql`
    query {
        allGenres
    }
`

export const BOOK_BY_GENRE = gql`
    query bookByGenre($genre: String!){
        allBooks(genre: $genre){
            ...BookDetails
    }
    }
    ${BOOK_DETAILS}
`

export const ALL_AUTHORS = gql`
  query {
    allAuthors {
      ...AuthorDetails
    }
  }
  ${AUTHOR_DETAILS}
`

export const UPDATE_AUTHOR = gql`
  mutation updateAuthor($name: String!, $year: Int!) {
    editAuthor(name: $name, setBornTo: $year){
        name
        born
    }
  }
`

export const LOGIN = gql`
    mutation login($username: String!, $password: String!) {
        login(username: $username, password: $password){
            value
        }
    }
`

export const ME = gql`
    query{
        me{
            favoriteGenre
        }
    }
`

export const BOOK_ADDED = gql`
  subscription {
    bookAdded {
      ...BookDetails
    }
  }
  ${BOOK_DETAILS}
`