'use strict';

const $ = selector => document.querySelector(selector);
const $$ = selector => [...document.querySelectorAll(selector)];
const careers = portfolioContent.careers;
const skillGroups = portfolioContent.skillGroups;
const skillList = skillGroups.flatMap(group => group.skills.map(([id, label, icon, description, related]) => ({ id, label, icon, description, related, group: group.id, category: group.label })));
const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
const storage = {
  read(key, fallback) { try { return JSON.parse(localStorage.getItem(key)) ?? fallback; } catch { return fallback; } },
  write(key, value) { try { localStorage.setItem(key, JSON.stringify(value)); } catch { /* The portfolio also works without storage. */ } }
};

const projects = {
  mortgage: {
    title: 'AI Mortgage Automation', category: 'Industry work / Software architecture',
    lead: 'Making a complex loan origination pipeline work as one connected, intelligent system.',
    tags: ['Agent orchestration', 'LLM applications', 'Distributed systems', 'Workflow automation'],
    sections: [
      ['The challenge', 'Mortgage origination moves through conversations, data capture, decisions, and downstream processing. Fragmented workflows make that handoff harder. This freelance architecture work brings those stages into a coordinated sales pipeline.'],
      ['The engineering', 'Architected an AI-powered platform with agent runtime and cognition systems for contextual reasoning and task execution. Built orchestration infrastructure that connects multi-channel inputs with downstream workflows, using LLM application design and distributed systems principles.'],
      ['My contribution', 'Software architecture, agent runtime design, workflow orchestration, and integration of conversational inputs with processing systems.'],
      ['The focus', 'Scalable, resilient automation that keeps context moving with the work. A look at applied AI as part of an operating system for a business—not just a standalone chat interface.']
    ]
  },
  vision: {
    title: 'Low-Light Computer Vision', category: 'Research / Drexel Vision Lab',
    lead: 'Better-looking images are only part of the story. Can a model actually detect the person in the dark?',
    tags: ['PyTorch', 'Deep learning', 'Image enhancement', 'Pedestrian detection', 'Model evaluation'],
    sections: [
      ['The research question', 'Low-light scenes make both visibility and pedestrian detection difficult. At Drexel Vision Lab, I studied the relationship between image enhancement and downstream detection, including when improving perceptual quality does—or does not—help the detector.'],
      ['The engineering', 'Developed and trained enhancement and detection models in PyTorch, with preprocessing, data augmentation, and end-to-end evaluation pipelines. Benchmarked detection performance alongside image quality metrics to investigate the tradeoffs.'],
      ['My contribution', 'Research on low-light enhancement and pedestrian detection, model development and training, and comparative evaluation of image quality and detection effectiveness.'],
      ['The focus', 'Evaluate against the real task. A visually cleaner image matters only in context; a useful computer vision pipeline has to be measured by how well it supports the decisions that follow.']
    ]
  },
  disaster: {
    title: 'Disaster Response Intelligence', category: 'Academic project / Applications of Machine Learning',
    lead: 'Connecting what an autonomous mission sees with what a response team needs to know.',
    tags: ['Reinforcement learning', 'Autonomous navigation', 'Sensor data', 'LLM reporting'],
    sections: [
      ['The challenge', 'Disaster response teams need current, usable information from changing environments. This academic project explored how autonomous navigation, field intelligence, and reporting can work together to improve situational awareness.'],
      ['The engineering', 'Designed an AI-powered recovery platform combining reinforcement learning-driven drone navigation with a real-time reporting engine. The system transforms mission and sensor data into recovery updates through LLM-based reporting.'],
      ['My contribution', 'Platform design, adaptive navigation workflows, real-time reporting, and integration of perception, reasoning, and reporting into a unified system.'],
      ['The focus', 'Turn raw observations into information that supports coordination and decisions. The project connects machine learning with the practical needs of an emergency response workflow.']
    ]
  },
  intelligence: {
    title: 'Cloud Data Modernization', category: 'Industry work / JPMorgan Chase',
    lead: '25 datasets. 40 TB. A cloud modernization effort built around faster pipelines, dependable data, and production stability.',
    tags: ['Python', 'PySpark', 'AWS', 'Apache Iceberg', 'Data quality'],
    sections: [
      ['The challenge', 'Modernize large datasets while improving the performance and reliability of the pipelines downstream teams depend on. This work at JPMorgan Chase spanned 25 datasets totaling 40 TB.'],
      ['The engineering', 'Engineered Python and PySpark ETL pipelines on AWS with cross-functional teams. Modernized the datasets onto AWS and Apache Iceberg, optimizing extraction and transformation logic.'],
      ['The outcomes', 'Cut pipeline processing time by 40% and supported six analytics initiatives. The dataset modernization reduced transformation runtime by 30%. Automated quality checks helped maintain 99.5% data accuracy and availability.'],
      ['The wider production story', 'Across eight applications, diagnosed recurring failure patterns and automated remediation, eliminating 35% of recurring production incidents. Reliability work and data engineering reinforced the same goal: trusted systems for the teams using them.']
    ]
  },
  fullstack: {
    title: 'Full-Stack Application', category: 'Personal project / Application development',
    lead: 'A personal application project spanning the user interface, server-side logic, and data layer.',
    tags: ['Full-stack development', 'Frontend', 'Backend', 'Application design'],
    sections: [
      ['The project', 'A full-stack application in my project collection, bringing client-side and server-side development into the same product experience.'],
      ['The engineering perspective', 'My professional full-stack work informs how I approach applications: define clear client–server contracts, handle failures explicitly, and think about the path from implementation to release.'],
      ['Connected experience', 'At Clear One Advantage, I co-defined REST contracts and built authenticated integrations across 15 screens. At Walmart, I contributed features across React, Node.js, Spring Boot, Cosmos DB, and Docker.'],
      ['Explore further', 'Explore more of my work on GitHub, or start a conversation about the engineering behind the project.']
    ]
  },
  recsys: {
    title: 'Recommendation System', category: 'Personal project / Recommendation systems',
    lead: 'Exploring how software helps people discover something relevant in a collection of choices.',
    tags: ['Recommendation systems', 'Discovery', 'Machine learning'],
    sections: [
      ['The project', 'A recommendation-system project in my collection, focused on the problem of connecting people with relevant items.'],
      ['The question', 'How should a system decide what is useful to recommend? This project sits at the intersection of data, machine learning, and product discovery.'],
      ['Connected interests', 'My broader AI toolkit includes PyTorch, LLM fine-tuning, RAG, and Spark. My computer vision research at Drexel also informs my interest in evaluating models against the task they support.'],
      ['What I care about', 'Recommendations should help someone make a useful next choice. That product question is what makes recommendation systems interesting to me—not just the model, but the experience around it.']
    ]
  }
};

