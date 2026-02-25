// AD Kill Chain Attack & Defense Dashboard - Application Logic

// ── STATE ──────────────────────────────────────────────────────────────────
const state = {
  activeTab: 'dashboard',
  globalSearch: '',
  techniquesFilter: 'all',
  toolsFilter: 'all',
  cveFilter: 'all',
  checkedItems: JSON.parse(localStorage.getItem('ad_checklist') || '{}'),
};

// ── INIT ───────────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  renderDashboard();
  renderTechniques();
  renderCVEs();
  renderDetection();
  renderTools();
  renderDefense();
  bindEvents();
  switchTab('dashboard');
});

// ── TAB NAVIGATION ─────────────────────────────────────────────────────────
function switchTab(tabId) {
  state.activeTab = tabId;
  document.querySelectorAll('.tab-pane').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.nav-tab').forEach(t => t.classList.remove('active'));
  const pane = document.getElementById(`tab-${tabId}`);
  const tab = document.querySelector(`[data-tab="${tabId}"]`);
  if (pane) pane.classList.add('active');
  if (tab) tab.classList.add('active');
}

// ── EVENT BINDINGS ─────────────────────────────────────────────────────────
function bindEvents() {
  // Tab clicks
  document.querySelectorAll('.nav-tab').forEach(tab => {
    tab.addEventListener('click', () => switchTab(tab.dataset.tab));
  });

  // Global search
  const globalSearchInput = document.getElementById('global-search');
  if (globalSearchInput) {
    globalSearchInput.addEventListener('input', e => {
      state.globalSearch = e.target.value.toLowerCase().trim();
      if (state.globalSearch) {
        switchTab('techniques');
        filterTechniques();
      }
    });
  }

  // CVE filter buttons
  document.querySelectorAll('[data-cve-filter]').forEach(btn => {
    btn.addEventListener('click', () => {
      state.cveFilter = btn.dataset.cveFilter;
      document.querySelectorAll('[data-cve-filter]').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      filterCVEs();
    });
  });

  // Tools filter buttons
  document.querySelectorAll('[data-tool-filter]').forEach(btn => {
    btn.addEventListener('click', () => {
      state.toolsFilter = btn.dataset.toolFilter;
      document.querySelectorAll('[data-tool-filter]').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      filterTools();
    });
  });

  // CVE search
  const cveSearch = document.getElementById('cve-search');
  if (cveSearch) cveSearch.addEventListener('input', filterCVEs);

  // Detection search
  const detectionSearch = document.getElementById('detection-search');
  if (detectionSearch) detectionSearch.addEventListener('input', filterDetection);

  // Tools search
  const toolsSearch = document.getElementById('tools-search');
  if (toolsSearch) toolsSearch.addEventListener('input', filterTools);

  // Techniques search
  const techSearch = document.getElementById('technique-search');
  if (techSearch) techSearch.addEventListener('input', () => {
    state.globalSearch = techSearch.value.toLowerCase().trim();
    filterTechniques();
  });

  // Techniques category filter
  document.querySelectorAll('[data-cat-filter]').forEach(btn => {
    btn.addEventListener('click', () => {
      state.techniquesFilter = btn.dataset.catFilter;
      document.querySelectorAll('[data-cat-filter]').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      filterTechniques();
    });
  });

  // Keyboard shortcut: press "/" to focus global search
  document.addEventListener('keydown', e => {
    if (e.key === '/' && document.activeElement.tagName !== 'INPUT') {
      e.preventDefault();
      const search = document.getElementById('global-search');
      if (search) { search.focus(); search.select(); }
    }
    if (e.key === 'Escape') {
      const active = document.activeElement;
      if (active && active.tagName === 'INPUT') active.blur();
    }
  });
}

