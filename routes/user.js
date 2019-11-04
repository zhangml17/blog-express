const express = require('express')
const router = express.Router()
const { login } = require('../controller/user')
const { SuccessModel,ErrorModel } = require('../model/resModel')

router.post('/login', (req, res, next) => {
    const { username, password } = req.body
    const result = login(username, password)

    return result.then(userData=>{
        if(userData.username){
            // 设置session
            req.session.username = userData.username
            req.session.realname = userData.realname
            res.json( new SuccessModel('登陆成功') )
            return
        }
        res.json( new ErrorModel('用户名或密码不正确1') )
    })
})

// 测试登陆
router.get('/login-test', (req, res, next) => {
    if(req.session.username) {
        res.json({
            errno: 0,
            msg:"okay"
        })
        return
    }
    res.json({
        errno:-1,
        msg:"failed"
    })
})

// router.get('/session-test', (req, res, next) => {
//     const session = req.session
//     if(!session.rown) {
//         session.rown = 0
//     }
//     session.rown ++
//     res.json({
//         rown: session.rown
//     })
// })

module.exports = router