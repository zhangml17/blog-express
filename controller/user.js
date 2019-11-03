 const { exec, escape } = require('../db/mysql')
 const lockPassword = require('../utils/crypto')

 const login = (username,password) => {
    //  预防sql注入
     username = escape(username)
     password = lockPassword(password)
     password = escape(password)
    let sql =  `select username, realname from users where username = ${username} and password = ${password}; `
    return exec(sql).then(rows=>{
        return rows[0] || {}
    })
 }

 module.exports = {
     login
 }