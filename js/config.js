////////////////////////////////////////////////////////////////////////////////
// - heartbeatInterval should be set to the same as your (client) GSI config
// - websocketUrl should be set to the address & port your GSI server is hosted
////////////////////////////////////////////////////////////////////////////////
const debugMode = false;
const heartbeatInterval = 30;
const wsUrl = "ws://localhost:4001/";
const apiUrl = "http://kztimerglobal.com/api/v1.0";

const validMaps = [ "kz", "xc", "bkz", "skz", "vnl", "kzpro" ];

const mappings =
{
	"MAP_NAME":
	{
		"*": "{value}"
	},
	"MAP_MODE":
	{
		"*": "({value})",
		"-1": ""
	},
	"MAP_TIER":
	{
		"-1": "",
		"*": "(T{value})"
	},
	"MAP_STATUS":
	{
		"*": "",
		"0": "*",
	},
	"WR_TP_TIME":
	{
		"*": "{value}",
		"-1": ""
	},
	"WR_PRO_TIME":
	{
		"*": "{value}",
		"-1": ""
	},
	"PB_TP_TIME":
	{
		"*": "({value})",
		"-1": "",
		"-2": "(No PB)",
		"-3": "(I have WR)"
	},
	"PB_PRO_TIME":
	{
		"*": "({value})",
		"-1": "",
		"-2": "(No PB)",
		"-3": "(I have WR)",
		"-3:css": "color: green"
	}
};