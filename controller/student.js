const pool = require("../config/database");
const bcrypt = require("bcryptjs");

const Hashedfunction = async function (password) {
  let hashPassword = await bcrypt.hash(password, 12);
  return hashPassword;
};

const getAll = async (req, res) => {
  try {
    const data = await pool.query("SELECT * FROM student;");
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
      `INSERT INTO student(fullname,course,username,password,class_id) VALUES($1,$2,$3,$4,$5) RETURNING *`,
      [
        req.body.fullname,
        req.body.course,
        req.body.username,
        req.body.password,
        req.body.class_id,
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
const getOne = async (req, res) => {
  try {
    const data = await pool.query(`SELECT * FROM student where id=$1`, [
      req.params.id,
    ]);
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
const updateOne = async (req, res) => {
  try {
    const oldData = await pool.query("SELECT * from student where id=$1", [
      req.params.id,
    ]);
    const data = await pool.query(
      `Update student set fullname=$1,course=$2,username=$3,password=$4,class_id=$5 where id=$6 RETURNING *`,
      [
        req.body.fullname || oldData.rows[0].fullname,
        req.body.course || oldData.rows[0].course,
        req.body.username || oldData.rows[0].username,
        req.body.password || oldData.rows[0].password,
        req.body.class_id || oldData.rows[0].class_id,
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
    const data = await pool.query(`DELETE FROM student  where id=$1 `, [
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
