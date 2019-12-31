var mongoose = require('mongoose');
var Schema=mongoose.Schema;


class User {
    get note() {
        return this._note;
    }

    set note(value) {
        this._note = value;
    }

    constructor(userId, FirstName, LastName, EmailAddress) {
        this._userId = userId;
        this._FirstName = FirstName;
        this._LastName = LastName;
        this._EmailAddress = EmailAddress;

    }




    get userId() {
        return this._userId;
    }

    set userId(value) {
        this._userId = value;
    }

    get FirstName() {
        return this._FirstName;
    }

    set FirstName(value) {
        this._FirstName = value;
    }

    get LastName() {
        return this._LastName;
    }

    set LastName(value) {
        this._LastName = value;
    }


    get EmailAddress() {
        return this._EmailAddress;
    }

    set EmailAddress(value) {
        this._EmailAddress = value;
    }



}
var UserSchema=new Schema ({
    userID: Number,
    first_name: String,
    last_name: String,
    email_id: String
  });

user_Schema = mongoose.model('Users', UserSchema, 'Users');
var my_schemas = {'User' : User, 'UserSchema': user_Schema};
module.exports = my_schemas;
