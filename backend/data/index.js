
const TutorialCtrl = require("./../controllers/tutorial.controller");
const CommentCtrl = require('./../controllers/comment.controller');
const TagCtrl = require("./../controllers/tag.controller");

//db.sequelize.sync();

module.exports = async () => {
    // create data
    const tut1 = await TutorialCtrl.create({
        title: "Tut#1",
        description: "Tut#1 Description",
    });
    const tut2 = await TutorialCtrl.create({
        title: "Tut#2",
        description: "Tut#2 Description",
    });
    const tut3 = await TutorialCtrl.create({
        title: "Tut#3",
        description: "Tut#3 Description",
    });

    const tut4 = await TutorialCtrl.create({
        title: "Tut#4",
        description: "Tut#4 Description",
    });
    const comment1 = await CommentCtrl.create(tut1.id, {
        name: "bezkoder",
        text: "Good job!",
    });
    await CommentCtrl.create(tut1.id, {
        name: "zkoder",
        text: "One of the best tuts!",
    });
    const comment2 = await CommentCtrl.create(tut2.id, {
        name: "aKoder",
        text: "Hi, thank you!",
    });
    await CommentCtrl.create(tut2.id, {
        name: "anotherKoder",
        text: "Awesome tut!",
    });
    const tag1 = await TagCtrl.create({
        name: "Tag#1",
    });
    const tag2 = await TagCtrl.create({
        name: "Tag#2",
    });
    await TagCtrl.addTutorial(tag1.id, tut1.id);


    await TagCtrl.addTutorial(tag1.id, tut2.id);
  

    await TagCtrl.addTutorial(tag1.id, tut3.id);
 

    await TagCtrl.addTutorial(tag2.id, tut3.id);
 

    await TagCtrl.addTutorial(tag2.id, tut4.id);


    await TagCtrl.addTutorial(tag2.id, tut1.id);

    // find data
    const tut1Data = await TutorialCtrl.findById(tut1.id);
    console.log(
        ">> Tutorial id=" + tut1Data.id,
        JSON.stringify(tut1Data, null, 2)
    );
    const tut2Data = await TutorialCtrl.findById(tut2.id);
    console.log(
        ">> Tutorial id=" + tut2Data.id,
        JSON.stringify(tut2Data, null, 2)
    );
    const comment1Data = await CommentCtrl.findById(comment1.id);
    console.log(
        ">> Comment id=" + comment1.id,
        JSON.stringify(comment1Data, null, 2)
    );
    const comment2Data = await CommentCtrl.findById(comment2.id);
    console.log(">> Comment id=" + comment2.id, JSON.stringify(comment2Data, null, 2));
    const _tag1 = await TagCtrl.findById(tag1.id);
    console.log(">> tag1", JSON.stringify(_tag1, null, 2));
    const tags = await TagCtrl.findAll();
    console.log(">> tags", JSON.stringify(tags, null, 2));

    const tutorials = await TutorialCtrl.findAll();
    console.log(">> All tutorials", JSON.stringify(tutorials, null, 2));
};