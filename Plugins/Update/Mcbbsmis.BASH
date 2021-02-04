#!/bin/bash
termux-wake-lock;

Name=" Mcbbsmis Service";

InstallNode () {
	echo "正在安裝NodeJS環境,請稍等...";
	pkg update;
	pkg upgrade;
	pkg install vim -y
	pkg install nodejs -y;
	echo "NodeJS環境已安裝完畢";
	sleep 1;
	MainActivity;
};

Announcement () {
	echo;
	echo "	項目名稱: $Name懶人安裝腳本"
	echo "	項目作者: lZiMUl";
	echo "	項目版本: 最新版";
	echo "	BiliBili: lZiMUl";
	echo "	QQ: 2908554069";
	echo "	Npm: https://www.npmjs.com/package/mcbbsmis";
	echo "	Github: https://github.com/IZIMUI/Mcbbsmis";
	echo;
	sleep 1;
	MainActivity;
};

Run () {
	cd /storage/emulated/0;
	if [ -d "./Mcbbsmis" ]; then
	node Mcbbsmis;
	echo "$Name無法運行，請設定配置文件"
	sleep 1;
	MainActivity;
	else
	echo "請先安裝$Name,無法運行"
	sleep 1;
	MainActivity;
	fi
};

Config () {
	cd /storage/emulated/0;
	if [ -f "./Mcbbsmis/Configs/ServiceConfig.INI" ]; then
		echo;
		echo "編輯模式 => 輸入 [i] 即可";
		echo "保存退出 => 點擊 [ESC] 並輸入 [:wq] 即可";
		read -p "是否知曉 (是 或 否): " Choice;
		case "$Choice" in
		"是")
			vim ./Mcbbsmis/Configs/ServiceConfig.INI;
			sleep 1;
			MainActivity;;
		"否")
			sleep 1;
			MainActivity;;
		*) echo "您在說什麼啊";
			sleep 1;
			MainActivity;;
		esac
	else
		echo "請先安裝$Name,無法設定";
		sleep 1;
		MainActivity;
	fi;
};

Install () {
	cd /storage/emulated/0;
	if [ -d "./Mcbbsmis" ]; then
		echo "當前$Name已安裝,無法安裝";
		sleep 1;
		MainActivity;
	else
		echo "正在安裝,請稍等...";
		git clone https://github.com/lZiMUl/Mcbbsmis.git
		echo "$Name安裝完畢";
		sleep 1;
		MainActivity;
fi
};

Uninstall () {
	cd /storage/emulated/0;
	if [ -d "./Mcbbsmis" ]; then
		read -p "您確定要刪除我嗎 (是 或 否): " Choice;
		case "$Choice" in
			"是")
			rm -rf ./Mcbbsmis;
			echo "謝謝您的下載並使用$Name,我會想您的 (揮手哭哭)";
			sleep 1;
			MainActivity;;
			"否")
			echo "謝謝您收留我";
			sleep 1;
			MainActivity;;
			*) echo "你在說什麼啊";
				sleep 1;
				MainActivity;;
		esac
	else
	echo "您還沒有下載$Name,無法卸載";
	sleep 1;
	MainActivity;
	fi
};

Update () {
		cd /storage/emulated/0;
	if [ -d "./Mcbbsmis" ]; then
		echo "正在更新$Name,請稍等...";
		mv ./Mcbbsmis/Configs ./Configs;
		rm -rf ./Mcbbsmis;
		git clone https://github.com/lZiMUl/Mcbbsmis.git
		mv ./Configs ./Mcbbsmis/Configs;
		echo "$Name更新完畢";
		sleep 1;
		MainActivity;
	else
		echo "您還沒有下載$Name,無法更新";
		sleep 1;
		MainActivity;
	fi
};

MainActivity () {
echo;
echo "----------------- Mcbbsmis Service -----------------";
echo;
echo "	| 1 | => | 安裝NodeJS環境 (如已安裝請忽略) |"
echo "	| 2 | => | 公告$Name |"
echo "	| 3 | => | 運行$Name |";
echo "	| 4 | => | 設定$Name |";
echo "	| 5 | => | 安裝$Name |";
echo "	| 6 | => | 卸載$Name |";
echo "	| 7 | => | 更新$Name |";
echo "	| 8 | => | 退出$Name |";
echo;
echo "----------------- Mcbbsmis Service -----------------";
echo;

	read -p "請輸入功能序號: " Choice;
	case "$Choice" in
		1) InstallNode;;
		2) Announcement;;
		3) Run;;
		4) Config;;
		5) Install;;
		6) Uninstall;;
		7) Update;;
		8) echo "感謝使用$Name";;
		*) echo "請輸入正確的序號!!!"; MainActivity;;
	esac
};

MainActivity;