// TODO mention, that data is taken partially from caniuse.com

// RULE STRUCTURE

var ruleStructure = {
	hardware: {
		recording: {
			image: ["elem", "api"],
			audio: ["elem", "api"],
			video: ["elem", "api"]
		},
		output: {
			image: ["elem", "webgl1", "webgl2"],
			audio: ["elem", "api"],
			video: ["elem"],
			vibration: ["api"]
		},
		persistence: {
			keyvalue: ["api"],
			complex: ["idb1", "idb2"],
			filesystem: ["elem", "direct"]
		},
		communication: {
			mobile: ["telephony", "messaging"],
			internet: ["networkstatus", "requesting"],
			miscellaneous: ["gps", "bluetooth", "nfc", "usb"]
		},
		sensors: {
			motion: {
				acceleration: ["event", "api"],
				rotation: ["event", "api"]
			},
			environment: {
				light: ["event", "api"],
				magnetic: ["api"],
				proximity: ["event", "api"],
				other: ["temperature", "pressure", "humidity"]
			}
		}
	},
	software: {
		communication: ["emails", "push"],
		install: ["manifest"],
		offline: ["appcache", "serviceworker"],
		organization: ["alarm", "calendar", "contacts", "notes"],
		maps: ["maps"],
		sales: ["direct", "inapp"],
		speech: ["synthesis", "recognition"]
	}
}

// CAN I USE DATA

// create mapping of caniuse id to feature
var caniuseMapping = {};
caniuseMapping["hardware.recording.image.api"] = "mediacapture-fromelement";
caniuseMapping["hardware.recording.audio.api"] = "mediacapture-fromelement";
caniuseMapping["hardware.recording.video.api"] = "mediacapture-fromelement";
caniuseMapping["hardware.output.image.webgl1"] = "webgl";
caniuseMapping["hardware.output.image.webgl2"] = "webgl2";
caniuseMapping["hardware.output.audio.elem"] = "audio";
caniuseMapping["hardware.output.audio.api"] = "audio-api";
caniuseMapping["hardware.output.video.elem"] = "video";
caniuseMapping["hardware.output.vibration.api"] = "vibration";
caniuseMapping["hardware.persistence.keyvalue.api"] = "namevalue-storage";
caniuseMapping["hardware.persistence.complex.idb1"] = "indexeddb";
caniuseMapping["hardware.persistence.complex.idb2"] = "indexeddb2";
caniuseMapping["hardware.communication.miscellaneous.gps"] = "geolocation";
caniuseMapping["hardware.communication.miscellaneous.bluetooth"] = "web-bluetooth";
caniuseMapping["hardware.communication.miscellaneous.usb"] = "webusb";
caniuseMapping["hardware.sensors.motion.acceleration.event"] = "deviceorientation";
caniuseMapping["hardware.sensors.motion.acceleration.api"] = "accelerometer";
caniuseMapping["hardware.sensors.motion.rotation.event"] = "deviceorientation";
caniuseMapping["hardware.sensors.motion.rotation.api"] = "gyroscope";
caniuseMapping["hardware.sensors.environment.magnetic.api"] = "magnetometer";
caniuseMapping["software.install.manifest"] = "web-app-manifest";
caniuseMapping["software.offline.appcache"] = "offline-apps";
caniuseMapping["software.offline.serviceworker"] = "serviceworkers";
caniuseMapping["software.sales.inapp"] = "payment-request";
caniuseMapping["software.speech.synthesis"] = "speech-synthesis";
caniuseMapping["software.speech.recognition"] = "speech-recognition";

