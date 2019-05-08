const app = getApp();
Page({
  data: {
    tabs:['新开具','红字发票','已作废'],
    items:[],
    tab:0,
    items:[],
    invoices:[],//新蓝票
    originInvoices:[],//原发票
    redInvoices:[],//红票
    change:null //红冲？？true 换票？？
  },
  onLoad(query) {
    console.log('---query--',query)
    let arr = []
    console.log('--红冲false----',query.change)
    if(query.change == 'false'){//红冲发票
      arr = this.data.tabs.slice(1)
      this.setData({
        tabs:arr
      })
      console.log(this.data.tabs)
    }
    this.setData({
      change:query.change,
      cardId: query.cardId,
      applyId: query.applyId
    })
    this.getCardId();
  },
  getCardId(){
    let json1 = {
      cardId: this.data.cardId,
      ticketId:app.userInfo.ticketId,
      applyId:this.data.applyId
    }
    my.showLoading({
      content: '加载中...',
    });
    app.ajax(json1,'INVOICE_INVOICEDETAIL',(data)=>{
      this.setData({
        invoices:data.invoices,
        originInvoices:data.originInvoices,
        redInvoices:data.redInvoices
      })
    })
  },
  changeTab(e){
    this.setData({
      tab:e.target.dataset.index
    })
  },
  lookInvoice(e){
    let url = e.target.dataset.url
    app.gotoH5(url)
  }
});
