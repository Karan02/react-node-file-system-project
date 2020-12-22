var fs = require("fs");
const crypto = require('crypto');
const path = require('path'); 
const db = require("../models");
const { geoSpatial } = require("../models");
const User = db.user;
const GeoSpatial = db.geoSpatial;
exports.admin_createFile_controller = async (req,res) =>{
    
  
     const files =  fs.readdirSync("files/")
     
        fs.writeFile(`files/${files.length}test.txt`, crypto.createHash('sha256').update(crypto
            .randomBytes(32)
            .toString('base64')
            .slice(0, 32)).digest('hex'), function(err) {
            if(err) {
                console.log(err);
            } else {
                
                  console.log("encrypted file generated")  
            }
        })
    
            
    res.json({
        status: true,
        message:"encrypted file created"
    })
}

exports.get_files_list = async (req,res) =>{
    console.log("files here")
    const files = []
    fs.readdirSync("files/").forEach(file => {
        
       files.push(file)      
})

    res.json({
        status:true,
        files:files
    })
}


exports.download_file = async (req,res) =>{
    const options = {
        root: "files"
    }
   
    const user = await User.updateOne(
        {username:req.body.username},{
        $push:{
            "downloads":{
            file:req.body.file,
            ipLoc:req.body.ipLoc,
            ip:req.body.ip
            }
        }}
    ).catch(err => console.log(err))
    const geoUser = await GeoSpatial.create({
        username:req.body.username,
        location:{
            type:"Point",
            coordinates:[req.body.ipLoc.longitude,req.body.ipLoc.latitude]
        },
        downloads:[{
            file:req.body.file,
            ipLoc:req.body.ipLoc,
            ip:req.body.ip
            }]
    })
    res.sendFile((req.body.file), options, function (err) { 
        if (err) { 
            console.log(err); 
        } else { 
            console.log('Sent:'); 
            console.log(); 
        } 
    }); 
  }
