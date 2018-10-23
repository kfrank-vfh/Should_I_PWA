// SERVICE WORKER REGISTRATION
if("serviceWorker" in navigator) {
	$(function() {
		navigator.serviceWorker.register("sw.js");
	});
}

// LOCALIZATION
function localeStorageAvailable() {
	try {
		var storage = window["localStorage"];
		var x = "__storage_test__";
		storage.setItem(x, x);
		storage.removeItem(x);
		return true;
	} catch (e) {
		return e instanceof DOMException && (e.code === 22 || e.code === 1014 || e.name === 'QuotaExceededError' || e.name === 'NS_ERROR_DOM_QUOTA_REACHED') && storage.length !== 0;
	}
}

$(function() {
	// check for locale in web storage if available
	var locale;
	if(localeStorageAvailable()) {
		locale = localStorage["locale"];
	}
	// if locale not found, try to get it from the navigator
	if(!locale) {
		locale = ("userLanguage" in navigator) ? navigator.userLanguage : navigator.language;
		locale = locale.split("-")[0];
	}
	// check if i18n.js exists for locale, else load en.js and save locale in storage
	var onSuccess = establishNewLocale;
	var onError = function() {
		// load en.js as default language
		$.get("i18n/en.js", onSuccess, "script");
	};
	var settings = {
		url: "i18n/" + locale + ".js",
		dataType: "script",
		success: onSuccess,
		error: onError
	};
	$.ajax(settings);
	// find language select and add change handler
	$("select#langauge-select").change(function() {
		var locale = $(this).val();
		var url = "i18n/" + locale + ".js";
		$.get(url, establishNewLocale, "script");
	});
});

function establishNewLocale(i18nData) {
	// clear current i18n data, if exists
	if(i18n) delete i18n;
	// add i18n data to globale context
	eval(i18nData); 
	// save locale in storage if available
	if(localeStorageAvailable()) {
		localStorage["locale"] = i18n["locale"];
	}
	// trigger localization of ui
	window["localizationInitialized"] = true;
	localizeCompleteUI();
}

// GENERATING UI
var textByID = function() { return i18n[this.id]; };
var textByClass = function() { return i18n["guide." + this.className.replace("-", ".")]; };
function localizeCompleteUI() {
	localizeIntroPage();
	localizeGuidelinePage();
	localizeResultPage();
	window.location.hash = "intro"
}

function localizeIntroPage() {
	var page = $("div#intro");
	// build language select in header
	var header = page.find("div[data-role=header]");
	var select = header.find("select#langauge-select");
	select.empty();
	Object.keys(i18n).filter(function(key) {
		return key.indexOf("locale.") === 0;
	}).map(function(key) {
		return [key.substring(7), i18n[key]];
	}).sort(function(a, b) {
		return a[1].localeCompare(b[1]);
	}).forEach(function(touple) {
		var option = $('<option value="' + touple[0] + '"></option>');
		option.text(touple[1]);
		option.appendTo(select);
	});
	// set value in language select
	var value = i18n["locale"];
	select.val(value);
	var uiValue = select.find("option[value=" + value + "]").text();
	select.parent().find("span").text(uiValue);
	// localize content
	var content = page.find("div[role=main]");
	content.find("p").html(i18n["intro.text"]);
	content.find("a").text(i18n["intro.btn"]);
	// localize footer
	var footer = page.find("div[data-role=footer]");
	footer.find("span#createdby").text(i18n["intro.footer.createdby"] + " Kevin Frank");
	footer.find("a#guidepdf").text(i18n["intro.footer.guidelines"] + ".pdf");
}

function localizeGuidelinePage() {
	var page = $("div#guideline");
	var content = page.find("div[role=main]");
	// adjust general headers and paragraphs
	content.find("h2").add(content.find("p")).text(textByID);
	// adjust browser radios and labels
	var browserContainer = content.find("div#browser-container");
	browserContainer.find("fieldset").each(function() {
		$(this).find("legend").text(i18n[this.id]);
		$(this).find("label").text(textByClass);
	});
	browserContainer.find(".ui-block-b label").text(textByClass);
	// adjust rule header
	var ruleContainer = content.find("div#rule-container");
	var headers = $(), i = 3, selection = $("h" + i);
	for(var selection = ruleContainer.find("h" + i++); selection.length; selection = ruleContainer.find("h" + i++)) {
		headers = headers.add(selection);
	}
	headers.text(textByID);
	// adjust rule radios
	ruleContainer.find("fieldset").each(function() {
		var name = $(this).find("input[name]").first().attr("name");
		$(this).find("legend").text(i18n[name]);
		$(this).find("label").text(textByClass);
	});
	// adjust evaluate button
	content.find("button#btnEvaluate").text(i18n["guide.btn"]);
}

function localizeResultPage() {
	// adjust header text
	var content = $("div#result div[role=main]");
	content.find("h2").add("h3").text(textByID);
}

