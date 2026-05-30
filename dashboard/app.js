// AD Kill Chain Attack & Defense Dashboard - Application Logic

// ── I18N ───────────────────────────────────────────────────────────────────
const I18N = {
  zh: {
    search_placeholder: '搜尋技術、工具、CVE…',
    nav_dashboard: '總覽',
    nav_techniques: '攻擊技術',
    nav_cves: 'CVE 追蹤',
    nav_detection: '偵測參考',
    nav_tools: '工具庫',
    nav_defense: '防禦清單',
    nav_references: '參考資料',
    dash_title: 'Active Directory 攻防總覽',
    dash_desc: 'AD Kill Chain 攻擊鏈分析與防禦資源整合儀表板 — 紅隊 / 教育訓練用途',
    stat_categories: '攻擊類別',
    stat_techniques: '攻擊技術',
    stat_cves: '追蹤 CVE',
    stat_critical: '嚴重漏洞',
    stat_tools: '工具收錄',
    stat_detection: '偵測規則',
    stat_defense: '防禦完成度',
    kc_title: 'AD 攻擊殺傷鏈 (Kill Chain)',
    techniques_title: '攻擊技術庫',
    techniques_desc: '依 AD Kill Chain 分類的完整攻擊技術，含工具、CVE 與參考資源',
    search_technique: '搜尋技術名稱、工具、CVE… (按 / 快速開啟)',
    filter_all: '全部',
    expand_all: '展開全部',
    collapse_all: '收合全部',
    cves_title: 'CVE 漏洞追蹤',
    cves_desc: 'Active Directory 相關重要 CVE，含嚴重性評估、描述與緩解連結',
    search_cve: '搜尋 CVE ID、漏洞名稱…',
    detection_title: '偵測事件 ID 參考',
    detection_desc:
      '各攻擊手法對應的 Windows Event ID，點擊 Event ID 可複製 | 搭配 Sysmon / SIEM (Sigma) 使用效果最佳',
    search_detection: '搜尋攻擊手法或 Event ID…',
    tools_title: '工具庫',
    tools_desc: 'AD 攻防相關工具收錄，涵蓋攻擊、防禦、稽核與 Azure 類別',
    search_tools: '搜尋工具名稱、功能標籤…',
    filter_offensive: '攻擊工具',
    filter_defensive: '防禦工具',
    filter_azure: 'Azure 工具',
    defense_title: '防禦安全清單',
    defense_desc:
      '整合業界最佳實踐與威脅情報，涵蓋帳戶保護、Kerberos 強化、網路隔離、日誌稽核等 AD 關鍵防禦領域，可逐項勾選追蹤修補進度',
    defense_overall: '整體完成進度',
    reset_progress: '重設進度',
    checklist_done: '完成',
    steps_btn: '設定步驟',
    col_cve: 'CVE ID',
    col_cve_name: '漏洞名稱',
    col_severity: '嚴重性',
    col_year: '年份',
    col_desc: '描述',
    col_tools_links: '工具 / 連結',
    col_attack: '攻擊手法',
    col_eventids: 'Windows Event ID（點擊複製）',
    col_notes: '說明',
    view_all: '查看全部',
    start_audit: '開始稽核',
    severity_critical: '嚴重 (Critical)',
    severity_high: '高危 (High)',
    severity_medium: '中危 (Medium)',
    advisory: 'Advisory',
    no_cve: '找不到符合的 CVE',
    no_detection: '找不到符合的偵測規則',
    no_tools: '找不到符合的工具',
    dash_quick_cve_label: '高危 CVE（按嚴重性排序）',
    dash_defense_checklist_label: '防禦清單進度',
    click_to_copy: '點擊複製',
    copied_toast: (id) => `已複製 Event ID: ${id}`,
    detect_tips_title: '偵測建議',
    detect_tip_audit:
      '啟用 <strong>Enhanced Audit Policy</strong>（gpedit.msc → Advanced Audit Policy Configuration）',
    detect_tip_sysmon:
      '部署 <strong>Sysmon</strong> 並使用 sysmon-modular 設定，以擷取更詳細的程序、網路、登錄事件',
    detect_tip_sigma:
      '使用 <strong>Sigma</strong> 規則將偵測邏輯轉換為 Splunk、Elastic、Azure Sentinel 等 SIEM 查詢語法',
    detect_tip_events:
      '留意 4769（Kerberoasting：RC4 加密）、4768（AS-REP Roasting）、4662（DCSync：Replication rights）',
    detect_tip_monitor:
      '建議監控 <strong>KRBTGT 密碼重設</strong>、<strong>DC 帳戶變更</strong>及<strong>不尋常的 Kerberos TGT 請求</strong>',
    results: (n) => `${n} 項結果`,
    progress_text: (done, total, pct) => `${done} / ${total} 項目完成 (${pct}%)`,
    techniques_count: (n) => `${n} techniques`,
    export_checklist: '匯出清單',
    export_toast: '防禦清單已匯出為 Markdown 檔案',
    references_title: '參考資料',
    references_desc:
      '整合官方文件、學術研究、攻防工具說明及 CVE 公告等來源，提供 AD 安全研究的完整資料索引',
    ref_tag_official: '官方',
    ref_tag_research: '研究',
    ref_tag_tool: '工具',
    ref_tag_cve: 'CVE',
    ref_tag_framework: '框架',
    search_references: '搜尋標題、說明…',
    ref_filter_all: '全部',
    no_references: '找不到符合的參考資料',
    no_techniques: '找不到符合的攻擊技術',
    page_title: 'AD Kill Chain 攻防儀表板',
    meta_description:
      'AD Kill Chain 攻擊鏈分析與防禦資源整合儀表板，涵蓋 200+ 攻擊技術、40+ CVE、偵測規則與防禦清單',
  },
  en: {
    search_placeholder: 'Search techniques, tools, CVE…',
    nav_dashboard: 'Overview',
    nav_techniques: 'Techniques',
    nav_cves: 'CVE Tracker',
    nav_detection: 'Detection',
    nav_tools: 'Tools',
    nav_defense: 'Defense Checklist',
    nav_references: 'References',
    dash_title: 'Active Directory Attack & Defense Overview',
    dash_desc: 'AD Kill Chain analysis and defense resource dashboard — Red Team / Education',
    stat_categories: 'Categories',
    stat_techniques: 'Techniques',
    stat_cves: 'CVEs Tracked',
    stat_critical: 'Critical CVEs',
    stat_tools: 'Tools',
    stat_detection: 'Detection Rules',
    stat_defense: 'Defense Progress',
    kc_title: 'AD Attack Kill Chain',
    techniques_title: 'Technique Library',
    techniques_desc: 'AD Kill Chain attack techniques with tools, CVEs and references',
    search_technique: 'Search techniques, tools, CVE… (press / to focus)',
    filter_all: 'All',
    expand_all: 'Expand All',
    collapse_all: 'Collapse All',
    cves_title: 'CVE Tracker',
    cves_desc: 'Key AD-related CVEs with severity, description and mitigation links',
    search_cve: 'Search CVE ID, name…',
    detection_title: 'Detection Event IDs',
    detection_desc:
      'Windows Event IDs per attack technique — click to copy | Works best with Sysmon / SIEM (Sigma)',
    search_detection: 'Search technique or Event ID…',
    tools_title: 'Tool Library',
    tools_desc: 'AD attack/defense tools covering offensive, defensive, audit and Azure',
    search_tools: 'Search tool name or tag…',
    filter_offensive: 'Offensive',
    filter_defensive: 'Defensive',
    filter_azure: 'Azure',
    defense_title: 'Defense Checklist',
    defense_desc:
      'A comprehensive AD defense checklist integrating industry best practices and threat intelligence — covering account protection, Kerberos hardening, network segmentation, logging, and more. Track your remediation progress item by item.',
    defense_overall: 'Overall Progress',
    reset_progress: 'Reset Progress',
    checklist_done: 'done',
    steps_btn: 'Config Steps',
    col_cve: 'CVE ID',
    col_cve_name: 'Vulnerability',
    col_severity: 'Severity',
    col_year: 'Year',
    col_desc: 'Description',
    col_tools_links: 'Tools / Links',
    col_attack: 'Attack',
    col_eventids: 'Windows Event ID (click to copy)',
    col_notes: 'Notes',
    view_all: 'View All',
    start_audit: 'Start Audit',
    severity_critical: 'Critical',
    severity_high: 'High',
    severity_medium: 'Medium',
    advisory: 'Advisory',
    no_cve: 'No CVEs found',
    no_detection: 'No detection rules found',
    no_tools: 'No tools found',
    dash_quick_cve_label: 'High-Risk CVEs (by Severity)',
    dash_defense_checklist_label: 'Defense Checklist Progress',
    click_to_copy: 'Click to copy',
    copied_toast: (id) => `Copied Event ID: ${id}`,
    detect_tips_title: 'Detection Tips',
    detect_tip_audit:
      'Enable <strong>Enhanced Audit Policy</strong> (gpedit.msc → Advanced Audit Policy Configuration)',
    detect_tip_sysmon:
      'Deploy <strong>Sysmon</strong> with sysmon-modular config to capture process, network, and registry events',
    detect_tip_sigma:
      'Use <strong>Sigma</strong> rules to convert detection logic to Splunk, Elastic, Azure Sentinel SIEM queries',
    detect_tip_events:
      'Watch for 4769 (Kerberoasting: RC4), 4768 (AS-REP Roasting), 4662 (DCSync: Replication rights)',
    detect_tip_monitor:
      'Monitor <strong>KRBTGT password resets</strong>, <strong>DC account changes</strong>, and <strong>unusual Kerberos TGT requests</strong>',
    results: (n) => `${n} result${n === 1 ? '' : 's'}`,
    progress_text: (done, total, pct) => `${done} / ${total} items done (${pct}%)`,
    techniques_count: (n) => `${n} techniques`,
    export_checklist: 'Export Checklist',
    export_toast: 'Defense checklist exported as Markdown',
    references_title: 'References',
    references_desc:
      'A curated index of official documentation, academic research, offensive/defensive tool references, and CVE advisories for AD security research.',
    ref_tag_official: 'Official',
    ref_tag_research: 'Research',
    ref_tag_tool: 'Tool',
    ref_tag_cve: 'CVE',
    ref_tag_framework: 'Framework',
    search_references: 'Search title, description…',
    ref_filter_all: 'All',
    no_references: 'No matching references found',
    no_techniques: 'No matching techniques found',
    page_title: 'AD Kill Chain Attack & Defense Dashboard',
    meta_description:
      'AD Kill Chain attack & defense resource dashboard — 200+ techniques, 40+ CVEs, detection rules and defense checklist',
  },
  ja: {
    search_placeholder: '技術・ツール・CVEを検索…',
    nav_dashboard: 'ダッシュボード',
    nav_techniques: '攻撃技術',
    nav_cves: 'CVE追跡',
    nav_detection: '検知リファレンス',
    nav_tools: 'ツール',
    nav_defense: '防御チェック',
    nav_references: '参考資料',
    dash_title: 'Active Directory 攻防ダッシュボード',
    dash_desc: 'AD Kill Chain 攻撃・防御リソース統合ダッシュボード — レッドチーム / 教育用途',
    stat_categories: '攻撃カテゴリ',
    stat_techniques: '攻撃技術',
    stat_cves: '追跡CVE',
    stat_critical: '深刻な脆弱性',
    stat_tools: '収録ツール',
    stat_detection: '検知ルール',
    stat_defense: '防御達成率',
    kc_title: 'AD 攻撃キルチェーン',
    techniques_title: '攻撃技術ライブラリ',
    techniques_desc: 'AD Kill Chain 分類の攻撃技術一覧（ツール・CVE・参考資料付き）',
    search_technique: '技術名・ツール・CVEを検索… (/ でフォーカス)',
    filter_all: 'すべて',
    expand_all: 'すべて展開',
    collapse_all: 'すべて折りたたむ',
    cves_title: 'CVE脆弱性追跡',
    cves_desc: 'AD関連の重要CVE（深刻度・説明・緩和策リンク付き）',
    search_cve: 'CVE IDまたは脆弱性名で検索…',
    detection_title: 'イベントID検知リファレンス',
    detection_desc:
      '攻撃手法対応の Windows Event ID — クリックでコピー | Sysmon / SIEM (Sigma) との併用を推奨',
    search_detection: '攻撃手法またはEvent IDで検索…',
    tools_title: 'ツールライブラリ',
    tools_desc: 'AD攻防関連ツール（攻撃・防御・監査・Azure）',
    search_tools: 'ツール名またはタグで検索…',
    filter_offensive: '攻撃ツール',
    filter_defensive: '防御ツール',
    filter_azure: 'Azureツール',
    defense_title: '防御セキュリティチェックリスト',
    defense_desc:
      '業界のベストプラクティスと脅威インテリジェンスを統合した AD 包括的防御監査チェックリスト。アカウント保護・Kerberos 強化・ネットワーク分離・ログ監査など主要防御領域を網羅し、項目ごとに修正進捗を管理できます。',
    defense_overall: '全体達成率',
    reset_progress: 'リセット',
    checklist_done: '完了',
    steps_btn: '設定手順',
    col_cve: 'CVE ID',
    col_cve_name: '脆弱性名',
    col_severity: '深刻度',
    col_year: '年',
    col_desc: '説明',
    col_tools_links: 'ツール / リンク',
    col_attack: '攻撃手法',
    col_eventids: 'Windows Event ID（クリックでコピー）',
    col_notes: '説明',
    view_all: 'すべて表示',
    start_audit: '監査開始',
    severity_critical: '深刻 (Critical)',
    severity_high: '高 (High)',
    severity_medium: '中 (Medium)',
    advisory: 'アドバイザリ',
    no_cve: 'CVEが見つかりません',
    no_detection: '検知ルールが見つかりません',
    no_tools: 'ツールが見つかりません',
    dash_quick_cve_label: '高リスクCVE（深刻度順）',
    dash_defense_checklist_label: '防御チェックリスト進捗',
    click_to_copy: 'クリックでコピー',
    copied_toast: (id) => `Event IDをコピー: ${id}`,
    detect_tips_title: '検知のヒント',
    detect_tip_audit:
      '<strong>Enhanced Audit Policy</strong> を有効化（gpedit.msc → Advanced Audit Policy Configuration）',
    detect_tip_sysmon:
      '<strong>Sysmon</strong> を sysmon-modular 設定で展開し、プロセス・ネットワーク・レジストリイベントを収集',
    detect_tip_sigma:
      '<strong>Sigma</strong> ルールを使用してSplunk・Elastic・Azure Sentinel向けのSIEMクエリに変換',
    detect_tip_events:
      '4769（Kerberoasting：RC4）・4768（AS-REP Roasting）・4662（DCSync：Replication rights）に注意',
    detect_tip_monitor:
      '<strong>KRBTGTパスワードリセット</strong>・<strong>DCアカウント変更</strong>・<strong>異常なKerberos TGTリクエスト</strong>を監視',
    results: (n) => `${n}件の結果`,
    progress_text: (done, total, pct) => `${done} / ${total} 項目完了 (${pct}%)`,
    techniques_count: (n) => `${n} 技術`,
    export_checklist: 'チェックリスト出力',
    export_toast: '防御チェックリストを Markdown ファイルとして出力しました',
    references_title: '参考資料',
    references_desc:
      '官方ドキュメント・研究論文・攻防ツール説明・CVE アドバイザリなど AD セキュリティ研究に関する資料を体系的にまとめたインデックスです。',
    ref_tag_official: '公式',
    ref_tag_research: '研究',
    ref_tag_tool: 'ツール',
    ref_tag_cve: 'CVE',
    ref_tag_framework: 'フレームワーク',
    search_references: 'タイトル・説明を検索…',
    ref_filter_all: 'すべて',
    no_references: '一致する参考資料が見つかりません',
    no_techniques: '一致する攻撃技術が見つかりません',
    page_title: 'AD Kill Chain 攻防ダッシュボード',
    meta_description:
      'AD Kill Chain 攻撃・防御リソース統合ダッシュボード — 200+ 攻撃技術、40+ CVE、検知ルール、防御チェックリスト',
  },
};

