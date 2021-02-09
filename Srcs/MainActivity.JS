//設定嚴格模式
'use strict';

//基模塊
const Fs = require ('fs');
const Os = require ('os');
const Ws = require ('ws');
const Ini = require ('ini');
const Http = require ('http');
const Path = require ('path');
const Querystring = require ('querystring');
const {LiveTCP} = require ('bilibili-live-ws');

const Bg = require (Path ['join'] (Path ['resolve'] (), 'Mcbbsmis/Plugins/BuildingGenerator/MainActivity.JS'));
const Lottery = require (Path ['join'] (Path ['resolve'] (), 'Mcbbsmis/Plugins/Lottery/MainActivity.JS'));
const Tte = new require (Path ['join'] (Path ['resolve'] (), 'Mcbbsmis/Plugins/TimerTriggerEvent/MainActivity.JS'));

//基對象定義
const ReadConfig = FileName => JSON ['parse'] (new String (Fs ['readFileSync'] (Path ['join'] (Path ['resolve'] (), 'Mcbbsmis/Configs/', `${FileName}.JSON`))));
const ServiceConfig = Ini ['parse'] (new String (Fs ['readFileSync'] (Path ['join'] (Path ['resolve'] (), 'Mcbbsmis/Configs/ServiceConfig.INI'))));
const UserLists = JSON ['parse'] (new String (Fs ['readFileSync'] (Path ['join'] (Path ['resolve'] (), 'Mcbbsmis/Configs/UserLists.JSON'))));

var MonitorLock = false;
var WebSocket = null;

//進一步設置配置信息,如有值? 用有值: 則用默認值
const Configuration = new Object ({
    "Minecraft": {
        "XboxID": ServiceConfig ['Minecraft'] ['XboxID'] || null
    },
    "WebSocket": {
        "Host": ServiceConfig ['WebSocket'] ['Host'] || Os ['networkInterfaces'] () ['wlan0'] [0] ['address'],
        "Port": ServiceConfig ['WebSocket'] ['Port'] || 9329
    },
    "BiliBili": {
        "RoomID": ServiceConfig ['BiliBili'] ['RoomID'] || 9329583,
        "Csrf": ServiceConfig ['BiliBili'] ['Csrf'] || null,
        "User-Agent": ServiceConfig ['BiliBili'] ['User-Agent'] || null,
        "Cookie": ServiceConfig ['BiliBili'] ['Cookie'] || null,
        "RandomEvent": JSON ['parse'] (new Boolean (ServiceConfig ['BiliBili'] ['RandomEvent'] ['toLowerCase'] ())) || false,
        "GiftName": ServiceConfig ['BiliBili'] ['GiftName'] ['split'] ('#') || new Array ("小心心", "辣条", "吃瓜", "冰阔落"),
        "GiftQuantity": new Number (ServiceConfig ['BiliBili'] ['GiftQuantity']) || 1
    }
});

//向遊戲客戶端發送訂閱事件函數
function Subscribe (Socket, EventArray) {
    EventArray ['forEach'] (Event => Socket ['send'] (JSON ['stringify'] (new Object ({
        "header": {
            "messagePurpose": "subscribe",
            "messageType": "commandRequest",
            "requestId": "b6b6489b-14d5-4869-9da2-ad306932856b",
            "version": 1
        },
        "body": {
            "eventName": Event
        }
    }))))
};

//發送消息至遊戲客戶端聊天欄
function SendMTM (Message) {
    WebSocket ['send'] (JSON ['stringify'] (new Object ({
        "header":{
            "messagePurpose": "commandRequest",
            "messageType": "commandRequest",
            "requestId":"18237b44-a2af-43c6-bd8c-f52b50a84a56",
            "version": 1
        },
        "body": {
            "origin": {
                "type": "player"
            },
            "commandLine": `say §o§l${Message}`,
            "version": 1
        }
    })))
};

