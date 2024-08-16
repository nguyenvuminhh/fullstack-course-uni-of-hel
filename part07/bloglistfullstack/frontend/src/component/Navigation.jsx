import { Navbar, Nav } from "react-bootstrap"
import { Link } from "react-router-dom"
import { useUser } from "../reducecontext/userContext"

const Navigation = () => {
    const user = useUser()
    const padding = {
        padding: '10px', 
      }
    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="me-auto">
                <Nav.Link href="#" as="span">
                    <Link style={padding} to="/">Home</Link>
                </Nav.Link>
                <Nav.Link href="#" as="span">
                    <Link style={padding} to="/blogs">Blogs</Link>
                </Nav.Link>
                <Nav.Link href="#" as="span">
                    <Link style={padding} to="/users">User</Link>
                </Nav.Link>
                <Nav.Link href="#" as="span">
                    {user
                    ? <em style={padding}>{user.name} logged in</em>
                    : <Link style={padding} to="/signup">Sign up</Link>
                    }
                </Nav.Link>
                <Nav.Link href="#" as="span">
                    {user
                    ? <Link style={padding} to="/login">Log out</Link>
                    : <Link style={padding} to="/login">Log in</Link>
                    }
                </Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}

export default Navigation