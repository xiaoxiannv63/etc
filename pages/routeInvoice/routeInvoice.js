const app = getApp();

Page({
  data: {
    tradeId:'',
    applyId:'',
    items:[]
  },
  onLoad(query) {
    this.setData({
      cardId: query.cardId,
      tradeId:query.tradeId,
      applyId:query.applyId
    })
    this.getCardId();
  },
  getCardId(){
    let json1 = {
      cardId: this.data.cardId,
      ticketId:app.userInfo.ticketId,
      tradeId:this.data.tradeId
    }
    my.showLoading({
      content: '加载中...',
    });
    app.ajax(json1,'INVOICE_INVOICEDETAIL',(data)=>{
      data.invoices.forEach((item,index) => {
        item.invoiceMakeTime = app.format(item.invoiceMakeTime);
      })
      this.setData({
        items: data.invoices
      })
      console.log(this.data.items)
      // this.getDZFPList();
    })
  },
  lookInvoice(e){
    let url = e.target.dataset.url
    app.gotoH5(url)
  }
});
