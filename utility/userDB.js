 //var User = require('../model/User');

var UserModel = require('../model/User');
var User = UserModel.User;
var UserSchema = UserModel.UserSchema;

module.exports.getUsers = function () {
    return new Promise(function(resolve, reject){
    let users = [];
    UserSchema.find({}, function(err, data){
            for (let i = 0; i < data.length; i++) {
            let user = new User(
                data[i].UserID,
                data[i].first_name,
                data[i].last_name,
                data[i].email_id

                )
                users.push(user);
            }

    resolve(users)
    })
})

};

module.exports.getUser = function (user_id) {

    return new Promise(function(resolve, reject){
        UserSchema.findOne({userID : user_id}, function(err, data){
            let user = new User(
                data.userID,
                data.first_name,
                data.last_name,
                data.email_id

                )
            resolve(user);
        });
    });
};

module.exports.getUser = function (username, password) {

    return new Promise(function(resolve, reject){
        UserSchema.findOne({email_id : username, password: password}, function(err, data){
            if(data){
                let user = new User(
                    data.userID,
                    data.first_name,
                    data.last_name,
                    data.email_id
                    )
                resolve(user);
            }else{
                reject(data);
            }
        });
    });
};
