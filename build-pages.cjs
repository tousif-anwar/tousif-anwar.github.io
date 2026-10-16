'use strict';
const fs=require('node:fs');
let parseHTML;
try { ({parseHTML}=require('linkedom')); }
catch { ({parseHTML}=require('./.verification/node_modules/linkedom')); }
const template=fs.readFileSync('site-template.html','utf8');
const pages={home:['index.html','Home'],projects:['projects.html','Projects'],experience:['experience.html','Experience'],skills:['skills.html','Skills'],about:['about.html','About'],videos:['videos.html','Videos'],blog:['blog.html','Blog'],contact:['contact.html','Contact']};
const copy={
  projects:{title:'Engineering projects and case studies',intro:'Six project stories across applied AI, computer vision, cloud data engineering, and application development. Each case study explains the problem, my contribution, and the confirmed scope or outcome. Industry work is labeled separately from research and personal projects.'},
  experience:{title:'Professional experience',intro:'Four roles across financial services, customer-facing mobile software, retail engineering, and business intelligence. Read the dates, technologies, responsibilities, and results for each role. Open a role for the full breakdown of my work and related skills.'},
  skills:{title:'Technical skills and where I use them',intro:'Explore 59 languages, platforms, tools, and engineering practices. Filter by category or search by name, then select a skill to read its purpose and open the related professional experience. The collection includes languages, cloud and data platforms, AI and machine learning, application frameworks, and delivery tools.'},
  about:{title:'About Tousif Anwar',intro:'I am a Philadelphia-based software engineer with experience in Python and PySpark data engineering, React Native mobile applications, full-stack development, and applied AI research. I hold an M.S. in Computer Science from Drexel University and a B.S. in Computer Science from Western Governors University.'},
  videos:{title:'Project explainer videos',intro:'Watch six separate narrated project introductions, each about one minute long. They cover the project problem and the engineering work described in its case study. Each video includes a written summary and a link to the project page. Videos open on Scrimba in a new tab; the full-stack and recommendation-system videos are conceptual introductions.'},
  blog:{title:'Engineering notes and project write-ups',intro:'This page will hold technical articles about implementation decisions, experiments, debugging, and lessons from project work. No articles have been published yet. When available, you will be able to search posts, filter by topic, and share a direct link to an article.'},
  contact:{title:'Contact Tousif Anwar',intro:'Contact me about software engineering roles, backend and data engineering work, or a specific project in this portfolio. Email is the most direct way to start a conversation. My GitHub profile contains public code, and LinkedIn provides another way to connect professionally.'}
};
for(const [key,[file,label]] of Object.entries(pages)){
  const {document}=parseHTML(template); const $=s=>document.querySelector(s);
  document.body.dataset.page=key;
  document.title=key==='home'?'Tousif Anwar | Software Engineer':`${label} | Tousif Anwar`;
  const meta=$('meta[name="description"]');if(copy[key])meta.content=copy[key].intro;
  for(const link of document.querySelectorAll('a[href^="#"]')){
    const id=link.getAttribute('href').slice(1);if(!pages[id])continue;
    link.href=pages[id][0];
    if(link.closest('.nav-links')){link.dataset.section=id;link.classList.toggle('active',id===key);if(id===key)link.setAttribute('aria-current','page');else link.removeAttribute('aria-current');}
  }
  $('.skip-link').href=`#${key}`;
  $('.skip-link').textContent='Skip to page content';
  const main=$('#app main');
  // Inert compatibility nodes supply shared dialog/search data without rendering other pages.
  const scaffold=document.createElement('div');scaffold.id='page-support';scaffold.hidden=true;scaffold.inert=true;scaffold.setAttribute('aria-hidden','true');
  for(const sectionKey of Object.keys(pages)){if(sectionKey!==key){const section=$(`#${sectionKey}`);section.hidden=true;scaffold.append(section);}}
  if(key!=='home'){
    for(const child of [...main.children])if(child.id!==key)scaffold.append(child);
    const section=$(`#${key}`);section.hidden=false;
    const heading=section.querySelector('h2');
    const h1=document.createElement('h1');h1.id=heading.id;h1.textContent=copy[key].title;h1.tabIndex=-1;heading.replaceWith(h1);
    const intro=document.createElement('p');intro.className='page-introduction';intro.textContent=copy[key].intro;
    const titleBlock=section.querySelector('.section-top')||section.querySelector('.about-copy')||section.querySelector('.contact-content');
    if(titleBlock.classList.contains('section-top'))titleBlock.after(intro);else h1.after(intro);
    const breadcrumb=document.createElement('nav');breadcrumb.className='page-breadcrumb';breadcrumb.setAttribute('aria-label','Breadcrumb');breadcrumb.innerHTML=`<a href="index.html">Home</a><span aria-hidden="true">/</span><span aria-current="page">${label}</span>`;
    section.prepend(breadcrumb);
    $('#profiles').hidden=true;$('#intro').hidden=true;document.body.classList.remove('choosing-profile');
    $('#app').classList.add('visible');
    if(key==='experience')section.querySelector('.section-description').textContent='The roles are listed from most recent to earliest. Some dates overlap: Walmart was an internship during the broader Clear One Advantage period. The details below preserve the dates supplied in my résumé.';
    if(key==='skills')section.querySelector('.section-description').textContent='Choose a technology to see how it fits into my work. Related role links open the detailed career story; skill names are not proficiency ratings or certifications.';
    if(key==='blog'){
      $('#blogEmptyTitle').textContent='No articles published yet.';
      $('#blogEmptyText').textContent='Browse the project case studies and written video summaries while this article collection is being prepared.';
      const link=document.createElement('a');link.href='projects.html';link.className='text-link';link.textContent='Read project case studies';$('#blogEmpty').append(link);
    }
    if(key==='contact')section.querySelector('.contact-content>p:not(.overline):not(.page-introduction)').textContent='For a useful first message, include the role or project, the engineering problem, and the best way to reach you. I am based in Philadelphia, Pennsylvania.';
  }
  $('#app').append(scaffold);
  // Specific, readable descriptions on every project card.
  const descriptions={mortgage:'Freelance architecture work on agent runtime, contextual reasoning, and orchestration between conversations and downstream loan workflows.',vision:'Drexel Vision Lab research using PyTorch to compare low-light enhancement with pedestrian detection performance, including preprocessing, augmentation, training, and evaluation.',disaster:'An academic system connecting reinforcement learning-driven drone navigation, mission and sensor data, and LLM-based recovery reporting. This was not an operational emergency deployment.',intelligence:'JPMorgan Chase work on Python and PySpark ETL pipelines, automated data checks, and migration of 25 datasets totaling 40 TB to AWS and Apache Iceberg.',fullstack:'A personal application project spanning interface, server logic, and data. The current case study outlines the scope; repository-specific features and architecture will be added with the source link.',recsys:'A personal project exploring relevant-item discovery. Dataset, ranking method, architecture, and evaluation results are not yet documented; the case study introduces the problem and intended scope.'};
  for(const [id,text] of Object.entries(descriptions))$(`.project-card[data-id="${id}"] .project-body>p`).textContent=text;
  const clearHeadings={projects:'Engineering projects and case studies',experience:'Professional experience',skills:'Technical skills and where I use them',about:'About Tousif Anwar',videos:'Project explainer videos',blog:'Engineering notes and project write-ups',contact:'Contact Tousif Anwar'};
  for(const [id,title] of Object.entries(clearHeadings)){const heading=$(`#${id} h2`);if(heading)heading.textContent=title;}
  const about=$('.about-lead');about.textContent='I build backend and data systems, integrate mobile applications with APIs, and investigate applied machine learning problems. My work connects software delivery with production performance and reliability.';
  for(const asset of document.querySelectorAll('script[src],link[rel="stylesheet"]')){const attr=asset.tagName==='SCRIPT'?'src':'href';asset.setAttribute(attr,asset.getAttribute(attr).split('?')[0]+'?v=pages-20261016');}
  const canonical=document.createElement('link');canonical.rel='canonical';canonical.href='https://tousif-anwar.github.io/'+(key==='home'?'':file);document.head.append(canonical);
  fs.writeFileSync(file,document.toString());
}
console.log('Built eight standalone portfolio pages.');
