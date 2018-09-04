var models = require("../models");
var user = models.user;
var plan = models.Plans;
var exports = (module.exports = {});
exports.allPlans = function(req, res) {
    plan.findAll({
        where: {
            userId: req.session.passport.user
        }
    }).then(function(data) {
        res.json(data);
    })
};
exports.onePlan = function(req, res) {
    plan.findAll({
        where: {
            id: req.params.planID.replace(/\D/g,""),
            userId: req.session.passport.user
        }
    }).then(function(data){
        if(data){
            res.json(data);
        }
        else{
            res.send("plan does not exist or you are not it's owner");
        }
        
    })
};