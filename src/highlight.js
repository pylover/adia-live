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
    pattern: /(?<=@.*~ *)\w+/,
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
    pattern: /[:!$%^&*)(+=_][}{;"'?/\\<>,~-]/,
  },
  {
    name: 'whitespace',
    pattern: /\s/
  },
  {
    name: 'other',
    pattern: /\S+/
  },
];

const namedGroupPatterns = [];
for(let i = 0; i < patterns.length; i++){
  let pattern = patterns[i];
  namedGroupPatterns.push(`(?<${pattern.name}>${pattern.pattern.source})`);
}
const wholePattern = new RegExp(namedGroupPatterns.join('|'), 'gmi');


export function tokenize(input, selectionStartChar, selectionEndChar) {
  let lines = 0;
  let matchText;
  let tokenLen = 0;
  const tokens = [];
  
  /* Finding selected lines here to improve the performance and avoid slip
     the content by '\n' and another loop over newline characters. */
  let selectionStartLine = -1;
  let selectionEndLine = -1;

  for (const match of input.matchAll(wholePattern)) {
    for (let name in match.groups) {
      matchText = match.groups[name];
      if (matchText == undefined) {
        continue;
      }
      
      tokenLen = matchText.length;
      tokens.push({
        name: name,
        text: matchText,
        row: lines,
        index: match.index,
        length: tokenLen
      });
      
      if ((selectionStartChar >= match.index) && 
          (selectionStartChar - match.index <= tokenLen)) {
        selectionStartLine = lines;
      }

      if ((selectionEndChar >= match.index) && 
          (selectionEndChar - match.index <= tokenLen)) {
        selectionEndLine = lines;
      }

      if (name == 'newline') {
        lines++;
      }
    }
  }
  
  /* An extra whitespace will be appended to the end of the list to behave 
     like the textarea. */
  const last = tokens[tokens.length - 1];
  if (last && last.name == 'newline') {
    const index = last.index + 1;
    tokens.push({
      name: 'whitespace',
      text: ' ',
      row: lines,
      index: index,
      length: 1
    });
    
    if ((selectionStartChar >= index) && 
        (selectionStartChar - index <= 1)) {
      selectionStartLine = lines;
    }
    if ((selectionEndChar >= index) && 
        (selectionEndChar - index <= 1)) {
      selectionEndLine = lines;
    }
  }

  /* Return the result */
  lines++;
  return {
    tokens,
    lines,
    selectionStartLine,
    selectionEndLine,
  };
}
