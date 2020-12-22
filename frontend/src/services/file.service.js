import axios from "axios";
import download from "downloadjs"
const API_URL = "http://localhost:8080/api/file/";

class FileService {

    createFile(){
        return  axios.post(API_URL+"create_file").then((res)=> {
            return res.data
        })
    }
    getFile(){
        return axios.get(API_URL+"getFile").then((res)=>{
           
            return res.data.files
        })
    }
    downloadFile(file,ipLoc,ip,username){
        // console.log("ip location",ipLoc)
        return axios({url:API_URL+"download",method:"POST",responseType:"blob",data:{file:file,ipLoc:ipLoc,ip:ip,username:username}}).then(async (response)=>{
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', file);
            document.body.appendChild(link);
            link.click();
            });
        
    }

}
export default new FileService();