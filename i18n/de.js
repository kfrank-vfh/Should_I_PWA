i18n = {};

// LOCALE
i18n["locale"] = "de";
i18n["locale.en"] = "Englisch";
i18n["locale.de"] = "Deutsch";

// INTRO PAGE
i18n["intro.text"] = "<b>Was sind PWAs?</b><br><br>PWA ist eine Abkürzung für Progressive Web App.<br><br>Progressive Web Apps sind responsive und per HTTPS übertragene Webanwendungen, die nach dem Grundsatz des Progressive Enhancement die Fähigkeiten der Browser für eine fortschreitende Verbesserung nutzen, wodurch mittels Offlinefunktionalität über Service Worker, eine Installation anhand eines Web App Manifests und Push Notifications eine zuverlässige, motivierende und native Nutzererfahrung gewährleistet wird.<br><br><b>Was macht diese App?</b><br><br><i>Should I PWA?</i> prüft technische Anforderungen gegen Browser und ihre Versionen und liefert eine Aussage darüber, ob zu den gegebenen Anforderungen eine Progressive Web App erstellt werden kann oder nicht.<br><br><b>Wie benutze ich die App?</b><br><br>Gehe einfach zur nächsten Seite und trage oben als erstes die Browser und Versionen ein, die du unterstützen willst. Anschließend gibt du an, welche der technischen Funktionen Pflicht, nur ganz nett oder unwichtig sind. Lasse zuletzt die App die ganze Arbeit für dich machen!";
i18n["intro.btn"] = "Los geht's!";
i18n["intro.footer.createdby"] = "Erstellt von";
i18n["intro.footer.guidelines"] = "Regelwerk";

// GUIDELINE PAGE
i18n["guide.btn"] = "Auswerten";

// header and paragraphs
i18n["guide.head.support"] = "Browserkompatibilität";
i18n["guide.para.support"] = "Gib zuerst an, welche Browser du ab welchen Versionen unterstützen willst. (Wird keine Version angegeben, dann prüft die App gegen die aktuellste Version)";
i18n["guide.alert.support"] = "Bitte gib mindestens einen zu unterstützenden Browser an!";
i18n["guide.head.features"] = "Funktionen";
i18n["guide.para.features"] = "Gib nun die Funktionen an, die Pflicht sind, ganz nett wären oder unwichtig sind.";
i18n["guide.alert.features"] = "Bitte gib mindestens eine Pflicht- oder \"anz nett\" Funktion an!";

// labels to radios
i18n["guide.label.supported"] = "unterstützt";
i18n["guide.label.unsupported"] = "nicht unterstützt";
i18n["guide.label.fromversion"] = "Ab Version";
i18n["guide.label.required"] = "Pflicht";
i18n["guide.label.nicetohave"] = "ganz nett";
i18n["guide.label.inessential"] = "unwichtig";

// browsers
i18n["browser.chrome"] = "Chrome";
i18n["browser.firefox"] = "Firefox";
i18n["browser.safari"] = "Safari";
i18n["browser.ie"] = "Internet Explorer";
i18n["browser.edge"] = "Edge";

