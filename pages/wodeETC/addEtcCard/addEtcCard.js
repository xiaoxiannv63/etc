const app = getApp();
Page({
  data: {
    userType: 'PERSONAL',
    steps: [{
        // 此步骤是否当前完成状态
        current: false,
        // 此步骤是否已经完成
        done: true,
        // 此步骤显示文案
        text: '步骤一',
        // 此步骤描述语
        desc: '提交卡片信息'
      },
      {
        done: true,
        current: false,
        text: '步骤二',
        desc: '校验手机号'
      },
      {
        done: true,
        current: true,
        text: '步骤三',
        desc: '选择ETC卡'
      }],
    curStep: 0,
    array: ['','北京市','天津市','上海市','重庆市','河北省','山西省','辽宁省','吉林省','黑龙江省','江苏省','浙江省','安徽省','福建省','江西省','山东省','河南省','湖北省','湖南省','广东省','四川省','贵州省','云南省','陕西省','甘肃省','青海省','内蒙古自治区','广西壮族自治区','宁夏回族自治区','新疆维吾尔自治区'],
    arrayStr: ['','BEI_JING','TIAN_JIN','SHANG_HAI','CHONG_QING','HE_BEI','SHAN_XI','LIAO_NING','JI_LIN','HEI_LONG_JIANG','JIANG_SU','ZHE_JIANG','AN_HUI','FU_JIAN','JIANG_XI','SHAN_DONG','HE_NAN','HU_BEI','HU_NAN','GUANG_DONG','SI_CHUAN','GUI_ZHOU','YUN_NAN','SHAAN_XI','GAN_SU','QING_HAI','NEI_MENG_GU','GUANG_XI','NING_XIA','XIN_JIANG'],
    index: 0,
    array2: ['','身份证','护照（限外籍）','港澳居民来往内地通行证','台湾居民来往内地通行证','军官证','武警警察身份证'],
    array2Type:['','ID_CARD','PASSPORT','MAINLAND_TRAVEL_PERMIT_HKM_RESIDENTS','TW_RESIDENTS_TRAVEL_MAINLAND','CERTIFICATE_OF_OFFICERS','ARMED_POLICE_STATUS'],
    index2: 0,
    array3: ['','统一社会信用代码证书','组织机构代码证','营业执照','事业单位法人证书','社会团体法人登记证书','律师事务所执业许可证'],
    array3Type:['','UNIFIED_SOCIAL_CREDIT_CODE_CERTIFICATE','ORGANIZATION_CODE_CERTIFICATE','BUSINESS_LICENSE','INSTITUTIONAL_CERTIFICATE','SOCIAL_GROUP_CORPORATE_REGISTRATION_CERTIFICATE','LAW_FIRM_PRACTICE_PERMIT'],
    index3: 0,
    totalNum: 0,//总条数
    cardList: [],
    getCodeBtnText:'获取验证码',
    department:'',
    time:0,
    currentTime:60,
    disabled2:false,
    interval:null,
    bindCardList:[],//将要绑定的卡的集合
    selAllList: false, //全选按钮的值
    selAllOnOff: false, //全选开关 
    nextDisable0: true,
    nextDisable1: true
  },
  bindPickerChange(e) {
    // console.log('picker发送选择改变，携带值为', e.detail.value);
    this.setData({
      index: e.detail.value,
    });
    //判断下一步按钮
    this.judgeNextDisable()
  },
  bindPickerChange2(e) {
    // console.log('picker发送选择改变，携带值为', e.detail.value);
    this.setData({
      index2: e.detail.value,
    });
    this.judgeNextDisable();
  },
  bindPickerChange3(e) {
    // console.log('picker发送选择改变，携带值为', e.detail.value);
    this.setData({
      index3: e.detail.value,
    });
    //判断下一步按钮
    this.judgeNextDisable()
  },
  getCode(){
    //step2  获取验证码
    let momB = this.data.mobNum;
    let that = this;
    if(this.data.disabled2)return;
    if(momB.length != 11 ){//判断手机号码长度
      my.alert({
        content:'请输入正确手机号码'
      });
      return;
    }
    let currentTime = that.data.currentTime;
    this.setData({
      getCodeBtnText: '获取验证码',
      disabled2: true
    })
    this.data.interval = setInterval(function () {
      that.setData({
        time: currentTime - 1,
      })
      currentTime--;
      if (currentTime <= 0) {
        that.setData({
          time: 0,
          currentTime: 60,
          disabled2: false
        })
        clearInterval(that.data.interval)
      }
    }, 1000)
    let js1 = {
      cmd: 'CARD_LISTBYMOBILE',
      mobile: momB,
      ticketId: app.userInfo.ticketId
    }
    app.ajax(js1,'LOGINVALIDCODE',(data)=>{

    },(err) => {
      this.setData({
          time: 0,
          currentTime: 60,
          disabled2: false
        })
      clearInterval(this.data.interval)
      my.alert({
        content:err.msg
      });
    })
  },
  next(){
    let json1,type,curStep = this.data.curStep,that = this;
    if(curStep == 0){
      json1 = {
        province:this.data.arrayStr[this.data.index],
        userType:this.data.userType,
        name:this.data.name,
        idType:this.data.userType=='PERSONAL'?this.data.array2Type[this.data.index2]:this.data.array3Type[this.data.index3],
        idCode:this.data.docuNum,
        department:this.data.department,
        ticketId: app.userInfo.ticketId
      }
      app.ajax(json1,'CARD_CHECKCUSTOMER',function(data){
        that.nextStep();
      })
    }else if(curStep == 1){
      let momB = this.data.mobNum, checkNum = this.data.checkNum;
      if(momB &&momB.length==11  &&checkNum ){
        json1 = {
          mobile: momB,
          validCode: checkNum,
          ticketId: app.userInfo.ticketId
        }
        app.ajax(json1,'CARD_LISTBYMOBILE',function(data){
          that.setData({
            totalNum: data.totalNum,//总条数
            cardList: data.items,
          })
          that.nextStep();
        })
      }
    }
  },
  nextStep(){
    this.setData({
      curStep: (this.data.curStep<this.data.steps.length)?++this.data.curStep:this.data.steps.length
    })
    // console.log(this.data.curStep);

  },
  onLoad(query) {
    let tit = query.type == 'PERSONAL'?'绑定个人卡':'绑定单位卡';
    my.setNavigationBar({
      title: tit
    })
    this.setData({
      curStep: 0,
      userType: query.type
    })
  },
  onUnload() {
    // 页面被关闭
    this.setData({
      time: 0,
      currentTime: 60,
      disabled2: false
    })
    clearInterval(this.data.interval)
  },
  setDepart(e){//分支机构
    this.setData({
      department:e.detail.value
    })
  },
  setName(e){//证件号
    this.setData({
      name:e.detail.value
    })
    //判断下一步按钮
    this.judgeNextDisable()
  },
  setDocuNum(e){//证件号
    this.setData({
      docuNum:e.detail.value
    })

    //判断下一步按钮
    this.judgeNextDisable()
  },
  setMobNum(e){//手机号
    this.setData({
      mobNum:e.detail.value
    })

    //判断下一步按钮
    this.judgeNextDisable()
  },
  setCheckNum(e){//验证码
    this.setData({
      checkNum:e.detail.value
    })

    //判断下一步按钮
    this.judgeNextDisable()
  },
  listChange(e){//ETC卡复选
    // console.log(typeof e.detail.value)
    this.setData({
      bindCardList: e.detail.value,
      selAllOnOff: this.data.selAllOnOff?false:false
    })
    
  },
  selAll(e){
    var v = e.detail.value;
    if(v.length){
      let arr = [];
      for(let i in this.data.cardList){
        arr.push(this.data.cardList[i].cardId);
      }
      this.setData({
        selAllOnOff: true,
        bindCardList: arr
      })
    }else{
      this.setData({
        selAllOnOff: false,
        bindCardList: []
      })
    }
  },
  bindHandle(){
    // console.log("绑定ETC卡",this.data.bindCardList)
    var that = this;
    var hasCardBindOther = ()=>{
      let bindCard = this.data.bindCardList;
      let card = this.data.cardList;
      for( let i in bindCard){
        for( let j in card){
          if(bindCard[i] == card[j].cardId && card[j].hasBind){
            return true;
          }
        }
      }
      return false;
    }

    if(hasCardBindOther()){
      my.confirm({
        title: '提示',
        content: '该ETC卡已被别的账户绑定，是否需要绑定，如绑定则自动将此ETC卡同之前绑定的账户解绑',
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        success: (result) => {
          if(result.confirm){
            that.bindEtc();
          }
        },
      });
    }else{
      this.bindEtc();
    }
  },
  bindEtc(){
    let json1,finalCardList=[];
    for(let i in this.data.bindCardList){
      finalCardList.push({cardId:this.data.bindCardList[i]});
    }
    json1 = {
      infos: finalCardList,
      userType:this.data.userType,
      mobile: this.data.mobNum,
      ticketId:app.userInfo.ticketId
    }
    app.ajax(json1,'CARD_BIND',(data)=>{
      my.hideLoading();
      if(data.success){
        app.needRefresh = true;
        app.myEtcNeedRefresh = true;
        my.navigateTo({
          url: '/pages/bindSuccessful/bindSuccessful?cardIds='+JSON.stringify(json1.infos)
        });
      }else{
        my.alert({
          content: data.msg
        });
      }
    })
  },
  judgeNextDisable(){//判断下一步按钮是否可用
    let curStep = this.data.curStep,
        userType = this.data.userType;
    if(curStep == 0){//第一步
      if(userType == 'PERSONAL' 
        && this.data.index>0 
        && this.data.name && this.data.name.length>0
        && this.data.index2>0
        && this.data.docuNum && this.data.docuNum.length > 0){
        this.setData({
          nextDisable0: false
        })
        return;
      }else if(userType ==  'COMPANY'
              && this.data.index>0 
              && this.data.name && this.data.name.length>0
              && this.data.index3 > 0
              && this.data.docuNum && this.data.docuNum.length > 0){
        this.setData({
          nextDisable0: false
        })
        return;
      }
      this.setData({
        nextDisable0: true
      })
    }else if(curStep == 1){//第二步
      //满足下一步条件
      if(this.data.mobNum && this.data.mobNum.length == 11 && this.data.checkNum && this.data.checkNum.length > 0){
        this.setData({
          nextDisable1: false
        })
        return
      }

      this.setData({
        nextDisable1: true
      })
    }
  }
});
