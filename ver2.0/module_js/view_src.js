/*
ver2.0
Mod: 2012.04.10
*/

if(typeof(MODTEMP) == 'undefined' || !MODTEMP) {
	var MODTEMP= {};
}

$(function() {
	MODTEMP.viewSrc = new MODTEMP.viewSrcInit();
	MODTEMP.viewSrc.start();
});

MODTEMP.viewSrcInit = function() {
	this.block = ".module_block";
	this.src = ".module_src";
	this.btn = "module_btn";
	this.btnLabel = {"show":"view src", "hide":"hide src"};
}

MODTEMP.viewSrcInit.prototype = {
	start: function() {
		this.initialSetting();
		this.dispSwitch();
	},

	// initial setting
	initialSetting: function() {
		// disp button
		$(this.block).prepend($("<input/>").attr("type","button").addClass(this.btn).val(this.btnLabel["show"]));
		// disp preview
		$(this.src).each(function() {
			$(this).parent().prepend($(this).html().entityDecord());
		});
	},

	// source Show, Hide switching
	dispSwitch: function() {
		var selfObj = this;
		$("." + this.btn).toggle(
			function() {selfObj.dispSrc($(this));},
			function() {selfObj.hideSrc($(this));}
		);
	},

	// source disp
	dispSrc: function(obj) {
		obj.parent().find(this.src).slideDown("fast");
		obj.val(this.btnLabel["hide"]);
	},

	// source hide
	hideSrc: function(obj) {
		obj.parent().find(this.src).slideUp("fast");
		obj.val(this.btnLabel["show"]);
	}
}

if (!String.prototype.entityEncord) {
	String.prototype.entityEncord = function(obj) {
		var regQuote = function(str) {
			return str.toString()
			.replace(/\\/g, '\\\\')
			.replace(/\^/g, '\\^')
			.replace(/\$/g, '\\$')
			.replace(/\./g, '\\.')
			.replace(/\*/g, '\\*')
			.replace(/\+/g, '\\+')
			.replace(/\?/g, '\\?')
			.replace(/\(/g, '\\(')
			.replace(/\)/g, '\\)')
			.replace(/\[/g, '\\[')
			.replace(/\]/g, '\\]')
			.replace(/\{/g, '\\{')
			.replace(/\}/g, '\\}')
			.replace(/\|/g, '\\|')
			.replace(/\=/g, '\\=')
			.replace(/\!/g, '\\!')
			.replace(/\:/g, '\\:')
			.replace(/\-/g, '\\-');
		}
		var regStr = new Array('&', '"', '<', '>');
		var entityRef = {'&':'&amp;', '"':'&quot;', '<':'&lt;', '>':'&gt;'};
		if (typeof(obj) == "object") {
			for (var i in obj) {
				entityRef[i] = obj[i];
				regStr.push(regQuote(i));
			}
		}
		var reg = new RegExp(regStr.join("|"), "g");
		var repEntity = function(word) {return entityRef[word];}
		return this.replace(reg, repEntity);
	}
}

if (!String.prototype.entityDecord) {
	String.prototype.entityDecord = function(obj) {
		var regQuote = function(str) {
			return str.toString()
			.replace(/\\/g, '\\\\')
			.replace(/\^/g, '\\^')
			.replace(/\$/g, '\\$')
			.replace(/\./g, '\\.')
			.replace(/\*/g, '\\*')
			.replace(/\+/g, '\\+')
			.replace(/\?/g, '\\?')
			.replace(/\(/g, '\\(')
			.replace(/\)/g, '\\)')
			.replace(/\[/g, '\\[')
			.replace(/\]/g, '\\]')
			.replace(/\{/g, '\\{')
			.replace(/\}/g, '\\}')
			.replace(/\|/g, '\\|')
			.replace(/\=/g, '\\=')
			.replace(/\!/g, '\\!')
			.replace(/\:/g, '\\:')
			.replace(/\-/g, '\\-');
		}
		var regStr = new Array('&gt;', '&lt;', '&quot;', '&amp;');
		var entityRef = {'&gt;':'>', '&lt;':'<', '&quot;':'"', '&amp;':'&'};
		if (typeof(obj) == "object") {
			for (var i in obj) {
				entityRef[i] = obj[i];
				regStr.push(regQuote(i));
			}
		}
		var reg = new RegExp(regStr.join("|"), "g");
		var repEntity = function(word) {return entityRef[word];}
		return this.replace(reg, repEntity);
	}
}