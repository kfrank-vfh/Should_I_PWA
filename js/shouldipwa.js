// generate UI for rules
$(document).on("pagebeforecreate", function() {
	
	var ruleContainer = $("div.rule-container");
	var prototype = ruleContainer.find("div.prototype fieldset").clone();
	ruleContainer.find("div.prototype").remove();
	
	function addRadioSwitch(name) {
		var radioSwitch = prototype.clone();
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


// init change handler for browser support switches
$(function() {
	var browserSupportChecks = $("#browser-support input[type=checkbox]");
	browserSupportChecks.change(function() {
		var input = $(this);
		var versionBlock = input.parent();
		var versionBlock = input.parent().parent().parent().find(".ui-block-b");
		versionBlock.toggle(input.prop("checked"));
	});
	browserSupportChecks.change();
});