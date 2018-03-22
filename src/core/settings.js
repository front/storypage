const dateSettings = { 
	"l10n":{
		"locale":"pt_PT",
		"months":["Janeiro","Fevereiro","Mar\u00e7o","Abril","Maio","Junho","Julho","Agosto","Setembro","Outubro","Novembro","Dezembro"],
		"monthsShort":["Jan","Fev","Mar","Abr","Mai","Jun","Jul","Ago","Set","Out","Nov","Dez"],
		"weekdays":["Domingo","Segunda-feira","Ter\u00e7a-feira","Quarta-feira","Quinta-feira","Sexta-feira","S\u00e1bado"],
		"weekdaysShort":["Dom","Seg","Ter","Qua","Qui","Sex","S\u00e1b"],
		"meridiem":{"am":"am","pm":"pm","AM":"AM","PM":"PM"},
		"relative":{"future":"Daqui a %s","past":"h\u00e1 %s"}
	},
	"formats":{"time":"G:i","date":"j F, Y","datetime":"j F, Y G:i"},
	"timezone":{"offset":"0","string":""}
};

const userSettings = {
	// url: '',
	uid: '1',
	// time: '1519058898',
	// secure: ''
};

const editorL10n = {
	tinymce: {
		baseUrl: 'node_modules/tinymce',
		settings: {
			external_plugins: [],
			plugins: "charmap,colorpicker,hr,lists,media,paste,tabfocus,textcolor,fullscreen,wordpress,wpautoresize,wpeditimage,wpemoji,wpgallery,wplink,wpdialogs,wptextpattern,wpview",
			toolbar1: "formatselect,bold,italic,bullist,numlist,blockquote,alignleft,aligncenter,alignright,link,unlink,wp_more,spellchecker,kitchensink",
			toolbar2: "strikethrough,hr,forecolor,pastetext,removeformat,charmap,outdent,indent,undo,redo,wp_help",
			toolbar3: "",
			toolbar4: "",
		},
		suffix: '.min'
	}
};

export { 
	dateSettings, 
	userSettings,
	editorL10n,
};
