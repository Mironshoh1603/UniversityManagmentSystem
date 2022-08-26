const pool = require("../config/database");
const getAll = async (req, res) => {
  try {
    const data = await pool.query("SELECT * FROM task;");
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
      `INSERT INTO task(name,max_mark,subject_id) VALUES($1,$2,$3) RETURNING *`,
      [req.body.name, req.body.max_mark, req.body.subject_id]
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
    const data = await pool.query(`SELECT * FROM task where id=$1`, [
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
    const oldData = await pool.query("SELECT * from task where id=$1", [
      req.params.id,
    ]);
    console.log(oldData.rows[0]);
    const data = await pool.query(
      `Update task set name=$1,max_mark=$3,subject_id=$2 where id=$4 RETURNING *`,
      [
        req.body.name || oldData.rows[0].name,
        req.body.max_mark || oldData.rows[0].max_mark,
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
    const data = await pool.query(`DELETE FROM task  where id=$1 `, [
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
