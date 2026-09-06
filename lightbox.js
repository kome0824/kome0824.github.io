/* スクリーンショットの拡大表示（ライトボックス）
   .ss-grid の <a href="画像"> を横取りして、その場に重ねて表示します。
   JSが無効な環境では、これまで通りリンクとして画像が開きます。 */
(function(){
  var links = [].slice.call(document.querySelectorAll('.ss-grid a'));
  if(!links.length) return;

  var box = document.createElement('div');
  box.className = 'lb';
  box.hidden = true;
  box.setAttribute('role', 'dialog');
  box.setAttribute('aria-modal', 'true');
  box.innerHTML = '<button type="button" class="lb-close pixel" aria-label="閉じる">✕</button>'
                + '<img class="lb-img" alt="">';
  document.body.appendChild(box);

  var img = box.querySelector('.lb-img');
  var from = null;

  function open(a){
    var thumb = a.querySelector('img');
    from = a;
    img.src = a.getAttribute('href');
    img.alt = thumb ? thumb.alt : '';
    box.hidden = false;
    document.body.classList.add('lb-lock');
    box.querySelector('.lb-close').focus();
  }
  function close(){
    box.hidden = true;
    img.removeAttribute('src');
    document.body.classList.remove('lb-lock');
    if(from) from.focus();
  }

  links.forEach(function(a){
    a.addEventListener('click', function(e){
      // 修飾キー付きのクリックは「別タブで開く」を尊重してそのまま通す
      if(e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button) return;
      e.preventDefault();
      open(a);
    });
  });

  box.addEventListener('click', function(e){
    if(e.target === img) return;  // 画像そのものをクリックしたときは閉じない
    close();
  });
  document.addEventListener('keydown', function(e){
    if(!box.hidden && (e.key === 'Escape' || e.key === 'Esc')) close();
  });
})();