// ── RENDER: DASHBOARD ──────────────────────────────────────────────────────
function renderDashboard() {
  const totalTechniques = CATEGORIES.reduce((s, c) => s + c.techniques.length, 0);
  const criticalCVEs = CVES.filter(c => c.severity === 'critical').length;

  // Stats
  document.getElementById('stat-categories').textContent = CATEGORIES.length;
  document.getElementById('stat-techniques').textContent = totalTechniques;
  document.getElementById('stat-tools').textContent = TOOLS.length;
  document.getElementById('stat-cves').textContent = CVES.length;
  document.getElementById('stat-critical-cves').textContent = criticalCVEs;
  document.getElementById('stat-detection').textContent = DETECTION_EVENTS.length;

  // Kill chain nodes
  const kcContainer = document.getElementById('killchain-nodes');
  if (!kcContainer) return;

  CATEGORIES.forEach((cat, idx) => {
    if (idx > 0) {
      const arrow = document.createElement('span');
      arrow.className = 'kc-arrow';
      arrow.innerHTML = '<i class="bi bi-chevron-right"></i>';
      kcContainer.appendChild(arrow);
    }
    const node = document.createElement('div');
    node.className = 'kc-node';
    node.style.color = cat.color;
    node.innerHTML = `
      <i class="bi ${cat.icon} kc-icon" style="color:${cat.color}"></i>
      <div class="kc-name">${cat.name}</div>
      <div class="kc-count">${cat.techniques.length} techniques</div>
    `;
    node.addEventListener('click', () => {
      switchTab('techniques');
      const catBtn = document.querySelector(`[data-cat-filter="${cat.id}"]`);
      if (catBtn) catBtn.click();
    });
    kcContainer.appendChild(node);
  });

  // Quick CVE table (top 5 by severity)
  const severityOrder = { critical: 0, high: 1, medium: 2, low: 3 };
  const topCVEs = [...CVES].sort((a, b) => severityOrder[a.severity] - severityOrder[b.severity]).slice(0, 5);
  const cveTableBody = document.getElementById('quick-cve-body');
  if (cveTableBody) {
    cveTableBody.innerHTML = topCVEs.map(cve => `
      <tr>
        <td><span class="cve-id">${cve.id}</span></td>
        <td>${cve.name}</td>
        <td><span class="badge badge-${cve.severity}">${cve.severity.toUpperCase()}</span></td>
        <td class="text-secondary text-small">${cve.year}</td>
      </tr>
    `).join('');
  }

  // Defense checklist progress
  updateTotalProgress();
}

// ── RENDER: TECHNIQUES ─────────────────────────────────────────────────────
function renderTechniques() {
  const container = document.getElementById('techniques-container');
  if (!container) return;
  container.innerHTML = '';

  CATEGORIES.forEach(cat => {
    const section = document.createElement('div');
    section.className = 'category-section';
    section.dataset.categoryId = cat.id;
    section.innerHTML = `
      <div class="category-header" onclick="toggleCategory(this.parentElement)">
        <div class="cat-icon-wrap" style="background:${cat.color}20; color:${cat.color}">
          <i class="bi ${cat.icon}"></i>
        </div>
        <div class="cat-info">
          <div class="cat-name">${cat.name}</div>
          <div class="cat-meta">
            <a href="https://attack.mitre.org/tactics/${cat.mitre}/" target="_blank" rel="noopener"
               class="mitre-badge" style="text-decoration:none" title="MITRE ATT&CK ${cat.mitre}">
              ${cat.mitre} <i class="bi bi-box-arrow-up-right" style="font-size:9px"></i>
            </a>
            &nbsp;${cat.description}
          </div>
        </div>
        <span class="tool-tag" style="color:${cat.color}; border-color:${cat.color}40; background:${cat.color}15">
          ${cat.techniques.length} techniques
        </span>
        <i class="bi bi-chevron-down cat-toggle" style="margin-left:8px"></i>
      </div>
      <div class="category-techniques technique-grid" id="cat-${cat.id}">
        ${cat.techniques.map(t => renderTechniqueCard(t, cat)).join('')}
      </div>
    `;
    container.appendChild(section);
  });
}

function renderTechniqueCard(technique, category) {
  const toolTags = (technique.tools || []).slice(0, 4).map(t =>
    `<span class="tool-tag">${t}</span>`
  ).join('');

  const cveBadges = (technique.cves || []).map(cve =>
    `<span class="badge badge-high">${cve}</span>`
  ).join('');

  const resources = (technique.resources || []).map(r =>
    `<li><a href="${r.url}" target="_blank" rel="noopener">
      <i class="bi bi-box-arrow-up-right"></i>${r.title}
    </a></li>`
  ).join('');

  return `
    <div class="technique-card" data-technique="${technique.name.toLowerCase()}">
      <div class="technique-card-header" onclick="toggleTechnique(this.parentElement)">
        <div class="tc-indicator" style="background:${category.color}"></div>
        <div class="tc-content">
          <div class="tc-name">${technique.name}</div>
          <div class="tc-desc">${technique.description}</div>
        </div>
        <i class="bi bi-chevron-down tc-expand"></i>
      </div>
      <div class="technique-details">
        ${cveBadges ? `<div class="d-flex gap-8 mt-8">${cveBadges}</div>` : ''}
        ${toolTags ? `<div class="tc-tools">${toolTags}</div>` : ''}
        ${resources ? `<ul class="tc-resources">${resources}</ul>` : ''}
      </div>
    </div>
  `;
}

