module.exports = {

  create: (req, res) => {
    Board
      .findOne({id: req.param("boardId")})
      .then((foundBoard) => {
        if(foundBoard !== undefined) {
          Note
            .create({"message": req.body.message, "boardId": req.param("boardId")})
            .then((createdNote) => {
              res.ok(createdNote)
            }, (e) => {
                res.badRequest(e);
            })
        } else {
          res.notFound(`Board with id ${req.param("boardId")} not found`)
        }
      }, (e) => {
        res.badRequest(e)
      })
  },

  delete: (req, res) => {
    Note
      .destroy({id: req.param("noteId")})
      .then((deletedNotes) => {
        if(deletedNotes.length > 0) {
          res.ok(deletedNotes);
        } else {
          res.notFound(`Note with id ${req.param("noteId")} not found`)
        }
      }, (e) => {
        res.badRequest(e)
      })
  },

  editNote: (req, res) => {
    Note
      .update({id: req.param("noteId")}, {message: req.body.message})
      .then((updatedNotes) => {
        if(updatedNotes.length > 0) {
          res.ok(updatedNotes)
        } else {
          res.notFound(`Note with id ${req.param("noteId")} not found`)
        }
      }, (e) => {
        res.badRequest(e)
      })
  },

  setDone: (req, res) => {
    Note
      .findOne({id: req.param("noteId")})
      .then((foundNote) => {
        if(foundNote !== undefined) {
          NoteService.setDoneStatus({noteId: req.param("noteId"), done: true},
          (e) => {
            if (e) {
              return res.serverError(e);
            } else {
                return res.ok(foundNote);
            }
          });
        } else {
          res.notFound(`Note with id ${req.param("noteId")} not found`)
        }
      }, (e) => {
        res.badRequest(e)
      })
  },

  setUndone: (req, res) => {
    Note
      .findOne({id: req.param("noteId")})
      .then((foundNote) => {
        if(foundNote !== undefined) {
          NoteService.setDoneStatus({noteId: req.param("noteId"), done: false},
          (e) => {
            if (e) {
              return res.serverError(e);
            } else {
                return res.ok(foundNote);
            }
          });
        } else {
          res.notFound(`Note with id ${req.param("noteId")} not found`)
        }
      }, (e) => {
        res.badRequest(e)
      })
  },
}
