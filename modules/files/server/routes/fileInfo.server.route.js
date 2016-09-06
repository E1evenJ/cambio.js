/**
 * Created by bournewang on 16/8/8.
 */
'use strict';
const fileInfos = require('../controllers/fileInfo.server.controller'),
  fileInfoPolicy = require('../policies/fileInfo.server.policy');
module.exports = function(app) {
  app.route('/api/file/:pageSize/:pageNum/:queryString').get(fileInfoPolicy.isAllowed).get(fileInfos.list);
};