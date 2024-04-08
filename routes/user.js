var express = require('express');
var router = express.Router();

const Users = require('../model/users');
const Upload = require('../config/common/upload');

router.post('/register', Upload.single('avatar'), async (req, res) => {
    try {
        const data = req.body;
        const file = req.file;
        const imgURL = `${res.protocol}://${res.get("host")}/uploads/${file.filename}`;

        const NewUser = new Users({
            username: data.username,
            password: data.password,
            email: data.email,
            fullname: data.fullname,
            avatar: imgURL,
        })

        const result = await NewUser.save();
        if (result) {
            res.json({
                "status": 200,
                "message": "Thêm thành công",
                "data": result
            });
        } else {
            res.json({
                "status": 400,
                "message": "Thêm không thành công",
                "data": []
            });
        }

    } catch (error) {
        console.log(error);
    }
});

router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await Users.findOne({ username, password })
        if (user) {
            res.json({
                "status": 200,
                "messenger": "Đăng nhâp thành công",
                "data": user,
            })
        } else {
            // Nếu thêm không thành công result null, thông báo không thành công
            res.json({
                "status": 400,
                "messenger": "Lỗi, đăng nhập không thành công",
                "data": []
            })
        }
    } catch (error) {
        console.log(error);
    }
})


module.exports = router;