const md5 = require('md5');
function blockNotLogin (errorMsg){
    return (req,res,next) => {
        if(req.isAuthenticated()){
            next();
        } else {
            console.log({error: (errorMsg || '로그인이 필요합니다')})
            res.status(200).json({
                error: (errorMsg || '로그인이 필요합니다')
            });
        }
    }
}

function emailHash (errorMsg){
    return (req, res, next) => {
        res.locals.emailHash = true;
        next()
    }
}

function json(){
    return (result, req, res, next) => {
        if(res.locals.emailHash){
            result = result.map(item => {
                if(item.email && item.email.length > 0){
                    item.emailHash = md5(item.email)
                }
                return item
            })
        }
        res.status(200).json(result);
    }
}

module.exports = {
    blockNotLogin,
    json,
    emailHash
}