// VARIABLES
let version = 1;
let resourceCache = "resources_v" + version;
let featureCache = "features_v" + version;
const featurePrefix = "https://raw.githubusercontent.com/Fyrd/caniuse/master/features-json/";
const featureSuffix = ".json";
const browsers = ["chrome", "firefox", "safari", "ie", "edge"];
const resources = [
	"/index.html",
	"/css/shouldipwa.css",
	"/js/rules.js",
	"/js/shouldipwa.js",
	"/i18n/en.js",
	"/i18n/de.js"
]
const features = [
	"mediacapture-fromelement",
	"canvas",
	"webgl",
	"webgl2",
	"audio",
	"audio-api",
	"video",
	"vibration",
	"namevalue-storage",
	"indexeddb",
	"indexeddb2",
	"geolocation",
	"web-bluetooth",
	"webusb",
	"deviceorientation",
	"accelerometer",
	"gyroscope",
	"magnetometer",
	"web-app-manifest",
	"offline-apps",
	"serviceworkers",
	"payment-request",
	"speech-synthesis",
	"speech-recognition"
]

// EVENT PROCESSING

self.addEventListener("install", function(event) {
	// fetch and cache resources
	var resourcePromises = resources.map(function(resource) {
		var request = new Request(resource);
		fetch(request).then(function(response) {
			return caches.open(resourceCache).then(function(cache) {
				cache.put(request, response.clone());
				// console.log("install: resource cached to url: " + request.url); // TODO remove
			});
		});
	});
	
	// fetch, convert and cache features
	var featurePromises = features.map(function(feature) {
		var request = new Request(featurePrefix + feature + featureSuffix);
		fetch(request).then(function(response) {
			return convertFeatureResponse(response);
		}).then(function(response) {
			return caches.open(featureCache).then(function(cache) {
				cache.put(request, response.clone());
				// console.log("install: feature cached to url: " + request.url); // TODO remove
			});
		});
	});
	
	// wait for all promises
	event.waitUntil(Promise.all(resourcePromises.concat(featurePromises)));
});

self.addEventListener("activate", function(event) {
	// delete old caches
	var whitelist = [resourceCache, featureCache];
	event.waitUntil(caches.keys().then(function(keys) {
		return Promise.all(keys.filter(function(key) {
			return whitelist.indexOf(key) >= 0;
		}).map(function(key) {
			// console.log("activate: delete cache " + key); // TODO remove
			return caches.delete(key);
		}));
	}));
});

self.addEventListener("fetch", function(event) {
	// strategy: cache falling back to network with mandatory update from network
	// check if feature is requested and select corresponding cache
	var request = event.request;
	var isFeature = request.url.indexOf(featurePrefix) === 0;
	var cache = isFeature ? featureCache : resourceCache;
	// try to find a response in cache
	event.respondWith(caches.open(cache).then(function(cache) {
		return cache.match(request).then(function(cacheResponse) {
			// always fetch remove data
			var fetchPromise = fetch(request).then(function(fetchResponse) {
				// convert response for features
				// console.log("fetch: converting fetch response: " + isFeature); // TODO remove
				return isFeature ? convertFeatureResponse(fetchResponse) : fetchResponse;
			}).then(function(fetchResponse) {
				// always update the response in cache
				cache.put(request, fetchResponse.clone());
				// console.log("fetch: response cached to url: " + request.url); // TODO remove
				return fetchResponse;				
			});
			
			// if response was cached, ...
			if(cacheResponse) {
				// ... tell the event to wait for the fetch ...
				event.waitUntil(fetchPromise);
				// and return the cached response ...
				// console.log("fetch: returning response from cache to url: " + request.url); // TODO remove
				return cacheResponse;
			} else {
				// else return the fetched response
				// console.log("fetch: returning fetched response to url: " + request.url); // TODO remove
				return fetchPromise;
			}
		});
	}));
});

// UTILITY METHODS

function convertFeatureResponse(response) {
	// return response, if status code is not 200 / "OK"
	if(response.status !== 200) {
		return response;
	}
	
	// build response meta data
	var init = { status: response.status, statusText: response.statusText, headers: {} };
	response.headers.forEach(function(value, key) {
		init.headers[key] = value;
	});
	
	// get response body as json, convert and return it
	return response.json().then(function(data) {
		var body = convertSupportData(data);
		body = JSON.stringify(body);
		return new Response(body, init);
	});
}

function convertSupportData(data) {
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
	return browserSupportData;
}