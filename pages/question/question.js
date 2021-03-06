Page({
  data: {
    items: [{
      name: "1.票根简介", content: [{
        expanded: false,
        id: "1.1",
        question: '1.1 什么是票根？',
        answer: '“票根”是全国收费公路通行费增值税电子发票服务平台，为全国ETC用户提供发票开具、发票查询、发票获取 等服务。'
      }, {
        expanded: false,
        id: "1.2",
        question: '1.2 通行费电子发票的开票渠道有哪些？',
        answer: '-票根网站 www.txffp.com;\n-票根APP;\n-票根小程序。 '
      }]
    }, {
      name: "2.ETC卡", content: [{
        expanded: false,
        id: "2.1",
        question: '2.1 已办理ETC卡',
        answer: '已办理ETC卡的用户可直接通过票根平台 www.txffp.com、“票根APP”或“票根小程序”开具通行费电子发票。'
      }, {
        expanded: false,
        id: "2.2",
        question: '2.2 未办理ETC卡',
        answer: '未办理ETC卡的用户可联系ETC卡的发行方咨询新办手续。\n 各省发行方热线电话如下：\n 北京：010-96011;天津：4007554007;河北：0311-96122转ETC;山西：0351-7337793;内蒙古：0471-12122;辽宁：024-96199;吉林：0431-12122/85379663;黑龙江：0451-96369;上海：021-12319;江苏：025-96777;浙江：0571-88891122;安徽：0551-96369;福建0591-12122;江西：0791-12328;山东：0531-96669转2;河南：0371-12328;湖北：027-96576;湖南：0731-12328/96528;广东：020-96533;广西：0771-96333转2;重庆：023-12122/96069;四川：028-12122;贵州：0851-12328;云南：0871-64611156/0871-12328;陕西：029-12122/12328;甘肃：0931-8529861;青海：0971—6231000/6232000;宁夏：0951-12328转4;新疆：0991-12328 '
      }]
    },
    {
      name: "3.注册或登录票根账号", content: [{
        expanded: false,
        id: "3.1",
        question: '3.1 老用户和新用户应该如何操作？',
        answer: '-老用户：可通过登录原票根账号开具电子发票。\n -新用户：只需输入手机号+验证码登录，登录即为注册，登录成功后可正常使用。'
      },
    {
      expanded: false,
      id: '3.2',
      question: '3.2 如何登录票根账号？',
      answer: '在首页点击【登录】，老用户输入注册手机号及密码，即可登录成功。新用户可选择【使用手机验证码登录】，输入手机号及收到的短信验证码，即可登录成功。短信验证码限定1分钟内只可获取一次。'
    },
    {
      expanded: false,
      id: '3.3',
      question: '3.3 忘记密码如何登录票根账号？',
      answer: '如您忘记密码，可选择【使用手机验证码登录】，输入注 册手机号及收到的短信验证码，即可登录成功。短信验证码限定1分钟内只可获取一次，有效时间为5分钟。'
    },
    {
      expanded: false,
      id: '3.4',
      question: '3.4 收不到验证码怎么办？',
      answer: '若无法收到短信验证码，请先确认以下问题：\n -网络信号是否通畅；\n -短信信箱内存是否已满；\n -是否有拦截软件（查看短信垃圾箱是否被拦截）；\n-短信功能是否被限制或者停用（可咨询手机运营商）；\n如果没有出现以上问题，请重启您的手机重新获取短信。\n短信验证码限定1分钟内只可获取一次，请勿频繁操作。 如若仍无法接收短信，请联系在线客服处理。'
    },
    {
      expanded: false,
      id: '3.5',
      question: '3.5 提示“请使用最新收到的短信验证码”怎么办？',
      answer: '短信验证码限定1分钟内只可获取一次。如系统提示“请 使用最新收到的短信验证码，如未收到，请等待...”；说明您在1分钟内曾获取过，请输入最新验证码即可。'
    }]
  },
    {
    name: "4.绑定ETC卡", content: [{
      expanded: false,
      id: '4.1',
      question: '4.1 需选择个人卡还是单位卡？',
      answer: '请根据您办理ETC卡时实际业务类型进行选择。'
    }, {
      expanded: false,
      id: '4.2',
      question: '4.2 如何绑卡？',
      answer: '您需完成以下3个步骤：\n 1.校验办卡预留证件信息；\n 2.校验办卡预留手机号码；\n3.选择需绑定的ETC卡。'
    }, {
      expanded: false,
      id: '4.3',
      question: '4.3 如何校验预留证件信息？',
      answer: '1.选择卡片所属省市；\n 2.个人卡填写姓名、证件类型、证件号码；\n3.单位卡填写单位名称、分支机构（选填）、证件类 型、证件号码。'
    },
    {
      expanded: false,
      id: '4.4',
      question: '4.4 提示“与预留信息不一致”怎么办？',
      answer: '预留信息包含证件信息及手机号码，如提示不一致，请联系发行方核实或修改。'
    },
    {
      expanded: false,
      id: '4.5',
      question: '4.5 提示“名下没有ETC卡”怎么办？',
      answer: '如您在绑卡校验信息通过后，提示您名下没有ETC卡，请您联系ETC卡发行方核实您的ETC卡信息是否上传成功、 ETC卡开户证件是否准确无误，核实无误后再在票根小程序上进行绑定。'
    }
      , {
      expanded: false,
      id: '4.6',
      question: '4.6 注销卡可以绑定吗？',
      answer: '-2018年1月1日前注销的ETC卡是不可以再通过平台进行绑定的。\n -2018年1月1日之后注销的ETC卡是可以绑定的，绑定后您 也可以开具您这张卡上2018年1月1日之后的消费记录发票'
    }, {
      expanded: false,
      id: '4.7',
      question: '4.7 可以绑定多少张卡？',
      answer: '-单位用户绑卡上限为7000张；\n -个人用户绑卡上限为50张。'
    }, {
      expanded: false,
      id: '4.8',
      question: '4.8 提示“绑卡超时”怎么办？',
      answer: '-绑定过程不可超过10分钟（绑定过程包括提交卡片信息、校验手机号、选择ETC卡），否则会提示“绑卡超时”；\n -若提示“绑卡超时”，您需重新开始操作绑卡（从提交卡片信息步骤重新开始）。'
    }, {
      expanded: false,
      id: '4.9',
      question: '4.9 绑卡时显示的ETC卡数量与实际数量不一致',
      answer: '-如您在绑卡校验通过后，显示的ETC卡绑定数量少于实际 数量，可能有如下情况：\n 1)	未显示的卡片在2018年1月1日之前已经注销；\n 2)	未显示卡片数据信息没有上传，请与发行方核实；\n 3)	存在多个ETC账户，未显示的ETC卡在其他账户名下 (例如：单位分支机构不同、开户证件不同）。'
    }]
  },
  {
    name: "5.关联抬头", content: [{
      expanded: false,
      id: '5.1',
      question: '5.1 为什么要预设抬头？',
      answer: '根据交通运输部公告2017年第66号规定，凭手机号码、手机验证码免费注册，并按要求设置购买方信息。客户如需变更购买方信息，应当于发生充值或通行交易前变更，确保开票信息真实准确。'
    },
    {
      expanded: false,
      id: '5.2',
      question: '5.2 可以选择多张卡片批量关联抬头吗？',
      answer: '可以的，您可以勾选多张ETC卡后批量关联同一发票抬头。'
    },
    {
      expanded: false,
      id: '5.3',
      question: '5.3 已关联抬头的卡片可以关联其他抬头吗？',
      answer: '一张卡片只可关联一个抬头，选择已关联抬头的卡片与其 他抬头关联后，将解除该卡片与原抬头的关联。'
    },
    {
      expanded: false,
      id: '5.4',
      question: '5.4 如何填写发票抬头？',
      answer: '5.4.1 选择抬头类型：企业或个人/非企业单位；\n5.4.2 “企业”类型必须填写抬头名称、税号；\n 5.4.3 “个人/非企业单位”类型必须填写抬头名称。'
    },
    {
      expanded: false,
      id: '5.5',
      question: '5.5 首次开票如何设置抬头？',
      answer: '首次开具发票的用户，可在交易发生后设置卡片关联的抬头。'
    },
    {
      expanded: false,
      id: '5.6',
      question: '5.6 提示“信息格式不正确”怎么办？',
      answer: '-发票抬头最长字符为64个，且不能含有特殊字符； \n-如确认填写无误，请登陆票根官网或APP联系在线客服处理。'
    }]
  },
  {
    name: "6.我要开票", content: [{
      expanded: false,
      id: '6.1',
      question: '6.1 如何开票',
      answer: '6.1.1 选择需开票的ETC卡；\n 6.1.2 选择通行记录（开具消费发票)或选择充值交易记录 (开具充值发票）；\n 6.1.3 填写或核对电子邮箱，即可提交开票申请。\n注：电子发票可以电子形式保存，不打印也可报销'
    }, {
      expanded: false,
      id: '6.2',
      question: '6.2 在票根上我可以开具什么发票？',
      answer: '-充值发票：储值卡客户充值后可选择实时取得充值发票，如出现数据延迟情况，建议等待24小时在查看。\n -消费发票：在实际发生通行费用后第10个自然日（遇法定节假日顺延）起，登录发票服务平台（APP、小程序或票根网站）进行获取。'
    }, {
      expanded: false,
      id: '6.3',
      question: '6.3 票根上开具的电子发票可以抵税吗？',
      answer: '如果您通行的是经营性公路，开具的消费发票左上角带有通行费字样，发票抬头信息填写完整，属于征税发票，具备抵扣功能。'
    }, {
      expanded: false,
      id: '6.4',
      question: '6.4 为什么找不到通行记录？',
      answer: '您可在实际发生通行费用后的第10个自然日起（遇法定 节假日顺延），在票根上申请开具消费发票；如超过10 个自然日仍未找到通行记录，请登陆票根官网或APP联系在线客服处理。'
    }, {
      expanded: false,
      id: '6.5',
      question: '6.5 为什么找不到充值记录？',
      answer: '您可在实际充值后24小时后，在票根上申请开具充值发 票；如超过24小时仍未找到充值记录，请登录票根官网或APP联系在线客服处理。'
    }, {
      expanded: false,
      id: '6.6',
      question: '6.6 可以选择多条行程记录批量开票吗？',
      answer: '-您可选择同一月份的多条交易进行批量开票；\n-如需查询不同月份的行程记录，请点击页面“年-月”处，选择切换月份。'
    }, {
      expanded: false,
      id: '6.7',
      question: '6.7 可以选择多条充值记录批量开票吗？',
      answer: '-您可选择同一月份的多条充值记录批量开票，需注意所选开票记录合计金额不能大于“可开票金额”。多个月份的多条交易进行批量开票。'
    }, {
      expanded: false,
      id: '6.8',
      question: '6.8 为什么开出来多张发票？',
      answer: '我国高速公路有经营性和还货性两种，消费发票是由您通行路段的道路业主开具。如果您的通行路段是同一道路业主，且税号、所选交易商品编码相同，是可以进行合并开票的。如果您的通行路段涉及不同道路业主或不同道路性质，就会产生多张发票。'
    }, {
      expanded: false,
      id: '6.9',
      question: '6.9 什么是可开票金额？',
      answer: '可开票金额是ETC储值卡可以在票根上开具发票的额度， 充值后可开票金额会相应增加相应的充值金额；开具消费或充值发票后可开票金额会根据发票金额做相应扣减。'
    }, {
      expanded: false,
      id: '6.10',
      question: '6.10 ETC卡内余额不足转现金缴费的交易可以开发票吗？',
      answer: '您在收费站使用现金，且在现场没有领取纸质票据，经营管理单位会在10个自然日起（遇法定节假日顺延）上传至发票服务平台，您可以登录平台开具相应消费发票，且此笔记录不会扣减您的可开票金额。'
    }, {
      expanded: false,
      id: '6.11',
      question: '6.11 如何查看电子发票？',
      answer: '开票完成后，您可以在票根小程序-我的发票中进行查看；也可在支付宝卡包和发票管家中查看。'
    }, {
      expanded: false,
      id: '6.12',
      question: '6.12 提示“税务信息变更无法开票”怎么办？',
      answer: '如开票时提示“因道路业主税务信息变更，暂时无法开 票，预计**月**日左右恢复开票。”超过**月**日仍无法开票，请您按提示时间登陆票根进行发票开具。'
    }, {
      expanded: false,
      id: '6.13',
      question: '6.13 提示“票量不足无法开票”怎么办？',
      answer: '如开票时提示“因道路业主票量不足，暂时无法开票，预 计**月**日左右恢复开票。”超过**月**日仍无法开票，请您按提示时间登陆票根进行发票开具。'
    }, {
      expanded: false,
      id: '6.14',
      question: '6.14 提示“未及时报税无法开票”怎么办？',
      answer: '如开票时提示“因道路业主未及时报税，暂时无法开票， 预计**月**日左右恢复开票。”超过**月**日仍无法开 票，请您按提示时间登陆票根进行发票开具。'
    }]
  },
  {
    name: "7.开票记录", content: [{
      expanded: false,
      id: '7.1',
      question: '7.1 开票申请一直处于“开票中”怎么办？',
      answer: '若您的开票申请在提交24小时后仍处于“开票中”状态，请您登陆票根网或APP联系在线客服处理。'
    }, {
      expanded: false,
      id: '7.2',
      question: '7.2 显示“开票完成“，但收不到电子发票怎么办？',
      answer: '-请先尝试检查邮件垃圾箱，是否有电子发票邮件；\n-如果在邮箱、支付宝卡包、支付宝电子发票管家和票根小程序中仍无法找到电子发票，请您登陆票根网或APP联系在线客服处理。'
    }, {
      expanded: false,
      id: '7.3',
      question: '7.3 如何下载电子发票？',
      answer: '您可通过邮件、支付宝卡包、支付宝发票管家或在小程序内下载电子发票，其中在小程序内下载电子发票请按照如下操作：\n1.	在“开票详情”页面点击【查看全部电子发票】按钮；\n2.	在“查看电子发票”页面点击【预览电子发票】按钮；\n3.	长按发票进行保存。'
    }, {
      expanded: false,
      id: '7.4',
      question: '7.4 自行打印的电子发票是否有效？',
      answer: '目前国税政策规定，自行打印的电子发票与纸质发票具有同等法律效力。'
    }, {
      expanded: false,
      id: '7.5',
      question: '7.5 如何判断电子发票是否可抵税？',
      answer: '充值发票：不具备抵扣功能；\n消费发票：如果通行经营性公路，开具的消费发票左上角带有“通行费”字样，发票抬头信息填写完整、无误，具备抵扣 功能；如果通行还货性公路，开具的消费发票左上角 无“通行费”字样，就不具备抵扣功能。'
    }, {
      expanded: false,
      id: '7.6',
      question: '7.6 车辆类型或车牌号码与实际不符怎么办？',
      answer: '-车辆类型或车牌号码错误，建议您到ETC发行网点核实车辆信息并更正，在正确车辆信息上传后，再登录发票服务平台开具发票；\n-已开具的发票票面上显示的车辆类型或车牌号码有误，建议您到ETC发行网点核实车辆信息并更正，在正确车辆信息上传后，您可在“票根”网站（www.txffp.com)或下载票根APP进行【申请红冲】操作，再开具对应的发票。如在处理过程中遇到问题，请您联系在线客服处理。'
    },{
      expanded: false,
      id: '7.7',
      question: '7.7 开票信息有误怎么办？',
      answer: '-若您开票信息有误，可在“票根“网站或下载票根APP进行【换票】处理；如需退票，可直接进行【红冲】申请。'
    }]
  },
  {
    name: "8.卡片管理", content: [{
      expanded: false,
      id: '8.1',
      question: '8.1 可以解绑卡片吗？',
      answer: '可以，您可按单卡逐张解绑卡片。'
    }, {
      expanded: false,
      id: '8.2',
      question: '8.2 卡片怎么突然不见了？',
      answer: '如卡片变更过相关信息（证件类型、证件号码、手机号码 等）或被其他用户绑定成功，该卡片将自动解绑；如重新绑定，需重新验证信息。'
    }, {
      expanded: false,
      id: '8.3',
      question: '8.3 可以更换卡片关联的抬头吗？',
      answer: '可以。请注意，更换卡片关联抬头之前产生的交易，仍按照原抬头开具；更换卡片关联抬头之后产生的交易，按照变更后的抬头开具。'
    }, {
      expanded: false,
      id: '8.4',
      question: '8.4 卡片类型与实际不符怎么办？',
      answer: '建议您联系发行方核实或更改ETC卡片类型等信息。'
    }]
  },
  {
    name: "9.抬头管理", content: [{
      expanded: false,
      id: '9.1',
      question: '9.1 可以删除某个抬头吗？',
      answer: '-如该抬头未与任意ETC卡关联，则可删除；\n-如该抬头存在已关联的ETC卡，则只有先解除该抬头与卡片的关联关系后才可删除该抬头；\n-如要解除当前抬头与ETC卡的关联关系，请将ETC卡与 其他抬头关联。'
    }, {
      expanded: false,
      id: '9.2',
      question: '9.2 可以修改企业发票抬头的税号吗？',
      answer: '-不可以，为防止误改税号，企业类型的发票抬头一旦保 存，税号(纳税人识别号)将不可更改；\n-如企业税号确实产生变动，请新建一个抬头后将卡片与新抬头重新关联。'
    }]
  },
  {
    name: "10.其他", content: [{
      expanded: false,
      id: '10.1',
      question: '10.1 如何变更卡片预留信息？',
      answer: '建议您联系发行方变更卡片预留信息。'
    }, {
      expanded: false,
      id: '10.2',
      question: '10.2 ETC发行方联系方式',
      answer: '北京：010-96011;天津：4007554007;河北：0311- 96122转ETC;山西：0351-7337793;内蒙古： 0471-12122;辽宁：024-96199;吉林：0431- 12122;黑龙江：0451-96369;上海：021-12319; 江苏：025-96777;浙江：0571-88891122;安徽： 0551-96369;福建：0591-12122;江西：0791- 86130100;山东：0531-96669;河南：0371- 12328;湖北：027-96576;湖南：0731- 12328/96528;广东：020-96533;广西：0771- 96333转2;重庆：023-12122;四川：028-12122; 贵州：0851-12328;云南：0871-64611156/0871- 12328;陝西：029-12122;甘肃：0931-12328;青 海：0971-6231000;宁夏：0951-12328;新疆： 0991-12328'
    }, {
      expanded: false,
      id: '10.3',
      question: '10.3 停车场消费可以在票根上开票吗？',
      answer: '目前发票服务平台只支持全国收费公路通行费增值税普通 电子发票的开具，如您需要停车费用等ETC拓展应用的发票，建议您联系所属发行方或收费单位开具。'
    }, {
      expanded: false,
      id: '10.4',
      question: '10.4 通行费发票如何抵扣？',
      answer: '-国税办〔2017〕66号文件明确规定：\n增值税一般纳税人取得符合规定的通行费电子发票后，应 当自开具之日起360日内登录本省（区、市）增值税发票 选择确认平台、查询、选择用于申报抵扣的通行费电子发票信息；\n-按照有关规定不使用网络办税的特定纳税人，可以持税控设备前往主管国税机关办税服务厅，由税务机关工作人 员通过增值税发票选择确认平台（税务局端）为其办理通行费电子发票选择确认；\n-【温馨提示】如有疑问，具体可拨打纳税服务热线 12366咨询。'
    }, {
      expanded: false,
      id: '10.5',
      question: '10.5 如何查验通行费增值税电子普通发票真伪？',
      answer: '-取得通行费增值税电子发票普通发票的单位和个人，最快可于开票次日登陆“全国增值税发票查验平台”（https://inv-veri.chinatax.gov.cn）进行查验；\n-查验时效为最近1年内的增值税发票，详情可拨打纳税服务热线12366咨询。'
    }]
  }
    ]
  },
  onLoad() {},
  handleTitleTap(e) {
    const { index, status } = e.target.dataset;
    console.log(e.target.dataset)
    let indexArr = index.split('.') 
    this.data.items[indexArr[0]-1].content[indexArr[1]-1].expanded = !status
    this.setData({
      items :{...this.data.items}
    });
  },
});
