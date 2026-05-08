const {Tag} = require("../models");
exports.createTag = async (req, res) => {
  try{
    const {name,color} = req.body;
    const existingTag = await Tag.findOne({
      where: {
        name,
        userId: req.user.id,
      },
    });
    if(existingTag) {
      return res.status(400).json({
        message: "Tag already exists",
      });
    }
    const tag=await Tag.create({
      name,
      color,
      userId: req.user.id,
    });
    res.status(201).json(tag);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

exports.getTags = async(req, res) => {
  try{
    const tags = await Tag.findAll({
      where: {
        userId: req.user.id,
      },
      order: [["created_at", "DESC"]],
    });

    res.status(200).json(tags);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

exports.deleteTag = async(req,res) =>{
  try{
    const tag = await Tag.findOne({
      where: {
        id: req.params.id,
        userId: req.user.id,
      },
    });
    if(!tag){
      return res.status(404).json({
        message: "Tag not found",
      });
    }
    await tag.destroy();
    res.status(200).json({
      message: "Tag deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};