const path = require ('path');

const rootPath = __dirname;

module.exports = {
  rootPath,
  uploadPath: path.join(rootPath, '/public/uploads/'),
  db: {
    url: 'mongodb://localhost/HW85',
  },
  facebook: {
    appId: '603135217617672',
    appSecret: '41988724d1af6ced3b9337f8626c53be',
  }
};