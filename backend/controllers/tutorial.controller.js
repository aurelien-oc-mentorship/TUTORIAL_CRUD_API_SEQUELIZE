const db = require('./../models');
const Tutorial = db.tutorials;
const Comment = db.comments;
const Tag = db.tags;

exports.create = (tutorial) => {
    return Tutorial.create({
        title: tutorial.title,
        description: tutorial.description,
        published: tutorial.published ? tutorial.published : false
    }).then((tutorial) => {
        console.log(`>> Created Tutorial ${JSON.stringify(tutorial, null, 4)}`);
        return tutorial;
    }).catch((err) => {
        console.error(">> Error while creating tutorial: ", err);
    });
}

exports.findAll = () => {
    return Tutorial.findAll({
      include: [
        {
            model: Comment,
            as: "comments"
        },
        {
            model: Tag,
            as: "tags",
            attributes: ["id", "name"],
            through: {
                attributes:[],
            },
        }
        ],
    }).then((tutorials) => {
      return tutorials;
    });
  }; 

exports.findById = (tutorialId) => {
    return Tutorial.findByPk(tutorialId, { 
        include: [
            {
                model:Comment,
                as:"comments",
            },
            {
                model: Tag,
                as: "tags",
                attributes: ["id", "name"],
                through: {
                    attributes: [],
                }
            }
        ] 
    })
      .then((tutorial) => {
        return tutorial;
      })
      .catch((err) => {
        console.log(">> Error while finding tutorial: ", err);
        });
  };

  