const story = [
  { label: '01 / THE FOUNDATION', title: 'Start with the right question.', text: "I'm Tousif Anwar. At TriPoint Lending, I turned stakeholder needs into requirements, documentation, and delivery plans. Twenty working sessions helped reduce requirement-related rework by 25%—a foundation that still shapes how I engineer.", stat: 'TRIPOINT LENDING · REQUIREMENTS → DELIVERY' },
  { label: '02 / THE EXPERIENCE', title: 'Build it once. Make it work for people.', text: 'At Clear One Advantage, I launched a shared React Native app for iOS and Android serving 5,000 users. Crash instrumentation helped reduce the crash rate from 2.5% to 0.5%, while a stronger release process cut the cycle from 14 days to seven.', stat: '5,000 USERS · TWO PLATFORMS · SEVEN-DAY RELEASES' },
  { label: '03 / THE SCALE', title: 'Ship the feature. See the failure.', text: 'During my Walmart internship, I shipped three full-stack features reaching millions of customers. Java, Spring Boot, and React monitoring tools helped cut incident detection time by 30%. The lesson: product features and production visibility belong together.', stat: 'WALMART · FULL STACK · OBSERVABILITY' },
  { label: '04 / THE SYSTEM', title: 'Stronger systems. Better foundations.', text: 'At JPMorgan Chase, Python and PySpark work cut pipeline processing time by 40% and helped modernize 40 TB onto AWS and Iceberg. Across eight applications, automated remediation eliminated 35% of recurring incidents. That is the through line: connect the business problem to measurable engineering outcomes.', stat: 'DREXEL MS · WGU BS · BACKEND, MOBILE & AI' }
];

let activeProfile = 'visitor';
let appEntered = false;
let transitioning = false;
let introTimer = 0;
let introExitTimer = 0;
let introPrepareFrame = 0;
let introStartFrame = 0;
let introSequence = 0;
const introDuration = 2400;
let currentProject = null;
let activeFilter = 'all';
let savedOnly = false;
const storedList = storage.read('devflix-list', []);
const saved = new Set(Array.isArray(storedList) ? storedList.filter(id => Object.hasOwn(projects, id)) : []);
let motionOn = !motionPreference.matches && storage.read('devflix-motion', true) !== false;

function applyMotion() {
  document.body.classList.toggle('motion-off', !motionOn);
  $('#motionToggle').setAttribute('aria-pressed', String(motionOn));
  $('#motionToggle').setAttribute('aria-label', motionOn ? 'Turn animations off' : 'Turn animations on');
  $('.motion-label').textContent = motionOn ? 'Motion on' : 'Motion off';
  if (!motionOn && transitioning) finishIntro();
  if (!motionOn && $('#storyDialog').open) pauseStory(true);
  syncCanvas();
}

function clearIntroPlayback() {
  introSequence++;
  clearTimeout(introTimer);
  clearTimeout(introExitTimer);
  cancelAnimationFrame(introPrepareFrame);
  cancelAnimationFrame(introStartFrame);
  introPrepareFrame = 0;
  introStartFrame = 0;
}

function hideIntro() {
  clearTimeout(introExitTimer);
  $('#intro').hidden = true;
  $('#intro').classList.remove('playing', 'leaving');
  document.body.classList.remove('intro-playing');
  syncCanvas();
}

async function prepareIntro(sequence) {
  // Decode before playback; two frame boundaries let the browser prepare the layers.
  await Promise.all($$('#intro img').map(image => typeof image.decode === 'function' ? image.decode().catch(() => {}) : Promise.resolve()));
  if (sequence !== introSequence || !transitioning || !motionOn) return;
  introPrepareFrame = requestAnimationFrame(() => {
    if (sequence !== introSequence || !transitioning) return;
    introStartFrame = requestAnimationFrame(() => {
      if (sequence !== introSequence || !transitioning) return;
      $('#intro').classList.add('playing');
      // Animation completion is authoritative; the timer covers interrupted CSS events.
      introTimer = window.setTimeout(finishIntro, introDuration + 300);
    });
  });
}

