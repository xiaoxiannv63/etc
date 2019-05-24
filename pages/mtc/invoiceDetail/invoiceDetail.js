const app = getApp();

Page({
  data:{
    item:{},
    plateNumType:{
      "一型客车":"CAR_1",
      "二型客车":"CAR_2",
      "三型客车":"CAR_3",
      "四型客车":"CAR_4",
      "一型货车":"CAR_4",
      "二型货车":"CAR_4",
      "三型货车":"CAR_4",
      "四型货车":"CAR_4",
      "五型货车":"CAR_4"
    },
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
  },
  reInvoice(){
    let json = {
      "plateNum":this.data.item.plateNum,
      "vehicleType":this.data.plateNumType[this.data.item.vehicleType],
      "fee":this.data.item.sumAmount * 100,
      "exTime":this.data.item.exTime,
      "applyId":this.data.invoiceDetail.applyId
      }

    let var1 = {
      currentTarget: {
        dataset: {
          url: `/pages/mtc/recordConfirm/recordConfirm?detail=${JSON.stringify(json)}&reinvoice=true`,
          openType: "navigateTo"
        }
      }
    }
    app.handleForward(var1)
  }
})