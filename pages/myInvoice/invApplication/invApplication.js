const app = getApp();

Page({
  data: {
    // applyType:'消费发票',
    // hasRed:'是否红字票 布尔',
    // buyerName:'购方客户名称',//多个用半角逗号隔开
    // buyerTaxpayerCode:'纳税人识别号',//多个用半角逗号隔开
    // cardId:'ETC编号',
    // plateNum:'车牌号码',
    // vehicleType:'车辆类型',
    // sumAmount:'14.13',
    // sumTaxAmount:'可抵扣金额',
    // applyTime:'申请时间',
    // invoiceMail:'发票接收邮箱',
    // sumInvoice:'发票张数',
    // countRecord:'行程数量'
  },
  onLoad(query) {
    if(query.plateNum){
      my.setNavigationBar({
        title: query.plateNum
      })
    }
    this.setData({
      applyId: query.applyId
    })
    this.getInvData();
  },
  getInvData(){
    let json1,that=this;
    json1 = {
      applyId: this.data.applyId,
      ticketId:app.userInfo.ticketId
    }
    my.showLoading({
      content: '加载中...',
    });
    app.ajax(json1,'INVOICE_APPLYDETAIL',function(data){
      data.applyTime = app.format(data.applyTime);
      that.setData(data)
    })
  },
  toDianZI(){
    let str = '?applyId='+this.data.applyId+'&cardId='+this.data.cardId + '&countRecord='+this.data.countRecord;
    my.navigateTo({
      url:'/pages/myInvoice/viewInvoice/viewInvoice' + str
    });
  }
});
