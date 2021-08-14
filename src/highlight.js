const patterns = [
  {
    name: 'comment',
    pattern: /\s*#.*\n/, 
  },
  {
    name: 'return',
    pattern: /(?<==> *).+ *(?=$)/,
  },
  {
    name: 'multilinepipe',
    pattern: /(?<=:) ?\|/,
  },
  {
    name: 'text1',
    pattern: /(?<=:) *.+(?==>)/,
  },
  {
    name: 'text2',
    pattern: /(?<=:) *.+(?=$)/,
  },
  {
    name: 'diagram',
    pattern: /diagram/
  },
  {
    name: 'attr',
    pattern: /version|author/,
  },
  {
    name: 'sequence',
    pattern: /sequence/,
  },
  {
    name: 'moduleattrattr',
    pattern: /(?<=\.)title/,
  },
  {
    name: 'moduleattrmodule',
    pattern: /^\w+(?=\.)/,
  },
  {
    name: 'notemodulefirst',
    pattern: /(?<=@)\w+/,
  },
  {
    name: 'notemodulesecond',
    pattern: /(?<=@.*~\s)\w+/,
  },
  {
    name: 'caller',
    pattern: /(?<=^\s*)\w+\s*(?=->)/,
  },
  {
    name: 'callee',
    pattern: /(?<=->)\s*\w+\s*(?=:|\n)/,
  },
  {
    name: 'keyword',
    pattern: /(?<=^\s*)(if|elif|else|for|while)(?=:|\n)/,
  },
  {
    name: 'keyop',
    pattern: /->|=>|~|@|\./,
  },
  {
    name: 'op',
    pattern: /[:!\$%\^&*\(\)+=_\]\[\}\{;"'?/\\<>,~-]/,
  },
  {
    name: 'newline',
    pattern: /\n/
  },
  {
    name: 'whitespace',
    pattern: /\s/
  },
  {
    name: 'other',
    pattern: /\S+/
  },
]

function tokenize(input) {
  let items = []
  let matchText
  for(let i = 0; i < patterns.length; i++){
    let pattern = patterns[i];
    items.push(`(?<${pattern.name}>${pattern.pattern.source})`)
  }
  const whole = new RegExp(items.join('|'), 'gmi')
  const tokens = []
  for (const match of input.matchAll(whole)) {
    for (let name in match.groups) {
      matchText = match.groups[name]
      if (matchText == undefined) {
        continue
      }
      tokens.push({
        name: name,
        text: matchText
      })
    }
  }
  
  const last = tokens[tokens.length - 1]
  if (last.name == 'newline') {
    tokens.push({
      name: 'whitespace',
      text: ' '
    })
  }
  return tokens
}

export function colorize(pre, textarea) {
	const preChildren = pre.childNodes
	const tokens = tokenize(textarea.value)
	var firstDiff, lastDiffNew, lastDiffOld

	// find the first difference
  for (
      firstDiff = 0; 
      firstDiff < tokens.length && firstDiff < preChildren.length; 
      firstDiff++ ) {
    if (tokens[firstDiff] !== preChildren[firstDiff].textContent) { 
      break
    }
  }

	// trim the length of pre nodes to the size of the input text
  while (tokens.length < preChildren.length) {
		pre.removeChild(preChildren[firstDiff])
  }

	// find the last difference
  for(
      lastDiffNew = tokens.length - 1, 
      lastDiffOld = preChildren.length - 1; 
      firstDiff < lastDiffOld; 
      lastDiffNew--, lastDiffOld--) {
    if(tokens[lastDiffNew] !== preChildren[lastDiffOld].textContent) {
      break
    }
  }

	// update modified spans
  for(; firstDiff <= lastDiffOld; firstDiff++) {
    const token = tokens[firstDiff]
		preChildren[firstDiff].className = token.name
    preChildren[firstDiff].textContent = 
      preChildren[firstDiff].innerText = token.text
	}

	// add in modified spans
  for(
      var nextElement = preChildren[firstDiff] || null; 
      firstDiff <= lastDiffNew; 
      firstDiff++) {
		var span = document.createElement("span")
    const token = tokens[firstDiff]
		span.className = token.name
		span.textContent = span.innerText = token.text
		pre.insertBefore(span, nextElement)
	}
}
