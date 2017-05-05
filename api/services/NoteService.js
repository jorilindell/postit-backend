module.exports = {

  setDoneStatus: (options, done) => {
    Note
      .update({id: options.noteId}, {done: options.done})
      .then((updatedNote) => {
        return done()
      }, (e) => {
        return done(e)
      })
  }
}
