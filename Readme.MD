# Mcbbsmis
[項目開發者個人主頁](https://b23.tv/ymEtPO)
</Br>

## 下個版本內容
* 1.【媒體接口】
* 2.【網站接口】
* 3.【控制面板】
* 4.【App遠程控制】
* 5.【手機陀螺儀控制視角】
* 6.【公佈一些實用的API接口】
* 7.【根據現實事件改變遊戲事件】
</Br>

## 這個版本內容
### 新內容
* 1.添加了定時執行命令
* 2.添加了投喂指定数量的自定义礼物触发随机事件指令
* 3.修复了一些部分报错内容
* 4.修复了解析JSON报错问题
* 5.刪除了所有命令語句的前綴
* 6.新增了三種新的命令
</Br>

### 新命令
* 1.添加彈幕黑名單: $Config: BarrageBlacklists Add 用戶名
* 2.刪除彈幕黑名單: $Config: BarrageBlacklists Delete 用戶名
* 3.添加關鍵詞使用者: $Config: KeywordUsers Add 用戶名
* 4.刪除關鍵詞使用者: $Config: KeywordUsers Delete 用戶名
* 5.添加投餵禮物觸發事件者: $Config: GiftWhitelists Add 用戶名
* 6.刪除投餵禮物觸發事件者: $Config: GiftWhitelists Delete 用戶名
* 7.開啟投餵禮物觸發隨機事件狀態: $Config: GiftStatus (True & False)
* 8.添加投餵禮物觸發因素: $Config: GiftGroup Add GiftName
* 9.刪除投餵禮物觸發因素: $Config: GiftGroup Delete GiftName
* 10.設定投餵禮物觸發數量: GiftQuantity Value
* 11.發送關鍵詞命令: $Keyword:關鍵詞
* 12.建築物本地生成命令: $Plugin: Building Local 建築物文件名
* 13.建築物網絡生成命令: $Plugin: Building Online 建築物文件鏈接
* 14.禮品袋隨機抽獎命令: $Plugin: Lottery
* 15.定時器命令: $Plugin: Tte Time Commands
</Br>

### 基本命令
* 1.發送彈幕命令: $Send: 消息
* 2.設定配置命令: $Config: 選項
* 3.關鍵詞語命令: $Keyword: 關鍵詞
* 4.公開插件命令: $Plugin: 選項
</Br>

## 項目目錄結構
* Mcbbsmis
    * Configs
        * Lottery.JSON
        * Interactives.JSON
        * Building.JSON
        * ServiceConfig.INI
    * Logs
        * Successs
        * Errors
    * Plugins
        * BuildingGenerator
            * MainActivity.JS
        * Lottery
            * MainActivity.JS
    * Srcs
        * MainActivity.JS
    * License
    * Package.JSON
    * Package-Lock.JSON
    * Readme.MD
</Br>

### 使用教程
* 1.打開設備文件管理器找到 [Mcbbsmis] 項目文件夾並進入 [Configs] 配置文件夾。
* 2.配置 [ServiceConfig.INI] 服務屬性值 ([配置教學傳送門](https://b23.tv/ymEtPO) 私聊我即可)。
* 3.終端輸入 [node Mcbbsmis] 複製輸出消息 [請複製這個連接命令:] 下面的連接命令。
* 4.進入 [Minecraft] 進入存檔 (前提: 必須打開作弊功能) 打開聊天欄粘貼連接命令回車。
* 5.輸入發送彈幕命令 [$Send:消息]。
* 6.打開BiliBili並進入您的直播間查看彈幕即可。
* 7.如有錯誤，請在Github上提出問題即可 [報告問題傳送門](https://github.com/lZiMUl/Mcbbsmis/issues)。
* 8.教程完畢。
</Br>

## 特別鳴謝測試人員名單
* 1.[骥哥Jige](https://b23.tv/lPZ0gr)
* 2.[教科书式帕琪](https://b23.tv/rTsY3K)
* 3.[-星陌雪-](https://b23.tv/t7T9y9)
#### 期待您的加入測試
</Br>