function toggleCategory(section) {
  section.classList.toggle('expanded');
}

function toggleTechnique(card) {
  card.classList.toggle('expanded');
}

// ── RENDER: CVEs ───────────────────────────────────────────────────────────
function renderCVEs() {
  const tbody = document.getElementById('cve-table-body');
  if (!tbody) return;
  renderCVERows(CVES, tbody);
}

function renderCVERows(data, tbody) {
  if (!data.length) {
    tbody.innerHTML = '<tr><td colspan="6" class="no-results"><i class="bi bi-search"></i> 找不到符合的 CVE</td></tr>';
    return;
  }
  const severityOrder = { critical: 0, high: 1, medium: 2, low: 3 };
  const sorted = [...data].sort((a, b) => severityOrder[a.severity] - severityOrder[b.severity]);

  tbody.innerHTML = sorted.map(cve => {
    const tools = (cve.tools || []).map(t => `<span class="tool-tag">${t}</span>`).join(' ');
    return `
      <tr>
        <td><span class="cve-id">${cve.id}</span></td>
        <td class="fw-600">${cve.name}</td>
        <td><span class="badge badge-${cve.severity}">${cve.severity.toUpperCase()}</span></td>
        <td class="text-secondary text-small">${cve.year}</td>
        <td class="text-secondary text-small" style="max-width:280px">${cve.description}</td>
        <td>
          ${tools ? `<div class="d-flex gap-8" style="flex-wrap:wrap">${tools}</div>` : '<span class="text-muted">—</span>'}
          <a href="${cve.url}" target="_blank" rel="noopener" class="text-small" style="color:var(--accent-blue); display:inline-flex; align-items:center; gap:4px; margin-top:4px; text-decoration:none;">
            <i class="bi bi-box-arrow-up-right"></i>Advisory
          </a>
        </td>
      </tr>
    `;
  }).join('');
}

function filterCVEs() {
  const searchVal = (document.getElementById('cve-search')?.value || '').toLowerCase();
  const severity = state.cveFilter;
  const filtered = CVES.filter(cve => {
    const matchSeverity = severity === 'all' || cve.severity === severity;
    const matchSearch = !searchVal ||
      cve.id.toLowerCase().includes(searchVal) ||
      cve.name.toLowerCase().includes(searchVal) ||
      cve.description.toLowerCase().includes(searchVal);
    return matchSeverity && matchSearch;
  });
  const tbody = document.getElementById('cve-table-body');
  if (tbody) renderCVERows(filtered, tbody);
}

// ── RENDER: DETECTION ──────────────────────────────────────────────────────
function renderDetection() {
  const tbody = document.getElementById('detection-table-body');
  if (!tbody) return;
  renderDetectionRows(DETECTION_EVENTS, tbody);
}

function renderDetectionRows(data, tbody) {
  if (!data.length) {
    tbody.innerHTML = '<tr><td colspan="3" class="no-results">找不到符合的偵測規則</td></tr>';
    return;
  }
  tbody.innerHTML = data.map(event => {
    const eventIds = event.eventIds.map(id =>
      `<span class="event-id" onclick="copyEventId('${id}')" title="點擊複製">${id}</span>`
    ).join('');
    const descriptions = event.descriptions.map(d => `<div class="text-small text-secondary">${d}</div>`).join('');
    const catColor = (CATEGORIES.find(c => c.id === event.category) || {}).color || '#8b949e';
    return `
      <tr>
        <td>
          <div class="d-flex align-center gap-8">
            <span style="width:8px; height:8px; border-radius:50%; background:${catColor}; display:inline-block; flex-shrink:0"></span>
            <span class="fw-600">${event.attack}</span>
          </div>
        </td>
        <td><div style="display:flex; flex-wrap:wrap">${eventIds}</div></td>
        <td>${descriptions}</td>
      </tr>
    `;
  }).join('');
}

