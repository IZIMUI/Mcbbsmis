class Import {
	constructor (Name) {
		let ModuleLists = new Object;
		if (Object ['prototype'] ['toString'] ['call'] (Name) === '[object String]') {
			Import ['Refactor'] (Import ['Slice'] (Import ['Name'] (Name))) = require (Name);
			ModuleLists [Import ['Refactor'] (Import ['Slice'] (Import ['Name'] (Name)))] = require (Name);
		} else if (Object ['prototype'] ['toString'] ['call'] (Name) === '[object Array]') {
			Name ['forEach'] (Value => {
				Import ['Refactor'] (Import ['Slice'] (Import ['Name'] (Value)))= require (Value);
			});
			Name ['forEach'] (Value => {
				ModuleLists [Import ['Refactor'] (Import ['Slice'] (Import ['Name'] (Value)))] = require (Value);
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
	
	static Slice (Name) {
		if (Name ['lastIndexOf'] ('/') !== -1 && Name ['lastIndexOf'] ('.') !== -1)
		return Name ['slice'] (Name ['lastIndexOf'] ('/') + 1, Name ['lastIndexOf'] ('.'));
		return Name;
	};
	
	static Name (Name) {
		if (Name ['replace'] (new RegExp ('.', 'img'), '') ['lastIndexOf'] ('.') === -1)
		return '/' ['concat'] (Name ['concat'] ('.'));
		return Name;
	}
};

module ['exports'] = Import;