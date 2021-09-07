import AWS from 'aws-sdk'

export default class UploadAdapter {
    constructor(loader) {
        this.loader = loader;
        console.log(loader);
    }

    s3upload(file) {
        // console.log(file);
        AWS.config.update({
            region: process.env.VUE_APP_BUCKETREGION,
            credentials: new AWS.CognitoIdentityCredentials({
                IdentityPoolId: process.env.VUE_APP_IDENTITYPOOLID
            })
        });

        let s3 = new AWS.S3({
            apiVersion: "2006-03-01",
            params: { Bucket: process.env.VUE_APP_ALBUMBUCKETNAME }
        });


        let albumPhotosKey = encodeURIComponent('camp') + "/";
        let photoKey = albumPhotosKey + file.name;

        return new AWS.S3.ManagedUpload({
            params: {
                Bucket: process.env.VUE_APP_ALBUMBUCKETNAME,
                Key: photoKey,
                Body: file
            }
        });
    }


    upload() {

        return this.loader.file.then( file => new Promise(((resolve, reject) => {

            let upload = this.s3upload(file);
            let promise = upload.promise();

            promise.then(
                function(data) {
                    console.log(data.Location);
                    resolve({
                        default: data.Location
                    })
                    // alert("Successfully uploaded photo.");
                    // viewAlbum(albumName);
                },
                function(err) {
                    // alert("이미지 불러오기 실패 ", err.message);
                    return reject( '이미지 불러오기 실패');
                }
            );
        })))
    }
}
