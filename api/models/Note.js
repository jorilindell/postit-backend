module.exports = {
  attributes: {
    message: {
      type: 'string',
      required: true,
      minLength: 1,
    },
    done: {
      type: 'boolean',
      defaultsTo: false
    },
    // Add a reference to Board
    boardId: {
      model: 'board'
    }
  },
  schema: true

}
