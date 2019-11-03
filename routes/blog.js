const express = require('express')
const router = express.Router()
const { SuccessModel,ErrorModel } = require('../model/resModel')
const { getList ,getDetail, newBlog, updateBlog, deleteBlog }  = require('../controller/blog')

router.get('/list', (req, res, next) => {
    let author = req.query.author || ''
    const keyword = req.query.keyword || ''
    // const loginResult = loginCheck(req)
    // // 强制查询当前登陆用户的博客列表
    // if(req.query.isadmin) {
    //     if(loginResult) {
    //         // 有值说明返回的是promise对象，即登陆不成功
    //         return new ErrorModel('用户名或密码不正确')
    //     }
    //     author = req.session.username
    // }
    const result =  getList(author,keyword)
    return result.then(listData=>{
        if(listData){
            console.log(listData, '---listData')
            res.json(new SuccessModel(listData,'获取博客列表成功'))
        }
    })
})

router.get('/detail', (req, res, next) => {
    res.json({
        result:'OK'
    })
})



module.exports = router