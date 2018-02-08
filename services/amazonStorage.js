let aws = require('aws-sdk/clients/s3')
let multer = require('multer')
let multerS3 = require('multer-s3')


//should be hidden / stored in env later

aws_access_key_id = 'AKIAJ6TXWBLTRCDQCVKA';
aws_secret_access_key = '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'

let s3 = new aws.S3({

})

let upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: 'txt-aguila',
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