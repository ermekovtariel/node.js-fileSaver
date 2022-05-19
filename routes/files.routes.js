const { Router } = require('express');
const multer = require('multer');
const File = require('../models/File');
const router = Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, req.params.filename);
  },
});

const upload = multer({
  storage: storage,
});

//! /files/:filename PUT
router.put('/:filename', upload.single(`image`), async (req, res) => {
  const { filename } = req.params.filename;
  const candidate = await File.findOne({ filename });

  if (candidate) {
    return res
      .status(400)
      .json({ message: 'Такой пользователь уже существует' });
  }

  const newFile = new File({
    filename: req.params.filename,
    image: req.file.path,
  });

  await newFile.save();
  process.stdout.write('Начало сохранения файла' + '\n');

  res.status(201).json('success uploaded');

  if (req.file.size > 1024 * 1024 * 1024) {
    process.stdout.write(
      'Общий размер файлов в папке превысил определенный лимит (например 10 МБ)' +
        '\n'
    );
  }

  process.stdout.write('Окончание сохранения файла' + '\n');
  try {
  } catch (error) {
    res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' });
  }
});

//! /files/:filename GET
router.get('/:filename', async (req, res) => {
  try {
    const data = await File.findOne({ filename: req.params.filename });
    res.json(data);
  } catch (e) {
    res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' });
  }
});

module.exports = router;
