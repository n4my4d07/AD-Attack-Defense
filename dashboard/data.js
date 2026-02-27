// AD Kill Chain Attack & Defense - Structured Data
// Extracted from README.md

const CATEGORIES = [
  {
    id: 'discovery',
    name: 'Discovery',
    icon: 'bi-search',
    color: '#58a6ff',
    mitre: 'TA0007',
    description: { zh: '對 Active Directory 環境進行偵察，列舉服務、帳戶與設定資訊', en: 'Reconnaissance of the Active Directory environment, enumerating services, accounts, and configuration information', ja: 'Active Directory 環境の偵察、サービス・アカウント・設定情報の列挙' },
    techniques: [
      {
        name: 'SPN Scanning',
        description: { zh: '掃描 Service Principal Names，在不使用網路埠掃描的情況下發現服務', en: 'Scan Service Principal Names to discover services without network port scanning', ja: 'Service Principal Names をスキャンし、ネットワークポートスキャンなしにサービスを発見する' },
        tools: ['PowerView', 'PowerUpSQL'],
        resources: [
          { title: 'SPN Scanning – Service Discovery without Network Port Scanning', url: 'https://adsecurity.org/?p=1508' },
          { title: 'Active Directory: PowerShell script to list all SPNs used', url: 'https://social.technet.microsoft.com/wiki/contents/articles/18996.active-directory-powershell-script-to-list-all-spns-used.aspx' },
          { title: 'Discovering Service Accounts Without Using Privileges', url: 'https://blog.stealthbits.com/discovering-service-accounts-without-using-privileges/' }
        ]
      },
      {
        name: 'Data Mining',
        description: { zh: '在網域 SQL 伺服器與郵件系統中搜尋敏感資料', en: 'Search for sensitive data in domain SQL servers and mail systems', ja: 'ドメイン内の SQL サーバーやメールシステムで機密データを検索する' },
        tools: ['PowerUpSQL', 'MailSniper'],
        resources: [
          { title: 'A Data Hunting Overview', url: 'https://thevivi.net/2018/05/23/a-data-hunting-overview/' },
          { title: 'Finding Sensitive Data on Domain SQL Servers using PowerUpSQL', url: 'https://blog.netspi.com/finding-sensitive-data-domain-sql-servers-using-powerupsql/' },
          { title: 'I Hunt Sysadmins', url: 'https://blog.harmj0y.net/penetesting/i-hunt-sysadmins/' }
        ]
      },
      {
        name: 'User Hunting',
        description: { zh: '在 AD 環境中尋找高價值帳戶與管理員', en: 'Hunt for high-value accounts and administrators in the AD environment', ja: 'AD 環境内で高価値アカウントや管理者を探索する' },
        tools: ['BloodHound', 'PowerView', 'ADRecon'],
        resources: [
          { title: 'Hidden Administrative Accounts: BloodHound to the Rescue', url: 'https://www.crowdstrike.com/blog/hidden-administrative-accounts-bloodhound-to-the-rescue/' },
          { title: 'Active Directory Recon Without Admin Rights', url: 'https://adsecurity.org/?p=2535' },
          { title: 'Attack Mapping With Bloodhound', url: 'https://blog.stealthbits.com/local-admin-mapping-bloodhound' },
          { title: 'Situational Awareness', url: 'https://pentestlab.blog/2018/05/28/situational-awareness/' }
        ]
      },
      {
        name: 'LAPS Enumeration',
        description: { zh: '列舉 Local Administrator Password Solution 設定', en: 'Enumerate Local Administrator Password Solution (LAPS) configuration', ja: 'Local Administrator Password Solution (LAPS) の設定を列挙する' },
        tools: ['LAPSToolkit', 'PowerView'],
        resources: [
          { title: 'Microsoft LAPS Security & Active Directory LAPS Configuration Recon', url: 'https://adsecurity.org/?p=3164' },
          { title: 'Running LAPS with PowerView', url: 'https://blog.harmj0y.net/powershell/running-laps-with-powerview/' }
        ]
      },
      {
        name: 'AppLocker Enumeration',
        description: { zh: '列舉 AppLocker 設定，找出繞過路徑', en: 'Enumerate AppLocker configuration to identify bypass paths', ja: 'AppLocker の設定を列挙し、バイパス経路を特定する' },
        tools: [],
        resources: [
          { title: 'Enumerating AppLocker Config', url: 'https://rastamouse.me/blog/applocker/' }
        ]
      },
      {
        name: 'ADFS Reconnaissance',
        description: { zh: '對 Active Directory Federation Services 進行攻擊與偵察', en: 'Attack and reconnaissance against Active Directory Federation Services', ja: 'Active Directory Federation Services に対する攻撃と偵察' },
        tools: ['PowerShell'],
        resources: [
          { title: 'Attacking ADFS Endpoints with PowerShell', url: 'https://www.youtube.com/watch?v=oTyLdAUjw30' },
          { title: 'Using PowerShell to Identify Federated Domains', url: 'https://blog.netspi.com/using-powershell-identify-federated-domains/' }
        ]
      },
      {
        name: 'ADIDNS Enumeration',
        description: { zh: '列舉 Active Directory 整合 DNS 區域，找出主機名稱、IP 與隱藏服務', en: 'Enumerate Active Directory Integrated DNS zones to discover hostnames, IPs, and hidden services', ja: 'Active Directory 統合 DNS ゾーンを列挙してホスト名・IP・隠れたサービスを発見する' },
        tools: ['adidnsdump', 'dnstool.py', 'Powermad'],
        resources: [
          { title: 'Getting in the Zone: Dumping Active Directory DNS using adidnsdump', url: 'https://dirkjanm.io/getting-in-the-zone-dumping-active-directory-dns-with-adidnsdump/' },
          { title: 'Beyond LLMNR/NBNS Spoofing – Exploiting Active Directory-Integrated DNS', url: 'https://blog.netspi.com/exploiting-adidns/' }
        ]
      }
    ]
  },
  {
    id: 'privilege-escalation',
    name: 'Privilege Escalation',
    icon: 'bi-arrow-up-circle',
    color: '#ff7b72',
    mitre: 'TA0004',
    description: { zh: '從一般使用者提升至域管理員或更高權限', en: 'Escalate from standard user to Domain Admin or higher privileges', ja: '一般ユーザーからドメイン管理者以上の権限への昇格' },
    techniques: [
      {
        name: 'sAMAccountName Spoofing',
        description: { zh: 'CVE-2021-42287/42278：利用電腦帳戶冒充 DC，取得域管理員 TGT', en: 'CVE-2021-42287/42278: Use a computer account to impersonate a DC and obtain a Domain Admin TGT', ja: 'CVE-2021-42287/42278: コンピューターアカウントを使って DC を偽装し、ドメイン管理者の TGT を取得する' },
        tools: ['sam-the-admin', 'noPac'],
        cves: ['CVE-2021-42287', 'CVE-2021-42278'],
        resources: [
          { title: 'sAMAccountName spoofing', url: 'https://www.thehacker.recipes/ad/movement/kerberos/samaccountname-spoofing' },
          { title: 'CVE-2021-42287/CVE-2021-42278 Weaponisation', url: 'https://exploit.ph/cve-2021-42287-cve-2021-42278-weaponisation.html' }
        ]
      },
      {
        name: 'AD CS Abuse (Certified Pre-Owned)',
        description: { zh: '濫用 AD 憑證服務中的錯誤設定，進行權限提升', en: 'Abuse misconfigurations in AD Certificate Services for privilege escalation', ja: 'AD 証明書サービスの設定ミスを悪用して権限を昇格する' },
        tools: ['Certify', 'PSPKIAudit', 'Locksmith'],
        resources: [
          { title: 'Certified Pre-Owned', url: 'https://posts.specterops.io/certified-pre-owned-d95910965cd2' },
          { title: 'AD CS Domain Escalation', url: 'https://book.hacktricks.xyz/windows-hardening/active-directory-methodology/ad-certificates/domain-escalation' }
        ]
      },
      {
        name: 'PetitPotam',
        description: { zh: '強制 DC 向攻擊者進行 NTLM 認證，再中繼到 AD CS 取得域管理員', en: 'Force DC to perform NTLM authentication to the attacker, then relay to AD CS to obtain Domain Admin', ja: 'DC に攻撃者への NTLM 認証を強制し、AD CS にリレーしてドメイン管理者権限を取得する' },
        tools: ['PetitPotam', 'Impacket'],
        cves: ['CVE-2021-36942'],
        resources: [
          { title: 'PetitPotam GitHub', url: 'https://github.com/topotam/PetitPotam' },
          { title: 'From Stranger to DA using PetitPotam', url: 'https://blog.truesec.com/2021/08/05/from-stranger-to-da-using-petitpotam-to-ntlm-relay-to-active-directory/' }
        ]
      },
      {
        name: 'Zerologon',
        description: { zh: 'CVE-2020-1472：利用 Netlogon 加密漏洞，無需憑證即可成為域管理員', en: 'CVE-2020-1472: Exploit a Netlogon encryption flaw to become Domain Admin without credentials', ja: 'CVE-2020-1472: Netlogon の暗号化の欠陥を悪用し、資格情報なしでドメイン管理者になる' },
        tools: ['Impacket'],
        cves: ['CVE-2020-1472'],
        resources: [
          { title: 'Zerologon: instantly become domain admin (CVE-2020-1472)', url: 'https://www.secura.com/blog/zero-logon' },
          { title: 'CVE-2020-1472 POC', url: 'https://github.com/dirkjanm/CVE-2020-1472' }
        ]
      },
      {
        name: 'Kerberos Delegation',
        description: { zh: '利用無限制/受限制/資源型 Kerberos 委派進行提權', en: 'Abuse unconstrained/constrained/resource-based Kerberos delegation for privilege escalation', ja: '無制限/制約付き/リソースベースの Kerberos 委任を悪用して権限を昇格する' },
        tools: ['Rubeus', 'Impacket', 'BloodHound'],
        cves: ['CVE-2020-17049'],
        resources: [
          { title: 'Constructing Kerberos Attacks with Delegation Primitives', url: 'https://shenaniganslabs.io/media/Constructing%20Kerberos%20Attacks%20with%20Delegation%20Primitives.pdf' },
          { title: 'Wagging the Dog: Resource-Based Constrained Delegation', url: 'https://shenaniganslabs.io/2019/01/28/Wagging-the-Dog.html' },
          { title: 'Domain Controller + Unconstrained Delegation = Pwned', url: 'https://adsecurity.org/?p=4056' }
        ]
      },
      {
        name: 'Insecure ACL Permissions',
        description: { zh: '利用 AD ACL 的不安全設定進行橫向/垂直移動', en: 'Exploit insecure AD ACL configurations for lateral and vertical privilege movement', ja: 'AD ACL の安全でない設定を悪用して横方向・垂直方向に権限を移動する' },
        tools: ['PowerView', 'BloodHound', 'aclpwn.py', 'RACE'],
        resources: [
          { title: 'Escalating privileges with ACLs in Active Directory', url: 'https://blog.fox-it.com/2018/04/26/escalating-privileges-with-acls-in-active-directory/' },
          { title: 'Abusing Active Directory Permissions with PowerView', url: 'https://blog.harmj0y.net/redteaming/abusing-active-directory-permissions-with-powerview/' },
          { title: 'BloodHound 1.3 – The ACL Attack Path Update', url: 'https://wald0.com/?p=112' }
        ]
      },
      {
        name: 'GPO Abuse',
        description: { zh: '利用不安全的 Group Policy Object 設定進行提權', en: 'Exploit insecure Group Policy Object configurations for privilege escalation', ja: '安全でないグループポリシーオブジェクトの設定を悪用して権限を昇格する' },
        tools: ['PowerView', 'SharpGPOAbuse', 'Grouper'],
        resources: [
          { title: 'Abusing GPO Permissions', url: 'https://www.harmj0y.net/blog/redteaming/abusing-gpo-permissions/' },
          { title: 'A Red Teamer\'s Guide to GPOs and OUs', url: 'https://wald0.com/?p=179' }
        ]
      },
      {
        name: 'Domain Trust Attacks',
        description: { zh: '利用跨域/跨林信任關係進行橫向移動', en: 'Abuse cross-domain/cross-forest trust relationships for lateral movement', ja: 'ドメイン間・フォレスト間の信頼関係を悪用して横方向に移動する' },
        tools: ['Rubeus', 'Mimikatz', 'PowerView'],
        resources: [
          { title: 'A Guide to Attacking Domain Trusts', url: 'https://blog.harmj0y.net/redteaming/a-guide-to-attacking-domain-trusts/' },
          { title: 'Not A Security Boundary: Breaking Forest Trusts', url: 'https://posts.specterops.io/not-a-security-boundary-breaking-forest-trusts-cd125829518d' }
        ]
      },
      {
        name: 'DNSAdmins Privilege Abuse',
        description: { zh: '利用 DNSAdmins 群組成員身份載入惡意 DLL，提升至系統層級', en: 'Load a malicious DLL via DNSAdmins group membership to escalate to SYSTEM', ja: 'DNSAdmins グループのメンバーシップを利用して悪意のある DLL を読み込み、SYSTEM 権限に昇格する' },
        tools: ['PowerView'],
        resources: [
          { title: 'Abusing DNSAdmins privilege for escalation in Active Directory', url: 'http://www.labofapenetrationtester.com/2017/05/abusing-dnsadmins-privilege-for-escalation-in-active-directory.html' },
          { title: 'From DNSAdmins to Domain Admin', url: 'https://adsecurity.org/?p=4064' }
        ]
      },
      {
        name: 'NTLM Relay & LLMNR/NBNS Poisoning',
        description: { zh: '利用 NTLM 中繼攻擊或 LLMNR/NBNS 毒化取得憑證', en: 'Capture credentials via NTLM relay attacks or LLMNR/NBNS poisoning', ja: 'NTLM リレー攻撃または LLMNR/NBNS ポイズニングによって認証情報を取得する' },
        tools: ['Responder', 'Impacket', 'mitm6'],
        cves: ['CVE-2019-1040'],
        resources: [
          { title: 'Pwning with Responder – A Pentester\'s Guide', url: 'https://www.notsosecure.com/pwning-with-responder-a-pentesters-guide/' },
          { title: 'Practical guide to NTLM Relaying in 2017', url: 'https://byt3bl33d3r.github.io/practical-guide-to-ntlm-relaying-in-2017-aka-getting-a-foothold-in-under-5-minutes.html' },
          { title: 'mitm6 – compromising IPv4 networks via IPv6', url: 'https://www.fox-it.com/en/news/blog/mitm6-compromising-ipv4-networks-via-ipv6/' }
        ]
      },
      {
        name: 'Shadow Credentials',
        description: { zh: '利用 msDS-KeyCredentialLink 屬性新增金鑰憑證，在無需知道密碼的情況下取得 TGT', en: 'Add key credentials via the msDS-KeyCredentialLink attribute to obtain a TGT without knowing the target password', ja: 'msDS-KeyCredentialLink 属性にキー資格情報を追加し、パスワードなしで TGT を取得する' },
        tools: ['Whisker', 'pywhisker', 'Certipy'],
        resources: [
          { title: 'Shadow Credentials: Abusing Key Trust Account Mapping for Account Takeover', url: 'https://posts.specterops.io/shadow-credentials-abusing-key-trust-account-mapping-for-takeover-8ee1a53566ab' },
          { title: 'Whisker GitHub', url: 'https://github.com/eladshamir/Whisker' }
        ]
      },
      {
        name: 'PrintNightmare (Print Spooler RCE)',
        description: { zh: 'CVE-2021-34527：Windows Print Spooler 遠端程式碼執行，以 SYSTEM 權限在 DC 上執行任意程式碼', en: 'CVE-2021-34527: Windows Print Spooler remote code execution to run arbitrary code as SYSTEM on a DC', ja: 'CVE-2021-34527: Windows Print Spooler のリモートコード実行により DC 上で SYSTEM 権限で任意のコードを実行する' },
        tools: ['Impacket', 'SharpPrintNightmare'],
        cves: ['CVE-2021-34527'],
        resources: [
          { title: 'PrintNightmare – CVE-2021-34527 Technical Analysis', url: 'https://www.truesec.com/hub/blog/printnightmare-cve-2021-34527' },
          { title: 'Detecting PrintNightmare', url: 'https://www.huntress.com/blog/detecting-printnightmare' }
        ]
      },
      {
        name: 'Certifried (AD CS EoP)',
        description: { zh: 'CVE-2022-26923：一般使用者透過操控電腦帳戶 dNSHostName 屬性，從 AD CS 取得域管理員憑證', en: 'CVE-2022-26923: Standard users obtain Domain Admin certificates from AD CS by manipulating the dNSHostName attribute of computer accounts', ja: 'CVE-2022-26923: 一般ユーザーがコンピューターアカウントの dNSHostName 属性を操作し、AD CS からドメイン管理者証明書を取得する' },
        tools: ['Certipy', 'Certify'],
        cves: ['CVE-2022-26923'],
        resources: [
          { title: 'Certifried: Active Directory Domain Privilege Escalation (CVE-2022-26923)', url: 'https://research.ifcr.dk/certifried-active-directory-domain-privilege-escalation-cve-2022-26923-9e098652bef4' }
        ]
      },
      {
        name: 'Coercion Attacks (PrinterBug / Coercer)',
        description: { zh: '利用 MS-RPRN、MS-EFSR 等多種 Windows 協定強制 DC 向攻擊者進行 NTLM 認證，再中繼提權', en: 'Force DCs to perform NTLM authentication to the attacker using MS-RPRN, MS-EFSR, and other Windows protocols, then relay for privilege escalation', ja: 'MS-RPRN・MS-EFSR などの複数 Windows プロトコルで DC に攻撃者への NTLM 認証を強制し、リレーして権限昇格する' },
        tools: ['Coercer', 'SpoolSample', 'PetitPotam', 'Impacket'],
        resources: [
          { title: 'SpoolSample (PrinterBug) GitHub', url: 'https://github.com/leechristensen/SpoolSample' },
          { title: 'Coercer – Coerce Windows Servers to Authenticate', url: 'https://github.com/p0dalirius/Coercer' }
        ]
      }
    ]
  },
  {
    id: 'defense-evasion',
    name: 'Defense Evasion',
    icon: 'bi-shield-x',
    color: '#e3b341',
    mitre: 'TA0005',
    description: { zh: '規避安全工具偵測，維持在網路中的存在', en: 'Evade security tool detection and maintain persistence within the network', ja: 'セキュリティツールの検知を回避し、ネットワーク内に潜伏し続ける' },
    techniques: [
      {
        name: 'AMSI Bypass',
        description: { zh: '繞過 Anti-Malware Scan Interface，執行惡意 PowerShell 程式碼', en: 'Bypass the Anti-Malware Scan Interface to execute malicious PowerShell code', ja: 'Anti-Malware Scan Interface をバイパスして悪意のある PowerShell コードを実行する' },
        tools: ['Invisi-Shell'],
        resources: [
          { title: 'How to bypass AMSI and execute ANY malicious Powershell code', url: 'https://0x00-0x00.github.io/research/2018/10/28/How-to-bypass-AMSI-and-Execute-ANY-malicious-powershell-code.html' },
          { title: 'AMSI Bypass: Patching Technique', url: 'https://www.cyberark.com/threat-research-blog/amsi-bypass-patching-technique/' },
          { title: 'AmsiScanBuffer Bypass - Part 1', url: 'https://rastamouse.me/2018/10/amsiscanbuffer-bypass---part-1/' }
        ]
      },
      {
        name: 'EDR Evasion',
        description: { zh: '繞過端點偵測與回應工具', en: 'Bypass Endpoint Detection and Response (EDR) tools', ja: 'エンドポイント検知・対応（EDR）ツールをバイパスする' },
        tools: ['Sharp-Suite'],
        resources: [
          { title: 'Red Team Tactics: Combining Direct System Calls and sRDI to bypass AV/EDR', url: 'https://outflank.nl/blog/2019/06/19/red-team-tactics-combining-direct-system-calls-and-srdi-to-bypass-av-edr/' },
          { title: 'Bypassing Cylance and other AVs/EDRs by Unhooking Windows APIs', url: 'https://ired.team/offensive-security/defense-evasion/bypassing-cylance-and-other-avs-edrs-by-unhooking-windows-apis' }
        ]
      },
      {
        name: 'PowerShell ScriptBlock Logging Bypass',
        description: { zh: '繞過 PowerShell ScriptBlock 日誌記錄', en: 'Bypass PowerShell ScriptBlock logging', ja: 'PowerShell ScriptBlock ログをバイパスする' },
        tools: [],
        resources: [
          { title: 'PowerShell ScriptBlock Logging Bypass', url: 'https://cobbr.io/ScriptBlock-Logging-Bypass.html' }
        ]
      },
      {
        name: 'In-Memory Evasion',
        description: { zh: '在記憶體中執行惡意程式碼，避免落地', en: 'Execute malicious code entirely in memory to avoid disk artifacts', ja: 'メモリ内で悪意のあるコードを実行し、ディスクへの書き込みを避ける' },
        tools: [],
        resources: [
          { title: 'Bring Your Own Land (BYOL) – A Novel Red Teaming Technique', url: 'https://www.fireeye.com/blog/threat-research/2018/06/bring-your-own-land-novel-red-teaming-technique.html' }
        ]
      },
      {
        name: 'AppLocker & LOLBins Bypass',
        description: { zh: '利用系統內建二進位檔繞過 AppLocker 限制', en: 'Use system-native binaries (LOLBins) to bypass AppLocker restrictions', ja: 'システム組み込みバイナリ（LOLBins）を使って AppLocker の制限をバイパスする' },
        tools: [],
        resources: [
          { title: 'Living Off The Land Binaries And Scripts (LOLBins)', url: 'https://lolbas-project.github.io/' }
        ]
      },
      {
        name: 'Sysmon Evasion',
        description: { zh: '規避 Sysmon 監控', en: 'Evade Sysmon monitoring', ja: 'Sysmon の監視を回避する' },
        tools: ['sysmon-config-bypass-finder'],
        resources: [
          { title: 'Subverting Sysmon: Application of a Formalized Security Product Evasion Methodology', url: 'https://github.com/mattifestation/BHUSA2018_Sysmon' },
          { title: 'Shhmon — Silencing Sysmon via Driver Unload', url: 'https://posts.specterops.io/shhmon-silencing-sysmon-via-driver-unload-682b5be57650' }
        ]
      }
    ]
  },
  {
    id: 'lateral-movement',
    name: 'Lateral Movement',
    icon: 'bi-arrows-expand',
    color: '#bc8cff',
    mitre: 'TA0008',
    description: { zh: '在網路中橫向移動，擴大存取範圍', en: 'Move laterally within the network to expand access', ja: 'ネットワーク内を横断的に移動し、アクセス範囲を拡大する' },
    techniques: [
      {
        name: 'Pass The Hash',
        description: { zh: '使用 NTLM 雜湊值進行認證，無需明文密碼', en: 'Authenticate using NTLM hashes without requiring plaintext passwords', ja: '平文パスワードなしで NTLM ハッシュを使用して認証する' },
        tools: ['Mimikatz', 'CrackMapExec', 'Impacket'],
        resources: [
          { title: 'Performing Pass-the-hash Attacks With Mimikatz', url: 'https://blog.stealthbits.com/passing-the-hash-with-mimikatz' },
          { title: 'Pass-the-Hash Is Dead: Long Live LocalAccountTokenFilterPolicy', url: 'https://www.harmj0y.net/blog/redteaming/pass-the-hash-is-dead-long-live-localaccounttokenfilterpolicy/' }
        ]
      },
      {
        name: 'SQL Server DB Links',
        description: { zh: '利用 SQL Server 資料庫連結進行橫向移動', en: 'Leverage SQL Server database links for lateral movement', ja: 'SQL Server のデータベースリンクを利用して横方向に移動する' },
        tools: ['PowerUpSQL'],
        resources: [
          { title: 'SQL Server – Link… Link… Link… and Shell', url: 'https://blog.netspi.com/how-to-hack-database-links-in-sql-server/' },
          { title: 'SQL Server Link Crawling with PowerUpSQL', url: 'https://blog.netspi.com/sql-server-link-crawling-powerupsql/' }
        ]
      },
      {
        name: 'SCCM Abuse',
        description: { zh: '利用 System Center Configuration Manager 進行橫向移動', en: 'Leverage System Center Configuration Manager for lateral movement', ja: 'System Center Configuration Manager を利用して横方向に移動する' },
        tools: ['PowerSCCM'],
        resources: [
          { title: 'Targeted Workstation Compromise With Sccm', url: 'https://enigma0x3.net/2015/10/27/targeted-workstation-compromise-with-sccm/' }
        ]
      },
      {
        name: 'WSUS Exploitation',
        description: { zh: '利用 Windows Server Update Services 進行 MITM 攻擊', en: 'Leverage Windows Server Update Services for MITM attacks', ja: 'Windows Server Update Services を利用して MITM 攻撃を行う' },
        tools: ['WSUSpendu'],
        resources: [
          { title: 'Remote Weaponization of WSUS MITM', url: 'https://www.sixdub.net/?p=623' },
          { title: 'Leveraging WSUS – Part One', url: 'https://ijustwannared.team/2018/10/15/leveraging-wsus-part-one/' }
        ]
      },
      {
        name: 'Password Spraying',
        description: { zh: '對大量帳戶嘗試少數常見密碼', en: 'Attempt a small number of common passwords against a large number of accounts', ja: '多数のアカウントに対して少数の一般的なパスワードを試行する' },
        tools: ['DomainPasswordSpray', 'SprayingToolkit', 'MailSniper'],
        resources: [
          { title: 'Password Spraying Windows Active Directory Accounts', url: 'https://www.youtube.com/watch?v=xB26QhnL64c' },
          { title: 'Attacking Exchange with MailSniper', url: 'https://www.blackhillsinfosec.com/attacking-exchange-with-mailsniper/' }
        ]
      },
      {
        name: 'Pass-the-Ticket (PTT)',
        description: { zh: '注入竊取的 Kerberos 票據，以合法使用者身份進行認證，無需知道其密碼', en: 'Inject stolen Kerberos tickets to authenticate as a legitimate user without knowing their password', ja: '盗んだ Kerberos チケットを注入して、パスワードを知らずに正規ユーザーとして認証する' },
        tools: ['Rubeus', 'Mimikatz'],
        resources: [
          { title: 'Rubeus – Pass-the-Ticket', url: 'https://github.com/GhostPack/Rubeus#ptt' },
          { title: 'Pass The Ticket Attack', url: 'https://www.hackingarticles.in/lateral-movement-pass-the-ticket-attack/' }
        ]
      },
      {
        name: 'Over-Pass-the-Hash (Pass-the-Key)',
        description: { zh: '使用 NTLM 雜湊值申請 Kerberos TGT，將 NTLM 憑證轉換為 Kerberos 認證流程以規避偵測', en: 'Use an NTLM hash to request a Kerberos TGT, converting NTLM credentials into the Kerberos authentication flow to evade detection', ja: 'NTLM ハッシュを使って Kerberos TGT をリクエストし、NTLM 認証情報を Kerberos 認証フローに変換して検知を回避する' },
        tools: ['Rubeus', 'Mimikatz', 'Impacket'],
        resources: [
          { title: 'Overpass the Hash / Pass the Key (PTK)', url: 'https://www.hackingarticles.in/lateral-movement-over-pass-the-hash/' },
          { title: 'Mimikatz Pass-the-Key', url: 'https://blog.gentilkiwi.com/securite/mimikatz/pass-the-ticket-kerberos' }
        ]
      }
    ]
  },
  {
    id: 'credential-dumping',
    name: 'Credential Dumping',
    icon: 'bi-key',
    color: '#79c0ff',
    mitre: 'TA0006',
    description: { zh: '從系統記憶體或資料庫中竊取憑證', en: 'Extract credentials from system memory or databases', ja: 'システムメモリやデータベースから認証情報を窃取する' },
    techniques: [
      {
        name: 'Kerberoasting',
        description: { zh: '請求服務 TGS Ticket 並離線破解服務帳戶密碼', en: 'Request service TGS tickets and crack service account passwords offline', ja: 'サービス TGS チケットをリクエストし、サービスアカウントのパスワードをオフラインで解析する' },
        tools: ['Rubeus', 'Impacket', 'PowerView'],
        resources: [
          { title: 'Kerberoasting Without Mimikatz', url: 'https://www.harmj0y.net/blog/powershell/kerberoasting-without-mimikatz/' },
          { title: 'Cracking Kerberos TGS Tickets Using Kerberoast', url: 'https://adsecurity.org/?p=2293' },
          { title: 'DerbyCon 2019 - Kerberoasting Revisited', url: 'https://www.slideshare.net/harmj0y/derbycon-2019-kerberoasting-revisited' }
        ]
      },
      {
        name: 'AS-REP Roasting',
        description: { zh: '針對不需要預身份驗證的帳戶，請求 AS-REP 並離線破解', en: 'Request AS-REP responses for accounts that do not require pre-authentication and crack them offline', ja: '事前認証が不要なアカウントの AS-REP をリクエストし、オフラインで解析する' },
        tools: ['Rubeus', 'Impacket'],
        resources: [
          { title: 'Roasting AS-REPs', url: 'http://www.harmj0y.net/blog/activedirectory/roasting-as-reps/' }
        ]
      },
      {
        name: 'DCSync',
        description: { zh: '模擬 DC 複寫，從 DC 拉取密碼雜湊值', en: 'Simulate DC replication to pull password hashes from a Domain Controller', ja: 'DC の複製を模倣して、ドメインコントローラーからパスワードハッシュを取得する' },
        tools: ['Mimikatz', 'Impacket'],
        resources: [
          { title: 'Mimikatz DCSync Usage, Exploitation, and Detection', url: 'https://adsecurity.org/?p=1729' },
          { title: 'Dump Clear-Text Passwords for All Admins in the Domain Using Mimikatz DCSync', url: 'https://adsecurity.org/?p=2053' }
        ]
      },
      {
        name: 'NTDS.DIT Extraction',
        description: { zh: '直接從 DC 提取 AD 資料庫', en: 'Directly extract the Active Directory database from a Domain Controller', ja: 'ドメインコントローラーから Active Directory データベースを直接抽出する' },
        tools: ['Impacket', 'ntdsutil'],
        resources: [
          { title: 'How Attackers Pull the Active Directory Database (NTDS.dit)', url: 'https://adsecurity.org/?p=451' },
          { title: 'Extracting Password Hashes From The Ntds.dit File', url: 'https://blog.stealthbits.com/extracting-password-hashes-from-the-ntds-dit-file/' }
        ]
      },
      {
        name: 'LLMNR/NBT-NS Poisoning',
        description: { zh: '毒化 LLMNR/NBT-NS 回應，擷取 NTLM 雜湊值', en: 'Poison LLMNR/NBT-NS responses to capture NTLM hashes', ja: 'LLMNR/NBT-NS の応答を毒化して NTLM ハッシュを取得する' },
        tools: ['Responder'],
        resources: [
          { title: 'LLMNR/NBT-NS Poisoning Using Responder', url: 'https://www.4armed.com/blog/llmnr-nbtns-poisoning-using-responder/' }
        ]
      },
      {
        name: 'DPAPI Credential Theft',
        description: { zh: '利用 DPAPI 解密 Windows 儲存的憑證、瀏覽器密碼、WiFi 金鑰及 RDP 連線記錄', en: 'Leverage DPAPI to decrypt Windows-stored credentials, browser passwords, WiFi keys, and RDP connection records', ja: 'DPAPI を利用して Windows が保存した認証情報・ブラウザパスワード・WiFi キー・RDP 接続記録を復号する' },
        tools: ['Mimikatz', 'SharpDPAPI', 'Impacket'],
        resources: [
          { title: 'Operational Guidance for Offensive User DPAPI Abuse', url: 'https://posts.specterops.io/operational-guidance-for-offensive-user-dpapi-abuse-1fb7fac8b107' },
          { title: 'SharpDPAPI GitHub', url: 'https://github.com/GhostPack/SharpDPAPI' }
        ]
      },
      {
        name: 'Cached Domain Credentials (DCC2)',
        description: { zh: '從 LSA 機密提取並離線破解 Windows 快取的網域登入憑證（Domain Cached Credentials v2）', en: 'Extract and offline-crack Windows cached domain login credentials (Domain Cached Credentials v2) from LSA secrets', ja: 'LSA シークレットから Windows がキャッシュしたドメインログイン認証情報（DCC2）を抽出してオフラインで解析する' },
        tools: ['Mimikatz', 'CrackMapExec', 'hashcat'],
        resources: [
          { title: 'Domain Cached Credentials (MITRE T1003.005)', url: 'https://attack.mitre.org/techniques/T1003/005/' },
          { title: 'Dumping and Cracking mscash – Cached Domain Credentials', url: 'https://www.ired.team/offensive-security/credential-access-and-credential-dumping/dumping-and-cracking-mscash-cached-domain-credentials' }
        ]
      }
    ]
  },
  {
    id: 'persistence',
    name: 'Persistence',
    icon: 'bi-lock',
    color: '#f0883e',
    mitre: 'TA0003',
    description: { zh: '在 AD 環境中建立長期存取後門', en: 'Establish long-term backdoor access in the AD environment', ja: 'AD 環境に長期的なバックドアアクセスを確立する' },
    techniques: [
      {
        name: 'Golden Ticket',
        description: { zh: '偽造 Kerberos TGT，使用 KRBTGT 帳戶雜湊值建立持久存取', en: 'Forge Kerberos TGTs using the KRBTGT account hash to establish persistent access', ja: 'KRBTGT アカウントのハッシュを使用して Kerberos TGT を偽造し、持続的なアクセスを確立する' },
        tools: ['Mimikatz', 'Rubeus', 'Impacket'],
        resources: [
          { title: 'Golden Ticket', url: 'https://pentestlab.blog/2018/04/09/golden-ticket/' },
          { title: 'Kerberos Golden Tickets are Now More Golden', url: 'https://adsecurity.org/?p=1640' }
        ]
      },
      {
        name: 'Silver Ticket',
        description: { zh: '偽造 Kerberos TGS，針對特定服務建立後門存取', en: 'Forge Kerberos TGS tickets to gain backdoor access to specific services', ja: 'Kerberos TGS チケットを偽造して特定のサービスへのバックドアアクセスを確立する' },
        tools: ['Mimikatz', 'Impacket'],
        resources: [
          { title: 'How Attackers Use Kerberos Silver Tickets to Exploit Systems', url: 'https://adsecurity.org/?p=2011' }
        ]
      },
      {
        name: 'Diamond Ticket',
        description: { zh: '修改合法 TGT 而非偽造，較難偵測的 Golden Ticket 變體', en: 'Modify a legitimate TGT rather than forging one — a harder-to-detect variant of the Golden Ticket', ja: '偽造ではなく正規の TGT を改ざんする、Golden Ticket の検知回避変種' },
        tools: ['Rubeus'],
        resources: [
          { title: 'A Diamond (Ticket) in the Ruff', url: 'https://www.semperis.com/blog/a-diamond-ticket-in-the-ruff/' }
        ]
      },
      {
        name: 'Skeleton Key',
        description: { zh: '在 DC 上植入 Skeleton Key，允許以任意密碼登入任何帳戶', en: 'Implant a Skeleton Key on a DC to allow any account to be accessed with an arbitrary password', ja: 'DC に Skeleton Key を植え付け、任意のパスワードで任意のアカウントにログインできるようにする' },
        tools: ['Mimikatz'],
        resources: [
          { title: 'Skeleton Key', url: 'https://pentestlab.blog/2018/04/10/skeleton-key/' },
          { title: 'Unlocking All The Doors To Active Directory With The Skeleton Key Attack', url: 'https://blog.stealthbits.com/unlocking-all-the-doors-to-active-directory-with-the-skeleton-key-attack/' }
        ]
      },
      {
        name: 'AdminSDHolder Backdoor',
        description: { zh: '修改 AdminSDHolder ACL，建立隱藏的持久管理員存取', en: 'Modify AdminSDHolder ACL to create hidden persistent administrator access', ja: 'AdminSDHolder ACL を変更して、隠れた持続的な管理者アクセスを確立する' },
        tools: ['PowerView', 'RACE'],
        resources: [
          { title: 'Leverage AdminSDHolder & SDProp to (Re)Gain Domain Admin Rights', url: 'https://adsecurity.org/?p=1906' },
          { title: 'Persistence Using Adminsdholder And Sdprop', url: 'https://blog.stealthbits.com/persistence-using-adminsdholder-and-sdprop/' }
        ]
      },
      {
        name: 'SID History Abuse',
        description: { zh: '在帳戶 SID History 屬性中植入高權限 SID', en: "Inject a high-privilege SID into an account's SID History attribute", ja: 'アカウントの SID History 属性に高権限の SID を注入する' },
        tools: ['Mimikatz'],
        resources: [
          { title: 'Sneaky Active Directory Persistence #14: SID History', url: 'https://adsecurity.org/?p=1772' }
        ]
      },
      {
        name: 'DSRM Persistence',
        description: { zh: '利用 Directory Services Restore Mode 帳戶建立後門', en: 'Establish a backdoor using the Directory Services Restore Mode account', ja: 'Directory Services Restore Mode アカウントを利用してバックドアを確立する' },
        tools: [],
        resources: [
          { title: 'Sneaky Active Directory Persistence #11: DSRM', url: 'https://adsecurity.org/?p=1714' },
          { title: 'Sneaky Active Directory Persistence #13: DSRM Persistence v2', url: 'https://adsecurity.org/?p=1785' }
        ]
      },
      {
        name: 'Machine Account Backdoor (RBCD)',
        description: { zh: '建立受控機器帳戶並設定 Resource-Based Constrained Delegation，以持久性後門方式委派任意服務票據', en: 'Create a controlled machine account and configure Resource-Based Constrained Delegation to persistently delegate arbitrary service tickets', ja: '管理下のマシンアカウントを作成し、リソースベースの制約付き委任を設定して任意のサービスチケットを永続的に委任する' },
        tools: ['Rubeus', 'Impacket', 'Powermad'],
        resources: [
          { title: 'Wagging the Dog: Abusing Resource-Based Constrained Delegation', url: 'https://shenaniganslabs.io/2019/01/28/Wagging-the-Dog.html' },
          { title: 'RBCD Persistence', url: 'https://www.ired.team/offensive-security-experiments/active-directory-kerberos-abuse/resource-based-constrained-delegation-ad-computer-object-take-over-and-privilged-access' }
        ]
      },
      {
        name: 'ACL Backdoor (GenericAll / WriteDACL)',
        description: { zh: '在 AD 物件 ACL 上植入隱藏後門權限（GenericAll、WriteDACL 等），確保在密碼重設後仍可持續存取', en: 'Plant hidden backdoor permissions (GenericAll, WriteDACL, etc.) in AD object ACLs to maintain persistent access even after password resets', ja: 'AD オブジェクトの ACL に隠れたバックドア権限（GenericAll・WriteDACL など）を植え付け、パスワードリセット後も持続的なアクセスを確保する' },
        tools: ['PowerView', 'RACE', 'Impacket'],
        resources: [
          { title: 'Backdooring Active Directory ACLs / DACLs', url: 'https://www.ired.team/offensive-security-experiments/active-directory-kerberos-abuse/backdooring-ad-acls-dacls' },
          { title: 'Sneaky Active Directory Persistence Using Security Descriptors', url: 'https://adsecurity.org/?p=3032' }
        ]
      }
    ]
  }
];