// Language code → BCP-47 language tag for <html lang>
const LANG_TO_BCP47 = { zh: 'zh-TW', en: 'en', ja: 'ja' };

function t(key, ...args) {
  const dict = I18N[state.lang] || I18N.zh;
  const val = dict[key];
  if (typeof val === 'function') return val(...args);
  return val !== undefined ? val : I18N.zh[key] || key;
}

function d(val) {
  if (val && typeof val === 'object' && !Array.isArray(val)) {
    return val[state.lang] || val.en || val.zh || '';
  }
  return val != null ? val : '';
}

function applyI18n() {
  // Document-level: lang attr, title, meta description (a11y + SEO)
  document.documentElement.lang = LANG_TO_BCP47[state.lang] || 'en';
  document.title = t('page_title');
  const metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc) metaDesc.setAttribute('content', t('meta_description'));

  // Nav tabs
  document.querySelector('[data-tab="dashboard"]').innerHTML =
    `<i class="bi bi-grid-1x2"></i> ${t('nav_dashboard')}`;
  document.querySelector('[data-tab="techniques"]').innerHTML =
    `<i class="bi bi-diagram-3"></i> ${t('nav_techniques')}`;
  document.querySelector('[data-tab="cves"]').innerHTML =
    `<i class="bi bi-bug"></i> ${t('nav_cves')}`;
  document.querySelector('[data-tab="detection"]').innerHTML =
    `<i class="bi bi-eye"></i> ${t('nav_detection')}`;
  document.querySelector('[data-tab="tools"]').innerHTML =
    `<i class="bi bi-tools"></i> ${t('nav_tools')}`;
  document.querySelector('[data-tab="defense"]').innerHTML =
    `<i class="bi bi-shield-check"></i> ${t('nav_defense')}`;
  document.querySelector('[data-tab="references"]').innerHTML =
    `<i class="bi bi-journals"></i> ${t('nav_references')}`;

  // Global search placeholder
  const gs = document.getElementById('global-search');
  if (gs) gs.placeholder = t('search_placeholder');

  // Stat labels
  ['categories', 'techniques', 'cves', 'critical-cves', 'tools', 'detection', 'checklist'].forEach(
    (id, i) => {
      const labels = [
        'stat_categories',
        'stat_techniques',
        'stat_cves',
        'stat_critical',
        'stat_tools',
        'stat_detection',
        'stat_defense',
      ];
      const el = document.querySelector(`#stat-${id} + .stat-label`);
      if (el) el.textContent = t(labels[i]);
    }
  );

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
  setI18nSection('tab-references', 'bi-journals', 'references_title', 'references_desc');

  // Placeholders
  setPlaceholder('technique-search', t('search_technique'));
  setPlaceholder('cve-search', t('search_cve'));
  setPlaceholder('detection-search', t('search_detection'));
  setPlaceholder('tools-search', t('search_tools'));
  setPlaceholder('ref-search', t('search_references'));

  // References tag filter buttons
  const refAllBtn = document.getElementById('ref-filter-all');
  if (refAllBtn) refAllBtn.textContent = t('ref_filter_all');
  const refTagKeys = {
    official: 'ref_tag_official',
    research: 'ref_tag_research',
    tool: 'ref_tag_tool',
    cve: 'ref_tag_cve',
    framework: 'ref_tag_framework',
  };
  Object.entries(refTagKeys).forEach(([tag, key]) => {
    const btn = document.getElementById(`ref-filter-${tag}`);
    if (btn) btn.textContent = t(key);
  });

  // Filter buttons
  document
    .querySelectorAll('[data-cat-filter="all"], [data-cve-filter="all"], [data-tool-filter="all"]')
    .forEach((b) => (b.textContent = t('filter_all')));
  document
    .querySelectorAll('[data-tool-filter="offensive"]')
    .forEach((b) => (b.innerHTML = `<i class="bi bi-lightning"></i> ${t('filter_offensive')}`));
  document
    .querySelectorAll('[data-tool-filter="defensive"]')
    .forEach((b) => (b.innerHTML = `<i class="bi bi-shield"></i> ${t('filter_defensive')}`));
  document
    .querySelectorAll('[data-tool-filter="azure"]')
    .forEach((b) => (b.innerHTML = `<i class="bi bi-cloud"></i> ${t('filter_azure')}`));

  // Expand/collapse
  const expandBtn = document.querySelector('[onclick="expandAllCategories()"]');
  if (expandBtn)
    expandBtn.innerHTML = `<i class="bi bi-arrows-angle-expand"></i> ${t('expand_all')}`;
  const collapseBtn = document.querySelector('[onclick="collapseAllCategories()"]');
  if (collapseBtn)
    collapseBtn.innerHTML = `<i class="bi bi-arrows-angle-contract"></i> ${t('collapse_all')}`;

  // Severity filter labels
  const cveSevLabels = {
    critical: 'severity_critical',
    high: 'severity_high',
    medium: 'severity_medium',
  };
  Object.entries(cveSevLabels).forEach(([sev, key]) => {
    const btn = document.querySelector(`[data-cve-filter="${sev}"]`);
    if (btn) btn.innerHTML = `<span style="color:var(--severity-${sev})">●</span> ${t(key)}`;
  });

  // Defense section header
  setTextById('defense-overall-label', t('defense_overall'));
  const resetBtn = document.getElementById('reset-progress-btn');
  if (resetBtn)
    resetBtn.innerHTML = `<i class="bi bi-arrow-counterclockwise"></i> ${t('reset_progress')}`;
  setTextById('export-btn-label', t('export_checklist'));

  // Dashboard: quick CVE section
  const quickCveLabel = document.getElementById('dash-quick-cve-label');
  if (quickCveLabel)
    quickCveLabel.innerHTML = `<i class="bi bi-bug" style="color:var(--severity-high)"></i> ${t('dash_quick_cve_label')}`;
  const viewAllBtn = document.getElementById('dash-view-all-btn');
  if (viewAllBtn) viewAllBtn.innerHTML = `${t('view_all')} <i class="bi bi-arrow-right"></i>`;

  // Dashboard: CVE table headers
  setTextById('dash-th-cve-name', t('col_cve_name'));
  setTextById('dash-th-cve-severity', t('col_severity'));
  setTextById('dash-th-cve-year', t('col_year'));

  // Dashboard: defense progress section
  const defProgressLabel = document.getElementById('dash-defense-progress-label');
  if (defProgressLabel)
    defProgressLabel.innerHTML = `<i class="bi bi-shield-check" style="color:var(--color-defense)"></i> ${t('dash_defense_checklist_label')}`;
  const startAuditBtn = document.getElementById('dash-start-audit-btn');
  if (startAuditBtn)
    startAuditBtn.innerHTML = `${t('start_audit')} <i class="bi bi-arrow-right"></i>`;

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

  // html lang attribute
  document.documentElement.lang = state.lang === 'zh' ? 'zh-TW' : state.lang === 'ja' ? 'ja' : 'en';

  // Kill chain node counts (update without full re-render)
  document.querySelectorAll('.kc-count').forEach((el, i) => {
    if (CATEGORIES[i]) el.textContent = t('techniques_count', CATEGORIES[i].techniques.length);
  });

  // Re-render dynamic content
  renderTechniques();
  filterTechniques();
  renderCVEs();
  renderDetection();
  renderTools();
  renderDefense();
  renderReferences();
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
  const priorityColors = {
    critical: 'var(--severity-critical)',
    high: 'var(--severity-high)',
    medium: 'var(--severity-medium)',
  };
  el.innerHTML = DEFENSE_CHECKLIST.map(
    (s) =>
      `<div><span style="color:${priorityColors[s.priority] || 'var(--text-muted)'}">●</span> ${d(s.category)}</div>`
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
// (safeLoadJSON is defined in utils.js, loaded earlier)

const state = {
  activeTab: 'dashboard',
  globalSearch: '',
  techniquesFilter: 'all',
  toolsFilter: 'all',
  cveFilter: 'all',
  refSearch: '',
  refTagFilter: 'all',
  lang: localStorage.getItem('ad_lang') || 'zh',
  checkedItems: safeLoadJSON('ad_checklist', {}),
};

// ── INIT ───────────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  restoreStateFromUrl();
  applyTheme();
  pruneStaleCheckedItemsAndPersist();
  renderDashboard();
  renderTechniques();
  renderCVEs();
  renderDetection();
  renderTools();
  renderDefense();
  bindEvents();
  renderGapAnalysis();
  applyI18n();
  // Set active lang button
  document.querySelectorAll('.lang-btn').forEach((b) => {
    b.classList.toggle('active', b.dataset.lang === state.lang);
  });
  syncFilterButtons();
  // Sync aria-pressed state across all filter groups (must run AFTER active class is set)
  [
    '.lang-btn',
    '[data-cat-filter]',
    '[data-cve-filter]',
    '[data-tool-filter]',
    '[data-ref-filter]',
  ].forEach(syncAriaPressed);
  switchTab(state.activeTab);
});

