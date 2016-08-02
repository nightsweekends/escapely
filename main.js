function compressHtml(allHTML, headstatus) {
	var headHTML = "";
	var removeThis = "";
	if (headstatus != true) {
		//Compress all the things!
		allHTML = allHTML.replace(/(\r\n|\n|\r|\t)/gm,"");
		allHTML = allHTML.replace(/\s+/g," ");
	} else {
		//Don't compress the head
		allHTML = allHTML.replace(new RegExp("</HEAD","gi"),'</head');
		allHTML = allHTML.replace(new RegExp("</head ","gi"),'</head');

		var bodySplit = "</head>";
		var i = allHTML.indexOf(bodySplit) != -1;
		if (i == true) {
			var bodySplit = "</head>";
			tempo = allHTML.split(new RegExp(bodySplit,'i'));
			headHTML = tempo[0];
			allHTML = tempo[1];
		} else {
			bodySplit = "";
		}
		allHTML = allHTML.replace(/(\r\n|\n|\r|\t)/gm,"");
		allHTML = allHTML.replace(/\s+/g," ");
		allHTML = headHTML + bodySplit + '\n' + allHTML;
	}
  return allHTML;
}

var escapeString = (function() {
  var cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
      escapable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
      gap,
      indent,
      meta = {    // table of character substitutions
        '\b': '\\b',
        '\t': '\\t',
        '\n': '\\n',
        '\f': '\\f',
        '\r': '\\r',
        '"' : '\\"',
        '\\': '\\\\'
      },
      rep;

  function quote(string) {
    // If the string contains no control characters, no quote characters, and no
    // backslash characters, then we can safely slap some quotes around it.
    // Otherwise we must also replace the offending characters with safe escape
    // sequences.

    escapable.lastIndex = 0;
    return escapable.test(string) ? '"' + string.replace(escapable, function (a) {
      var c = meta[a];
      return typeof c === 'string' ? c :
      '\\u' + ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
    }) + '"' : '"' + string + '"';
  }

  return quote;
})();

function compressAndEscapeHtml(rawHtml, compressHead) {
  return escapeString(compressHtml(rawHtml, compressHead));
}