const CVES = [
  {
    id: 'CVE-2021-42287',
    name: 'sAMAccountName Spoofing',
    severity: 'high',
    year: 2021,
    description: { zh: '允許標準網域使用者透過電腦帳戶冒充 DC，以 S4U2Self 取得域管理員 ST', en: 'Allows standard domain users to impersonate a DC via a computer account and obtain a Domain Admin service ticket via S4U2Self', ja: '標準ドメインユーザーがコンピューターアカウントを介して DC を偽装し、S4U2Self でドメイン管理者のサービスチケットを取得できる' },
    category: 'Privilege Escalation',
    url: 'https://exploit.ph/cve-2021-42287-cve-2021-42278-weaponisation.html',
    tools: ['sam-the-admin', 'noPac']
  },
  {
    id: 'CVE-2021-42278',
    name: 'Computer Account Name Spoofing',
    severity: 'high',
    year: 2021,
    description: { zh: '允許電腦帳戶名稱不以 $ 結尾，配合 CVE-2021-42287 提升至域管理員', en: 'Allows computer account names to omit the trailing $, enabling privilege escalation to Domain Admin when combined with CVE-2021-42287', ja: 'コンピューターアカウント名の末尾の $ を省略でき、CVE-2021-42287 と組み合わせてドメイン管理者権限に昇格できる' },
    category: 'Privilege Escalation',
    url: 'https://exploit.ph/cve-2021-42287-cve-2021-42278-weaponisation.html',
    tools: ['sam-the-admin', 'noPac']
  },
  {
    id: 'CVE-2021-36942',
    name: 'PetitPotam',
    severity: 'critical',
    year: 2021,
    description: { zh: '利用 MS-EFSRPC 強制 DC 向攻擊者進行 NTLM 認證，可中繼至 AD CS', en: 'Uses MS-EFSRPC to coerce a DC into performing NTLM authentication to the attacker, which can then be relayed to AD CS', ja: 'MS-EFSRPC を使用して DC に攻撃者への NTLM 認証を強制し、AD CS にリレーすることができる' },
    category: 'Privilege Escalation',
    url: 'https://github.com/topotam/PetitPotam',
    tools: ['PetitPotam']
  },
  {
    id: 'CVE-2020-1472',
    name: 'Zerologon',
    severity: 'critical',
    year: 2020,
    description: { zh: 'Netlogon 加密弱點，允許未認證攻擊者建立安全通道連線，重設 DC 電腦帳戶密碼', en: 'Netlogon encryption weakness allowing an unauthenticated attacker to establish a secure channel and reset the DC computer account password', ja: 'Netlogon の暗号化の脆弱性により、未認証の攻撃者がセキュアチャネルを確立し、DC のコンピューターアカウントパスワードをリセットできる' },
    category: 'Privilege Escalation',
    url: 'https://www.secura.com/blog/zero-logon',
    tools: ['Impacket']
  },
  {
    id: 'CVE-2020-17049',
    name: 'Kerberos Bronze Bit',
    severity: 'high',
    year: 2020,
    description: { zh: '允許攻擊者繞過 Kerberos 委派保護，偽造可轉發 TGS 票據', en: 'Allows an attacker to bypass Kerberos delegation protections and forge forwardable TGS tickets', ja: '攻撃者が Kerberos 委任の保護をバイパスして転送可能な TGS チケットを偽造できる' },
    category: 'Privilege Escalation',
    url: 'https://blog.netspi.com/cve-2020-17049-kerberos-bronze-bit-overview/',
    tools: ['Rubeus']
  },
  {
    id: 'CVE-2019-1040',
    name: 'NTLM MIC Bypass',
    severity: 'high',
    year: 2019,
    description: { zh: 'NTLM MIC（Message Integrity Check）保護被繞過，允許 NTLM 中繼攻擊', en: 'NTLM Message Integrity Check (MIC) protection is bypassed, enabling NTLM relay attacks', ja: 'NTLM メッセージ整合性チェック（MIC）の保護がバイパスされ、NTLM リレー攻撃が可能になる' },
    category: 'Lateral Movement',
    url: 'https://portal.msrc.microsoft.com/en-US/security-guidance/advisory/CVE-2019-1040',
    tools: ['Impacket']
  },
  {
    id: 'CVE-2019-0683',
    name: 'AD Trust Elevation',
    severity: 'high',
    year: 2019,
    description: { zh: '信任森林的 TGT 委派預設設定允許跨森林票據偽造', en: 'Default TGT delegation settings in trusted forests allow cross-forest ticket forgery', ja: '信頼フォレストの TGT 委任のデフォルト設定により、フォレスト間のチケット偽造が可能' },
    category: 'Privilege Escalation',
    url: 'https://portal.msrc.microsoft.com/en-US/security-guidance/advisory/CVE-2019-0683',
    tools: []
  },
  {
    id: 'CVE-2019-0708',
    name: 'BlueKeep (RDP RCE)',
    severity: 'critical',
    year: 2019,
    description: { zh: 'Remote Desktop Services 遠端程式碼執行漏洞，無需認證即可攻擊', en: 'Remote Desktop Services remote code execution vulnerability exploitable without authentication', ja: '認証なしに悪用可能な Remote Desktop Services のリモートコード実行の脆弱性' },
    category: 'Initial Access',
    url: 'https://portal.msrc.microsoft.com/en-US/security-guidance/advisory/CVE-2019-0708',
    tools: []
  },
  {
    id: 'CVE-2018-8581',
    name: 'Exchange EoP',
    severity: 'high',
    year: 2018,
    description: { zh: 'Exchange Server 權限提升漏洞，可中繼到 DC 並取得域管理員', en: 'Exchange Server privilege escalation vulnerability that can be relayed to a DC to obtain Domain Admin', ja: 'Exchange Server の権限昇格の脆弱性で、DC にリレーしてドメイン管理者権限を取得できる' },
    category: 'Privilege Escalation',
    url: 'https://portal.msrc.microsoft.com/en-US/security-guidance/advisory/CVE-2018-8518',
    tools: ['NtlmRelayToEWS']
  },
  {
    id: 'CVE-2017-0143',
    name: 'EternalBlue (SMB)',
    severity: 'critical',
    year: 2017,
    description: { zh: 'SMBv1 遠端程式碼執行漏洞，由 WannaCry 和 NotPetya 廣泛利用', en: 'SMBv1 remote code execution vulnerability widely exploited by WannaCry and NotPetya', ja: 'WannaCry と NotPetya に広く悪用された SMBv1 リモートコード実行の脆弱性' },
    category: 'Lateral Movement',
    url: 'https://portal.msrc.microsoft.com/en-US/security-guidance/advisory/CVE-2017-0143',
    tools: []
  },
  {
    id: 'CVE-2016-0128',
    name: 'BADLOCK (SAM/LSAD)',
    severity: 'high',
    year: 2016,
    description: { zh: 'SAM 和 LSAD 協定實作允許 MITM 攻擊者降級 RPC 通道', en: 'SAM and LSAD protocol implementations allow a MITM attacker to downgrade the RPC channel', ja: 'SAM および LSAD プロトコルの実装により、MITM 攻撃者が RPC チャネルをダウングレードできる' },
    category: 'Credential Dumping',
    url: 'https://portal.msrc.microsoft.com/en-US/security-guidance/advisory/CVE-2016-0128',
    tools: []
  },
  {
    id: 'CVE-2014-6324',
    name: 'MS14-068 (Kerberos)',
    severity: 'critical',
    year: 2014,
    description: { zh: 'Kerberos KDC 驗證弱點，允許一般使用者取得域管理員 Kerberos 票據', en: 'Kerberos KDC validation flaw that allows a standard user to obtain Domain Admin Kerberos tickets', ja: 'Kerberos KDC の検証の脆弱性により、一般ユーザーがドメイン管理者の Kerberos チケットを取得できる' },
    category: 'Privilege Escalation',
    url: 'https://docs.microsoft.com/en-us/security-updates/securitybulletins/2014/ms14-068',
    tools: []
  },
  {
    id: 'CVE-2014-1812',
    name: 'GPP Password (MS14-025)',
    severity: 'high',
    year: 2014,
    description: { zh: 'Group Policy Preferences 使用可逆加密儲存密碼，任何網域使用者均可讀取', en: 'Group Policy Preferences stores passwords with reversible encryption, readable by any domain user', ja: 'グループポリシーの設定が可逆暗号化でパスワードを保存しており、任意のドメインユーザーが読み取れる' },
    category: 'Credential Dumping',
    url: 'https://support.microsoft.com/en-us/help/2962486/ms14-025-vulnerability-in-group-policy-preferences-could-allow-elevati',
    tools: ['PowerView']
  },
  {
    id: 'CVE-2022-26923',
    name: 'Certifried (AD CS EoP)',
    severity: 'critical',
    year: 2022,
    description: { zh: '普通使用者可修改電腦帳戶 dNSHostName 屬性造成名稱碰撞，從 AD CS 取得域管理員憑證', en: 'Standard users can modify the dNSHostName attribute of computer accounts to cause name collisions, obtaining Domain Admin certificates from AD CS', ja: '一般ユーザーがコンピューターアカウントの dNSHostName 属性を変更して名前衝突を起こし、AD CS からドメイン管理者証明書を取得できる' },
    category: 'Privilege Escalation',
    url: 'https://msrc.microsoft.com/update-guide/vulnerability/CVE-2022-26923',
    tools: ['Certipy', 'Certify']
  },
  {
    id: 'CVE-2021-34527',
    name: 'PrintNightmare (Windows Print Spooler)',
    severity: 'critical',
    year: 2021,
    description: { zh: 'Windows Print Spooler 遠端程式碼執行漏洞，允許遠端攻擊者以 SYSTEM 權限執行任意程式碼，廣泛用於網域提權', en: 'Windows Print Spooler remote code execution vulnerability allowing remote attackers to run arbitrary code as SYSTEM, widely exploited for domain privilege escalation', ja: 'Windows Print Spooler のリモートコード実行の脆弱性。リモート攻撃者が SYSTEM 権限で任意のコードを実行でき、ドメイン権限昇格に広く悪用された' },
    category: 'Privilege Escalation',
    url: 'https://msrc.microsoft.com/update-guide/vulnerability/CVE-2021-34527',
    tools: ['Impacket', 'SharpPrintNightmare']
  }
];

