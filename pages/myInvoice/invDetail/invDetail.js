const app = getApp();

Page({
  data: {},
  onLoad(query) {
    this.setData({
      applyId: query.applyId,
      cardId: query.cardId,
      countRecord: query.countRecord
    })
    this.getDZFPDet();
  },
  getDZFPDet(){
    let json1,that = this;
    json1 = {
      applyId: this.data.applyId,
      cardId: this.data.cardId,
      ticketId: app.userInfo.ticketId
    }
    my.showLoading({
      content: '加载中...',
    });
    app.ajax(json1,'INVOICE_INVOICEGROUP',function(data){
      data.applyTime = app.format(data.applyTime);
      that.setData(data)
    })
  }
});