// prepare can i use data
var baseURL = "https://raw.githubusercontent.com/Fyrd/caniuse/master/features-json/";
var caniuseSupportData = {};
Object.keys(caniuseMapping).map(function(featureID) { return caniuseMapping[featureID]; }).filter(function(caniuseID, index, array) {
	return array.indexOf(caniuseID) === index;
}).forEach(function(caniuseID) {
	var url = baseURL + caniuseID + ".json";
	$.get(url, function(data) {
		var browserSupportData = {};
		browsers.forEach(function(browser) {
			// read support data from caniuse data json
			var supportData = [];
			var browserVersions = data.stats[browser];
			Object.keys(browserVersions).sort(function(a, b) {
				return parseFloat(a.split("-")[0]) - parseFloat(b.split("-")[0]);
			}).forEach(function(version) {
				var support = browserVersions[version];
				support = support.indexOf("n") === 0 ? "n" : support;
				support = support.indexOf("p") === 0 ? "n" : support;
				var lastEntry = supportData.length ? supportData[supportData.length-1] : undefined;
				if(!lastEntry || lastEntry.support !== support) {
					supportData.push({version: parseFloat(version.split("-")[0]), support: support});
				}
			});
			// resolve notes
			supportData = supportData.map(function(entry) {
				if(entry.support.indexOf("#") > 0) {
					var num = entry.support.split("#")[1];
					entry.note = data.notes_by_num[num];
				}
				if(entry.support.indexOf("x") > 0) {
					entry.note = "Supported with prefix: " + (browser === "firefox" ? "moz" : "webkit");
				}
				entry.support = entry.support.substring(0, 1);
				return entry;
			});
			// set support data for browser
			browserSupportData[browser] = supportData;
		});
		// set support data for feature
		caniuseSupportData[caniuseID] = browserSupportData;
		console.log(caniuseID);
		console.dir(browserSupportData);
	}, "json");
});


// RULE IMPLEMENTATION

var rules = {};
rules["hardware.recording.image.elem"] = function() {};
rules["hardware.recording.image.api"] = function() {};
rules["hardware.recording.audio.elem"] = function() {};
rules["hardware.recording.audio.api"] = function() {};
rules["hardware.recording.video.elem"] = function() {};
rules["hardware.recording.video.api"] = function() {};
rules["hardware.output.image.elem"] = function() {};
rules["hardware.output.image.webgl1"] = function() {};
rules["hardware.output.image.webgl2"] = function() {};
rules["hardware.output.audio.elem"] = function() {};
rules["hardware.output.audio.api"] = function() {};
rules["hardware.output.video.elem"] = function() {};
rules["hardware.output.vibration.api"] = function() {};
rules["hardware.persistence.keyvalue.api"] = function() {};
rules["hardware.persistence.complex.idb1"] = function() {};
rules["hardware.persistence.complex.idb2"] = function() {};
rules["hardware.persistence.filesystem.elem"] = function() {};
rules["hardware.persistence.filesystem.direct"] = function() {};
rules["hardware.communication.mobile.telephony"] = function() {};
rules["hardware.communication.mobile.messaging"] = function() {};
rules["hardware.communication.internet.networkstatus"] = function() {};
rules["hardware.communication.internet.requesting"] = function() {};
rules["hardware.communication.miscellaneous.gps"] = function() {};
rules["hardware.communication.miscellaneous.bluetooth"] = function() {};
rules["hardware.communication.miscellaneous.nfc"] = function() {};
rules["hardware.communication.miscellaneous.usb"] = function() {};
rules["hardware.sensors.motion.acceleration.event"] = function() {};
rules["hardware.sensors.motion.acceleration.api"] = function() {};
rules["hardware.sensors.motion.rotation.event"] = function() {};
rules["hardware.sensors.motion.rotation.api"] = function() {};
rules["hardware.sensors.environment.light.event"] = function() {};
rules["hardware.sensors.environment.light.api"] = function() {};
rules["hardware.sensors.environment.magnetic.api"] = function() {};
rules["hardware.sensors.environment.proximity.event"] = function() {};
rules["hardware.sensors.environment.proximity.api"] = function() {};
rules["hardware.sensors.environment.other.temperature"] = function() {};
rules["hardware.sensors.environment.other.pressure"] = function() {};
rules["hardware.sensors.environment.other.humidity"] = function() {};
rules["software.communication.emails"] = function() {};
rules["software.communication.push"] = function() {};
rules["software.install.manifest"] = function() {};
rules["software.offline.appcache"] = function() {};
rules["software.offline.serviceworker"] = function() {};
rules["software.organization.alarm"] = function() {};
rules["software.organization.calendar"] = function() {};
rules["software.organization.contacts"] = function() {};
rules["software.organization.notes"] = function() {};
rules["software.maps.maps"] = function() {};
rules["software.sales.direct"] = function() {};
rules["software.sales.inapp"] = function() {};
rules["software.speech.synthesis"] = function() {};
rules["software.speech.recognition"] = function() {};