// ── URL STATE SYNC ─────────────────────────────────────────────────────────
function pushUrlState() {
  const p = new URLSearchParams();
  p.set('tab', state.activeTab);
  const techQ = document.getElementById('technique-search')?.value || '';
  if (techQ) p.set('tech-q', techQ);
  if (state.techniquesFilter !== 'all') p.set('tech-cat', state.techniquesFilter);
  const cveQ = document.getElementById('cve-search')?.value || '';
  if (cveQ) p.set('cve-q', cveQ);
  if (state.cveFilter !== 'all') p.set('cve-f', state.cveFilter);
  const detQ = document.getElementById('detection-search')?.value || '';
  if (detQ) p.set('det-q', detQ);
  const toolQ = document.getElementById('tools-search')?.value || '';
  if (toolQ) p.set('tool-q', toolQ);
  if (state.toolsFilter !== 'all') p.set('tool-f', state.toolsFilter);
  if (state.refSearch) p.set('ref-q', state.refSearch);
  if (state.refTagFilter !== 'all') p.set('ref-f', state.refTagFilter);
  const qs = p.toString();
  history.replaceState(null, '', qs ? `?${qs}` : window.location.pathname);
}

const VALID_TABS = new Set([
  'dashboard',
  'techniques',
  'cves',
  'detection',
  'tools',
  'defense',
  'references',
]);

function restoreStateFromUrl() {
  const p = new URLSearchParams(window.location.search);
  const tab = p.get('tab');
  if (tab && VALID_TABS.has(tab)) state.activeTab = tab;
  const techQ = p.get('tech-q');
  if (techQ) {
    state.globalSearch = techQ.toLowerCase().trim();
    const el = document.getElementById('technique-search');
    if (el) el.value = techQ;
  }
  const techCat = p.get('tech-cat');
  if (techCat) state.techniquesFilter = techCat;
  const cveQ = p.get('cve-q');
  if (cveQ) {
    const el = document.getElementById('cve-search');
    if (el) el.value = cveQ;
  }
  const cveF = p.get('cve-f');
  if (cveF) state.cveFilter = cveF;
  const detQ = p.get('det-q');
  if (detQ) {
    const el = document.getElementById('detection-search');
    if (el) el.value = detQ;
  }
  const toolQ = p.get('tool-q');
  if (toolQ) {
    const el = document.getElementById('tools-search');
    if (el) el.value = toolQ;
  }
  const toolF = p.get('tool-f');
  if (toolF) state.toolsFilter = toolF;
  const refQ = p.get('ref-q');
  if (refQ) {
    state.refSearch = refQ.toLowerCase().trim();
    const el = document.getElementById('ref-search');
    if (el) el.value = refQ;
  }
  const refF = p.get('ref-f');
  if (refF) state.refTagFilter = refF;
}

// ── TAB NAVIGATION ─────────────────────────────────────────────────────────
function switchTab(tabId) {
  state.activeTab = tabId;
  document.querySelectorAll('.nav-tab').forEach((t) => {
    const active = t.dataset.tab === tabId;
    t.classList.toggle('active', active);
    t.setAttribute('aria-selected', active ? 'true' : 'false');
    t.setAttribute('tabindex', active ? '0' : '-1');
  });
  document.querySelectorAll('.tab-pane').forEach((p) => {
    const active = p.id === `tab-${tabId}`;
    p.classList.toggle('active', active);
    if (active) p.removeAttribute('hidden');
    else p.setAttribute('hidden', '');
  });
  pushUrlState();
}

// Helper: sync aria-pressed across a group based on the .active class
function syncAriaPressed(selector) {
  document.querySelectorAll(selector).forEach((b) => {
    b.setAttribute('aria-pressed', b.classList.contains('active') ? 'true' : 'false');
  });
}

function syncFilterButtons() {
  // tech category filter
  document.querySelectorAll('[data-cat-filter]').forEach((b) => {
    b.classList.toggle('active', b.dataset.catFilter === state.techniquesFilter);
  });
  // cve filter
  document.querySelectorAll('[data-cve-filter]').forEach((b) => {
    b.classList.toggle('active', b.dataset.cveFilter === state.cveFilter);
  });
  // tools filter
  document.querySelectorAll('[data-tool-filter]').forEach((b) => {
    b.classList.toggle('active', b.dataset.toolFilter === state.toolsFilter);
  });
}

// ── THEME ──────────────────────────────────────────────────────────────────
function applyTheme(theme) {
  const t = theme || localStorage.getItem('ad_theme') || 'dark';
  document.documentElement.dataset.theme = t;
  const btn = document.getElementById('theme-toggle-btn');
  if (btn) {
    btn.innerHTML =
      t === 'light'
        ? '<i class="bi bi-sun" aria-hidden="true"></i>'
        : '<i class="bi bi-moon" aria-hidden="true"></i>';
    btn.setAttribute(
      'aria-label',
      t === 'light' ? 'Switch to dark theme' : 'Switch to light theme'
    );
  }
}

// ── EVENT BINDINGS ─────────────────────────────────────────────────────────
function debounce(fn, ms) {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), ms);
  };
}