function filterDetection() {
  const searchVal = (document.getElementById('detection-search')?.value || '').toLowerCase();
  const filtered = DETECTION_EVENTS.filter(e =>
    !searchVal ||
    e.attack.toLowerCase().includes(searchVal) ||
    e.eventIds.some(id => id.includes(searchVal)) ||
    e.descriptions.some(d => d.toLowerCase().includes(searchVal))
  );
  const tbody = document.getElementById('detection-table-body');
  if (tbody) renderDetectionRows(filtered, tbody);
}

function copyEventId(id) {
  navigator.clipboard.writeText(id).then(() => showToast(`已複製 Event ID: ${id}`));
}

// ── RENDER: TOOLS ──────────────────────────────────────────────────────────
function renderTools() {
  const container = document.getElementById('tools-container');
  if (!container) return;
  renderToolCards(TOOLS, container);
}

function renderToolCards(data, container) {
  if (!data.length) {
    container.innerHTML = '<div class="no-results"><i class="bi bi-tools"></i><br>找不到符合的工具</div>';
    return;
  }
  container.innerHTML = `<div class="tools-grid">
    ${data.map(tool => {
      const tags = (tool.tags || []).map(t => `<span class="tool-tag">${t}</span>`).join('');
      const typeLabelMap = { offensive: '攻擊', defensive: '防禦', azure: 'Azure' };
      const typeClass = { offensive: 'tool-tag-offensive', defensive: 'tool-tag-defensive', azure: 'tool-tag-azure' };
      return `
        <div class="tool-card" data-tool-name="${tool.name.toLowerCase()}" data-tool-type="${tool.type}">
          <div class="tool-card-header">
            <span class="tool-name">${tool.name}</span>
            <div class="d-flex align-center gap-8">
              <span class="tool-tag ${typeClass[tool.type] || ''}">${typeLabelMap[tool.type] || tool.type}</span>
              <a href="${tool.url}" target="_blank" rel="noopener" class="tool-link" title="GitHub">
                <i class="bi bi-github"></i>
              </a>
            </div>
          </div>
          <div class="tool-desc">${tool.description}</div>
          <div class="tool-tags">${tags}</div>
        </div>
      `;
    }).join('')}
  </div>`;
}

function filterTools() {
  const searchVal = (document.getElementById('tools-search')?.value || '').toLowerCase();
  const typeFilter = state.toolsFilter;
  const filtered = TOOLS.filter(tool => {
    const matchType = typeFilter === 'all' || tool.type === typeFilter;
    const matchSearch = !searchVal ||
      tool.name.toLowerCase().includes(searchVal) ||
      tool.description.toLowerCase().includes(searchVal) ||
      (tool.tags || []).some(t => t.toLowerCase().includes(searchVal));
    return matchType && matchSearch;
  });
  const container = document.getElementById('tools-container');
  if (container) renderToolCards(filtered, container);
}

// ── RENDER: DEFENSE CHECKLIST ──────────────────────────────────────────────
function renderDefense() {
  const container = document.getElementById('defense-container');
  if (!container) return;

  container.innerHTML = DEFENSE_CHECKLIST.map((section, sIdx) => {
    const items = section.items.map((item, iIdx) => {
      const key = `${sIdx}-${iIdx}`;
      const checked = state.checkedItems[key];
      return `
        <div class="checklist-item ${checked ? 'checked' : ''}" onclick="toggleChecklist('${key}', this)">
          <div class="ci-checkbox">${checked ? '<i class="bi bi-check-lg"></i>' : ''}</div>
          <div class="ci-content">
            <div class="ci-text">${item.text}</div>
            <div class="ci-detail">${item.detail}</div>
          </div>
        </div>
      `;
    }).join('');

    const checkedCount = section.items.filter((_, iIdx) => state.checkedItems[`${sIdx}-${iIdx}`]).length;
    const pct = Math.round((checkedCount / section.items.length) * 100);
    const priorityColors = { critical: 'var(--severity-critical)', high: 'var(--severity-high)', medium: 'var(--severity-medium)' };

    return `
      <div class="checklist-section">
        <div class="checklist-category-header">
          <div class="checklist-category-title">
            <span style="width:10px; height:10px; border-radius:50%; background:${priorityColors[section.priority] || 'var(--text-muted)'}; display:inline-block"></span>
            ${section.category}
          </div>
          <span class="checklist-progress">${checkedCount} / ${section.items.length} 完成</span>
        </div>
        <div class="progress-bar-wrap">
          <div class="progress-bar-fill" style="width:${pct}%"></div>
        </div>
        ${items}
      </div>
    `;
  }).join('');

  updateTotalProgress();
}

