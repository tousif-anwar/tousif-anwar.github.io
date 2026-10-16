'use strict';
const studioAddress = window.portfolioPublishing?.studioUrl;
try {
  const url = new URL(studioAddress);
  if (url.protocol === 'https:' && !url.username && !url.password) {
    document.getElementById('openStudio').href = url.href;
    document.getElementById('openStudio').hidden = false;
    document.getElementById('studioState').textContent = 'Sign in to your hosted studio to write posts, add video links, and manage publication.';
    document.getElementById('setupSteps').hidden = true;
  }
} catch { /* Setup instructions remain visible until a real studio is configured. */ }
