# Mcbbsmis
[我的BiliBili](https://space.bilibili.com/291883246)
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
</Br>

### 新命令
* 1.添加彈幕黑名單: $B-Config:Blacklists Add 用戶名
* 2.刪除彈幕黑名單: $B-Config:Blacklists Delete 用戶名
* 3.添加關鍵詞使用者: $B-Config:KeywordUsers Add 用戶名
* 4.刪除關鍵詞使用者: $B-Config:KeywordUsers Delete 用戶名
* 5.發送關鍵詞命令: $M-Keyword:關鍵詞
* 6.建築物本地生成命令: $O-Plugin:Building Local 建築物文件名
* 7.建築物網絡生成命令: $O-Plugin:Building Online 建築物文件鏈接
* 8.禮品袋隨機抽獎命令: $O-Plugin:Lottery
* 9.定時命令: $O-Plugin:Tte Time Commands
</Br>

### 基本命令
* 1.發送彈幕命令: $B-Send:消息
* 2.設定用戶配置: $B-Config:選項
* 3.發送關鍵詞命令: $M-Keyword:關鍵詞
* 4.生成建築物命令: $O-Plugin:Building 選項
* 5.禮品袋抽獎命令: $O-Plugin:Lottery
* 6.定時命令: $O-Plugin:Tte Time Commands
</Br>

## 項目目錄結構
* Mcbbsmis
    * Configs
        * Lottery.JSON
        * Building.JSON
        * ServiceConfig.INI
        * UserLists.JSON
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
* 2.配置 [ServiceConfig.INI] 服務屬性值 (配置教學鏈接: [https://space.bilibili.com/291883246] 私聊我即可)。
* 3.終端輸入 [node Mcbbsmis] 複製輸出消息 [請複製這個連接命令:] 下面的連接命令。
* 4.進入 [Minecraft] 進入存檔 (前提: 必須打開作弊功能) 打開聊天欄粘貼連接命令回車。
* 5.輸入發送彈幕命令 [$B-Send:消息]。
* 6.打開BiliBili並進入您的直播間查看彈幕即可。
* 7.如有錯誤，請在Github上提出問題即可 (https://github.com/lZiMUl/Mcbbsmis/issues)。
* 8.教程完畢。
</Br>

## 特別鳴謝測試人員名單
* 1.骥哥Jige
* 2.教科书式帕琪
#### 期待您的加入測試
</Br>