function bindEvents() {
  // Tab clicks
  document.querySelectorAll('.nav-tab').forEach((tab) => {
    tab.addEventListener('click', () => switchTab(tab.dataset.tab));
  });

  // Tab keyboard navigation (WAI-ARIA tabs pattern)
  const tablist = document.querySelector('.navbar-tabs');
  if (tablist) {
    tablist.addEventListener('keydown', (e) => {
      if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(e.key)) return;
      const tabs = [...tablist.querySelectorAll('.nav-tab')];
      const cur = tabs.indexOf(document.activeElement);
      if (cur === -1) return;
      let next = cur;
      if (e.key === 'ArrowLeft') next = (cur - 1 + tabs.length) % tabs.length;
      else if (e.key === 'ArrowRight') next = (cur + 1) % tabs.length;
      else if (e.key === 'Home') next = 0;
      else if (e.key === 'End') next = tabs.length - 1;
      e.preventDefault();
      tabs[next].focus();
      switchTab(tabs[next].dataset.tab);
    });
  }

  // Global search
  const globalSearchInput = document.getElementById('global-search');
  if (globalSearchInput) {
    globalSearchInput.addEventListener('input', (e) => {
      state.globalSearch = e.target.value.toLowerCase().trim();
      if (state.globalSearch) {
        switchTab('techniques');
        filterTechniques();
      }
    });
  }

  // CVE filter buttons
  document.querySelectorAll('[data-cve-filter]').forEach((btn) => {
    btn.addEventListener('click', () => {
      state.cveFilter = btn.dataset.cveFilter;
      document.querySelectorAll('[data-cve-filter]').forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      syncAriaPressed('[data-cve-filter]');
      filterCVEs();
      pushUrlState();
    });
  });

  // Tools filter buttons
  document.querySelectorAll('[data-tool-filter]').forEach((btn) => {
    btn.addEventListener('click', () => {
      state.toolsFilter = btn.dataset.toolFilter;
      document.querySelectorAll('[data-tool-filter]').forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      syncAriaPressed('[data-tool-filter]');
      filterTools();
      pushUrlState();
    });
  });

  // CVE search
  const cveSearch = document.getElementById('cve-search');
  if (cveSearch)
    cveSearch.addEventListener(
      'input',
      debounce(() => {
        filterCVEs();
        pushUrlState();
      }, 200)
    );

  // Detection search
  const detectionSearch = document.getElementById('detection-search');
  if (detectionSearch)
    detectionSearch.addEventListener(
      'input',
      debounce(() => {
        filterDetection();
        pushUrlState();
      }, 200)
    );

  // Tools search
  const toolsSearch = document.getElementById('tools-search');
  if (toolsSearch)
    toolsSearch.addEventListener(
      'input',
      debounce(() => {
        filterTools();
        pushUrlState();
      }, 200)
    );

  // References search
  const refSearchInput = document.getElementById('ref-search');
  if (refSearchInput)
    refSearchInput.addEventListener(
      'input',
      debounce(() => {
        state.refSearch = refSearchInput.value.toLowerCase().trim();
        filterReferences();
        pushUrlState();
      }, 200)
    );

  // References tag filter buttons
  document.querySelectorAll('[data-ref-filter]').forEach((btn) => {
    btn.addEventListener('click', () => {
      state.refTagFilter = btn.dataset.refFilter;
      document.querySelectorAll('[data-ref-filter]').forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      syncAriaPressed('[data-ref-filter]');
      filterReferences();
      pushUrlState();
    });
  });

  // Techniques search
  const techSearch = document.getElementById('technique-search');
  if (techSearch)
    techSearch.addEventListener(
      'input',
      debounce(() => {
        state.globalSearch = techSearch.value.toLowerCase().trim();
        filterTechniques();
        pushUrlState();
      }, 200)
    );

  // Techniques category filter
  document.querySelectorAll('[data-cat-filter]').forEach((btn) => {
    btn.addEventListener('click', () => {
      state.techniquesFilter = btn.dataset.catFilter;
      document.querySelectorAll('[data-cat-filter]').forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      syncAriaPressed('[data-cat-filter]');
      filterTechniques();
      pushUrlState();
    });
  });

  // Theme toggle
  const themeBtn = document.getElementById('theme-toggle-btn');
  if (themeBtn) {
    themeBtn.addEventListener('click', () => {
      const next = document.documentElement.dataset.theme === 'light' ? 'dark' : 'light';
      localStorage.setItem('ad_theme', next);
      applyTheme(next);
    });
  }

  // Language switcher
  document.querySelectorAll('.lang-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      state.lang = btn.dataset.lang;
      localStorage.setItem('ad_lang', state.lang);
      document
        .querySelectorAll('.lang-btn')
        .forEach((b) => b.classList.toggle('active', b.dataset.lang === state.lang));
      syncAriaPressed('.lang-btn');
      applyI18n();
    });
  });

  // Back-to-top button
  const backToTopBtn = document.getElementById('back-to-top');
  if (backToTopBtn) {
    window.addEventListener(
      'scroll',
      () => {
        backToTopBtn.classList.toggle('visible', window.scrollY > 300);
      },
      { passive: true }
    );
  }

  // Keyboard shortcut: press "/" to focus global search; Ctrl/Cmd+K for command palette
  document.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
      e.preventDefault();
      const overlay = document.getElementById('cmd-overlay');
      if (overlay && overlay.hasAttribute('hidden')) openCmdPalette();
      else closeCmdPalette();
      return;
    }
    if (e.key === '/' && document.activeElement.tagName !== 'INPUT') {
      e.preventDefault();
      const search = document.getElementById('global-search');
      if (search) {
        search.focus();
        search.select();
      }
    }
    if (e.key === 'Escape') {
      const overlay = document.getElementById('cmd-overlay');
      if (overlay && !overlay.hasAttribute('hidden')) {
        closeCmdPalette();
        return;
      }
      const panel = document.getElementById('side-panel');
      if (panel && panel.classList.contains('open')) {
        closeSidePanel();
        return;
      }
      const active = document.activeElement;
      if (active && active.tagName === 'INPUT') active.blur();
    }
  });

  // Side panel close button
  document.getElementById('sp-close')?.addEventListener('click', closeSidePanel);
  document.getElementById('sp-overlay')?.addEventListener('click', closeSidePanel);

  // CVE Timeline toggle
  const tlBtn = document.getElementById('cve-timeline-btn');
  const tlWrap = document.getElementById('cve-timeline-wrap');
  if (tlBtn && tlWrap) {
    tlBtn.addEventListener('click', () => {
      const isOpen = !tlWrap.hasAttribute('hidden');
      if (isOpen) {
        tlWrap.setAttribute('hidden', '');
        tlBtn.setAttribute('aria-pressed', 'false');
      } else {
        tlWrap.removeAttribute('hidden');
        tlBtn.setAttribute('aria-pressed', 'true');
        if (!tlWrap.querySelector('svg')) renderCveTimeline();
      }
    });
  }

  // Technique card click → side panel (event delegation on title text only)
  document.getElementById('techniques-container')?.addEventListener('click', (e) => {
    const titleEl = e.target.closest('.tc-name');
    if (!titleEl) return;
    const card = titleEl.closest('.technique-card');
    if (!card) return;
    const techName = card.dataset.technique;
    let found = null;
    let foundCat = null;
    CATEGORIES.forEach((cat) => {
      cat.techniques.forEach((tech) => {
        if (tech.name.toLowerCase() === techName) {
          found = tech;
          foundCat = cat;
        }
      });
    });
    if (found && foundCat) {
      e.stopPropagation();
      openSidePanel(found, foundCat);
    }
  });

  // Bind command palette events
  bindCmdPaletteEvents();

  // Event delegation: copy Event IDs (replaces inline onclick which was XSS-prone)
  document.addEventListener('click', (evt) => {
    const copyEl = evt.target.closest('.js-copy-event');
    if (copyEl) {
      copyEventId(copyEl.dataset.eventId);
      return;
    }

    const toggleEl = evt.target.closest('.js-checklist-toggle');
    if (toggleEl) {
      const item = toggleEl.closest('.checklist-item');
      if (item) toggleChecklist(toggleEl.dataset.checklistKey, item);
    }
  });
  document.addEventListener('keydown', (evt) => {
    if (evt.key !== 'Enter' && evt.key !== ' ') return;
    const target = evt.target;
    if (!target.classList) return;
    if (target.classList.contains('js-copy-event')) {
      evt.preventDefault();
      copyEventId(target.dataset.eventId);
    } else if (target.classList.contains('js-checklist-toggle')) {
      evt.preventDefault();
      const item = target.closest('.checklist-item');
      if (item) toggleChecklist(target.dataset.checklistKey, item);
    }
  });
}

// ── RENDER: DASHBOARD ──────────────────────────────────────────────────────
function renderDashboard() {
  const totalTechniques = CATEGORIES.reduce((s, c) => s + c.techniques.length, 0);
  const criticalCVEs = CVES.filter((c) => c.severity === 'critical').length;

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
      <i class="bi ${escapeHtml(cat.icon)} kc-icon" style="color:${escapeHtml(cat.color)}"></i>
      <div class="kc-name">${escapeHtml(cat.name)}</div>
      <div class="kc-count">${escapeHtml(t('techniques_count', cat.techniques.length))}</div>
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
  const topCVEs = [...CVES]
    .sort((a, b) => severityOrder[a.severity] - severityOrder[b.severity])
    .slice(0, 5);
  const cveTableBody = document.getElementById('quick-cve-body');
  if (cveTableBody) {
    cveTableBody.innerHTML = topCVEs
      .map(
        (cve) => `
      <tr>
        <td><span class="cve-id">${escapeHtml(cve.id)}</span></td>
        <td>${escapeHtml(cve.name)}</td>
        <td><span class="badge badge-${escapeHtml(cve.severity)}">${escapeHtml(String(cve.severity).toUpperCase())}</span></td>
        <td class="text-secondary text-small">${escapeHtml(cve.year)}</td>
      </tr>
    `
      )
      .join('');
  }

  // Defense checklist progress
  updateTotalProgress();
}

// ── RENDER: TECHNIQUES ─────────────────────────────────────────────────────
function renderTechniques() {
  const container = document.getElementById('techniques-container');
  if (!container) return;
  container.innerHTML = '';

  CATEGORIES.forEach((cat) => {
    const section = document.createElement('div');
    section.className = 'category-section expanded';
    section.dataset.categoryId = cat.id;
    section.innerHTML = `
      <div class="category-header" onclick="toggleCategory(this.parentElement)">
        <div class="cat-icon-wrap" style="background:${escapeHtml(cat.color)}20; color:${escapeHtml(cat.color)}">
          <i class="bi ${escapeHtml(cat.icon)}"></i>
        </div>
        <div class="cat-info">
          <div class="cat-name">${escapeHtml(cat.name)}</div>
          <div class="cat-meta">
            <a href="https://attack.mitre.org/tactics/${encodeURIComponent(cat.mitre)}/" target="_blank" rel="noopener"
               class="mitre-badge" style="text-decoration:none" title="MITRE ATT&CK ${escapeHtml(cat.mitre)}">
              ${escapeHtml(cat.mitre)} <i class="bi bi-box-arrow-up-right" style="font-size:9px"></i>
            </a>
            &nbsp;${de(cat.description)}
          </div>
        </div>
        <span class="tool-tag" style="color:${escapeHtml(cat.color)}; border-color:${escapeHtml(cat.color)}40; background:${escapeHtml(cat.color)}15">
          ${escapeHtml(t('techniques_count', cat.techniques.length))}
        </span>
        <i class="bi bi-chevron-down cat-toggle" style="margin-left:8px"></i>
      </div>
      <div class="category-techniques technique-grid" id="cat-${escapeHtml(cat.id)}">
        ${cat.techniques.map((tech) => renderTechniqueCard(tech, cat)).join('')}
      </div>
    `;
    container.appendChild(section);
  });
}

