import { Rsvp } from '.'
import { User } from '../user'

let user, rsvp

beforeEach(async () => {
  user = await User.create({ email: 'a@a.com', password: '123456' })
  rsvp = await Rsvp.create({ user, posting: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = rsvp.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(rsvp.id)
    expect(typeof view.user).toBe('object')
    expect(view.user.id).toBe(user.id)
    expect(view.posting).toBe(rsvp.posting)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = rsvp.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(rsvp.id)
    expect(typeof view.user).toBe('object')
    expect(view.user.id).toBe(user.id)
    expect(view.posting).toBe(rsvp.posting)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
