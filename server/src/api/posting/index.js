import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { token } from '../../services/passport'
import { create, index, show, update, destroy, rsvp, unrsvp } from './controller'
import { schema } from './model'
export Posting, { schema } from './model'

const router = new Router()
const { title, description, location, time, category, valid, visible, picture } = schema.tree

/**
 * @api {post} /postings Create posting
 * @apiName CreatePosting
 * @apiGroup Posting
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiParam title Posting's title.
 * @apiParam description Posting's description.
 * @apiParam location Posting's location.
 * @apiParam time Posting's time.
 * @apiParam category Posting's category.
 * @apiSuccess {Object} posting Posting's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Posting not found.
 * @apiError 401 user access only.
 */
router.post('/',
  token({ required: true }),
  body({ title, description, location, time, category, picture }),
  create)

/**
 * @api {post} /postings/:id/rsvp rsvp to a posting
 * @apiName RSVP
 * @apiGroup Posting
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiUse listParams
 * @apiSuccess 201 postings List of postings.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 user access only.
 */
router.post('/:id/rsvp',
  token({ required: true }),
  rsvp)

/**
 * @api {delete} /postings/:id/rsvp unrsvp to a posting
 * @apiName RSVP
 * @apiGroup Posting
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiUse listParams
 * @apiSuccess 201 postings List of postings.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 user access only.
 */
router.delete('/:id/rsvp',
  token({ required: true }),
  unrsvp)

/**
 * @api {get} /postings Retrieve postings
 * @apiName RetrievePostings
 * @apiGroup Posting
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiUse listParams
 * @apiSuccess {Object[]} postings List of postings.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 user access only.
 */
router.get('/',
  token({ required: true }),
  query(),
  index)

/**
 * @api {get} /postings/:id Retrieve posting
 * @apiName RetrievePosting
 * @apiGroup Posting
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiSuccess {Object} posting Posting's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Posting not found.
 * @apiError 401 user access only.
 */
router.get('/:id',
  token({ required: true }),
  show)

/**
 * @api {put} /postings/:id Update posting
 * @apiName UpdatePosting
 * @apiGroup Posting
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiParam title Posting's title.
 * @apiParam description Posting's description.
 * @apiParam location Posting's location.
 * @apiParam time Posting's time.
 * @apiParam category Posting's category.
 * @apiSuccess {Object} posting Posting's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Posting not found.
 * @apiError 401 user access only.
 */
router.put('/:id',
  token({ required: true }),
  body({ title, description, location, time, category, valid, visible, picture }),
  update)

/**
 * @api {delete} /postings/:id Delete posting
 * @apiName DeletePosting
 * @apiGroup Posting
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Posting not found.
 * @apiError 401 user access only.
 */
router.delete('/:id',
  token({ required: true }),
  destroy)

export default router
