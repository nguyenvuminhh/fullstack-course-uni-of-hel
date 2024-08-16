import { useApolloClient, useQuery } from "@apollo/client"
import { ALL_BOOKS, BOOK_BY_GENRE, ME } from "../queries"
import { useEffect, useState } from "react"

const Recommendation = (props) => {    
    const user = useQuery(ME)
    const [favoriteGenre, setFavoriteGenre] = useState(null)
    useEffect(() => {
        if (user.data && user.data.me) {
            setFavoriteGenre(user.data.me.favoriteGenre)
        }
    }, [user.data])

    const books = useQuery(BOOK_BY_GENRE, {variables: {genre: favoriteGenre}, skip: !favoriteGenre})
    if (!props.show) {
        return null
    }
    if (user.loading) {
        return (<p>loading...</p>)
    }

    if (!favoriteGenre) {
        return (<p>please log in first</p>)
    }
    const recBooks = books.data.allBooks.filter(a => a.genres.includes(favoriteGenre))

    return (
        <div>
            <p>Books with your favourite genre {favoriteGenre}</p>
            <table>
                <tbody>
                    <tr key="head">
                    <th>title</th>
                    <th>author</th>
                    <th>published</th>
                    </tr>
                    {recBooks.map((a) => (
                    <tr key={a.title+a.author.name+a.published}>
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

export default Recommendation