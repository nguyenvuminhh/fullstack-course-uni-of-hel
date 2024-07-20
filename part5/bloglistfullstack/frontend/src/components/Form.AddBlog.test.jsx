import Form from './Form'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

test('<Form.AddBlog /> should receive the correct information when user submitted', async () => {
    const addBlog = vi.fn()
    render(<Form.AddBlog addBlog={addBlog} />)
    
    const user = userEvent.setup()
    const textBoxes = screen.getAllByRole('textbox')
    const submitButton = screen.getByText('add blog')

    await user.type(textBoxes[0], 'title')
    await user.type(textBoxes[1], 'author')
    await user.type(textBoxes[2], 'url')
    await user.click(submitButton)
    expect(addBlog.mock.calls[0][0].title).toBe('title')
    expect(addBlog.mock.calls[0][0].author).toBe('author')
    expect(addBlog.mock.calls[0][0].url).toBe('url')
})