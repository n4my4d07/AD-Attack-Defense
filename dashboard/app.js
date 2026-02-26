// AD Kill Chain Attack & Defense Dashboard - Application Logic

// ── I18N ───────────────────────────────────────────────────────────────────
const I18N = {
  zh: {
    search_placeholder: '搜尋技術、工具、CVE…',
    nav_dashboard: '總覽', nav_techniques: '攻擊技術', nav_cves: 'CVE 追蹤',
    nav_detection: '偵測參考', nav_tools: '工具庫', nav_defense: '防禦清單',
    dash_title: 'Active Directory 攻防總覽',
    dash_desc: 'AD Kill Chain 攻擊鏈分析與防禦資源整合儀表板 — 紅隊 / 教育訓練用途',
    stat_categories: '攻擊類別', stat_techniques: '攻擊技術', stat_cves: '追蹤 CVE',
    stat_critical: '嚴重漏洞', stat_tools: '工具收錄', stat_detection: '偵測規則', stat_defense: '防禦完成度',
    kc_title: 'AD 攻擊殺傷鏈 (Kill Chain)',
    techniques_title: '攻擊技術庫', techniques_desc: '依 AD Kill Chain 分類的完整攻擊技術，含工具、CVE 與參考資源',
    search_technique: '搜尋技術名稱、工具、CVE… (按 / 快速開啟)',
    filter_all: '全部', expand_all: '展開全部', collapse_all: '收合全部',
    cves_title: 'CVE 漏洞追蹤', cves_desc: 'Active Directory 相關重要 CVE，含嚴重性評估、描述與緩解連結',
    search_cve: '搜尋 CVE ID、漏洞名稱…',
    detection_title: '偵測事件 ID 參考', detection_desc: '各攻擊手法對應的 Windows Event ID，點擊 Event ID 可複製 | 搭配 Sysmon / SIEM (Sigma) 使用效果最佳',
    search_detection: '搜尋攻擊手法或 Event ID…',
    tools_title: '工具庫', tools_desc: 'AD 攻防相關工具收錄，涵蓋攻擊、防禦、稽核與 Azure 類別',
    search_tools: '搜尋工具名稱、功能標籤…',
    filter_offensive: '攻擊工具', filter_defensive: '防禦工具', filter_azure: 'Azure 工具',
    defense_title: '防禦安全清單', defense_desc: '依 Sean Metcalf (@Pyrotek3) 建議整理的 AD 安全稽核清單，可逐項勾選追蹤進度',
    defense_overall: '整體完成進度', reset_progress: '重設進度',
    checklist_done: '完成', steps_btn: '設定步驟',
    col_cve: 'CVE ID', col_cve_name: '漏洞名稱', col_severity: '嚴重性', col_year: '年份',
    col_desc: '描述', col_tools_links: '工具 / 連結',
    col_attack: '攻擊手法', col_eventids: 'Windows Event ID（點擊複製）', col_notes: '說明',
    view_all: '查看全部', start_audit: '開始稽核',
    severity_critical: '嚴重 (Critical)', severity_high: '高危 (High)', severity_medium: '中危 (Medium)',
    advisory: 'Advisory', no_cve: '找不到符合的 CVE', no_detection: '找不到符合的偵測規則', no_tools: '找不到符合的工具',
    dash_quick_cve_label: '高危 CVE（按嚴重性排序）',
    dash_defense_checklist_label: '防禦清單進度',
    click_to_copy: '點擊複製',
    copied_toast: (id) => `已複製 Event ID: ${id}`,
    detect_tips_title: '偵測建議',
    detect_tip_audit: '啟用 <strong>Enhanced Audit Policy</strong>（gpedit.msc → Advanced Audit Policy Configuration）',
    detect_tip_sysmon: '部署 <strong>Sysmon</strong> 並使用 sysmon-modular 設定，以擷取更詳細的程序、網路、登錄事件',
    detect_tip_sigma: '使用 <strong>Sigma</strong> 規則將偵測邏輯轉換為 Splunk、Elastic、Azure Sentinel 等 SIEM 查詢語法',
    detect_tip_events: '留意 4769（Kerberoasting：RC4 加密）、4768（AS-REP Roasting）、4662（DCSync：Replication rights）',
    detect_tip_monitor: '建議監控 <strong>KRBTGT 密碼重設</strong>、<strong>DC 帳戶變更</strong>及<strong>不尋常的 Kerberos TGT 請求</strong>',
    data_source: '資料來源',
    results: (n) => `${n} 項結果`,
    progress_text: (done, total, pct) => `${done} / ${total} 項目完成 (${pct}%)`,
    techniques_count: (n) => `${n} techniques`,
  },
  en: {
    search_placeholder: 'Search techniques, tools, CVE…',
    nav_dashboard: 'Overview', nav_techniques: 'Techniques', nav_cves: 'CVE Tracker',
    nav_detection: 'Detection', nav_tools: 'Tools', nav_defense: 'Defense Checklist',
    dash_title: 'Active Directory Attack & Defense Overview',
    dash_desc: 'AD Kill Chain analysis and defense resource dashboard — Red Team / Education',
    stat_categories: 'Categories', stat_techniques: 'Techniques', stat_cves: 'CVEs Tracked',
    stat_critical: 'Critical CVEs', stat_tools: 'Tools', stat_detection: 'Detection Rules', stat_defense: 'Defense Progress',
    kc_title: 'AD Attack Kill Chain',
    techniques_title: 'Technique Library', techniques_desc: 'AD Kill Chain attack techniques with tools, CVEs and references',
    search_technique: 'Search techniques, tools, CVE… (press / to focus)',
    filter_all: 'All', expand_all: 'Expand All', collapse_all: 'Collapse All',
    cves_title: 'CVE Tracker', cves_desc: 'Key AD-related CVEs with severity, description and mitigation links',
    search_cve: 'Search CVE ID, name…',
    detection_title: 'Detection Event IDs', detection_desc: 'Windows Event IDs per attack technique — click to copy | Works best with Sysmon / SIEM (Sigma)',
    search_detection: 'Search technique or Event ID…',
    tools_title: 'Tool Library', tools_desc: 'AD attack/defense tools covering offensive, defensive, audit and Azure',
    search_tools: 'Search tool name or tag…',
    filter_offensive: 'Offensive', filter_defensive: 'Defensive', filter_azure: 'Azure',
    defense_title: 'Defense Checklist', defense_desc: 'AD security audit checklist based on Sean Metcalf (@Pyrotek3) recommendations',
    defense_overall: 'Overall Progress', reset_progress: 'Reset Progress',
    checklist_done: 'done', steps_btn: 'Config Steps',
    col_cve: 'CVE ID', col_cve_name: 'Vulnerability', col_severity: 'Severity', col_year: 'Year',
    col_desc: 'Description', col_tools_links: 'Tools / Links',
    col_attack: 'Attack', col_eventids: 'Windows Event ID (click to copy)', col_notes: 'Notes',
    view_all: 'View All', start_audit: 'Start Audit',
    severity_critical: 'Critical', severity_high: 'High', severity_medium: 'Medium',
    advisory: 'Advisory', no_cve: 'No CVEs found', no_detection: 'No detection rules found', no_tools: 'No tools found',
    dash_quick_cve_label: 'High-Risk CVEs (by Severity)',
    dash_defense_checklist_label: 'Defense Checklist Progress',
    click_to_copy: 'Click to copy',
    copied_toast: (id) => `Copied Event ID: ${id}`,
    detect_tips_title: 'Detection Tips',
    detect_tip_audit: 'Enable <strong>Enhanced Audit Policy</strong> (gpedit.msc → Advanced Audit Policy Configuration)',
    detect_tip_sysmon: 'Deploy <strong>Sysmon</strong> with sysmon-modular config to capture process, network, and registry events',
    detect_tip_sigma: 'Use <strong>Sigma</strong> rules to convert detection logic to Splunk, Elastic, Azure Sentinel SIEM queries',
    detect_tip_events: 'Watch for 4769 (Kerberoasting: RC4), 4768 (AS-REP Roasting), 4662 (DCSync: Replication rights)',
    detect_tip_monitor: 'Monitor <strong>KRBTGT password resets</strong>, <strong>DC account changes</strong>, and <strong>unusual Kerberos TGT requests</strong>',
    data_source: 'Data Source',
    results: (n) => `${n} result${n === 1 ? '' : 's'}`,
    progress_text: (done, total, pct) => `${done} / ${total} items done (${pct}%)`,
    techniques_count: (n) => `${n} techniques`,
  },
  ja: {
    search_placeholder: '技術・ツール・CVEを検索…',
    nav_dashboard: 'ダッシュボード', nav_techniques: '攻撃技術', nav_cves: 'CVE追跡',
    nav_detection: '検知リファレンス', nav_tools: 'ツール', nav_defense: '防御チェック',
    dash_title: 'Active Directory 攻防ダッシュボード',
    dash_desc: 'AD Kill Chain 攻撃・防御リソース統合ダッシュボード — レッドチーム / 教育用途',
    stat_categories: '攻撃カテゴリ', stat_techniques: '攻撃技術', stat_cves: '追跡CVE',
    stat_critical: '深刻な脆弱性', stat_tools: '収録ツール', stat_detection: '検知ルール', stat_defense: '防御達成率',
    kc_title: 'AD 攻撃キルチェーン',
    techniques_title: '攻撃技術ライブラリ', techniques_desc: 'AD Kill Chain 分類の攻撃技術一覧（ツール・CVE・参考資料付き）',
    search_technique: '技術名・ツール・CVEを検索… (/ でフォーカス)',
    filter_all: 'すべて', expand_all: 'すべて展開', collapse_all: 'すべて折りたたむ',
    cves_title: 'CVE脆弱性追跡', cves_desc: 'AD関連の重要CVE（深刻度・説明・緩和策リンク付き）',
    search_cve: 'CVE IDまたは脆弱性名で検索…',
    detection_title: 'イベントID検知リファレンス', detection_desc: '攻撃手法対応の Windows Event ID — クリックでコピー | Sysmon / SIEM (Sigma) との併用を推奨',
    search_detection: '攻撃手法またはEvent IDで検索…',
    tools_title: 'ツールライブラリ', tools_desc: 'AD攻防関連ツール（攻撃・防御・監査・Azure）',
    search_tools: 'ツール名またはタグで検索…',
    filter_offensive: '攻撃ツール', filter_defensive: '防御ツール', filter_azure: 'Azureツール',
    defense_title: '防御セキュリティチェックリスト', defense_desc: 'Sean Metcalf (@Pyrotek3) の推奨に基づくADセキュリティ監査チェックリスト',
    defense_overall: '全体達成率', reset_progress: 'リセット',
    checklist_done: '完了', steps_btn: '設定手順',
    col_cve: 'CVE ID', col_cve_name: '脆弱性名', col_severity: '深刻度', col_year: '年',
    col_desc: '説明', col_tools_links: 'ツール / リンク',
    col_attack: '攻撃手法', col_eventids: 'Windows Event ID（クリックでコピー）', col_notes: '説明',
    view_all: 'すべて表示', start_audit: '監査開始',
    severity_critical: '深刻 (Critical)', severity_high: '高 (High)', severity_medium: '中 (Medium)',
    advisory: 'アドバイザリ', no_cve: 'CVEが見つかりません', no_detection: '検知ルールが見つかりません', no_tools: 'ツールが見つかりません',
    dash_quick_cve_label: '高リスクCVE（深刻度順）',
    dash_defense_checklist_label: '防御チェックリスト進捗',
    click_to_copy: 'クリックでコピー',
    copied_toast: (id) => `Event IDをコピー: ${id}`,
    detect_tips_title: '検知のヒント',
    detect_tip_audit: '<strong>Enhanced Audit Policy</strong> を有効化（gpedit.msc → Advanced Audit Policy Configuration）',
    detect_tip_sysmon: '<strong>Sysmon</strong> を sysmon-modular 設定で展開し、プロセス・ネットワーク・レジストリイベントを収集',
    detect_tip_sigma: '<strong>Sigma</strong> ルールを使用してSplunk・Elastic・Azure Sentinel向けのSIEMクエリに変換',
    detect_tip_events: '4769（Kerberoasting：RC4）・4768（AS-REP Roasting）・4662（DCSync：Replication rights）に注意',
    detect_tip_monitor: '<strong>KRBTGTパスワードリセット</strong>・<strong>DCアカウント変更</strong>・<strong>異常なKerberos TGTリクエスト</strong>を監視',
    data_source: 'データソース',
    results: (n) => `${n}件の結果`,
    progress_text: (done, total, pct) => `${done} / ${total} 項目完了 (${pct}%)`,
    techniques_count: (n) => `${n} 技術`,
  }
};