function setProfile(type) {
  activeProfile = type === 'recruiter' ? 'recruiter' : 'visitor';
  document.body.dataset.profile = activeProfile;
  $('#miniAvatar').classList.toggle('recruiter', activeProfile === 'recruiter');
  $('#switchProfile').setAttribute('aria-label', `Switch viewing profile, currently ${activeProfile}`);
  $('#heroDescription').textContent = activeProfile === 'recruiter'
    ? "I'm Tousif Anwar, a software engineer across backend systems, cloud data platforms, and mobile products. My work spans 40 TB of data at JPMorgan Chase, an app serving 5,000 users, and full-stack delivery at Walmart."
    : "I'm Tousif Anwar. I connect the business problem to the engineering behind it—from Python and PySpark data platforms to mobile experiences, full-stack applications, and AI.";
  const main = $('#app main');
  const experience = $('#experience');
  const projectsSection = $('#projects');
  // Both profiles retain the full portfolio, while the first collection reflects their intent.
  if (activeProfile === 'recruiter') main.insertBefore(experience, projectsSection);
  else main.insertBefore(projectsSection, experience);
  projectsSection.classList.toggle('projects-section', activeProfile === 'visitor');
  experience.classList.toggle('first-collection', activeProfile === 'recruiter');
  measureSections();
}

function selectProfile(type) {
  if (transitioning) return;
  setProfile(type);
  window.scrollTo({ top: 0, behavior: 'instant' });
  enterApp();
  if (linkedSection && $('#app').contains(linkedSection)) requestAnimationFrame(() => linkedSection.scrollIntoView({ behavior: 'instant' }));
}

function startIntro() {
  clearIntroPlayback();
  transitioning = true;
  $('#app').inert = true;
  $('#app').setAttribute('aria-hidden', 'true');
  $('#app').classList.remove('visible');
  appEntered = false;
  $('#profiles').hidden = true;
  $('#profiles').inert = true;
  $('#intro').hidden = false;
  $('#intro').classList.remove('playing', 'leaving');
  document.body.classList.add('intro-playing');
  syncCanvas();
  $('#skipIntro').focus({ preventScroll: true });
  if (!motionOn) { finishIntro(); return; }
  prepareIntro(introSequence);
}

function enterApp() {
  $('#profiles').hidden = true;
  $('#profiles').inert = true;
  $('#app').inert = false;
  $('#app').removeAttribute('aria-hidden');
  $('#app').classList.add('visible');
  document.body.classList.remove('choosing-profile');
  appEntered = true;
  $$('.reveal').forEach(el => revealObserver.observe(el));
  $('.nav-links a[href="#home"]').focus({ preventScroll: true });
  updateScroll();
  syncCanvas();
}

function finishIntro() {
  clearIntroPlayback();
  const hasIntro = !$('#intro').hidden;
  transitioning = false;
  appEntered = false;
  $('#profiles').hidden = false;
  $('#profiles').inert = false;
  $('#profiles').classList.remove('exit');
  document.body.classList.add('choosing-profile');
  $('button[data-profile="visitor"]').focus({ preventScroll: true });
  if (hasIntro && motionOn) {
    $('#intro').classList.add('leaving');
    introExitTimer = window.setTimeout(hideIntro, 360);
  } else hideIntro();
}

function switchProfile() {
  clearIntroPlayback();
  transitioning = false;
  appEntered = false;
  hideIntro();
  $('#app').classList.remove('visible');
  $('#app').inert = true;
  $('#app').setAttribute('aria-hidden', 'true');
  $('#profiles').hidden = false;
  $('#profiles').inert = false;
  $('#profiles').classList.remove('exit');
  document.body.classList.add('choosing-profile');
  window.scrollTo({ top: 0, behavior: 'instant' });
  $(`button[data-profile="${activeProfile}"]`).focus({ preventScroll: true });
  syncCanvas();
}

let toastTimer;
function toast(message) {
  $('#toast').textContent = message;
  $('#toast').classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => $('#toast').classList.remove('show'), 2600);
}

function updateSaved() {
  $('#savedCount').textContent = saved.size;
  $$('[data-save]').forEach(button => {
    const id = button.dataset.save;
    button.setAttribute('aria-pressed', String(saved.has(id)));
    button.setAttribute('aria-label', `${saved.has(id) ? 'Remove' : 'Save'} ${projects[id].title} ${saved.has(id) ? 'from' : 'to'} my list`);
    button.querySelector('use').setAttribute('href', saved.has(id) ? '#i-check' : '#i-plus');
  });
  if (currentProject) {
    $('#modalSave span').textContent = saved.has(currentProject) ? 'Added to my list' : 'Add to my list';
    $('#modalSave use').setAttribute('href', saved.has(currentProject) ? '#i-check' : '#i-plus');
    $('#modalSave').setAttribute('aria-pressed', String(saved.has(currentProject)));
  }
  filterProjects();
}

