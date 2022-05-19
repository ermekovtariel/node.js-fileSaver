const express = require('express');
const config = require('config');
const mongoose = require('mongoose');

const app = express();

const PORT = config.get('port') || 5000;

app.use(express.json({ extended: true }));

app.use('/files', require('./routes/files.routes'));

async function start() {
  try {
    await mongoose.connect(config.get('mongoURI'), {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    app.listen(PORT, () => console.log(`app has started ${PORT}`));
  } catch (e) {
    console.log('server Error', e.message);
    process.exit(1);
  }
}
start();
