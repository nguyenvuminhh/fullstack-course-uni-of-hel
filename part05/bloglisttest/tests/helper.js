const login = async (page, username, password) => {
    const loginFields = await page.getByRole('textbox').all()
    await loginFields[0].fill(username)
    await loginFields[1].fill(password)
    const loginButton = page.getByRole('button', { name: 'login' })
    await loginButton.click()
}

const addBlog = async (page, blogTitle, blogAuthor, blogUrl) => {
    await page.getByRole('button', { name: 'new blog' }).click()
    const addBlogFields = await page.getByRole('textbox').all()
    await addBlogFields[0].fill(blogTitle)
    await addBlogFields[1].fill(blogAuthor)
    await addBlogFields[2].fill(blogUrl)
    const addBlogButton = page.getByRole('button', { name: 'add blog' })
    await addBlogButton.click()
}

const isSorted = (arr) => {
    for (let i = 1; i < arr.length; i++) {
      if (arr[i] > arr[i - 1]) {
        return false;
      }
    }
    return true;
  }

module.exports = { login, addBlog, isSorted }