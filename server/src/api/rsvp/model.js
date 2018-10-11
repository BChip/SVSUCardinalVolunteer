import mongoose, { Schema } from 'mongoose'

const rsvpSchema = new Schema({
  user: {
    type: Schema.ObjectId,
    ref: 'User',
    required: true
  },
  posting: {
    type: Schema.ObjectId,
    ref: 'Posting',
    required: true
  }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (obj, ret) => { delete ret._id }
  }
})

rsvpSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      user: this.user.view(full),
      posting: this.posting,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}

const model = mongoose.model('Rsvp', rsvpSchema)

export const schema = model.schema
export default model
