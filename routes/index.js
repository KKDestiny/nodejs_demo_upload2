var express = require('express');
var router = express.Router();

var fs = require("fs");
var multer  = require('multer');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* upload page. */
router.get('/upload', function(req, res, next) {
  res.render('upload');
});

/* 处理文件上传 */
var upload = multer({ dest: '/tmp/' })
router.post('/file_upload', upload.array('image'), function (req, res, next) {

	console.log(req.files[0]);  // 上传的文件信息
	
	if(undefined == req.files[0]){
		res.json(['failed', {msg:"没有选择要上传的文件！"}]);
		return -1;
	}

	var des_file = "./files/" + req.files[0].originalname;
	fs.readFile( req.files[0].path, function (err, data) {
		fs.writeFile(des_file, data, function (err) {
			if( err ){
				console.log( err );
				res.json(['failed', {msg:err}]);
			}else{
				response = {
					msg:'File uploaded successfully', 
					filename:req.files[0].originalname,
				};
				console.log( response );
				res.json(['success', response]);
			}
		});
	});
});

module.exports = router;
