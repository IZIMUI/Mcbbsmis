class MainActivity {
	constructor (Name) {
		let ModuleLists = new Object;
		if (Object ['prototype'] ['toString'] ['call'] (Name) === '[object String]') {
			global [Import ['Refactor'] (Name)] = require (Name);
			ModuleLists [Import ['Refactor'] (Name)] = require (Name);
		} else if (Object ['prototype'] ['toString'] ['call'] (Name) === '[object Array]') {
			Name ['forEach'] (Value => {
				global [Import ['Refactor'] (Value)] = require (Value);
			});
			Name ['forEach'] (Value => {
				ModuleLists [Import ['Refactor'] (Value)] = require (Value);
			});
		};
		return ModuleLists;
	};
	
	static Refactor (Name) {
		let NewName = new Array;
		if (new RegExp ('-', 'img') ['test'] (Name)) Name ['split'] ('-') ['forEach'] (Value => NewName ['push'] (Value ['split'] ('') [0]));
		else if (new RegExp ('_', 'img') ['test'] (Name)) Name ['split'] ('_') ['forEach'] (Value => NewName ['push'] (Value ['split'] ('') [0]));
		else Name ['split'] ('') ['forEach'] (Value => NewName ['push'] (Value));
		NewName ['unshift'] (NewName ['shift'] () ['toUpperCase'] ());
		return NewName ['join'] ('');
	};
};

module ['exports'] = MainActivity;