function renderTechniqueCard(technique, category) {
  const toolTags = (technique.tools || [])
    .slice(0, 4)
    .map((tool) => `<span class="tool-tag">${escapeHtml(tool)}</span>`)
    .join('');

  const cveBadges = (technique.cves || [])
    .map((cve) => `<span class="badge badge-high">${escapeHtml(cve)}</span>`)
    .join('');

  const resources = (technique.resources || [])
    .map(
      (r) =>
        `<li><a href="${escapeHtml(safeUrl(r.url))}" target="_blank" rel="noopener">
      <i class="bi bi-box-arrow-up-right"></i>${escapeHtml(r.title)}
    </a></li>`
    )
    .join('');

  return `
    <div class="technique-card" data-technique="${escapeHtml(String(technique.name).toLowerCase())}">
      <div class="technique-card-header" onclick="toggleTechnique(this.parentElement)">
        <div class="tc-indicator" style="background:${escapeHtml(category.color)}"></div>
        <div class="tc-content">
          <div class="tc-name">${escapeHtml(technique.name)}</div>
          <div class="tc-desc">${de(technique.description)}</div>
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

  tbody.innerHTML = sorted
    .map((cve) => {
      const toolTags = (cve.tools || [])
        .map((tool) => `<span class="tool-tag">${escapeHtml(tool)}</span>`)
        .join(' ');
      return `
      <tr>
        <td><span class="cve-id">${escapeHtml(cve.id)}</span></td>
        <td class="fw-600">${escapeHtml(cve.name)}</td>
        <td><span class="badge badge-${escapeHtml(cve.severity)}">${escapeHtml(String(cve.severity).toUpperCase())}</span></td>
        <td class="text-secondary text-small">${escapeHtml(cve.year)}</td>
        <td class="text-secondary text-small" style="max-width:280px">${de(cve.description)}</td>
        <td>
          ${toolTags ? `<div class="d-flex gap-8" style="flex-wrap:wrap">${toolTags}</div>` : '<span class="text-muted">—</span>'}
          <a href="${escapeHtml(safeUrl(cve.url))}" target="_blank" rel="noopener" class="text-small" style="color:var(--accent-blue); display:inline-flex; align-items:center; gap:4px; margin-top:4px; text-decoration:none;">
            <i class="bi bi-box-arrow-up-right"></i>${escapeHtml(t('advisory'))}
          </a>
        </td>
      </tr>
    `;
    })
    .join('');
}

function filterCVEs() {
  const searchVal = (document.getElementById('cve-search')?.value || '').toLowerCase();
  const severity = state.cveFilter;
  const filtered = CVES.filter((cve) => {
    const matchSeverity = severity === 'all' || cve.severity === severity;
    const matchSearch =
      !searchVal ||
      cve.id.toLowerCase().includes(searchVal) ||
      cve.name.toLowerCase().includes(searchVal) ||
      d(cve.description).toLowerCase().includes(searchVal);
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
  tbody.innerHTML = data
    .map((event) => {
      const eventIds = event.eventIds
        .map(
          (id) =>
            `<span class="event-id js-copy-event" data-event-id="${escapeHtml(id)}" title="${escapeHtml(t('click_to_copy'))}" role="button" tabindex="0">${escapeHtml(id)}</span>`
        )
        .join('');
      const descriptions = event.descriptions
        .map((desc) => `<div class="text-small text-secondary">${de(desc)}</div>`)
        .join('');
      const catColor = (CATEGORIES.find((c) => c.id === event.category) || {}).color || '#8b949e';
      return `
      <tr>
        <td>
          <div class="d-flex align-center gap-8">
            <span style="width:8px; height:8px; border-radius:50%; background:${escapeHtml(catColor)}; display:inline-block; flex-shrink:0"></span>
            <span class="fw-600">${escapeHtml(event.attack)}</span>
          </div>
        </td>
        <td><div style="display:flex; flex-wrap:wrap">${eventIds}</div></td>
        <td>${descriptions}</td>
      </tr>
    `;
    })
    .join('');
}

function filterDetection() {
  const searchVal = (document.getElementById('detection-search')?.value || '').toLowerCase();
  const filtered = DETECTION_EVENTS.filter(
    (e) =>
      !searchVal ||
      e.attack.toLowerCase().includes(searchVal) ||
      e.eventIds.some((id) => id.includes(searchVal)) ||
      e.descriptions.some((desc) => d(desc).toLowerCase().includes(searchVal))
  );
  const tbody = document.getElementById('detection-table-body');
  if (tbody) renderDetectionRows(filtered, tbody);
}

function copyEventId(id) {
  const text = String(id);
  const notify = () => showToast(t('copied_toast', text));

  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard
      .writeText(text)
      .then(notify)
      .catch(() => legacyCopy(text, notify));
  } else {
    legacyCopy(text, notify);
  }
}

// Fallback for non-secure contexts (file://, plain http://) where clipboard API is unavailable
function legacyCopy(text, onSuccess) {
  const ta = document.createElement('textarea');
  ta.value = text;
  ta.setAttribute('readonly', '');
  ta.style.cssText = 'position:absolute;left:-9999px;top:-9999px';
  document.body.appendChild(ta);
  ta.select();
  try {
    document.execCommand('copy');
    onSuccess && onSuccess();
  } catch (_) {
    /* silent */
  }
  document.body.removeChild(ta);
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
    ${data
      .map((tool) => {
        const tags = (tool.tags || [])
          .map((tag) => `<span class="tool-tag">${escapeHtml(tag)}</span>`)
          .join('');
        const typeLabelMap = {
          offensive: t('filter_offensive'),
          defensive: t('filter_defensive'),
          azure: t('filter_azure'),
        };
        const typeClass = {
          offensive: 'tool-tag-offensive',
          defensive: 'tool-tag-defensive',
          azure: 'tool-tag-azure',
        };
        return `
        <div class="tool-card" data-tool-name="${escapeHtml(String(tool.name).toLowerCase())}" data-tool-type="${escapeHtml(tool.type)}">
          <div class="tool-card-header">
            <span class="tool-name">${escapeHtml(tool.name)}</span>
            <div class="d-flex align-center gap-8">
              <span class="tool-tag ${typeClass[tool.type] || ''}">${escapeHtml(typeLabelMap[tool.type] || tool.type)}</span>
              <a href="${escapeHtml(safeUrl(tool.url))}" target="_blank" rel="noopener" class="tool-link" title="GitHub">
                <i class="bi bi-github"></i>
              </a>
            </div>
          </div>
          <div class="tool-desc">${de(tool.description)}</div>
          <div class="tool-tags">${tags}</div>
        </div>
      `;
      })
      .join('')}
  </div>`;
}