function toggleSaved(id) {
  if (saved.has(id)) { saved.delete(id); toast('Removed from your list'); }
  else { saved.add(id); toast('Added to your list'); }
  storage.write('devflix-list', [...saved]);
  updateSaved();
}

function filterProjects() {
  let count = 0;
  $$('.project-card').forEach(card => {
    const visible = (activeFilter === 'all' || card.dataset.category === activeFilter) && (!savedOnly || saved.has(card.dataset.id));
    card.hidden = !visible;
    if (visible) { count++; if (appEntered) revealObserver.observe(card); }
  });
  $('#emptyProjects').hidden = count > 0;
}

function openDialog(dialog) {
  dialog.showModal();
  document.body.classList.add('modal-open');
  syncCanvas();
}

function showDetail(id) {
  const item = projects[id];
  if (!item) return;
  if ($('#searchDialog').open) $('#searchDialog').close();
  currentProject = id;
  $('#modalTitle').textContent = item.title;
  $('#modalCategory').textContent = item.category;
  $('#modalLead').textContent = item.lead;
  const repository = projectRepository(id);
  $('#modalRepository').href = repository || 'https://github.com/tousif-anwar?tab=repositories';
  $('#modalRepository').textContent = repository ? 'View repository ↗' : 'Browse GitHub ↗';
  $('#modalRepositoryNote').textContent = repository ? 'Explore the project source on GitHub.' : 'Project repository link coming soon. Browse my public repositories in the meantime.';
  const watch = $('#modalWatch');
  watch.hidden = !window.portfolioJournal?.hasVideo(id);
  watch.onclick = () => window.portfolioJournal?.showProjectVideo(id);
  $('#modalTags').replaceChildren(...item.tags.map(tag => { const span = document.createElement('span'); span.textContent = tag; return span; }));
  $('#modalSections').replaceChildren(...item.sections.map(([heading, text]) => {
    const section = document.createElement('section');
    const h3 = document.createElement('h3'); h3.textContent = heading;
    const p = document.createElement('p'); p.textContent = text;
    section.append(h3, p); return section;
  }));
  const art = $(`.project-card[data-id="${id}"] .project-art`).cloneNode(true);
  art.removeAttribute('data-detail');
  art.removeAttribute('aria-label');
  art.tabIndex = -1;
  $('#modalArt').replaceChildren(art);
  $('#detailDialog').scrollTop = 0;
  updateSaved();
  openDialog($('#detailDialog'));
}

document.addEventListener('portfolio:project-detail', event => {
  if (projects[event.detail?.id]) showDetail(event.detail.id);
});

let currentCareerIndex = 0;
function createTextElement(tag, text, className) {
  const element = document.createElement(tag); element.textContent = text;
  if (className) element.className = className;
  return element;
}

function showCareer(id) {
  const index = careers.findIndex(career => career.id === id);
  if (index < 0) return;
  currentCareerIndex = index;
  const career = careers[index];
  $('#careerChapter').textContent = `CHAPTER 0${index + 1} / ${career.chapter}`;
  $('#careerCompany').textContent = career.company;
  $('#careerCompany').className = `company-mark ${career.markClass}`;
  $('#careerTitle').textContent = career.title;
  $('#careerSpecialty').textContent = career.specialty;
  $('#careerDates').textContent = career.dates;
  $('#careerLocation').textContent = career.location;
  $('#careerSummary').textContent = career.summary;
  $('#careerTakeaway').textContent = career.takeaway;
  $('#careerCounter').textContent = `0${index + 1} / 0${careers.length}`;
  $('#careerPrev').disabled = index === 0;
  $('#careerNext').disabled = index === careers.length - 1;
  $('#careerMetrics').replaceChildren(...career.metrics.map(([value, label]) => {
    const metric = document.createElement('div'); metric.append(createTextElement('strong', value), createTextElement('span', label)); return metric;
  }));
  $('#careerGroups').replaceChildren(...career.groups.map(([heading, bullets], groupIndex) => {
    const details = document.createElement('details'); details.open = groupIndex === 0;
    const summary = createTextElement('summary', heading); summary.append(createTextElement('span', '+'));
    const list = document.createElement('ul'); list.append(...bullets.map(text => createTextElement('li', text)));
    details.append(summary, list); return details;
  }));
  $('#careerSkills').replaceChildren(...skillList.filter(skill => skill.related.includes(id)).map(skill => {
    const button = createTextElement('button', skill.label); button.dataset.skillJump = skill.id; return button;
  }));
  for (const dialog of $$('dialog')) if (dialog.open && dialog.id !== 'careerDialog') dialog.close();
  if (!$('#careerDialog').open) openDialog($('#careerDialog'));
  $('#careerDialog').scrollTop = 0;
}

