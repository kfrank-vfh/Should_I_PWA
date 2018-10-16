// register service worker
if("serviceWorker" in navigator) {
	$(function() {
		navigator.serviceWorker.register("sw.js");
	});
}

// generate UI for rules
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
		var browserElem = browserPrototype.clone();
		// adjust radio switch
		browserElem.find(".ui-block-a legend").text(i18n["browser." + browser]);
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
		radioSwitch.find("legend").text(i18n[name]);
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
			ruleContainer.append("<h" + layer + ">" + i18n[name] + "</h" + layer + ">");
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
});

// click handler for evaluation
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
		var browserAlert = $("p#browser-alert");
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
		var ruleAlert = $("p#rule-alert");
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
				container.append("<h4>" + i18n[parentFeatureID] + " - " + i18n[featureID] + "</h4>");
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
					container.append("<p>Feature supported by " + paraText + "</p>");
				}
				// create paragraph for partially supported browsers
				paraText = createParaText(function(browser) {
					var support = supportToBrowser[browser];
					return typeof support === "object" && support.partial;
				});
				if(paraText.length) {
					container.append("<p>Feature partially supported by " + paraText + ".</p>");
				}
				// create paragraph for unsupported browsers
				paraText = createParaText(function(browser) {
					return supportToBrowser[browser] === false;
				});
				if(paraText.length) {
					container.append("<p>Feature unsupported by " + paraText + "</p>");
				}
				// create notes, when some were specified
				if(notes.length) {
					var listItems = notes.reduce(function(prev, note) {
						return prev + "<li>" + note + "</li>";
					}, "");
					container.append("<p>Notes:</p><ol>" + listItems + "</ol>");
				}
				// create useful web links
				// TODO
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