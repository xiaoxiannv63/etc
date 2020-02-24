import CryptoJS  from './util/crypto/crypto-js';

App({
  addTaitouEtcList:[],
  deleteFlag:true,
  isAlert: false,
  // ajaxRoot: 'https://pss.txffp.com/pss/app/common/zfbapi',//正式
  ajaxRoot:'https://testpss.txffp.com/pss/app/common/zfbapi',
  ajaxRoot2:'http://172.30.5.13:8080/nuonuo/invoice/client/returnEncryptKpInfoToSource.action',
  // ajaxRoot2:'https://piaogen.jss.com.cn/nuonuo/invoice/client/returnEncryptKpInfoToSource.action',
  AESencrypt (plaintText) {
    // AES加密，用于ajax参数上传
    // key 秘钥
    // return 加密后数据
    var key = CryptoJS.enc.Utf8.parse("QkiUtbsd1zBwDHgN");
    var plaintText = JSON.stringify(plaintText)
    var encryptedData = CryptoJS.AES.encrypt(plaintText, key, {
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7
    });

    encryptedData = encryptedData.ciphertext.toString();
  
    // var encryptedHexStr = CryptoJS.enc.Hex.parse(encryptedData);
    // var encryptedBase64Str = CryptoJS.enc.Base64.stringify(encryptedHexStr);

    // return  encryptedBase64Str;
    return encryptedData
  },
  md5Code (str) {
    var key = CryptoJS.MD5(str).toString();

    return  key;

    function strToBinary(str){
        var result = [];
        var list = str.split("");
        for(var i=0;i<list.length;i++){
            var item = list[i];
            var binaryStr = item.charCodeAt().toString(2);
            result.push(binaryStr);
        }   
        return result.join("");
    }
  },
  format(str){
    let t = str;
    str = t.slice(0,4)+"-"+t.slice(4,6)+"-"+t.slice(6,8)+" "+t.slice(8,10)+":"+t.slice(10,12)+":"+t.slice(12);
    return str
  },
  ajax(json1,type,succ,fail,compl){
    my.showLoading({
      content: 'loading...'
    });
    //判断是否有ticketid，且接口类型是否需要ticketid
    let noNeedLoginTypeArr = {
      'ONLINE': 1,
      'REGISTER': 1,
      'LOGIN': 1,
      'BACKPASSWORD': 1,
      'VALIDCODE': 1
    };
    if(!this.userInfo.ticketId && !noNeedLoginTypeArr[type] ){
      console.log("-0-0-0-0-0-")
      my.hideLoading();
      my.redirectTo({
        url:"/pages/login/bind/index",
      })
      return;
    }
    let data = {
      jsonStr: JSON.stringify(json1),
      type: type
    }
    let urlData = "";
    for(let o in data){
      urlData += o + "=" +data[o]+"&"
    };
    console.log('---请求参数----',data);
    let md5Text = this.md5Code(urlData.substring(0,urlData.length-1));
    let that = this;
    my.request({
      url: this.ajaxRoot,
      headers: {'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8','Request-Headers':md5Text},
      method: 'POST',
      data: data,
      dataType: 'json',
      success: function(res) {
        my.hideLoading();
        let data = JSON.parse(res.data.jsonStr);
        console.log('---响应参数---',data);
        if(data.success){
          succ(data)
        }else{
          if(data.code == '702'){
            console.log(702)
            my.navigateTo({
              url:"/pages/login/bind/index",
            })
          }else if(fail && data.msg){
            fail(data);
          }else{
            my.alert({
              content:data.msg
            });
          }
        }
      },
      fail: function(res) {
        console.log(res)
        my.hideLoading();
        if(res.status===500){
          if(!that.isAlert){
            that.isAlert = true
            my.alert({
              content: '网络异常，稍后重试！！',
              success: () => {
                that.isAlert = false
              }
            })
          }
        }else{
          !!fail&&fail(res.data);
        }
      },
      complete: function(res) {
        my.hideLoading();
        compl&&compl();
      }
    });
  },
  userInfo: {},
  getUserInfo() {
    return new Promise((resolve, reject) => {
      if (this.userInfo) resolve(this.userInfo);

      my.getAuthCode({
        scopes: ['auth_user'],
        success: authcode => {
          console.info('---authcode---',authcode);

          my.getAuthUserInfo({
            success: res => {
              console.log(res)
              this.userInfo = res;
              let var1 = {
              currentTarget: {
                dataset: {
                  url: '../login/bind/index',
                  openType: "redirectTo"
                }
              }
            }
            this.handleForward(var1)
            },
            fail: () => {
              reject({});
            },
          });
        },
        fail: () => {
          reject({});
        },
      });
    });
  },
  gotoH5(url){
    // console.log(url+'<<::')
    // var url = 'https://fuyuan.wang'
    console.log(url)
    my.navigateTo({
      url: `/pages/web/index?url=${url}`
    })
  },
  globalData: {},
  handleForward(event) {
    let that = this;
    const { url, openType } = event.currentTarget.dataset;
    console.log(url)
    let forwardObj = {
      url: url,
      success() {
        let t = setTimeout(function () {
          that.globalData.isNavigating = false;
          clearTimeout(t);
        }, 1000);
      }
    };
    if (!that.globalData.isNavigating) {
      that.globalData.isNavigating = true;
      switch (openType) {
        case 'switchTab':   // 切换tab
          my.switchTab(forwardObj);
          break;
        case 'redirect':    // 重定向
          my.redirectTo(forwardObj);
          break;
        default:            // 正常跳转
          my.navigateTo(forwardObj);
          break;
      }
    }
  },
  getPermision() {
    my.getAuthCode({
      scopes: 'auth_base', // 主动授权（弹框）：auth_user，静默授权（不弹框）：auth_base
      success: (res) => {
        this.authCode = res.authCode;

        this.indRes()
      }
    });
  },
  indRes() {
    let json1 = {
      code: this.authCode,
      channel: 'ZFBPIAOGEN'
    }
    this.ajax(json1, "ONLINE",  (data)=> {
      console.log(data.userId, 'ONLINE (userId)')
      this.userInfo.userId = data.userId;
      console.log(this.userInfo, 'this.userInfo')
      if (!data.ticketId) { //没有ticketId 不做跳转
      console.log("ticket无效")
      } else {
        console.log("ticket 有效  ")
        let json2 = {
          userId: this.userInfo.userId,
          channel: 'ZFBPIAOGEN'
        }
        console.log(this,'this')
        this.ajax(json2, 'LOGIN',  (data)=> {
          console.log(data, "支付宝启用。。")
          this.userInfo.pssUserId = data.pssUserId;
          this.userInfo.ticketId = data.ticketId;
          this.userInfo.mobile = data.mobile;
          this.userInfo.email = data.email;
          this.userInfo.hasBindCard = data.hasBindCard;
          console.log(this.userInfo)
          // app.mobile = data.mobile
          // my.navigateBack();
          // my.reLaunch({
          my.switchTab({
            url: "/pages/index/index"
          });
        })
      }
    }, function (e) {
      console.log(e, 'ONLINE获取失败。。。。')
    })
  },
  phoneNumber(that){
    my.getPhoneNumber({
      success: (res) => {
        that.setData({
          modalOpened: false
        })
        // console.log(arr.response, 'JSON.PARSE')
        var json1 = {
          code: this.authCode,
          encryptedData: res.response,
          userId: this.userInfo.userId,
          loginType: 'ALIPAY',
          channel: 'ZFBPIAOGEN'
        }
        this.ajax(json1, "REGISTER",  (data)=> {
          console.log("进入。。。", data)
          if (!!data.ticketId) {
            this.userInfo.ticketId = data.ticketId;
            this.userInfo.pssUserId = data.pssUserId;
            let json2 = {
              userId: this.userInfo.userId,
              channel: 'ZFBPIAOGEN'
            }
            this.ajax(json2, 'LOGIN',  (data)=> {
          console.log(data, "支付宝启用。。")
          this.userInfo.pssUserId = data.pssUserId;
          this.userInfo.ticketId = data.ticketId;
          this.userInfo.mobile = data.mobile;
          this.userInfo.email = data.email;
          this.userInfo.hasBindCard = data.hasBindCard;
          console.log(this.userInfo)
          // app.mobile = data.mobile
          // my.navigateBack();
          // my.reLaunch({
          my.switchTab({
            url: "/pages/index/index"
          });
        })
          }
        })

        // console.log(res,'aaa')      
      },
      fail: (res) => {
        console.log(res, 'getPhoneNumber_fail')
      },
    })
  },
  onShareAppMessage() {
    return {
      title: '票根',
      desc: '简单快捷获取通行费电子发票',
      path: 'pages/startup/startup'
    };
  },
});
