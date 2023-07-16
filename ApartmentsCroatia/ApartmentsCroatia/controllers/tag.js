const Tag = require("../models/Tag");
const fs = require("fs");

exports.create = async (req, res) => {
  const { filename } = req.file;
  const { tagName } = req.body;

  try {
    let newTag = new Tag();

    newTag.name = tagName;
    newTag.image = filename;
    await newTag.save();

    res.status(200).json({
      successMessage: `Tag created successfully!`,
    });
  } catch (err) {
    res.status(500).json({
      errorMessage: "Please try again later",
    });
  }
};

exports.readAll = async (req, res) => {
  try {
    const tags = await Tag.find({});

    res.status(200).json({
      tags,
    });
  } catch (err) {
    res.status(500).json({
      errorMessage: "Please try again later",
    });
  }
};

exports.details = async (req, res) => {
  try {
    const tagId = req.params.tagId;
    const tag = await Tag.findById(tagId);

    res.json(tag);
  } catch (err) {
    res.status(500).json({
      errorMessage: "Please try again later",
    });
  }
};

exports.update = async (req, res) => {
  const tagId = req.params.tagId;

  await Tag.findByIdAndUpdate(tagId, req.body);

  res.json({
    successMessage: "Tag updated successfully!",
  });
};

exports.delete = async (req, res) => {
  try {
    const tagId = req.params.tagId;
    const deletedTag = await Tag.findByIdAndDelete(tagId);

    fs.unlink(`uploads/${deletedTag.image}`, (err) => {
      if (err) throw err;
      console.log(
        "Image successfully deleted from filesystem: ",
        deletedTag.image
      );
    });

    res.json(deletedTag);
  } catch (err) {
    res.status(500).json({
      errorMessage: "Please try again later",
    });
  }
};

exports.getSeachByNameResult = async (req, res) => {
  try {
    let filteredTags = [];
    const searchName = req.params.name;
    const tags = await Tag.find({});

    const promise = tags.map(async (tId) => {
      const tagObject = await Tag.findById(tId);
      return tagObject;
    });

    const tagObjects = await Promise.all(promise);

    tagObjects.forEach((t) => {
      if (t.name.toLowerCase().includes(searchName.toLowerCase())) {
        filteredTags.push(t);
      }
    });

    res.status(200).json({
      filteredTags,
    });
  } catch (err) {
    res.status(500).json({
      errorMessage: "Please try again later",
    });
  }
};
