const app = require('./app');
const { connectMongo } = require('./services/mongo');

const port = process.env.PORT || 3000;

app.listen(port, () => {
  connectMongo();
  console.log(`Server is running on port ${port}`);
});
