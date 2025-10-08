const { test, expect, beforeEach, describe } = require('@playwright/test') 

describe('Blog app', () => {

  test('Login form is shown', async ({ page }) => {
    await page.goto('http://localhost:5173')
    const locator = page.getByText('log in to application')
    await expect(locator).toBeVisible()
    await expect(page.getByLabel('username')).toBeVisible()
    await expect(page.getByLabel('password')).toBeVisible()
    await expect(page.getByRole('button')).toBeVisible()
  })

  describe('Login', () => {
    beforeEach(async ({ page, request }) => {
      await request.post('http://localhost:3003/api/testing/reset')
      await request.post('http://localhost:3003/api/users', {
        data: {
          name: 'Matti Luukkainen',
          username: 'mluukkai',
          password: 'salainen'
        }
      })
      await page.goto('http://localhost:5173')
    })
    
    test('succeeds with correct credentials', async ({ page }) => {
      await page.getByLabel('username').fill('mluukkai')
      await page.getByLabel('password').fill('salainen')
      await page.getByRole('button').click()
      await page.getByText('blogs').waitFor()
      expect(page.getByText('Matti Luukkainen successfully logged in')).toBeVisible({timeout: 10000})
    })

    test('fails with wrong credentials', async ({ page }) => {
      await page.getByLabel('username').fill('mluukkai')
      await page.getByLabel('password').fill('poo')
      await page.getByRole('button').click()
      await page.getByRole('button').click()
      await page.locator('div.error').waitFor()
      expect(page.getByText('wrong username or password')).toBeVisible({timeout: 10000})
      await expect(page.getByText('Matti Luukkainen logged in')).not.toBeVisible()

    })
  })

  describe('when logged in', () => {
    beforeEach(async ({ page,request }) => {
      await request.post('http://localhost:3003/api/testing/reset')
      await request.post('http://localhost:3003/api/users', {
        data: {
          name: 'Matti Luukkainen',
          username: 'mluukkai',
          password: 'salainen'
        }
      })
      await page.goto('http://localhost:5173')
      await page.getByLabel('username').fill('mluukkai')
      await page.getByLabel('password').fill('salainen')
      await page.getByRole('button', { name: 'login' }).click()
      
    })

    test('a new note can be created', async ({ page }) => {
      await page.getByRole('button', { name: 'create new blog' }).waitFor()
      await page.getByRole('button', { name: 'create new blog' }).click()
      await page.getByLabel('title:').fill('Brand new blog')
      await page.getByLabel('author:').fill('Bloggy McBlogface')
      await page.getByLabel('url:').fill('http://example.com')
      await expect(page.locator('.blogsList .closedBlogItem')).toHaveCount(0)

      await page.getByRole('button', { name: 'create' }).click()
      await page.getByText('Brand new blog Bloggy').waitFor()
      await expect(page.getByText('Brand new blog Bloggy')).toBeVisible()
      await expect(page.locator('.blogsList .closedBlogItem')).toHaveCount(1)

    })
  })

  describe('When bloglist contains blogs', () => {
    beforeEach(async ({ page,request }) => {
      await request.post('http://localhost:3003/api/testing/reset')
      await request.post('http://localhost:3003/api/users', {
        data: {
          name: 'Matti Luukkainen',
          username: 'mluukkai',
          password: 'salainen'
        }
      })
      await page.goto('http://localhost:5173')
      await page.getByLabel('username').fill('mluukkai')
      await page.getByLabel('password').fill('salainen')
      await page.getByRole('button', { name: 'login' }).click()
      await page.getByRole('button', { name: 'create new blog' }).waitFor()
      await page.getByRole('button', { name: 'create new blog' }).click()
      await page.getByLabel('title:').fill('Brand new blog')
      await page.getByLabel('author:').fill('Bloggy McBlogface')
      await page.getByLabel('url:').fill('http://example.com')
      await page.getByRole('button', { name: 'create' }).click()
      await page.getByText('Brand new blog Bloggy').waitFor()
      await page.getByRole('button', { name: 'view' }).waitFor()
    })

    test('blog post can be liked', async ({ page }) => {
      await page.getByRole('button', { name: 'view' }).click()
      await page.getByRole('button', { name: 'like' }).waitFor()
      expect(page.locator('.likes')).toHaveText('likes 0 like')
      await page.getByRole('button', { name: 'like' }).click()
      await page.waitForLoadState('networkidle')
      expect(page.locator('.likes')).toHaveText('likes 1 like')
    })

    test('blog post can be removed', async ({ page }) => {
      await page.getByRole('button', { name: 'view' }).click()
      await page.getByRole('button', { name: 'like' }).waitFor()
      expect(page.locator('.likes')).toHaveText('likes 0 like')
      await expect(page.locator('.blogsList .openBlogItem')).toHaveCount(1)
      page.on('dialog', dialog => dialog.accept())
      await page.getByRole('button', { name: 'remove' }).click()
      await page.waitForLoadState('networkidle')
      await expect(page.locator('.blogsList .openBlogItem')).toHaveCount(0)
    })
  })


  describe('When user has createda blog', () => {
    beforeEach(async ({ page,request }) => {
      await request.post('http://localhost:3003/api/testing/reset')
      await request.post('http://localhost:3003/api/users', {
        data: {
          name: 'Matti Luukkainen',
          username: 'mluukkai',
          password: 'salainen'
        }
      })
      await request.post('http://localhost:3003/api/users', {
        data: {
          username: 'teppo',
          name: 'Teppo Teppola',
          password: 'salasana'
        }
      })
      await page.goto('http://localhost:5173')
      await page.getByLabel('username').fill('mluukkai')
      await page.getByLabel('password').fill('salainen')
      await page.getByRole('button', { name: 'login' }).click()
      await page.getByRole('button', { name: 'create new blog' }).waitFor()
      await page.getByRole('button', { name: 'create new blog' }).click()
      await page.getByLabel('title:').fill('Brand new blog')
      await page.getByLabel('author:').fill('Bloggy McBlogface')
      await page.getByLabel('url:').fill('http://example.com')
      await page.getByRole('button', { name: 'create' }).click()
      await page.getByText('Brand new blog Bloggy').waitFor()
      await page.getByRole('button', { name: 'logout' }).click()

    })

    test('another user cannot see the remove button', async ({ page }) => {
      await page.getByLabel('username').fill('teppo')
      await page.getByLabel('password').fill('salasana')
      await page.getByRole('button', { name: 'login' }).click()
      await page.getByRole('button', { name: 'view' }).waitFor()
      await page.getByRole('button', { name: 'view' }).click()
      await page.getByRole('button', { name: 'like' }).waitFor()
      expect(page.getByRole('button', { name: 'remove' })).not.toBeVisible()
    })
  })


   describe('When user has several blogs', () => {

    beforeEach(async ({ page,request }) => {
      await request.post('http://localhost:3003/api/testing/reset')
      await request.post('http://localhost:3003/api/users', {
        data: {
          name: 'Matti Luukkainen',
          username: 'mluukkai',
          password: 'salainen'
        }
      })
      await request.post('http://localhost:3003/api/users', {
        data: {
          username: 'teppo',
          name: 'Teppo Teppola',
          password: 'salasana'
        }
      })
      await page.goto('http://localhost:5173')
      await page.getByLabel('username').fill('mluukkai')
      await page.getByLabel('password').fill('salainen')
      await page.getByRole('button', { name: 'login' }).click()
      await page.getByRole('button', { name: 'create new blog' }).waitFor()
      await page.getByRole('button', { name: 'create new blog' }).click()
      await page.getByLabel('title:').fill('Blogi 1')
      await page.getByLabel('author:').fill('Bloggy McBlogface')
      await page.getByLabel('url:').fill('http://example.com')
      await page.getByRole('button', { name: 'create' }).click()
      await page.getByText('Blogi 1 Bloggy').waitFor()
      await page.getByLabel('title:').fill('Blogi 2')
      await page.getByLabel('author:').fill('Blofan Bloggersson')
      await page.getByLabel('url:').fill('http://example.com')
      await page.getByRole('button', { name: 'create' }).click()
      await page.locator('div.closedBlogItem', {hasText:'Blogi 2 Blofan'}).waitFor()
      await page.getByLabel('title:').fill('Blogi 3')
      await page.getByLabel('author:').fill('Blogdan Blogisov')
      await page.getByLabel('url:').fill('http://example.com')
      await page.getByRole('button', { name: 'create' }).click()
      await page.getByText('Blogi 3 Blogdan').waitFor()
    })

    test('blogs are sorted by likes', async ({ page }) => {
      await page.locator('div.closedBlogItem', {hasText:'Blogi 1'}).getByRole('button', { name: 'view' }).click()
      await page.locator('div.closedBlogItem', {hasText:'Blogi 2'}).getByRole('button', { name: 'view' }).click()
      await page.locator('div.closedBlogItem', {hasText:'Blogi 3'}).getByRole('button', { name: 'view' }).click()
      expect(page.locator('div.openBlogItem', {hasText:'Blogi 1'}).locator('.likes')).toHaveText('likes 0 like')
      expect(page.locator('div.openBlogItem', {hasText:'Blogi 2'}).locator('.likes')).toHaveText('likes 0 like')
      expect(page.locator('div.openBlogItem', {hasText:'Blogi 3'}).locator('.likes')).toHaveText('likes 0 like')
      expect(page.locator('div.blogsList div.openBlogItem .title')).toHaveText(['Blogi 1 Bloggy McBlogfacehide',
                                                                                  'Blogi 2 Blofan Bloggerssonhide',
                                                                                  'Blogi 3 Blogdan Blogisovhide'])
      await page.locator('div.openBlogItem', {hasText:'Blogi 2'}).getByRole('button', { name: 'like' }).click()
      await page.locator('div.blogsList div.openBlogItem').first().locator('.title', {hasText:'Blogi 2 Blofan Bloggerssonhide'}).waitFor()
      expect(page.locator('div.blogsList div.openBlogItem .title')).toHaveText(['Blogi 2 Blofan Bloggerssonhide',
                                                                                  'Blogi 1 Bloggy McBlogfacehide',
                                                                                  'Blogi 3 Blogdan Blogisovhide'])
      await page.locator('div.openBlogItem', {hasText:'Blogi 3'}).getByRole('button', { name: 'like' }).click()
      await page.waitForLoadState('networkidle')
      await page.locator('div.openBlogItem', {hasText:'Blogi 3'}).getByRole('button', { name: 'like' }).click()
      await page.locator('div.blogsList div.openBlogItem').first().locator('.title', {hasText:'Blogi 3 Blogdan Blogisovhide'}).waitFor()
      expect(page.locator('div.blogsList div.openBlogItem .title')).toHaveText(['Blogi 3 Blogdan Blogisovhide',
                                                                                  'Blogi 2 Blofan Bloggerssonhide',
                                                                                  'Blogi 1 Bloggy McBlogfacehide'])

    })
  })
})