const DETECTION_EVENTS = [
  {
    attack: 'Account & Group Enumeration',
    category: 'discovery',
    eventIds: ['4798', '4799'],
    descriptions: [
      { zh: '4798: 使用者的本機群組成員資格已被列舉', en: "4798: A user's local group membership was enumerated", ja: '4798: ユーザーのローカルグループメンバーシップが列挙された' },
      { zh: '4799: 已啟用安全性的本機群組成員資格已被列舉', en: '4799: A security-enabled local group membership was enumerated', ja: '4799: セキュリティが有効なローカルグループのメンバーシップが列挙された' }
    ]
  },
  {
    attack: 'AdminSDHolder Modification',
    category: 'persistence',
    eventIds: ['4780'],
    descriptions: [
      { zh: '4780: ACL 已在管理員群組成員帳戶上設定', en: '4780: ACL was set on accounts that are members of administrators groups', ja: '4780: 管理者グループメンバーのアカウントに ACL が設定された' }
    ]
  },
  {
    attack: 'Golden Ticket',
    category: 'persistence',
    eventIds: ['4624', '4672'],
    descriptions: [
      { zh: '4624: 帳戶登入成功', en: '4624: An account was successfully logged on', ja: '4624: アカウントのログオンに成功した' },
      { zh: '4672: 管理員登入（特殊權限）', en: '4672: Special privileges assigned to new logon', ja: '4672: 新しいログオンに特権が割り当てられた' }
    ]
  },
  {
    attack: 'Silver Ticket',
    category: 'persistence',
    eventIds: ['4624', '4634', '4672'],
    descriptions: [
      { zh: '4624: 帳戶登入成功', en: '4624: An account was successfully logged on', ja: '4624: アカウントのログオンに成功した' },
      { zh: '4634: 帳戶登出', en: '4634: An account was logged off', ja: '4634: アカウントがログオフした' },
      { zh: '4672: 管理員登入', en: '4672: Special privileges assigned to new logon', ja: '4672: 新しいログオンに特権が割り当てられた' }
    ]
  },
  {
    attack: 'Kerberoasting',
    category: 'credential-dumping',
    eventIds: ['4769'],
    descriptions: [
      { zh: '4769: Kerberos 服務票據已請求（加密類型 0x17 = RC4）', en: '4769: A Kerberos service ticket was requested (encryption type 0x17 = RC4)', ja: '4769: Kerberos サービスチケットがリクエストされた（暗号化タイプ 0x17 = RC4）' }
    ]
  },
  {
    attack: 'AS-REP Roasting',
    category: 'credential-dumping',
    eventIds: ['4768'],
    descriptions: [
      { zh: '4768: Kerberos TGT 已請求（預先驗證失敗）', en: '4768: A Kerberos TGT was requested (pre-authentication failed)', ja: '4768: Kerberos TGT がリクエストされた（事前認証失敗）' }
    ]
  },
  {
    attack: 'DCSync',
    category: 'credential-dumping',
    eventIds: ['4662'],
    descriptions: [
      { zh: '4662: 已對物件執行作業（DS-Replication-Get-Changes）', en: '4662: An operation was performed on an object (DS-Replication-Get-Changes)', ja: '4662: オブジェクトに対して操作が実行された（DS-Replication-Get-Changes）' }
    ]
  },
  {
    attack: 'DCShadow',
    category: 'privilege-escalation',
    eventIds: ['4742', '5137', '5141', '4929'],
    descriptions: [
      { zh: '4742: 電腦帳戶已變更', en: '4742: A computer account was changed', ja: '4742: コンピューターアカウントが変更された' },
      { zh: '5137: 目錄服務物件已建立', en: '5137: A directory service object was created', ja: '5137: ディレクトリサービスオブジェクトが作成された' },
      { zh: '5141: 目錄服務物件已刪除', en: '5141: A directory service object was deleted', ja: '5141: ディレクトリサービスオブジェクトが削除された' },
      { zh: '4929: Active Directory 複本來源命名內容已移除', en: '4929: An Active Directory replica source naming context was removed', ja: '4929: Active Directory レプリカのソース名前付けコンテキストが削除された' }
    ]
  },
  {
    attack: 'Skeleton Key',
    category: 'persistence',
    eventIds: ['4673', '4611', '4688', '4689'],
    descriptions: [
      { zh: '4673: 已呼叫特殊權限服務', en: '4673: A privileged service was called', ja: '4673: 特権サービスが呼び出された' },
      { zh: '4611: 信任的登入程序已向 LSA 登錄', en: '4611: A trusted logon process has been registered with the Local Security Authority', ja: '4611: 信頼されたログオンプロセスがローカルセキュリティ機関に登録された' },
      { zh: '4688: 新程序已建立', en: '4688: A new process has been created', ja: '4688: 新しいプロセスが作成された' },
      { zh: '4689: 程序已結束', en: '4689: A process has exited', ja: '4689: プロセスが終了した' }
    ]
  },
  {
    attack: 'Lateral Movement',
    category: 'lateral-movement',
    eventIds: ['4688', '4689', '4624', '4625'],
    descriptions: [
      { zh: '4688: 新程序已建立', en: '4688: A new process has been created', ja: '4688: 新しいプロセスが作成された' },
      { zh: '4689: 程序已結束', en: '4689: A process has exited', ja: '4689: プロセスが終了した' },
      { zh: '4624: 帳戶登入成功', en: '4624: An account was successfully logged on', ja: '4624: アカウントのログオンに成功した' },
      { zh: '4625: 帳戶登入失敗', en: '4625: An account failed to log on', ja: '4625: アカウントのログオンに失敗した' }
    ]
  },
  {
    attack: 'Password Spraying',
    category: 'lateral-movement',
    eventIds: ['4625', '4771', '4648'],
    descriptions: [
      { zh: '4625: 帳戶登入失敗（大量失敗警示）', en: '4625: An account failed to log on (high-volume failure alert)', ja: '4625: アカウントのログオンに失敗した（大量失敗の警告）' },
      { zh: '4771: Kerberos 預先驗證失敗', en: '4771: Kerberos pre-authentication failed', ja: '4771: Kerberos 事前認証に失敗した' },
      { zh: '4648: 使用明確憑證嘗試登入', en: '4648: A logon was attempted using explicit credentials', ja: '4648: 明示的な資格情報を使用してログオンが試みられた' }
    ]
  },
  {
    attack: 'DNSAdmin DLL Load',
    category: 'privilege-escalation',
    eventIds: ['770', '541', '150'],
    descriptions: [
      { zh: '770: DNS 伺服器外掛程式 DLL 已載入', en: '770: DNS Server plug-in DLL has been loaded', ja: '770: DNS サーバープラグイン DLL が読み込まれた' },
      { zh: '541: 伺服器層級外掛程式 DLL 設定已變更', en: '541: Server-level plug-in DLL configuration has been changed', ja: '541: サーバーレベルのプラグイン DLL の設定が変更された' },
      { zh: '150: DNS 伺服器無法載入或初始化外掛程式 DLL', en: '150: DNS Server could not load or initialize the plug-in DLL', ja: '150: DNS サーバーがプラグイン DLL を読み込み・初期化できなかった' }
    ]
  },
  {
    attack: 'PowerShell Execution',
    category: 'defense-evasion',
    eventIds: ['4103', '4104', '400', '403', '600'],
    descriptions: [
      { zh: '4103: PowerShell 模組日誌', en: '4103: PowerShell module logging', ja: '4103: PowerShell モジュールログ' },
      { zh: '4104: PowerShell ScriptBlock 日誌', en: '4104: PowerShell ScriptBlock logging', ja: '4104: PowerShell ScriptBlock ログ' },
      { zh: '400: PowerShell 引擎生命週期', en: '400: PowerShell engine lifecycle', ja: '400: PowerShell エンジンのライフサイクル' },
      { zh: '403: PowerShell 引擎生命週期（已停止）', en: '403: PowerShell engine lifecycle (stopped)', ja: '403: PowerShell エンジンのライフサイクル（停止）' },
      { zh: '600: PowerShell 提供者生命週期', en: '600: PowerShell provider lifecycle', ja: '600: PowerShell プロバイダーのライフサイクル' }
    ]
  },
  {
    attack: 'MS14-068 (PYKEK)',
    category: 'privilege-escalation',
    eventIds: ['4672', '4624', '4768'],
    descriptions: [
      { zh: '4672: 管理員登入', en: '4672: Special privileges assigned to new logon', ja: '4672: 新しいログオンに特権が割り当てられた' },
      { zh: '4624: 帳戶登入', en: '4624: An account was successfully logged on', ja: '4624: アカウントのログオンに成功した' },
      { zh: '4768: Kerberos TGT 請求', en: '4768: A Kerberos TGT was requested', ja: '4768: Kerberos TGT がリクエストされた' }
    ]
  },
  {
    attack: 'Shadow Credentials',
    category: 'privilege-escalation',
    eventIds: ['5136', '4662'],
    descriptions: [
      { zh: '5136: 目錄服務物件已修改（注意 msDS-KeyCredentialLink 屬性的異常寫入）', en: '5136: A directory service object was modified (watch for unexpected writes to msDS-KeyCredentialLink)', ja: '5136: ディレクトリサービスオブジェクトが変更された（msDS-KeyCredentialLink への予期しない書き込みに注意）' },
      { zh: '4662: 已對物件執行操作（非 DC 帳戶對 msDS-KeyCredentialLink 的寫入操作為高風險）', en: '4662: An operation was performed on an object (writes to msDS-KeyCredentialLink by non-DC accounts are high risk)', ja: '4662: オブジェクトに対して操作が実行された（非 DC アカウントによる msDS-KeyCredentialLink への書き込みは高リスク）' }
    ]
  },
  {
    attack: 'PrintNightmare / Print Spooler Abuse',
    category: 'privilege-escalation',
    eventIds: ['7031', '7045', '316'],
    descriptions: [
      { zh: '7031: 服務意外終止（Print Spooler 頻繁崩潰可能是攻擊跡象）', en: '7031: A service terminated unexpectedly (frequent Print Spooler crashes may indicate an attack)', ja: '7031: サービスが予期せず終了した（Print Spooler の頻繁なクラッシュは攻撃を示す可能性がある）' },
      { zh: '7045: 系統安裝了新服務（Print Spooler DLL 注入安裝惡意驅動服務）', en: '7045: A new service was installed on the system (Print Spooler DLL injection for malicious driver/service installation)', ja: '7045: 新しいサービスがインストールされた（Print Spooler DLL インジェクションによる悪意のあるドライバー・サービスのインストール）' },
      { zh: '316: PrintService 操作日誌 – 新增印表機驅動程式（非預期的驅動程式安裝）', en: '316: PrintService operational log – adding a printer driver (unexpected driver installation)', ja: '316: PrintService 操作ログ – プリンタードライバーの追加（予期しないドライバーのインストール）' }
    ]
  },
  {
    attack: 'NTDS.DIT / VSS Shadow Copy Abuse',
    category: 'credential-dumping',
    eventIds: ['8222', '4688', '7036'],
    descriptions: [
      { zh: '8222: 磁碟區陰影複製已建立（VSS 事件，可能為 NTDS.DIT 竊取前置作業）', en: '8222: A volume shadow copy was created (VSS event; may indicate NTDS.DIT theft preparation)', ja: '8222: ボリュームシャドウコピーが作成された（VSS イベント、NTDS.DIT 窃取の前準備の可能性）' },
      { zh: '4688: ntdsutil.exe 或 vssadmin.exe 程序建立（非 DC 執行此程序屬異常行為）', en: '4688: ntdsutil.exe or vssadmin.exe process created (non-DC execution is suspicious)', ja: '4688: ntdsutil.exe または vssadmin.exe プロセスの作成（非 DC での実行は不審）' },
      { zh: '7036: VSS 服務狀態變更（生產環境中突然啟動 VSS 服務值得注意）', en: '7036: VSS service state change (sudden VSS service startup in a production environment is suspicious)', ja: '7036: VSS サービスの状態変化（本番環境での突然の VSS サービス起動に注意）' }
    ]
  },
  {
    attack: 'Pass-the-Ticket (PTT)',
    category: 'lateral-movement',
    eventIds: ['4768', '4769', '4624'],
    descriptions: [
      { zh: '4768: TGT 請求來自非 DC 且帳戶已在其他位置成功登入（票據注入跡象）', en: '4768: TGT request from non-DC while the account is already successfully logged on elsewhere (possible ticket injection)', ja: '4768: 非 DC からの TGT リクエストで、アカウントが他の場所で既にログオン成功している（チケット注入の可能性）' },
      { zh: '4769: 異常服務票據請求（加密類型與正常請求不符）', en: '4769: Anomalous service ticket request (encryption type inconsistent with normal requests)', ja: '4769: 異常なサービスチケットリクエスト（暗号化タイプが通常のリクエストと一致しない）' },
      { zh: '4624: 登入類型 3（網路登入）來自異常來源 IP 或時間', en: '4624: Logon type 3 (network logon) from an unusual source IP or time', ja: '4624: 異常な送信元 IP または時間帯からのログオンタイプ 3（ネットワークログオン）' }
    ]
  }
];

