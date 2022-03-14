const admin = require("../models/admin");


const adminCtrl = {
    // google login logic
    login: async (req, res) => {
        try{
            const {username, password} = req.body;
            const user = await admin.findOne({ username: username, password: password })   
            if(user){
                return res.json({ user: true })
            }else {
                return res.json({ user: false })
            }
        }catch(err){
            console.log(err)
        }
    },
}

module.exports = adminCtrl;