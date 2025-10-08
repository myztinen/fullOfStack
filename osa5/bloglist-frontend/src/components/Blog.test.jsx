import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

describe('Default Blog element', () => {
  test('renders Blog content', () => {
    const blog = {
      user: '5a43e6b6c37f3d065eaaa581',
      likes: 1,
      author: 'Joel Spolsky',
      title: 'The Joel Test: 12 Steps to Better Code',
      url: 'https://www.joelonsoftware.com/2000/08/09/the-joel-test-12-steps-to-better-code/'
    }

    render(<Blog blog={blog} updateBlog={() => ''} deleteBlog={() => ''} userId={blog}  />)
    const element = screen.getByText('The Joel Test: 12 Steps to Better Code Joel Spolsky')
    screen.debug()
    const likes = screen.queryByText('likes 1')
    const url = screen.queryByText('https://www.joelonsoftware.com/2000/08/09/the-joel-test-12-steps-to-better-code/')
    expect(likes).toBeNull()
    expect(url).toBeNull()
    expect(element).toBeDefined()
  })
})

describe('Opened Blog element', () => {
  const mockHandler = vi.fn()
  beforeEach(() => {
    const blog = {
      user: {
        name: 'Kerkko käyttäjä',
        id:'5a43e6b6c37f3d065eaaa581'
      },
      likes: 1,
      author: 'Joel Spolsky',
      title: 'The Joel Test: 12 Steps to Better Code',
      url: 'https://www.joelonsoftware.com/2000/08/09/the-joel-test-12-steps-to-better-code/'
    }
    render(<Blog blog={blog} updateBlog={mockHandler} deleteBlog={() => ''} userId={blog}  />)
  })
  test('renders Blog content', async () => {

    const user = userEvent.setup()
    const button = screen.getByText('view')
    await user.click(button)
    screen.debug()
    const likes = screen.queryByText('likes 1')
    const url = screen.queryByText('https://www.joelonsoftware.com/2000/08/09/the-joel-test-12-steps-to-better-code/')
    const username = screen.queryByText('Kerkko käyttäjä')
    expect(likes).toBeVisible()
    expect(url).toBeVisible()
    expect(username).toBeVisible()

  })

  test('clicking like button twice calls event handler twice', async () => {
    const user = userEvent.setup()
    const viewButton = screen.getByText('view')
    await user.click(viewButton)
    const likeButton = screen.getByText('like')
    await user.click(likeButton)
    await user.click(likeButton)
    expect(mockHandler.mock.calls).toHaveLength(2)
  })
})