//發送命令至遊戲客戶端
function SendCMD (Command) {
    WebSocket ['send'] (JSON ['stringify'] (new Object ({
        "header":{
            "messagePurpose": "commandRequest",
            "messageType": "commandRequest",
            "requestId":"5b3cf4f4-8b05-440f-9290-0b8350a76b31",
            "version": 1
        },
        "body": {
            "origin": {
                "type": "player"
            },
            "commandLine": Command,
            "version": 1
        }
    })))
};

//獲取隨機禮品
function GetLottery (Name) {
    new Lottery (ReadConfig (Name)) ['then'] (async Resource => {
        SendMTM (`§b(§3Mcbbsmis§b) §9Lottery §5恭喜 §b[§c${Configuration ['Minecraft'] ['XboxID']}§b] §5在 §6${Resource ['Title']} §5禮品中獲得 §6${Resource ['Data'] ['Quantity']} §5個 §6${Resource ['Data'] ['Title']}`);
        SendCMD (`Give ${Configuration ['Minecraft'] ['XboxID']} ${Resource ['Data'] ['Id']} ${Resource ['Data'] ['Quantity']}`)
    });
}

//匹配礼物名称
function GiftName (Name) {
	for (let Value = 0; Value < Configuration ['BiliBili'] ['GiftName'] ['length']; Value ++)
	if (Configuration ['BiliBili'] ['GiftName'] [Value] === Name)
	return true;
	return false;
};

//添加
function Add (UserName, Key) {
    UserLists [Key] ['push'] (UserName);
    Fs ['writeFile'] (Path ['join'] (Path ['resolve'] (), 'Mcbbsmis/Configs/UserLists.JSON'), JSON ['stringify'] (UserLists), () => null);
};

//刪除
function Delete (UserName, Key) {
    let Point = UserLists [Key] ['indexOf'] (UserName);
    if (Point > -1)
    UserLists [Key] ['splice'] (Point, 1);
    Fs ['writeFile'] (Path ['join'] (Path ['resolve'] (), 'Mcbbsmis/Configs/UserLists.JSON'), JSON ['stringify'] (UserLists), () => null)
};

//判斷用戶是否存在
function JudgeUsersExist (UserName, Rc) {
    if (UserName !== undefined)
    for (let Value = 0; Value < Rc ['length']; Value ++)
    if (UserName ['toUpperCase'] () === Rc [Value] ['toUpperCase'] ())
    return true;
    return false
};

//更新彈幕黑名單
function UpdateBlacklists (UserName, Mode) {
    switch (Mode) {
        case 'Add':
            Add (UserName,'Blacklists');
        break;
        
        case 'Delete':
            Delete (UserName, 'Blacklists');
        break
    }
};

//更新關鍵詞使用者
function UpdateKeywordUsers (UserName, Mode) {
    switch (Mode) {
        case 'Add':
            Add (UserName, 'KeywordUsers');
        break;
            
        case 'Delete':
            Delete (UserName, 'KeywordUsers');
        break
    }
};

//驗證返回數據是否為玩家消息
function Verify (Data) {
    if (Data ['body'] ['eventName'] === 'PlayerMessage')
    if (Data ['body'] ['properties'] ['MessageType'] === 'chat')
    if (Data ['body'] ['properties'] ['Sender'] === Configuration ['Minecraft'] ['XboxID'])
    return true;
    return false
};

//判斷用戶是否有發送命令的權限
function VerifyUsers (UserName) {
    let Users = UserLists ['KeywordUsers'];
    for (let Value = 0; Value < Users ['length']; Value ++)
    if (UserName ['toUpperCase'] () === Users [Value] ['toUpperCase'] ())
    return true;
    return false
};