// rules
i18n["hardware"] = "Hardwarebasierte Funktionen";
i18n["hardware.recording"] = "Aufnahme von Medien";
i18n["hardware.recording.image"] = "Aufnahme von Bildern";
i18n["hardware.recording.image.elem"] = "Bild <input> Element";
i18n["hardware.recording.image.api"] = "Media Capture API";
i18n["hardware.recording.audio"] = "Aufnahme von Audio";
i18n["hardware.recording.audio.elem"] = "Audio <input> Element";
i18n["hardware.recording.audio.api"] = "Media Capture API";
i18n["hardware.recording.video"] = "Aufnahme von Videos";
i18n["hardware.recording.video.elem"] = "Video <input> Element";
i18n["hardware.recording.video.api"] = "Media Capture API";
i18n["hardware.output"] =  "Ausgabe von Medien und Informationen";
i18n["hardware.output.image"] =  "Anzeigen von Bildern";
i18n["hardware.output.image.elem"] =  "<img> Element";
i18n["hardware.output.image.2dcontext"] =  "2D Kontext";
i18n["hardware.output.image.webgl1"] =  "WebGL 1 Rendering";
i18n["hardware.output.image.webgl2"] =  "WebGL 2 Rendering";
i18n["hardware.output.audio"] = "Wiedergabe von Audio";
i18n["hardware.output.audio.elem"] = "<audio> Element";
i18n["hardware.output.audio.api"] = "Web Audio API";
i18n["hardware.output.video"] = "Wiedergabe von Videos";
i18n["hardware.output.video.flash"] = "Flash Player";
i18n["hardware.output.video.elem"] = "<video> Element";
i18n["hardware.output.vibration"] = "Erzeugen von Vibrationen";
i18n["hardware.output.vibration.api"] = "Vibration API";
i18n["hardware.persistence"] = "Persistenz";
i18n["hardware.persistence.keyvalue"] = "Speichern von Schlüssel-Wert-Paaren";
i18n["hardware.persistence.keyvalue.api"] = "Web Storage API";
i18n["hardware.persistence.complex"] = "Speichern von komplexen Daten";
i18n["hardware.persistence.complex.idb1"] = "IndexedDB 1";
i18n["hardware.persistence.complex.idb2"] = "IndexedDB 2";
i18n["hardware.persistence.filesystem"] = "Zugriff auf das Dateisystem";
i18n["hardware.persistence.filesystem.elem"] = "Datei <input> Element";
i18n["hardware.persistence.filesystem.direct"] = "Direkter Zugriff";
i18n["hardware.communication"] = "Kommunikation";
i18n["hardware.communication.mobile"] = "Mobilfunkbasierte Kommunikation";
i18n["hardware.communication.mobile.telephony"] = "Telefonie";
i18n["hardware.communication.mobile.messaging"] = "Nachrichten (SMS)";
i18n["hardware.communication.internet"] = "Internetbasierte Kommunikation";
i18n["hardware.communication.internet.networkstatus"] = "Abfrage des Netzwerkstatus";
i18n["hardware.communication.internet.requesting"] = "Kommunikation über das Internet";
i18n["hardware.communication.miscellaneous"] = "Sonstige Kommunikation";
i18n["hardware.communication.miscellaneous.gps"] = "Positionsbestimmung (GPS)";
i18n["hardware.communication.miscellaneous.bluetooth"] = "Bluetooth";
i18n["hardware.communication.miscellaneous.nfc"] = "NFC";
i18n["hardware.communication.miscellaneous.usb"] = "USB";
i18n["hardware.sensors"] = "Auslesen von Sensoren";
i18n["hardware.sensors.motion"] = "Bewegungssensoren";
i18n["hardware.sensors.motion.acceleration"] = "Beschleunigungssensor";
i18n["hardware.sensors.motion.acceleration.event"] = "devicemotion Ereignis";
i18n["hardware.sensors.motion.acceleration.api"] = "Accelerometer API";
i18n["hardware.sensors.motion.rotation"] = "Rotationssensor";
i18n["hardware.sensors.motion.rotation.event"] = "deviceorientation Ereignis";
i18n["hardware.sensors.motion.rotation.api"] = "Gyroscope API";
i18n["hardware.sensors.environment"] = "Umgebungssensoren";
i18n["hardware.sensors.environment.light"] = "Lichtsensor";
i18n["hardware.sensors.environment.light.event"] = "devicelight Ereignis";
i18n["hardware.sensors.environment.light.api"] = "Ambient Light Sensor API";
i18n["hardware.sensors.environment.magnetic"] = "Magnetfeldsensor";
i18n["hardware.sensors.environment.magnetic.api"] = "Magnetometer API";
i18n["hardware.sensors.environment.proximity"] = "Näherungssensor";
i18n["hardware.sensors.environment.proximity.event"] = "userproximity Ereignis";
i18n["hardware.sensors.environment.proximity.api"] = "Proximity Sensor API";
i18n["hardware.sensors.environment.other"] = "Andere Umgebungssensoren";
i18n["hardware.sensors.environment.other.temperature"] = "Temperatursensor";
i18n["hardware.sensors.environment.other.pressure"] = "Luftdrucksensor";
i18n["hardware.sensors.environment.other.humidity"] = "Luftfeuchtigkeitssensor";
i18n["software"] = "Softwarebasierte Funktionen";
i18n["software.communication"] = "Softwarebasierte Kommunikation";
i18n["software.communication.emails"] = "Versenden von E-Mails";
i18n["software.communication.push"] = "Push Notifications";
i18n["software.communication.webshare"] = "Web Share API";
i18n["software.install"] = "Installation";
i18n["software.install.manifest"] = "Web App Manifest";
i18n["software.offline"] = "Offlinebetrieb";
i18n["software.offline.appcache"] = "Application Cache";
i18n["software.offline.serviceworker"] = "Service Worker";
i18n["software.organization"] = "Apps zur persönlichen Organisation";
i18n["software.organization.calendar"] = "Kalendar";
i18n["software.organization.calendar.google"] = "Google Calendar";
i18n["software.organization.calendar.apple"] = "iCloud Calendar";
i18n["software.organization.contacts"] = "Kontaktliste";
i18n["software.organization.contacts.google"] = "Google Contacts";
i18n["software.organization.contacts.apple"] = "iCloud Contacts";
i18n["software.organization.miscellaneous"] = "Andere Apps";
i18n["software.organization.miscellaneous.alarm"] = "Wecker";
i18n["software.organization.miscellaneous.notes"] = "Notizen";
i18n["software.maps"] = "Landkarten";
i18n["software.maps.google"] = "Google Maps";
i18n["software.maps.apple"] = "Apple Maps";
i18n["software.maps.open"] = "OpenStreetMap";
i18n["software.sales"] = "Vertrieb";
i18n["software.sales.checkout"] = "Online-Kasse";
i18n["software.sales.payreq"] = "Payment Request API";
i18n["software.speech"] = "Text- and Sprachverarbeitung";
i18n["software.speech.synthesis"] = "Sprachsynthese";
i18n["software.speech.recognition"] = "Spracherkennung";

