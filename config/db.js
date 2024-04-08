const mongoose = require('mongoose');
const uri = "mongodb+srv://phamhieu28042004:hieupm@cluster0.dgaxwcr.mongodb.net/ASM_PH42640"
const connect = async () => {
    try{
        await mongoose.connect(uri);
        console.log('connect success')
    }catch(err){
        console.log(err);
        console.log('connect fail')
    }
}

module.exports = {connect}
// git init
// git add README.md
// git commit -m "first commit"
// git branch -M main
// git remote add origin https://github.com/HieuGitHub28/ASM_AND103_PH42640.git
// git push -u origin main