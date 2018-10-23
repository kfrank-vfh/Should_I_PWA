i18n = {};

// LOCALE
i18n["locale"] = "en";
i18n["locale.en"] = "English";
i18n["locale.de"] = "German";

// INTRO PAGE
i18n["intro.text"] = "<b>What are PWAs?</b><br><br>PWA is the abbreviation for progressive web app.<br><br>Progressive web apps are responsive and securely transmitted web apps using a HTTPS encryption. PWAs are developed according to the progressive enhancement principle. They provide offline functionality, installation and a reliable and engaging user experience via service worker, push notifications and web app manifest.<br><br><b>What is this app?</b><br><br><i>Should I PWA?</i> checks technical requirements against browser support data and provides a statement, wether you can use a progressive web app for your requirements or not.<br><br><b>How do i use it?</b><br><br>Just proceed to the next page and enter the browsers and versions you want to support in a first step. After that, specify the technical functions that are required, nice to have and inessential. Finally let the app to the work for you!";
i18n["intro.btn"] = "Let's Start!";
i18n["intro.footer.createdby"] = "Created by";
i18n["intro.footer.guidelines"] = "Guidelines";

// GUIDELINE PAGE
i18n["guide.btn"] = "Evaluate";

// header and paragraphs
i18n["guide.head.support"] = "Browser support";
i18n["guide.para.support"] = "As a first step, please specify, which browsers and which versions should be supported. (Specifying no version checks against the most current one)";
i18n["guide.alert.support"] = "Please specify at least one supported browser!";
i18n["guide.head.features"] = "Features";
i18n["guide.para.features"] = "As a second step, please specify, which technical functions are required, nice to have and inessential.";
i18n["guide.alert.features"] = "Please specify at least one required or nice to have feature!";

// labels to radios
i18n["guide.label.supported"] = "Supported";
i18n["guide.label.unsupported"] = "Unsupported";
i18n["guide.label.fromversion"] = "from version";
i18n["guide.label.required"] = "Required";
i18n["guide.label.nicetohave"] = "Nice to have";
i18n["guide.label.inessential"] = "Inessential";

// browsers
i18n["browser.chrome"] = "Chrome";
i18n["browser.firefox"] = "Firefox";
i18n["browser.safari"] = "Safari";
i18n["browser.ie"] = "Internet Explorer";
i18n["browser.edge"] = "Edge";

