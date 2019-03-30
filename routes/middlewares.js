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

function json(){
    return (result, req, res, next) => {
        res.status(200).json(result);
    }
}

module.exports = {
    blockNotLogin,
    json
}