$(document).on("pagebeforecreate", function(event) {
	
	// check if guideline page should be created
	if(event.target.id !== "guideline") {
		return;
	}
	
	// build browser support ui
	// get browser prototype and remove from dom
	var browserContainer = $("div#browser-container");
	var browserPrototype = browserContainer.find("div.prototype .ui-grid-a").clone();
	browserContainer.find("div.prototype").remove();
	
	// build iu element for each browser
	browsers.forEach(function(browser) {
		// add horizontal ruler
		if(browser !== "chrome") {
			browserContainer.append("<hr>");
		}
		// adjust radio switch
		var browserElem = browserPrototype.clone();
		browserElem.find("fieldset").attr("id", "browser." + browser);
		browserElem.find(".ui-block-a input").each(function(index, input) {
			var name = "browser-" + browser + "-supported";
			input.id = name + index;
			input.name = name;
		});
		browserElem.find(".ui-block-a label").each(function(index, label) {
			$(label).attr("for", "browser-" + browser + "-supported" + index);
		});
		// adjust version number field
		browserElem.find(".ui-block-b input").each(function(index, input) {
			var name = "browser-" + browser + "-version";
			input.id = name + index;
			input.name = name;
		});
		browserElem.find(".ui-block-b label").each(function(index, label) {
			$(label).attr("for", "browser-" + browser + "-version" + index);
		});
		// add ui element to browser container
		browserContainer.append(browserElem);
	});
	
	// init change handler for browser support switches
	var browserSupportRadios = $("#browser-container .ui-block-a input");
	browserSupportRadios.change(function() {
		var input = $(this);
		var supported = input.parents(".ui-controlgroup-controls ").find("input[value=true]").is(":checked");
		var versionBlock = input.parents(".ui-grid-a").children(".ui-block-b");
		versionBlock.toggle(supported)
	});
	browserSupportRadios.change();
	
	// build rules ui
	var ruleContainer = $("div#rule-container");
	var rulePrototype = ruleContainer.find("div.prototype fieldset").clone();
	ruleContainer.find("div.prototype").remove();
	
	function addRadioSwitch(name) {
		var radioSwitch = rulePrototype.clone();
		radioSwitch.find("input").each(function(index, input) {
			input.id = name + index;
			input.name = name;
		});
		radioSwitch.find("label").each(function(index, label) {
			$(label).attr("for", name + index);
		});
		ruleContainer.append(radioSwitch);
	}
	
	function resursiveBuildRuleUI(layer, mapping, name) {
		if(name.length) {
			var header = $("<h" + layer + "></h" + layer + ">");
			header.text(i18n[name]);
			header.appendTo(ruleContainer);
		}
		if(Array.isArray(mapping)) {
			for(var i = 0; i < mapping.length; i++) {
				addRadioSwitch(name + "." + mapping[i]);
			}
		} else {
			var keys = Object.keys(mapping);
			for(var i = 0; i < keys.length; i++) {
				var key = keys[i];
				var subName = name + (name.length ? "." : "") + key; 
				resursiveBuildRuleUI(layer + 1, mapping[key], subName);
			}
		}
	}
	resursiveBuildRuleUI(2, ruleStructure, "");
	
	// localize ui if already loaded
	if(window["localizationInitialized"]) {
		localizeGuidelinePage()
	}
});

