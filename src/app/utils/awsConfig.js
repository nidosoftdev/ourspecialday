import aws from 'aws-sdk'
import crypto from 'crypto'
import {promisify} from 'util'

const randomBytes = promisify(crypto.randomBytes)
const region = "us-east-2"
const bucketName = "direct-upload-s3-bucket-nido"
const accessKeyId = process.env.NEXT_PUBLIC_ACCESS_KEY
const secretAccessKey =process.env.NEXT_PUBLIC_SECRET_KEY

const s3 = new aws.S3({
    region,
    accessKeyId,
    secretAccessKey,
    signatureVersion : 'v4'
})


export const generateUploadURL=async()=>{
    try{
    const rawBytes = await randomBytes(16)
 
    const imageName = rawBytes.toString('hex')
    
    const params = ({
        Bucket: bucketName,
        Key: imageName,
        Expires:60
    })

    const uploadURL = await s3.getSignedUrlPromise('putObject', params)
    return uploadURL
    }
    catch(err){
        throw err
    }
   
}