// rules
i18n["hardware"] = "Hardware-based functions";
i18n["hardware.recording"] = "Recording of media";
i18n["hardware.recording.image"] = "Taking pictures";
i18n["hardware.recording.image.elem"] = "Image <input> element";
i18n["hardware.recording.image.api"] = "Media Capture API";
i18n["hardware.recording.audio"] = "Recording audio";
i18n["hardware.recording.audio.elem"] = "Audio <input> element";
i18n["hardware.recording.audio.api"] = "Media Capture API";
i18n["hardware.recording.video"] = "Recording videos";
i18n["hardware.recording.video.elem"] = "Video <input> element";
i18n["hardware.recording.video.api"] = "Media Capture API";
i18n["hardware.output"] =  "Output of media and information";
i18n["hardware.output.image"] =  "Displaying pictures";
i18n["hardware.output.image.elem"] =  "<img> element";
i18n["hardware.output.image.2dcontext"] =  "2D Context";
i18n["hardware.output.image.webgl1"] =  "WebGL 1 rendering";
i18n["hardware.output.image.webgl2"] =  "WebGL 2 rendering";
i18n["hardware.output.audio"] = "Playing audio";
i18n["hardware.output.audio.elem"] = "<audio> element";
i18n["hardware.output.audio.api"] = "Web Audio API";
i18n["hardware.output.video"] = "Playing videos";
i18n["hardware.output.video.flash"] = "Flash player";
i18n["hardware.output.video.elem"] = "<video> element";
i18n["hardware.output.vibration"] = "Generate vibrations";
i18n["hardware.output.vibration.api"] = "Vibration API";
i18n["hardware.persistence"] = "Persistence";
i18n["hardware.persistence.keyvalue"] = "Saving key-value-data";
i18n["hardware.persistence.keyvalue.api"] = "Web Storage API";
i18n["hardware.persistence.complex"] = "Saving complex data";
i18n["hardware.persistence.complex.idb1"] = "IndexedDB 1";
i18n["hardware.persistence.complex.idb2"] = "IndexedDB 2";
i18n["hardware.persistence.filesystem"] = "Accessing the file system";
i18n["hardware.persistence.filesystem.elem"] = "File <input> element";
i18n["hardware.persistence.filesystem.direct"] = "Direct access";
i18n["hardware.communication"] = "Communication";
i18n["hardware.communication.mobile"] = "Mobile-based communication";
i18n["hardware.communication.mobile.telephony"] = "Telephony";
i18n["hardware.communication.mobile.messaging"] = "Messaging (SMS)";
i18n["hardware.communication.internet"] = "Internet-based communication";
i18n["hardware.communication.internet.networkstatus"] = "Monitoring the network status";
i18n["hardware.communication.internet.requesting"] = "Sending requests via the internet";
i18n["hardware.communication.miscellaneous"] = "Miscellaneous communication";
i18n["hardware.communication.miscellaneous.gps"] = "Location (GPS)";
i18n["hardware.communication.miscellaneous.bluetooth"] = "Bluetooth";
i18n["hardware.communication.miscellaneous.nfc"] = "NFC";
i18n["hardware.communication.miscellaneous.usb"] = "USB";
i18n["hardware.sensors"] = "Reading sensors";
i18n["hardware.sensors.motion"] = "Motion sensors";
i18n["hardware.sensors.motion.acceleration"] = "Acceleration sensor";
i18n["hardware.sensors.motion.acceleration.event"] = "devicemotion Event";
i18n["hardware.sensors.motion.acceleration.api"] = "Accelerometer API";
i18n["hardware.sensors.motion.rotation"] = "Rotation sensor";
i18n["hardware.sensors.motion.rotation.event"] = "deviceorientation event";
i18n["hardware.sensors.motion.rotation.api"] = "Gyroscope API";
i18n["hardware.sensors.environment"] = "Environment sensors";
i18n["hardware.sensors.environment.light"] = "Ambient light sensor";
i18n["hardware.sensors.environment.light.event"] = "devicelight event";
i18n["hardware.sensors.environment.light.api"] = "Ambient Light Sensor API";
i18n["hardware.sensors.environment.magnetic"] = "Magnetic field sensor";
i18n["hardware.sensors.environment.magnetic.api"] = "Magnetometer API";
i18n["hardware.sensors.environment.proximity"] = "Proximity sensor";
i18n["hardware.sensors.environment.proximity.event"] = "userproximity event";
i18n["hardware.sensors.environment.proximity.api"] = "Proximity Sensor API";
i18n["hardware.sensors.environment.other"] = "Other environment sensors";
i18n["hardware.sensors.environment.other.temperature"] = "Temperature sensor";
i18n["hardware.sensors.environment.other.pressure"] = "Pressure sensor";
i18n["hardware.sensors.environment.other.humidity"] = "Humidity sensor";
i18n["software"] = "Software-based functions";
i18n["software.communication"] = "Software-based communication";
i18n["software.communication.emails"] = "Sending emails";
i18n["software.communication.push"] = "Push notifications";
i18n["software.communication.webshare"] = "Web Share API";
i18n["software.install"] = "Installation";
i18n["software.install.manifest"] = "Web App Manifest";
i18n["software.offline"] = "Offline functionality";
i18n["software.offline.appcache"] = "Application Cache";
i18n["software.offline.serviceworker"] = "Service Worker";
i18n["software.organization"] = "Apps for personal organization";
i18n["software.organization.calendar"] = "Calendar";
i18n["software.organization.calendar.google"] = "Google Calendar";
i18n["software.organization.calendar.apple"] = "iCloud Calendar";
i18n["software.organization.contacts"] = "Managing contacts";
i18n["software.organization.contacts.google"] = "Google Contacts";
i18n["software.organization.contacts.apple"] = "iCloud Contacts";
i18n["software.organization.miscellaneous"] = "Other Apps";
i18n["software.organization.miscellaneous.alarm"] = "Alarm clock";
i18n["software.organization.miscellaneous.notes"] = "Taking notes";
i18n["software.maps"] = "Maps";
i18n["software.maps.google"] = "Google Maps";
i18n["software.maps.apple"] = "Apple Maps";
i18n["software.maps.open"] = "OpenStreetMap";
i18n["software.sales"] = "Sales";
i18n["software.sales.checkout"] = "Online checkout";
i18n["software.sales.payreq"] = "Payment Request API";
i18n["software.speech"] = "Text and speech processing";
i18n["software.speech.synthesis"] = "Speech synthesis";
i18n["software.speech.recognition"] = "Speech recognition";

// RESULT PAGE
//header and paragraphs
i18n["result.head.overall"] = "Overall result";
i18n["result.head.perfeature"] = "Result per feature";
i18n["result.head.required"] = "Required features";
i18n["result.head.nicetohave"] = "Nice to have features";
i18n["result.true.title"] = "A Progressive Web App is suitable.";
i18n["result.true.description"] = "All required and nice to have features can be used with the specified browsers!";
i18n["result.partial.title"] = "A Progressive Web App could be an option.";
i18n["result.partial.description"] = "Some required features are only partially supported or some nice to have features are not supported by the specified browsers. Please check for yourself!";
i18n["result.false.title"] = "A Progressive Web App is unsuited.";
i18n["result.false.description"] = "Some required features are not supported by the specified browsers, but don't surrender yet! You should take it as a challenge to prove this app wrong!";
i18n["result.feature.true.prefix"] = "Feature supported by ";
i18n["result.feature.true.suffix"] = ".";
i18n["result.feature.partial.prefix"] = "Feature partially supported by ";
i18n["result.feature.partial.suffix"] = ".";
i18n["result.feature.false.prefix"] = "Feature unsupported by ";
i18n["result.feature.false.suffix"] = ".";
i18n["result.feature.note"] = "Notes";