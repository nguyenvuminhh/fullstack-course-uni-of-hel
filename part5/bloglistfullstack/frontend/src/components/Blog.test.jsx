import Blog from './Blog'
import { screen, render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

describe('<Blog /> should', () => {
    let blog = {
        title: 'title1',
        author: 'author1',
        url: 'url1',
        likes: '16217',
        user: {
            username: 'username1'
        }
    }
    let handleDelete = vi.fn()
    let handleLike = vi.fn()
    
    beforeEach(() => {
        render(
            <Blog
                blog={blog}
                handleDelete={handleDelete}
                handleLike={handleLike}
            />
        )
    })

    test('render just title and author by default, not url and likes', () => {
        const title = screen.queryByText('title1')
        const author = screen.queryByText('author1')
        const url = screen.queryByText('url1')
        const likes = screen.queryByText('16217')
        
        expect(title).toBeDefined()
        expect(author).toBeDefined()
        expect(url).toBeNull()
        expect(likes).toBeNull()
    })

    test('render all blog\'s attributes when click \'show\'', () => {
        const user = userEvent.setup()
        const showButton = screen.getByText('show')

        user.click(showButton)

        const title = screen.queryByText('title1')
        const author = screen.queryByText('author1')
        const url = screen.queryByText('url1')
        const likes = screen.queryByText('16217')
        
        expect(title).toBeDefined()
        expect(author).toBeDefined()
        expect(url).toBeDefined()
        expect(likes).toBeDefined()
    })

    test('have the like button function correctly', async () => {
        const user = userEvent.setup()
        const showButton = screen.getByText('show')
        await user.click(showButton)

        const likeButton = screen.getByText('like')
        await user.click(likeButton)
        await user.click(likeButton)

        expect(handleLike.mock.calls).toHaveLength(2)
    })
})