const TOOLS = [
  // Offensive Tools
  { name: 'BloodHound', type: 'offensive', url: 'https://github.com/BloodHoundAD/BloodHound', description: { zh: 'AD 攻擊路徑視覺化分析工具，使用圖論找出最短域管理員路徑', en: 'AD attack path visualization tool that uses graph theory to find the shortest path to Domain Admin', ja: 'グラフ理論を使って Domain Admin への最短経路を見つける AD 攻撃経路の可視化分析ツール' }, tags: ['AD', '圖論', '偵察', '路徑分析'] },
  { name: 'PowerView', type: 'offensive', url: 'https://github.com/PowerShellMafia/PowerSploit', description: { zh: 'PowerShell AD 情境感知框架，提供豐富的 AD 列舉函式', en: 'PowerShell AD situational awareness framework with rich AD enumeration functions', ja: '豊富な AD 列挙機能を提供する PowerShell AD 状況認識フレームワーク' }, tags: ['PowerShell', 'AD', '偵察', '列舉'] },
  { name: 'Mimikatz', type: 'offensive', url: 'https://github.com/gentilkiwi/mimikatz', description: { zh: '從 Windows 記憶體提取明文密碼、NTLM 雜湊值及 Kerberos 票據', en: 'Extract plaintext passwords, NTLM hashes, and Kerberos tickets from Windows memory', ja: 'Windows メモリから平文パスワード、NTLM ハッシュ、Kerberos チケットを抽出する' }, tags: ['憑證', 'Kerberos', 'NTLM', '記憶體'] },
  { name: 'Rubeus', type: 'offensive', url: 'https://github.com/GhostPack/Rubeus', description: { zh: 'C# Kerberos 互動與濫用工具集，支援 Kerberoast、AS-REP Roast、Pass-the-Ticket', en: 'C# Kerberos interaction and abuse toolkit supporting Kerberoast, AS-REP Roast, and Pass-the-Ticket', ja: 'Kerberoast、AS-REP Roast、Pass-the-Ticket をサポートする C# Kerberos 操作・悪用ツールキット' }, tags: ['Kerberos', 'C#', '票據', '偵察'] },
  { name: 'Impacket', type: 'offensive', url: 'https://github.com/SecureAuthCorp/impacket', description: { zh: 'Python 網路協定類別庫，支援 SMB、Kerberos、LDAP 等協定互動', en: 'Python network protocol library supporting SMB, Kerberos, LDAP, and other protocol interactions', ja: 'SMB、Kerberos、LDAP などのプロトコル操作をサポートする Python ネットワークプロトコルライブラリ' }, tags: ['Python', 'SMB', 'Kerberos', 'LDAP'] },
  { name: 'CrackMapExec', type: 'offensive', url: 'https://github.com/byt3bl33d3r/CrackMapExec', description: { zh: '網路滲透測試瑞士刀，支援 SMB、WinRM、LDAP 等協定大規模作業', en: 'Swiss Army knife for network penetration testing with SMB, WinRM, and LDAP mass operation support', ja: 'SMB、WinRM、LDAP などのプロトコルの大規模操作をサポートするネットワーク侵入テストの万能ツール' }, tags: ['SMB', 'WinRM', '橫向移動', '自動化'] },
  { name: 'Certify', type: 'offensive', url: 'https://github.com/GhostPack/Certify', description: { zh: 'C# AD CS 列舉與濫用工具，用於尋找和利用憑證服務錯誤設定', en: 'C# AD CS enumeration and abuse tool for finding and exploiting Certificate Services misconfigurations', ja: '証明書サービスの設定ミスを発見・悪用するための C# AD CS 列挙・悪用ツール' }, tags: ['AD CS', 'C#', '憑證', '權限提升'] },
  { name: 'PowerUpSQL', type: 'offensive', url: 'https://github.com/NetSPI/PowerUpSQL', description: { zh: '攻擊 SQL Server 的 PowerShell 工具集，支援提權與資料挖掘', en: 'PowerShell toolkit for attacking SQL Server, supporting privilege escalation and data mining', ja: '権限昇格とデータマイニングをサポートする SQL Server 攻撃用 PowerShell ツールキット' }, tags: ['SQL Server', 'PowerShell', '提權'] },
  { name: 'aclpwn.py', type: 'offensive', url: 'https://github.com/fox-it/aclpwn.py', description: { zh: '結合 BloodHound 自動化利用 AD ACL 錯誤設定', en: 'Automated AD ACL misconfiguration exploitation using BloodHound data', ja: 'BloodHound データを使用して AD ACL の設定ミスを自動的に悪用する' }, tags: ['ACL', 'BloodHound', '自動化', '提權'] },
  { name: 'ADACLScanner', type: 'offensive', url: 'https://github.com/canix1/ADACLScanner', description: { zh: '產生 AD DACL/SACL 報告的工具，支援 GUI 或命令列', en: 'Tool to generate AD DACL/SACL reports, supporting both GUI and command-line modes', ja: 'GUI またはコマンドラインで AD DACL/SACL レポートを生成するツール' }, tags: ['ACL', '稽核', '報告'] },
  { name: 'sam-the-admin', type: 'offensive', url: 'https://github.com/WazeHell/sam-the-admin', description: { zh: '利用 CVE-2021-42278 與 CVE-2021-42287 從標準使用者提升至域管理員', en: 'Exploit CVE-2021-42278 and CVE-2021-42287 to escalate from a standard user to Domain Admin', ja: 'CVE-2021-42278 と CVE-2021-42287 を悪用して標準ユーザーからドメイン管理者に昇格する' }, tags: ['CVE-2021-42278', 'CVE-2021-42287', '提權'] },
  { name: 'DomainPasswordSpray', type: 'offensive', url: 'https://github.com/mdavis332/DomainPasswordSpray', description: { zh: 'PowerShell 密碼噴灑工具，自動列舉使用者並控制鎖定風險', en: 'PowerShell password spraying tool that auto-enumerates users and controls lockout risk', ja: 'ユーザーを自動列挙してロックアウトリスクを制御する PowerShell パスワードスプレーツール' }, tags: ['密碼噴灑', 'PowerShell', 'AD'] },
  { name: 'MailSniper', type: 'offensive', url: 'https://github.com/dafthack/MailSniper', description: { zh: '在 Exchange 環境中搜尋敏感資訊的滲透測試工具', en: 'Penetration testing tool for searching sensitive information in Exchange environments', ja: 'Exchange 環境で機密情報を検索するための侵入テストツール' }, tags: ['Exchange', 'O365', '資料挖掘'] },
  { name: 'LAPSToolkit', type: 'offensive', url: 'https://github.com/leoloobeek/LAPSToolkit', description: { zh: 'LAPS 環境稽核與攻擊工具', en: 'LAPS environment auditing and attack tool', ja: 'LAPS 環境の監査・攻撃ツール' }, tags: ['LAPS', 'PowerShell', '提權'] },
  { name: 'Grouper', type: 'offensive', url: 'https://github.com/l0ss/Grouper', description: { zh: 'PowerShell 工具，尋找 AD 群組原則中的脆弱設定', en: 'PowerShell tool for finding vulnerable settings in AD Group Policies', ja: 'AD グループポリシー内の脆弱な設定を見つける PowerShell ツール' }, tags: ['GPO', 'PowerShell', '稽核'] },
  { name: 'SafetyKatz', type: 'offensive', url: 'https://github.com/GhostPack/SafetyKatz', description: { zh: 'Mimikatz 的改良版，使用 .NET PE 載入器執行，降低 AV 偵測率', en: 'Improved version of Mimikatz executed via .NET PE loader to reduce AV detection rate', ja: '.NET PE ローダーで実行して AV 検知率を下げた Mimikatz の改良版' }, tags: ['Mimikatz', 'C#', '規避', '憑證'] },
  { name: 'SharpDump', type: 'offensive', url: 'https://github.com/GhostPack/SharpDump', description: { zh: 'PowerSploit Out-Minidump 的 C# 版本，產生 LSASS 記憶體轉儲', en: "C# version of PowerSploit's Out-Minidump for generating LSASS memory dumps", ja: 'LSASS メモリダンプを生成する PowerSploit Out-Minidump の C# バージョン' }, tags: ['LSASS', 'C#', '憑證', '記憶體轉儲'] },
  { name: 'Powermad', type: 'offensive', url: 'https://github.com/Kevin-Robertson/Powermad', description: { zh: 'MachineAccountQuota 和 DNS 利用工具，用於 RBCD 攻擊', en: 'MachineAccountQuota and DNS exploitation tool used for RBCD attacks', ja: 'RBCD 攻撃に使用する MachineAccountQuota および DNS 悪用ツール' }, tags: ['MachineAccountQuota', 'DNS', 'RBCD', 'PowerShell'] },
  { name: 'ldapdomaindump', type: 'offensive', url: 'https://github.com/dirkjanm/ldapdomaindump', description: { zh: '透過 LDAP 轉儲 AD 資訊，輸出 JSON/HTML/CSV 格式', en: 'Dump AD information via LDAP with JSON/HTML/CSV output', ja: 'LDAP 経由で AD 情報をダンプし、JSON/HTML/CSV 形式で出力する' }, tags: ['LDAP', 'AD', '偵察', 'Python'] },
  { name: 'Whisker', type: 'offensive', url: 'https://github.com/eladshamir/Whisker', description: { zh: 'Shadow Credentials 攻擊工具，操控 msDS-KeyCredentialLink 屬性取得目標帳戶 TGT', en: 'Shadow Credentials attack tool that manipulates the msDS-KeyCredentialLink attribute to obtain a TGT for target accounts', ja: 'msDS-KeyCredentialLink 属性を操作してターゲットアカウントの TGT を取得する Shadow Credentials 攻撃ツール' }, tags: ['Shadow Credentials', 'Kerberos', 'C#', '提權'] },
  { name: 'Certipy', type: 'offensive', url: 'https://github.com/ly4k/Certipy', description: { zh: 'Python 工具，自動化枚舉與利用 AD CS 漏洞（Certifried、ESC1-8、Shadow Credentials）', en: 'Python tool for automated enumeration and exploitation of AD CS vulnerabilities (Certifried, ESC1–8, Shadow Credentials)', ja: 'AD CS の脆弱性（Certifried・ESC1〜8・Shadow Credentials）を自動列挙・悪用する Python ツール' }, tags: ['AD CS', 'Python', 'Certifried', '提權'] },
  { name: 'Coercer', type: 'offensive', url: 'https://github.com/p0dalirius/Coercer', description: { zh: '利用多種 Windows 協定（MS-EFSR、MS-FSRVP、MS-RPRN 等）強制伺服器向攻擊者進行 NTLM 認證', en: 'Force servers to perform NTLM authentication to the attacker using multiple Windows protocols (MS-EFSR, MS-FSRVP, MS-RPRN, etc.)', ja: '複数の Windows プロトコル（MS-EFSR・MS-FSRVP・MS-RPRN など）を使用してサーバーに攻撃者への NTLM 認証を強制する' }, tags: ['強制認證', 'NTLM', 'Python', 'Coercion'] },
  { name: 'netexec (nxc)', type: 'offensive', url: 'https://github.com/Pennyw0rth/NetExec', description: { zh: 'CrackMapExec 的現代化繼承版本，持續維護，支援 SMB、WinRM、RDP、LDAP、FTP 等協定的大規模作業', en: 'Actively maintained modern successor to CrackMapExec, supporting large-scale operations over SMB, WinRM, RDP, LDAP, FTP, and more', ja: 'SMB・WinRM・RDP・LDAP・FTP などの大規模操作をサポートする、積極的にメンテされる CrackMapExec の現代的な後継版' }, tags: ['SMB', 'WinRM', 'LDAP', '橫向移動'] },
  { name: 'SharpDPAPI', type: 'offensive', url: 'https://github.com/GhostPack/SharpDPAPI', description: { zh: 'C# DPAPI 攻擊工具，解密 Windows 儲存的憑證、瀏覽器密碼與憑證管理員', en: 'C# DPAPI attack tool for decrypting Windows-stored credentials, browser passwords, and credential manager entries', ja: 'Windows が保存した認証情報・ブラウザパスワード・資格情報マネージャーを復号する C# DPAPI 攻撃ツール' }, tags: ['DPAPI', 'C#', '憑證', 'GhostPack'] },
  // Defensive Tools
  { name: 'PingCastle', type: 'defensive', url: 'https://www.pingcastle.com/', description: { zh: '快速評估 AD 安全層級的工具，基於風險評估與成熟度框架產生評分報告', en: 'Tool for rapid AD security level assessment, generating scored reports based on risk assessment and maturity frameworks', ja: 'リスク評価と成熟度フレームワークに基づいてスコアレポートを生成する AD セキュリティレベルの迅速評価ツール' }, tags: ['稽核', '評估', '報告', '合規'] },
  { name: 'ADRecon', type: 'defensive', url: 'https://github.com/sense-of-security/ADRecon', description: { zh: '收集 AD 環境全面資訊並產生 Excel 報告，提供整體安全狀況視圖', en: 'Collect comprehensive AD environment information and generate Excel reports providing an overall security posture view', ja: 'AD 環境の包括的な情報を収集して Excel レポートを生成し、全体的なセキュリティ状況を提供する' }, tags: ['稽核', 'Excel', '報告', '偵察'] },
  { name: 'Locksmith', type: 'defensive', url: 'https://github.com/TrimarcJake/Locksmith', description: { zh: '尋找並修復 AD CS 常見錯誤設定的小型工具', en: 'Small tool to find and fix common AD CS misconfigurations', ja: 'AD CS の一般的な設定ミスを発見・修正する小型ツール' }, tags: ['AD CS', '修復', '稽核', '合規'] },
  { name: 'FalconHound', type: 'defensive', url: 'https://github.com/FalconForceTeam/FalconHound', description: { zh: '藍隊多功能工具，結合 BloodHound 自動化分析，整合 SIEM', en: 'Multi-purpose blue team tool that integrates BloodHound automated analysis with SIEM', ja: 'BloodHound 自動分析と SIEM を統合した、ブルーチーム向け多目的ツール' }, tags: ['BloodHound', '藍隊', 'SIEM', '自動化'] },
  { name: 'PlumHound', type: 'defensive', url: 'https://github.com/PlumHound/PlumHound', description: { zh: '藍隊/紫隊的 BloodHound 工具，自動化產生安全報告', en: 'BloodHound-powered tool for blue/purple teams that automates security report generation', ja: 'セキュリティレポート生成を自動化する、ブルー・パープルチーム向け BloodHound ツール' }, tags: ['BloodHound', '藍隊', '紫隊', '報告'] },
  { name: 'Sigma', type: 'defensive', url: 'https://github.com/Neo23x0/sigma/', description: { zh: 'SIEM 系統通用簽章格式，可轉換為 Splunk/ELK 等平台規則', en: 'Generic signature format for SIEM systems, convertible to rules for platforms like Splunk and ELK', ja: 'Splunk や ELK などのプラットフォームのルールに変換できる SIEM システム向けの汎用シグネチャ形式' }, tags: ['SIEM', '偵測規則', '標準化', '日誌'] },
  { name: 'Sysmon', type: 'defensive', url: 'https://docs.microsoft.com/en-us/sysinternals/downloads/sysmon', description: { zh: 'Windows 系統監控服務，記錄詳細的程序、網路、檔案系統活動', en: 'Windows system monitoring service that records detailed process, network, and file system activity', ja: 'プロセス・ネットワーク・ファイルシステムの詳細な活動を記録する Windows システム監視サービス' }, tags: ['監控', '日誌', '事件', 'Microsoft'] },
  { name: 'WatchAD', type: 'defensive', url: 'https://github.com/0Kee-Team/WatchAD', description: { zh: 'AD 安全入侵偵測系統，即時監控 AD 攻擊行為', en: 'AD security intrusion detection system for real-time monitoring of AD attack behaviors', ja: 'AD 攻撃行動をリアルタイムに監視する AD セキュリティ侵入検知システム' }, tags: ['IDS', '即時偵測', 'AD', '安全'] },
  { name: 'LogonTracer', type: 'defensive', url: 'https://github.com/JPCERTCC/LogonTracer', description: { zh: 'JPCERT 開發，視覺化分析 Windows 登入事件日誌，調查惡意登入', en: 'Developed by JPCERT; visually analyzes Windows logon event logs to investigate malicious logins', ja: 'JPCERT が開発した、Windows ログオンイベントログを視覚的に分析して悪意のあるログインを調査するツール' }, tags: ['登入分析', '視覺化', 'DFIR', '日誌'] },
  { name: 'DCSYNCMonitor', type: 'defensive', url: 'https://github.com/shellster/DCSYNCMonitor', description: { zh: '監控 DCSync 和 DCShadow 攻擊，產生自訂 Windows 事件', en: 'Monitor for DCSync and DCShadow attacks by generating custom Windows events', ja: 'カスタム Windows イベントを生成して DCSync および DCShadow 攻撃を監視する' }, tags: ['DCSync', 'DCShadow', '監控', '事件'] },
  { name: 'Deploy-Deception', type: 'defensive', url: 'https://github.com/samratashok/Deploy-Deception', description: { zh: 'PowerShell 模組，在 AD 中部署誘餌物件（蜜罐）', en: 'PowerShell module for deploying decoy objects (honeypots) in Active Directory', ja: 'Active Directory に囮オブジェクト（ハニーポット）を展開する PowerShell モジュール' }, tags: ['誘餌', 'HoneyToken', '偵測', 'PowerShell'] },
  { name: 'RiskySPN', type: 'defensive', url: 'https://github.com/cyberark/RiskySPN', description: { zh: '偵測和列舉與 SPN 關聯的高風險帳戶，評估 Kerberoast 風險', en: 'Detect and enumerate high-risk accounts associated with SPNs to assess Kerberoast risk', ja: 'SPN に関連する高リスクアカウントを検知・列挙して Kerberoast リスクを評価する' }, tags: ['SPN', 'Kerberoasting', '稽核', 'PowerShell'] },
  { name: 'ADTimeline', type: 'defensive', url: 'https://github.com/ANSSI-FR/ADTimeline', description: { zh: '基於 AD 複寫元資料產生時間軸，用於事件回應調查', en: 'Generate a timeline based on AD replication metadata for incident response investigations', ja: 'インシデント対応調査のために AD レプリケーションメタデータに基づいてタイムラインを生成する' }, tags: ['DFIR', '時間軸', 'AD', 'ANSSI'] },
  { name: 'SilkETW', type: 'defensive', url: 'https://github.com/fireeye/SilkETW', description: { zh: 'ETW（Event Tracing for Windows）的 C# 封裝，簡化 ETW 研究與監控', en: 'C# wrapper around ETW (Event Tracing for Windows) to simplify ETW research and monitoring', ja: 'ETW (Event Tracing for Windows) の研究と監視を簡素化する C# ラッパー' }, tags: ['ETW', 'C#', '監控', 'FireEye'] },
  { name: 'Microsoft Defender for Identity', type: 'defensive', url: 'https://learn.microsoft.com/en-us/defender-for-identity/', description: { zh: '微軟雲端原生 AD 威脅偵測方案，自動識別 Kerberoast、DCSync、Pass-the-Hash、Shadow Credentials 等攻擊行為', en: 'Microsoft cloud-native AD threat detection solution that automatically identifies Kerberoast, DCSync, Pass-the-Hash, Shadow Credentials, and other attacks', ja: 'Kerberoast・DCSync・Pass-the-Hash・Shadow Credentials などの攻撃を自動検知する Microsoft クラウドネイティブ AD 脅威検知ソリューション' }, tags: ['Microsoft', '雲端', '威脅偵測', 'UEBA'] },
  { name: 'Purple Knight', type: 'defensive', url: 'https://www.purple-knight.com/', description: { zh: 'Semperis 出品的免費 AD 安全評估工具，針對 Golden Ticket、DCSync、AdminSDHolder 等常見 AD 攻擊路徑產生評分報告', en: 'Free AD security assessment tool from Semperis that generates scored reports covering common AD attack paths including Golden Ticket, DCSync, and AdminSDHolder', ja: 'Golden Ticket・DCSync・AdminSDHolder などの一般的な AD 攻撃経路をカバーしたスコアレポートを生成する Semperis 製の無料 AD セキュリティ評価ツール' }, tags: ['稽核', '評估', '報告', 'Semperis'] },
  // Azure Tools
  { name: 'ROADtools', type: 'azure', url: 'https://github.com/dirkjanm/ROADtools', description: { zh: 'Azure AD 互動框架，支援列舉、資料收集與攻擊', en: 'Azure AD interaction framework supporting enumeration, data collection, and attacks', ja: '列挙・データ収集・攻撃をサポートする Azure AD 操作フレームワーク' }, tags: ['Azure AD', 'Python', '列舉', '互動'] },
  { name: 'AADInternals', type: 'azure', url: 'https://github.com/Gerenios/AADInternals', description: { zh: 'Azure AD 與 Office 365 管理 PowerShell 模組，支援攻防兩用', en: 'Azure AD and Office 365 management PowerShell module supporting both offensive and defensive use', ja: '攻撃・防御の両用途をサポートする Azure AD および Office 365 管理 PowerShell モジュール' }, tags: ['Azure AD', 'O365', 'PowerShell', '管理'] },
  { name: 'Stormspotter', type: 'azure', url: 'https://github.com/Azure/Stormspotter', description: { zh: '產生 Azure 訂閱資源攻擊圖，視覺化 Azure 安全狀況', en: 'Generate attack graphs for Azure subscription resources to visualize the Azure security posture', ja: 'Azure サブスクリプションリソースの攻撃グラフを生成して Azure のセキュリティ状況を可視化する' }, tags: ['Azure', '攻擊圖', '視覺化', 'Microsoft'] },
  { name: 'MicroBurst', type: 'azure', url: 'https://github.com/NetSPI/MicroBurst', description: { zh: 'Azure 服務發現、弱點稽核與後滲透 PowerShell 工具集', en: 'PowerShell toolkit for Azure service discovery, vulnerability auditing, and post-exploitation', ja: 'Azure サービス検出、脆弱性監査、ポストエクスプロイト向け PowerShell ツールキット' }, tags: ['Azure', 'PowerShell', '稽核', '後滲透'] }
];

