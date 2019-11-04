const express = require('express')
const router = express.Router()
const { SuccessModel,ErrorModel } = require('../model/resModel')
const { getList ,getDetail, newBlog, updateBlog, deleteBlog }  = require('../controller/blog')
const loginCheck = require('../middleware/loginCheck')

router.get('/list', (req, res, next) => {
    let author = req.query.author || ''
    const keyword = req.query.keyword || ''
    // const loginResult = loginCheck(req)
    // 强制查询当前登陆用户的博客列表
    if(req.query.isadmin) {
        if(req.session.username == null) {
            // 有值说明返回的是promise对象，即登陆不成功
            res.json(new ErrorModel('用户名或密码不正确'))
            return
        }
        author = req.session.username
    }
    const result =  getList(author,keyword)
    return result.then(listData=>{
        if(listData){
            res.json(new SuccessModel(listData,'获取博客列表成功'))
        }
    })
})

router.get('/detail', (req, res, next) => {
    const result = getDetail(req.query.id)
    return result.then(detailData=>{
        res.json(new SuccessModel(detailData,'获取博客详情成功'))
    })
})

router.post('/new', loginCheck, (req, res, next) => {
    req.body.author = req.session.username
    const result = newBlog(req.body)
    
    return result.then(data => {
        res.json( new SuccessModel(data,'新建博客成功') )
    })
})

router.post('/update', loginCheck, (req, res, next) =>{
    const result = updateBlog(req.query.id,req.body)
    return result.then(flag=>{
        if(flag) {
            res.json(new SuccessModel('更新博客成功'))
        }else {
            res.json(new ErrorModel('更新博客失败'))
        }
    })
})

router.post('/del', loginCheck, (req, res, next) => {
    console.log(111)
    const author = req.session.username
    const result = deleteBlog(req.query.id, author)
    return result.then(flag=>{
        if(flag) {
            res.json(new SuccessModel('删除博客成功'))
        }else {
            res.json(new ErrorModel('删除博客失败'))
        }
    })
})

module.exports = router