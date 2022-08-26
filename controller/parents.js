const pool = require("../config/database");
const bcrypt = require("bcryptjs");

const Hashedfunction = async function (password) {
  let hashPassword = await bcrypt.hash(password, 12);
  return hashPassword;
};

const getAll = async (req, res) => {
  try {
    const data = await pool.query("SELECT * FROM parents;");
    if (data.rows) {
      res.status(200).json({
        status: "Succes",
        message: "BUnaqa foydalanuvchi mavjud emas",
      });
      return;
    }
    res.status(200).json({
      status: "Succes",
      data: data.rows,
    });
  } catch (err) {
    res.status(404).json({
      status: "Error",
      message: err.message,
    });
  }
};
const add = async (req, res) => {
  try {
    if (req.body.password.length <= 8) {
      console.log("ishladi");
      res.status(201).json({
        status: "Succes",
        message: "Siz 8 dan ko'proq belgi kiritishingiz lozim!",
      });
      return;
    }
    req.body.password = await Hashedfunction(req.body.password);
    const data = await pool.query(
      `INSERT INTO parents(name,username,password) VALUES($1,$2,$3) RETURNING *`,
      [req.body.name, req.body.username, req.body.password]
    );
    res.status(201).json({
      status: "Succes",
      data: data.rows,
    });
  } catch (err) {
    res.status(404).json({
      status: "Error",
      message: err.message,
    });
  }
};
const getOne = async (req, res) => {
  try {
    const data = await pool.query(`SELECT * FROM parents where id=$1`, [
      req.params.id,
    ]);
    res.status(201).json({
      status: "Succes",
      data: data.rows,
    });
  } catch (err) {
    res.status(404).json({
      status: "Error",
      message: err.message,
    });
  }
};
const updateOne = async (req, res) => {
  try {
    const oldData = await pool.query("SELECT * from parents where id=$1", [
      req.params.id,
    ]);
    console.log(oldData.rows[0]);
    const data = await pool.query(
      `Update parents set name=$1,username=$3,password=$2 where id=$4 RETURNING *`,
      [
        req.body.name || oldData.rows[0].name,
        req.body.username || oldData.rows[0].username,
        req.body.password || oldData.rows[0].password,
        req.params.id,
      ]
    );
    res.status(201).json({
      status: "Succes",
      data: data.rows,
    });
  } catch (err) {
    res.status(404).json({
      status: "Error",
      message: err.message,
    });
  }
};
const deleteOne = async (req, res) => {
  try {
    const data = await pool.query(`DELETE FROM parents  where id=$1 `, [
      req.params.id,
    ]);
    res.status(204).json({
      status: "Succes",
      data: data.rows,
    });
  } catch (err) {
    res.status(404).json({
      status: "Error",
      message: err.message,
    });
  }
};
module.exports = { getAll, deleteOne, add, getOne, updateOne };
