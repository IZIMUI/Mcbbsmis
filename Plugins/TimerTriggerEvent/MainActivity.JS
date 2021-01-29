class TimerTriggerEvent {
	static EventTable = new Array;

	constructor (Info) {
		setInterval(() => {
			TimerTriggerEvent ['EventTable'] ['forEach'] ((Data,Index) => {
				let TD = new Date () ['getTime'] () - Data ['Time'] ['getTime'] ();
				if (TD >= -1 && TD <= 1) {
					Data ['Event'] (Info && Object ['prototype'] ['toString'] ['call'] (Info) === '[object Array]'? Info ['length'] !== 0? Info: new Array ('Hello TimerTriggerEvent'): new Array ('Hello TimerTriggerEvent') [Index]);
					TimerTriggerEvent ['EventTable'] ['splice'] (Index, 1)
				} else if (TD >= 1) {
					Data ['Error'] (Object ['assign'] (new Object ({
						"CurrentTime": new Date
						}), TimerTriggerEvent ['EventTable'] [Index]), '=> 時間計算錯誤');
					TimerTriggerEvent ['EventTable'] ['splice'] (Index, 1)
				}
			})
		}, true)
	};
	
	SetTimerListener (Time, Event, Err) {
		if (Time && Event && Object ['prototype'] ['toString'] ['call'] (Time) === '[object String]' && Object ['prototype'] ['toString'] ['call'] (Event) === '[object Function]' || Err? Object ['prototype'] ['toString'] ['call'] (Err) === '[object Function]': false)
		TimerTriggerEvent ['EventTable'] ['push'] (new Object ({
			"Time": new Date (Time),
			"Event": Event,
			"Error": Err || function () {}
		}))
	}
}