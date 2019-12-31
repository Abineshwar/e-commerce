 var Item = require('../model/Item');
 var mongoose = require('mongoose');
 mongoose.connect('mongodb://localhost/Lifestyle');
 var ItemModel = require('../model/Item');
 var Item = ItemModel.Item;
 var ItemSchema = ItemModel.ItemSchema;
module.exports.getItems = function () {
    return new Promise(function(resolve, reject){
    let items = [];
    ItemSchema.find({}, function(err, data){
    for (let i = 0; i < data.length-1; i++) {
        let item = new Item(data[i].itemCode,
            data[i].itemName,
            data[i].catalogCategory,
            data[i].description,
            data[i].rating,
          getImageURL(data[i].itemCode));

        items.push(item);

    }
    resolve(items);
  })
})

};
module.exports.getItem = function (itemCode) {

    return new Promise(function(resolve, reject){
        ItemSchema.findOne({itemCode : itemCode}, function(err, data){
            let item = new Item(data.itemCode,
                data.itemName,
                data.catalogCategory,
                data.description,
                data.rating,
                getImageURL(data.itemCode)
                )
            resolve(item);
        });
    });
};

  getImageURL=function(itemCode){
  return"/assets/images/"+itemCode+".jpg"
  }

//var category = ["Women", "Men"];
//module.exports.category=category;
