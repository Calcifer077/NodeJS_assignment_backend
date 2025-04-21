function calcDistance(lat, lng, userLat, userLong) {
  const dx = Math.abs(lat - userLat);
  const dy = Math.abs(lng - userLong);

  return Math.sqrt(dx * dx + dy * dy);
}

// If we have a local sql server, i have used SSMS
/*
const { executeQuery, sql } = require("./db");


exports.listSchools = async function (req, res) {
  const { lat, lng } = req.query;

  if (!lat || !lng) {
    return res.status(400).json({
      status: "failure",
      message: "Latitude or longitude missing of user",
    });
  }

  try {
    const query =
      "select id, name, address, latitude, longitude from tbl_school";

    const schools = await executeQuery(query);

    const schoolsWithDistance = schools.map((school) => {
      const distance = calcDistance(
        school.latitude,
        lat,
        school.longitude,
        lng
      );

      return { ...school, distance: distance.toFixed(2) };
    });

    schoolsWithDistance.sort((a, b) => a.distance - b.distance);

    res.status(200).json({
      status: "success",
      count: schoolsWithDistance.length,
      data: schoolsWithDistance,
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
};

exports.addSchool = async function (req, res) {
  const { name, address, latitude, longitude } = req.body;

  if (!name || !address || !latitude || !longitude) {
    return res.status(400).json({
      status: "failure",
      message: "All fields are required",
    });
  }

  if (isNaN(latitude) || isNaN(longitude)) {
    return res.status(400).json({
      status: "failure",
      message: "Latitude and longitude must be numbers.",
    });
  }

  if (latitude < -90 || latitude > 90 || longitude < -180 || longitude > 180) {
    return res.status(400).json({
      status: "fail",
      message:
        "Latitude must be between -90 and 90, and Longitude must be between -180 and 180.",
    });
  }

  try {
    const query = `
      insert into tbl_school (name, address, latitude, longitude)
      values (@name, @address, @latitude, @longitude)
    `;

    const result = await executeQuery(query, [
      { name: "name", type: sql.NVarChar, value: name },
      { name: "address", type: sql.NVarChar, value: address },
      { name: "latitude", type: sql.Float, value: latitude },
      { name: "longitude", type: sql.Float, value: longitude },
    ]);

    res.status(201).json({
      status: "success",
      message: "School added successfully",
      data: { name, address, latitude: latitude, longitude: longitude },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      status: "error",
      message: "Error inserting school into the database.",
    });
  }
};

*/

const { supabase } = require("./supabase");

exports.listSchools = async function (req, res) {
  const { lat, lng } = req.query;
  const { data: schools, error } = await supabase.from("Schools").select("*");

  if (error) {
    return res.status(400).json({
      status: "failure",
      frontendUrl: "https://node-js-assignment-frontend.vercel.app/",
      message: "Latitude and longitude must be numbers.",
    });
  }

  const schoolsWithDistance = schools.map((school) => {
    const distance = calcDistance(school.latitude, lat, school.longitude, lng);

    return { ...school, distance: distance.toFixed(2) };
  });

  schoolsWithDistance.sort((a, b) => a.distance - b.distance);

  res.status(200).json({
    status: "success",
    frontendUrl: "https://node-js-assignment-frontend.vercel.app/",
    count: schoolsWithDistance.length,
    data: schoolsWithDistance,
  });
};

exports.addSchool = async function (req, res) {
  const { name, address, latitude, longitude } = req.body;

  if (!name || !address || !latitude || !longitude) {
    return res.status(400).json({
      status: "failure",
      frontendUrl: "https://node-js-assignment-frontend.vercel.app/",
      message: "All fields are required",
    });
  }

  if (isNaN(latitude) || isNaN(longitude)) {
    throw new Error("Latitude and longitude must be numbers.");
  }

  if (latitude < -90 || latitude > 90 || longitude < -180 || longitude > 180) {
    return res.status(400).json({
      status: "fail",
      frontendUrl: "https://node-js-assignment-frontend.vercel.app/",
      message:
        "Latitude must be between -90 and 90, and Longitude must be between -180 and 180.",
    });
  }

  const { data: school, error } = await supabase
    .from("Schools")
    .insert([
      {
        name: name,
        address: address,
        latitude: latitude,
        longitude: longitude,
      },
    ])
    .select();

  if (error) {
    return res.status(400).json({
      status: "failure",
      frontendUrl: "https://node-js-assignment-frontend.vercel.app/",
      message: "Something went wrong while adding a new school.",
    });
  }

  res.status(200).json({
    status: "success",
    frontendUrl: "https://node-js-assignment-frontend.vercel.app/",
    data: school,
  });
};
