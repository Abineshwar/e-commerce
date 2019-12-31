
var UserItemModel = require('../model/UserItem');
var UserItem = UserItemModel.UserItem;
var UserItemSchema = UserItemModel.UserItemSchema;

var UserItemDB = require('../utility/userItemDB')

var ItemModel = require('../model/Item');
var Item = ItemModel.Item;

getUserItems = function (userID) {
    console.log("\n\nUserCode : ", userID)
    return new Promise(function(resolve, reject){
        let userItems = [];
        UserItemSchema.aggregate([
        {$match:{userID: userID}},
        {
            $lookup: {
                from: "Items", // collection name in db
                localField: "itemCode",
                foreignField: "itemCode",
                as: "items"
            }
        }
        ]).exec(function(err, data) {
            if(err) reject(err)
            for (let i = 0; i < data.length; i++) {
                var dbItem = data[i].items[0]
                console.log("inside get aabi");
                console.log(dbItem);
                let item = new Item(dbItem.itemCode, dbItem.itemName, dbItem.catalogCategory, dbItem.description, dbItem.rating)
                let userItem = new UserItem(
                    data[i].userID,
                    item,
                    data[i].itemCode,
                    data[i].rating,
                    data[i].readit
                )
                userItems.push(userItem);
            }
            resolve(userItems);
        })
    })
}

var getUserItem = function (userID, itemCode) {
    return new Promise(function(resolve, reject){
        UserItemSchema.aggregate([
        {$match : {$and: [ {userID: userID}, {itemCode: parseInt(itemCode)}]}},
        {
            $lookup: {
                from: "Items", // collection name in db
                localField: "itemCode",
                foreignField: "itemCode",
                as: "items"
            }
        }
        ]).exec(function(err, data){
            data = data[0];
            var dbItem = data.items[0]
            let item = new Item(dbItem.itemCode, dbItem.itemName, dbItem.catalogCategory, dbItem.description, dbItem.rating)
            let userItem = new UserItem(
                data.userID,
                item,
                data.itemCode,
                data.rating,
                data.readit
            )
             console.log("\n\n  aaabi userItem : ", userItem);
            resolve(userItem);
        })
    })
}

var addItemRating = function(itemCode, userID, rating) {
    return new Promise(function(resolve, reject){
        UserItemSchema.findOne({userID: userID, itemCode: itemCode}, function(err, userItem){
            if(err) reject(err);
            userItem.update({rating: rating}, function(err, updatedItem){
                resolve(updatedItem);
            })
        })
    })
}
var addMadeIt= function(itemCode, userID, madeIt) {
    return new Promise(function(resolve, reject){
        UserItemSchema.findOne({userID: userID, itemCode: itemCode}, function(err, userItem){
            if(err) {
                console.log("Errr: ", err)
                resolve(err);
            }
            userItem.update({madeIt: madeIt}, function(err, updatedItem){
                if(err) reject(err);
                resolve(updatedItem);
            })
        })
    })
}
var addUserItem = function(userID, itemCode, rating, madeIt){
    return new Promise(function(resolve, reject){
        UserItemSchema.findOne({userID: userID, itemCode: itemCode}, function(err, userItem){
            if(userItem){
                console.log("Errr: Item Already present:", userItem)
                var userItemPromise = UserItemDB.getUserItems(userID)
                userItemPromise.then(function(useritems){
                    reject(useritems);
                })
            }else{
                var userItemObj = new UserItemSchema({userID: userID, itemCode: itemCode, rating: rating, madeIt: madeIt})
                userItemObj.save(function(err, userItem){
                    console.log("Saving user Item: ", userItem)
                    if(err) reject(err);
                    var userItemPromise = UserItemDB.getUserItems(userID)
                    userItemPromise.then(function(useritems){
                        resolve(useritems);
                    })
                })
            }
        })
    })
}
var deleteUserItem = function(userID, itemCode){
    return new Promise(function(resolve, reject){
        UserItemSchema.remove({userID: userID, itemCode: itemCode}, function(err, userItem){
            if(err) reject(err);
            var userItemPromise = getUserItems(userID)
            userItemPromise.then(function(useritems){
                console.log("\n: ", useritems)
                resolve(useritems);
            })
        })
    })
}
var updateUserItem = function(userID, itemCode, rating, readit){
    return new Promise(function(resolve, reject){
        UserItemSchema.findOneAndUpdate({userID: userID, itemCode: itemCode}, {userID: userID, itemCode: itemCode,rating: rating, readit: readit}, function(err, userItem){
            console.log("Updated Item : ", userItem)
            if(err) reject(err);
            var userItemPromise = getUserItems(userID)
            console.log("getuser__");

            userItemPromise.then(function(useritems){
                console.log(userItemPromise);
                for(i=0;i<useritems.length;i++){
                  if(useritems[i]._itemCode == itemCode)
                  {
                    useritems[i]._item.rating = rating
                  }
                }

                console.log("\n\nALl user Items DELETE : ", useritems)
                resolve(useritems);
            })
        })
    })
}
module.exports.addItemRating = addItemRating
module.exports.addMadeIt= addMadeIt
module.exports.addUserItem = addUserItem
module.exports.deleteUserItem = deleteUserItem
module.exports.getUserItems = getUserItems
module.exports.getUserItem = getUserItem
module.exports.updateUserItem = updateUserItem