let selectedSkill = 'python';
let activeSkillFilter = 'all';
function selectSkill(id) {
  const skill = skillList.find(item => item.id === id);
  if (!skill) return;
  $(`[data-skill="${selectedSkill}"]`)?.setAttribute('aria-pressed', 'false');
  selectedSkill = id;
  $(`[data-skill="${id}"]`).setAttribute('aria-pressed', 'true');
  const icon = document.createElement('img'); icon.src = `assets/skills/${skill.icon}.svg`; icon.alt = ''; icon.width = 32; icon.height = 32; icon.className = `skill-icon logo-${skill.icon}`;
  $('#inspectorIcon').replaceChildren(icon);
  $('#inspectorName').textContent = skill.label;
  $('#inspectorCategory').textContent = skill.category;
  $('#inspectorDescription').textContent = skill.description;
  const context = createTextElement('span', skill.related.length ? 'SEE IT IN THE STORY' : 'PART OF MY BROADER TOOLKIT', 'inspector-context-label');
  $('#inspectorLinks').replaceChildren(context, ...skill.related.map(careerId => {
    const career = careers.find(item => item.id === careerId);
    const button = createTextElement('button', `${career.company} →`, 'inspector-career'); button.dataset.career = careerId; return button;
  }));
  if (!skill.related.length) $('#inspectorLinks').append(createTextElement('p', 'Explore my projects and research for the wider engineering context.', 'inspector-context-note'));
}

function filterSkills() {
  const terms = $('#skillSearch').value.trim().toLowerCase().split(/\s+/).filter(Boolean);
  const visibleSkills = skillList.filter(skill => (activeSkillFilter === 'all' || activeSkillFilter === skill.group) && terms.every(term => `${skill.label} ${skill.category} ${skill.description}`.toLowerCase().includes(term)));
  const visibleIds = new Set(visibleSkills.map(skill => skill.id));
  $$('[data-skill]').forEach(tile => { tile.hidden = !visibleIds.has(tile.dataset.skill); });
  $$('[data-skill-group]').forEach(group => { group.hidden = !visibleSkills.some(skill => skill.group === group.dataset.skillGroup); });
  $('#skillsEmpty').hidden = visibleSkills.length > 0;
  $('#skillInspector').hidden = visibleSkills.length === 0;
  $('#skillResults').textContent = visibleSkills.length === skillList.length ? `Showing all ${skillList.length} skills.` : `Showing ${visibleSkills.length} of ${skillList.length} skills.`;
  if (visibleSkills.length && !visibleIds.has(selectedSkill)) selectSkill(visibleSkills[0].id);
}

function resetSkills() {
  activeSkillFilter = 'all'; $('#skillSearch').value = '';
  $$('[data-skill-filter]').forEach(button => { button.classList.toggle('active', button.dataset.skillFilter === 'all'); button.setAttribute('aria-pressed', String(button.dataset.skillFilter === 'all')); });
  filterSkills();
}

const searchable = [
  ...careers.map(career => ({ title: `${career.company} · ${career.title}`, category: `${career.dates} · ${career.specialty}`, text: career.summary + ' ' + career.tags.join(' ') + ' ' + career.groups.map(group => group.flat().join(' ')).join(' '), career: career.id })),
  ...Object.entries(projects).map(([id, item]) => ({ title: item.title, category: item.category, text: item.lead + ' ' + item.tags.join(' ') + ' ' + item.sections.flat().join(' '), id })),
  { title: 'Experience & career', category: 'JPMorgan Chase · Clear One Advantage · Walmart · TriPoint Lending', text: 'backend engineer python pyspark mobile software business intelligence analyst work career jobs', section: '#experience' },
  { title: 'The engineering toolkit', category: 'Languages, frameworks, data & cloud', text: $('#skills').textContent, section: '#skills' },
  { title: 'About Tousif & education', category: 'Drexel University · Western Governors University', text: $('#about').textContent, section: '#about' },
  { title: 'Start a conversation', category: 'ta686@drexel.edu · Philadelphia, PA', text: 'contact email hello connect hire', section: '#contact' }
];
document.addEventListener('portfolio:modal', syncCanvas);
document.addEventListener('portfolio:content', event => {
  for (let index = searchable.length - 1; index >= 0; index--) if (searchable[index].journalPost) searchable.splice(index, 1);
  event.detail.posts.forEach(post => searchable.push({ title: post.title, category: `Engineering notes · ${post.category || 'Engineering'}`, text: `${post.excerpt || ''} ${post.body || ''}`, journalPost: post.slug }));
  measureSections();
});

function renderSearch() {
  const query = $('#searchInput').value.trim().toLowerCase();
  const terms = query.split(/\s+/).filter(Boolean);
  const results = searchable.filter(item => terms.every(term => `${item.title} ${item.category} ${item.text}`.toLowerCase().includes(term)));
  $('#searchResults').replaceChildren();
  if (!results.length) {
    const p = document.createElement('p'); p.className = 'search-empty'; p.textContent = 'No matching stories. Try a skill, a company, or a project.'; $('#searchResults').append(p); return;
  }
  results.forEach(item => {
    const button = document.createElement('button'); button.className = 'search-result';
    const text = document.createElement('div'); const title = document.createElement('strong'); title.textContent = item.title;
    const category = document.createElement('small'); category.textContent = item.category; text.append(title, category);
    const arrow = document.createElement('span'); arrow.textContent = '↗'; button.append(text, arrow);
    button.addEventListener('click', () => {
      if (item.journalPost) { $('#searchDialog').close(); window.portfolioJournal?.showPost(item.journalPost); }
      else if (item.career) showCareer(item.career);
      else if (item.id) showDetail(item.id);
      else { $('#searchDialog').close(); $(item.section).scrollIntoView({ behavior: motionOn ? 'smooth' : 'instant', block: 'start' }); }
    });
    $('#searchResults').append(button);
  });
}

