document.addEventListener('DOMContentLoaded',()=>{
  const path=window.location.pathname.replace(/index\.html$/,'');
  const isGerman=path==='/de/'||path.startsWith('/de/');
  const nav=document.querySelector('.navlinks');
  const panel=document.querySelector('.mobile-panel');

  const englishLinks=[
    ['/about-udo-foerster/','About'],
    ['/connections/','Connections'],
    ['/communications/','Communications'],
    ['/consulting/','Consulting'],
    ['/media-authority/','PR'],
    ['/digital-systems/','Digital Systems']
  ];
  const germanLinks=[
    ['/de/ueber-udo-foerster/','Über Udo'],
    ['/de/verbindungen/','Verbindungen'],
    ['/de/kommunikation/','Kommunikation'],
    ['/de/beratung/','Beratung'],
    ['/media-authority/','PR'],
    ['/digital-systems/','Digitale Systeme']
  ];
  const links=isGerman?germanLinks:englishLinks;
  const languageTarget=isGerman?'/':'/de/';
  const languageLabel=isGerman?'EN':'DE';

  const isActive=href=>{
    if(href==='/media-authority/'||href==='/digital-systems/')return path.startsWith(href);
    return path===href;
  };

  if(nav){
    nav.innerHTML=links.map(([href,label])=>`<a${isActive(href)?' class="active"':''} href="${href}">${label}</a>`).join('')+
      `<span class="language"><a href="${languageTarget}" lang="${isGerman?'en':'de'}">${languageLabel}</a></span>`;
  }
  if(panel){
    panel.innerHTML=`<div class="mobile-panel-inner"><a href="${isGerman?'/de/':'/'}">${isGerman?'Startseite':'Home'}</a>${links.map(([href,label])=>`<a href="${href}">${label}</a>`).join('')}<a href="${languageTarget}" lang="${isGerman?'en':'de'}">${isGerman?'English':'Deutsch'}</a></div>`;
  }

  const btn=document.querySelector('.menu-btn');
  if(btn&&panel){
    btn.setAttribute('aria-label',isGerman?'Navigation öffnen':'Open navigation');
    btn.addEventListener('click',()=>{
      const open=panel.classList.toggle('open');
      btn.setAttribute('aria-expanded',open?'true':'false');
      btn.setAttribute('aria-label',open?(isGerman?'Navigation schließen':'Close navigation'):(isGerman?'Navigation öffnen':'Open navigation'));
    });
    panel.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{
      panel.classList.remove('open');
      btn.setAttribute('aria-expanded','false');
    }));
  }

  const footerGrid=document.querySelector('.footergrid');
  if(footerGrid&&!footerGrid.querySelector('.official-address')){
    const address=document.createElement('address');
    address.className='official-address';
    address.innerHTML='<strong>Advanteam</strong><br>Dietrich-Bonhoeffer-Straße 14<br>55268 Nieder-Olm';
    footerGrid.appendChild(address);
  }

  document.querySelectorAll('.dark .card').forEach(card=>{
    card.style.setProperty('background','#102a44','important');
    card.style.setProperty('color','#ffffff','important');
    card.style.setProperty('border-color','rgba(255,255,255,.22)','important');
    card.querySelectorAll('h3').forEach(el=>el.style.setProperty('color','#ffffff','important'));
    card.querySelectorAll('p').forEach(el=>el.style.setProperty('color','#d6e4ee','important'));
  });

  const profileImage=document.querySelector('.profile img');
  if(profileImage){
    profileImage.src='/images/udo-foerster-official.jpg';
    profileImage.width=768;
    profileImage.height=1024;
    profileImage.loading=profileImage.closest('.hero')?'eager':'lazy';
    profileImage.decoding='async';
  }

  const podcastImage=document.querySelector('.podcast img');
  if(podcastImage){
    podcastImage.loading='lazy';
    podcastImage.decoding='async';
    podcastImage.width=1024;
    podcastImage.height=1024;
  }

  document.querySelectorAll('.carousel').forEach(carousel=>{
    const slides=[...carousel.querySelectorAll('.carousel-slide')];
    const prev=carousel.querySelector('.carousel-prev');
    const next=carousel.querySelector('.carousel-next');
    const dots=carousel.querySelector('.carousel-dots');
    if(!slides.length)return;
    slides.forEach((slide,i)=>{
      const img=slide.querySelector('img');
      if(!img)return;
      img.width=1600;img.height=900;img.decoding='async';img.loading=i===0?'eager':'lazy';img.fetchPriority=i===0?'high':'low';
    });
    let index=0,timer,startX=0,startY=0;
    const warmImage=i=>{const img=slides[(i+slides.length)%slides.length]?.querySelector('img');if(img){img.loading='eager';img.fetchPriority='auto';if(img.decode)img.decode().catch(()=>{});}};
    const show=i=>{index=(i+slides.length)%slides.length;slides.forEach((s,n)=>s.classList.toggle('active',n===index));if(dots)[...dots.children].forEach((d,n)=>d.classList.toggle('active',n===index));warmImage(index);warmImage(index+1);clearInterval(timer);if(slides.length>1)timer=setInterval(()=>show(index+1),5000);};
    if(dots&&!dots.children.length)slides.forEach((_,i)=>{const d=document.createElement('button');d.type='button';d.className='carousel-dot';d.setAttribute('aria-label',(isGerman?'Bild ':'Show image ')+(i+1));d.addEventListener('click',()=>show(i));dots.appendChild(d);});
    if(prev)prev.addEventListener('click',()=>show(index-1));
    if(next)next.addEventListener('click',()=>show(index+1));
    carousel.addEventListener('touchstart',e=>{startX=e.changedTouches[0].clientX;startY=e.changedTouches[0].clientY;},{passive:true});
    carousel.addEventListener('touchend',e=>{const dx=e.changedTouches[0].clientX-startX;const dy=e.changedTouches[0].clientY-startY;if(Math.abs(dx)>45&&Math.abs(dx)>Math.abs(dy))show(index+(dx<0?1:-1));},{passive:true});
    show(0);
  });
});