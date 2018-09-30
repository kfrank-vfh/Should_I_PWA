// TODO mention, that data is taken partially from caniuse.com

var ruleStructure = {
	hardware: {
		recording: ["image", "audio", "video"],
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

var caniuseMapping = {};
caniuseMapping["hardware.recording.image"] = "mediacapture-fromelement";
caniuseMapping["hardware.recording.audio"] = "mediacapture-fromelement";
caniuseMapping["hardware.recording.video"] = "mediacapture-fromelement";
caniuseMapping["hardware.output.image.webgl1"] = "webgl";
caniuseMapping["hardware.output.image.webgl2"] = "webgl2";
caniuseMapping["hardware.output.audio.elem"] = "audio";
caniuseMapping["hardware.output.audio.api"] = "audio-api";
caniuseMapping["hardware.output.video.elem"] = "video";
caniuseMapping["hardware.output.vibration.api"] = "vibration";
caniuseMapping["hardware.persistence.keyvalue.api"] = "namevalue-storage";
caniuseMapping["hardware.persistence.complex.idb1"] = "indexeddb";
caniuseMapping["hardware.persistence.complex.idb2"] = "indexeddb2";
caniuseMapping["hardware.communication.internet.networkstatus"] = "netinfo";
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