let storyIndex = 0;
let storyElapsed = 0;
let storyPaused = false;
let storyFrame = 0;
let storyLastTime = 0;
const storyProgressBars = $$('#storyProgress>span');
let lastStoryProgressTime = 0;
const chapterDuration = 15000;

function renderStory(animate = true) {
  const item = story[storyIndex];
  $('#storyLabel').textContent = item.label;
  $('#storyTitle').textContent = item.title;
  $('#storyText').textContent = item.text;
  $('#storyStat').textContent = item.stat;
  $('#storyCounter').textContent = `0${storyIndex + 1} / 04`;
  $('#storyPrev').disabled = storyIndex === 0;
  $('#storyNext').disabled = storyIndex === story.length - 1;
  if (animate && motionOn) { $('.story-content').classList.remove('is-changing'); void $('.story-content').offsetWidth; $('.story-content').classList.add('is-changing'); }
  updateStoryProgress();
}

function updateStoryProgress() {
  storyProgressBars.forEach((bar, index) => bar.style.setProperty('--story-progress', index < storyIndex ? '1' : index === storyIndex ? Math.min(storyElapsed / chapterDuration, 1).toString() : '0'));
}

function storyTick(time) {
  if (!$('#storyDialog').open || storyPaused || document.hidden) { storyFrame = 0; return; }
  if (storyLastTime) storyElapsed += Math.min(time - storyLastTime, 100);
  storyLastTime = time;
  if (storyElapsed >= chapterDuration) {
    if (storyIndex < story.length - 1) { storyIndex++; storyElapsed = 0; renderStory(); }
    else { storyElapsed = chapterDuration; updateStoryProgress(); pauseStory(true); return; }
  }
  if (time - lastStoryProgressTime >= 50) { updateStoryProgress(); lastStoryProgressTime = time; }
  storyFrame = requestAnimationFrame(storyTick);
}

function pauseStory(paused) {
  storyPaused = paused;
  $('#storyPause').textContent = paused ? 'Play story' : 'Pause story';
  cancelAnimationFrame(storyFrame); storyFrame = 0; storyLastTime = 0;
  if (!paused && $('#storyDialog').open && !document.hidden) {
    if (storyIndex === story.length - 1 && storyElapsed >= chapterDuration) { storyIndex = 0; storyElapsed = 0; renderStory(); }
    storyFrame = requestAnimationFrame(storyTick);
  }
}

function moveStory(direction) {
  const next = Math.max(0, Math.min(story.length - 1, storyIndex + direction));
  if (next === storyIndex) return;
  storyIndex = next; storyElapsed = 0; storyLastTime = 0; renderStory();
}

// Staggered reveals and offscreen animation suspension share one visibility signal.
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting || !appEntered) return;
    entry.target.classList.add('is-visible');
    revealObserver.unobserve(entry.target);
  });
}, { threshold: .08 });

let heroInView = true;
const activityObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    entry.target.classList.toggle('in-view', entry.isIntersecting);
    if (entry.target.id === 'home') { heroInView = entry.isIntersecting; syncCanvas(); }
  });
}, { threshold: 0 });

// Paint the ribbon field once per size; the compositor moves the cached texture.
const canvas = $('#heroCanvas');
const context = canvas.getContext('2d');
let canvasWidth = 0;
let canvasHeight = 0;
const particles = Array.from({ length: 30 }, (_, i) => ({ x: ((i * 73) % 997) / 997, y: ((i * 137) % 991) / 991, size: .5 + i % 3 * .4 }));

function resizeCanvas() {
  const rect = $('#home').getBoundingClientRect();
  if (canvasWidth === rect.width && canvasHeight === rect.height) return;
  canvasWidth = rect.width; canvasHeight = rect.height;
  const ratio = Math.min(window.devicePixelRatio || 1, 1.25, 1800 / canvasWidth);
  canvas.width = Math.round(canvasWidth * ratio); canvas.height = Math.round(canvasHeight * ratio);
  if (context) context.setTransform(ratio, 0, 0, ratio, 0, 0);
  drawCanvas();
}

function drawCanvas() {
  if (!context || !canvasWidth) return;
  context.clearRect(0, 0, canvasWidth, canvasHeight);
  const x = canvasWidth * .78;
  const y = canvasHeight * .44;
  const glow = context.createRadialGradient(x, y, 0, x, y, canvasWidth * .48);
  glow.addColorStop(0, '#8f112a28'); glow.addColorStop(.45, '#4b081418'); glow.addColorStop(1, '#00000000');
  context.fillStyle = glow; context.fillRect(0, 0, canvasWidth, canvasHeight);
  context.save(); context.translate(x, y); context.rotate(-.28);
  for (let i = 0; i < 26; i++) {
    const wave = Math.sin(i * .13) * 25;
    const radius = canvasWidth * (.13 + i * .006);
    context.beginPath();
    context.ellipse(wave * .3, wave, radius * 1.5, radius * .67, i * .007, -.9, 4.5);
    context.strokeStyle = `rgba(${140 + i * 2},${20 + i % 7 * 3},${39 + i % 5 * 5},${.035 + Math.sin(i * .4) * .018})`;
    context.lineWidth = i % 7 === 0 ? 1.3 : .6; context.stroke();
    if (i % 5 === 0) {
      const angle = i * .8;
      const px = Math.cos(angle) * radius * 1.5;
      const py = Math.sin(angle) * radius * .67 + wave;
      context.beginPath(); context.arc(px, py, 1.2, 0, Math.PI * 2); context.fillStyle = '#f34b6680'; context.fill();
    }
  }
  context.restore();
  particles.forEach(particle => {
    const py = particle.y * canvasHeight;
    context.beginPath(); context.arc(particle.x * canvasWidth, py, particle.size, 0, Math.PI * 2);
    context.fillStyle = particle.x > .45 ? '#eeadb42b' : '#eeadb409'; context.fill();
  });
}

