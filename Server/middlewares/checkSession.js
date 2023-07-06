function checkSession(req, res, next){
    if(req.session.adminLogin){
        res.redirect('/admin');
    }else if(!req.session.isLoggedIn&&!req.session.adminLogin&&req.url!='/updatePassword'){
        next();
        return;
    }else if(req.session.isLoggedIn&&req.url=='/updatePassword'){
        next();
        return;
    }else{
        res.redirect('/user');
    }
};
module.exports = checkSession;