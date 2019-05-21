const app = getApp();

Page({
  data:{
    item:{},
  },
  status:{
    'WAIT':'开票中',
    'INVOICING':'开票中',
    'INVOICED':'开票完成',
    'INVOICE_FAIL':'已开纸质发票(包含在开票完成中)',
    'CHECKING':'审核中',
    'CHECK_FAILED':'审核失败',
  },
  onLoad(query){
    let invoiceDetail = my.getStorageSync({key: "invoiceDetail"});
    this.setData({
      invoiceDetail: invoiceDetail.data
    })
    this.getDetail()
  },
  onShow(){
  },
  getDetail() {
    let json1 = {
      applyId: this.data.invoiceDetail.applyId,
      ticketId: app.userInfo.ticketId
    }
    app.ajax(json1,"MTC_APPLYDETAIL",(data)=>{
      data.applyStatus = this.status[data.applyStatus];
      data.sumAmount = (data.sumAmount/100).toFixed(2);
      this.setData({
        item: data
      })
      my.setStorageSync({
        key: 'invoices',
        data: data.invoices
      });
    })
  },
  view(e){
    let var1 = {
      currentTarget: {
        dataset: {
          url: `/pages/mtc/viewInvoice/viewInvoice`,
          openType: "redirectTo"
        }
      }
    }
    app.handleForward(var1)
  }
})