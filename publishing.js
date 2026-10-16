'use strict';

(() => {
  const config = window.portfolioPublishing || {};
  const doc = document;
  const find = selector => doc.querySelector(selector);
  const create = (tag, text, className) => {
    const element = doc.createElement(tag);
    if (text !== undefined) element.textContent = text;
    if (className) element.className = className;
    return element;
  };
  const state = { posts: [], videos: [], query: '', category: 'all' };
  const projectLabels = { mortgage: 'AI Mortgage Automation', vision: 'Low-Light Computer Vision', disaster: 'Disaster Response Intelligence', intelligence: 'Cloud Data Modernization', fullstack: 'Full-Stack Application', recsys: 'Recommendation System', overview: 'All projects' };
  function safeUrl(value, media = false) {
    if (typeof value !== 'string' || !value.trim()) return null;
    try {
      const url = new URL(value);
      if (url.protocol === 'https:' && !url.username && !url.password) return url.href;
    } catch { /* Only explicit HTTPS URLs are accepted for remote content. */ }
    if (media && /^assets\/[a-zA-Z0-9_./-]+\.(?:svg|png|jpe?g|webp|mp4|webm)$/i.test(value) && !value.includes('..')) return value;
    return null;
  }
  function videoSource(value) {
    const safe = safeUrl(value, true);
    if (!safe) return null;
    if (/\.(?:mp4|webm)(?:\?.*)?$/i.test(safe)) return { type: 'file', src: safe };
    if (safe.startsWith('assets/')) return null;
    const url = new URL(safe);
    let id = '';
    if (url.hostname === 'youtu.be') id = url.pathname.slice(1);
    if (['youtube.com', 'www.youtube.com', 'm.youtube.com'].includes(url.hostname)) id = url.searchParams.get('v') || url.pathname.match(/^\/(?:embed|shorts)\/([^/]+)/)?.[1] || '';
    if (/^[a-zA-Z0-9_-]{11}$/.test(id)) return { type: 'embed', src: `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`, label: 'YouTube' };
    if (['vimeo.com', 'www.vimeo.com'].includes(url.hostname) && /^\/\d+$/.test(url.pathname)) return { type: 'embed', src: `https://player.vimeo.com/video/${url.pathname.slice(1)}?autoplay=1`, label: 'Vimeo' };
    return { type: 'link', src: safe };
  }
  function inlineText(parent, text) {
    // Text nodes and allowlisted links: stored content is never treated as executable HTML.
    const pattern = /\[([^\]]+)\]\((https:\/\/[^\s)]+)\)|`([^`]+)`/g;
    let start = 0;
    for (const match of String(text).matchAll(pattern)) {
      parent.append(doc.createTextNode(text.slice(start, match.index)));
      if (match[3]) parent.append(create('code', match[3]));
      else {
        const href = safeUrl(match[2]);
        if (href) { const link = create('a', match[1]); link.href = href; link.target = '_blank'; link.rel = 'noopener noreferrer'; parent.append(link); }
        else parent.append(doc.createTextNode(match[0]));
      }
      start = match.index + match[0].length;
    }
    parent.append(doc.createTextNode(String(text).slice(start)));
  }
  function renderBody(container, body) {
    container.replaceChildren();
    const text = typeof body === 'string' ? body : '';
    const lines = text.replace(/\r\n/g, '\n').split('\n');
    let index = 0;
    while (index < lines.length) {
      const line = lines[index];
      if (!line.trim()) { index++; continue; }
      if (line.startsWith('```')) {
        const language = line.slice(3).trim(); const code = []; index++;
        while (index < lines.length && !lines[index].startsWith('```')) code.push(lines[index++]);
        index++;
        const pre = create('pre'); const child = create('code', code.join('\n')); if (language) child.dataset.language = language; pre.append(child); container.append(pre); continue;
      }
      const heading = line.match(/^(#{1,3})\s+(.+)$/);
      if (heading) { container.append(create(`h${Math.min(heading[1].length + 1, 4)}`, heading[2])); index++; continue; }
      if (/^-\s+/.test(line)) {
        const list = create('ul');
        while (index < lines.length && /^-\s+/.test(lines[index])) { const item = create('li'); inlineText(item, lines[index++].replace(/^-\s+/, '')); list.append(item); }
        container.append(list); continue;
      }
      if (line.startsWith('> ')) { const quote = create('blockquote'); inlineText(quote, line.slice(2)); container.append(quote); index++; continue; }
      const paragraph = [];
      while (index < lines.length && lines[index].trim() && !/^(?:#{1,3}\s|```|-\s|>\s)/.test(lines[index])) paragraph.push(lines[index++]);
      const p = create('p'); inlineText(p, paragraph.join(' ')); container.append(p);
    }
  }
  function validPublished(item) {
    return item && typeof item.title === 'string' && item.title.trim() && item.status === 'published' && typeof item.publishedAt === 'string' && Number.isFinite(Date.parse(item.publishedAt)) && Date.parse(item.publishedAt) <= Date.now();
  }
  function applyContent(posts, videos) {
    state.posts = (Array.isArray(posts) ? posts : []).filter(validPublished).filter(post => /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(post.slug || '')).sort((a,b) => Date.parse(b.publishedAt) - Date.parse(a.publishedAt));
    state.videos = (Array.isArray(videos) ? videos : []).filter(validPublished).filter(video => video.project !== 'overview' && videoSource(video.url)).sort((a,b) => Date.parse(b.publishedAt) - Date.parse(a.publishedAt));
    const categories = [...new Set(state.posts.map(post => post.category || 'Engineering'))].sort();
    find('#blogCategory').replaceChildren(...['all', ...categories].map(category => { const option = create('option', category === 'all' ? 'All topics' : category); option.value = category; return option; }));
    renderPosts(); renderVideos();
    doc.dispatchEvent(new CustomEvent('portfolio:content', { detail: { posts: state.posts, videos: state.videos } }));
    const requestedSlug = new URLSearchParams(window.location.search || '').get('post');
    if (requestedSlug) showPost(requestedSlug);
  }
  function formattedDate(date) { return new Intl.DateTimeFormat('en-US', { month:'short', day:'numeric', year:'numeric', timeZone:'America/New_York' }).format(new Date(date)); }
  function readingTime(body) { return Math.max(1, Math.ceil(String(body || '').trim().split(/\s+/).length / 220)); }
  function renderPosts() {
    const terms = state.query.trim().toLowerCase().split(/\s+/).filter(Boolean);
    const posts = state.posts.filter(post => (state.category === 'all' || (post.category || 'Engineering') === state.category) && terms.every(term => `${post.title} ${post.excerpt || ''} ${post.body || ''}`.toLowerCase().includes(term)));
    find('#blogGrid').replaceChildren(...posts.map(post => {
      const card = create('article', undefined, 'writing-card');
      const meta = create('div', undefined, 'writing-meta'); meta.append(create('span', post.category || 'Engineering'), create('time', formattedDate(post.publishedAt))); meta.lastChild.dateTime = post.publishedAt;
      const title = create('h3'); const button = create('button', post.title); button.addEventListener('click', () => showPost(post.slug)); title.append(button);
      const excerpt = create('p', post.excerpt || 'Read the engineering story.');
      const footer = create('div', undefined, 'writing-footer'); footer.append(create('span', `${readingTime(post.body)} min read`));
      const open = create('button', 'Read the story →'); open.addEventListener('click', () => showPost(post.slug)); footer.append(open);
      card.append(meta, title, excerpt, footer); return card;
    }));
    find('#blogEmpty').hidden = posts.length > 0;
    find('#blogEmptyTitle').textContent = state.posts.length ? 'No articles match this search.' : 'No articles published yet.';
    find('#blogEmptyText').textContent = state.posts.length ? 'Clear the search or select another topic to see more articles.' : 'Browse the project case studies and written video summaries while the article collection is being prepared.';
    find('#blogResultCount').textContent = `${posts.length} ${posts.length === 1 ? 'story' : 'stories'}`;
  }
  function renderVideos() {
    find('#videoGrid').replaceChildren(...state.videos.map(video => {
      const card = create('article', undefined, 'walkthrough-card');
      const preview = create('button', undefined, 'walkthrough-preview'); preview.setAttribute('aria-label', `Watch ${video.title}`);
      const poster = safeUrl(video.poster, true);
      if (poster) { const image = create('img'); image.src = poster; image.alt = ''; image.width = 960; image.height = 540; image.loading = 'lazy'; image.decoding = 'async'; preview.append(image); }
      preview.append(create('span', '▶', 'walkthrough-play'), create('span', video.duration || 'PROJECT WALKTHROUGH', 'walkthrough-duration'));
      preview.addEventListener('click', () => showVideo(video));
      const body = create('div', undefined, 'walkthrough-body'); body.append(create('p', projectLabels[video.project] || 'Project walkthrough', 'overline'), create('h3', video.title), create('p', video.description || 'Explore the project in more detail.'));
      const watch = create('button', 'Watch explanation →', 'text-link'); watch.addEventListener('click', () => showVideo(video)); body.append(watch);
      card.append(preview, body); return card;
    }));
    find('#videosEmpty').hidden = state.videos.length > 0;
    const rail = find('#heroVideoRail');
    if (rail) {
      rail.replaceChildren(...state.videos.map((video, index) => {
        const card = create('article', undefined, 'hero-video-card');
        const watch = create('button', undefined, 'hero-video-watch');
        watch.setAttribute('aria-label', `Watch ${video.title}`);
        const poster = safeUrl(video.poster, true);
        if (poster) {
          const image = create('img'); image.src = poster; image.alt = ''; image.width = 960; image.height = 540; image.decoding = 'async';
          image.loading = index === 0 ? 'eager' : 'lazy'; watch.append(image);
        }
        watch.append(create('span', '▶', 'walkthrough-play'), create('span', video.duration || 'EXPLAINER', 'walkthrough-duration'));
        watch.addEventListener('click', () => showVideo(video));
        const meta = create('div', undefined, 'hero-video-meta');
        meta.append(create('p', `${String(index + 1).padStart(2, '0')} / ${projectLabels[video.project] || 'Project walkthrough'}`, 'overline'), create('h3', video.title), create('p', video.description || 'Explore the project story.'));
        card.append(watch, meta); return card;
      }));
      const empty = !state.videos.length;
      if (empty) rail.append(create('p', 'Project videos are on their way.', 'hero-video-empty'));
      find('#heroVideoPrev').disabled = empty;
      find('#heroVideoNext').disabled = empty;
      find('#heroVideoCount').textContent = `${state.videos.length} STORIES · SCROLL TO EXPLORE`;
    }
  }
  function scrollHeroVideos(direction) {
    const rail = find('#heroVideoRail');
    if (!rail || !rail.firstElementChild) return;
    const distance = rail.firstElementChild.getBoundingClientRect().width + 16;
    rail.scrollBy({ left: direction * distance, behavior: doc.body.classList.contains('motion-off') || window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
  }
  find('#heroVideoPrev')?.addEventListener('click', () => scrollHeroVideos(-1));
  find('#heroVideoNext')?.addEventListener('click', () => scrollHeroVideos(1));
  find('#heroVideoRail')?.addEventListener('keydown', event => {
    if (event.target !== event.currentTarget || !['ArrowLeft', 'ArrowRight'].includes(event.key)) return;
    event.preventDefault(); scrollHeroVideos(event.key === 'ArrowRight' ? 1 : -1);
  });
  function openDialog(dialog) {
    for (const other of doc.querySelectorAll('dialog[open]')) if (other !== dialog) other.close();
    dialog.showModal(); doc.body.classList.add('modal-open');
    doc.dispatchEvent(new CustomEvent('portfolio:modal'));
  }
  function showPost(slug) {
    const post = state.posts.find(item => item.slug === slug); if (!post) return false;
    find('#postTitle').textContent = post.title;
    find('#postMeta').textContent = `${post.category || 'Engineering'} · ${formattedDate(post.publishedAt)} · ${readingTime(post.body)} min read`;
    find('#postExcerpt').textContent = post.excerpt || '';
    try { const url = new URL('blog.html', window.location.href); url.searchParams.set('post', slug); find('#postPermalink').href = url.href; } catch { find('#postPermalink').href = 'blog.html'; }
    renderBody(find('#postBody'), post.body);
    openDialog(find('#postDialog')); find('#postDialog').scrollTop = 0;
    return true;
  }
  function showVideo(video) {
    const source = videoSource(video.url); if (!source) return;
    find('#videoPlayer').replaceChildren();
    find('#videoTitle').textContent = video.title;
    find('#videoDescription').textContent = video.description || '';
    const summary = find('#videoSummary');
    summary.hidden = !video.summary;
    summary.open = false;
    renderBody(find('#videoSummaryBody'), video.summary || '');
    const caseStudy = find('#videoCaseStudy');
    caseStudy.hidden = !projectLabels[video.project] || video.project === 'overview';
    caseStudy.onclick = () => {
      find('#videoDialog').close();
      if (doc.body.dataset.page && doc.body.dataset.page !== 'projects') { window.location.href = `projects.html?project=${encodeURIComponent(video.project)}`; return; }
      doc.dispatchEvent(new CustomEvent('portfolio:project-detail', { detail: { id: video.project } }));
    };
    if (source.type === 'file') {
      const player = create('video'); player.src = source.src; player.controls = true; player.preload = 'metadata'; player.playsInline = true;
      player.setAttribute('aria-label', video.title); find('#videoPlayer').append(player);
    } else if (source.type === 'embed') {
      const frame = create('iframe'); frame.src = source.src; frame.title = video.title; frame.allow = 'autoplay; encrypted-media; picture-in-picture; fullscreen'; frame.allowFullscreen = true;
      frame.referrerPolicy = 'strict-origin-when-cross-origin'; find('#videoPlayer').append(frame);
    } else {
      const pane = create('div', undefined, 'external-video');
      const poster = safeUrl(video.poster, true);
      if (poster) { const image = create('img'); image.src = poster; image.alt = ''; image.width = 960; image.height = 540; image.decoding = 'async'; pane.append(image); }
      pane.append(create('p', 'Watch the narrated explainer on Scrimba. Opens in a new tab.'));
      const link = create('a', 'Watch on Scrimba ↗', 'btn btn-white'); link.href = source.src; link.target = '_blank'; link.rel = 'noopener noreferrer'; pane.append(link); find('#videoPlayer').append(pane);
    }
    openDialog(find('#videoDialog'));
  }
  async function loadRemote() {
    if (!/^[a-z0-9]{3,32}$/.test(config.projectId || '') || !/^[a-z0-9_-]{1,64}$/.test(config.dataset || '')) return;
    const query = `{"posts":*[_type=="post" && status=="published" && publishedAt<=now()]|order(publishedAt desc){title,"slug":slug.current,category,excerpt,body,status,publishedAt},"videos":*[_type=="projectVideo" && status=="published" && publishedAt<=now()]|order(publishedAt desc){title,description,url,"poster":poster.asset->url,project,duration,status,publishedAt}}`;
    const url = `https://${config.projectId}.apicdn.sanity.io/v2025-02-19/data/query/${config.dataset}?perspective=published&query=${encodeURIComponent(query)}`;
    try {
      const response = await fetch(url, { credentials: 'omit', referrerPolicy: 'no-referrer' });
      if (!response.ok) throw new Error('Content is unavailable');
      const data = await response.json(); if (!data.result) throw new Error('Content is unavailable');
      applyContent(data.result.posts, data.result.videos);
    } catch { find('#contentNotice').hidden = false; }
  }
  find('#blogSearch').addEventListener('input', event => { state.query = event.target.value; renderPosts(); });
  find('#blogCategory').addEventListener('change', event => { state.category = event.target.value; renderPosts(); });
  find('#videoDialog').addEventListener('close', () => find('#videoPlayer').replaceChildren());
  const studioUrl = safeUrl(config.studioUrl);
  if (studioUrl) find('#contentStudioLink').href = studioUrl;
  applyContent(config.posts || [], config.videos || []);
  // Narrow testing/embedding API; no write credentials or browser-side publishing.
  window.portfolioJournal = Object.freeze({ showPost, videoSource, safeUrl, renderBody, refresh: loadRemote,
    hasVideo: id => state.videos.some(video => video.project === id),
    showProjectVideo: id => { const video = state.videos.find(item => item.project === id); if (video) showVideo(video); }
  });
  loadRemote();
})();