function filterTools() {
  const searchVal = (document.getElementById('tools-search')?.value || '').toLowerCase();
  const typeFilter = state.toolsFilter;
  const filtered = TOOLS.filter((tool) => {
    const matchType = typeFilter === 'all' || tool.type === typeFilter;
    const matchSearch =
      !searchVal ||
      tool.name.toLowerCase().includes(searchVal) ||
      d(tool.description).toLowerCase().includes(searchVal) ||
      (tool.tags || []).some((t) => t.toLowerCase().includes(searchVal));
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
    const items = section.items
      .map((item, iIdx) => {
        const key = `${sIdx}-${iIdx}`;
        const checked = state.checkedItems[key];
        const stepsHtml = (item.steps || [])
          .map((step) => {
            const icons = {
              cmd: 'bi-terminal',
              info: 'bi-info-circle',
              warn: 'bi-exclamation-triangle',
            };
            const colors = {
              cmd: 'var(--color-lateral)',
              info: 'var(--accent-blue)',
              warn: 'var(--severity-high)',
            };
            const isCode = step.type === 'cmd';
            return `
          <div class="step-item step-${step.type}">
            <i class="bi ${icons[step.type] || 'bi-dot'}" style="color:${colors[step.type] || 'var(--text-muted)'}; flex-shrink:0; margin-top:2px"></i>
            ${
              isCode
                ? `<pre class="step-code">${escapeHtml(d(step.text))}</pre>`
                : `<span class="step-text">${d(step.text)}</span>`
            }
          </div>
        `;
          })
          .join('');

        const hasSteps = (item.steps || []).length > 0;
        const safeKey = escapeHtml(key);
        const textId = `ci-text-${safeKey}`;
        return `
        <div class="checklist-item ${checked ? 'checked' : ''}">
          <button type="button" class="ci-checkbox js-checklist-toggle" role="checkbox" aria-checked="${checked ? 'true' : 'false'}" aria-labelledby="${textId}" data-checklist-key="${safeKey}">${checked ? '<i class="bi bi-check-lg" aria-hidden="true"></i>' : ''}</button>
          <div class="ci-content">
            <div class="ci-header">
              <div class="ci-text js-checklist-toggle" id="${textId}" data-checklist-key="${safeKey}">${de(item.text)}</div>
              ${
                hasSteps
                  ? `<button type="button" class="steps-toggle" onclick="toggleSteps(this)" aria-expanded="false">
                <i class="bi bi-list-task" aria-hidden="true"></i> ${escapeHtml(t('steps_btn'))} <i class="bi bi-chevron-down steps-chevron" aria-hidden="true"></i>
              </button>`
                  : ''
              }
            </div>
            <div class="ci-detail">${de(item.detail)}</div>
            ${hasSteps ? `<div class="steps-container" style="display:none">${stepsHtml}</div>` : ''}
          </div>
        </div>
      `;
      })
      .join('');

    const checkedCount = section.items.filter(
      (_, iIdx) => state.checkedItems[`${sIdx}-${iIdx}`]
    ).length;
    const pct =
      section.items.length > 0
        ? Math.min(100, Math.round((checkedCount / section.items.length) * 100))
        : 0;
    const priorityColors = {
      critical: 'var(--severity-critical)',
      high: 'var(--severity-high)',
      medium: 'var(--severity-medium)',
    };

    return `
      <div class="checklist-section">
        <div class="checklist-category-header">
          <div class="checklist-category-title">
            <span style="width:10px; height:10px; border-radius:50%; background:${priorityColors[section.priority] || 'var(--text-muted)'}; display:inline-block"></span>
            ${de(section.category)}
          </div>
          <span class="checklist-progress">${checkedCount} / ${section.items.length} ${escapeHtml(t('checklist_done'))}</span>
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
  try {
    localStorage.setItem('ad_checklist', JSON.stringify(state.checkedItems));
  } catch (_) {
    /* quota / disabled — ignore */
  }
  element.classList.toggle('checked', checked);
  const checkbox = element.querySelector('.ci-checkbox');
  if (checkbox) {
    checkbox.innerHTML = checked ? '<i class="bi bi-check-lg" aria-hidden="true"></i>' : '';
    checkbox.setAttribute('aria-checked', checked ? 'true' : 'false');
  }

  // Update progress for the section
  const section = element.closest('.checklist-section');
  if (section) {
    const items = section.querySelectorAll('.checklist-item');
    const checkedCount = section.querySelectorAll('.checklist-item.checked').length;
    const total = items.length;
    const pct = total > 0 ? Math.min(100, Math.round((checkedCount / total) * 100)) : 0;
    const progressEl = section.querySelector('.checklist-progress');
    if (progressEl) progressEl.textContent = `${checkedCount} / ${total} ${t('checklist_done')}`;
    const fill = section.querySelector('.progress-bar-fill');
    if (fill) fill.style.width = `${pct}%`;
  }

  updateTotalProgress();
  renderGapAnalysis();
}

function toggleSteps(btn) {
  const container = btn.closest('.ci-content').querySelector('.steps-container');
  if (!container) return;
  const expanded = btn.getAttribute('aria-expanded') === 'true';
  container.style.display = expanded ? 'none' : 'block';
  btn.setAttribute('aria-expanded', String(!expanded));
  btn.querySelector('.steps-chevron').style.transform = expanded ? '' : 'rotate(180deg)';
}

// (escapeHtml + safeUrl live in utils.js)

// Combined helper: multilingual resolve + HTML escape (used heavily in render fns)
function de(val) {
  return escapeHtml(d(val));
}

function exportChecklist() {
  const lines = ['# AD Defense Checklist Export', ''];
  const priorityLabel = { critical: '🔴 Critical', high: '🟡 High', medium: '🔵 Medium' };

  DEFENSE_CHECKLIST.forEach((section, sIdx) => {
    lines.push(
      `## ${d(section.category)} [${priorityLabel[section.priority] || section.priority}]`
    );
    lines.push('');
    section.items.forEach((item, iIdx) => {
      const key = `${sIdx}-${iIdx}`;
      const checked = state.checkedItems[key] ? '[x]' : '[ ]';
      lines.push(`- ${checked} ${d(item.text)}`);
      if (item.detail) lines.push(`  > ${d(item.detail)}`);
    });
    lines.push('');
  });

  const totalItems = DEFENSE_CHECKLIST.reduce((s, c) => s + c.items.length, 0);
  const checkedCount = Object.keys(state.checkedItems).length;
  lines.push(`---`);
  lines.push(
    `Progress: ${checkedCount} / ${totalItems} (${Math.round((checkedCount / totalItems) * 100)}%)`
  );

  const blob = new Blob([lines.join('\n')], { type: 'text/markdown' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'ad-defense-checklist.md';
  a.click();
  URL.revokeObjectURL(url);
  showToast(t('export_toast'));
}

// ── RENDER: REFERENCES ─────────────────────────────────────────────────────
const REF_TAG_COLOR = {
  official: 'var(--accent-blue)',
  research: 'var(--color-lateral)',
  tool: 'var(--color-defense)',
  cve: 'var(--severity-high)',
  framework: 'var(--severity-medium)',
};
const REF_TAG_KEY = {
  official: 'ref_tag_official',
  research: 'ref_tag_research',
  tool: 'ref_tag_tool',
  cve: 'ref_tag_cve',
  framework: 'ref_tag_framework',
};

function renderReferences() {
  filterReferences();
}

function filterReferences() {
  const container = document.getElementById('references-container');
  if (!container || typeof REFERENCES === 'undefined') return;

  const search = state.refSearch;
  const tagFilter = state.refTagFilter;

  let totalVisible = 0;

  const html = REFERENCES.map((section) => {
    const filtered = section.refs.filter((ref) => {
      const matchTag = tagFilter === 'all' || (ref.tags || []).includes(tagFilter);
      const matchSearch =
        !search ||
        d(ref.title).toLowerCase().includes(search) ||
        d(ref.desc || '')
          .toLowerCase()
          .includes(search);
      return matchTag && matchSearch;
    });

    if (!filtered.length) return '';
    totalVisible += filtered.length;

    const items = filtered
      .map((ref) => {
        const tags = (ref.tags || [])
          .map((tag) => {
            const color = REF_TAG_COLOR[tag] || 'var(--text-muted)';
            const label = t(REF_TAG_KEY[tag] || tag);
            return `<span class="ref-tag" style="background:${color}20;color:${color};border:1px solid ${color}40">${escapeHtml(label)}</span>`;
          })
          .join('');
        return `
        <a class="ref-item" href="${escapeHtml(safeUrl(ref.url))}" target="_blank" rel="noopener noreferrer">
          <div class="ref-item-inner">
            <div class="ref-title">${de(ref.title)}</div>
            ${ref.desc ? `<div class="ref-desc">${de(ref.desc)}</div>` : ''}
          </div>
          <div class="ref-right">
            <div class="ref-tags">${tags}</div>
            <i class="bi bi-box-arrow-up-right ref-arrow"></i>
          </div>
        </a>`;
      })
      .join('');

    return `
      <div class="ref-section">
        <div class="ref-section-header">
          <i class="bi ${escapeHtml(section.icon || 'bi-bookmark')}" style="color:${escapeHtml(section.color || 'var(--accent-blue)')}"></i>
          <span>${de(section.category)}</span>
          <span class="ref-count">${filtered.length}</span>
        </div>
        <div class="ref-list">${items}</div>
      </div>`;
  }).join('');

  container.innerHTML = totalVisible
    ? html
    : `<div class="no-results"><i class="bi bi-journals"></i><br>${t('no_references')}</div>`;
}

// (getValidChecklistKeys/computeProgress/pruneStaleCheckedItems live in utils.js)

// App-side wrapper: prune stale keys against current DEFENSE_CHECKLIST and persist.
function pruneStaleCheckedItemsAndPersist() {
  const changed = pruneStaleCheckedItems(state.checkedItems, DEFENSE_CHECKLIST);
  if (changed) {
    try {
      localStorage.setItem('ad_checklist', JSON.stringify(state.checkedItems));
    } catch (_) {
      /* quota / disabled storage — ignore */
    }
  }
}

function updateTotalProgress() {
  const { checkedCount, totalItems, pct } = computeProgress(state.checkedItems, DEFENSE_CHECKLIST);

  const progressText = t('progress_text', checkedCount, totalItems, pct);
  const dashProgress = document.getElementById('dash-checklist-progress');
  if (dashProgress) dashProgress.textContent = progressText;

  const defenseProgress = document.getElementById('dash-checklist-progress-defense');
  if (defenseProgress) defenseProgress.textContent = progressText;

  // Update both progress bars (dashboard tab + defense tab)
  document.querySelectorAll('#dash-progress-fill, #defense-progress-fill').forEach((el) => {
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

  document.querySelectorAll('.category-section').forEach((section) => {
    const catId = section.dataset.categoryId;
    const matchCat = catFilter === 'all' || catId === catFilter;

    if (!matchCat) {
      section.style.display = 'none';
      return;
    }

    if (!search) {
      section.style.display = '';
      if (section.dataset.searchExpanded) {
        section.classList.remove('expanded');
        delete section.dataset.searchExpanded;
      }
      section.querySelectorAll('.technique-card').forEach((c) => {
        c.style.display = '';
      });
      totalVisible += section.querySelectorAll('.technique-card').length;
      return;
    }

    // Search within techniques
    let anyVisible = false;
    section.querySelectorAll('.technique-card').forEach((card) => {
      const text = card.textContent.toLowerCase();
      const visible = text.includes(search);
      card.style.display = visible ? '' : 'none';
      if (visible) {
        anyVisible = true;
        totalVisible++;
      }
    });

    section.style.display = anyVisible ? '' : 'none';
    if (anyVisible && !section.classList.contains('expanded')) {
      section.classList.add('expanded');
      section.dataset.searchExpanded = '1';
    }
    if (!anyVisible && section.dataset.searchExpanded) {
      section.classList.remove('expanded');
      delete section.dataset.searchExpanded;
    }
  });

  const countEl = document.getElementById('technique-count');
  if (countEl) {
    countEl.textContent = search || catFilter !== 'all' ? t('results', totalVisible) : '';
  }

  // Zero-results feedback
  const container = document.getElementById('techniques-container');
  const noRes = document.getElementById('techniques-no-results');
  if (container) {
    if (totalVisible === 0 && (search || catFilter !== 'all')) {
      if (!noRes) {
        const el = document.createElement('div');
        el.id = 'techniques-no-results';
        el.className = 'no-results';
        el.innerHTML = `<i class="bi bi-search"></i><br>${t('no_techniques')}`;
        container.after(el);
      } else {
        noRes.innerHTML = `<i class="bi bi-search"></i><br>${t('no_techniques')}`;
        noRes.style.display = '';
      }
    } else if (noRes) {
      noRes.style.display = 'none';
    }
  }
}

// ── EXPAND / COLLAPSE ALL ──────────────────────────────────────────────────
function expandAllCategories() {
  document.querySelectorAll('.category-section').forEach((s) => s.classList.add('expanded'));
}

function collapseAllCategories() {
  document.querySelectorAll('.category-section').forEach((s) => s.classList.remove('expanded'));
}

// ── COMMAND PALETTE ────────────────────────────────────────────────────────
function buildCmdIndex() {
  const items = [];
  CATEGORIES.forEach((cat) => {
    cat.techniques.forEach((tech) => {
      items.push({
        type: 'technique',
        label: tech.name,
        sub: d(cat.name),
        color: cat.color,
        icon: 'bi-lightning',
        action: () => {
          switchTab('techniques');
          state.globalSearch = tech.name.toLowerCase();
          const el = document.getElementById('technique-search');
          if (el) el.value = tech.name;
          filterTechniques();
        },
      });
    });
  });
  CVES.forEach((cve) => {
    items.push({
      type: 'cve',
      label: cve.id,
      sub: cve.name,
      color:
        cve.severity === 'critical'
          ? 'var(--severity-critical)'
          : cve.severity === 'high'
            ? 'var(--severity-high)'
            : 'var(--severity-medium)',
      icon: 'bi-bug',
      action: () => {
        switchTab('cves');
        state.cveFilter = 'all';
        document
          .querySelectorAll('[data-cve-filter]')
          .forEach((b) => b.classList.toggle('active', b.dataset.cveFilter === 'all'));
        const el = document.getElementById('cve-search');
        if (el) el.value = cve.id;
        filterCVEs();
      },
    });
  });
  TOOLS.forEach((tool) => {
    items.push({
      type: 'tool',
      label: tool.name,
      sub: tool.type,
      color: 'var(--color-lateral)',
      icon: 'bi-tools',
      action: () => {
        switchTab('tools');
        const el = document.getElementById('tools-search');
        if (el) el.value = tool.name;
        filterTools();
      },
    });
  });
  return items;
}

let _cmdIndex = null;
let _cmdActive = -1;

function openCmdPalette() {
  if (!_cmdIndex) _cmdIndex = buildCmdIndex();
  const overlay = document.getElementById('cmd-overlay');
  const input = document.getElementById('cmd-input');
  if (!overlay || !input) return;
  overlay.removeAttribute('hidden');
  input.value = '';
  _cmdActive = -1;
  renderCmdResults('');
  setTimeout(() => input.focus(), 30);
}

function closeCmdPalette() {
  const overlay = document.getElementById('cmd-overlay');
  if (overlay) overlay.setAttribute('hidden', '');
  _cmdActive = -1;
}

function renderCmdResults(query) {
  const container = document.getElementById('cmd-results');
  if (!container || !_cmdIndex) return;
  const q = query.toLowerCase().trim();
  const filtered = q
    ? _cmdIndex
        .filter((it) => it.label.toLowerCase().includes(q) || it.sub.toLowerCase().includes(q))
        .slice(0, 24)
    : _cmdIndex.slice(0, 18);

  if (!filtered.length) {
    container.innerHTML = `<div class="cmd-empty"><i class="bi bi-search"></i> No results for "${escapeHtml(query)}"</div>`;
    return;
  }

  const groups = {};
  filtered.forEach((it) => {
    (groups[it.type] = groups[it.type] || []).push(it);
  });
  const groupLabels = { technique: 'Techniques', cve: 'CVEs', tool: 'Tools' };

  let html = '';
  let itemIdx = 0;
  Object.entries(groups).forEach(([type, items]) => {
    html += `<div class="cmd-group-label">${escapeHtml(groupLabels[type] || type)}</div>`;
    items.forEach((it) => {
      const sel = itemIdx === _cmdActive ? "aria-selected='true'" : "aria-selected='false'";
      html += `<div class="cmd-item" role="option" ${sel} data-cmd-idx="${itemIdx}" tabindex="-1">
        <div class="cmd-item-icon" style="background:${it.color}22;color:${it.color}"><i class="bi ${escapeHtml(it.icon)}" aria-hidden="true"></i></div>
        <span class="cmd-item-label">${escapeHtml(it.label)}</span>
        <span class="cmd-item-sub">${escapeHtml(it.sub)}</span>
      </div>`;
      itemIdx++;
    });
  });
  container.innerHTML = html;
  container._filtered = filtered;
}

function bindCmdPaletteEvents() {
  const overlay = document.getElementById('cmd-overlay');
  const input = document.getElementById('cmd-input');
  const results = document.getElementById('cmd-results');
  if (!overlay || !input || !results) return;

  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closeCmdPalette();
  });

  input.addEventListener('input', () => {
    _cmdActive = -1;
    renderCmdResults(input.value);
  });

  input.addEventListener('keydown', (e) => {
    const items = results.querySelectorAll('.cmd-item');
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      _cmdActive = Math.min(_cmdActive + 1, items.length - 1);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      _cmdActive = Math.max(_cmdActive - 1, -1);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      const idx = _cmdActive >= 0 ? _cmdActive : 0;
      if (results._filtered && results._filtered[idx]) {
        results._filtered[idx].action();
        closeCmdPalette();
      }
      return;
    } else if (e.key === 'Escape') {
      closeCmdPalette();
      return;
    } else {
      return;
    }
    items.forEach((el, i) => el.setAttribute('aria-selected', i === _cmdActive ? 'true' : 'false'));
    if (_cmdActive >= 0) items[_cmdActive]?.scrollIntoView({ block: 'nearest' });
  });

  results.addEventListener('click', (e) => {
    const item = e.target.closest('.cmd-item');
    if (!item) return;
    const idx = parseInt(item.dataset.cmdIdx, 10);
    if (results._filtered && results._filtered[idx]) {
      results._filtered[idx].action();
      closeCmdPalette();
    }
  });
}

