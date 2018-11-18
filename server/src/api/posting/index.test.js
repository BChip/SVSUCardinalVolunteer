import request from 'supertest'
import { apiRoot } from '../../config'
import { signSync } from '../../services/jwt'
import express from '../../services/express'
import { User } from '../user'
import routes, { Posting } from '.'

const app = () => express(apiRoot, routes)

let userSession, anotherSession, posting

beforeEach(async () => {
  const user = await User.create({ email: 'a@a.com', password: '123456', role: 'community partner' })
  const anotherUser = await User.create({ email: 'b@b.com', password: '123456'})
  userSession = signSync(user.id)
  anotherSession = signSync(anotherUser.id)
  posting = await Posting.create({ user, title: 'test', description: 'test', location: 'test', time: 'test', category: 'test', visible: true })
})

test('POST /postings 201 (user)', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ access_token: userSession, title: 'test', description: 'test', location: 'test', time: 'test', category: 'test', visible: true })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.title).toEqual('test')
  expect(body.description).toEqual('test')
  expect(body.location).toEqual('test')
  expect(body.time).toEqual('test')
  expect(body.category).toEqual('test')
  expect(typeof body.user).toEqual('object')
})

test('POST /postings 401', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /postings 200 (user)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
    .query({ access_token: userSession })
  expect(status).toBe(200)
  expect(Array.isArray(body)).toBe(true)
  expect(typeof body[0].user).toEqual('object')
})

test('GET /postings 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /postings/:id 200 (user)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${posting.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(posting.id)
  expect(typeof body.user).toEqual('object')
})

test('GET /postings/:id 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}/${posting.id}`)
  expect(status).toBe(401)
})

test('GET /postings/:id 404 (user)', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
    .query({ access_token: userSession })
  expect(status).toBe(404)
})

test('PUT /postings/:id 200 (user)', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${posting.id}`)
    .send({ access_token: userSession, title: 'test', description: 'test', location: 'test', time: 'test', category: 'test', visible: true })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(posting.id)
  expect(body.title).toEqual('test')
  expect(body.description).toEqual('test')
  expect(body.location).toEqual('test')
  expect(body.time).toEqual('test')
  expect(body.category).toEqual('test')
  expect(typeof body.user).toEqual('object')
})

test('PUT /postings/:id 401 (user) - another user', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${posting.id}`)
    .send({ access_token: anotherSession, title: 'test', description: 'test', location: 'test', time: 'test', category: 'test' })
  expect(status).toBe(401)
})

test('PUT /postings/:id 401', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${posting.id}`)
  expect(status).toBe(401)
})

test('PUT /postings/:id 404 (user)', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
    .send({ access_token: anotherSession, title: 'test', description: 'test', location: 'test', time: 'test', category: 'test' })
  expect(status).toBe(404)
})

test('DELETE /postings/:id 204 (user)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${posting.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(204)
})

test('DELETE /postings/:id 401 (user) - another user', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${posting.id}`)
    .send({ access_token: anotherSession })
  expect(status).toBe(401)
})

test('DELETE /postings/:id 401', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${posting.id}`)
  expect(status).toBe(401)
})

test('DELETE /postings/:id 404 (user)', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
    .query({ access_token: anotherSession })
  expect(status).toBe(404)
})
