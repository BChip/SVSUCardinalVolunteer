import { Posting } from '.'
import { User } from '../user'

let user, posting

beforeEach(async () => {
  user = await User.create({ email: 'a@a.com', password: '123456' })
  posting = await Posting.create({ user, title: 'test', description: 'test', location: 'test', time: 'test', category: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = posting.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(posting.id)
    expect(typeof view.user).toBe('object')
    expect(view.user.id).toBe(user.id)
    expect(view.title).toBe(posting.title)
    expect(view.description).toBe(posting.description)
    expect(view.location).toBe(posting.location)
    expect(view.time).toBe(posting.time)
    expect(view.category).toBe(posting.category)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = posting.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(posting.id)
    expect(typeof view.user).toBe('object')
    expect(view.user.id).toBe(user.id)
    expect(view.title).toBe(posting.title)
    expect(view.description).toBe(posting.description)
    expect(view.location).toBe(posting.location)
    expect(view.time).toBe(posting.time)
    expect(view.category).toBe(posting.category)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
