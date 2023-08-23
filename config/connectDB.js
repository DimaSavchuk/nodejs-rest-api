const { connect } = require("mongoose");

const connectDB = async () => {
  try {
    const dataBase = await connect(process.env.DB_URL);
    console.log(
      `Database '${dataBase.connection.name}' connection successful.`.green
        .italic.bold
    );
  } catch (error) {
    console.log(error.message.red.bold);
    process.exit(1);
  }
};

module.exports = connectDB;
