const { test, expect, describe, beforeEach } = require('@playwright/test')
const { login, addBlog,isSorted } = require('./helper')

describe('Blog app should', () => {
  beforeEach( async ({ page, request }) => {
    const deleting = await request.delete('api/test/reset')
    const loginRes = await request.post('api/users', {
      data: {
        name: 'Testing',
        username: 'testing',
        password: 'imtesting'
      }
    })
    await page.goto('/')
  })

  test('have a login form shown by default', async ({ page }) => {
    const loginButton =  page.getByRole('button', { name: 'login' })
    await expect(loginButton).toBeVisible()
  })

  test('behave right when login info is correct', async ({ page }) => {
    await login(page, 'testing', 'imtesting')

    const loginButton = page.getByRole('button', { name: 'login' })
    const newBlogButton = page.getByRole('button', { name: 'New blog'})
    await expect(loginButton).not.toBeVisible()
    await expect(newBlogButton).toBeVisible()
  })

  test('behave right when login info is incorrect', async ({ page }) => {
    await login(page, 'testing', 'wronggggggg')

    const loginButton = page.getByRole('button', { name: 'login' })
    const newBlogButton = page.getByRole('button', { name: 'New blog'})
    await expect(loginButton).toBeVisible()
    await expect(newBlogButton).not.toBeVisible()
  })

  test('allow user to create blog when logged in', async ({ page }) => {
    await login(page, 'testing', 'imtesting')
    await addBlog(page, 'newtitle', 'newauthor', 'url')

    await page.getByText('newtitle newauthor').waitFor()
    const newBlog = page.getByText('newtitle newauthor')
    await expect(newBlog).toBeVisible()
  })

  test('allow a blog to be liked', async ({ page }) => {
    await login(page, 'testing', 'imtesting')
    await addBlog(page, 'newtitle', 'newauthor', 'url')

    await page.getByRole('button', { name: 'show' }).click()
    await page.getByRole('button', { name: 'like' }).click()
    await page.getByText('1 like').waitFor()
    const newLikes = page.getByText('1 like')
    expect(newLikes).toBeVisible
  })

  test('allow blog\'s creator to delete the blog', async ({ page }) => {
    await login(page, 'testing', 'imtesting')
    await addBlog(page, 'newtitle', 'newauthor', 'url')
    await page.getByRole('button', { name: 'show' }).click()

    const deleteButton = page.getByRole('button', { name: 'remove' })
    await expect(deleteButton).toBeVisible()
    await deleteButton.click()
    const deletedBlog = page.getByText('newtitle newauthor')
    await expect(deletedBlog).not.toBeVisible({ timeout: 10000 })
  })

  test('not allow a person who is not the blog\'s creator to delete the blog', async ({ page }) => {
    await login(page, 'testing', 'imtesting')
    await addBlog(page, 'newtitle', 'newauthor', 'url')
    await page.getByRole('button', { name: 'logout' }).click()
    const deleteButton = page.getByRole('button', { name: 'remove' })
    await expect(deleteButton).not.toBeVisible()
  })
  
  test('have blogs in the order according to the likes', async ({ page }) => {
    await login(page, 'testing', 'imtesting')
    for (let i = 0; i < 10; i++) {
      await page.evaluate(() => scrollBy(0, -3000))
      await addBlog(page, 'newtitle'+i, 'newauthor'+i, 'url'+i)
      const showButton = page.locator('.showButton').first()
      await showButton.scrollIntoViewIfNeeded()
      await showButton.click()
    }
    await page.pause()
    const likeButtons = await page.locator('.likeButton').all()
    const IDs = likeButtons.map(async (a) => await (a).getAttribute('id'))
    for (let ID of IDs) {
      const clickTimes = Math.floor(Math.random() * 20)
      for (let i = 0; i < clickTimes; i++) {
        await page.locator('#'+ (await ID)).click()
        let successCount = 0;
        while (successCount < 3) {
          await page.waitForResponse((response) => response.status() === 200);
          successCount++;
        }
      }
    }

    const finalLikeButtons = await page.locator('.likeButton').all()
    const finalLikes = (await Promise.all(finalLikeButtons.map(async a => await a.locator('..').innerText()))).map(a => Number(a.replace(' like', '')))
    expect(isSorted(finalLikes)).toBeTruthy()
  })
})
