import request from 'supertest'
import { apiRoot } from '../../config'
import { signSync } from '../../services/jwt'
import express from '../../services/express'
import { User } from '../user'
import routes, { Rsvp } from '.'

const app = () => express(apiRoot, routes)

let userSession, anotherSession, rsvp

beforeEach(async () => {
  const user = await User.create({ email: 'a@a.com', password: '123456' })
  const anotherUser = await User.create({ email: 'b@b.com', password: '123456' })
  userSession = signSync(user.id)
  anotherSession = signSync(anotherUser.id)
  rsvp = await Rsvp.create({ user })
})

test('POST /rsvps 201 (user)', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ access_token: userSession, posting: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.posting).toEqual('test')
  expect(typeof body.user).toEqual('object')
})

test('POST /rsvps 401', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /rsvps 200 (user)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
    .query({ access_token: userSession })
  expect(status).toBe(200)
  expect(Array.isArray(body)).toBe(true)
  expect(typeof body[0].user).toEqual('object')
})

test('GET /rsvps 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /rsvps/:id 200 (user)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${rsvp.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(rsvp.id)
  expect(typeof body.user).toEqual('object')
})

test('GET /rsvps/:id 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}/${rsvp.id}`)
  expect(status).toBe(401)
})

test('GET /rsvps/:id 404 (user)', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
    .query({ access_token: userSession })
  expect(status).toBe(404)
})

test('PUT /rsvps/:id 200 (user)', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${rsvp.id}`)
    .send({ access_token: userSession, posting: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(rsvp.id)
  expect(body.posting).toEqual('test')
  expect(typeof body.user).toEqual('object')
})

test('PUT /rsvps/:id 401 (user) - another user', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${rsvp.id}`)
    .send({ access_token: anotherSession, posting: 'test' })
  expect(status).toBe(401)
})

test('PUT /rsvps/:id 401', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${rsvp.id}`)
  expect(status).toBe(401)
})

test('PUT /rsvps/:id 404 (user)', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
    .send({ access_token: anotherSession, posting: 'test' })
  expect(status).toBe(404)
})

test('DELETE /rsvps/:id 204 (user)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${rsvp.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(204)
})

test('DELETE /rsvps/:id 401 (user) - another user', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${rsvp.id}`)
    .send({ access_token: anotherSession })
  expect(status).toBe(401)
})

test('DELETE /rsvps/:id 401', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${rsvp.id}`)
  expect(status).toBe(401)
})

test('DELETE /rsvps/:id 404 (user)', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
    .query({ access_token: anotherSession })
  expect(status).toBe(404)
})
