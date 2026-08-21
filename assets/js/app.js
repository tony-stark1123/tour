/* =======================================================================
   assets/js/app.js
   -----------------------------------------------------------------------
   You normally never need to edit this file — it just reads TOUR_CONFIG
   from data.js and builds the sidebar, filmstrip, viewer, and controls.
   ======================================================================= */

// ---- 1. Build sidebar list + bottom filmstrip from TOUR_CONFIG ----
const sceneListEl = document.getElementById('sceneList');
const filmstripEl = document.getElementById('filmstrip');
const sceneIds = Object.keys(TOUR_CONFIG.scenes).filter(id => {
  const scene = TOUR_CONFIG.scenes[id];
  return scene && scene.showInMenu !== false;
});

// Use event delegation for scene clicks so handlers persist even after DOM changes
const sidebarEl = document.getElementById('sidebar');
const menuToggleEl = document.getElementById('menuToggle');

function closeSidebar() {
  if (sidebarEl) sidebarEl.classList.remove('open');
}

sceneListEl.addEventListener('click', (ev) => {
  try {
    const item = ev.target && ev.target.closest ? ev.target.closest('.scene-item') : null;
    if (item && item.dataset && item.dataset.scene) {
      closeSidebar();
      console.debug('sidebar click ->', item.dataset.scene);
      goToScene(item.dataset.scene);
    }
  } catch (e) { console.error('sidebar click error', e); }
});

// Copy current in-memory hotspots as JSON to clipboard (development helper)
const copyBtn = document.getElementById('copyHotspotsBtn');
if (copyBtn) {
  copyBtn.addEventListener('click', async () => {
    const added = window._addedHotspots || [];
    const arr = added.map(h => ({
      id: h.id,
      pitch: h.pitch,
      yaw: h.yaw,
      type: h.sceneId ? 'scene' : 'info',
      text: h.title || h.text || '',
      sceneId: h.sceneId || null
    }));
    const json = arr.length === 1 ? JSON.stringify(arr[0], null, 2) : JSON.stringify(arr, null, 2);
    try {
      await navigator.clipboard.writeText(json);
      alert('Hotspots JSON copied to clipboard');
    } catch (e) {
      const ta = document.createElement('textarea'); ta.value = json; document.body.appendChild(ta); ta.select(); document.execCommand('copy'); ta.remove(); alert('Hotspots JSON copied to clipboard');
    }
  });
}

// Filmstrip delegation
filmstripEl.addEventListener('click', (ev) => {
  try {
    const thumb = ev.target && ev.target.closest ? ev.target.closest('img[data-scene]') : null;
    if (thumb && thumb.dataset && thumb.dataset.scene) {
      console.debug('filmstrip click ->', thumb.dataset.scene);
      goToScene(thumb.dataset.scene);
    }
  } catch (e) { console.error('filmstrip click error', e); }
});

// Group scenes by category. Scenes without a category become "featured"
const categories = {};
const featured = [];
sceneIds.forEach((id, idx) => {
  const s = TOUR_CONFIG.scenes[id];
  if (!s.category) {
    featured.push({ id, s, idx });
    return;
  }
  const cat = s.category;
  if (!categories[cat]) categories[cat] = [];
  categories[cat].push({ id, s, idx });
});

// Render featured items first (no "Uncategorized" header)
if (featured.length) {
  const featuredList = document.createElement('div');
  featuredList.className = 'featured-list';
  featured.forEach(itemData => {
    const { id, s, idx } = itemData;
    const item = document.createElement('div');
    item.className = 'scene-item';
    item.dataset.scene = id;
    item.innerHTML = `
    <div class="scene-card">
      <img src="${s.thumb}" alt="${s.title}" class="scene-thumb">
      <div class="scene-info">
        <div class="scene-title">${s.title}</div>
        ${s.category ? `<div class="scene-category">${s.category}</div>` : ''}
      </div>
    </div>
    `;
    item.onclick = () => goToScene(id);
    featuredList.appendChild(item);

    const thumb = document.createElement('img');
    thumb.src = s.thumb;
    thumb.dataset.scene = id;
    thumb.dataset.index = idx;
    thumb.title = s.title;
    thumb.className = 'film-thumb';
    thumb.onclick = () => goToScene(id);
    filmstripEl.appendChild(thumb);
  });
  sceneListEl.appendChild(featuredList);
}

