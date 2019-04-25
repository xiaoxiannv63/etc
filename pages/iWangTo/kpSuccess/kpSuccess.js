const app=getApp()
Page({
  data: {},
  onLoad() {},
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
