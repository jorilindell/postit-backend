module.exports = {
  attributes: {
    name: {
      type: 'string',
      required: true,
      unique: 'true',
      minLength: 3,
      maxLength: 40
    },

    // Add a reference to Notes
    notes: {
      collection: 'note',
      via: 'boardId'
    }
  },
  schema: true
}
