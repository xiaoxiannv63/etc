if(!self.__appxInited) {
self.__appxInited = 1;


require('./config$');
require('./importScripts$');

var AFAppX = self.AFAppX;
self.getCurrentPages = AFAppX.getCurrentPages;
self.getApp = AFAppX.getApp;
self.Page = AFAppX.Page;
self.App = AFAppX.App;
self.my = AFAppX.bridge || AFAppX.abridge;
self.abridge = self.my;
self.Component = AFAppX.WorkerComponent || function(){};
self.$global = AFAppX.$global;


function success() {
require('../..//app');
require('../../node_modules/mini-antui/es/flex/index');
require('../../node_modules/mini-antui/es/flex/flex-item/index');
require('../../node_modules/mini-antui/es/modal/index');
require('../../node_modules/mini-antui/es/list/index');
require('../../node_modules/mini-antui/es/list/list-item/index');
require('../../node_modules/mini-antui/es/grid/index');
require('../../node_modules/mini-antui/es/badge/index');
require('../../node_modules/mini-antui/es/tabs/index');
require('../../node_modules/mini-antui/es/tabs/tab-content/index');
require('../../node_modules/mini-antui/es/am-icon/index');
require('../../node_modules/mini-antui/es/notice/index');
require('../../components/steps/steps');
require('../../pages/startup/startup');
require('../../pages/index/index');
require('../../pages/invoiceStatus/invoiceStatus');
require('../../pages/iWangTo/kpSuccess/kpSuccess');
require('../../pages/electronicInvoice/electronicInvoice');
require('../../pages/web/index');
require('../../pages/invoice/invoice');
require('../../pages/wodeETC/etcDetail/etcDetail');
require('../../pages/quotation/quotation');
require('../../pages/login/protocols/protocols');
require('../../pages/login/personal/personal');
require('../../pages/help/help');
require('../../pages/myInvoice/invoiceList/invoiceList');
require('../../pages/changing/changing');
require('../../pages/invoiceError/invoiceError');
require('../../pages/bindSuccessful/bindSuccessful');
require('../../pages/user/user');
require('../../pages/login/bind/index');
require('../../pages/wodeETC/myetc/myetc');
require('../../pages/question/question');
require('../../pages/wodeETC/addEtcCard/addEtcCard');
require('../../pages/invoiceRecord/invoiceRecord');
require('../../pages/wodeETC/selTaitou/selTaitou');
require('../../pages/invoiceTit/index/index');
require('../../pages/invoiceTit/invoiceDet/invoiceDet');
require('../../pages/invoiceTit/redact/redact');
require('../../pages/invoiceTit/addTaitou/addTaitou');
require('../../pages/invoiceTit/selEtc/selEtc');
require('../../pages/myInvoice/serInvList/serInvList');
require('../../pages/myInvoice/invApplication/invApplication');
require('../../pages/myInvoice/viewInvoice/viewInvoice');
require('../../pages/myInvoice/invImg/invImg');
require('../../pages/myInvoice/invDetail/invDetail');
require('../../pages/iWangTo/cardList/cardList');
require('../../pages/iWangTo/recordList/recordList');
require('../../pages/iWangTo/invAccept/invAccept');
require('../../pages/routeInvoice/routeInvoice');
}
self.bootstrapApp ? self.bootstrapApp({ success }) : success();
}