// Render categorized accordion lists
Object.keys(categories).forEach(cat => {
  const catEl = document.createElement('div');
  catEl.className = 'category';

  const header = document.createElement('div');
  header.className = 'category-header';
  header.innerHTML = `<div class="cat-left">${cat}</div><div class="cat-right">${categories[cat].length}</div>`;
  header.onclick = () => {
    // close any other open category so only one is open at a time
    document.querySelectorAll('.category.open').forEach(el => {
      if (el !== catEl) el.classList.remove('open');
    });
    catEl.classList.toggle('open');
  };

  const list = document.createElement('div');
  list.className = 'category-list';

  categories[cat].forEach(itemData => {
    const { id, s, idx } = itemData;
    const item = document.createElement('div');
    item.className = 'scene-item';
    item.dataset.scene = id;
    item.innerHTML = `
    <div class="scene-card">
      <img src="${s.thumb}" alt="${s.title}" class="scene-thumb">
      <div class="scene-info">
        <div class="scene-title">${s.title}</div>
        ${s.category ? `<div class="scene-category">${s.category}</div>` : ''}
      </div>
    </div>
    `;
    item.onclick = () => goToScene(id);
    list.appendChild(item);

    const thumb = document.createElement('img');
    thumb.src = s.thumb;
    thumb.dataset.scene = id;
    thumb.dataset.index = idx;
    thumb.title = s.title;
    thumb.className = 'film-thumb';
    thumb.onclick = () => goToScene(id);
    filmstripEl.appendChild(thumb);
  });

  catEl.appendChild(header);
  catEl.appendChild(list);
  sceneListEl.appendChild(catEl);
});

// After building sidebar, ensure the configured firstScene is visible and its category opened
try {
  const first = TOUR_CONFIG.default && TOUR_CONFIG.default.firstScene;
  if (first) {
    const activeItem = document.querySelector(`.scene-item[data-scene="${first}"]`);
    if (activeItem) {
      // open parent category if any
      const parentCat = activeItem.closest('.category');
      if (parentCat) parentCat.classList.add('open');
      // scroll into view within sidebar
      setTimeout(() => activeItem.scrollIntoView({ behavior: 'auto', block: 'center' }), 200);
    }
  }
} catch (e) {}

// ---- 2. Initialize Pannellum ----
const tourViewer = pannellum.viewer('panorama', TOUR_CONFIG);

// Note: browser-based persistence for hotspots (localStorage/IndexedDB) has
// been removed. Hotspot configuration is loaded from project files (data.js)
// and runtime-placed hotspots are kept only in memory for the current session.

// Prevent Pannellum from interpreting Shift+click as a zoom action by
// intercepting the events in the capture phase and stopping them when
// the Shift key is held.
try {
  const panoIntercept = document.getElementById('panorama');
  ['mousedown','click'].forEach(name => {
    panoIntercept.addEventListener(name, (ev) => {
      if (ev.shiftKey) {
        ev.preventDefault();
        ev.stopPropagation();
        // also stop immediate propagation in case other capture listeners exist
        if (typeof ev.stopImmediatePropagation === 'function') ev.stopImmediatePropagation();
      }
    }, true); // use capture so we run before Pannellum's handlers
  });
} catch (e) { console.warn('Failed to attach shift-intercept handlers', e); }

function isRoadPathScene(sceneId) {
  return !!sceneId && /^(roads_)?(main_rd_|lib_rd_|ece_rd_|em_rd_|rose_rd_|aero_rd_|agri_dpt_rd_|can_rd_)/.test(sceneId);
}

function applyMobileCampusZoom(sceneId) {
  if (!sceneId || sceneId !== 'campus_aerial') return;
  if (window.innerWidth > 768) return;

  try {
    tourViewer.setHfov(68, 600);
    tourViewer.setYaw(0, 600);
    tourViewer.setPitch(-4, 600);
  } catch (e) {
    console.warn('Failed to adjust campus overview zoom for mobile', e);
  }
}

function applyMobileRoadZoom(sceneId) {
  if (!isRoadPathScene(sceneId) || window.innerWidth > 768) return;

  try {
    // Keep the initial mobile road view slightly closer than the default, but not
    // so close that the user is already at the maximum zoom level and cannot
    // continue zooming in/out naturally.
    const targetHfov = window.innerWidth <= 420 ? 72 : 80;
    tourViewer.setHfov(targetHfov, 400);
  } catch (e) {
    console.warn('Failed to set road scene mobile zoom', e);
  }
}

