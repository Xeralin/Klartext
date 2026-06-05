(async function() {
  while (!Spicetify.React) {
    await new Promise(resolve => setTimeout(resolve, 10));
  }

  const replacements = [
    [/\*innen\b/g, ""],
    [/\*in(?=\s|$|[.,!?;:])/g, ""],
    [/\*r\b/g, "r"],
    [/zum\*?zur/g, "zum"],
    [/der\*die/g, "der"],
    [/ein\*e\b/g, "ein"]
  ];

  const quickCheck = /\*/;

  function replaceText(text) {
    if (!quickCheck.test(text)) return text;
    let result = text;
    for (const [pattern, replacement] of replacements) {
      result = result.replace(pattern, replacement);
    }
    return result;
  }

  function processNode(node) {
    if (node.nodeType === Node.TEXT_NODE && node.textContent) {
      const replaced = replaceText(node.textContent);
      if (node.textContent !== replaced) {
        node.textContent = replaced;
      }
    }
  }

  const ATTRS = ["aria-label", "title", "alt", "placeholder"];

  function processAttributes(element) {
    for (const attr of ATTRS) {
      const value = element.getAttribute(attr);
      if (value) {
        const replaced = replaceText(value);
        if (value !== replaced) {
          element.setAttribute(attr, replaced);
        }
      }
    }
  }

  function processElement(element) {
    if (!element || element.nodeType !== Node.ELEMENT_NODE) return;

    const walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT);
    const nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);
    nodes.forEach(processNode);

    processAttributes(element);
    element.querySelectorAll("*").forEach(processAttributes);
  }

  const observer = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.type === "childList") {
        for (const node of mutation.addedNodes) {
          if (node.nodeType === Node.ELEMENT_NODE) {
            processElement(node);
          } else if (node.nodeType === Node.TEXT_NODE) {
            processNode(node);
          }
        }
      } else if (mutation.type === "attributes") {
        const attr = mutation.attributeName;
        if (ATTRS.includes(attr)) {
          const value = mutation.target.getAttribute(attr);
          if (value) {
            const replaced = replaceText(value);
            if (value !== replaced) {
              mutation.target.setAttribute(attr, replaced);
            }
          }
        }
      }
    }
  });

  if (document.body) {
    processElement(document.body);
    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ATTRS
    });
  }
})();