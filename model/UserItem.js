var mongoose = require('mongoose');
var Schema=mongoose.Schema;

class UserItem {
    constructor(UserID, Item, ItemCode, Rating, ReadIt) {
        this._userID = UserID;
        this._item = Item;
        this._itemCode = ItemCode;
        this._rating = Rating;
        this._readit = ReadIt;
    }

    get Item() {
        return this._item;
    }

    set Item(value) {
        this._item = value;
    }

    get UserID() {
        return this._userID;
    }

    set UserID(value) {
        this._userID = value;
    }

    get ItemCode() {
        return this._itemCode;
    }

    set ItemCode(value) {
        this._itemCode = value;
    }

    get Rating() {
        return this._rating;
    }

    set Rating(value) {
        this._rating = value;
    }

    get ReadIt() {
        return this._readit;
    }

    set ReadIt(value) {
        this._readit = value;
    }
}
var UserItemSchema=new Schema ({
    userID: Number,
    itemCode: Number,
    rating: Number,
    readit: Boolean
  });

UserItemSchema = mongoose.model('UserItem', UserItemSchema, 'UserItem');
var my_schemas = {'UserItem' : UserItem, 'UserItemSchema': UserItemSchema};
module.exports = my_schemas;
