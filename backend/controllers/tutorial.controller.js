const db = require('./../models');
const Tutorial = db.tutorials;
const Comment = db.comments;
const Tag = db.tags;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
    if (!req.body.title) {
        res.status(400).send({
            message: "Title can not be empty"
        });
        return;
    }
    const tutorial = {
        title: req.body.title,
        description: req.body.description,
        published: req.body.published ? req.body.published : false
    };
    Tutorial.create({
        title: tutorial.title,
        description: tutorial.description,
        published: tutorial.published ? tutorial.published : false
    }).then((tutorial) => {
        console.log(`>> Created Tutorial ${JSON.stringify(tutorial, null, 4)}`);
        res.send(tutorial);
    }).catch((err) => {
        console.error(">> Error while creating tutorial: ", err);
        res.status(500).send({
            message: err.message || "Some error occurred while creating the tutorial."
        })
    });
}

exports.findAll = (req, res) => {
    const title = req.query.title;
    let condition = title ? {
        title: {
            [Op.like]: `%${title}%`
        }
    } : null;

    Tutorial.findAll({
        where: condition,
        include: [{
                model: Comment,
                as: "comments"
            },
            {
                model: Tag,
                as: "tags",
                attributes: ["id", "name"],
                through: {
                    attributes: [],
                },
            }
        ],
    }).then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving tutorials."
        });
    });
};

exports.findAllPublished = (req, res) => {
    Tutorial.findAll({
            where: {
                published: true
            }
        })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving tutorials."
            });
        });
};

exports.findById = (req, res) => {
    const id = req.params.id;

    Tutorial.findByPk(id, {
            include: [{
                    model: Comment,
                    as: "comments",
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
            res.send(tutorial);
        })
        .catch((err) => {
            console.log(">> Error while finding tutorial: ", err);
        });
};

exports.update = (req, res) => {
    const id = req.params.id;

    Tutorial.update(req.body, {
            where: {
                id: id
            }
        })
        .then((num) => {
            if (num == 1) {
                res.send({
                    message: "Tutorial was updated successfully"
                });
            } else {
                res.send({
                    message: `Connot update tutorial with id=${id}. Maybe Tutorial was not found or req.body is empty`
                })
            }
        })
        .catch(err => {
            res.status(500).send({
                message: `Error updating Tutorial with id=${id}`
            })
        })
}

exports.delete = (req, res) => {
    const id = req.params.id;

    Tutorial.destroy({
        where: {
            id: id
        }
    }).then(num => {
        if (num == 1) {
            res.send({
                message: "Tutorial was deleted successfully"
            });
        } else {
            res.send({
                message: `Cannot delete tutorial with id=${id}. Maybe tutorial was not found`
            });
        }
    }).catch(err => {
        res.status(500).send({
            message: `Error ${err.message}`
        });
    })
}

exports.deleteAll = (req, res) => {
    Tutorial.destroy({
            where: {},
            truncate: false
        })
        .then(nums => {
            res.send({
                message: `${nums} tutorials were deleted successfully`
            });
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while removing all tutorials"
            })
        })
}