//將玩家聊天消息發送至直播間函數
function SendToBL (Message, Rcs) {
    //消息進行編碼
    let EncodeMessage =  Querystring ['encode'] (new Object ({
        "color": 16777215,
        "fontsize":25,
        "mode": 1,
        "msg": Message,
        "rnd": new Date () ['getTime'] (),
        "roomid": Configuration ['BiliBili'] ['RoomID'],
        "bubble": 0,
        "csrf_token": Configuration ['BiliBili'] ['Csrf'],
        "csrf": Configuration ['BiliBili'] ['Csrf']
        }));
    //設定請求配置
    let RequestConfiguration = new Object ({
        "protocol": "http:",
        "host": "api.live.bilibili.com",
        "port": 80,
        "path": "/msg/send",
        "method": "POST",
        "headers": {
            "Host": "api.live.bilibili.com",
            "content-length": EncodeMessage? EncodeMessage ['length']: 0,
            "accept": "application/json, text/javascript, *; q=0.01",
            "dnt": 1,
            "user-agent": Configuration ['BiliBili'] ['User-Agent'],
            "content-type": "application/x-www-form-urlencoded; charset\u003dUTF-8",
            "origin": "https://live.bilibili.com",
            "sec-fetch-site": "same-site",
            "sec-fetch-mode": "cors",
            "sec-fetch-dest": "empty",
            "referer": "https://live.bilibili.com/",
            "accept-encoding": "gzip, deflate, br",
            "accept-language": "ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7,zh-TW;q=0.6,zh;q=0.5",
            "Cookie": Configuration ['BiliBili'] ['Cookie']
        }});
    //開始請求直播間
    let Request = Http ['request'] (RequestConfiguration, Socket => {
    Socket ['on'] ('data', Message => {
        let Status = JSON ['parse'] (Message);
        if (Rcs)
        if (Status ['code'] === 0 && Status ['message'] === '')
        SendMTM ('§b(§3Mcbbsmis§b) §9Status §a發送成功');
        else if (Status ['code'] === 0 && Status ['message'] === '非法内容')
        SendMTM ('§b(§3Mcbbsmis§b) §9Status §4非法內容');
        else
        SendMTM (`§b(§3Mcbbsmis§b) §9Status §4${JSON ['stringify'] (Status)}`)
    })
}
);
    //開始寫入消息
    Request ['write'] (EncodeMessage? EncodeMessage: null);
    //消息寫入完成
    Request ['end'] ()
};