function t(key, ...args) {
  const dict = I18N[state.lang] || I18N.zh;
  const val = dict[key];
  if (typeof val === 'function') return val(...args);
  return val !== undefined ? val : (I18N.zh[key] || key);
}

function applyI18n() {
  // Nav tabs
  document.querySelector('[data-tab="dashboard"]').innerHTML = `<i class="bi bi-grid-1x2"></i> ${t('nav_dashboard')}`;
  document.querySelector('[data-tab="techniques"]').innerHTML = `<i class="bi bi-diagram-3"></i> ${t('nav_techniques')}`;
  document.querySelector('[data-tab="cves"]').innerHTML = `<i class="bi bi-bug"></i> ${t('nav_cves')}`;
  document.querySelector('[data-tab="detection"]').innerHTML = `<i class="bi bi-eye"></i> ${t('nav_detection')}`;
  document.querySelector('[data-tab="tools"]').innerHTML = `<i class="bi bi-tools"></i> ${t('nav_tools')}`;
  document.querySelector('[data-tab="defense"]').innerHTML = `<i class="bi bi-shield-check"></i> ${t('nav_defense')}`;

  // Global search placeholder
  const gs = document.getElementById('global-search');
  if (gs) gs.placeholder = t('search_placeholder');

  // Stat labels
  ['categories','techniques','cves','critical-cves','tools','detection','checklist'].forEach((id, i) => {
    const labels = ['stat_categories','stat_techniques','stat_cves','stat_critical','stat_tools','stat_detection','stat_defense'];
    const el = document.querySelector(`#stat-${id} + .stat-label`);
    if (el) el.textContent = t(labels[i]);
  });

  // Kill chain title
  const kcTitle = document.querySelector('.killchain-title');
  if (kcTitle) kcTitle.innerHTML = `<i class="bi bi-arrow-right-circle"></i> ${t('kc_title')}`;

  // Section headers for all tabs
  setI18nSection('tab-dashboard', 'bi-grid-1x2', 'dash_title', 'dash_desc');
  setI18nSection('tab-techniques', 'bi-diagram-3', 'techniques_title', 'techniques_desc');
  setI18nSection('tab-cves', 'bi-bug', 'cves_title', 'cves_desc');
  setI18nSection('tab-detection', 'bi-eye', 'detection_title', 'detection_desc');
  setI18nSection('tab-tools', 'bi-tools', 'tools_title', 'tools_desc');
  setI18nSection('tab-defense', 'bi-shield-check', 'defense_title', 'defense_desc');

  // Placeholders
  setPlaceholder('technique-search', t('search_technique'));
  setPlaceholder('cve-search', t('search_cve'));
  setPlaceholder('detection-search', t('search_detection'));
  setPlaceholder('tools-search', t('search_tools'));

  // Filter buttons
  document.querySelectorAll('[data-cat-filter="all"], [data-cve-filter="all"], [data-tool-filter="all"]').forEach(b => b.textContent = t('filter_all'));
  document.querySelectorAll('[data-tool-filter="offensive"]').forEach(b => b.innerHTML = `<i class="bi bi-lightning"></i> ${t('filter_offensive')}`);
  document.querySelectorAll('[data-tool-filter="defensive"]').forEach(b => b.innerHTML = `<i class="bi bi-shield"></i> ${t('filter_defensive')}`);
  document.querySelectorAll('[data-tool-filter="azure"]').forEach(b => b.innerHTML = `<i class="bi bi-cloud"></i> ${t('filter_azure')}`);

  // Expand/collapse
  const expandBtn = document.querySelector('[onclick="expandAllCategories()"]');
  if (expandBtn) expandBtn.innerHTML = `<i class="bi bi-arrows-angle-expand"></i> ${t('expand_all')}`;
  const collapseBtn = document.querySelector('[onclick="collapseAllCategories()"]');
  if (collapseBtn) collapseBtn.innerHTML = `<i class="bi bi-arrows-angle-contract"></i> ${t('collapse_all')}`;

  // Severity filter labels
  const cveSevLabels = { critical: 'severity_critical', high: 'severity_high', medium: 'severity_medium' };
  Object.entries(cveSevLabels).forEach(([sev, key]) => {
    const btn = document.querySelector(`[data-cve-filter="${sev}"]`);
    if (btn) btn.innerHTML = `<span style="color:var(--severity-${sev})">●</span> ${t(key)}`;
  });

  // Defense section header
  setTextById('defense-overall-label', t('defense_overall'));
  const resetBtn = document.querySelector('[onclick*="ad_checklist"]');
  if (resetBtn) resetBtn.innerHTML = `<i class="bi bi-arrow-counterclockwise"></i> ${t('reset_progress')}`;

  // Dashboard: quick CVE section
  const quickCveLabel = document.getElementById('dash-quick-cve-label');
  if (quickCveLabel) quickCveLabel.innerHTML = `<i class="bi bi-bug" style="color:var(--severity-high)"></i> ${t('dash_quick_cve_label')}`;
  const viewAllBtn = document.getElementById('dash-view-all-btn');
  if (viewAllBtn) viewAllBtn.innerHTML = `${t('view_all')} <i class="bi bi-arrow-right"></i>`;

  // Dashboard: CVE table headers
  setTextById('dash-th-cve-name', t('col_cve_name'));
  setTextById('dash-th-cve-severity', t('col_severity'));
  setTextById('dash-th-cve-year', t('col_year'));

  // Dashboard: defense progress section
  const defProgressLabel = document.getElementById('dash-defense-progress-label');
  if (defProgressLabel) defProgressLabel.innerHTML = `<i class="bi bi-shield-check" style="color:var(--color-defense)"></i> ${t('dash_defense_checklist_label')}`;
  const startAuditBtn = document.getElementById('dash-start-audit-btn');
  if (startAuditBtn) startAuditBtn.innerHTML = `${t('start_audit')} <i class="bi bi-arrow-right"></i>`;

  // Dashboard: defense categories list
  renderDashDefenseCats();

  // CVE tab table headers
  setTextById('cve-th-name', t('col_cve_name'));
  setTextById('cve-th-severity', t('col_severity'));
  setTextById('cve-th-year', t('col_year'));
  setTextById('cve-th-desc', t('col_desc'));
  setTextById('cve-th-tools', t('col_tools_links'));

  // Detection tab table headers
  setTextById('det-th-attack', t('col_attack'));
  setTextById('det-th-eventids', t('col_eventids'));
  setTextById('det-th-notes', t('col_notes'));

  // Detection tips card
  renderDetectionTips();

  // Data source footer
  setTextById('data-source-label', t('data_source'));

  // html lang attribute
  document.documentElement.lang = state.lang === 'zh' ? 'zh-TW' : state.lang === 'ja' ? 'ja' : 'en';

  // Kill chain node counts (update without full re-render)
  document.querySelectorAll('.kc-count').forEach((el, i) => {
    if (CATEGORIES[i]) el.textContent = t('techniques_count', CATEGORIES[i].techniques.length);
  });

  // Re-render dynamic content
  renderCVEs();
  renderDetection();
  renderTools();
  renderDefense();
  updateTotalProgress();
}

