const app=getApp()
Page({
  data: {},
  onLoad(query) {
    console.log('----kpSuccess-----',query)
    this.setData({
      cardId: query.cardId,
      month: query.month,
      titleId: query.titleId,
      plateNum: query.plateNum,
      type:query.type
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
  }
});
