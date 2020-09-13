const express = require("express");
const app = express();
const morgan = require("morgan");
const mongoose = require("mongoose");
const { graphqlHTTP } = require("express-graphql");
const schema = require("./graphQLApi/schema/root");

//connect mongodb atlas
// mongoose.set("useNewUrlParser", true);
// mongoose.set("useFindAndModify", false);
// mongoose.set("useCreateIndex", true);
// mongoose.set("useUnifiedTopology", true);
mongoose.connect(
  "mongodb+srv://rothi:" +
    process.env.MONGO_ATLAS_PASSWORD +
    "@cluster0.cmtmt.mongodb.net/" +
    process.env.DB_NAME +
    "?retryWrites=true&w=majority"
);
// .then((res) => {
//   console.log("Then" + res);
// })
// .catch((err) => {
//   console.log("Catch " + err);
// });

app.use(morgan("dev"));
app.use(
  "/api/graphql",
  graphqlHTTP({
    graphiql: true,
    schema,
  })
);

//handle error
app.use((req, res, next) => {
  const error = new Error("Not found");
  error.status = 404;
  next(error);
});
app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});

module.exports = app;
