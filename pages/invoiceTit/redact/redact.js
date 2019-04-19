const app = getApp();
Page({
  data: {
    invoice:{
    }
  },
  onLoad(query) {
    this.setData({
        tit:query.tit,
        titType:query.titType,
        name:query.name,
        tax:query.tax,
        add:query.add,
        tel:query.tel,
        bank:query.bank,
        acc:query.acc,
    })
  },
  modi(){
    // console.log(this.data.invoice);
    if(!this.check())return;
    let json1 = {
      titleId: this.data.tit,
      name: this.data.name,
      taxNum: this.data.tax,
      address: this.data.add,
      tel: this.data.tel,
      bank: this.data.bank,
      bankAccount: this.data.acc,
      ticketId: app.userInfo.ticketId
    }

    app.ajax(json1,'TITLE_EDIT',function(data){
      app.invTitIndNeedRefresh = true;
      my.navigateBack({
        delta: 2
      });

    },function(res){
      let str = res.msg=='纳税人识别号/统一社会信用代码格式不正确'?'税号格式不正确，请输入15~20位大写英文字母和数字':res.msg
      my.alert({
        content:str
      })
    })
  },
  check(){
    if(!this.data.name || this.data.name.length<=0 ){
      my.alert({
        content:'请填写抬头名称！'
      });
      return false;
    }else if(this.data.titType=='单位' && this.data.tax.length<=0){
      my.alert({
        content:'请填写税号！'
      });
      return false;
    }
    return true;
  },
  setInvName(e){
    this.setData({
      name:e.detail.value
    })
  },
  setInvTax(e){
    this.setData({
      tax:e.detail.value
    })
  },
  setInvAdd(e){
    this.setData({
      add:e.detail.value
    })
  },
  setInvTel(e){
    this.setData({
      tel:e.detail.value
    })
  },
  setInvBank(e){
    this.setData({
      bank:e.detail.value
    })
  },
  setInvAcc(e){
    this.setData({
      acc:e.detail.value
    })
  },
});
