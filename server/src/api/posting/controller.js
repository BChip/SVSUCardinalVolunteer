import { success, notFound, authorOrAdmin } from '../../services/response/'
import { Posting } from '.'

export const create = ({ user, bodymen: { body } }, res, next) =>
  Posting.create({ ...body, user })
    .then((posting) => posting.view(true))
    .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  Posting.find(query, select, cursor)
    .populate('user')
    .then((postings) => {
      if(user.role == 'admin'){
        return postings.map((posting) => posting.view())
      }else{
        return postings.map((posting) => { if(posting.visible === true) { return posting.view()} })
      }
    })
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  Posting.findById(params.id)
    .populate('user')
    .then(notFound(res))
    .then((posting) => posting ? posting.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({ user, bodymen: { body }, params }, res, next) =>
  Posting.findById(params.id)
    .populate('user')
    .then(notFound(res))
    .then(authorOrAdmin(res, user, 'community partner'))
    .then((posting) => posting ? Object.assign(posting, body).save() : null)
    .then((posting) => posting ? posting.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ user, params }, res, next) =>
  Posting.findById(params.id)
    .then(notFound(res))
    .then(authorOrAdmin(res, user, 'user'))
    .then((posting) => posting ? posting.remove() : null)
    .then(success(res, 204))
    .catch(next)