// ── CVE TIMELINE ────────────────────────────────────────────────────────────
function renderCveTimeline() {
  const wrap = document.getElementById('cve-timeline-wrap');
  if (!wrap) return;

  const severityColor = {
    critical: 'var(--severity-critical)',
    high: 'var(--severity-high)',
    medium: 'var(--severity-medium)',
  };
  const byYear = {};
  CVES.forEach((c) => {
    (byYear[c.year] = byYear[c.year] || []).push(c);
  });
  const years = Object.keys(byYear)
    .map(Number)
    .sort((a, b) => a - b);
  const maxCount = Math.max(...years.map((y) => byYear[y].length));

  const colW = 80;
  const padX = 40;
  const padY = 20;
  const dotR = 7;
  const rowH = 28;
  const svgW = Math.max(years.length * colW + padX * 2, 500);
  const svgH = maxCount * rowH + padY * 2 + 36;

  let svgContent = '';
  years.forEach((year, xi) => {
    const x = padX + xi * colW + colW / 2;
    svgContent += `<text class="tl-year-label" x="${x}" y="${svgH - 8}" text-anchor="middle">${year}</text>`;
    svgContent += `<line x1="${x}" y1="${padY}" x2="${x}" y2="${svgH - 24}" stroke="var(--border-color)" stroke-width="1" stroke-dasharray="3,3"/>`;
    byYear[year].forEach((cve, ri) => {
      const cy = padY + ri * rowH + dotR + 2;
      const col = severityColor[cve.severity] || severityColor.medium;
      svgContent += `<circle class="tl-dot" cx="${x}" cy="${cy}" r="${dotR}" fill="${col}" opacity="0.85"
        data-id="${escapeHtml(cve.id)}" data-name="${escapeHtml(cve.name)}" data-sev="${escapeHtml(cve.severity)}" data-year="${year}"/>`;
    });
  });

  wrap.innerHTML = `<div class="timeline-wrap"><svg class="timeline-svg" width="${svgW}" height="${svgH}" aria-label="CVE Timeline">${svgContent}</svg></div>`;

  const tooltip = document.getElementById('tl-tooltip');
  wrap.querySelectorAll('.tl-dot').forEach((dot) => {
    dot.addEventListener('mouseenter', (e) => {
      if (!tooltip) return;
      tooltip.innerHTML = `<div class="tl-cve-id">${escapeHtml(dot.dataset.id)}</div><div class="tl-cve-name">${escapeHtml(dot.dataset.name)}</div><div style="color:${severityColor[dot.dataset.sev] || '#aaa'};font-size:11px;margin-top:3px">${escapeHtml(dot.dataset.sev.toUpperCase())} · ${escapeHtml(dot.dataset.year)}</div>`;
      tooltip.removeAttribute('hidden');
      moveTlTooltip(e);
    });
    dot.addEventListener('mousemove', moveTlTooltip);
    dot.addEventListener('mouseleave', () => tooltip && tooltip.setAttribute('hidden', ''));
    dot.addEventListener('click', () => {
      const el = document.getElementById('cve-search');
      if (el) el.value = dot.dataset.id;
      filterCVEs();
    });
  });
}

function moveTlTooltip(e) {
  const tooltip = document.getElementById('tl-tooltip');
  if (!tooltip) return;
  tooltip.style.left = `${e.clientX + 14}px`;
  tooltip.style.top = `${e.clientY - 10}px`;
}

// ── DEFENSIVE GAP ANALYSIS ──────────────────────────────────────────────────
function renderGapAnalysis() {
  const section = document.getElementById('gap-analysis-section');
  if (!section) return;

  // Build a map: attack category id → defense section completion
  // Each DEFENSE_CHECKLIST section has a category name; we map it to CATEGORIES by keyword matching
  const catKeywords = {
    discovery: ['偵察', 'discovery', 'recon', '列舉', 'enum'],
    privesc: ['提權', 'privilege', 'escalat', 'kerberoast', 'kerberos', 'delegat', 'admin'],
    defevasion: ['規避', 'evasion', 'bypass', '日誌', 'log', 'audit'],
    lateral: ['橫向', 'lateral', 'pass-the', 'pth', 'smb', 'winrm'],
    cred: ['憑證', 'credential', 'password', 'ntlm', 'hash', 'lsass', 'laps'],
    persistence: [
      '持久',
      'persistence',
      'backdoor',
      'golden',
      'silver',
      'dcsync',
      'acl',
      'gpo',
      'cs',
    ],
  };

  const sectionScores = {};
  DEFENSE_CHECKLIST.forEach((sec, sIdx) => {
    const catName = (d(sec.category) || '').toLowerCase();
    let matchedCat = null;
    for (const [catId, kws] of Object.entries(catKeywords)) {
      if (kws.some((kw) => catName.includes(kw))) {
        matchedCat = catId;
        break;
      }
    }
    if (!matchedCat) return;
    if (!sectionScores[matchedCat]) sectionScores[matchedCat] = { done: 0, total: 0, sections: [] };
    sec.items.forEach((_, iIdx) => {
      sectionScores[matchedCat].total++;
      if (state.checkedItems[`${sIdx}-${iIdx}`]) sectionScores[matchedCat].done++;
    });
    sectionScores[matchedCat].sections.push(d(sec.category));
  });

  const cards = CATEGORIES.map((cat) => {
    const score = sectionScores[cat.id];
    if (!score || score.total === 0) return null;
    const pct = Math.round((score.done / score.total) * 100);
    const risk = pct < 30 ? 'high' : pct < 70 ? 'medium' : 'low';
    const riskLabel = pct < 30 ? '高曝險' : pct < 70 ? '部分覆蓋' : '良好覆蓋';
    return { cat, pct, risk, riskLabel, score };
  }).filter(Boolean);

  if (!cards.length) {
    section.innerHTML = '';
    return;
  }

  const html = `
    <div style="margin-bottom:8px">
      <span class="fw-600 text-primary" style="font-size:14px">
        <i class="bi bi-shield-exclamation" style="color:var(--severity-high)"></i>
        防禦缺口分析
      </span>
      <span class="text-muted text-small" style="margin-left:8px">根據清單完成度估算攻擊類別曝險程度</span>
    </div>
    <div class="gap-grid">
      ${cards
        .map(
          ({ cat, pct, risk, riskLabel, score }) => `
        <div class="gap-card risk-${escapeHtml(risk)}">
          <div class="gap-card-name">
            <i class="bi ${escapeHtml(cat.icon)}" style="color:${escapeHtml(cat.color)}"></i>
            ${escapeHtml(d(cat.name) || cat.name)}
          </div>
          <div class="gap-bar-wrap">
            <div class="gap-bar-fill" style="width:${pct}%;background:${pct < 30 ? 'var(--severity-critical)' : pct < 70 ? 'var(--severity-high)' : 'var(--color-defense)'}"></div>
          </div>
          <div class="gap-stats">
            <span>${score.done}/${score.total} 項完成</span>
            <span style="color:${pct < 30 ? 'var(--severity-critical)' : pct < 70 ? 'var(--severity-high)' : 'var(--color-defense)'}">${riskLabel} (${pct}%)</span>
          </div>
        </div>`
        )
        .join('')}
    </div>
  `;
  section.innerHTML = html;
}