function syncCanvas() {
  canvas.classList.toggle('is-animating', motionOn && appEntered && heroInView && !document.hidden && !document.body.classList.contains('modal-open') && !document.body.classList.contains('intro-playing'));
}

const navItems = $$('.nav-links a').map(link => ({ link, section: $(link.getAttribute('href')) }));
let sectionPositions = [];
let currentNavSection = '';
function measureSections() {
  sectionPositions = navItems.map(item => ({ ...item, top: item.section.getBoundingClientRect().top + window.scrollY })).sort((a, b) => a.top - b.top);
}

let scrollScheduled = false;
function updateScroll() {
  // Read geometry before changing styles, avoiding forced layout during scrolling.
  const y = window.scrollY;
  const total = document.documentElement.scrollHeight - window.innerHeight;
  let active = '#home';
  sectionPositions.forEach(item => {
    if (item.top <= y + window.innerHeight * .35) active = `#${item.section.id}`;
  });
  $('#navbar').classList.toggle('scrolled', y > 25);
  $('#scrollProgress').style.transform = `scaleX(${total > 0 ? Math.min(y / total, 1) : 0})`;
  if (active !== currentNavSection) navItems.forEach(({ link }) => {
    const isActive = link.getAttribute('href') === active;
    link.classList.toggle('active', isActive);
    if (isActive) link.setAttribute('aria-current', 'location'); else link.removeAttribute('aria-current');
  });
  currentNavSection = active;
  scrollScheduled = false;
}

