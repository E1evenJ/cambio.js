/**
 * Created by bournewang on 16/9/7.
 */
(function () {
    'use strict';

    angular
        .module('files')
        .factory('FileInfoResource', FileInfoResource);

    /* @ngInject */
    function FileInfoResource(baseResource) {
        let FileInfo = baseResource('/api/fileInfo/:fileId', {fileId: '@_id'}, {
            getFileInfo: {
                url: '/api/fileInfo/:pageSize/:pageNum/:queryString',
                method: 'GET'
            }
        });
        return FileInfo;
    }
}());
