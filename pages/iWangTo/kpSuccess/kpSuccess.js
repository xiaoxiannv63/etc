const app=getApp()
Page({
  data: {},
  onLoad(query) {
    this.setData({
      cardId: query.cardId,
      month: query.month,
      titleId: query.titleId,
      plateNum: query.plateNum
    })
  },
  // toMyInv(){
  //   my.navigateTo({
  //     url: "/pages/myInvoice/invoiceList/invoiceList"
  //   });
  // },
  toMyInv(e){
    app.handleForward(e)
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