$$('[data-profile]').forEach(button => button.addEventListener('click', () => selectProfile(button.dataset.profile)));
$('#skipIntro').addEventListener('click', finishIntro);
$('#intro').addEventListener('animationend', event => {
  if (event.target === $('.intro-mark') && event.animationName === 'identGlide' && transitioning) finishIntro();
  if (event.target === $('#intro') && event.animationName === 'introDissolve') hideIntro();
});
$('#switchProfile').addEventListener('click', switchProfile);
$('#replayIntro').addEventListener('click', () => {
  if (!motionOn) { toast('Turn motion on to replay the cinematic intro'); return; }
  startIntro();
});
$('#motionToggle').addEventListener('click', () => { motionOn = !motionOn; storage.write('devflix-motion', motionOn); applyMotion(); });
motionPreference.addEventListener('change', event => { motionOn = !event.matches && storage.read('devflix-motion', true) !== false; applyMotion(); });
$$('[data-detail]').forEach(button => button.addEventListener('click', () => showDetail(button.dataset.detail)));
$$('[data-save]').forEach(button => button.addEventListener('click', () => toggleSaved(button.dataset.save)));
$('#modalSave').addEventListener('click', () => { if (currentProject) toggleSaved(currentProject); });
$$('[data-filter]').forEach(button => button.addEventListener('click', () => {
  activeFilter = button.dataset.filter;
  $$('[data-filter]').forEach(filter => { filter.classList.toggle('active', filter === button); filter.setAttribute('aria-pressed', String(filter === button)); });
  filterProjects();
}));
$('#savedFilter').addEventListener('click', () => { savedOnly = !savedOnly; $('#savedFilter').setAttribute('aria-pressed', String(savedOnly)); filterProjects(); });
$$('[data-scroll]').forEach(button => button.addEventListener('click', () => {
  const width = $('.experience-card').getBoundingClientRect().width + 16;
  $('#experienceRow').scrollBy({ left: Number(button.dataset.scroll) * width, behavior: motionOn ? 'smooth' : 'instant' });
}));
$('#openSearch').addEventListener('click', () => { $('#searchInput').value = ''; renderSearch(); openDialog($('#searchDialog')); $('#searchInput').focus(); });
$('#searchInput').addEventListener('input', renderSearch);
document.addEventListener('click', event => {
  const careerButton = event.target.closest('[data-career]');
  if (careerButton) { showCareer(careerButton.dataset.career); return; }
  const jump = event.target.closest('[data-skill-jump]');
  if (jump) {
    $('#careerDialog').close(); resetSkills(); selectSkill(jump.dataset.skillJump);
    $('#skills').scrollIntoView({ behavior: motionOn ? 'smooth' : 'instant', block: 'start' });
    $(`[data-skill="${jump.dataset.skillJump}"]`).focus({ preventScroll: true });
  }
});
$('#careerPrev').addEventListener('click', () => { if (currentCareerIndex > 0) showCareer(careers[currentCareerIndex - 1].id); });
$('#careerNext').addEventListener('click', () => { if (currentCareerIndex < careers.length - 1) showCareer(careers[currentCareerIndex + 1].id); });
$('#careerDialog').addEventListener('keydown', event => {
  if (event.key === 'ArrowLeft' && currentCareerIndex > 0) showCareer(careers[currentCareerIndex - 1].id);
  if (event.key === 'ArrowRight' && currentCareerIndex < careers.length - 1) showCareer(careers[currentCareerIndex + 1].id);
});
$$('[data-skill-filter]').forEach(button => button.addEventListener('click', () => {
  activeSkillFilter = button.dataset.skillFilter;
  $$('[data-skill-filter]').forEach(item => { item.classList.toggle('active', item === button); item.setAttribute('aria-pressed', String(item === button)); });
  filterSkills();
}));
$$('[data-skill]').forEach(button => button.addEventListener('click', () => selectSkill(button.dataset.skill)));
$('#skillSearch').addEventListener('input', filterSkills);
$('#resetSkills').addEventListener('click', resetSkills);
$('#playShowreel').addEventListener('click', () => {
  storyIndex = 0; storyElapsed = 0; storyLastTime = 0; renderStory(false);
  openDialog($('#storyDialog')); pauseStory(!motionOn);
});
$('#storyPrev').addEventListener('click', () => moveStory(-1));
$('#storyNext').addEventListener('click', () => moveStory(1));
$('#storyPause').addEventListener('click', () => pauseStory(!storyPaused));
$('#storyDialog').addEventListener('keydown', event => { if (event.key === 'ArrowRight') moveStory(1); if (event.key === 'ArrowLeft') moveStory(-1); });
$('#storyDialog').addEventListener('close', () => pauseStory(true));
$$('dialog').forEach(dialog => {
  dialog.querySelector('.modal-close').addEventListener('click', () => dialog.close());
  // Close only on a true backdrop hit, including when the content itself is scrollable.
  dialog.addEventListener('click', event => {
    const rect = dialog.getBoundingClientRect();
    if (event.target === dialog && (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom)) dialog.close();
  });
  dialog.addEventListener('close', () => { document.body.classList.toggle('modal-open', $$('dialog').some(item => item.open)); syncCanvas(); });
});
$('#copyEmail').addEventListener('click', async () => {
  try { await navigator.clipboard.writeText('ta686@drexel.edu'); $('#copyStatus').textContent = 'Email copied. Say hello whenever you’re ready.'; }
  catch { $('#copyStatus').textContent = 'Email: ta686@drexel.edu — select and copy this address.'; }
});
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && transitioning) finishIntro();
  if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k' && appEntered && !$$('dialog').some(dialog => dialog.open)) { event.preventDefault(); $('#openSearch').click(); }
});
window.addEventListener('scroll', () => { if (!scrollScheduled) { scrollScheduled = true; requestAnimationFrame(updateScroll); } }, { passive: true });
const layoutObserver = new ResizeObserver(() => { resizeCanvas(); measureSections(); updateScroll(); });
layoutObserver.observe($('#home'));
layoutObserver.observe($('#app main'));
document.addEventListener('visibilitychange', () => {
  document.body.classList.toggle('page-hidden', document.hidden);
  syncCanvas();
  if (document.hidden) { cancelAnimationFrame(storyFrame); storyFrame = 0; storyLastTime = 0; }
  else if ($('#storyDialog').open && !storyPaused) { storyLastTime = 0; storyFrame = requestAnimationFrame(storyTick); }
});
$$('.project-card').forEach((card, index) => {
  card.style.setProperty('--reveal-delay', `${index % 4 * 65}ms`);
  activityObserver.observe(card);
});
$$('.skill-panel,.education-card').forEach((panel, index) => panel.style.setProperty('--reveal-delay', `${index % 3 * 80}ms`));

document.documentElement.classList.add('js-ready');
$('#app').inert = true;
$('#app').setAttribute('aria-hidden', 'true');
$('#year').textContent = new Date().getFullYear();
resizeCanvas();
applyMotion();
updateSaved();
activityObserver.observe($('#home'));
measureSections();
// Every visit starts with the intro, then profile selection. Follow section links after selection.
const linkedSection = document.getElementById(location.hash.slice(1));
startIntro();

function projectRepository(id) {
  const value = window.portfolioProjectLinks?.[id];
  try {
    const url = new URL(value);
    return url.protocol === 'https:' && url.hostname === 'github.com' && !url.username && !url.password && /^\/tousif-anwar\/[^/]+\/?$/.test(url.pathname) ? url.href : null;
  } catch { return null; }
}
$$('.project-card').forEach(card => {
  const id = card.dataset.id;
  const actions = document.createElement('div'); actions.className = 'project-quick-actions';
  const watch = document.createElement('button'); watch.type = 'button'; watch.textContent = 'Watch explainer'; watch.dataset.projectVideo = id;
  watch.addEventListener('click', () => window.portfolioJournal?.showProjectVideo(id));
  const source = document.createElement('a'); const repo = projectRepository(id);
  source.href = repo || 'https://github.com/tousif-anwar?tab=repositories'; source.target = '_blank'; source.rel = 'noopener noreferrer';
  source.textContent = repo ? 'GitHub repository ↗' : 'Browse GitHub ↗';
  source.setAttribute('aria-label', `${repo ? 'View repository' : 'Browse GitHub; repository link coming soon'} for ${projects[id].title}`);
  actions.append(watch, source); card.querySelector('.project-body').append(actions);
});
