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
	["chrome", "firefox", "safari", "ie", "edge"].forEach(function(browser) {
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
	$("#btnEvaluate").click(function() {
		// get browser support data
		var browserSupportData = {};
		var browserAlert = $("p#browser-alert");
		var checkedBrowsers = $("#browser-container .ui-block-a input[value=true]").filter(":checked");
		if(checkedBrowsers.length) {
			browserAlert.hide();
			checkedBrowsers.each(function(index, input) {
				var browser = input.name;
				browser = browser.substring(8, browser.length - 10);
				var version = $(input).parents(".ui-grid-a").find("input[name=browser-" + browser + "-version]").val();
				version = /\d+([.,]\d+)?/.test(version) ? parseFloat(version.replace(",", ".")) : 0.0;
				version = version < 0 ? 0.0 : version;
				browserSupportData[browser] = version;
			});
			console.dir(browserSupportData);
		} else {
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
			console.dir(requiredFeatures);
			console.dir(niceToHaveFeatures);
		} else {
			ruleAlert.show();
			$("h2")[1].scrollIntoView();
		}
	});
});