tourViewer.on('load', () => {
  const current = tourViewer.getScene && tourViewer.getScene();
  const loadingEl = document.getElementById('loading');
  loadingEl.style.opacity = '0';
  setTimeout(() => (loadingEl.style.display = 'none'), 400);
  updateActiveUI(current || tourViewer.getScene());
  applyMobileCampusZoom(current || tourViewer.getScene());
  if (isRoadPathScene(current)) addConfigHotspotsForScene(current);
  if (current === 'roads_main_rd_1') addConfigHotspotsForScene('roads_main_rd_1');
  if (current === 'campus_aerial') addCampusHotspots();
  if (current === 'media_production') addConfigHotspotsForScene('media_production');
});
tourViewer.on('scenechange', (id) => {
  updateActiveUI(id);
  applyMobileCampusZoom(id);
  applyMobileRoadZoom(id);
  if (isRoadPathScene(id)) addConfigHotspotsForScene(id);
  if (id === 'roads_main_rd_1') addConfigHotspotsForScene('roads_main_rd_1');
  if (id === 'campus_aerial') addCampusHotspots();
  if (id === 'media_production') addConfigHotspotsForScene('media_production');
});

// ---- Custom hotspots (use uploaded location icon) ----
function createCustomHotspot(hotSpotDiv, args) {
  // Populate the provided hotSpotDiv (pannellum expects the function to modify it)
  hotSpotDiv.classList.add('custom-hotspot-inner');

  // make the hotspot focusable and accessible
  try {
    hotSpotDiv.setAttribute('tabindex', '0');
    hotSpotDiv.setAttribute('role', 'button');
  } catch (e) {}

  const isPlayHotspot = (args && args.id === 'play_roads_hotspot') || (args && args.sceneId === 'roads_main_rd_1');
  const tooltipArgs = (args && args.createTooltipArgs) ? args.createTooltipArgs : args;
  const iconSrc = isPlayHotspot ? 'assets/icons/play_btn.png' : ((tooltipArgs && tooltipArgs.icon) ? tooltipArgs.icon : ((args && args.icon) ? args.icon : 'assets/icons/location-mark.png'));
  const isVideoIcon = /\.(webm|mp4|mov)(\?|#|$)/i.test(iconSrc);

  let mediaEl;
  const viewportScale = Math.min(window.innerWidth || 1200, 1400);
  const isRoadArrowVideo = isVideoIcon && /rd_arrow\.webm$/i.test(iconSrc);
  const videoHotspotSize = isRoadArrowVideo
    ? (window.innerWidth <= 480 ? 72 : window.innerWidth <= 768 ? 82 : Math.max(120, Math.min(180, viewportScale * 0.18)))
    : Math.max(52, Math.min(160, viewportScale * 0.14));
  const playHotspotSize = Math.max(72, Math.min(170, viewportScale * 0.18));

  if (isVideoIcon) {
    mediaEl = document.createElement('video');
    mediaEl.src = iconSrc;
    mediaEl.autoplay = true;
    mediaEl.loop = true;
    mediaEl.muted = true;
    mediaEl.playsInline = true;
    mediaEl.setAttribute('playsinline', 'true');
    mediaEl.setAttribute('muted', 'true');
    mediaEl.setAttribute('loop', 'true');
    mediaEl.setAttribute('autoplay', 'true');
    mediaEl.className = 'custom-hotspot-video';
    mediaEl.style.width = `${videoHotspotSize}px`;
    mediaEl.style.height = `${videoHotspotSize}px`;
    mediaEl.style.maxWidth = '150px';
    mediaEl.style.maxHeight = '150px';
    mediaEl.style.objectFit = 'contain';
    mediaEl.style.borderRadius = '12px';
    mediaEl.style.display = 'block';
    mediaEl.style.pointerEvents = 'none';
    hotSpotDiv.style.width = `${videoHotspotSize}px`;
    hotSpotDiv.style.height = `${videoHotspotSize}px`;
    hotSpotDiv.style.display = 'flex';
    hotSpotDiv.style.alignItems = 'center';
    hotSpotDiv.style.justifyContent = 'center';
    mediaEl.addEventListener('loadeddata', () => {
      try { mediaEl.play().catch(() => {}); } catch (e) {}
    });
  } else {
    mediaEl = document.createElement('img');
    mediaEl.src = iconSrc;
    mediaEl.alt = '';
    mediaEl.className = 'custom-hotspot-icon';
    if (isPlayHotspot) {
      mediaEl.style.width = `${playHotspotSize}px`;
      mediaEl.style.height = `${playHotspotSize}px`;
      mediaEl.style.borderRadius = '50%';
      mediaEl.style.objectFit = 'contain';
      mediaEl.style.display = 'block';
      mediaEl.style.filter = 'drop-shadow(0 0 18px rgba(70,180,255,0.35))';
      hotSpotDiv.classList.add('play-hotspot');
      hotSpotDiv.style.width = `${playHotspotSize}px`;
      hotSpotDiv.style.height = `${playHotspotSize}px`;
      hotSpotDiv.style.marginLeft = '0';
      hotSpotDiv.style.marginTop = '0';
      hotSpotDiv.style.position = 'relative';

      const base = hotSpotDiv.closest('.pnlm-hotspot-base');
      if (base) {
        base.style.width = `${playHotspotSize}px`;
        base.style.height = `${playHotspotSize}px`;
        base.style.marginLeft = '0';
        base.style.marginTop = '0';
        base.style.borderRadius = '50%';
        base.style.overflow = 'visible';
        base.style.left = '0px';
        base.style.top = '0px';
      }
    }
    // avoid setting a native `title` to prevent the browser tooltip from
    // appearing (we provide a styled in-DOM label and keep `aria-label` for
    // screen readers). Some browsers show the native tooltip above our
    // custom label which looks like an unstyled 'info' box.
    try { mediaEl.title = ''; } catch(e){}
  }

  hotSpotDiv.appendChild(mediaEl);

  const label = document.createElement('div');
  label.className = 'custom-hotspot-label';
  const hideLabelForArrow = /\.(webm|mp4|mov)(\?|#|$)/i.test(iconSrc) && !isPlayHotspot;
  // Compute label text with multiple fallbacks to handle how Pannellum supplies args
  const computedLabel = hideLabelForArrow ? '' : ((args && (args.title || args.text)) ? (args.title || args.text)
    : (args && args.createTooltipArgs && (args.createTooltipArgs.title || args.createTooltipArgs.text))
    ? (args.createTooltipArgs.title || args.createTooltipArgs.text)
    : (args && args.id) ? args.id : '');
  if (hideLabelForArrow) {
    label.style.display = 'none';
    label.textContent = '';
  } else {
    label.textContent = computedLabel;
  }
  // ensure aria-label is set for screen readers
  try { if (computedLabel && !hideLabelForArrow) hotSpotDiv.setAttribute('aria-label', computedLabel); } catch(e){}
  // debug: log args and chosen label to help troubleshoot blank labels in browsers
  try {
    if (!computedLabel && !hideLabelForArrow) {
      // show a simple fallback text when no title is provided
      label.textContent = '(no title)';
      console.warn('createCustomHotspot: hotspot missing title/text', args);
    }
  } catch(e){}
  // (debug removed) labels are shown/hidden via the `visible` class and CSS transitions
  if (!hideLabelForArrow) hotSpotDiv.appendChild(label);

  // keyboard and pointer interactions: toggle visible class for smooth animation
  hotSpotDiv.addEventListener('focus', () => { if (!hideLabelForArrow) label.classList.add('visible'); });
  hotSpotDiv.addEventListener('blur', () => { if (!hideLabelForArrow) label.classList.remove('visible'); });
  // Use pointerenter/pointerleave to avoid bubbling flicker across nested elements
  hotSpotDiv.addEventListener('pointerenter', () => { if (!hideLabelForArrow) label.classList.add('visible'); });
  hotSpotDiv.addEventListener('pointerleave', () => { if (!hideLabelForArrow) label.classList.remove('visible'); });
  // also attach to the inner media element for reliability on some devices
  mediaEl.addEventListener('pointerenter', () => { if (!hideLabelForArrow) label.classList.add('visible'); });
  mediaEl.addEventListener('pointerleave', () => { if (!hideLabelForArrow) label.classList.remove('visible'); });

  // Some CSS uses a ::after hit area on the parent .pnlm-hotspot which can
  // receive pointer events instead of the inner hotSpotDiv. Attach the same
  // listeners to the parent `.pnlm-hotspot` so hovering the visible hit area
  // also toggles the label.
  try {
    const parentSpot = hotSpotDiv.closest && hotSpotDiv.closest('.pnlm-hotspot');
    if (parentSpot) {
      // ensure the outer hotspot can be focused for keyboard users
      try { parentSpot.setAttribute('tabindex', '0'); } catch(e){}
      parentSpot.addEventListener('pointerenter', () => label.classList.add('visible'));
      parentSpot.addEventListener('pointerleave', () => label.classList.remove('visible'));
      parentSpot.addEventListener('focus', () => label.classList.add('visible'));
      parentSpot.addEventListener('blur', () => label.classList.remove('visible'));
    }
  } catch (e) { console.warn('attach parent hotspot listeners failed', e); }
}

// Define custom hotspots for the campus aerial scene
const campusHotspots = [
  { pitch: -2, yaw: 35, title: 'Administration', sceneId: 'administration' },
  { pitch: -8, yaw: -160, title: 'Entrance', sceneId: null },
  // Main Building — precise coordinates captured by clicking (uses user-supplied icon)
  { pitch: -13.857, yaw: 6.391, title: 'Main Building', sceneId: null }
];

// Add custom hotspots when the active scene becomes campus_aerial
let campusHotspotsAdded = false;
async function addCampusHotspots() {
  if (campusHotspotsAdded) return;
  // prefer hotspots defined in TOUR_CONFIG.scenes.campus_aerial.hotSpots if present
  const cfg = (TOUR_CONFIG && TOUR_CONFIG.scenes && TOUR_CONFIG.scenes.campus_aerial && TOUR_CONFIG.scenes.campus_aerial.hotSpots) || campusHotspots;
  cfg.forEach((h, i) => {
    const id = h.id || `campus_${i}`;
    const args = {
      id,
      pitch: h.pitch,
      yaw: h.yaw,
      cssClass: h.cssClass || 'custom-hotspot',
      createTooltipFunc: createCustomHotspot,
      createTooltipArgs: (h.createTooltipArgs || { title: h.text || h.title, icon: 'assets/icons/location-mark.png' })
    };
    if (h.sceneId) { args.type = 'scene'; args.sceneId = h.sceneId; args.text = h.text || h.title; }
    else { args.type = h.type || 'info'; args.text = h.text || h.title; }
    addHotspotWithId(args, id);
  });
  campusHotspotsAdded = true;
}

// Helper to add a hotspot and tag its DOM element(s) with dataset.hotspotId so we can remove later
function addHotspotWithId(args, id) {
  // add hotspot (no browser persistence of removals)
  const before = Array.from(document.querySelectorAll('.pnlm-hotspot'));
  const beforeSet = new Set(before);
  // remember mapping from hotspot id to sceneId so clicks can navigate
  window._hotspotSceneMap = window._hotspotSceneMap || {};
  window._hotspotSceneMap[id] = args.sceneId || null;
  window._hotspotTargetMap = window._hotspotTargetMap || {};
  window._hotspotTargetMap[id] = {
    yaw: typeof args.targetYaw === 'number' ? args.targetYaw : null,
    pitch: typeof args.targetPitch === 'number' ? args.targetPitch : null
  };
  window._addedHotspots = window._addedHotspots || [];
  window._addedHotspots.push({ id, title: (args.createTooltipArgs && args.createTooltipArgs.title) || args.text || '', pitch: args.pitch, yaw: args.yaw, sceneId: args.sceneId || null, targetYaw: args.targetYaw || null, targetPitch: args.targetPitch || null });
  try { tourViewer.addHotSpot(args); } catch (e) { console.error('addHotSpot failed', e); }
  // find newly created hotspot elements (not in before set)
  setTimeout(() => {
    const all = Array.from(document.querySelectorAll('.pnlm-hotspot'));
    all.forEach(el => {
      if (!beforeSet.has(el) && !el.dataset.hotspotId) {
        el.dataset.hotspotId = id;
        // attach click handler to navigate if this hotspot maps to a scene
        try {
          const targetScene = window._hotspotSceneMap && window._hotspotSceneMap[id];
          const targetConfig = window._hotspotTargetMap && window._hotspotTargetMap[id];
          if (targetScene) {
            el.addEventListener('click', (ev) => {
              // prevent double handling if pannellum also tries
              ev.stopPropagation();
              try {
                tourViewer.loadScene(targetScene);
                setTimeout(() => {
                  try {
                    if (targetConfig && typeof targetConfig.yaw === 'number' && typeof tourViewer.setYaw === 'function') {
                      tourViewer.setYaw(targetConfig.yaw, 300);
                    }
                    if (targetConfig && typeof targetConfig.pitch === 'number' && typeof tourViewer.setPitch === 'function') {
                      tourViewer.setPitch(targetConfig.pitch, 300);
                    }
                  } catch (e) { console.warn('apply hotspot target view failed', e); }
                }, 180);
              } catch (e) { console.error('hotspot click loadScene failed', e); }
            });
          }
        } catch (e) { console.error('attach hotspot click failed', e); }
      }
    });
  }, 50);
}

// markHotspotRemoved removed — no browser persistence of hotspot removals

// Manage Hotspots UI removed for public/privacy — only Place Hotspot and
// Copy JSON remain for development workflows.

// If first loaded scene is campus_aerial, add immediately
tourViewer.on('load', () => {
  const current = tourViewer.getScene && tourViewer.getScene();
  if (current === 'campus_aerial') addCampusHotspots();
  if (current === 'media_production') addConfigHotspotsForScene('media_production');
});

// Generic helper to add hotspots defined in TOUR_CONFIG for a given scene
const _configHotspotsAdded = {};
function addConfigHotspotsForScene(sceneId) {
  try {
    if (_configHotspotsAdded[sceneId]) return;
    const s = TOUR_CONFIG && TOUR_CONFIG.scenes && TOUR_CONFIG.scenes[sceneId];
    if (!s || !Array.isArray(s.hotSpots)) return;
    s.hotSpots.forEach((h, i) => {
      const id = h.id || `${sceneId}_cfg_${i}`;
      const args = {
        id,
        pitch: h.pitch,
        yaw: h.yaw,
        targetYaw: h.targetYaw,
        targetPitch: h.targetPitch,
        cssClass: h.cssClass || 'custom-hotspot',
        createTooltipFunc: (typeof createCustomHotspot === 'function') ? createCustomHotspot : null,
        createTooltipArgs: (h.createTooltipArgs || { title: h.text || h.title, icon: 'assets/icons/location-mark.png' })
      };
      if (h.sceneId) { args.type = 'scene'; args.sceneId = h.sceneId; args.text = h.text || h.title; }
      else { args.type = h.type || 'info'; args.text = h.text || h.title; }
      addHotspotWithId(args, id);
    });
    _configHotspotsAdded[sceneId] = true;
  } catch (e) { console.warn('addConfigHotspotsForScene failed', e); }
}

function goToScene(id) {
  tourViewer.loadScene(id);
}

function updateActiveUI(id) {
  const scene = TOUR_CONFIG.scenes[id];
  document.getElementById('sceneTitleText').textContent = scene.title;
  document.querySelectorAll('.scene-item').forEach(el =>
    el.classList.toggle('active', el.dataset.scene === id));
  document.querySelectorAll('#filmstrip img').forEach(el =>
    el.classList.toggle('active', el.dataset.scene === id));

  // Scroll filmstrip so selected scene is the first visible item (show selected + next 3)
  try {
    const selectedThumb = document.querySelector(`#filmstrip img[data-scene="${id}"]`);
    if (selectedThumb) {
      const thumbs = Array.from(document.querySelectorAll('#filmstrip img'));
      const total = thumbs.length;
      const visibleCount = 3;
      const idx = Number(selectedThumb.dataset.index || 0);
      const maxStart = Math.max(0, total - visibleCount);
      const startIndex = Math.min(idx, maxStart);
      const target = thumbs[startIndex];
      const left = target ? target.offsetLeft : selectedThumb.offsetLeft;
      filmstripEl.scrollTo({ left, behavior: 'smooth' });
    }
  } catch (e) {
    // ignore scrolling errors
  }
}

// ---- 3. Compass needle follows the view ----
function pollCompass() {
  const yaw = tourViewer.getYaw ? tourViewer.getYaw() : 0;
  document.getElementById('compassNeedle').style.transform = `rotate(${-yaw+180}deg)`;
  requestAnimationFrame(pollCompass);
}
requestAnimationFrame(pollCompass);

// ---- 4. Custom control buttons ----
menuToggleEl.onclick = (ev) => {
  ev.stopPropagation();
  if (sidebarEl) sidebarEl.classList.toggle('open');
};

document.addEventListener('click', (ev) => {
  if (!sidebarEl || !sidebarEl.classList.contains('open')) return;
  const clickedInsideSidebar = sidebarEl.contains(ev.target);
  const clickedToggle = menuToggleEl && menuToggleEl.contains(ev.target);

  if (!clickedInsideSidebar && !clickedToggle) {
    closeSidebar();
  }
});

// ---- Interactive hotspot placement ----
let placingHotspot = false;
const placeBtn = document.getElementById('placeHotspotBtn');
placeBtn.addEventListener('click', () => {
  placingHotspot = !placingHotspot;
  placeBtn.classList.toggle('active', placingHotspot);
  placeBtn.textContent = placingHotspot ? 'Click panorama to place' : 'Place Hotspot';
  if (placingHotspot) {
    document.getElementById('panorama').style.cursor = 'crosshair';
  } else {
    document.getElementById('panorama').style.cursor = '';
  }
});

// Click handler on panorama to capture coordinates
document.getElementById('panorama').addEventListener('click', (ev) => {
  if (!placingHotspot) return;
  // Use pannellum helper to convert mouse event to pitch/yaw
  try {
    let coords = null;
    if (tourViewer && typeof tourViewer.mouseEventToCoords === 'function') {
      try { coords = tourViewer.mouseEventToCoords(ev); } catch(e){ coords = null; }
    }
    // Try an adjusted event with clientX/clientY relative to the panorama container
    if ((!coords || typeof coords.pitch !== 'number' || typeof coords.yaw !== 'number') && tourViewer) {
      try {
        const panoEl = document.getElementById('panorama');
        const rect = panoEl.getBoundingClientRect();
        const fakeEv = { clientX: ev.clientX, clientY: ev.clientY, pageX: ev.pageX, pageY: ev.pageY };
        // Ensure coordinates are within container
        fakeEv.clientX = Math.min(Math.max(ev.clientX, rect.left), rect.right);
        fakeEv.clientY = Math.min(Math.max(ev.clientY, rect.top), rect.bottom);
        try { coords = tourViewer.mouseEventToCoords(fakeEv); } catch(e){ coords = null; }
        // Last-resort geometric mapping: map click position to yaw/pitch around current view
        if (!coords || typeof coords.pitch !== 'number' || typeof coords.yaw !== 'number') {
          const cx = rect.left + rect.width / 2;
          const cy = rect.top + rect.height / 2;
          const dx = (ev.clientX - cx) / rect.width; // -0.5..0.5
          const dy = (ev.clientY - cy) / rect.height; // -0.5..0.5
          const currentYaw = (typeof tourViewer.getYaw === 'function') ? tourViewer.getYaw() : 0;
          const currentPitch = (typeof tourViewer.getPitch === 'function') ? tourViewer.getPitch() : 0;
          // Use viewer's hfov to map screen displacement to angular displacement
          const hfov = (typeof tourViewer.getHfov === 'function') ? tourViewer.getHfov() : (TOUR_CONFIG.default && TOUR_CONFIG.default.hfov) || 110;
          const vfov = hfov * (rect.height / rect.width);
          const estYaw = currentYaw + dx * hfov;
          const estPitch = currentPitch - dy * vfov;
          coords = { pitch: estPitch, yaw: estYaw };
          console.debug('Placed hotspot using geometric fallback coords', coords, {dx, dy, hfov, vfov, currentYaw, currentPitch});
        }
      } catch (e) {
        console.warn('Fallback coordinate computation failed', e);
      }
    }

    const title = prompt('Hotspot title (leave blank to cancel):', 'New Hotspot');
    if (!title) { placingHotspot = false; placeBtn.classList.remove('active'); placeBtn.textContent = 'Place Hotspot'; document.getElementById('panorama').style.cursor = ''; return; }
    const sceneId = prompt('Target scene id to navigate (leave blank for info):', '');
    const args = {
      pitch: coords.pitch,
      yaw: coords.yaw,
      cssClass: 'custom-hotspot',
      createTooltipFunc: createCustomHotspot,
      createTooltipArgs: { title, icon: 'assets/icons/location-mark.png' }
    };
    const id = 'hot_' + Date.now();
    if (sceneId) { args.type = 'scene'; args.sceneId = sceneId; }
    else { args.type = 'info'; args.text = title; }
    args.id = id;
    addHotspotWithId(args, id);
    placingHotspot = false;
    placeBtn.classList.remove('active');
    placeBtn.textContent = 'Place Hotspot';
    document.getElementById('panorama').style.cursor = '';
    alert('Hotspot added at pitch='+Number(coords.pitch).toFixed(3)+', yaw='+Number(coords.yaw).toFixed(3)+'. To persist, add it to assets/js/app.js or data.js.');
  } catch (e) {
    console.error('Error placing hotspot', e);
    alert('Unable to place hotspot: '+e.message);
  }
});

// Hotspot removal UI removed — public users won't have remove controls.

document.getElementById('btnZoomIn').onclick = () =>
  tourViewer.setHfov(tourViewer.getHfov() - 10, 200);

document.getElementById('btnZoomOut').onclick = () =>
  tourViewer.setHfov(tourViewer.getHfov() + 10, 200);

document.getElementById('btnFullscreen').onclick = () => {
  if (!document.fullscreenElement) document.documentElement.requestFullscreen();
  else document.exitFullscreen();
};

/* ================= SEARCH ================= */

const searchInput = document.getElementById("searchScene");

searchInput.addEventListener('input', function () {
  const keyword = this.value.trim().toLowerCase();
  const searching = keyword.length > 0;

  // Helper to create clickable clone that preserves scene id
  function makeClone(item) {
    const id = item.dataset.scene;
    const clone = item.cloneNode(true);
    clone.onclick = () => goToScene(id);
    return clone;
  }

  // Ensure a container for search results
  let resultsContainer = document.querySelector('.search-results');
  if (!resultsContainer) {
    resultsContainer = document.createElement('div');
    resultsContainer.className = 'search-results';
    sceneListEl.insertBefore(resultsContainer, sceneListEl.firstChild);
  }

  if (!searching) {
    // remove results container from DOM and restore original lists
    if (resultsContainer && resultsContainer.parentNode) resultsContainer.parentNode.removeChild(resultsContainer);
    // restore featured and categories (clear inline styles so CSS controls visibility)
    const featuredEl = document.querySelector('.featured-list');
    if (featuredEl) featuredEl.style.display = '';
    document.querySelectorAll('.category').forEach(catEl => {
      catEl.style.display = '';
      const list = catEl.querySelector('.category-list');
      if (list) list.style.display = '';
      const header = catEl.querySelector('.category-header');
      if (header) header.style.display = '';
    });
    return;
  }

  // Searching: hide originals and build grouped results
  resultsContainer.innerHTML = '';
  resultsContainer.style.display = 'block';

  // Hide originals
  const featuredEl = document.querySelector('.featured-list');
  if (featuredEl) featuredEl.style.display = 'none';
  document.querySelectorAll('.category').forEach(catEl => { catEl.style.display = 'none'; });

  // Featured / Overview
  if (featuredEl) {
    const items = Array.from(featuredEl.querySelectorAll('.scene-item'));
    const matches = items.filter(i => i.innerText.toLowerCase().includes(keyword));
    if (matches.length) {
      const h = document.createElement('div');
      h.className = 'category-header';
      h.innerHTML = `<div class="cat-left">Overview</div><div class="cat-right">${matches.length}</div>`;
      resultsContainer.appendChild(h);
      matches.forEach(m => resultsContainer.appendChild(makeClone(m)));
      // show next for context
      const lastIndex = items.indexOf(matches[matches.length - 1]);
      if (lastIndex >= 0 && lastIndex + 1 < items.length) resultsContainer.appendChild(makeClone(items[lastIndex + 1]));
    }
  }

  // Categories
  document.querySelectorAll('.category').forEach(catEl => {
    const headerEl = catEl.querySelector('.category-header');
    const catName = headerEl ? headerEl.querySelector('.cat-left').textContent.trim() : 'Category';
    const items = catEl.querySelectorAll('.scene-item');
    const arr = Array.from(items);
    const matches = arr.filter(i => i.innerText.toLowerCase().includes(keyword));
    if (matches.length) {
      const h = document.createElement('div');
      h.className = 'category-header';
      h.innerHTML = `<div class="cat-left">${catName}</div><div class="cat-right">${matches.length}</div>`;
      resultsContainer.appendChild(h);
      matches.forEach(m => resultsContainer.appendChild(makeClone(m)));
      const lastIndex = arr.indexOf(matches[matches.length - 1]);
      if (lastIndex >= 0 && lastIndex + 1 < arr.length) resultsContainer.appendChild(makeClone(arr[lastIndex + 1]));
    }
  });
});

const mapPanel = document.getElementById("campusMap");
const mapButton = document.getElementById("mapToggle");

mapButton.addEventListener("click", () => {

    mapPanel.classList.toggle("open");

});
