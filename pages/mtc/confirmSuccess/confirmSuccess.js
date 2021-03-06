const app = getApp();
Page({
  data: {
    showTop: false,
    showFlag:false,
    detail:{},
    showMyConf:false,
    applySC:{
      "WECHAT": "MTC_MP_ZFB_WC",
      "ZHIFUBAO": "MTC_MP_ZFB_ZFB",
      "UNIONPAY": "MTC_MP_ZFB_UP",
      "PLATEPAY": "MTC_MP_ZFB_PP",
    }
  },
  onLoad(query) {
    console.log('----query-----',query)
    if(query.flag){
      this.setData({
        showFlag:true
      })
    }
    if(query.selection){
      let selection = JSON.parse(query.selection)
      if(selection.titleType == "个人"){
        selection.enTitleType = "PERSON"
      }else{
        selection.enTitleType = "UNIT"
      }
      this.setData({
        selection
      })
    }
    let res = my.getStorageSync({ key: 'detail' })
    console.log(res)
    let detail = JSON.parse(res.data)
    if(detail.newPlateNum){
      detail.plate = detail.newPlateNum
    }else{
      detail.plate = detail.plateNum
    }
    this.setData({
      detail
    })
    console.log('---this.data----',this.data)
  },
  moreInfo(){
    this.setData({
      showMyConf:true
    })
  },
  sureHandle(){
    this.setData({
      showMyConf:false
    })
  },
  mailInp(e){
    console.log(e.detail.value)
    this.setData({
      mail: e.detail.value
    })
    console.log(this.data.mail)
  },
  onTopBtnTap() {
    this.setData({
      showTop: true,
    });
  },
  onPopupClose() {
    this.setData({
      showTop: false,
    });
  },
  goAddTaitou(){
    let var1 = {
        currentTarget: {
          dataset: {
            url: '/pages/mtc/selTaitou/selTaitou',
            openType: "navigateTo"
          }
        }
      }
    app.handleForward(var1)
  },
  invoiceSuccess(){
    if(!app.buttonClick())return;
    let strtime = this.data.detail.exTime;
    let date = strtime.replace((/-|:|\s/g), '');

    let json1 = {
      tradeId: this.data.detail.tradeId,
      ticketId: app.userInfo.ticketId,
      plateNum: this.data.detail.newPlateNum,
      sourcePlateNum: this.data.detail.plateNum,
      plateColor: this.data.detail.plateColor,
      vehicleType: this.data.detail.vehicleType,
      exTime: date,
      exLaneId:this.data.detail.exLaneId,
      fee:this.data.detail.fee,
      email:this.data.mail,
      insertWechat:false,
      name:this.data.selection.name,
      taxNum:this.data.selection.taxNum,
      address:this.data.selection.address,
      tel:this.data.selection.tel,
      bank:this.data.selection.bank,
      bankAccount:this.data.selection.bankAccount,
      titleType:this.data.selection.enTitleType,
      applySource:this.data.applySC[this.data.detail.channel],
    }
    app.ajax(json1,'MTC_INVOICEAPPLY',(data) => {
      let var1 = {
          currentTarget: {
            dataset: {
              url: '/pages/mtc/invoiceSuccess/invoiceSuccess',
              openType: "navigateTo"
            }
          }
        }
      app.handleForward(var1)
    })
  },
});
