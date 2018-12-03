import mongoose, { Schema } from 'mongoose'

const postingSchema = new Schema({
  user: {
    type: Schema.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  time: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  valid: {
    type: Boolean,
    required: true,
    default: true
  },
  visible: {
    type: Boolean,
    required: true,
    default: false
  },
  picture: {
    type: String
  },
  rsvp: [{ type: Schema.ObjectId, ref: 'User' }]
}, {
  usePushEach: true,
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (obj, ret) => { delete ret._id }
  }
})




postingSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      user: this.user.view(full),
      title: this.title,
      category: this.category,
      description: this.description,
      location: this.location,
      time: this.time,
      valid: this.valid,
      visible: this.visible,
      pic: this.picture,
      rsvp: this.rsvp,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}

const model = mongoose.model('Posting', postingSchema)

export const schema = model.schema
export default model