// SUPPORT EVALUATION
$(function() {
	var overallResultTitle = $("div#result p#overall-result-title");
	var overallResultDescription = $("div#result p#overall-result-description");
	var requiredFeatureBlock = $("div#result div#required-feature-block");
	var requiredFeatureContainer = requiredFeatureBlock.find("div#required-feature-container");
	var nicetohaveFeatureBlock = $("div#result div#nicetohave-feature-block");
	var nicetohaveFeatureContainer = nicetohaveFeatureBlock.find("div#nicetohave-feature-container");
	
	$("#btnEvaluate").click(function() {
		// get browser support data
		var evaluate = true;
		var browserData = {};
		var browserAlert = $("p#guide\.alert\.support");
		var checkedBrowsers = $("#browser-container .ui-block-a input[value=true]").filter(":checked");
		if(checkedBrowsers.length) {
			browserAlert.hide();
			checkedBrowsers.each(function(index, input) {
				var browser = input.name;
				browser = browser.substring(8, browser.length - 10);
				var version = $(input).parents(".ui-grid-a").find("input[name=browser-" + browser + "-version]").val();
				version = /\d+([.,]\d+)?/.test(version) ? parseFloat(version.replace(",", ".")) : 0.0;
				if(version < 0) version = 0.0;
				if(browser === "edge" && version > 0.0 && version < 12.0) version = 12.0;
				browserData[browser] = version;
			});
		} else {
			evaluate = false;
			browserAlert.show();
			$("h2")[0].scrollIntoView();
		}
		
		// get required and nice to have rule data
		var requiredFeatures, niceToHaveFeatures;
		var ruleAlert = $("p#guide\.alert\.features");
		var checkedRequired = $("#rule-container input[value=required]").filter(":checked");
		var checkedNiceToHave = $("#rule-container input[value=nicetohave]").filter(":checked");
		if(checkedRequired.length + checkedNiceToHave.length) {
			ruleAlert.hide();
			requiredFeatures = checkedRequired.map(function() { return this.name; }).toArray();
			niceToHaveFeatures = checkedNiceToHave.map(function() { return this.name; }).toArray();
		} else {
			evaluate = false;
			ruleAlert.show();
			$("h2")[1].scrollIntoView();
		}
		
		if(!evaluate) {
			return;
		}
		
		// evaluate feature support
		var requiredSupport = {}, niceToHaveSupport = {};
		requiredFeatures.forEach(function(featureID) {
			requiredSupport[featureID] = rules[featureID](browserData);
		});
		niceToHaveFeatures.forEach(function(featureID) {
			niceToHaveSupport[featureID] = rules[featureID](browserData);
		});
		console.dir(requiredSupport);
		console.dir(niceToHaveSupport);
		
		// build result page ui
		var getSupportLevel = function(supportData) {
			return Object.keys(supportData).reduce(function(result, featureID) {
				if(result === "false") return result;
				var featureSupportData = supportData[featureID];
				var resultForFeature = Object.keys(featureSupportData).reduce(function(res, browser) {
					if(res === "false") return res; 
					var supported = featureSupportData[browser];
					supported = (typeof supported === "boolean") ? "" + supported : (supported.partial ? "partial" : "true");
					return supported === "true" ? res : supported;
				}, "true");
				return resultForFeature === "true" ? result : resultForFeature;
			}, "true");
		}
		var requiredSupportLevel = getSupportLevel(requiredSupport);
		var niceToHaveSupportLevel = getSupportLevel(niceToHaveSupport);
		
		// set overall result text
		var overallLevel = (requiredSupportLevel === "true" && niceToHaveSupportLevel === "true") ? "true" : (requiredSupportLevel === "false" ? "false" : "partial");
		overallResultTitle.text(i18n["result." + overallLevel + ".title"]);
		overallResultTitle.attr("class", overallLevel);
		overallResultDescription.text(i18n["result." + overallLevel + ".description"]);
		
		// generate ui for result per feature container
		var generatePerFeatureUI = function(container, supportData) {
			container.empty();
			Object.keys(supportData).forEach(function(featureID) {
				// create headline
				var parentFeatureID = featureID.substring(0, featureID.lastIndexOf("."));
				var header = $("<h4></h4>");
				header.text(i18n[parentFeatureID] + " - " + i18n[featureID]);
				header.appendTo(container);
				// function for creating paragraph text
				var notes = [];
				var supportToBrowser = supportData[featureID];
				var createParaText = function(filter) {
					return Object.keys(supportToBrowser).filter(filter).map(function(browser) {
						var result = i18n["browser." + browser];
						var note = supportToBrowser[browser].note;
						if(note) {
							notes.push(note);
							result += "<sup>" + notes.length + "</sup>";
						}
						return result;
					}).reduce(function(prev, current) { return prev.length ? prev + ", " + current : current; }, "");
				}
				// create paragraph for supported browsers
				var paraText = createParaText(function(browser) {
					var support = supportToBrowser[browser];
					return support === true || support.partial === false;
				});
				if(paraText.length) {
					var para = $("<p></p>");
					para.html(i18n["result.feature.true.prefix"] + paraText + i18n["result.feature.true.suffix"]);
					para.appendTo(container);
				}
				// create paragraph for partially supported browsers
				paraText = createParaText(function(browser) {
					var support = supportToBrowser[browser];
					return typeof support === "object" && support.partial;
				});
				if(paraText.length) {
					var para = $("<p></p>");
					para.html(i18n["result.feature.partial.prefix"] + paraText + i18n["result.feature.partial.suffix"]);
					para.appendTo(container);
				}
				// create paragraph for unsupported browsers
				paraText = createParaText(function(browser) {
					return supportToBrowser[browser] === false;
				});
				if(paraText.length) {
					var para = $("<p></p>");
					para.html(i18n["result.feature.false.prefix"] + paraText + i18n["result.feature.false.suffix"]);
					para.appendTo(container);
				}
				// create notes, when some were specified
				if(notes.length) {
					var listItems = notes.reduce(function(list, note) {
						var item = $("<li></li>");
						item.text(note);
						return list.add(item);
					}, $());
					container.append("<p>" + i18n["result.feature.note"] + ":</p>");
					var orderedList = $("<ol></ol>");
					orderedList.append(listItems);
					container.append(orderedList);
				}
			});
		}
		requiredFeatureBlock.toggle(Object.keys(requiredSupport).length > 0);
		generatePerFeatureUI(requiredFeatureContainer, requiredSupport);
		nicetohaveFeatureBlock.toggle(Object.keys(niceToHaveSupport).length > 0);
		generatePerFeatureUI(nicetohaveFeatureContainer, niceToHaveSupport);
		
		// show result page
		$.mobile.navigate("#result");
	});
});