// ── TECHNIQUE DEEP-DIVE SIDE PANEL ──────────────────────────────────────────
function openSidePanel(technique, category) {
  const panel = document.getElementById('side-panel');
  const overlay = document.getElementById('sp-overlay');
  if (!panel || !overlay) return;

  document.getElementById('sp-title').textContent = technique.name;
  document.getElementById('sp-category').innerHTML =
    `<i class="bi ${escapeHtml(category.icon)}" style="color:${escapeHtml(category.color)}"></i> ${escapeHtml(d(category.name) || category.name)}`;

  const relCves = CVES.filter(
    (c) =>
      (c.tools || []).some((t) => (technique.tools || []).includes(t)) ||
      c.category === category.name
  );
  const relEvents = DETECTION_EVENTS.filter(
    (e) =>
      e.category === category.id ||
      (e.attack || '')
        .toLowerCase()
        .split(' ')
        .some((w) => technique.name.toLowerCase().includes(w) && w.length > 3)
  );
  const toolNames = new Set(technique.tools || []);
  const relDefense = [];
  DEFENSE_CHECKLIST.forEach((sec, sIdx) => {
    sec.items.forEach((item, iIdx) => {
      const txt = (d(item.text) + ' ' + d(item.detail || '')).toLowerCase();
      if (
        [...toolNames].some((t) => txt.includes(t.toLowerCase())) ||
        txt.includes(category.id) ||
        txt.includes((d(category.name) || '').toLowerCase())
      ) {
        relDefense.push({ item, key: `${sIdx}-${iIdx}`, section: d(sec.category) });
      }
    });
  });

  const cvesHtml = relCves.length
    ? relCves
        .slice(0, 5)
        .map(
          (c) => `
      <div class="sp-cve-row">
        <span class="cve-id">${escapeHtml(c.id)}</span>
        <span class="badge badge-${escapeHtml(c.severity)}" style="font-size:10px">${escapeHtml(c.severity.toUpperCase())}</span>
        <span class="text-secondary text-small" style="flex:1">${escapeHtml(c.name)}</span>
      </div>`
        )
        .join('')
    : `<div class="sp-empty">無直接相關 CVE</div>`;

  const eventsHtml = relEvents.length
    ? relEvents
        .slice(0, 4)
        .map(
          (e) => `
      <div style="margin-bottom:6px">
        <div class="text-small fw-600 text-secondary" style="margin-bottom:4px">${escapeHtml(e.attack)}</div>
        <div style="display:flex;flex-wrap:wrap;gap:4px">${e.eventIds.map((id) => `<span class="sp-event-chip js-copy-event" data-event-id="${escapeHtml(id)}" role="button" tabindex="0" title="Click to copy">${escapeHtml(id)}</span>`).join('')}</div>
      </div>`
        )
        .join('')
    : `<div class="sp-empty">無直接對應 Event ID</div>`;

  const defenseHtml = relDefense.length
    ? relDefense
        .slice(0, 6)
        .map(({ item, key }) => {
          const done = !!state.checkedItems[key];
          return `<div class="sp-defense-item">
          <i class="bi ${done ? 'bi-check-circle-fill sp-defense-check' : 'bi-circle sp-defense-uncheck'}" aria-hidden="true"></i>
          <span>${escapeHtml(d(item.text))}</span>
        </div>`;
        })
        .join('')
    : `<div class="sp-empty">無直接關聯防禦項目</div>`;

  const toolsHtml = (technique.tools || []).length
    ? technique.tools.map((tool) => `<span class="tool-tag">${escapeHtml(tool)}</span>`).join('')
    : `<span class="text-muted text-small">—</span>`;

  const descHtml = `<p class="text-secondary" style="font-size:13px;line-height:1.6">${escapeHtml(d(technique.description))}</p>`;

  document.getElementById('sp-body').innerHTML = `
    <div class="sp-section">${descHtml}</div>
    <div class="sp-section">
      <div class="sp-section-title"><i class="bi bi-tools" aria-hidden="true"></i> 常用工具</div>
      <div style="display:flex;flex-wrap:wrap;gap:6px">${toolsHtml}</div>
    </div>
    <div class="sp-section">
      <div class="sp-section-title"><i class="bi bi-bug" aria-hidden="true"></i> 相關 CVE</div>
      ${cvesHtml}
    </div>
    <div class="sp-section">
      <div class="sp-section-title"><i class="bi bi-eye" aria-hidden="true"></i> 偵測 Event ID（點擊複製）</div>
      ${eventsHtml}
    </div>
    <div class="sp-section">
      <div class="sp-section-title"><i class="bi bi-shield-check" aria-hidden="true"></i> 相關防禦清單</div>
      ${defenseHtml}
    </div>
  `;

  panel.setAttribute('aria-hidden', 'false');
  overlay.classList.add('open');
  panel.classList.add('open');
  document.getElementById('sp-close')?.focus();
}

function closeSidePanel() {
  const panel = document.getElementById('side-panel');
  const overlay = document.getElementById('sp-overlay');
  panel?.classList.remove('open');
  panel?.setAttribute('aria-hidden', 'true');
  overlay?.classList.remove('open');
}

// ── RED TEAM REPORT ─────────────────────────────────────────────────────────
function exportRedTeamReport() {
  const { checkedCount, totalItems, pct } = computeProgress(state.checkedItems, DEFENSE_CHECKLIST);
  const criticalCves = CVES.filter((c) => c.severity === 'critical');
  const highCves = CVES.filter((c) => c.severity === 'high');

  const gapRows = CATEGORIES.map((cat) => {
    const catName = d(cat.name) || cat.name;
    const techCount = cat.techniques.length;
    const cveCount = CVES.filter((c) => c.category === catName).length;
    return `<tr><td style="padding:8px 12px;border-bottom:1px solid #333"><b>${escapeHtml(catName)}</b></td><td style="padding:8px 12px;border-bottom:1px solid #333;text-align:center">${techCount}</td><td style="padding:8px 12px;border-bottom:1px solid #333;text-align:center">${cveCount}</td></tr>`;
  }).join('');

  const uncheckedItems = [];
  DEFENSE_CHECKLIST.forEach((sec, sIdx) => {
    sec.items.forEach((item, iIdx) => {
      if (!state.checkedItems[`${sIdx}-${iIdx}`]) {
        uncheckedItems.push(
          `<li style="margin:4px 0;color:#e6edf3">[${escapeHtml(d(sec.category))}] ${escapeHtml(d(item.text))}</li>`
        );
      }
    });
  });

  const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>AD Kill Chain — Red Team Report</title>
<style>
  body{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;background:#0d1117;color:#e6edf3;padding:40px;max-width:900px;margin:0 auto;line-height:1.6}
  h1{color:#58a6ff;margin-bottom:4px}
  h2{color:#79c0ff;border-bottom:1px solid #30363d;padding-bottom:8px;margin-top:32px}
  .badge{display:inline-block;padding:2px 8px;border-radius:4px;font-size:12px;font-weight:700}
  .critical{background:#da3633;color:#fff}
  .high{background:#e3b341;color:#000}
  .medium{background:#58a6ff;color:#000}
  table{width:100%;border-collapse:collapse;margin-top:12px}
  th{background:#161b22;padding:8px 12px;text-align:left;color:#8b949e;font-size:12px;text-transform:uppercase}
  .stat-row{display:flex;gap:24px;flex-wrap:wrap;margin:16px 0}
  .stat-box{background:#161b22;border:1px solid #30363d;border-radius:8px;padding:16px 24px;min-width:120px}
  .stat-num{font-size:28px;font-weight:700;color:#58a6ff}
  .stat-label{font-size:12px;color:#8b949e;margin-top:4px}
  .progress-bar{height:10px;background:#30363d;border-radius:5px;overflow:hidden;margin:8px 0}
  .progress-fill{height:100%;border-radius:5px;background:${pct >= 70 ? '#3fb950' : pct >= 40 ? '#e3b341' : '#da3633'}}
  ul{padding-left:20px;max-height:400px;overflow-y:auto}
  footer{margin-top:48px;color:#656d76;font-size:12px;border-top:1px solid #30363d;padding-top:16px}
</style>
</head>
<body>
<h1>🛡 AD Kill Chain — Red Team Report</h1>
<p style="color:#8b949e">Generated: ${new Date().toLocaleString()} &nbsp;·&nbsp; Dashboard snapshot</p>

<h2>Executive Summary</h2>
<div class="stat-row">
  <div class="stat-box"><div class="stat-num">${CATEGORIES.length}</div><div class="stat-label">Attack Categories</div></div>
  <div class="stat-box"><div class="stat-num">${CVES.length}</div><div class="stat-label">CVEs Tracked</div></div>
  <div class="stat-box"><div class="stat-num" style="color:#da3633">${criticalCves.length}</div><div class="stat-label">Critical CVEs</div></div>
  <div class="stat-box"><div class="stat-num" style="color:#3fb950">${pct}%</div><div class="stat-label">Defense Coverage</div></div>
</div>
<div class="progress-bar"><div class="progress-fill" style="width:${pct}%"></div></div>
<p style="font-size:13px;color:#8b949e">${checkedCount} of ${totalItems} defense checklist items completed</p>

<h2>Critical CVEs</h2>
<table>
  <thead><tr><th>CVE ID</th><th>Name</th><th>Severity</th><th>Year</th></tr></thead>
  <tbody>
    ${[...criticalCves, ...highCves]
      .slice(0, 15)
      .map(
        (c) =>
          `<tr><td style="padding:8px 12px;border-bottom:1px solid #21262d;font-family:monospace">${escapeHtml(c.id)}</td><td style="padding:8px 12px;border-bottom:1px solid #21262d">${escapeHtml(c.name)}</td><td style="padding:8px 12px;border-bottom:1px solid #21262d"><span class="badge ${escapeHtml(c.severity)}">${escapeHtml(c.severity.toUpperCase())}</span></td><td style="padding:8px 12px;border-bottom:1px solid #21262d;color:#8b949e">${escapeHtml(String(c.year))}</td></tr>`
      )
      .join('')}
  </tbody>
</table>

<h2>Attack Surface by Category</h2>
<table>
  <thead><tr><th>Category</th><th style="text-align:center">Techniques</th><th style="text-align:center">CVEs</th></tr></thead>
  <tbody>${gapRows}</tbody>
</table>

<h2>Unmitigated Defense Items (${totalItems - checkedCount} remaining)</h2>
<ul>${uncheckedItems.slice(0, 50).join('')}${uncheckedItems.length > 50 ? `<li style="color:#8b949e">… and ${uncheckedItems.length - 50} more</li>` : ''}</ul>

<footer>AD Kill Chain Attack &amp; Defense Dashboard · Red Team / Education Use Only</footer>
</body>
</html>`;

  const blob = new Blob([html], { type: 'text/html' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `ad-redteam-report-${new Date().toISOString().slice(0, 10)}.html`;
  a.click();
  URL.revokeObjectURL(url);
  showToast('Red Team 報告已匯出');
}

// ── UTILITY ────────────────────────────────────────────────────────────────
function showToast(message) {
  const existing = document.querySelector('.toast');
  if (existing) existing.remove();

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.setAttribute('role', 'status');
  toast.setAttribute('aria-live', 'polite');
  toast.innerHTML = `<i class="bi bi-clipboard-check" style="color:var(--color-defense)" aria-hidden="true"></i> ${escapeHtml(message)}`;
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 2500);
}
