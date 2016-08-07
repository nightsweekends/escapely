/* globals feature */

document.addEventListener('DOMContentLoaded', function loadListener() {
  const dropTarget = document.querySelector('#drop-target');
  const codeOutput = document.querySelector('.code-output');
  const resultsContainer = document.querySelector('.results');

  function addHoverClass(elem) {
    elem.classList.add('hover');
  }

  function removeHoverClass(elem) {
    elem.classList.remove('hover');
  }

  function createCodeOutputElem() {
    const elem = document.createElement('output');
    elem.className = 'code-output';
    return elem;
  }

  function dragEventHandler(e) {
    e.preventDefault();
    commands[e.type](e);
  }

  function dragEnterHandler(e) {
    console.log('dragenter: %o', e);
    e.dataTransfer.dropEffect = 'copy';
    addHoverClass(dropTarget);
  }

  function dragLeaveHandler(e) {
    console.log('dragleave: %o', e);
    removeHoverClass(dropTarget);
  }

  function dragOverHandler(e) {
    // no-op
  }

  function compressHtml(raw) {
    return raw.replace(/(\r\n|\n|\r|\t)/gm,"")
    .replace(/\s+/g," ")
    .replace(/"/g, "'");
  }

  function getTextFromFile(file, cb) {
    let reader = new FileReader();
    reader.addEventListener('loadend', () => {
      cb(reader.error, reader.result);
    });
    reader.readAsText(file);
  }

  function renderTextToElement(text, elem) {
    elem.textContent = text;
  }

  function selectAndCopyAllText(elem) {
    const selectRange = document.createRange();
    selectRange.selectNode(elem);
    window.getSelection().removeAllRanges();
    window.getSelection().addRange(selectRange);
    document.execCommand('copy');
  }

  function dropHandler(e) {
    console.log('drop: %o', e);
    removeHoverClass(dropTarget);

    if (e.dataTransfer.types[0] !== 'Files' || e.dataTransfer.types.length > 1) return;

    const file = e.dataTransfer.files[0];
    console.log('drop, dataTransfer.types: %o', e.dataTransfer.types);
    console.log('drop, sliced dataTransfer.files: %o', [].slice.call(e.dataTransfer.files));
    if (file.type === 'text/html') {
      getTextFromFile(file, (err, result) => {
        if (err) throw new Error(err);
        renderTextToElement(compressHtml(result), codeOutput);
      });
    } else {
      window.alert(`Please use valid HTML instead of this ${file.type} garbage`);
    }
  }

  const commands = {
    dragenter: dragEnterHandler,
    dragleave: dragLeaveHandler,
    dragover: dragOverHandler,
    drop: dropHandler
  };

  ['dragenter', 'dragleave', 'dragover', 'drop'].forEach(type => {
    dropTarget.addEventListener(type, dragEventHandler);
  });

  codeOutput.addEventListener('click', e => {
    e.preventDefault();
    selectAndCopyAllText(e.currentTarget);
  });

  document.removeEventListener('DOMContentLoaded', loadListener);
});


feature.testAll();