const DEFENSE_CHECKLIST = [
  {
    category: { zh: '管理員憑證保護', en: 'Admin Credential Protection', ja: '管理者認証情報の保護' },
    priority: 'critical',
    items: [
      {
        text: { zh: '部署 LAPS 管理本機管理員密碼', en: 'Deploy LAPS to manage local administrator passwords', ja: 'LAPS を展開してローカル管理者パスワードを管理する' },
        detail: { zh: '避免使用相同本機管理員密碼導致橫向移動', en: 'Prevent lateral movement from shared local admin passwords', ja: '同一ローカル管理者パスワードによる横移動を防止する' },
        steps: [
          { type: 'cmd', text: '# 安裝 LAPS Schema 擴充（在 DC 以 Schema Admin 執行）\nImport-Module AdmPwd.PS\nUpdate-AdmPwdADSchema' },
          { type: 'cmd', text: '# 授予電腦帳戶自行回報密碼的權限\nSet-AdmPwdComputerSelfPermission -OrgUnit "OU=Workstations,DC=corp,DC=local"' },
          { type: 'cmd', text: '# 授予特定群組讀取 LAPS 密碼的權限\nSet-AdmPwdReadPasswordPermission -OrgUnit "OU=Workstations,DC=corp,DC=local" -AllowedPrincipals "CORP\\HelpDesk"' },
          { type: 'info', text: { zh: 'GPO 設定路徑：Computer Configuration → Administrative Templates → LAPS → Enable local admin password management → Enabled；Password Settings 設定長度 ≥ 15、複雜度開啟', en: 'GPO path: Computer Configuration → Administrative Templates → LAPS → Enable local admin password management → Enabled; set Password Settings length ≥ 15 and enable complexity', ja: 'GPO パス: コンピューターの構成 → 管理用テンプレート → LAPS → ローカル管理者パスワード管理を有効にする → 有効; パスワード設定で長さ ≥ 15、複雑さを有効に設定' } },
          { type: 'cmd', text: '# 驗證部署結果\nGet-ADComputer -Filter * -Properties ms-Mcs-AdmPwdExpirationTime | Where-Object { $_."ms-Mcs-AdmPwdExpirationTime" -ne $null }' }
        ]
      },
      {
        text: { zh: '啟用 RDP Restricted Admin Mode', en: 'Enable RDP Restricted Admin Mode', ja: 'RDP 制限付き管理者モードを有効にする' },
        detail: { zh: '防止憑證暴露在遠端系統', en: 'Prevent credentials from being exposed on remote systems', ja: 'リモートシステムへの認証情報の露出を防止する' },
        steps: [
          { type: 'cmd', text: '# 在目標系統啟用 Restricted Admin Mode\nreg add "HKLM\\System\\CurrentControlSet\\Control\\Lsa" /v DisableRestrictedAdmin /t REG_DWORD /d 0 /f' },
          { type: 'info', text: { zh: '使用 Restricted Admin 連線：mstsc /v:目標主機 /RestrictedAdmin', en: 'Connect using Restricted Admin: mstsc /v:<target_host> /RestrictedAdmin', ja: '制限付き管理者で接続: mstsc /v:ターゲットホスト /RestrictedAdmin' } },
          { type: 'info', text: { zh: 'GPO 強制啟用：Computer Configuration → Windows Settings → Security Settings → Local Policies → Security Options → "Require use of Restricted Admin Mode for Remote Desktop connections"', en: 'Force via GPO: Computer Configuration → Windows Settings → Security Settings → Local Policies → Security Options → "Require use of Restricted Admin Mode for Remote Desktop connections"', ja: 'GPO で強制: コンピューターの構成 → Windows の設定 → セキュリティ設定 → ローカルポリシー → セキュリティオプション → "リモートデスクトップ接続に制限付き管理者モードの使用を要求する"' } },
          { type: 'warn', text: { zh: '注意：Restricted Admin Mode 本身可能遭受 Pass-the-Hash 攻擊，應搭配 Protected Users 群組使用', en: 'Warning: Restricted Admin Mode itself may be vulnerable to Pass-the-Hash attacks; use in conjunction with the Protected Users group', ja: '注意: 制限付き管理者モード自体が Pass-the-Hash 攻撃に対して脆弱な場合があります。Protected Users グループと併用してください' } }
        ]
      },
      {
        text: { zh: '確保所有管理員帳戶設定「敏感且不可委派」', en: 'Ensure all admin accounts are set to "Account is sensitive and cannot be delegated"', ja: '全管理者アカウントに「アカウントは重要であり、委任できない」を設定する' },
        detail: { zh: '防止 Kerberos 委派攻擊', en: 'Prevent Kerberos delegation attacks', ja: 'Kerberos 委任攻撃を防止する' },
        steps: [
          { type: 'cmd', text: '# 批次設定 Domain Admins 成員為不可委派\nGet-ADGroupMember "Domain Admins" -Recursive | Where-Object { $_.objectClass -eq "user" } | Set-ADUser -AccountNotDelegated $true' },
          { type: 'cmd', text: '# 驗證設定結果\nGet-ADUser -Filter { AccountNotDelegated -ne $true } -SearchBase "OU=Admins,DC=corp,DC=local" | Select Name, AccountNotDelegated' },
          { type: 'info', text: { zh: 'GUI 設定：Active Directory Users and Computers → 帳戶屬性 → Account 頁籤 → 勾選 "Account is sensitive and cannot be delegated"', en: 'GUI setting: Active Directory Users and Computers → Account properties → Account tab → Check "Account is sensitive and cannot be delegated"', ja: 'GUI 設定: Active Directory ユーザーとコンピューター → アカウントのプロパティ → アカウント タブ → "アカウントは重要なので委任できない" にチェック' } }
        ]
      },
      {
        text: { zh: '將管理員帳戶加入 Protected Users 群組', en: 'Add admin accounts to the Protected Users group', ja: '管理者アカウントを Protected Users グループに追加する' },
        detail: { zh: '需要 Windows Server 2012 R2+ 功能等級', en: 'Requires Windows Server 2012 R2+ functional level', ja: 'Windows Server 2012 R2 以上の機能レベルが必要' },
        steps: [
          { type: 'cmd', text: '# 將管理員帳戶加入 Protected Users\nAdd-ADGroupMember -Identity "Protected Users" -Members "AdminUser1","AdminUser2"' },
          { type: 'info', text: { zh: 'Protected Users 效果：禁止 NTLM/RC4/DES 認證、TGT 存活時間縮短至 4 小時、無法使用 CredSSP / WDigest / Digest 認證', en: 'Protected Users effects: Disables NTLM/RC4/DES authentication, reduces TGT lifetime to 4 hours, disables CredSSP/WDigest/Digest authentication', ja: 'Protected Users の効果: NTLM/RC4/DES 認証を無効化、TGT の有効期間を 4 時間に短縮、CredSSP/WDigest/Digest 認証を無効化' } },
          { type: 'warn', text: { zh: '注意：加入後若服務帳戶依賴 NTLM 可能造成認證失敗，先在測試環境驗證', en: 'Warning: If service accounts rely on NTLM, adding them may cause authentication failures; test in a non-production environment first', ja: '注意: サービスアカウントが NTLM に依存している場合、追加すると認証が失敗する可能性があります。事前にテスト環境で確認してください' } },
          { type: 'cmd', text: '# 確認網域功能等級 ≥ Windows Server 2012 R2\n(Get-ADDomain).DomainMode' }
        ]
      },
      {
        text: { zh: '停用所有非活躍管理員帳戶', en: 'Disable all inactive admin accounts', ja: 'すべての非アクティブな管理者アカウントを無効化する' },
        detail: { zh: '定期審查並移除不需要的特權帳戶', en: 'Periodically review and remove unnecessary privileged accounts', ja: '定期的に不要な特権アカウントを確認・削除する' },
        steps: [
          { type: 'cmd', text: '# 列出 90 天未使用的特權帳戶\nSearch-ADAccount -AccountInactive -TimeSpan (New-TimeSpan -Days 90) -UsersOnly | Where-Object { (Get-ADUser $_ -Properties MemberOf).MemberOf -match "Admin" }' },
          { type: 'cmd', text: '# 停用指定帳戶\nDisable-ADAccount -Identity "stale_admin"\nMove-ADObject -Identity "CN=stale_admin,OU=Admins,DC=corp,DC=local" -TargetPath "OU=Disabled,DC=corp,DC=local"' },
          { type: 'info', text: { zh: '建議建立自動化排程任務，每月產生閒置特權帳戶報告並通知審查', en: 'Recommend creating an automated scheduled task to generate monthly inactive privileged account reports for review', ja: '毎月アイドル特権アカウントレポートを生成してレビューを通知する自動スケジュールタスクの作成を推奨' } }
        ]
      }
    ]
  },
  {
    category: { zh: 'Kerberos 與 AD 安全', en: 'Kerberos & AD Security', ja: 'Kerberos と AD のセキュリティ' },
    priority: 'high',
    items: [
      {
        text: { zh: '每年至少一次重設 KRBTGT 帳戶密碼', en: 'Reset the KRBTGT account password at least once a year', ja: '少なくとも年 1 回 KRBTGT アカウントのパスワードをリセットする' },
        detail: { zh: '防止 Golden Ticket 長期有效，需重設兩次（延遲 10 小時）', en: 'Prevent Golden Tickets from remaining valid long-term; requires two resets (10 hours apart)', ja: 'Golden Ticket が長期間有効になるのを防ぐ。2 回のリセットが必要（10 時間の間隔）' },
        steps: [
          { type: 'info', text: { zh: '下載 Microsoft 官方腳本：New-KrbtgtKeys.ps1 (https://github.com/microsoft/New-KrbtgtKeys.ps1)', en: 'Download the official Microsoft script: New-KrbtgtKeys.ps1 (https://github.com/microsoft/New-KrbtgtKeys.ps1)', ja: 'Microsoft 公式スクリプトをダウンロード: New-KrbtgtKeys.ps1 (https://github.com/microsoft/New-KrbtgtKeys.ps1)' } },
          { type: 'cmd', text: '# 第一次重設（在 PDC Emulator 上執行）\n.\\New-KrbtgtKeys.ps1 -OperationMode 1' },
          { type: 'warn', text: { zh: '等待 ≥ 10 小時（最大 Kerberos TGT 存活時間），確保所有 DC 完成複寫並讓現有 TGT 過期', en: 'Wait ≥ 10 hours (maximum Kerberos TGT lifetime) to ensure all DCs have replicated and existing TGTs have expired', ja: '≥ 10 時間待機（最大 Kerberos TGT 有効期間）して、すべての DC が複製を完了し既存の TGT が期限切れになることを確認する' } },
          { type: 'cmd', text: '# 驗證 DC 複寫正常後執行第二次重設\nrepadmin /replsummary\n.\\New-KrbtgtKeys.ps1 -OperationMode 1' },
          { type: 'cmd', text: '# 驗證 KRBTGT 密碼已更新（確認 PasswordLastSet 時間）\nGet-ADUser krbtgt -Properties PasswordLastSet | Select PasswordLastSet' }
        ]
      },
      {
        text: { zh: '限制 AD 管理員成員（DA、EA、Schema Admins）', en: 'Restrict AD admin group membership (DA, EA, Schema Admins)', ja: 'AD 管理者グループのメンバーシップを制限する（DA、EA、Schema Admins）' },
        detail: { zh: '僅使用自訂委派群組，避免過度授權', en: 'Use only custom delegation groups to avoid over-privileging', ja: 'カスタム委任グループのみを使用して過剰な権限付与を避ける' },
        steps: [
          { type: 'cmd', text: '# 檢查各高權限群組成員數\n@("Domain Admins","Enterprise Admins","Schema Admins") | ForEach-Object { "$_ : $((Get-ADGroupMember $_ -Recursive | Measure-Object).Count) 個成員" }' },
          { type: 'info', text: { zh: 'Domain Admins 建議成員數 ≤ 5；Enterprise Admins 平時應為空，需要時才臨時加入；Schema Admins 平時應為空', en: 'Domain Admins: ≤ 5 members recommended; Enterprise Admins: should be empty by default, added temporarily when needed; Schema Admins: should be empty by default', ja: 'Domain Admins: 推奨メンバー数 ≤ 5; Enterprise Admins: 通常は空にし、必要なときだけ一時的に追加; Schema Admins: 通常は空にする' } },
          { type: 'cmd', text: '# 移除不必要的成員\nRemove-ADGroupMember -Identity "Domain Admins" -Members "UserToRemove" -Confirm:$false' },
          { type: 'info', text: { zh: '建議建立自訂委派群組取代直接使用 DA，例如：Server-Admins（僅 Tier 1 登入）、Workstation-Admins（僅 Tier 2 登入）', en: 'Recommend creating custom delegation groups instead of using DA directly, e.g.: Server-Admins (Tier 1 login only), Workstation-Admins (Tier 2 login only)', ja: 'DA を直接使用する代わりにカスタム委任グループを作成することを推奨。例: Server-Admins（Tier 1 ログインのみ）、Workstation-Admins（Tier 2 ログインのみ）' } }
        ]
      },
      {
        text: { zh: '實施三層（Tier）管理模式', en: 'Implement a three-tier (Tier) administration model', ja: '3 層（Tier）管理モデルを実装する' },
        detail: { zh: 'Tier 0: DC/AD, Tier 1: 伺服器, Tier 2: 工作站', en: 'Tier 0: DC/AD, Tier 1: Server, Tier 2: Workstation', ja: 'Tier 0: DC/AD, Tier 1: サーバー, Tier 2: ワークステーション' },
        steps: [
          { type: 'info', text: { zh: 'Tier 0（最高敏感）：Domain Controllers、AD、PKI、ADFS。僅透過 Privileged Access Workstation (PAW) 管理，管理帳戶不可登入 Tier 1/2 系統', en: 'Tier 0 (most sensitive): Domain Controllers, AD, PKI, ADFS. Manage only via Privileged Access Workstation (PAW); admin accounts must not log into Tier 1/2 systems', ja: 'Tier 0（最高機密）: Domain Controllers、AD、PKI、ADFS。特権アクセスワークステーション（PAW）経由でのみ管理し、管理アカウントは Tier 1/2 システムにログインしてはならない' } },
          { type: 'info', text: { zh: 'Tier 1（高敏感）：成員伺服器、應用伺服器。使用獨立 Tier 1 管理員帳戶，不可登入 Tier 0', en: 'Tier 1 (high sensitivity): Member servers, application servers. Use dedicated Tier 1 admin accounts; must not log into Tier 0', ja: 'Tier 1（高機密）: メンバーサーバー、アプリケーションサーバー。専用の Tier 1 管理者アカウントを使用し、Tier 0 にはログインしてはならない' } },
          { type: 'info', text: { zh: 'Tier 2（一般）：Workstations、使用者裝置。使用獨立 Tier 2 管理員帳戶', en: 'Tier 2 (standard): Workstations, user devices. Use dedicated Tier 2 admin accounts', ja: 'Tier 2（一般）: ワークステーション、ユーザーデバイス。専用の Tier 2 管理者アカウントを使用する' } },
          { type: 'cmd', text: '# GPO 限制 Tier 0 帳戶只能登入 DC（套用至 Domain Controllers OU）\n# Security Settings → Local Policies → User Rights Assignment:\n# "Allow log on locally" → 僅 Tier 0 管理員群組\n# "Deny log on locally" → Tier 1 / Tier 2 帳戶' },
          { type: 'cmd', text: '# 建立 Tier 0 帳戶登入限制（Authentication Policy）\nNew-ADAuthenticationPolicy -Name "Tier0-Policy" -UserAllowedToAuthenticateTo "O:SYG:SYD:(XA;OICI;CR;;;WD;(@USER.ad://ext/AuthenticationSilo == \\"Tier0Silo\\"))"' }
        ]
      },
      {
        text: { zh: '稽核 Kerberos 委派設定', en: 'Audit Kerberos delegation configuration', ja: 'Kerberos 委任の設定を監査する' },
        detail: { zh: '識別並移除不必要的無限制委派', en: 'Identify and remove unnecessary unconstrained delegation', ja: '不要な無制限委任を特定して削除する' },
        steps: [
          { type: 'cmd', text: '# 查詢所有使用者帳戶的無限制委派\nGet-ADUser -Filter { TrustedForDelegation -eq $true } -Properties TrustedForDelegation,ServicePrincipalName | Select Name,SamAccountName,ServicePrincipalName' },
          { type: 'cmd', text: '# 查詢所有電腦帳戶的無限制委派（DC 除外）\nGet-ADComputer -Filter { TrustedForDelegation -eq $true } -Properties TrustedForDelegation | Where-Object { $_.DistinguishedName -notmatch "OU=Domain Controllers" } | Select Name' },
          { type: 'cmd', text: '# 查詢受限制委派（Constrained Delegation）清單\nGet-ADObject -Filter { msDS-AllowedToDelegateTo -ne "$null" } -Properties msDS-AllowedToDelegateTo | Select Name,"msDS-AllowedToDelegateTo"' },
          { type: 'cmd', text: '# 移除不必要的無限制委派\nSet-ADUser -Identity "svc_account" -TrustedForDelegation $false' },
          { type: 'info', text: { zh: '建議使用 BloodHound 視覺化分析委派攻擊路徑，找出可從非特權帳戶到達 DC 的委派鏈', en: 'Recommend using BloodHound to visually analyze delegation attack paths and find delegation chains from non-privileged accounts to DCs', ja: 'BloodHound を使用して委任攻撃経路を視覚的に分析し、非特権アカウントから DC に到達できる委任チェーンを見つけることを推奨' } }
        ]
      },
      {
        text: { zh: '使用 Managed Service Accounts (gMSA) 取代服務帳戶', en: 'Use Managed Service Accounts (gMSA) instead of service accounts', ja: 'サービスアカウントの代わりに Managed Service Accounts (gMSA) を使用する' },
        detail: { zh: '防止 Kerberoasting，密碼由系統自動管理', en: 'Prevent Kerberoasting; passwords are automatically managed by the system', ja: 'Kerberoasting を防止する。パスワードはシステムによって自動管理される' },
        steps: [
          { type: 'cmd', text: '# 建立 Key Distribution Service Root Key（每個網域只需一次）\nAdd-KdsRootKey -EffectiveImmediately  # 生產環境建議改用 -EffectiveTime (Get-Date).AddHours(-10)' },
          { type: 'cmd', text: '# 建立 gMSA\nNew-ADServiceAccount -Name "svc-webapp" `\n  -DNSHostName "webapp.corp.local" `\n  -PrincipalsAllowedToRetrieveManagedPassword "WebServers"  # 可用電腦帳戶或群組' },
          { type: 'cmd', text: '# 在目標伺服器安裝並測試 gMSA\nInstall-ADServiceAccount -Identity "svc-webapp"\nTest-ADServiceAccount -Identity "svc-webapp"' },
          { type: 'info', text: { zh: '服務設定：services.msc → 服務屬性 → Log On → This account 填入 "CORP\\svc-webapp$"（注意尾端 $），密碼欄留空', en: 'Service configuration: services.msc → Service properties → Log On → Set "This account" to "CORP\\svc-webapp$" (note the trailing $); leave the password field blank', ja: 'サービス設定: services.msc → サービスのプロパティ → ログオン → 「このアカウント」に "CORP\\svc-webapp$"（末尾の $ に注意）を入力し、パスワード欄は空白のままにする' } },
          { type: 'cmd', text: '# 確認舊服務帳戶的 SPN，重新指向 gMSA\nGet-ADUser "old_svc" -Properties ServicePrincipalName | Select ServicePrincipalName' }
        ]
      }
    ]
  },
  {
    category: { zh: '網路與系統安全', en: 'Network & System Security', ja: 'ネットワークとシステムのセキュリティ' },
    priority: 'high',
    items: [
      {
        text: { zh: '封鎖 DC 的網際網路存取', en: 'Block internet access from DCs', ja: 'DC のインターネットアクセスをブロックする' },
        detail: { zh: 'DC 只應存取內部系統', en: 'DCs should only access internal systems', ja: 'DC は内部システムにのみアクセスするべきである' },
        steps: [
          { type: 'cmd', text: '# Windows Firewall GPO（套用至 Domain Controllers OU）\n# Computer Configuration → Windows Settings → Security Settings → Windows Firewall\n# Outbound Rules → New Rule → Block TCP 80, 443 for All Programs' },
          { type: 'info', text: { zh: '建議在網路層（防火牆/路由器）封鎖 DC IP 段（通常 /24）的所有 Outbound 連線，僅允許：DNS(53)、LDAP(389/636)、Kerberos(88)、AD Replication(135,49152-65535) 到指定目標', en: 'Recommend blocking all outbound connections from the DC IP subnet (/24) at the network layer (firewall/router), allowing only: DNS(53), LDAP(389/636), Kerberos(88), AD Replication(135,49152-65535) to specified targets', ja: 'ネットワーク層（ファイアウォール/ルーター）で DC IP サブネット（通常 /24）からのすべてのアウトバウンド接続をブロックし、指定したターゲットへの DNS(53)、LDAP(389/636)、Kerberos(88)、AD レプリケーション(135,49152-65535) のみを許可することを推奨' } },
          { type: 'cmd', text: '# テスト DC は外部にアクセスできないか確認\nInvoke-Command -ComputerName DC01 { Test-NetConnection -ComputerName "8.8.8.8" -Port 80 }' }
        ]
      },
      {
        text: { zh: '停用 SMBv1', en: 'Disable SMBv1', ja: 'SMBv1 を無効化する' },
        detail: { zh: '防止 EternalBlue (CVE-2017-0143) 等攻擊', en: 'Prevent EternalBlue (CVE-2017-0143) and similar attacks', ja: 'EternalBlue (CVE-2017-0143) などの攻撃を防止する' },
        steps: [
          { type: 'cmd', text: '# 檢查目前 SMBv1 狀態\nGet-SmbServerConfiguration | Select EnableSMB1Protocol\nGet-WindowsOptionalFeature -Online -FeatureName SMB1Protocol' },
          { type: 'cmd', text: '# 停用 SMBv1（伺服器端）\nSet-SmbServerConfiguration -EnableSMB1Protocol $false -Force\n\n# 停用 SMBv1（客戶端）\nSet-SmbClientConfiguration -EnableSMB1Protocol $false -Force' },
          { type: 'cmd', text: '# 完全移除 SMBv1 功能\nDisable-WindowsOptionalFeature -Online -FeatureName SMB1Protocol -NoRestart' },
          { type: 'info', text: { zh: 'GPO 強制停用：Computer Configuration → Administrative Templates → Network → Lanman Server → Enable insecure guest logons → Disabled', en: 'Force disable via GPO: Computer Configuration → Administrative Templates → Network → Lanman Server → Enable insecure guest logons → Disabled', ja: 'GPO で強制無効化: コンピューターの構成 → 管理用テンプレート → ネットワーク → Lanman サーバー → セキュリティで保護されていないゲストログオンを有効にする → 無効' } }
        ]
      },
      {
        text: { zh: '停用 LLMNR 和 NetBIOS-NS', en: 'Disable LLMNR and NetBIOS-NS', ja: 'LLMNR および NetBIOS-NS を無効化する' },
        detail: { zh: '防止 Responder 毒化攻擊', en: 'Prevent Responder poisoning attacks', ja: 'Responder ポイズニング攻撃を防止する' },
        steps: [
          { type: 'info', text: { zh: 'GPO 停用 LLMNR：Computer Configuration → Administrative Templates → Network → DNS Client → "Turn off multicast name resolution" → Enabled', en: 'Disable LLMNR via GPO: Computer Configuration → Administrative Templates → Network → DNS Client → "Turn off multicast name resolution" → Enabled', ja: 'GPO で LLMNR を無効化: コンピューターの構成 → 管理用テンプレート → ネットワーク → DNS クライアント → "マルチキャスト名前解決をオフにする" → 有効' } },
          { type: 'cmd', text: '# PowerShell 批次停用 NetBIOS over TCP/IP（所有 NIC）\nGet-WmiObject Win32_NetworkAdapterConfiguration | Where-Object { $_.IPEnabled } | ForEach-Object { $_.SetTcpipNetbios(2) }' },
          { type: 'info', text: { zh: 'DHCP 停用 NetBIOS：在 DHCP 伺服器設定 Scope Options → 043 Vendor Specific Info，或各 NIC 屬性 → TCP/IP 進階設定 → WINS → Disable NetBIOS over TCP/IP', en: 'Disable NetBIOS via DHCP: set Scope Options → 043 Vendor Specific Info on the DHCP server, or each NIC properties → TCP/IP Advanced Settings → WINS → Disable NetBIOS over TCP/IP', ja: 'DHCP で NetBIOS を無効化: DHCP サーバーで Scope Options → 043 Vendor Specific Info を設定するか、各 NIC のプロパティ → TCP/IP 詳細設定 → WINS → TCP/IP 上の NetBIOS を無効にする' } },
          { type: 'cmd', text: '# 驗證：用 Responder 或 tcpdump 監聽是否還有 LLMNR/NBT-NS 廣播\n# (需在測試環境執行) Get-NetFirewallRule | Where-Object { $_.DisplayName -match "LLMNR" }' }
        ]
      },
      {
        text: { zh: '移除不再需要的 Domain Trust', en: 'Remove unnecessary Domain Trusts', ja: '不要なドメイン信頼関係を削除する' },
        detail: { zh: '並為保留的信任啟用 SID Filtering', en: 'And enable SID Filtering for retained trusts', ja: '保持する信頼関係には SID フィルタリングを有効にする' },
        steps: [
          { type: 'cmd', text: '# 列出所有網域信任關係\nGet-ADTrust -Filter * | Select Name,Direction,TrustType,SIDFilteringQuarantined,SIDFilteringForestAware | Format-Table -AutoSize' },
          { type: 'cmd', text: '# 移除不再需要的信任\nRemove-ADTrust -Identity "CN=old-partner.com,CN=System,DC=corp,DC=local" -Confirm:$false' },
          { type: 'cmd', text: '# 為保留的外部信任啟用 SID Filtering\nnetdom trust corp.local /domain:partner.com /quarantine:yes\n\n# 驗證\nGet-ADTrust -Identity "partner.com" | Select SIDFilteringQuarantined' },
          { type: 'warn', text: { zh: '注意：SID Filtering 可能影響跨網域群組成員的存取，啟用前需充分測試', en: 'Warning: SID Filtering may affect access for cross-domain group members; test thoroughly before enabling', ja: '注意: SID フィルタリングはドメイン間グループメンバーのアクセスに影響する可能性があります。有効化前に十分にテストしてください' } }
        ]
      },
      {
        text: { zh: '設定所有認證為 NTLMv2 only（拒絕 LM/NTLM）', en: 'Configure all authentication to NTLMv2 only (refuse LM/NTLM)', ja: 'すべての認証を NTLMv2 のみに設定する（LM/NTLM を拒否）' },
        detail: { zh: '防止降級攻擊', en: 'Prevent downgrade attacks', ja: 'ダウングレード攻撃を防止する' },
        steps: [
          { type: 'info', text: { zh: 'GPO 路徑：Computer Configuration → Windows Settings → Security Settings → Local Policies → Security Options', en: 'GPO path: Computer Configuration → Windows Settings → Security Settings → Local Policies → Security Options', ja: 'GPO パス: コンピューターの構成 → Windows の設定 → セキュリティ設定 → ローカルポリシー → セキュリティオプション' } },
          { type: 'info', text: { zh: '"Network security: LAN Manager authentication level" → 選擇 "Send NTLMv2 response only. Refuse LM & NTLM"（值為 5）', en: '"Network security: LAN Manager authentication level" → Select "Send NTLMv2 response only. Refuse LM & NTLM" (value 5)', ja: '"ネットワーク セキュリティ: LAN Manager 認証レベル" → "NTLMv2 応答のみ送信。LM と NTLM を拒否する" を選択（値 5）' } },
          { type: 'cmd', text: '# 登錄直接設定（值 5 = NTLMv2 only, Refuse LM & NTLM）\nreg add "HKLM\\SYSTEM\\CurrentControlSet\\Control\\Lsa" /v LmCompatibilityLevel /t REG_DWORD /d 5 /f' },
          { type: 'cmd', text: '# 同時停用 LM Hash 儲存\nreg add "HKLM\\SYSTEM\\CurrentControlSet\\Control\\Lsa" /v NoLMHash /t REG_DWORD /d 1 /f' },
          { type: 'warn', text: { zh: '注意：先確認環境中無 Windows XP / Server 2003 等舊系統仍需要 NTLM/LM 認證，否則會中斷服務', en: 'Warning: First verify that no legacy systems such as Windows XP or Server 2003 still require NTLM/LM authentication, or services will be interrupted', ja: '注意: Windows XP や Server 2003 などのレガシーシステムが NTLM/LM 認証を必要としていないことを事前に確認してください。そうしないとサービスが中断されます' } }
        ]
      }
    ]
  },
  {
    category: { zh: '日誌與監控', en: 'Logging & Monitoring', ja: 'ログと監視' },
    priority: 'high',
    items: [
      {
        text: { zh: '啟用增強型稽核策略', en: 'Enable advanced audit policy', ja: '高度な監査ポリシーを有効にする' },
        detail: { zh: '啟用成功/失敗的認證、帳戶管理、目錄服務存取等', en: 'Enable success/failure auditing for authentication, account management, directory service access, etc.', ja: '認証・アカウント管理・ディレクトリサービスアクセスなどの成功/失敗の監査を有効にする' },
        steps: [
          { type: 'cmd', text: '# 檢查目前稽核設定\nauditpol /get /category:*' },
          { type: 'info', text: { zh: 'GPO 路徑：Computer Configuration → Windows Settings → Security Settings → Advanced Audit Policy Configuration → Audit Policies', en: 'GPO path: Computer Configuration → Windows Settings → Security Settings → Advanced Audit Policy Configuration → Audit Policies', ja: 'GPO パス: コンピューターの構成 → Windows の設定 → セキュリティ設定 → 高度な監査ポリシーの構成 → 監査ポリシー' } },
          { type: 'info', text: { zh: '建議啟用（Success & Failure）：Account Logon / Account Management / DS Access (Directory Service Changes) / Logon/Logoff / Object Access / Policy Change / Privilege Use / System', en: 'Recommended to enable (Success & Failure): Account Logon / Account Management / DS Access (Directory Service Changes) / Logon/Logoff / Object Access / Policy Change / Privilege Use / System', ja: '有効化を推奨（成功と失敗）: アカウント ログオン / アカウント管理 / DS アクセス（ディレクトリ サービスの変更）/ ログオン/ログオフ / オブジェクト アクセス / ポリシーの変更 / 特権の使用 / システム' } },
          { type: 'cmd', text: '# 批次啟用關鍵稽核策略\nauditpol /set /subcategory:"Logon" /success:enable /failure:enable\nauditpol /set /subcategory:"Account Lockout" /success:enable /failure:enable\nauditpol /set /subcategory:"Kerberos Service Ticket Operations" /success:enable /failure:enable\nauditpol /set /subcategory:"Directory Service Changes" /success:enable /failure:enable' }
        ]
      },
      {
        text: { zh: '啟用 PowerShell 模組與 ScriptBlock 日誌', en: 'Enable PowerShell Module and ScriptBlock logging', ja: 'PowerShell モジュールと ScriptBlock のログを有効にする' },
        detail: { zh: '並集中轉發至 SIEM', en: 'And forward centrally to SIEM', ja: 'SIEM に集中転送する' },
        steps: [
          { type: 'info', text: { zh: 'GPO 路徑：Computer Configuration → Administrative Templates → Windows Components → Windows PowerShell', en: 'GPO path: Computer Configuration → Administrative Templates → Windows Components → Windows PowerShell', ja: 'GPO パス: コンピューターの構成 → 管理用テンプレート → Windows コンポーネント → Windows PowerShell' } },
          { type: 'info', text: { zh: '啟用以下三項：(1) Turn on Module Logging → Enabled，Module Names 填 * (2) Turn on PowerShell Script Block Logging → Enabled (3) Turn on Script Execution → Enabled', en: 'Enable the following three: (1) Turn on Module Logging → Enabled, Module Names set to * (2) Turn on PowerShell Script Block Logging → Enabled (3) Turn on Script Execution → Enabled', ja: '以下の 3 項目を有効にする: (1) モジュール ログを有効にする → 有効、モジュール名を * に設定 (2) PowerShell スクリプト ブロックのログを有効にする → 有効 (3) スクリプトの実行を有効にする → 有効' } },
          { type: 'cmd', text: '# 登錄方式啟用 ScriptBlock Logging\nreg add "HKLM\\SOFTWARE\\Policies\\Microsoft\\Windows\\PowerShell\\ScriptBlockLogging" /v EnableScriptBlockLogging /t REG_DWORD /d 1 /f\nreg add "HKLM\\SOFTWARE\\Policies\\Microsoft\\Windows\\PowerShell\\ModuleLogging" /v EnableModuleLogging /t REG_DWORD /d 1 /f' },
          { type: 'info', text: { zh: 'PowerShell 日誌儲存於：Event Log → Applications and Services Logs → Microsoft → Windows → PowerShell → Operational (Event ID 4103/4104)', en: 'PowerShell logs are stored in: Event Log → Applications and Services Logs → Microsoft → Windows → PowerShell → Operational (Event ID 4103/4104)', ja: 'PowerShell ログの保存場所: イベント ログ → アプリケーションとサービス ログ → Microsoft → Windows → PowerShell → 操作 (Event ID 4103/4104)' } }
        ]
      },
      {
        text: { zh: '部署並設定 Sysmon', en: 'Deploy and configure Sysmon', ja: 'Sysmon を展開して設定する' },
        detail: { zh: '使用 sysmon-modular 等成熟設定範本', en: 'Use mature configuration templates such as sysmon-modular', ja: 'sysmon-modular などの成熟した設定テンプレートを使用する' },
        steps: [
          { type: 'info', text: { zh: '下載 Sysmon：https://docs.microsoft.com/sysinternals/downloads/sysmon；建議使用 SwiftOnSecurity sysmon-config 或 sysmon-modular 作為設定基礎', en: 'Download Sysmon: https://docs.microsoft.com/sysinternals/downloads/sysmon; recommend using SwiftOnSecurity sysmon-config or sysmon-modular as a configuration baseline', ja: 'Sysmon のダウンロード: https://docs.microsoft.com/sysinternals/downloads/sysmon; SwiftOnSecurity の sysmon-config または sysmon-modular を設定のベースとして使用することを推奨' } },
          { type: 'cmd', text: '# 初次安裝（使用自訂設定檔）\nsysmon64.exe -accepteula -i sysmonconfig.xml' },
          { type: 'cmd', text: '# 更新設定檔（不中斷服務）\nsysmon64.exe -c sysmonconfig.xml' },
          { type: 'cmd', text: '# 驗證 Sysmon 運行狀態\nGet-Service Sysmon64\n# 確認日誌位置：Event Viewer → Applications and Services Logs → Microsoft → Windows → Sysmon → Operational' },
          { type: 'info', text: { zh: 'Sysmon 關鍵事件：Event ID 1 (Process Create), 3 (Network Connect), 7 (Image Load), 8 (CreateRemoteThread), 10 (ProcessAccess), 11 (FileCreate), 25 (ProcessTampering)', en: 'Key Sysmon events: Event ID 1 (Process Create), 3 (Network Connect), 7 (Image Load), 8 (CreateRemoteThread), 10 (ProcessAccess), 11 (FileCreate), 25 (ProcessTampering)', ja: 'Sysmon の重要イベント: Event ID 1 (プロセス作成), 3 (ネットワーク接続), 7 (イメージ読み込み), 8 (CreateRemoteThread), 10 (ProcessAccess), 11 (ファイル作成), 25 (ProcessTampering)' } }
        ]
      },
      {
        text: { zh: '建立 SIEM 偵測規則（Sigma）', en: 'Create SIEM detection rules using Sigma', ja: 'Sigma を使用した SIEM 検知ルールを作成する' },
        detail: { zh: '針對 DCSync、Kerberoasting、Pass-the-Hash 等攻擊建立警示', en: 'Create alerts targeting DCSync, Kerberoasting, Pass-the-Hash, and other attacks', ja: 'DCSync、Kerberoasting、Pass-the-Hash などの攻撃に対するアラートを作成する' },
        steps: [
          { type: 'cmd', text: '# 安裝 Sigma 工具\npip install sigmatools\n# 或使用新版 sigma-cli\npip install sigma-cli' },
          { type: 'cmd', text: '# 下載 Sigma 規則庫\ngit clone https://github.com/SigmaHQ/sigma' },
          { type: 'cmd', text: '# 轉換為 Splunk 格式（以 DCSync 為例）\nsigma convert -t splunk -p splunk_windows rules/windows/builtin/security/win_security_dcsync.yml\n\n# 轉換為 Elastic/KQL 格式\nsigma convert -t lucene rules/windows/builtin/security/win_security_kerberoasting.yml' },
          { type: 'info', text: { zh: '優先部署規則：DCSync (4662), Kerberoasting (4769 RC4), AS-REP Roasting (4768), Password Spraying (4625 大量失敗), Golden/Silver Ticket (4672 不尋常的特殊權限)', en: 'Priority rules to deploy: DCSync (4662), Kerberoasting (4769 RC4), AS-REP Roasting (4768), Password Spraying (4625 high-volume failures), Golden/Silver Ticket (4672 unusual privileges)', ja: '優先して展開するルール: DCSync (4662)、Kerberoasting (4769 RC4)、AS-REP Roasting (4768)、パスワードスプレー (4625 大量失敗)、Golden/Silver Ticket (4672 異常な特権)' } }
        ]
      },
      {
        text: { zh: '啟用命令列程序記錄', en: 'Enable command-line process logging', ja: 'コマンドライン プロセスのログを有効にする' },
        detail: { zh: 'KB3004375，記錄所有程序命令列參數', en: 'KB3004375; logs all process command-line arguments', ja: 'KB3004375; すべてのプロセスコマンドライン引数を記録する' },
        steps: [
          { type: 'info', text: { zh: 'GPO 路徑：Computer Configuration → Administrative Templates → System → Audit Process Creation → "Include command line in process creation events" → Enabled', en: 'GPO path: Computer Configuration → Administrative Templates → System → Audit Process Creation → "Include command line in process creation events" → Enabled', ja: 'GPO パス: コンピューターの構成 → 管理用テンプレート → システム → プロセス作成の監査 → "プロセス作成イベントにコマンド ラインを含める" → 有効' } },
          { type: 'cmd', text: '# 登錄方式啟用\nreg add "HKLM\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Policies\\System\\Audit" /v ProcessCreationIncludeCmdLine_Enabled /t REG_DWORD /d 1 /f' },
          { type: 'info', text: { zh: '配合 Event ID 4688 (Process Creation) 使用；需同時啟用「稽核程序建立」(Audit Process Creation)', en: 'Used alongside Event ID 4688 (Process Creation); must also enable "Audit Process Creation"', ja: 'Event ID 4688 (プロセス作成) と併用する。「プロセス作成の監査」も同時に有効にする必要がある' } },
          { type: 'warn', text: { zh: '注意：命令列可能包含敏感資訊（密碼），確保日誌儲存環境已加密且存取受控', en: 'Warning: Command lines may contain sensitive information (passwords); ensure the log storage environment is encrypted and access-controlled', ja: '注意: コマンドラインには機密情報（パスワード）が含まれる可能性があります。ログ保存環境が暗号化されアクセス制御されていることを確認してください' } }
        ]
      }
    ]
  },
  {
    category: { zh: 'AD CS 憑證服務', en: 'AD CS Certificate Services', ja: 'AD CS 証明書サービス' },
    priority: 'high',
    items: [
      {
        text: { zh: '使用 Certify 或 Locksmith 稽核 AD CS 設定', en: 'Use Certify or Locksmith to audit AD CS configuration', ja: 'Certify または Locksmith を使用して AD CS の設定を監査する' },
        detail: { zh: '尋找 ESC1-ESC8 等錯誤設定', en: 'Find ESC1–ESC8 and other misconfigurations', ja: 'ESC1〜ESC8 などの設定ミスを見つける' },
        steps: [
          { type: 'cmd', text: '# 使用 Certify 掃描脆弱憑證範本（需網域使用者權限）\nCertify.exe find /vulnerable\nCertify.exe find /enrolleeSuppliesSubject  # ESC1 特定掃描' },
          { type: 'cmd', text: '# 使用 Locksmith 自動稽核並提供修復建議\nImport-Module .\\Locksmith.psd1\nInvoke-Locksmith -Mode 0  # 模式 0 = 僅報告問題，不修復' },
          { type: 'info', text: { zh: '常見錯誤設定：ESC1 (範本允許 enrollee 自訂 SAN), ESC2 (Any Purpose EKU), ESC3 (Enrollment Agent), ESC4 (範本 ACL 可寫), ESC6 (EDITF_ATTRIBUTESUBJECTALTNAME2 旗標), ESC8 (HTTP NTLM 中繼)', en: 'Common misconfigurations: ESC1 (template allows enrollee to specify SAN), ESC2 (Any Purpose EKU), ESC3 (Enrollment Agent), ESC4 (template ACL writable), ESC6 (EDITF_ATTRIBUTESUBJECTALTNAME2 flag), ESC8 (HTTP NTLM relay)', ja: '一般的な設定ミス: ESC1 (テンプレートで登録者が SAN を指定可能), ESC2 (Any Purpose EKU), ESC3 (Enrollment Agent), ESC4 (テンプレート ACL が書き込み可能), ESC6 (EDITF_ATTRIBUTESUBJECTALTNAME2 フラグ), ESC8 (HTTP NTLM リレー)' } },
          { type: 'cmd', text: '# 使用 PSPKIAudit 稽核 CA 設定\nInstall-Module -Name PSPKI\nImport-Module PSPKI\nGet-CertificationAuthority | Get-CATemplate' }
        ]
      },
      {
        text: { zh: '停用 NTLM 認證至 IIS/AD CS', en: 'Disable NTLM authentication to IIS/AD CS', ja: 'IIS/AD CS への NTLM 認証を無効化する' },
        detail: { zh: '防止 PetitPotam NTLM 中繼攻擊', en: 'Prevent PetitPotam NTLM relay attacks', ja: 'PetitPotam NTLM リレー攻撃を防止する' },
        steps: [
          { type: 'info', text: { zh: 'IIS Manager 設定：開啟 IIS → 選取 CertSrv 虛擬目錄 → Authentication → Windows Authentication → Providers → 移除 NTLM，只保留 Negotiate (Kerberos)', en: 'IIS Manager setting: Open IIS → Select CertSrv virtual directory → Authentication → Windows Authentication → Providers → Remove NTLM, keep only Negotiate (Kerberos)', ja: 'IIS Manager の設定: IIS を開く → CertSrv 仮想ディレクトリを選択 → 認証 → Windows 認証 → プロバイダー → NTLM を削除し、Negotiate (Kerberos) のみ残す' } },
          { type: 'cmd', text: "# 透過 appcmd 設定（IIS 8+）\n%windir%\\system32\\inetsrv\\appcmd.exe set config \"Default Web Site/CertSrv\" /section:windowsAuthentication /-providers.[value='NTLM']" },
          { type: 'info', text: { zh: '啟用 Extended Protection for Authentication (EPA)：IIS → Windows Authentication → Advanced Settings → Extended Protection → Required', en: 'Enable Extended Protection for Authentication (EPA): IIS → Windows Authentication → Advanced Settings → Extended Protection → Required', ja: '認証の拡張保護（EPA）を有効にする: IIS → Windows 認証 → 詳細設定 → 拡張保護 → 必須' } },
          { type: 'info', text: { zh: '若環境使用 Web Enrollment，建議將 AD CS Web 介面設定為要求 HTTPS 並停用 HTTP', en: 'If the environment uses Web Enrollment, configure the AD CS web interface to require HTTPS and disable HTTP', ja: '環境で Web 登録を使用している場合、AD CS の Web インターフェイスを HTTPS 必須に設定し HTTP を無効にすることを推奨' } }
        ]
      },
      {
        text: { zh: '移除不必要的憑證範本', en: 'Remove unnecessary certificate templates', ja: '不要な証明書テンプレートを削除する' },
        detail: { zh: '特別是允許 SAN 指定或 EKU 允許智慧卡登入的範本', en: 'Especially templates allowing SAN specification or EKUs permitting smart card login', ja: '特に SAN の指定を許可するテンプレートや、スマートカードログインを許可する EKU のテンプレート' },
        steps: [
          { type: 'cmd', text: '# 列出 CA 上發布的所有範本\ncertutil -catemplates\n# 或使用 PowerShell\nGet-CATemplate | Select Name,DisplayName | Sort Name' },
          { type: 'info', text: { zh: 'CA 管理主控台：certsrv.msc → Certificate Templates → 右鍵刪除不必要的範本；重點移除：WebServer（若不用）、User（預設允許 SAN）、DomainController（若不用 smartcard）', en: 'CA management console: certsrv.msc → Certificate Templates → right-click to delete unnecessary templates; key removals: WebServer (if not used), User (allows SAN by default), DomainController (if smart card not used)', ja: 'CA 管理コンソール: certsrv.msc → 証明書テンプレート → 右クリックして不要なテンプレートを削除。主な削除対象: WebServer（未使用の場合）、User（デフォルトで SAN 許可）、DomainController（スマートカード未使用の場合）' } },
          { type: 'cmd', text: '# 停用特定危險範本的發布\nGet-CATemplate | Where-Object { $_.Name -eq "WebServer" } | Remove-CATemplate -Force' },
          { type: 'warn', text: { zh: '注意：移除範本前確認無任何系統依賴它；可先設定範本為「停用」而非直接刪除', en: 'Warning: Confirm no systems depend on a template before removing it; consider setting it to "disabled" instead of deleting directly', ja: '注意: テンプレートを削除する前に、それに依存しているシステムがないことを確認してください。直接削除する代わりに「無効」に設定することを検討してください' } }
        ]
      },
      {
        text: { zh: '啟用 AD CS HTTP 端點的 EPA（Extended Protection for Authentication）', en: 'Enable EPA (Extended Protection for Authentication) on AD CS HTTP endpoints', ja: 'AD CS HTTP エンドポイントで EPA（認証の拡張保護）を有効にする' },
        detail: { zh: '防止 NTLM 中繼', en: 'Prevent NTLM relay attacks', ja: 'NTLM リレー攻撃を防止する' },
        steps: [
          { type: 'info', text: { zh: 'IIS Manager → Default Web Site → CertSrv → Windows Authentication → Advanced Settings → Extended Protection → Required（最強，需測試相容性）或 Accept（過渡期使用）', en: 'IIS Manager → Default Web Site → CertSrv → Windows Authentication → Advanced Settings → Extended Protection → Required (strongest, test compatibility first) or Accept (transition period)', ja: 'IIS Manager → 既定の Web サイト → CertSrv → Windows 認証 → 詳細設定 → 拡張保護 → 必須（最強、互換性をテスト済み）または 受け入れる（移行期間中）' } },
          { type: 'cmd', text: '# 驗證 EPA 設定\nGet-WebConfigurationProperty -Filter "//security/authentication/windowsAuthentication" -PSPath "IIS:\\Sites\\Default Web Site\\CertSrv" -Name extendedProtection' },
          { type: 'info', text: { zh: '同時確保 CA Web Enrollment 和 Certificate Enrollment Web Service (CES) 端點也已設定 EPA', en: 'Also ensure EPA is configured on the CA Web Enrollment and Certificate Enrollment Web Service (CES) endpoints', ja: 'CA Web 登録と証明書登録 Web サービス（CES）エンドポイントにも EPA が設定されていることを確認する' } },
          { type: 'info', text: { zh: '套用 KB5005413 修補（CVE-2021-36942 PetitPotam），並考慮以 Windows Defender Credential Guard 保護 DC', en: 'Apply KB5005413 patch (CVE-2021-36942 PetitPotam), and consider protecting DCs with Windows Defender Credential Guard', ja: 'KB5005413 パッチ（CVE-2021-36942 PetitPotam）を適用し、Windows Defender Credential Guard で DC を保護することを検討する' } }
        ]
      }
    ]
  },
  {
    category: { zh: '重要安全更新', en: 'Critical Security Updates', ja: '重要なセキュリティ更新' },
    priority: 'critical',
    items: [
      {
        text: { zh: '套用 Zerologon 補丁 (CVE-2020-1472)', en: 'Apply Zerologon patch (CVE-2020-1472)', ja: 'Zerologon パッチ (CVE-2020-1472) を適用する' },
        detail: { zh: 'KB4571694 及後續更新，並完全執行強制模式', en: 'KB4571694 and subsequent updates; enforce Enforcement Mode fully', ja: 'KB4571694 および後続の更新プログラム。強制モードを完全に有効にする' },
        steps: [
          { type: 'info', text: { zh: '安裝 KB4571694（2020-08 更新）後，Netlogon 進入「部署模式」（允許不合規客戶端連線但記錄警告）', en: 'After installing KB4571694 (August 2020 update), Netlogon enters "Deployment Mode" (allows non-compliant clients but logs warnings)', ja: 'KB4571694（2020年8月更新）をインストール後、Netlogon は「展開モード」に入り（非準拠クライアントの接続を許可しつつ警告を記録）' } },
          { type: 'info', text: { zh: '2021-02 後的更新已進入「強制模式」，所有不合規的 Netlogon 連線將被拒絕', en: 'Updates from February 2021 onwards have entered "Enforcement Mode"; all non-compliant Netlogon connections will be denied', ja: '2021年2月以降の更新プログラムは「強制モード」に移行し、すべての非準拠 Netlogon 接続が拒否される' } },
          { type: 'cmd', text: '# 檢查 DC 是否安裝補丁\nGet-HotFix -Id KB4571694\n# 確認強制模式已生效\nreg query "HKLM\\SYSTEM\\CurrentControlSet\\Services\\Netlogon\\Parameters" /v FullSecureChannelProtection' },
          { type: 'cmd', text: '# 查看是否有不合規客戶端日誌（Event ID 5829/5827）\nGet-WinEvent -LogName "System" | Where-Object { $_.Id -in 5829,5827 } | Select TimeCreated,Message | Format-List' },
          { type: 'warn', text: { zh: '若有 Event ID 5829 日誌，表示仍有使用舊 Netlogon 的裝置，需先更新這些裝置再啟用強制模式', en: 'If Event ID 5829 is logged, it indicates devices still using old Netlogon; update those devices before enabling Enforcement Mode', ja: 'Event ID 5829 が記録されている場合、古い Netlogon を使用しているデバイスがまだ存在することを示します。強制モードを有効にする前に、これらのデバイスを更新してください' } }
        ]
      },
      {
        text: { zh: '套用 PetitPotam 緩解措施 (CVE-2021-36942)', en: 'Apply PetitPotam mitigation (CVE-2021-36942)', ja: 'PetitPotam 緩和策 (CVE-2021-36942) を適用する' },
        detail: { zh: 'KB5005413，並停用 EFSRPC 介面（如不需要）', en: 'KB5005413; and disable the EFSRPC interface if not needed', ja: 'KB5005413; 必要でない場合は EFSRPC インターフェイスを無効にする' },
        steps: [
          { type: 'cmd', text: '# 確認 KB5005413 已安裝\nGet-HotFix -Id KB5005413' },
          { type: 'info', text: { zh: '若 EFS 在環境中未使用，可透過防火牆封鎖 DC 上的 MS-EFSRPC 介面（TCP Port 445 的 EFSRPC）；或使用 Windows RPC 篩選', en: 'If EFS is not used in the environment, block the MS-EFSRPC interface on DCs via firewall (EFSRPC on TCP Port 445), or use Windows RPC filtering', ja: '環境で EFS が使用されていない場合、ファイアウォールで DC の MS-EFSRPC インターフェイス（TCP ポート 445 の EFSRPC）をブロックするか、Windows RPC フィルタリングを使用する' } },
          { type: 'cmd', text: '# 使用 netsh 封鎖 EFSRPC（需 Windows Server 2019+）\nnetsh rpc filter add rule layer=um actiontype=block\nnetsh rpc filter add condition field=if_uuid matchtype=equal data=c681d488-d850-11d0-8c52-00c04fd90f7e\nnetsh rpc filter add filter' },
          { type: 'info', text: { zh: '同時停用 IIS/AD CS 的 NTLM 認證（搭配 EPA），防止 NTLM 中繼到 AD CS 的攻擊鏈', en: 'Also disable NTLM authentication on IIS/AD CS (with EPA) to prevent NTLM relay attack chains to AD CS', ja: 'IIS/AD CS の NTLM 認証も無効にし（EPA と組み合わせ）、AD CS への NTLM リレー攻撃チェーンを防止する' } }
        ]
      },
      {
        text: { zh: '套用 sAMAccountName 漏洞補丁 (CVE-2021-42278/42287)', en: 'Apply sAMAccountName vulnerability patches (CVE-2021-42278/42287)', ja: 'sAMAccountName 脆弱性パッチ (CVE-2021-42278/42287) を適用する' },
        detail: { zh: 'KB5008102、KB5008380', en: 'KB5008102, KB5008380', ja: 'KB5008102、KB5008380' },
        steps: [
          { type: 'cmd', text: '# 確認補丁已安裝\nGet-HotFix -Id KB5008102  # CVE-2021-42278\nGet-HotFix -Id KB5008380  # CVE-2021-42287' },
          { type: 'cmd', text: '# 確認 MachineAccountQuota 已降低（防止一般使用者建立電腦帳戶）\nGet-ADDomain | Select -Expand DistinguishedName | Get-ADObject -Properties ms-DS-MachineAccountQuota\n# 建議改為 0\nSet-ADDomain -Identity corp.local -Replace @{"ms-DS-MachineAccountQuota"=0}' },
          { type: 'cmd', text: '# 啟用「强制 DC 驗證電腦帳戶名稱」（需 2021-11 後的更新）\n# 以下補丁安裝後進入部署模式，2022-04 後強制啟用\nreg query "HKLM\\SYSTEM\\CurrentControlSet\\Services\\Kdc" /v SamAccountNameSuffix' }
        ]
      },
      {
        text: { zh: '確認 MS14-068 補丁已安裝', en: 'Confirm MS14-068 patch is installed', ja: 'MS14-068 パッチがインストールされていることを確認する' },
        detail: { zh: 'KB3011780，防止 Kerberos PAC 偽造', en: 'KB3011780; prevent Kerberos PAC forgery', ja: 'KB3011780; Kerberos PAC の偽造を防止する' },
        steps: [
          { type: 'cmd', text: '# 確認 KB3011780 已安裝\nGet-HotFix -Id KB3011780\n\n# 若系統已更新至 2014-11 之後的累積更新，此修補已包含在內\n(Get-HotFix | Sort InstalledOn -Descending | Select -First 1).InstalledOn' },
          { type: 'info', text: { zh: 'MS14-068 修補 Kerberos KDC 未驗證 PAC Checksum 的漏洞；任何 Windows Server 2012 R2 + 2014-11 之後的更新均已包含此修補', en: 'MS14-068 fixes the Kerberos KDC vulnerability that did not validate PAC checksums; any Windows Server 2012 R2 + updates after November 2014 already include this patch', ja: 'MS14-068 は Kerberos KDC が PAC チェックサムを検証しない脆弱性を修正します。Windows Server 2012 R2 および 2014 年 11 月以降のすべての更新プログラムにはこのパッチが含まれています' } },
          { type: 'cmd', text: '# 確認 DC 的 OS 版本與補丁狀態\nGet-ADDomainController -Filter * | Select Name,OperatingSystem,OperatingSystemVersion | Format-Table' }
        ]
      }
    ]
  },
  {
    category: { zh: '2026–2030 現代化 AD 安全強化', en: 'Modern AD Security Hardening (2026–2030)', ja: '2026–2030 年 AD セキュリティ近代化強化' },
    priority: 'high',
    items: [
      {
        text: { zh: '強制 Kerberos AES256 加密 / 停用 RC4-HMAC', en: 'Enforce Kerberos AES256 encryption and disable RC4-HMAC', ja: 'Kerberos AES256 暗号化を強制し RC4-HMAC を無効化する' },
        detail: { zh: 'Microsoft 已宣布逐步淘汰 RC4，2025 年後預設停用；提前強制 AES256 可有效防止 Kerberoasting 和票據偽造', en: 'Microsoft has announced gradual RC4 deprecation, disabled by default after 2025; enforcing AES256 early effectively prevents Kerberoasting and ticket forgery', ja: 'Microsoft は RC4 の段階的廃止を発表し、2025 年以降はデフォルトで無効化。早期に AES256 を強制することで Kerberoasting とチケット偽造を効果的に防止できる' },
        steps: [
          { type: 'cmd', text: '# 確認目前 KDC 支援的加密類型\nGet-ADDefaultDomainPasswordPolicy | Select *\nGet-ADDomainController -Filter * | ForEach-Object { Get-ADComputer $_.ComputerObjectDN -Properties msDS-SupportedEncryptionTypes | Select Name,"msDS-SupportedEncryptionTypes" }' },
          { type: 'cmd', text: '# 設定所有帳戶使用 AES128/AES256（排除 RC4 = 4）\n# msDS-SupportedEncryptionTypes：AES128=8, AES256=16, 合計=24\nGet-ADUser -Filter * | Set-ADUser -KerberosEncryptionType AES128,AES256' },
          { type: 'cmd', text: '# 確認 KrbSupportedEncryptionTypes GPO 設定\n# GPO 路徑: Computer Configuration → Windows Settings → Security Settings → Local Policies → Security Options\n# "Network security: Configure encryption types allowed for Kerberos" → 僅勾選 AES128_HMAC_SHA1, AES256_HMAC_SHA1, Future encryption types' },
          { type: 'info', text: { zh: '在強制 AES256 前，需確認環境中無 Windows XP/Server 2003 舊系統（不支援 AES）。Kerberoasting 最常利用 RC4 票據；停用後攻擊難度大幅提升', en: 'Before enforcing AES256, verify no legacy Windows XP/Server 2003 systems exist in the environment (they do not support AES). Kerberoasting most commonly exploits RC4 tickets; disabling RC4 greatly increases attack difficulty', ja: 'AES256 を強制する前に、環境内に Windows XP/Server 2003 などのレガシーシステムがないことを確認してください（AES 非対応）。Kerberoasting は RC4 チケットを最もよく悪用します。RC4 を無効化すると攻撃難度が大幅に上がります' } },
          { type: 'warn', text: { zh: '注意：停用 RC4 前務必先更新 krbtgt 帳戶以支援 AES；並驗證所有服務帳戶的 SPN 已設定 AES 加密', en: 'Warning: Before disabling RC4, update the krbtgt account to support AES and verify that all service account SPNs are configured for AES encryption', ja: '注意: RC4 を無効化する前に、krbtgt アカウントを AES に対応させ、すべてのサービスアカウント SPN が AES 暗号化に設定されていることを確認してください' } }
        ]
      },
      {
        text: { zh: '升級並啟用 Windows LAPS v2（內建 LAPS）', en: 'Upgrade to and enable Windows LAPS v2 (built-in LAPS)', ja: 'Windows LAPS v2（組み込み LAPS）にアップグレードして有効化する' },
        detail: { zh: 'Windows Server 2019/2022 + 2023-04 更新內建 Windows LAPS，支援 Entra ID 儲存、加密密碼及帳戶名稱輪換，取代舊版 Microsoft LAPS', en: 'Windows Server 2019/2022 with April 2023 update includes built-in Windows LAPS, supporting Entra ID storage, encrypted passwords, and account name rotation, replacing the legacy Microsoft LAPS', ja: 'Windows Server 2019/2022 の 2023 年 4 月更新で組み込み Windows LAPS が利用可能に。Entra ID ストレージ・暗号化パスワード・アカウント名ローテーションをサポートし、レガシー Microsoft LAPS を置き換える' },
        steps: [
          { type: 'cmd', text: '# 確認 Windows LAPS 已啟用（需 KB5025175 或更新的累積更新）\nGet-WindowsCapability -Online -Name "Rsat.ActiveDirectory*"\nImport-Module LAPS\nGet-LapsAADPassword  # 若使用 Entra ID 儲存模式' },
          { type: 'cmd', text: '# 更新 AD Schema 以支援 Windows LAPS（在 Schema Admin 帳戶下執行）\nUpdate-LapsADSchema' },
          { type: 'cmd', text: '# 設定 Windows LAPS GPO\n# 路徑: Computer Configuration → Administrative Templates → System → LAPS\n# 啟用: Configure password backup directory → Active Directory\n# 啟用: Enable password encryption → Enabled\n# 設定: Password Settings → 長度 ≥ 15, 複雜度 4, 最大效期 30 天\n# 啟用: Post-authentication actions → Reset password and sign out (3)' },
          { type: 'info', text: { zh: 'Windows LAPS v2 新功能：(1) 密碼在 AD 中加密儲存（需 Domain Functional Level 2016+）(2) 支援 Entra ID 和 AD 雙重備份 (3) 登入後自動輪換密碼 (4) 支援管理員帳戶名稱輪換防止暴力破解', en: 'Windows LAPS v2 new features: (1) Encrypted password storage in AD (requires DFL 2016+) (2) Support for both Entra ID and AD backup (3) Automatic post-authentication password rotation (4) Support for admin account name rotation to prevent brute force', ja: 'Windows LAPS v2 の新機能: (1) AD での暗号化パスワードストレージ（DFL 2016+ 必要）(2) Entra ID と AD の両方へのバックアップ対応 (3) 認証後の自動パスワードローテーション (4) ブルートフォース防止のための管理者アカウント名ローテーション対応' } },
          { type: 'cmd', text: '# 驗證密碼備份狀態\nGet-LapsADPassword -Identity "WORKSTATION01" -AsPlainText\n\n# 批次確認所有工作站是否已正確備份密碼\nGet-ADComputer -Filter * -SearchBase "OU=Workstations,DC=corp,DC=local" -Properties "ms-LAPS-PasswordExpirationTime" | Where-Object { $_."ms-LAPS-PasswordExpirationTime" -eq $null } | Select Name' }
        ]
      },
      {
        text: { zh: '啟用 Credential Guard（VBS 虛擬化安全性）', en: 'Enable Credential Guard (Virtualization-Based Security)', ja: 'Credential Guard（仮想化ベースのセキュリティ）を有効化する' },
        detail: { zh: '將 LSASS 移至 VTL1（Virtual Trust Level 1）隔離環境，防止 Mimikatz 等工具從記憶體提取明文密碼和 NTLM 雜湊值', en: 'Move LSASS to a VTL1 (Virtual Trust Level 1) isolated environment, preventing tools like Mimikatz from extracting plaintext passwords and NTLM hashes from memory', ja: 'LSASS を VTL1（仮想信頼レベル 1）の隔離環境に移行し、Mimikatz などのツールによるメモリからの平文パスワードや NTLM ハッシュの抽出を防止する' },
        steps: [
          { type: 'cmd', text: '# 確認硬體需求（需 UEFI + Secure Boot + VT-x/AMD-V + SLAT/EPT）\n(Get-WmiObject -Class Win32_ComputerSystem).HypervisorPresent\msinfo32  # 確認 Virtualization-based security: Running' },
          { type: 'info', text: { zh: 'GPO 路徑：Computer Configuration → Administrative Templates → System → Device Guard → Turn On Virtualization Based Security\n設定：(1) Select Platform Security Level: Secure Boot and DMA Protection (2) Credential Guard Configuration: Enabled with UEFI lock (3) Secure Launch Configuration: Enabled', en: 'GPO path: Computer Configuration → Administrative Templates → System → Device Guard → Turn On Virtualization Based Security\nSettings: (1) Select Platform Security Level: Secure Boot and DMA Protection (2) Credential Guard Configuration: Enabled with UEFI lock (3) Secure Launch Configuration: Enabled', ja: 'GPO パス: コンピューターの構成 → 管理用テンプレート → システム → Device Guard → 仮想化ベースのセキュリティを有効にする\n設定: (1) プラットフォームのセキュリティ レベルを選択: セキュア ブートと DMA 保護 (2) Credential Guard の構成: UEFI ロックで有効にする (3) セキュア ローンチの構成: 有効' } },
          { type: 'cmd', text: '# 使用 LGPO 或登錄方式啟用（須重新開機生效）\nreg add "HKLM\\SYSTEM\\CurrentControlSet\\Control\\DeviceGuard" /v EnableVirtualizationBasedSecurity /t REG_DWORD /d 1 /f\nreg add "HKLM\\SYSTEM\\CurrentControlSet\\Control\\DeviceGuard" /v RequirePlatformSecurityFeatures /t REG_DWORD /d 3 /f\nreg add "HKLM\\SYSTEM\\CurrentControlSet\\Control\\Lsa" /v LsaCfgFlags /t REG_DWORD /d 1 /f' },
          { type: 'cmd', text: '# 驗證 Credential Guard 已運行\n(Get-WmiObject -Class Win32_DeviceGuard -Namespace root\\Microsoft\\Windows\\DeviceGuard).SecurityServicesRunning\n# 2 = Credential Guard 已啟用並運行' },
          { type: 'warn', text: { zh: '注意：Credential Guard 啟用後，Kerberos 委派（unconstrained delegation）和 NTLMv1 將無法使用；測試環境中務必先驗證相容性', en: 'Warning: After enabling Credential Guard, Kerberos unconstrained delegation and NTLMv1 will not work; verify compatibility in a test environment first', ja: '注意: Credential Guard を有効化すると、Kerberos 無制限委任と NTLMv1 が使用不可になります。事前にテスト環境で互換性を確認してください' } }
        ]
      },
      {
        text: { zh: '實施 Enterprise Access Model（三層存取管理架構）', en: 'Implement Enterprise Access Model (three-tier access management)', ja: 'Enterprise Access Model（三層アクセス管理アーキテクチャ）を実装する' },
        detail: { zh: 'Microsoft 於 2022 年更新的 Tiered Administration Model，將管理存取分為 Control Plane / Management Plane / User Access Plane 三層，搭配 PAW（Privileged Access Workstation）', en: 'Microsoft updated Tiered Administration Model (2022), dividing management access into Control Plane, Management Plane, and User Access Plane, combined with PAW (Privileged Access Workstation)', ja: 'Microsoft が 2022 年に更新した階層管理モデルで、管理アクセスをコントロール プレーン・管理プレーン・ユーザー アクセス プレーンの 3 層に分割し、PAW（特権アクセス ワークステーション）と組み合わせる' },
        steps: [
          { type: 'info', text: { zh: '三層架構定義：\n① Control Plane（舊 Tier 0）：網域控制器、AD、PKI、Entra ID Connect — 僅可從 PAW 存取\n② Management Plane（舊 Tier 1）：伺服器、雲端資源管理 — 使用專屬 Tier 1 管理帳戶\n③ User Access Plane（舊 Tier 2）：工作站、一般使用者資源', en: 'Three-tier architecture definition:\n① Control Plane (formerly Tier 0): Domain Controllers, AD, PKI, Entra ID Connect — accessible only from PAW\n② Management Plane (formerly Tier 1): Servers, cloud resource management — use dedicated Tier 1 admin accounts\n③ User Access Plane (formerly Tier 2): Workstations, general user resources', ja: '三層アーキテクチャの定義:\n① コントロール プレーン（旧 Tier 0）: ドメインコントローラー・AD・PKI・Entra ID Connect — PAW からのみアクセス可能\n② 管理プレーン（旧 Tier 1）: サーバー・クラウドリソース管理 — 専用の Tier 1 管理アカウントを使用\n③ ユーザー アクセス プレーン（旧 Tier 2）: ワークステーション・一般ユーザーリソース' } },
          { type: 'cmd', text: '# 建立各層 OU 結構\nNew-ADOrganizationalUnit -Name "Control-Plane-Admins" -Path "OU=AdminAccounts,DC=corp,DC=local"\nNew-ADOrganizationalUnit -Name "Management-Plane-Admins" -Path "OU=AdminAccounts,DC=corp,DC=local"\n\n# 建立各層專屬管理帳戶（禁止跨層登入）\nNew-ADUser -Name "adm-t0-alice" -SamAccountName "adm-t0-alice" -UserPrincipalName "adm-t0-alice@corp.local" -Path "OU=Control-Plane-Admins,OU=AdminAccounts,DC=corp,DC=local" -AccountPassword (ConvertTo-SecureString "P@ssw0rd123!" -AsPlainText -Force) -Enabled $true' },
          { type: 'cmd', text: '# 建立 GPO 防止 Tier 0 帳戶登入低層系統（User Rights: Deny logon locally）\n# 針對工作站 GPO 加入：\n# Computer Configuration → Windows Settings → Security Settings → Local Policies → User Rights Assignment\n# "Deny log on locally" → 加入 Control-Plane-Admins 群組' },
          { type: 'info', text: { zh: 'PAW 建議：使用專用實體工作站或硬體隔離 VM；禁止瀏覽網際網路、收發 Email；啟用 Windows Defender Application Control (WDAC)；搭配 MFA', en: 'PAW recommendations: Use dedicated physical workstations or hardware-isolated VMs; prohibit internet browsing and email; enable Windows Defender Application Control (WDAC); combine with MFA', ja: 'PAW の推奨: 専用の物理ワークステーションまたはハードウェア分離 VM を使用。インターネット閲覧・メール禁止。Windows Defender Application Control (WDAC) を有効化。MFA と組み合わせる' } }
        ]
      },
      {
        text: { zh: '部署無密碼驗證（FIDO2 / Windows Hello for Business）', en: 'Deploy passwordless authentication (FIDO2 / Windows Hello for Business)', ja: 'パスワードレス認証（FIDO2 / Windows Hello for Business）を展開する' },
        detail: { zh: '消除密碼竊取攻擊的根源；WHfB 使用 TPM 綁定的非對稱金鑰取代密碼，FIDO2 安全金鑰支援完全無密碼登入', en: 'Eliminate the root cause of credential theft attacks; WHfB uses TPM-bound asymmetric keys to replace passwords, and FIDO2 security keys support fully passwordless login', ja: '認証情報窃取攻撃の根本原因を排除。WHfB は TPM バインドされた非対称鍵でパスワードを置き換え、FIDO2 セキュリティキーは完全なパスワードレスログインをサポートする' },
        steps: [
          { type: 'info', text: { zh: 'Windows Hello for Business（WHfB）需求：(1) Windows 10 1703+ / Windows 11 (2) TPM 2.0（建議）或 TPM 1.2 (3) Azure AD / Entra ID 或 AD Domain Functional Level 2016 (4) PKI 或 Entra ID Certificate-based auth', en: 'Windows Hello for Business (WHfB) requirements: (1) Windows 10 1703+ / Windows 11 (2) TPM 2.0 (recommended) or TPM 1.2 (3) Azure AD / Entra ID or AD Domain Functional Level 2016 (4) PKI or Entra ID Certificate-based auth', ja: 'Windows Hello for Business (WHfB) の要件: (1) Windows 10 1703+ / Windows 11 (2) TPM 2.0（推奨）または TPM 1.2 (3) Azure AD / Entra ID または AD ドメイン機能レベル 2016 (4) PKI または Entra ID 証明書ベースの認証' } },
          { type: 'cmd', text: '# 啟用 WHfB（Cloud Trust 模式，最簡單的混合部署）\n# 需求：Entra ID Connect + Windows Server 2016 DC + Windows 10 21H2+\n# GPO 路徑：Computer Configuration → Administrative Templates → Windows Components → Windows Hello for Business\n# 設定：Use Windows Hello for Business → Enabled\n# 設定：Use cloud trust for on-premises authentication → Enabled' },
          { type: 'cmd', text: '# 確認 TPM 狀態\nGet-Tpm\n\n# 確認 WHfB 已啟用\nGet-WmiObject -Class Win32_PinGesture -Namespace root\\Microsoft\\Windows\\Biometric 2>$null || Write-Host "使用 Intune/GPO 確認 WHfB 部署狀態"' },
          { type: 'info', text: { zh: 'FIDO2 安全金鑰（YubiKey、Feitian 等）：適合無 TPM 裝置或 Kiosk 模式；在 Entra ID 中啟用 FIDO2 Authentication Method Policy，搭配條件式存取要求強身份驗證', en: 'FIDO2 security keys (YubiKey, Feitian, etc.): Suitable for devices without TPM or Kiosk mode; enable FIDO2 Authentication Method Policy in Entra ID and combine with Conditional Access to require strong authentication', ja: 'FIDO2 セキュリティキー（YubiKey、Feitian など）: TPM のないデバイスやキオスクモードに適しています。Entra ID で FIDO2 認証方法ポリシーを有効化し、強力な認証を要求する条件付きアクセスと組み合わせてください' } },
          { type: 'warn', text: { zh: '注意：WHfB 不儲存密碼，但 AD 仍保有密碼雜湊值，需同步強化 Kerberos AES 與 Credential Guard 防止雜湊竊取', en: 'Warning: WHfB does not store passwords, but AD still retains password hashes; also harden Kerberos AES and Credential Guard to prevent hash theft', ja: '注意: WHfB はパスワードを保存しませんが、AD にはパスワードハッシュが残ります。ハッシュ窃取を防ぐために Kerberos AES と Credential Guard も強化してください' } }
        ]
      },
      {
        text: { zh: '啟用 AD CS 強化設定（Certifried / ESC 後補強）', en: 'Apply AD CS hardening (post-Certifried / ESC mitigations)', ja: 'AD CS のセキュリティ強化（Certifried / ESC 対応）を適用する' },
        detail: { zh: '2022 年 Certifried（CVE-2022-26923）及早期 ESC1-8 漏洞揭露了 AD CS 的嚴重風險；需全面審查 CA 設定、憑證範本與 Web 註冊端點', en: 'The 2022 Certifried (CVE-2022-26923) and earlier ESC1-8 vulnerabilities exposed critical AD CS risks; requires a comprehensive review of CA configuration, certificate templates, and web enrollment endpoints', ja: '2022 年の Certifried（CVE-2022-26923）と ESC1-8 の脆弱性は AD CS の深刻なリスクを明らかにした。CA 設定・証明書テンプレート・Web 登録エンドポイントの包括的な見直しが必要' },
        steps: [
          { type: 'cmd', text: '# 使用 Certipy 全面稽核 AD CS 設定\n# pip install certipy-ad\ncertipy find -u "auditor@corp.local" -p "Password" -dc-ip 192.168.1.1 -vulnerable' },
          { type: 'cmd', text: '# 使用 Locksmith 快速尋找和修復常見 AD CS 錯誤設定\n# Install-Module -Name Locksmith\nImport-Module Locksmith\nInvoke-Locksmith -Mode 0  # 稽核模式\nInvoke-Locksmith -Mode 1  # 自動修復（先在測試環境執行）' },
          { type: 'info', text: { zh: 'AD CS 高風險設定清單（務必逐一確認）：\n① 停用 Web 登錄端點（http://ca/certsrv）或改用 HTTPS + EPA（Extended Protection for Authentication）\n② 移除憑證範本的「Subject Alternative Name (SAN)」可由申請人指定的設定\n③ 確認 CA 伺服器不允許 NTLM 中繼（啟用 EPA / Require SSL）\n④ 限制「Enroll」權限，避免 Authenticated Users 可申請高權限憑證\n⑤ 停用 ESC1/ESC2/ESC4/ESC6 相關高危設定', en: 'AD CS high-risk configuration checklist (verify each one):\n① Disable web enrollment endpoint (http://ca/certsrv) or switch to HTTPS + EPA (Extended Protection for Authentication)\n② Remove certificate template settings that allow applicants to specify Subject Alternative Names (SAN)\n③ Ensure CA servers do not allow NTLM relay (enable EPA / Require SSL)\n④ Restrict "Enroll" permissions so Authenticated Users cannot request high-privilege certificates\n⑤ Disable high-risk settings related to ESC1/ESC2/ESC4/ESC6', ja: 'AD CS 高リスク設定チェックリスト（各項目を確認してください）:\n① Web 登録エンドポイント（http://ca/certsrv）を無効化するか、HTTPS + EPA（拡張保護認証）に切り替える\n② 申請者が SAN（サブジェクト代替名）を指定できる証明書テンプレート設定を削除する\n③ CA サーバーで NTLM リレーを許可しないことを確認する（EPA を有効化 / SSL を必須にする）\n④ Authenticated Users が高権限証明書を申請できないよう「Enroll」権限を制限する\n⑤ ESC1/ESC2/ESC4/ESC6 関連の高リスク設定を無効化する' } },
          { type: 'cmd', text: '# 針對 Web 登錄啟用 EPA（Extended Protection for Authentication）\n# 在 CA Web 伺服器（IIS）的應用程式 certsrv 設定：\nImport-Module WebAdministration\nSet-WebConfigurationProperty -Filter "system.webServer/security/authentication/windowsAuthentication" -Name "extendedProtection.tokenChecking" -Value "Require" -PSPath "IIS:\\Sites\\Default Web Site\\certsrv"' }
        ]
      },
      {
        text: { zh: '部署 Microsoft Sentinel 進行 AD 威脅偵測', en: 'Deploy Microsoft Sentinel for AD threat detection', ja: 'Microsoft Sentinel を展開して AD 脅威を検知する' },
        detail: { zh: '整合 Microsoft Defender for Identity（MDI）、Microsoft Entra ID Protection 和 Microsoft Sentinel，實現跨身份平台的統一威脅偵測與回應', en: 'Integrate Microsoft Defender for Identity (MDI), Microsoft Entra ID Protection, and Microsoft Sentinel for unified threat detection and response across identity platforms', ja: 'Microsoft Defender for Identity（MDI）・Microsoft Entra ID Protection・Microsoft Sentinel を統合し、アイデンティティ プラットフォーム全体で統一された脅威検知と対応を実現する' },
        steps: [
          { type: 'info', text: { zh: 'Microsoft Defender for Identity（MDI）部署步驟：\n① 在 Microsoft 365 Defender 入口網站建立 MDI 工作區\n② 在所有 DC 安裝 MDI 感應器（Sensor）\n③ 設定 Directory Services Account 讀取 AD 事件\n④ 啟用 Lateral Movement Paths 分析', en: 'Microsoft Defender for Identity (MDI) deployment steps:\n① Create an MDI workspace in the Microsoft 365 Defender portal\n② Install the MDI sensor on all Domain Controllers\n③ Configure the Directory Services Account to read AD events\n④ Enable Lateral Movement Paths analysis', ja: 'Microsoft Defender for Identity（MDI）の展開手順:\n① Microsoft 365 Defender ポータルで MDI ワークスペースを作成\n② すべての DC に MDI センサーをインストール\n③ Directory Services Account を AD イベント読み取り用に設定\n④ Lateral Movement Paths 分析を有効化' } },
          { type: 'cmd', text: '# 安裝 MDI 感應器（在每台 DC 上執行）\n# 1. 從 MDI 入口下載感應器安裝檔\n# 2. 靜默安裝\nAzure-AdvancedThreatProtection.exe /quiet NetFrameworkCommandLineArguments="/q" AccessKey="<your-access-key>"' },
          { type: 'info', text: { zh: 'Microsoft Sentinel AD 連接器：\n① Microsoft Defender for Identity 連接器（即時 AD 攻擊告警）\n② Windows Security Events（Event ID 4624/4625/4662/4769 等）\n③ Azure Active Directory（Entra ID）登入日誌\n④ Microsoft Entra ID Protection（Identity Risk 事件）', en: 'Microsoft Sentinel AD connectors:\n① Microsoft Defender for Identity connector (real-time AD attack alerts)\n② Windows Security Events (Event IDs 4624/4625/4662/4769, etc.)\n③ Azure Active Directory (Entra ID) sign-in logs\n④ Microsoft Entra ID Protection (Identity Risk events)', ja: 'Microsoft Sentinel AD コネクター:\n① Microsoft Defender for Identity コネクター（リアルタイム AD 攻撃アラート）\n② Windows セキュリティ イベント（Event ID 4624/4625/4662/4769 など）\n③ Azure Active Directory（Entra ID）サインイン ログ\n④ Microsoft Entra ID Protection（Identity リスク イベント）' } },
          { type: 'cmd', text: '# 在 Sentinel 中啟用 MDI 相關偵測規則\n# 使用 Microsoft Sentinel Analytics 規則（內建 AD 威脅偵測）：\n# - "Suspected DCSync attack (replication of directory services)" \n# - "Suspected Golden ticket usage (forged authorization data)"\n# - "Suspected identity theft (pass-the-hash)"\n# - "Suspicious additions to privileged groups"\n# 路徑：Microsoft Sentinel → Analytics → Rule Templates → 搜尋 "Identity"' },
          { type: 'warn', text: { zh: '注意：MDI 需要 DC 上有足夠的事件日誌儲存空間（建議 Security Log 最大 4GB）；並確認 Directory Services Account 具備讀取 SAMR 的權限', en: 'Warning: MDI requires sufficient event log storage on DCs (recommended Security Log maximum 4 GB); also ensure the Directory Services Account has SAMR read permissions', ja: '注意: MDI は DC に十分なイベント ログ ストレージが必要です（セキュリティ ログの最大値を 4GB 推奨）。Directory Services Account が SAMR 読み取り権限を持っていることも確認してください' } }
        ]
      },
      {
        text: { zh: '實施 Entra ID 混合加入 + Cloud Kerberos Trust', en: 'Implement Entra ID hybrid join with Cloud Kerberos Trust', ja: 'Entra ID ハイブリッド参加 + Cloud Kerberos Trust を実装する' },
        detail: { zh: 'Cloud Kerberos Trust（2022 年推出）讓混合加入裝置可用 WHfB 存取內部資源，無需傳統憑證信任；大幅降低 PKI 複雜度', en: 'Cloud Kerberos Trust (introduced 2022) allows hybrid-joined devices to use WHfB to access on-premises resources without traditional certificate trust, greatly reducing PKI complexity', ja: 'Cloud Kerberos Trust（2022 年導入）により、ハイブリッド参加デバイスが従来の証明書信頼なしで WHfB を使って社内リソースにアクセスできるようになり、PKI の複雑さが大幅に低減する' },
        steps: [
          { type: 'info', text: { zh: 'Cloud Kerberos Trust 需求：\n① Windows 11 21H2+ 或 Windows 10 21H2+ (KB5010415)\n② Entra ID Connect 2.0.89.0 或以上\n③ Windows Server 2016+ 網域控制器\n④ Entra ID P1/P2 授權', en: 'Cloud Kerberos Trust requirements:\n① Windows 11 21H2+ or Windows 10 21H2+ (KB5010415)\n② Entra ID Connect 2.0.89.0 or later\n③ Windows Server 2016+ Domain Controllers\n④ Entra ID P1/P2 license', ja: 'Cloud Kerberos Trust の要件:\n① Windows 11 21H2+ または Windows 10 21H2+（KB5010415）\n② Entra ID Connect 2.0.89.0 以降\n③ Windows Server 2016+ ドメインコントローラー\n④ Entra ID P1/P2 ライセンス' } },
          { type: 'cmd', text: '# 步驟1：在 Entra ID 建立 Kerberos Server 物件\n# 安裝 AzureADHybridAuthenticationManagement 模組\nInstall-Module -Name AzureADHybridAuthenticationManagement -AllowClobber\n\n# 建立 Kerberos 伺服器物件（需 Domain Admin 和 Global Admin 權限）\nSet-AzureADKerberosServer -Domain corp.local -CloudCredential $cloudCredential -DomainCredential $domainCredential' },
          { type: 'cmd', text: '# 步驟2：啟用 WHfB Cloud Trust GPO\n# GPO 路徑：Computer Configuration → Administrative Templates → Windows Components → Windows Hello for Business\n# "Use cloud trust for on-premises authentication" → Enabled\n\n# 步驟3：確認 Kerberos 伺服器物件已建立\nGet-AzureADKerberosServer -Domain corp.local -CloudCredential $cloudCredential -DomainCredential $domainCredential' },
          { type: 'info', text: { zh: '相比傳統憑證信任：Cloud Kerberos Trust 不需要 AD FS 或 PKI 基礎架構，大幅簡化部署；Entra ID 作為 Kerberos 代理頒發 TGT，安全性更高', en: 'Compared to traditional certificate trust: Cloud Kerberos Trust does not require AD FS or PKI infrastructure, greatly simplifying deployment; Entra ID acts as a Kerberos proxy to issue TGTs with improved security', ja: '従来の証明書信頼との比較: Cloud Kerberos Trust は AD FS や PKI インフラを必要とせず、展開を大幅に簡素化。Entra ID が Kerberos プロキシとして TGT を発行することでセキュリティが向上する' } }
        ]
      },
      {
        text: { zh: '定期執行 AD 攻擊路徑分析（BloodHound / Purple Knight）', en: 'Regularly run AD attack path analysis (BloodHound / Purple Knight)', ja: '定期的に AD 攻撃経路分析（BloodHound / Purple Knight）を実施する' },
        detail: { zh: '每季至少一次主動演練 BloodHound 攻擊路徑分析，找出域管理員的最短路徑並提前修補', en: 'Conduct BloodHound attack path analysis at least quarterly to proactively identify the shortest path to Domain Admin and remediate in advance', ja: '少なくとも四半期に一度、BloodHound 攻撃経路分析を積極的に実施し、Domain Admin への最短経路を発見して事前に修正する' },
        steps: [
          { type: 'cmd', text: '# 使用 SharpHound 收集 AD 資料（在測試帳戶下執行）\n# 下載 SharpHound.exe\n.\\SharpHound.exe -c All --zipfilename corp_bloodhound_$(Get-Date -Format "yyyyMMdd").zip' },
          { type: 'cmd', text: '# 啟動 BloodHound 分析\n# 將 zip 檔匯入 BloodHound GUI\n# 執行重要查詢：\n# ① Find Shortest Paths to Domain Admins\n# ② Find all Domain Admins\n# ③ Find Principals with DCSync Rights\n# ④ Shortest Paths to Unconstrained Delegation Systems\n# ⑤ Find Computers where Domain Users are Local Admin' },
          { type: 'cmd', text: '# 使用 Purple Knight 執行評估（不需 BloodHound 環境）\n# 下載並執行 PurpleKnight.exe（需要 AD 讀取權限）\n.\\PurpleKnight.exe -outputformat HTML -output .\\pk_report_$(Get-Date -Format "yyyyMMdd")' },
          { type: 'info', text: { zh: '建議建立「Purple Team 演練行事曆」：\n① 每季：BloodHound 攻擊路徑全掃描 + 修補報告\n② 每月：PingCastle 評分追蹤\n③ 每週：新建立的高權限群組成員審查\n④ 每日：MDI 告警回顧（透過 Microsoft Sentinel）', en: 'Recommend establishing a "Purple Team Exercise Calendar":\n① Quarterly: Full BloodHound attack path scan + remediation report\n② Monthly: PingCastle score tracking\n③ Weekly: Review of newly created privileged group members\n④ Daily: MDI alert review (via Microsoft Sentinel)', ja: '「パープルチーム演習カレンダー」の設立を推奨:\n① 四半期ごと: BloodHound による攻撃経路の全スキャン + 修正レポート\n② 毎月: PingCastle スコアの追跡\n③ 毎週: 新規に作成された特権グループメンバーのレビュー\n④ 毎日: MDI アラートのレビュー（Microsoft Sentinel 経由）' } }
        ]
      }
    ]
  }
];
