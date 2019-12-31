
class UserProfile {
    constructor(UserID, UserItems) {
        this._UserID = UserID;
        this._UserItems = UserItems;
    }

    get UserID() {
        return this._UserID;
    }

    set UserID(value) {
        this._UserID = value;
    }

    get UserItems() {
        return this._UserItems;
    }

    set UserItems(value) {
        this._UserItems = value;
    }

    addItems (UserID, useritem) {
        var data = this._UserItems;
       console.log(data);
      console.log('useritem : ',useritem)
        var flag = 0;
        if(data.length != 0){
          for (let i = 0; i < data.length; i++) {
            if(data[i]._Item._itemCode == useritem._Item._itemCode){
              flag =1;
              break;
            }
          }
          if(flag == 0){
            data.push(useritem);
          }
        }else{
          data.push(useritem);
        }
        this._UserItems = data;
    };
    removeItem (itemCode){
      var data = this._UserItems;
      for(i=0; i<data.length; i++){
        if(data[i]._Item._itemCode == itemCode){
            var rm = data.splice(i,1);
        }
      }
      this._UserItems = data;
    }
    updateItem(useritem){
      var data = this._UserItems;
      var flag = 0;
      if(data.length != 0){
        for (let i = 0; i < data.length; i++) {
          console.log(data);
          console.log('rating : ', useritem);
          if(data[i]._Item._itemCode == useritem._Item._itemCode){
            console.log('rating : ', useritem._Rating);
            data[i]._Rating = useritem._Rating;
            data[i]._MadeIt = useritem._MadeIt;
            flag =1;
            break;
          }
        }
        if(flag == 0){
          data.push(useritem);
        }
      }
      this._UserItems = data;
    }
    getItems (UserID){
      var items = this._UserItems;
      return items;
    }
    emptyProfile (){
      this._UserItems = [];
    }
}
module.exports = UserProfile;
