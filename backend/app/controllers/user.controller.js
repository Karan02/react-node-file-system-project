const { user } = require("../models");
const db = require("../models");
const User = db.user;
const GeoSpatial = db.geoSpatial;
exports.getUsers = async (req, res) => {
  const users = await User.find({})

  res.json({
      status:false,
      users:users
  })
};
exports.getNearUsers = async (req,res) => {
    const dist = req.query.distance
    const users =await GeoSpatial.find({
        location:{
            $near:{
                $maxDistance:dist,
                $geometry:{
                    type:"Point",
                    coordinates:[req.body.longitude,req.body.latitude]
                }
            }
        }
    }).catch((err)=>{
        if(err){
            console.log(err)
        }
    })
    console.log("users",users)
    res.json({
        status:true,
        users:users
    })
}