function setI18nSection(tabId, icon, titleKey, descKey) {
  const tab = document.getElementById(tabId);
  if (!tab) return;
  const title = tab.querySelector('.section-title');
  if (title) title.innerHTML = `<i class="bi ${icon}"></i> ${t(titleKey)}`;
  const desc = tab.querySelector('.section-desc');
  if (desc) desc.textContent = t(descKey);
}

function setPlaceholder(id, text) {
  const el = document.getElementById(id);
  if (el) el.placeholder = text;
}

function setTextById(id, text) {
  const el = document.getElementById(id);
  if (el) el.textContent = text;
}

function renderDashDefenseCats() {
  const el = document.getElementById('dash-defense-cats');
  if (!el) return;
  const priorityColors = { critical: 'var(--severity-critical)', high: 'var(--severity-high)', medium: 'var(--severity-medium)' };
  el.innerHTML = DEFENSE_CHECKLIST.map(s =>
    `<div><span style="color:${priorityColors[s.priority] || 'var(--text-muted)'}">●</span> ${s.category}</div>`
  ).join('');
}

function renderDetectionTips() {
  const el = document.getElementById('detection-tips-body');
  if (!el) return;
  el.innerHTML = `
    <div class="fw-600 text-primary mb-16"><i class="bi bi-info-circle"></i> ${t('detect_tips_title')}</div>
    <div>• ${t('detect_tip_audit')}</div>
    <div>• ${t('detect_tip_sysmon')}</div>
    <div>• ${t('detect_tip_sigma')}</div>
    <div>• ${t('detect_tip_events')}</div>
    <div>• ${t('detect_tip_monitor')}</div>
  `;
}

