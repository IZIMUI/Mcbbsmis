# Mcbbsmis
[![BiliBili](https://img.shields.io/badge/BiliBili-Mcbbsmis%20開發者B站-red?logo=bilibili)](https://b23.tv/ymEtPO)
[![Npm](https://img.shields.io/npm/v/mcbbsmis.svg?label=Npm&logo=npm)](https://www.npmjs.com/package/mcbbsmis)
[![Github](https://img.shields.io/github/issues/lZiMUl/Mcbbsmis?label=Issues&logo=github)](https://github.com/lZiMUl/Mcbbsmis.git)
[![Github](https://img.shields.io/github/forks/lZiMUl/Mcbbsmis?label=Forks&logo=github)](https://github.com/lZiMUl/Mcbbsmis.git)
[![Github](https://img.shields.io/github/stars/lZiMUl/Mcbbsmis?label=Stars&logo=github)](https://github.com/lZiMUl/Mcbbsmis.git)
[![Github](https://img.shields.io/github/license/lZiMUl/Mcbbsmis?label=License&logo=github)](https://github.com/lZiMUl/Mcbbsmis.git)
</Br>

## 特別鳴謝所有測試人員
* 1.[![BiliBili](https://img.shields.io/badge/BiliBili-骥翼志-red?logo=bilibili)](https://b23.tv/lPZ0gr)
* 2.[![BiliBili](https://img.shields.io/badge/BiliBili-教科书式帕琪-red?logo=bilibili)](https://b23.tv/rTsY3K)
* 3.[![BiliBili](https://img.shields.io/badge/BiliBili-星陌雪-red?logo=bilibili)](https://b23.tv/t7T9y9)
* 4.[![BiliBili](https://img.shields.io/badge/BiliBili-F小冷-red?logo=bilibili)](https://b23.tv/ukCYSs)
* 5.[![BiliBili](https://img.shields.io/badge/BiliBili-咸鸡嘎吱脆-red?logo=bilibili)](https://b23.tv/4GRJVD)
#### 期待您的加入測試
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
* 7.修復了建築物生成插件報錯問題
* 8.新增吉祥物行為命令
* 9.已將 Config & Plugin 改為 Configs & Plugins
* 10.已添加啟動自檢測更新
* 11.新增在遊戲聊天欄運行NodeJS環境
</Br>

### 新命令
* 1.添加彈幕黑名單: $Configs: BarrageBlacklists Add 用戶名
* 2.刪除彈幕黑名單: $Configs: BarrageBlacklists Delete 用戶名
* 3.添加關鍵詞使用者: $Configs: KeywordUsers Add 用戶名
* 4.刪除關鍵詞使用者: $Configs: KeywordUsers Delete 用戶名
* 5.添加投餵禮物觸發事件者: $Configs: GiftWhitelists Add 用戶名
* 6.刪除投餵禮物觸發事件者: $Configs: GiftWhitelists Delete 用戶名
* 7.開啟投餵禮物觸發隨機事件狀態: $Configs: GiftStatus (True & False)
* 8.添加投餵禮物觸發因素: $Configs: GiftGroup Add GiftName
* 9.刪除投餵禮物觸發因素: $Configs: GiftGroup Delete GiftName
* 10.設定投餵禮物觸發數量: $Configs: GiftQuantity Value
* 11.發送關鍵詞命令: $Keywords: 關鍵詞
* 12.建築物本地生成命令: $Plugins: Building Local 建築物文件名
* 13.建築物網絡生成命令: $Plugins: Building Online 建築物文件鏈接
* 14.禮品袋隨機抽獎命令: $Plugins: Lottery
* 15.定時器命令: $Plugins: Tte Time Commands (暫時失效)
* 16.創建吉祥物 Agent: $Plugins: Agent Create
* 17.設置坐標點: $Plugins: GoHome Set
* 18.傳送坐標點: $Plugins: GoHome Get
* 19.幫助: $Help
* 20.回來吉祥物 Agent: $Plugins: Agent ComeBack
* 21.音頻播放器: $Plugins: AudioMedio (Local & Online) (Path & Url) (未來命令)
* 22.視頻播放器: $Plugins: VideoMedio (Local & Online) (Path & Url) (未來命令)
* 23.點歌系統框架: $Plugins: PointSong SongName (未來命令)
* 24.新增命令 $Node: JavaScript Code
</Br>

### 基本命令
* 1.幫助助手命令: $Help 幫助
* 2.發送彈幕命令: $Send: 消息
* 3.設定配置命令: $Configs: 選項
* 4.關鍵詞語命令: $Keywords: 關鍵詞
* 5.公開插件命令: $Plugins: 選項
* 6.運行Node命令: 新增命令 $Node: JavaScript Code
</Br>

## 項目目錄結構
* Mcbbsmis
    * Configs
        * Lottery.JSON
        * Interactives.JSON
        * ServiceConfigs.INI
    * Logs
        * Successs
        * Errors
    * Srcs
        * MainActivity.JS
    * License
    * Package.JSON
    * Package-Lock.JSON
    * Readme.MD
</Br>

### 使用教程
* 1.打開設備文件管理器找到 [Mcbbsmis] 項目文件夾並進入 [Configs] 配置文件夾。
* 2.配置 [ServiceConfigs.INI] 服務屬性值 ([配置教學傳送門](https://b23.tv/ymEtPO) 私聊我即可)。
* 3.終端輸入 [termux-wake-lock && cd /storage/emulated/0/ && node Mcbbsmis] 來啟動 Mcbbsmis 服務，複製輸出消息 [請複製這個連接命令:] 下面的連接命令。
* 4.進入 [Minecraft] 進入存檔 (前提: 必須打開作弊功能) 打開聊天欄粘貼連接命令回車。
* 5.輸入發送彈幕命令 [$Send: 消息]。
* 6.打開BiliBili並進入您的直播間查看彈幕即可。
* 7.如有錯誤，請在Github上提出問題即可 [報告問題傳送門](https://github.com/lZiMUl/Mcbbsmis/issues)。
* 8.教程完畢。
</Br>
