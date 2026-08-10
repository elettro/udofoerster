document.addEventListener('DOMContentLoaded',()=>{
  const normalizePath=value=>{
    let normalized=(value||'/').replace(/index\.html$/,'');
    if(!normalized.startsWith('/'))normalized='/'+normalized;
    if(!normalized.endsWith('/'))normalized+='/';
    return normalized.replace(/\/{2,}/g,'/');
  };

  const path=normalizePath(window.location.pathname);
  const isGerman=path==='/de/'||path.startsWith('/de/');
  const nav=document.querySelector('.navlinks');
  const panel=document.querySelector('.mobile-panel');
  const btn=document.querySelector('.menu-btn');
  const header=document.querySelector('.site-header');

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

  const translations={
    '/':'/de/',
    '/de/':'/',
    '/about-udo-foerster/':'/de/ueber-udo-foerster/',
    '/de/ueber-udo-foerster/':'/about-udo-foerster/',
    '/connections/':'/de/verbindungen/',
    '/de/verbindungen/':'/connections/',
    '/communications/':'/de/kommunikation/',
    '/de/kommunikation/':'/communications/',
    '/consulting/':'/de/beratung/',
    '/de/beratung/':'/consulting/',
    '/germany-market-entry/':'/de/markteintritt-deutschland/',
    '/de/markteintritt-deutschland/':'/germany-market-entry/',
    '/north-america-market-entry/':'/de/markteintritt-nordamerika/',
    '/de/markteintritt-nordamerika/':'/north-america-market-entry/',
    '/startup-funding-connections/':'/de/startup-finanzierung/',
    '/de/startup-finanzierung/':'/startup-funding-connections/',
    '/hidden-champions/':'/de/hidden-champions/',
    '/de/hidden-champions/':'/hidden-champions/',
    '/international-business-development/':'/de/internationale-geschaeftsentwicklung/',
    '/de/internationale-geschaeftsentwicklung/':'/international-business-development/'
  };
  const languageTarget=translations[path]||(isGerman?'/':'/de/');
  const englishHref=isGerman?languageTarget:path;
  const germanHref=isGerman?path:languageTarget;
  const homeHref=isGerman?'/de/':'/';
  const advanteamLink='https://elettro.github.io/advanteam/';
  const advanteamLogo='/images/ADVANTEAM_logo_transparent_4000px.png';

  const isActive=href=>{
    if(href==='/media-authority/'||href==='/digital-systems/')return path.startsWith(href);
    return path===href;
  };

  const navLinkMarkup=links.map(([href,label])=>`<a${isActive(href)?' class="active" aria-current="page"':''} href="${href}">${label}</a>`).join('');
  const advanteamMarkup=`<a class="advanteam-nav-link" href="${advanteamLink}" target="_blank" rel="noopener noreferrer" aria-label="${isGerman?'Advanteam Website öffnen':'Visit Advanteam website'}"><img src="${advanteamLogo}" alt="Advanteam" decoding="async"></a>`;
  const languageMarkup=`<span class="language" aria-label="${isGerman?'Sprache':'Language'}"><a${!isGerman?' class="active" aria-current="page"':''} href="${englishHref}" lang="en">EN</a><a${isGerman?' class="active" aria-current="page"':''} href="${germanHref}" lang="de">DE</a></span>`;

  if(nav){
    nav.setAttribute('aria-label',isGerman?'Hauptnavigation':'Primary navigation');
    nav.innerHTML=navLinkMarkup+advanteamMarkup+languageMarkup;
  }

  if(panel){
    panel.id='mobile-navigation';
    panel.setAttribute('aria-hidden','true');
    panel.innerHTML=`<div class="mobile-panel-inner">
      <div class="mobile-menu-primary">
        <a href="${homeHref}">${isGerman?'Startseite':'Home'}</a>
        ${links.map(([href,label])=>`<a${isActive(href)?' class="active" aria-current="page"':''} href="${href}">${label}</a>`).join('')}
      </div>
      <div class="mobile-menu-actions">
        <a class="mobile-contact-link" href="mailto:ufoerster@mein-sanihaus.de">${isGerman?'Udo kontaktieren':'Contact Udo'}</a>
        <a class="advanteam-mobile-link" href="${advanteamLink}" target="_blank" rel="noopener noreferrer" aria-label="${isGerman?'Advanteam Website öffnen':'Visit Advanteam website'}"><img src="${advanteamLogo}" alt="Advanteam" loading="lazy" decoding="async"></a>
        <div class="mobile-language-switch" aria-label="${isGerman?'Sprache':'Language'}">
          <a${!isGerman?' class="active" aria-current="page"':''} href="${englishHref}" lang="en">EN</a>
          <a${isGerman?' class="active" aria-current="page"':''} href="${germanHref}" lang="de">DE</a>
        </div>
      </div>
    </div>`;
  }

  if(btn&&panel){
    btn.setAttribute('aria-controls','mobile-navigation');
    btn.setAttribute('aria-label',isGerman?'Navigation öffnen':'Open navigation');
    btn.querySelectorAll('span').forEach(span=>span.setAttribute('aria-hidden','true'));

    const closeMenu=(returnFocus=false)=>{
      panel.classList.remove('open');
      panel.setAttribute('aria-hidden','true');
      btn.setAttribute('aria-expanded','false');
      btn.setAttribute('aria-label',isGerman?'Navigation öffnen':'Open navigation');
      document.body.classList.remove('menu-open');
      if(returnFocus)btn.focus();
    };
    const openMenu=()=>{
      panel.classList.add('open');
      panel.setAttribute('aria-hidden','false');
      btn.setAttribute('aria-expanded','true');
      btn.setAttribute('aria-label',isGerman?'Navigation schließen':'Close navigation');
      document.body.classList.add('menu-open');
    };

    btn.addEventListener('click',event=>{
      event.stopPropagation();
      if(panel.classList.contains('open'))closeMenu();else openMenu();
    });

    panel.addEventListener('click',event=>{
      if(event.target.closest('a'))closeMenu();
    });

    document.addEventListener('keydown',event=>{
      if(event.key==='Escape'&&panel.classList.contains('open'))closeMenu(true);
    });

    document.addEventListener('click',event=>{
      if(panel.classList.contains('open')&&header&&!header.contains(event.target))closeMenu();
    });

    window.addEventListener('resize',()=>{
      if(window.innerWidth>1120&&panel.classList.contains('open'))closeMenu();
    },{passive:true});
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
      img.width=1600;
      img.height=900;
      img.decoding='async';
      img.loading=i===0?'eager':'lazy';
      img.fetchPriority=i===0?'high':'low';
    });

    let index=0;
    let timer;
    let startX=0;
    let startY=0;
    const reduceMotion=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const warmImage=i=>{
      const img=slides[(i+slides.length)%slides.length]?.querySelector('img');
      if(img){
        img.loading='eager';
        img.fetchPriority='auto';
        if(img.decode)img.decode().catch(()=>{});
      }
    };
    const schedule=()=>{
      clearInterval(timer);
      if(slides.length>1&&!reduceMotion&&!document.hidden)timer=setInterval(()=>show(index+1),5000);
    };
    const show=i=>{
      index=(i+slides.length)%slides.length;
      slides.forEach((slide,n)=>slide.classList.toggle('active',n===index));
      if(dots)[...dots.children].forEach((dot,n)=>dot.classList.toggle('active',n===index));
      warmImage(index);
      warmImage(index+1);
      schedule();
    };

    if(dots&&!dots.children.length){
      slides.forEach((_,i)=>{
        const dot=document.createElement('button');
        dot.type='button';
        dot.className='carousel-dot';
        dot.setAttribute('aria-label',(isGerman?'Bild ':'Show image ')+(i+1));
        dot.addEventListener('click',()=>show(i));
        dots.appendChild(dot);
      });
    }
    if(prev)prev.addEventListener('click',()=>show(index-1));
    if(next)next.addEventListener('click',()=>show(index+1));

    carousel.addEventListener('touchstart',event=>{
      startX=event.changedTouches[0].clientX;
      startY=event.changedTouches[0].clientY;
    },{passive:true});
    carousel.addEventListener('touchend',event=>{
      const dx=event.changedTouches[0].clientX-startX;
      const dy=event.changedTouches[0].clientY-startY;
      if(Math.abs(dx)>45&&Math.abs(dx)>Math.abs(dy))show(index+(dx<0?1:-1));
    },{passive:true});
    document.addEventListener('visibilitychange',schedule);
    show(0);
  });
});
