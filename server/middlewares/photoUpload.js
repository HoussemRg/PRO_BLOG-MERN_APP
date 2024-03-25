import path from 'path';
import multer from 'multer';






/*const __filename = new URL(import.meta.url).pathname;
const __dirname = path.dirname(__filename);
console.log(__dirname)
console.log(path.join("/C:/Users/Administrator/Desktop/houssem/MERN/mern_social_media_app/server/middlewares","../images"))
*/
//photo storage

const photoStorage= multer.diskStorage({
    destination : function(req,file,callback){
        
        //callback(null, path.join(__dirname, "../images"));//null to  don't show an error
        callback(null,path.join("/Users/ASUS/Desktop/houssem/MERN/mern_social_media_app/server/middlewares","../images"));
    },
    filename : function(req,file,callback){
        if(file){
            callback(null,new Date().toISOString().replace(/:/g,'-')+ file.originalname);  //to write a uniq filename wich contains the image uploaded
        }else{
            callback(null,false); //not error and don't write a name for file
        }
    }


})

//photo upload middleware

const uploadPhoto = multer({
    storage: photoStorage,
    fileFilter : function(req,file,callback){
        if(file.mimetype.startsWith("image")){
            callback(null,true);      //upload a photo
        }else{
            callback({message:"unsopported file format"});     // prevent the upload of another file
        }
    },
    limits:{fileSize: 1024*1024}   //1 mb
})

export {uploadPhoto}