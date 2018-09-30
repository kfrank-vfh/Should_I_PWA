// TODO mention, that data is taken partially from caniuse.com

// GLOBAL VARIABLES
var browsers = ["chrome", "firefox", "safari", "ie", "edge"];
var rules = {};
var ruleStructure;
var caniuseMapping = {};

// RULE STRUCTURE

ruleStructure = {
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
		organization: {
			calendar: ["google", "apple"],
			contacts: ["google", "apple"],
			miscellaneous: ["alarm", "notes"]
		},
		maps: ["maps"],
		sales: ["direct", "inapp"],
		speech: ["synthesis", "recognition"]
	}
}

// CAN I USE DATA

// create mapping of caniuse id to feature
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

rules["hardware.recording.image.elem"] = resultForAll(true);
rules["hardware.recording.image.api"] = caniuseCheck("mediacapture-fromelement");
rules["hardware.recording.audio.elem"] = resultForAll(true);
rules["hardware.recording.audio.api"] = caniuseCheck("mediacapture-fromelement");
rules["hardware.recording.video.elem"] = resultForAll(true);
rules["hardware.recording.video.api"] = caniuseCheck("mediacapture-fromelement");
rules["hardware.output.image.elem"] = resultForAll(true);
rules["hardware.output.image.webgl1"] = caniuseCheck("webgl");
rules["hardware.output.image.webgl2"] = caniuseCheck("webgl2");
rules["hardware.output.audio.elem"] = caniuseCheck("audio");
rules["hardware.output.audio.api"] = caniuseCheck("audio-api");
rules["hardware.output.video.elem"] = caniuseCheck("video");
rules["hardware.output.vibration.api"] = caniuseCheck("vibration");
rules["hardware.persistence.keyvalue.api"] = caniuseCheck("namevalue-storage");
rules["hardware.persistence.complex.idb1"] = caniuseCheck("indexeddb");
rules["hardware.persistence.complex.idb2"] = caniuseCheck("indexeddb2");
rules["hardware.persistence.filesystem.elem"] = resultForAll(true);
rules["hardware.persistence.filesystem.direct"] = resultForAll(false);
rules["hardware.communication.mobile.telephony"] = resultForAll(true);
rules["hardware.communication.mobile.messaging"] = resultForAll(true);
rules["hardware.communication.internet.networkstatus"] = staticCheck({
	chrome: [{version: 61, support: "y"}],
	firefox: [{version: 31, support: "a", note: "Available only on mobile devices."}],
	safari: [], ie: [], edge: []});
rules["hardware.communication.internet.requesting"] = staticCheck({
	chrome: [{version: 0, support: "y"}], firefox: [{version: 0, support: "y"}],
	safari: [{version: 1.2, support: "y"}], ie: [{version: 7, support: "y"}],
	edge: [{version: 0, support: "y"}]});
rules["hardware.communication.miscellaneous.gps"] = caniuseCheck("geolocation");
rules["hardware.communication.miscellaneous.bluetooth"] = caniuseCheck("web-bluetooth");
rules["hardware.communication.miscellaneous.nfc"] = resultForAll(false);
rules["hardware.communication.miscellaneous.usb"] = caniuseCheck("webusb");
rules["hardware.sensors.motion.acceleration.event"] = caniuseCheck("deviceorientation");
rules["hardware.sensors.motion.acceleration.api"] = caniuseCheck("accelerometer");
rules["hardware.sensors.motion.rotation.event"] = caniuseCheck("deviceorientation");
rules["hardware.sensors.motion.rotation.api"] = caniuseCheck("gyroscope");
rules["hardware.sensors.environment.light.event"] = staticCheck({
	chrome: [], safari: [], ie: [], edge: [{version: 0, support: "y"}],
	firefox: [{ version: 62, support: "a", note: "preference \"device.sensors.ambientLight.enabled\" must be set to \"true\"."}]});
rules["hardware.sensors.environment.light.api"] = staticCheck({
	chrome: [{ version: 54, support: "y"}],
	firefox: [], safari: [], ie: [], edge: []});
rules["hardware.sensors.environment.magnetic.api"] = caniuseCheck("magnetometer");
rules["hardware.sensors.environment.proximity.event"] = staticCheck({
	firefox: [{ version: 62, support: "a", note: "preference \"device.sensors.proximity.enabled\" must be set to \"true\"."}],
	chrome: [], safari: [], ie: [], edge: []});
rules["hardware.sensors.environment.proximity.api"] = resultForAll(false);
rules["hardware.sensors.environment.other.temperature"] = resultForAll(false);
rules["hardware.sensors.environment.other.pressure"] = resultForAll(false);
rules["hardware.sensors.environment.other.humidity"] = resultForAll(false);
rules["software.communication.emails"] = resultForAll(true);
rules["software.communication.push"] = staticCheck({
	chrome: [{ version: 40, support: "y"}], firefox: [{version: 44, support: "y"}],
	safari: [{ version: 11.1, support: "a", note: "Safari requires a custom API."}],
	ie: [], edge: [{ version: 17, support: "y"}]
});
rules["software.install.manifest"] = caniuseCheck("web-app-manifest");
rules["software.offline.appcache"] = caniuseCheck("offline-apps");
rules["software.offline.serviceworker"] = caniuseCheck("serviceworkers");
rules["software.organization.calendar.google"] = resultForAll(true);
rules["software.organization.calendar.apple"] = resultForAll(false);
rules["software.organization.contacts.google"] = resultForAll(true);
rules["software.organization.contacts.apple"] = resultForAll(false);
rules["software.organization.miscellaneous.alarm"] = resultForAll(false);
rules["software.organization.miscellaneous.notes"] = resultForAll(false);
rules["software.maps.maps"] = resultForAll(true);
rules["software.sales.direct"] = resultForAll(false);
rules["software.sales.inapp"] = caniuseCheck("payment-request");
rules["software.speech.synthesis"] = caniuseCheck("speech-synthesis");
rules["software.speech.recognition"] = caniuseCheck("speech-recognition");

// CHECK IMPLEMENTATION

function doCheck(browserData, supportData) {
	// TODO
}

function caniuseCheck(caniuseID) {
	var supportData = caniuseSupportData[caniuseID];
	return function(browserData) {
		return doCheck(browserData, supportData);
	}
}

function staticCheck(supportData) {
	return function(browserData) {
		return doCheck(browserData, supportData);
	}
}

function resultForAll(supported) {
	var supportData = {};
	var support = supported ? "y" : "n";
	browsers.forEach(function(browser) {
		supportData[browser] = [{ version: 0.0, support: support}];
	});
	return staticCheck(supportData);
}