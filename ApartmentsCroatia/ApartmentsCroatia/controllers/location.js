const Location = require("../models/Location");
const fs = require("fs");

exports.create = async (req, res) => {
  const { filename } = req.file;
  const { locationName, locationDescription } = req.body;

  try {
    let newLocation = new Location();

    newLocation.name = locationName;
    newLocation.image = filename;
    newLocation.description = locationDescription;
    await newLocation.save();

    res.status(200).json({
      successMessage: `Location created successfully!`,
    });
  } catch (err) {
    res.status(500).json({
      errorMessage: "Please try again later",
    });
  }
};

exports.readAll = async (req, res) => {
  try {
    const locations = await Location.find({});

    res.status(200).json({
      locations,
    });
  } catch (err) {
    res.status(500).json({
      errorMessage: "Please try again later",
    });
  }
};

exports.details = async (req, res) => {
  try {
    const locationId = req.params.locationId;
    const location = await Location.findById(locationId);

    res.json(location);
  } catch (err) {
    res.status(500).json({
      errorMessage: "Please try again later",
    });
  }
};

exports.update = async (req, res) => {
  const locationId = req.params.locationId;

  await Location.findByIdAndUpdate(locationId, req.body);

  res.json({
    successMessage: "Location updated successfully!",
  });
};

exports.delete = async (req, res) => {
  try {
    const locationId = req.params.locationId;
    const deletedLocation = await Location.findByIdAndDelete(locationId);

    fs.unlink(`uploads/${deletedLocation.image}`, (err) => {
      if (err) throw err;
      console.log(
        "Image successfully deleted from filesystem: ",
        deletedLocation.image
      );
    });

    res.json(deletedLocation);
  } catch (err) {
    res.status(500).json({
      errorMessage: "Please try again later",
    });
  }
};

exports.getSeachByNameResult = async (req, res) => {
  try {
    let filteredLocations = [];
    const searchName = req.params.name;
    const locations = await Location.find({});

    const promise = locations.map(async (lId) => {
      const locationObject = await Location.findById(lId);
      return locationObject;
    });

    const locationObjects = await Promise.all(promise);

    locationObjects.forEach((l) => {
      if (l.name.toLowerCase().includes(searchName.toLowerCase())) {
        filteredLocations.push(l);
      }
    });

    res.status(200).json({
      filteredLocations,
    });
  } catch (err) {
    res.status(500).json({
      errorMessage: "Please try again later",
    });
  }
};
