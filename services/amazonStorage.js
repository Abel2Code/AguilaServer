let AWS = require('aws-sdk');
let multer = require('multer');
let multerS3 = require('multer-s3');

AWS.config.loadFromPath('./config.json');
let s3 = new AWS.S3();
let bucketName = "txt-aguila";

let upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: bucketName,
        acl: 'public-read',
        metadata: function(req, file, cb) {
            cb(null, {fieldName: file.fieldname});
        },
        key: function(req, file, cb){
            cb(null, Date.now().toString())
        }
    })
})

module.exports = {
    s3 : s3,
    upload : upload
}