//監聽直播間彈幕消息函數
function Monitor (RoomID) {
    const Live = new LiveTCP (RoomID);
    //觀眾進入監聽
    Live ['on'] ('WELCOME', Message => {
    	SendMTM (`§b(§3Mcbbsmis§b) §9Welcome §5熱烈歡迎 §b[§c${Message ['data'] ['uname']}§b] §5進入了直播間`);
    });
    
    //彈幕監聽
    Live ['on'] ('DANMU_MSG', Message => {
        let User = Message ['info'] [2];
        let ParseMessage = Message ['info'] [1] ['split'] ('M-Keyword:');
        if (ParseMessage [0] === '$')
        if (VerifyUsers (User [1])) {
          for (let Key in UserLists ['Keywords'])
          if (ParseMessage [1] === Key)
            SendCMD (UserLists ['Keywords'] [Key]);
        } else
        SendToBL ('对不起，您沒有使用關鍵詞的權限', false);
        if (!JudgeUsersExist (User [1], UserLists ['Blacklists']))
        SendMTM (`§b(§3Mcbbsmis§b) §9Barrage §b[§c${User [1]}§b]§d: §6${Message ['info'] [1] ['replace'] (new RegExp ('@a|@e|@s|@r', 'img'), '')}`);
    });
    
    //禮物監聽
    Live ['on'] ('SEND_GIFT', Message => {
    	SendMTM (`§b(§3Mcbbsmis§b) §9Gift §b[§c${Message ['data'] ['uname']}§b]§d: §6${Message ['data'] ['action']}了 §b${Message ['data'] ['giftName']} §6* §a${Message ['data'] ['num']}`);
   
   
    	if (Configuration ['BiliBili'] ['RandomEvent'])
    	if (GiftName (Message ['data'] ['giftName']) && new Number (Message ['data'] ['num']) >= Configuration ['BiliBili'] ['GiftQuantity']) {
    		let RandomEvent = UserLists ['RandomEvents'] [Math ['floor'] (Math ['random'] () * UserLists ['RandomEvents'] ['length'])];
    	let RandomNumber = Math ['floor'] (Math ['random'] () * 255);
    	SendMTM  (`§b(§3Mcbbsmis§b) §9RandomEvents §b[§c${Message ['data'] ['uname']}§b]§d: §6因投喂 [§b${Message ['data'] ['giftName']} §6* §a${Message ['data'] ['num']}§6] 礼物触发事件为 §c[${RandomEvent ['Tips'] ['replace'] (new RegExp ('Number:Random', 'img'), RandomNumber) ['replace'] (new RegExp ('Number:Gift', 'img'), Message ['data'] ['num'] < 25? Message ['data'] ['num'] * 10: 255)}]`);
    	SendCMD (RandomEvent ['Command'] ['replace'] ('Player:XboxID', Configuration ['Minecraft'] ['XboxID']) ['replace'] (new RegExp ('Number:Random', 'img'), RandomNumber) ['replace'] (new RegExp ('Number:Gift', 'img'), Message ['data'] ['num'] < 25? Message ['data'] ['num'] * 10: 255));
    	};
    });
    SendMTM ('§b(§3Mcbbsmis§b) §9Status §a連接成功 正在監聽直播間彈幕');
};

