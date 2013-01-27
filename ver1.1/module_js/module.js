/*
モジュール管理用JS ver1.1
Mod: 2012.01.30
*/

if(typeof(MODTEMP) == 'undefined' || !MODTEMP) {
	var MODTEMP= {};
}

MODTEMP.ua = $.browser;

$(function() {
	if (!(parseFloat(MODTEMP.ua.version) < 8 && MODTEMP.ua.msie)) {
		ZeroClipboard.setMoviePath("module_js/ZeroClipboard.swf");
		MODTEMP.viewSrc = new MODTEMP.viewSrcInit();
		MODTEMP.viewSrc.start();
	}
});

MODTEMP.viewSrcInit = function() {
	this.module = ".module";
	this.innerSrc = ".innerSrc";
	this.outerSrc = "outerSrc";
	this.btnView = "btnView";
	this.btnCopy = "btnCopy";
	this.vSrc = ".vSrc";
	this.btnVal = {"show":"view src", "hide":"hide src"};
}

MODTEMP.viewSrcInit.prototype = {
	start: function() {
		this.initialSetting();
		this.dispSwitch();
	},

	initialSetting: function() {
		$(this.module).append($("<div/>").addClass(this.btnView).html(this.btnVal["show"]));
	},

	// ソース表示・非表示切り替え
	dispSwitch: function() {
		var selfObj = this;
		$("." + this.btnView).toggle(
			function() {selfObj.dispSrc(this);},
			function() {selfObj.hideSrc(this);}
		);
	},

	// ソース表示
	dispSrc: function(obj) {
		var srcArea = $(obj).parent();
		var src = srcArea.find(this.innerSrc).html();
		src = src.replace(/^[\n\r]+(.+?)[\n\r]+$/, "$1");
		if (MODTEMP.ua.msie) src = src.chgEntity()
		var outerSrcArea = $("<div/>").addClass(this.outerSrc);
		srcArea.append(outerSrcArea.html($("<div/>").html($("<textarea/>").addClass("vSrc").html(src))));
		if (!MODTEMP.ua.msie) {
			var copyBtn = $("<div/>").addClass(this.btnCopy).attr("id","copy").html("copy src");
			srcArea.append(outerSrcArea.append(copyBtn));
		}
		srcArea.find("." + this.outerSrc).slideDown("fast");
		$(obj).html(this.btnVal["hide"]);
		if(!MODTEMP.ua.msie) this.copySource();
	},

	// ソース非表示
	hideSrc: function(obj) {
		var srcArea = $(obj).parent().find("." + this.outerSrc);
		srcArea.slideUp("fast", function() {srcArea.remove()});
		$(obj).html(this.btnVal["show"]);
	},

	// ソースコピー
	copySource: function() {
		var selfObj = this;
		var clip;
		$("." + this.btnCopy).mouseover(function() {
			var srcVal = $(this).parent().find(selfObj.vSrc).val();
			clip = new ZeroClipboard.Client(this);
			clip.setText(srcVal);
			clip.addEventListener('complete', function() {alert("コピーしました")});
		});
		$("." + this.btnCopy).click(function() {
			clip.glue(this)
			alert("コピーしました");
		});
		$(window).resize(function() {
			clip.reposition();
		});
	}
}

if (!String.prototype.chgEntity) {
	String.prototype.chgEntity = function(obj) {
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