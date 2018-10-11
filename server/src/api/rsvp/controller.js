import { success, notFound, authorOrAdmin } from '../../services/response/'
import { Rsvp } from '.'

export const create = ({ user, bodymen: { body } }, res, next) =>
  Rsvp.create({ ...body, user })
    .then((rsvp) => rsvp.view(true))
    .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  Rsvp.find(query, select, cursor)
    .populate('user')
    .then((rsvps) => rsvps.map((rsvp) => rsvp.view()))
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  Rsvp.findById(params.id)
    .populate('user')
    .then(notFound(res))
    .then((rsvp) => rsvp ? rsvp.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({ user, bodymen: { body }, params }, res, next) =>
  Rsvp.findById(params.id)
    .populate('user')
    .then(notFound(res))
    .then(authorOrAdmin(res, user, 'user'))
    .then((rsvp) => rsvp ? Object.assign(rsvp, body).save() : null)
    .then((rsvp) => rsvp ? rsvp.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ user, params }, res, next) =>
  Rsvp.findById(params.id)
    .then(notFound(res))
    .then(authorOrAdmin(res, user, 'user'))
    .then((rsvp) => rsvp ? rsvp.remove() : null)
    .then(success(res, 204))
    .catch(next)
