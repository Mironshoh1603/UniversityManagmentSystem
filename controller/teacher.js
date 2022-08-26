const pool = require("../config/database");
const bcrypt = require("bcryptjs");

const Hashedfunction = async function (password) {
  let hashPassword = await bcrypt.hash(password, 12);
  return hashPassword;
};

const getAll = async (req, res) => {
  try {
    const data = await pool.query("SELECT * FROM teacher;");
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
      `INSERT INTO teacher(fullname,degree,exprience,username,password,subject_id) VALUES($1,$2,$3,$4,$5,$6) RETURNING *`,
      [
        req.body.fullname,
        req.body.degree,
        req.body.exprience,
        req.body.username,
        req.body.password,
        req.body.subject_id,
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
    const data = await pool.query(`SELECT * FROM teacher where id=$1`, [
      req.params.id,
    ]);
    console.log(Boolean(data.rows));

    if (!data.rows) {
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
    const oldData = await pool.query("SELECT * from teacher where id=$1", [
      req.params.id,
    ]);
    const data = await pool.query(
      `Update teacher set fullname=$1,degree=$2,exprience=$3,username=$4,password=$5,subject_id=$6 where id=$7 RETURNING *`,
      [
        req.body.fullname || oldData.rows[0].fullname,
        req.body.degree || oldData.rows[0].degree,
        req.body.exprience || oldData.rows[0].exprience,
        req.body.username || oldData.rows[0].username,
        req.body.password || oldData.rows[0].password,
        req.body.subject_id || oldData.rows[0].subject_id,
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
    const data = await pool.query(`DELETE FROM teacher  where id=$1 `, [
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
