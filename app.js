import CryptoJS  from './util/crypto/crypto-js';

App({
  addTaitouEtcList:[],
  todos: [
    { text: 'Learning Javascript', completed: true },
    { text: 'Learning ES2016', completed: true },
    { text: 'Learning 支付宝小程序', completed: false },
  ],
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
  // --method--
  // AES解密
  // AESdecrypt (encryptedBase64Str) {
  //   // AES解密，用于解析服务端返回的data数据
  //   // key 秘钥
  //   // return 解密后数据
  //   var key = CryptoJS.enc.Utf8.parse("QkiUtbsd1zBwDHgN");
  //   var decryptedData = CryptoJS.AES.decrypt(encryptedBase64Str, key, {
  //     mode: CryptoJS.mode.ECB,
  //     padding: CryptoJS.pad.Pkcs7
  //   });
    
  //   var decryptedStr = decryptedData.toString(CryptoJS.enc.Utf8);
    
  //   return JSON.parse(decryptedStr);
  // },
  md5Code (str) {
    // AES加密，用于ajax参数上传
    // key 秘钥
    // return 加密后数据
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
    my.httpRequest({
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
        console.log(res);
        my.hideLoading();
        !!fail&&fail(res.data);
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
              this.userInfo = res;
              resolve(this.userInfo);
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
    my.navigateTo({
      url: `/pages/web/index?url=${url}`
    })
  },
  throttle(fn, gapTime) { // 防抖节流
    console.log('000')
    if (gapTime == null || gapTime == undefined) {
      gapTime = 1500
    }
    let _lastTime = null
    // 返回新的函数
    return function () {
      let _nowTime = + new Date()
      if (_nowTime - _lastTime > gapTime || !_lastTime) {
        fn.apply(this, arguments) //将this和参数传给原函数
        _lastTime = _nowTime
      }
    }
  }
});
