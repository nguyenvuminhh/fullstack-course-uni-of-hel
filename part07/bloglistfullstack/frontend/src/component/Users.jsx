import { useQueries, useQuery } from "@tanstack/react-query"
import userService from "../service/userService"
import { Link } from "react-router-dom"
import { Table } from "react-bootstrap"

const Users = ({ users }) => {

    return (
            <Table striped>
                <thead>
                    <tr>
                        <td>Name</td>
                        <td>No. Blogs</td>
                    </tr>
                </thead>
                <tbody>
                    {users.map(a => (
                    <tr key={'tr'+a.id}>
                        <td><Link to={'/users/'+a.id}>{a.name}</Link></td>
                        <td>{a.blogs.length}</td>
                    </tr>
                    ))}
                </tbody>
            </Table>
    )
}

export default Users