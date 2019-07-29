const app=getApp()
Page({
  data: {
    autoInvModal: false,
  },
  onLoad(query) {
    console.log('----kpSuccess-----',query)
    this.setData({
      cardId: query.cardId,
      month: query.month,
      titleId: query.titleId,
      plateNum: query.plateNum,
      type:query.type,
    })
    my.setStorageSync({
      key:'showBackEnvoice',
      data: false
    })
  },
  toMyInv(e){
    let cardId = this.data.cardId
    let plateNum = this.data.plateNum
    let type = this.data.type
    let var1 = {
      currentTarget: {
        dataset: {
          url: `/pages/myInvoice/serInvList/serInvList?cardId=${cardId}&plateNum=${plateNum}&type=${type}`,
          openType: "navigateTo"
        }
      }
    }
    app.handleForward(var1)
  },
  continue(){
    my.navigateBack();
  },
  backToFirst(){
     my.switchTab({
      url: "/pages/index/index"
    });
  },
   autoOpen(e){
    let noMoreTip = my.getStorageSync({
      key: 'noMoreTip', // 缓存数据的key
    }).data;
    if(!noMoreTip){
      this.setData({
        autoInvModal: true
      })
    }else{
      app.handleForward(e)
    }
  },
  iknow(e){
    this.setData({
      autoInvModal: false
    })
    app.handleForward(e)
  },
  noMoreTip(e){
    my.setStorageSync({
      key: 'noMoreTip', // 缓存数据的key
      data: e.detail.value, // 要缓存的数据
    });
  },
  onModalClose() {
    this.setData({
      autoInvModal: false
    });
  },
});