//開啟WebSocket服務器
new Ws ['Server'] (new Object ({
    "host": Configuration ['WebSocket'] ['Host'],
    "port": Configuration ['WebSocket'] ['Port']
})) ['on'] ('connection', Socket => {
    //設置全局
    WebSocket = Socket;
    if (!MonitorLock) {
    //監聽直播間彈幕消息
    Monitor (JSON ['parse'] (new Number (Configuration ['BiliBili'] ['RoomID'])));
    MonitorLock = true
    } else
    SendMTM ('§b(§3Mcbbsmis§b) §9Status §a連接成功 正在監聽直播間彈幕');
    //向遊戲客戶端發送請求訂閱事件
    Subscribe (Socket, ['PlayerMessage']);
    //監聽玩家聊天欄消息數據並返回消息進行語句判斷
    Socket ['on'] ('message', Data => {
        try {
            let ParseData = JSON ['parse'] (new String (Data));
            if (Verify (ParseData)) {
                //解析消息
                let ParseMessage = ParseData ['body'] ['properties'] ['Message'] ['split'] ('B-Send:');
                let ParseConfigs = ParseData ['body'] ['properties'] ['Message'] ['split'] ('B-Config:');
                let ParsePlugin = ParseData ['body'] ['properties'] ['Message'] ['split'] ('O-Plugin:');
                //判斷命令前綴
                if (ParseMessage [0] === '$')
                //將玩家聊天消息發送至BiliBili直播間
                SendToBL (ParseMessage [1], true)
                if (ParseConfigs [0] === '$') {
                    let ParseConfigM = ParseConfigs [1] ['split'] (' ');
                    switch (ParseConfigM [0]) {
                        case 'Blacklists':
                            switch (ParseConfigM [1]) {
                                case 'Add':
                                    if (JudgeUsersExist (ParseConfigM [2], UserLists ['Blacklists']))
                                    SendMTM ('§b(§3Mcbbsmis§b) §9Status §4當前該用戶已經在黑名單列表裡');
                                    else {
                                    UpdateBlacklists (ParseConfigM [2], 'Add');
                                    SendMTM ('§b(§3Mcbbsmis§b) §9Status §a已添加當前該用戶為黑名單')
                                    }
                                break;
                                    
                                case 'Delete':
                                    if (!JudgeUsersExist (ParseConfigM [2], UserLists ['Blacklists']))
                                    SendMTM ('§b(§3Mcbbsmis§b) §9Status §4當前該用戶不在黑名單列表裡');
                                    else {
                                    UpdateBlacklists (ParseConfigM [2], 'Delete');
                                    SendMTM ('§b(§3Mcbbsmis§b) §9Status §a已刪除當前該用戶為黑名單')
                                    }
                            };
                        break;
                        
                        case 'KeywordUsers':
                            switch (ParseConfigM [1]) {
                                case 'Add':
                                    if (JudgeUsersExist (ParseConfigM [2], UserLists ['KeywordUsers']))
                                    SendMTM ('§b(§3Mcbbsmis§b) §9Status §4當前該用戶已經是關鍵詞使用者');
                                    else {
                                    UpdateKeywordUsers (ParseConfigM [2], 'Add');
                                    SendMTM ('§b(§3Mcbbsmis§b) §9Status §a已添加當前該用戶為關鍵詞使用者')
                                    }
                                break;
                                
                                case 'Delete':
                                    if (!JudgeUsersExist (ParseConfigM [2], UserLists ['KeywordUsers']))
                                    SendMTM ('§b(§3Mcbbsmis§b) §9Status §4當前該用戶已經不是關鍵詞使用者');
                                    else {
                                    UpdateKeywordUsers (ParseConfigM [2], 'Delete');
                                    SendMTM ('§b(§3Mcbbsmis§b) §9Status §a已刪除當前該用戶為關鍵詞使用者')
                                    }
                            };
                        break;
                        
                            default:
                            SendMTM ('§b(§3Mcbbsmis§b) §9Status §4該配置屬性不存在')
                    }
                };
                if (ParsePlugin [0] === '$') {
                    let ParsePlugins = ParsePlugin [1] ['split'] (' ');
                    switch (ParsePlugins [0]) {
                        case 'Building':
                            switch (ParsePlugins [1]) {
                                case 'Local':
                                    new Bg (Socket, 'Local', ParsePlugins [2]);
                                break;
                                
                                case 'Online':
                                    new Bg (Socket, 'Online', ParsePlugins [2])
                                break;
                            };
                        break;
                        
                        case 'Lottery':
                            GetLottery ('Lottery');
                        break;
                        
                        case 'Tte':
                        	if (ParsePlugin [1] ['indexOf'] ('#')) {
                           Tte ['SetTimerListener'] (ParsePlugins [1], ParsePlugin [1] ['substring'] (ParsePlugin ['indexOf'] ('#'), ParsePlugin ['lastIndexOf'] ('#')))
                           SendMTM ('§b(§3Mcbbsmis§b) §9Status §a定時命令設置成功')
                        	}
                        else
                          SendMTM ('§b(§3Mcbbsmis§b) §9Status §4定時命令設置失敗')
                         break;
                           
                        default:
                            SendMTM ('§b(§3Mcbbsmis§b) §9Status §4該擴展插件屬性不存在')
                    }
                }
            }
        } catch (Err) {
            Fs ['writeFile'] (Path ['join'] (Path ['resolve'] (), 'Mcbbsmis/Logs/Errors/', `${new String (Math ['random'] () * 9329583).LOG}`), new String (Err))
        }
    })
});

//輸出顯示服務器主機和端口
console ['log'] (`-

這個 [ Mcbbsmis ] 服務運行在

主機: ${
    Configuration ['WebSocket'] ['Host']
}
端口: ${
    JSON ['parse'] (Configuration ['WebSocket'] ['Port'])
}

請複製這個連接命令:
/Connect ws://${Configuration ['WebSocket'] ['Host']}:${JSON ['parse'] (Configuration ['WebSocket'] ['Port'])}

-------Mcbbsmis Service-------

-`)
