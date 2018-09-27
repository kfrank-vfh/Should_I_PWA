var ruleStructure = {
	hardware: {
		recording: ["image", "audio", "video"],
		output: ["image", "audio", "video", "vibration"],
		persistence: ["keyvalue", "complex", "filesystem"],
		communication: {
			mobile: ["telephony", "messaging"],
			internet: ["networkstatus", "requesting"],
			miscellaneous: ["gps", "bluetooth", "nfc", "usb"]
		},
		sensors: {
			motion: ["acceleration", "rotation"],
			environment: ["light", "temperature", "magnetic", "proximity", "pressure", "humidity"]
		}
	},
	software: {
		communication: ["emails", "push"],
		install: ["install", "offline"],
		organization: ["alarm", "calendar", "contacts", "notes"],
		maps: ["maps"],
		sales: ["direct", "inapp"],
		speech: ["synthesis", "recognition"]
	}
}