// RESULT PAGE
//header and paragraphs
i18n["result.head.overall"] = "Gesamtergebnis";
i18n["result.head.perfeature"] = "Ergebnis je Funktion";
i18n["result.head.required"] = "Pflichtfunktionen";
i18n["result.head.nicetohave"] = "\"Ganz Nett\" Funktionen";
i18n["result.true.title"] = "Eine Progressive Web App ist geeignet.";
i18n["result.true.description"] = "All Funktionen, die Pflicht sind oder ganz nett wären, werden von den angegebenen Browsern unterstützt!";
i18n["result.partial.title"] = "Eine Progressive Web App könnte eine Option sein.";
i18n["result.partial.description"] = "Einige Pflichtfunktionen werden nur teilweise oder einige ganz nette Funktionen werden gar nicht von den angegebenen Browsern unterstützt. Bitte prüfe selbst, ob die Unterstützung ausreichend ist!";
i18n["result.false.title"] = "Eine Progressive Web App ist nicht geeignet.";
i18n["result.false.description"] = "Einige Pflichtfunktionen werden nicht von den angegebenen Browsern unterstützt. Gib jetzt aber noch nicht auf, sondern seh es als Chance, einen Weg zu finden und diese App blöd dastehen zu lassen!";
i18n["result.feature.true.prefix"] = "Die Funktion wird durch ";
i18n["result.feature.true.suffix"] = " unterstützt.";
i18n["result.feature.partial.prefix"] = "Die Funktion wird teilweise durch ";
i18n["result.feature.partial.suffix"] = " unterstützt.";
i18n["result.feature.false.prefix"] = "Die Funktion wird nicht durch ";
i18n["result.feature.false.suffix"] = " unterstützt.";
i18n["result.feature.note"] = "Anmerkungen";
i18n["result.btn"] = "Anforderungen anpassen";