const db = require('./../models');
const Tutorial = db.tutorials;
const Comment = db.comments;

exports.create = (tutorialId, comment) => {
    return Comment.create({
        name: comment.name,
        text: comment.text,
        tutorialId: tutorialId,
    }).then((comment) => {
        console.log(`>> Created Comment ${JSON.stringify(comment, null, 4)}`);
        return comment;
    }).catch((err) => {
        console.error(">> Error while creating comment: ", err);
    });
}

exports.findById = (id) => {
    return Comment.findByPk(id, { include: ["tutorial"] })
      .then((comment) => {
        return comment;
      })
      .catch((err) => {
        console.log(">> Error while finding comment: ", err);
      });
  };