function toggleChecklist(key, element) {
  const checked = !state.checkedItems[key];
  if (checked) {
    state.checkedItems[key] = true;
  } else {
    delete state.checkedItems[key];
  }
  localStorage.setItem('ad_checklist', JSON.stringify(state.checkedItems));
  element.classList.toggle('checked', checked);
  const checkbox = element.querySelector('.ci-checkbox');
  if (checkbox) checkbox.innerHTML = checked ? '<i class="bi bi-check-lg"></i>' : '';

  // Update progress for the section
  const section = element.closest('.checklist-section');
  if (section) {
    const items = section.querySelectorAll('.checklist-item');
    const checkedItems = section.querySelectorAll('.checklist-item.checked').length;
    const total = items.length;
    const pct = Math.round((checkedItems / total) * 100);
    const progressEl = section.querySelector('.checklist-progress');
    if (progressEl) progressEl.textContent = `${checkedItems} / ${total} 完成`;
    const fill = section.querySelector('.progress-bar-fill');
    if (fill) fill.style.width = `${pct}%`;
  }

  updateTotalProgress();
}

function updateTotalProgress() {
  const totalItems = DEFENSE_CHECKLIST.reduce((s, c) => s + c.items.length, 0);
  const checkedCount = Object.keys(state.checkedItems).length;
  const pct = Math.round((checkedCount / totalItems) * 100);

  const dashProgress = document.getElementById('dash-checklist-progress');
  if (dashProgress) dashProgress.textContent = `${checkedCount} / ${totalItems} 項目完成 (${pct}%)`;

  const defenseProgress = document.getElementById('dash-checklist-progress-defense');
  if (defenseProgress) defenseProgress.textContent = `${checkedCount} / ${totalItems} 項目完成 (${pct}%)`;

  // Update both progress bars (dashboard tab + defense tab)
  document.querySelectorAll('#dash-progress-fill, #defense-progress-fill').forEach(el => {
    el.style.width = `${pct}%`;
  });

  const statChecklist = document.getElementById('stat-checklist');
  if (statChecklist) statChecklist.textContent = `${pct}%`;
}

// ── FILTER: TECHNIQUES ─────────────────────────────────────────────────────
function filterTechniques() {
  const search = state.globalSearch;
  const catFilter = state.techniquesFilter;
  let totalVisible = 0;

  document.querySelectorAll('.category-section').forEach(section => {
    const catId = section.dataset.categoryId;
    const matchCat = catFilter === 'all' || catId === catFilter;

    if (!matchCat) {
      section.style.display = 'none';
      return;
    }

    if (!search) {
      section.style.display = '';
      section.querySelectorAll('.technique-card').forEach(c => { c.style.display = ''; });
      totalVisible += section.querySelectorAll('.technique-card').length;
      return;
    }

    // Search within techniques
    let anyVisible = false;
    section.querySelectorAll('.technique-card').forEach(card => {
      const text = card.textContent.toLowerCase();
      const visible = text.includes(search);
      card.style.display = visible ? '' : 'none';
      if (visible) { anyVisible = true; totalVisible++; }
    });

    section.style.display = anyVisible ? '' : 'none';
    if (anyVisible && search) section.classList.add('expanded');
  });

  const countEl = document.getElementById('technique-count');
  if (countEl) {
    countEl.textContent = search || catFilter !== 'all' ? `${totalVisible} 項結果` : '';
  }
}

// ── EXPAND / COLLAPSE ALL ──────────────────────────────────────────────────
function expandAllCategories() {
  document.querySelectorAll('.category-section').forEach(s => s.classList.add('expanded'));
}

function collapseAllCategories() {
  document.querySelectorAll('.category-section').forEach(s => s.classList.remove('expanded'));
}

// ── UTILITY ────────────────────────────────────────────────────────────────
function showToast(message) {
  const existing = document.querySelector('.toast');
  if (existing) existing.remove();

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `<i class="bi bi-clipboard-check" style="color:var(--color-defense)"></i> ${message}`;
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 2500);
}
