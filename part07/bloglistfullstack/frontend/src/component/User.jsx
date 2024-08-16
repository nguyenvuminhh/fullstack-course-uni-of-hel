const User = ({ user }) => {
    return (
        <div>
            <h2>{user.name}</h2>
            <h3>Added blogs:</h3>
            <ul>
            {user.blogs.map(a => (
                <li key={a.id}>{a.title}</li>
            ))}
            </ul>
        </div>
    )
}

export default User