const Type = require("../models/Type");
const fs = require("fs");

exports.create = async (req, res) => {
  const { filename } = req.file;
  const { typeName } = req.body;

  try {
    let newType = new Type();

    newType.name = typeName;
    newType.image = filename;
    await newType.save();

    res.status(200).json({
      successMessage: `Type created successfully!`,
    });
  } catch (err) {
    res.status(500).json({
      errorMessage: "Please try again later",
    });
  }
};

exports.readAll = async (req, res) => {
  try {
    const types = await Type.find({});

    res.status(200).json({
      types,
    });
  } catch (err) {
    res.status(500).json({
      errorMessage: "Please try again later",
    });
  }
};

exports.details = async (req, res) => {
  try {
    const typeId = req.params.typeId;
    const type = await Type.findById(typeId);

    res.json(type);
  } catch (err) {
    res.status(500).json({
      errorMessage: "Please try again later",
    });
  }
};

exports.update = async (req, res) => {
  const typeId = req.params.typeId;

  await Type.findByIdAndUpdate(typeId, req.body);

  res.json({
    successMessage: "Type updated successfully!",
  });
};

exports.delete = async (req, res) => {
  try {
    const typeId = req.params.typeId;
    const deletedType = await Type.findByIdAndDelete(typeId);

    fs.unlink(`uploads/${deletedType.image}`, (err) => {
      if (err) throw err;
      console.log(
        "Image successfully deleted from filesystem: ",
        deletedType.image
      );
    });

    res.json(deletedType);
  } catch (err) {
    res.status(500).json({
      errorMessage: "Please try again later",
    });
  }
};

exports.getSeachByNameResult = async (req, res) => {
  try {
    let filteredTypes = [];
    const searchName = req.params.name;
    const types = await Type.find({});

    const promise = types.map(async (tId) => {
      const typeObject = await Type.findById(tId);
      return typeObject;
    });

    const typeObjects = await Promise.all(promise);

    typeObjects.forEach((t) => {
      if (t.name.toLowerCase().includes(searchName.toLowerCase())) {
        filteredTypes.push(t);
      }
    });

    res.status(200).json({
      filteredTypes,
    });
  } catch (err) {
    res.status(500).json({
      errorMessage: "Please try again later",
    });
  }
};
