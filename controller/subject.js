const pool = require("../config/database");
const getAll = async (req, res) => {
  try {
    const data = await pool.query("SELECT * FROM subject;");
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
    const data = await pool.query(
      `INSERT INTO subject(title,class_id) VALUES($1,$2) RETURNING *`,
      [req.body.title, req.body.class_id]
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
    const data = await pool.query(`SELECT * FROM subject where id=$1`, [
      req.params.id,
    ]);
    if (data.rows) {
      res.status(200).json({
        status: "Succes",
        message: "BUnaqa foydalanuvchi mavjud emas",
      });
      return;
    }
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
    const oldData = await pool.query("SELECT * from subject where id=$1", [
      req.params.id,
    ]);
    console.log(oldData.rows[0]);
    const data = await pool.query(
      `Update subject set title=$1,class_id=$2 where id=$3 RETURNING *`,
      [
        req.body.title || oldData.rows[0].title,
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
    const data = await pool.query(`DELETE FROM subject  where id=$1 `, [
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
