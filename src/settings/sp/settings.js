const apiSettings = {
	root: "http:\/\/localhost:3000\/",
	nonce: '123456789',
	versionString: "wp\/v2\/",
	cacheSchema: true,
	schema: {}
};

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
	url: '',
	uid: '1',
	time: '1519058898',
	secure: ''
};

export { 
	apiSettings, 
	dateSettings, 
	userSettings 
};
