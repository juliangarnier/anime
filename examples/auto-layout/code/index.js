import { createLayout, $, stagger, random } from '../../../dist/modules/index.js';

const keywordSet = /^(const|let|var|function|return|if|else|for|while|new|this|true|false|null|undefined|async|await|import|export|from|class|extends)$/;
const tokenRegex = /(['"`])(?:\\.|[^\\])*?\1|[a-zA-Z_$][a-zA-Z0-9_$]*|\s+|[^a-zA-Z_$'"`\s]+/g;

function highlightCode(el) {
  const code = el.textContent;
  const tokens = code.match(tokenRegex) || [];
  const counts = {};
  let html = '';
  for (let i = 0; i < tokens.length; i++) {
    const t = tokens[i];
    if (/^\s+$/.test(t)) {
      html += t;
      continue;
    }
    counts[t] = (counts[t] || 0) + 1;
    const dataAttr = `data-layout-id="${t}-${counts[t]}"`;
    if (/^['"`]/.test(t)) {
      html += `<span class="str" ${dataAttr}>${t}</span>`;
    }
    else if (/^[a-zA-Z_$]/.test(t)) {
      const rest = tokens.slice(i + 1).join('').trimStart();
      const isFunction = rest.startsWith('(');
      const cls = keywordSet.test(t) ? 'kw' : isFunction ? 'fn' : 'var';
      html += `<span class="${cls}" ${dataAttr}>${t}</span>`;
    }
    else {
      html += `<span class="op" ${dataAttr}>${t}</span>`;
    }
  }
  el.innerHTML = html;
}

$('code').forEach(highlightCode);

const layout = createLayout('.container', {
  loop: true,
  alternate: true,
  loopDelay: 500,
  duration: 1000,
  delay: 150,
  ease: 'inOutExpo',
  enterFrom: {
    opacity: 0,
    duration: 1250,
    delay: 300,
  },
  leaveTo: {
    opacity: 0,
    // color: 'var(--white-2)',
    transform: () => `translate(${random(-50, 50)}px, ${random(-200, 200)}px) rotate(${random(-30, 30)}deg)`,
    duration: 750,
    delay: stagger([0, 200], { from: 'random' }),
    ease: 'out(3)'
  }
});

document.fonts.ready.then(() => layout.update(({ root }) => root.classList.toggle('show-animejs')))
