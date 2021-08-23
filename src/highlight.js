const patterns = [
  {
    name: 'newline',
    pattern: /\r?\n/
  },
  {
    name: 'comment',
    pattern: /^ *#.*(?=$)/, 
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
    pattern: /(?<=^ *)\w+ *(?=->)/,
  },
  {
    name: 'callee',
    pattern: /(?<=->) *\w+ *(?=:|$)/,
  },
  {
    name: 'keyword',
    pattern: /(?<=^ *)(if|elif|else|for|while)(?=:|$)/,
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
    name: 'whitespace',
    pattern: /\s/
  },
  {
    name: 'other',
    pattern: /\S+/
  },
]

export function tokenize(input, selectionStartChar, selectionEndChar) {
  let items = []
  let lines = 0
  let cols = 0
  let matchText
  let tokenLen = 0
  let selectionStartLine = -1
  let selectionEndLine = -1

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
      
      tokenLen = matchText.length
      tokens.push({
        name: name,
        text: matchText,
        row: lines,
        col: cols,
        length: tokenLen
      })
      
      if ((selectionStartChar >= match.index) && 
          (selectionStartChar - match.index < tokenLen)) {
        selectionStartLine = lines
      }

      if ((selectionEndChar >= match.index) && 
          (selectionEndChar - match.index < tokenLen)) {
        selectionEndLine = lines
      }

      if (name == 'newline') {
        lines++
        cols = 0
      }
      else {
        cols += tokenLen
      }

    }
  }
  
  const last = tokens[tokens.length - 1]
  if (last && last.name == 'newline') {
    tokens.push({
      name: 'whitespace',
      text: ' ',
      row: lines,
      col: cols,
      length: 1
    })
  }
  lines++
  return {
    tokens,
    lines,
    selectionStartLine,
    selectionEndLine,
  }
}
