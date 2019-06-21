import {keysArr} from '/util/key.js'
let app = getApp();


Page({
  data: {
      titleType:"UNIT",
      name:"",
      taxNum:"",
      address:"",
      tel:"",
      bank:"",
      bankAccount:"",
      ticketId:'',
      itemsNames:[],
      etcFlag:true
  },
  onLoad(query) {
    console.log(query)
    console.log(typeof(query))
    if(query.etcFlag){
      this.setData({
        etcFlag:false
      })
    }
    console.log(this.data.etcFlag)
    this.getTitList()
    console.log(keysArr)
  },
  onShow() {
    // 小程序显示
    // console.log(app.addTaitouEtcList);
    this.setData({
      etcList: app.addTaitouEtcList
    })
  },
  selComp(){
    this.setData({
      titleType: 'UNIT',
      name:"",
      taxNum:"",
      address:"",
      tel:"",
      bank:"",
      bankAccount:""
    })
  },
  selPer(){
    this.setData({
      titleType: 'PERSON',
      name:"",
      taxNum:"",
      address:"",
      tel:"",
      bank:"",
      bankAccount:""
    })
  },
  judegCnaAdd(){
    console.log(this.data.name, this.data.itemsNames)
    if(this.data.titleType == 'UNIT'){
      if(this.data.name.length<=0){
        my.alert({
          content: '抬头名称不能为空'
        });
        return false;
      }else if(this.data.taxNum.length<=0){
        my.alert({
          content: '税号不能为空'
        });
        return false;
      }else if(this.data.itemsNames.indexOf(this.data.name)>-1){
        my.alert({
          content: '已经存在相同的抬头名称，请确认'
        })
      }
    }else{
      if(this.data.name.length<=0){
        my.alert({
          content: '抬头名称不能为空'
        });
        return false;
      }else if(this.data.itemsNames.indexOf(this.data.name)>-1){
        my.alert({
        content: '已经存在相同的抬头名称，请重新添加'
        })
      }
    }
    return true
  },
  addEtc(){
    // console.log(this.data);
    if(!this.judegCnaAdd())return;
    let json1 = {
      titleType: this.data.titleType,
      name: this.data.name,
      taxNum: this.data.taxNum,
      address: this.data.address,
      tel: this.data.tel,
      bank: this.data.bank,
      bankAccount: this.data.bankAccount,
      ticketId: app.userInfo.ticketId
    }
    let that = this;
    app.ajax(json1,'TITLE_ADD',function(data){
      app.invTitIndNeedRefresh = true;//绑定后，抬头列表也需要刷新
      if(app.addTaitouEtcList.length){
        let json2= {
          ticketId: app.userInfo.ticketId,
          titleId: data.titleId,
          infos: app.addTaitouEtcList
        };
        app.ajax(json2,'TITLE_ADDCARD',function(d){

        },null,function(){
          app.addTaitouEtcList = [];
          my.navigateBack(); 
        })
      }else{
        my.navigateBack(); 
      }
    },function(res){
      let str = res.msg=='纳税人识别号/统一社会信用代码格式不正确'?'税号格式不正确，请输入15~20位大写英文字母和数字':res.msg
      my.alert({
        content:str
      })
    })
  },
  bindEtc(){
    let var1 = {
      currentTarget: {
        dataset: {
          url: "/pages/invoiceTit/selEtc/selEtc",
          openType: "navigateTo"
        }
      }
    }
    app.handleForward(var1)
  },
  setInvName(e){
    let v = e.detail.value;
    const reg = /[^\u4e00-\u9fa5a-zA-Z0-9（）()]+/g;

    v = v.replace(reg,"");
    console.log(v);
    this.setData({
      name: v
    })
  },
  setInvTax(e){
    this.setData({
      taxNum: e.detail.value
    })
  },
  setInvAdd(e){
    this.setData({
      address: e.detail.value
    })
  },
  setInvTel(e){
    this.setData({
      tel: e.detail.value
    })
  },
  setInvBank(e){
    this.setData({
      bank: e.detail.value
    })
  },
  setInvAcc(e){
    this.setData({
      bankAccount: e.detail.value
    })
  },
  getTitList(){
    let json1 = {
      ticketId: app.userInfo.ticketId
    }
    let that = this;
    app.ajax(json1,'TITLE_SEARCH',function(data){
      // let noData = data.items.length == 0?1:0;
      let itemsNames = [];
      for(let item of data.items){
        itemsNames.push(item.name)
      }
      that.setData({
        itemsNames: itemsNames,
        // noData: noData
      })
    })
  }
});