// ── STATE ──────────────────────────────────────────────────────────────────
const state = {
  activeTab: 'dashboard',
  globalSearch: '',
  techniquesFilter: 'all',
  toolsFilter: 'all',
  cveFilter: 'all',
  lang: localStorage.getItem('ad_lang') || 'zh',
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
  applyI18n();
  // Set active lang button
  document.querySelectorAll('.lang-btn').forEach(b => {
    b.classList.toggle('active', b.dataset.lang === state.lang);
  });
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

  // Language switcher
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      state.lang = btn.dataset.lang;
      localStorage.setItem('ad_lang', state.lang);
      document.querySelectorAll('.lang-btn').forEach(b => b.classList.toggle('active', b.dataset.lang === state.lang));
      applyI18n();
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
      <div class="kc-count">${t('techniques_count', cat.techniques.length)}</div>
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
          ${t('techniques_count', cat.techniques.length)}
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
    tbody.innerHTML = `<tr><td colspan="6" class="no-results"><i class="bi bi-search"></i> ${t('no_cve')}</td></tr>`;
    return;
  }
  const severityOrder = { critical: 0, high: 1, medium: 2, low: 3 };
  const sorted = [...data].sort((a, b) => severityOrder[a.severity] - severityOrder[b.severity]);

  tbody.innerHTML = sorted.map(cve => {
    const toolTags = (cve.tools || []).map(tool => `<span class="tool-tag">${tool}</span>`).join(' ');
    return `
      <tr>
        <td><span class="cve-id">${cve.id}</span></td>
        <td class="fw-600">${cve.name}</td>
        <td><span class="badge badge-${cve.severity}">${cve.severity.toUpperCase()}</span></td>
        <td class="text-secondary text-small">${cve.year}</td>
        <td class="text-secondary text-small" style="max-width:280px">${cve.description}</td>
        <td>
          ${toolTags ? `<div class="d-flex gap-8" style="flex-wrap:wrap">${toolTags}</div>` : '<span class="text-muted">—</span>'}
          <a href="${cve.url}" target="_blank" rel="noopener" class="text-small" style="color:var(--accent-blue); display:inline-flex; align-items:center; gap:4px; margin-top:4px; text-decoration:none;">
            <i class="bi bi-box-arrow-up-right"></i>${t('advisory')}
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
    tbody.innerHTML = `<tr><td colspan="3" class="no-results">${t('no_detection')}</td></tr>`;
    return;
  }
  tbody.innerHTML = data.map(event => {
    const eventIds = event.eventIds.map(id =>
      `<span class="event-id" onclick="copyEventId('${id}')" title="${t('click_to_copy')}">${id}</span>`
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
  navigator.clipboard.writeText(id).then(() => showToast(t('copied_toast', id)));
}

// ── RENDER: TOOLS ──────────────────────────────────────────────────────────
function renderTools() {
  const container = document.getElementById('tools-container');
  if (!container) return;
  renderToolCards(TOOLS, container);
}

function renderToolCards(data, container) {
  if (!data.length) {
    container.innerHTML = `<div class="no-results"><i class="bi bi-tools"></i><br>${t('no_tools')}</div>`;
    return;
  }
  container.innerHTML = `<div class="tools-grid">
    ${data.map(tool => {
      const tags = (tool.tags || []).map(tag => `<span class="tool-tag">${tag}</span>`).join('');
      const typeLabelMap = { offensive: t('filter_offensive'), defensive: t('filter_defensive'), azure: t('filter_azure') };
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
      const stepsHtml = (item.steps || []).map((step, stepIdx) => {
        const icons = { cmd: 'bi-terminal', info: 'bi-info-circle', warn: 'bi-exclamation-triangle' };
        const colors = { cmd: 'var(--color-lateral)', info: 'var(--accent-blue)', warn: 'var(--severity-high)' };
        const isCode = step.type === 'cmd';
        return `
          <div class="step-item step-${step.type}">
            <i class="bi ${icons[step.type] || 'bi-dot'}" style="color:${colors[step.type] || 'var(--text-muted)'}; flex-shrink:0; margin-top:2px"></i>
            ${isCode
              ? `<pre class="step-code">${escapeHtml(step.text)}</pre>`
              : `<span class="step-text">${step.text}</span>`
            }
          </div>
        `;
      }).join('');

      const hasSteps = (item.steps || []).length > 0;
      return `
        <div class="checklist-item ${checked ? 'checked' : ''}">
          <div class="ci-checkbox" onclick="toggleChecklist('${key}', this.closest('.checklist-item'))">${checked ? '<i class="bi bi-check-lg"></i>' : ''}</div>
          <div class="ci-content">
            <div class="ci-header">
              <div class="ci-text" onclick="toggleChecklist('${key}', this.closest('.checklist-item'))">${item.text}</div>
              ${hasSteps ? `<button class="steps-toggle" onclick="toggleSteps(this)" aria-expanded="false">
                <i class="bi bi-list-task"></i> ${t('steps_btn')} <i class="bi bi-chevron-down steps-chevron"></i>
              </button>` : ''}
            </div>
            <div class="ci-detail">${item.detail}</div>
            ${hasSteps ? `<div class="steps-container" style="display:none">${stepsHtml}</div>` : ''}
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
          <span class="checklist-progress">${checkedCount} / ${section.items.length} ${t('checklist_done')}</span>
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
    const checkedCount = section.querySelectorAll('.checklist-item.checked').length;
    const total = items.length;
    const pct = Math.round((checkedCount / total) * 100);
    const progressEl = section.querySelector('.checklist-progress');
    if (progressEl) progressEl.textContent = `${checkedCount} / ${total} ${t('checklist_done')}`;
    const fill = section.querySelector('.progress-bar-fill');
    if (fill) fill.style.width = `${pct}%`;
  }

  updateTotalProgress();
}

function toggleSteps(btn) {
  const container = btn.closest('.ci-content').querySelector('.steps-container');
  if (!container) return;
  const expanded = btn.getAttribute('aria-expanded') === 'true';
  container.style.display = expanded ? 'none' : 'block';
  btn.setAttribute('aria-expanded', String(!expanded));
  btn.querySelector('.steps-chevron').style.transform = expanded ? '' : 'rotate(180deg)';
}

function escapeHtml(str) {
  return str.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
}

function updateTotalProgress() {
  const totalItems = DEFENSE_CHECKLIST.reduce((s, c) => s + c.items.length, 0);
  const checkedCount = Object.keys(state.checkedItems).length;
  const pct = Math.round((checkedCount / totalItems) * 100);

  const progressText = t('progress_text', checkedCount, totalItems, pct);
  const dashProgress = document.getElementById('dash-checklist-progress');
  if (dashProgress) dashProgress.textContent = progressText;

  const defenseProgress = document.getElementById('dash-checklist-progress-defense');
  if (defenseProgress) defenseProgress.textContent = progressText;

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
    countEl.textContent = search || catFilter !== 'all' ? t('results', totalVisible) : '';
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
