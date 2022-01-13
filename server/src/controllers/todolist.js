const { todolist } = require("../../models");

exports.getTodo = async (req, res) => {
  try {
    console.log(todolist);
    let data = await todolist.findAll({
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });

    res.send({
      status: "success...",
      data,
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "failed",
      message: "Server Error",
    });
  }
};

exports.addTodo = async (req, res) => {
  try {
    console.log(req.body)
    let data = await todolist.create({
        description: req.body.description,
        status: "On Progress"
    });

    res.send({
      status: "success...",
      data: {
          id: data.id,
          description: data.description,
          status: data.status
      }
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "failed",
      message: "Server Error",
    });
  }
};

exports.updateTodo = async (req, res) => {
  try {
    const {id} = req.params

    const data = {
        status: "Done"
      };
  

    let updateData = await todolist.update(data,{
      where: {
          id,
      }
    });

    res.send({
      status: "success...",
      data,
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "failed",
      message: "Server Error",
    });
  }
};

exports.deleteTodo = async (req, res) => {
  try {
    const {id} = req.params

    await todolist.destroy({
        where: {
          id,
        },
      });

    res.send({
      status: "success...",
      message: `Delete id: ${id} finished`,
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "failed",
      message: "Server Error",
    });
  }
};
