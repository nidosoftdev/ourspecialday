import {generateUploadURL} from "../utils/awsConfig"

const validFiles = ['image/jpg', 'image/jpeg', 'image/png']

export const imageUploader= async(file)=>{
    const imageUrl = await generateUploadURL()
    console.log(imageUrl)
    if(validFiles.find(type=>type === file.type)){
        const result = await fetch(imageUrl, {
            method: "PUT",
            headers:{
                "Content-Type":"multipart/form-data"
            },
            body:file
        })
        return result.url.split('?')[0]
    }
    else
    {
        return false
    }

}
// "https://direct-upload-s3-bucket-nido.s3.us-east-2.amazonaws.com/28714db0f914df46995c1fa84b332e3d?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIA47CR26EQVWD3LMX4%2F20240514%2Fus-east-2%2Fs3%2Faws4_request&X-Amz-Date=20240514T225957Z&X-Amz-Expires=60&X-Amz-Signature=f07df73f1317035e7141694fab01c55fd45111593bd824a09c085a71e99a307d&X-Amz-SignedHeaders=host"
