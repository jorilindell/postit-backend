module.exports = {
  create: (req, res) => {
    Board
      .create({"name": req.body.name})
      .then((createdBoard) => {
        res.ok(createdBoard)
      }, (e) => {
        res.badRequest(e);
      })
  },

  getBoards: (req, res) => {
    Board
      .find({}, {select: ['id', 'name']})
      .then((foundBoards) => {
        res.ok(foundBoards)
      }, (e) => {
        res.badRequest(e);
      })
  },

  getBoardDetails: (req, res) => {
    Board
      .findOne({id: req.param("boardId")}, {select: ['name']})
      .then((foundBoard) => {
        if(foundBoard !== undefined) {
          Note
            .find({boardId: req.param("boardId")}, {select: ['id', 'message', 'done']})
            .then((foundNotes) => {
              const resJSON = {"name": foundBoard.name}
              resJSON.notes = foundNotes
              res.ok(resJSON)
            } , (e) => {
              res.badRequest(e);
            })
        } else {
          res.notFound(`Board with id ${req.param("boardId")} not found`)
        }
      }, (e) => {
        res.badRequest(e);
      })
  },

  delete: (req, res) => {
    Board
      .findOne({id: req.param("boardId")})
      .then((foundBoard) => {
        if(foundBoard !== undefined) {
          Note
            .destroy({boardId: req.param("boardId")})
            .then(() => {
              res.ok()
            }, (e) => {
              res.badRequest(e);
            })
          Board
            .destroy({id: req.param("boardId")})
            .then(() => {
                res.ok()
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

  editBoard: (req, res) => {
    Board
      .update({id: req.param("boardId")}, {name: req.body.name})
      .then((editedBoards) => {
        if(editedBoards.length > 0) {
          res.ok(editedBoards)
        } else {
          res.notFound(`Board with id ${req.param("boardId")} not found`)
        }
      }, (e) => {
        res.badRequest(e)
      })
  },
}
