import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { token } from '../../services/passport'
import { create, index, show, update, destroy } from './controller'
import { schema } from './model'
export Rsvp, { schema } from './model'

const router = new Router()
const { posting } = schema.tree

/**
 * @api {post} /rsvps Create rsvp
 * @apiName CreateRsvp
 * @apiGroup Rsvp
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiParam posting Rsvp's posting.
 * @apiSuccess {Object} rsvp Rsvp's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Rsvp not found.
 * @apiError 401 user access only.
 */
router.post('/',
  token({ required: true }),
  body({ posting }),
  create)

/**
 * @api {get} /rsvps Retrieve rsvps
 * @apiName RetrieveRsvps
 * @apiGroup Rsvp
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiUse listParams
 * @apiSuccess {Object[]} rsvps List of rsvps.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 user access only.
 */
router.get('/',
  token({ required: true }),
  query(),
  index)

/**
 * @api {get} /rsvps/:id Retrieve rsvp
 * @apiName RetrieveRsvp
 * @apiGroup Rsvp
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiSuccess {Object} rsvp Rsvp's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Rsvp not found.
 * @apiError 401 user access only.
 */
router.get('/:id',
  token({ required: true }),
  show)

/**
 * @api {put} /rsvps/:id Update rsvp
 * @apiName UpdateRsvp
 * @apiGroup Rsvp
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiParam posting Rsvp's posting.
 * @apiSuccess {Object} rsvp Rsvp's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Rsvp not found.
 * @apiError 401 user access only.
 */
router.put('/:id',
  token({ required: true }),
  body({ posting }),
  update)

/**
 * @api {delete} /rsvps/:id Delete rsvp
 * @apiName DeleteRsvp
 * @apiGroup Rsvp
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Rsvp not found.
 * @apiError 401 user access only.
 */
router.delete('/:id',
  token({ required: true }),
  destroy)

export default router
