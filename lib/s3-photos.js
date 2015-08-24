import s3 from 's3';
import commonEnv from 'common-env';

const env = commonEnv();

export default class S3Photos {
    constructor() {
        this.client = s3.createClient({
            s3Options: {
                accessKeyId: env.getOrDie('AWS_ACCESS_KEY'),
                secretAccessKey: env.getOrDie('AWS_SECRET_KEY')
            }
        });
        this.bucket = env.getOrDie('AWS_S3_BUCKET');
    }
    list() {
        return new Promise((resolve, reject) => {
            const results = [];

            this.client.listObjects({ s3Params: { Bucket: this.bucket } })
                .on('data', data => results.push.apply(results, data.Contents.map(obj => obj.Key)))
                .on('end', () => resolve(results))
                .on('error', err => reject(err));
        });
    }
    download(remoteFile, localPath) {
        return new Promise((resolve, reject) => {
            const options = {
                localFile: localPath,
                s3Params: {
                    Bucket: this.bucket,
                    Key: remoteFile
                }
            };

            this.client.downloadFile(options)
                .on('end', resolve)
                .on('error', reject);
        });
    }
}

