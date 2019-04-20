Page({
  data: {
    url:''
  },
  onLoad(query){
    // this.setData({
    //   url:query.url
    // })
    // my.call('startApp', {
    //   appId: '20000920',
    //   param: {
    //       startMultApp: 'YES',
    //       appClearTop: false,
    //       url: query.url
    //   }
    // });
    console.log(query.url)
    this.setData({
      url:query.url
    })
  }
});
