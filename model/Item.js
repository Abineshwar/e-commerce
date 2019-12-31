var mongoose = require('mongoose');
var Schema=mongoose.Schema;
class Item {
    get note() {
        return this._note;
    }

    set note(value) {
        this._note = value;
    }

    constructor(itemCode, itemName, catalogCategory, description, rating) {
        this._itemCode = itemCode;
        this._itemName = itemName;
        this._catalogCategory = catalogCategory;
        this._description = description;
        this._rating = rating;
        this._imageURL = this.getImageURL(itemCode);
        //this._imgUrl = imgUrl;
    }




    get itemCode() {
        return this._itemCode;
    }

    set itemCode(value) {
        this._itemCode = value;
    }

    get itemName() {
        return this._itemName;
    }

    set itemName(value) {
        this._itemName = value;
    }

    get catalogCategory() {
        return this._catalogCategory;
    }

    set catalogCategory(value) {
        this._catalogCategory = value;
    }


    get description() {
        return this._description;
    }

    set description(value) {
        this._description = value;
    }

    get rating() {
        return this._rating;
    }

    set rating(value) {
        this._rating = value;
    }

    get imageURL() {
        return this._imageURL;
    }

    set imageURL(value) {
        this._imageURL = value;
    }

    getImageURL(itemCode){
        return "/assets/images/"+itemCode+".jpg"
    }


}

var ItemsSchema=new Schema ({
    itemCode: Number,
    itemName: String,
    catalogCategory: String,
    description: String,
    rating: Number
  });

ItemSchema = mongoose.model('Items', ItemsSchema, 'Items');
var my_schemas = {'Item' : Item, 'ItemSchema': ItemSchema};
module.exports = my_schemas;
