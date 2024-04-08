const express = require('express');
const router = express.Router();


// khai bao model 
const StudentModel = require('../model/students');
const Upload = require('../config/common/upload');

router.get('/', (req,res) => {
    res.send('vào api mobile');
})

// get danh sach student và tìm theo mã sv 
router.get('/students', async (req, res) => {
    try {
        const result = await StudentModel.find().sort({createdAt : -1});
        if(result){
            res.json({
                "status" : "200",
                "messenger" : "Danh sách sinh viên",
                "data" : result
            })
        }else{
            res.json({
                "status" : "400",
                "messenger" : "Fail",
                "data" : []
            })
        }
    } catch (error) {
        console.log(error);
    }
})

// add student 
router.post('/students/add',Upload.single('avatar'), async (req,res) => {
    //Upload.array('image',5) => up nhiều file tối đa là 5
    //upload.single('image') => up load 1 file
    try{
        const data = req.body; // Lấy dữ liệu từ body
        const { file } = req //files nếu upload nhiều, file nếu upload 1 file
        const urlImage = `${req.protocol}://${req.get("host")}/uploads/${file.filename}`;
            // files.map((file) => `${req.protocol}://${req.get("host")}/uploads/${file.filename}`)
        //url hình ảnh sẽ được lưu dưới dạng: http://localhost:3000/upload/filename
        const student = new StudentModel({
            masv : data.masv,
            name : data.name,
            point : data.point,
            avatar : urlImage
        });

        const result = await student.save();

        if(result){
            res.json({
                "status" : "200",
                "messenger" : "Add student success",
                "data" : result
            })
        }else{
            res.json({
                "status" : "400",
                "messenger" : "Add student fail",
                "data" : []
            })
        }
    }catch(err){
        console.log(err)
    }
});


// delete student
router.delete('/students/delete/:id', async (req,res) => {
    const {id} = req.params;
    const result = await StudentModel.deleteOne({_id : id});
    if(result){
        res.json({
            "status" : "200",
            "messenger" : "Delete student success",
            "data" : result
        })
    }else{
        res.json({
            "status" : "400",
            "messenger" : "Delete fail",
            "data" : []
        })
    }
});

router.put('/students/update/:id', Upload.single('avatar'), async (req, res) => {
    try {
        const { id } = req.params;
        let updateData = req.body;
        
        // Nếu có file ảnh được tải lên, thêm URL của ảnh vào dữ liệu cần cập nhật
        if (req.file) {
            const urlImage = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;
            updateData.avatar = urlImage;
        }
        
        // Sử dụng findByIdAndUpdate để tìm và cập nhật dữ liệu
        const result = await StudentModel.findByIdAndUpdate(id, updateData, { new: true });
        
        if (result) {
            res.json({
                status: 200,
                message: "Update student success",
                data: result
            });
        } else {
            res.status(404).json({
                status: 404,
                message: "Student not found",
                data: []
            });
        }
    } catch (error) {
        // Xử lý lỗi nếu có
        res.status(500).json({
            status: 500,
            message: "Internal Server Error",
            error: error.message
        });
    }
});

//search Distributor
router.get('/search', async (req, res) => {
    try {
        const key = req.query.key

        const data = await StudentModel.find({ name: { "$regex": key, "$options": "i" } })
            .sort({ createdAt: -1 });

        if (data) {
            res.json({
                "status": 200,
                "messenger": "Thành công",
                "data": data
            })
        } else {
            res.json({
                "status": 400,
                "messenger": "Lỗi, không thành công",
                "data": []
            })
        }
    } catch (error) {
        console.log(error);
    }
})

//search Distributor
router.get('/sort', async (req, res) => {
    try {
        const { type } = req.query;
        let data = null;
        if(type == 1){ // type nhập vào là true
            data = await StudentModel.find().sort({ point: 1 }); // tăng dần 
        }else{
            data = await StudentModel.find().sort({ point: -1 }); // giảm dần
        }  

        if (data) {
            res.json({ 
                "status": 200,
                "messenger": "Thành công",
                "data": data
            })
        } else {
            res.json({
                "status": 400,
                "messenger": "Lỗi, không thành công",
                "data": []
            })
        }
    } catch (error) {
        console.log(error);
    }
})

module.exports = router;