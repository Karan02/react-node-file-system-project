const controller = require("../controllers/file.controller");


module.exports = function(app){

    app.use(function(req, res, next) {
        res.header(
          "Access-Control-Allow-Headers",
          "x-access-token, Origin, Content-Type, Accept"
        );
        next();
      });

      app.post("/api/file/create_file",controller.admin_createFile_controller)
      app.post("/api/file/download",controller.download_file)
      app.get("/api/file/getFile",controller.get_files_list)
    }