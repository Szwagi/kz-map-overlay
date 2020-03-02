////////////////////////////////////////////////////////////////////////////////
// - heartbeatInterval should be set to the same as your (client) GSI config
// - websocketUrl should be set to the address & port your GSI server is hosted
// - protocol should be set to be your authentication token, if your GSI server
//            uses one
////////////////////////////////////////////////////////////////////////////////
const debugMode = false;
const heartbeatInterval = 30;
const wsUrl = "ws://localhost:4001/";
const apiUrl = "http://kztimerglobal.com/api/v1.0";
const protocol = null;

const validMaps = [ "kz", "xc", "bkz", "skz", "vnl", "kzpro" ];

const mappings =
{
    "MAP_MODE":
    {
        "*": "({value}",
        "-1": ""
    },
    "MAP_TIER":
    {
        "-1": "",
        "*": ", T{value})"
    },
    "MAP_STATUS":
    {
        "*": "",
        "0": "- NON GLOBAL)",
    },
    "WR_TP_TIME":
    {
        "-1": ""
    },
    "WR_PRO_TIME":
    {
        "-1": ""
    },
    "PB_TP_TIME":
    {
        "*": "({value})",
        "-1": "",
        "-2": "(No PB)",
        "-3": "(WR by me)",
        "*:css": "color: #FF7F7F",
        "-2:css": "color: #B3668C",
        "-3:css": "color: #32CD32"
    },
    "PB_PRO_TIME":
    {
        "*": "({value})",
        "-1": "",
        "-2": "(No PB)",
        "-3": "(WR by me)",
        "*:css": "color: #FF7F7F",
        "-2:css": "color: #B3668C",
        "-3:css": "color: #32CD32"
    }
};
