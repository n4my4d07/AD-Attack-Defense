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
          { title: 'Finding Sensitive Data on Domain SQL Servers using PowerUpSQL', url: 'https://www.netspi.com/blog/technical-blog/network-pentesting/finding-sensitive-data-domain-sql-servers-using-powerupsql/' },
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
          { title: 'Using PowerShell to Identify Federated Domains', url: 'https://www.netspi.com/blog/technical-blog/cloud-pentesting/using-powershell-identify-federated-domains/' }
        ]
      },
      {
        name: 'ADIDNS Enumeration',
        description: { zh: '列舉 Active Directory 整合 DNS 區域，找出主機名稱、IP 與隱藏服務', en: 'Enumerate Active Directory Integrated DNS zones to discover hostnames, IPs, and hidden services', ja: 'Active Directory 統合 DNS ゾーンを列挙してホスト名・IP・隠れたサービスを発見する' },
        tools: ['adidnsdump', 'dnstool.py', 'Powermad'],
        resources: [
          { title: 'Getting in the Zone: Dumping Active Directory DNS using adidnsdump', url: 'https://dirkjanm.io/getting-in-the-zone-dumping-active-directory-dns-with-adidnsdump/' },
          { title: 'Beyond LLMNR/NBNS Spoofing – Exploiting Active Directory-Integrated DNS', url: 'https://www.netspi.com/blog/technical-blog/network-pentesting/exploiting-adidns/' }
        ]
      },
      {
        name: 'Password Policy & Badpwdcount Enumeration',
        description: { zh: '列舉網域密碼原則（最小長度、鎖定閾值、觀察期）及各帳戶的 badPwdCount 值，規劃密碼噴灑攻擊而不觸發帳戶鎖定', en: 'Enumerate domain password policies (minimum length, lockout threshold, observation window) and per-account badPwdCount values to plan password spraying without triggering lockouts', ja: 'ドメインのパスワードポリシー（最小長・ロックアウト閾値・観察ウィンドウ）および各アカウントの badPwdCount 値を列挙し、アカウントロックアウトを引き起こさずにパスワードスプレーを計画する' },
        tools: ['PowerView', 'ldapdomaindump', 'netexec (nxc)'],
        resources: [
          { title: 'Password Policy Enumeration – Hacker Recipes', url: 'https://www.thehacker.recipes/ad/recon/password-policy' },
          { title: 'Enumerating AD Fine-Grained Password Policies', url: 'https://blog.harmj0y.net/activedirectory/a-password-policy-is-not-the-only-thing-that-matters/' }
        ]
      },
      {
        name: 'Trust Enumeration',
        description: { zh: '列舉 AD 網域與林的信任關係（雙向、單向、跨林），識別可供橫向移動或提權的信任路徑', en: 'Enumerate AD domain and forest trust relationships (bidirectional, one-way, cross-forest) to identify trust paths exploitable for lateral movement or privilege escalation', ja: 'AD ドメインとフォレストの信頼関係（双方向・一方向・クロスフォレスト）を列挙し、横移動や権限昇格に悪用できる信頼パスを特定する' },
        tools: ['PowerView', 'BloodHound', 'netexec (nxc)'],
        resources: [
          { title: 'A Guide to Attacking Domain Trusts', url: 'https://blog.harmj0y.net/redteaming/a-guide-to-attacking-domain-trusts/' },
          { title: 'Trust Direction and Transitivity', url: 'https://adsecurity.org/?p=1588' },
          { title: 'BloodHound – Abusing Active Directory Trust Relationships', url: 'https://posts.specterops.io/not-a-security-boundary-breaking-forest-trusts-cd125829518d' }
        ]
      },
      {
        name: 'Unconstrained Delegation Target Discovery',
        description: { zh: '找出 AD 中設有「無限制委派（Unconstrained Delegation）」的電腦帳戶或使用者帳戶；這些主機一旦接受 Coercion（PrinterBug / PetitPotam / Coercer）攻擊，即會自動向攻擊者提交 DC 的 TGT，是高價值攻擊目標的首要偵察步驟', en: 'Identify computer and user accounts configured with Unconstrained Delegation in Active Directory. These hosts automatically forward DC TGTs to attackers when subjected to coercion attacks (PrinterBug/PetitPotam/Coercer), making them prime high-value targets and the first step of the coercion attack chain.', ja: 'Active Directory 内で無制限委任（Unconstrained Delegation）が設定されたコンピューター・ユーザーアカウントを特定する。これらのホストは強制認証攻撃（PrinterBug・PetitPotam・Coercer）を受けると DC の TGT を自動転送するため、高価値攻撃目標の偵察として最初のステップとなる。' },
        tools: ['PowerView', 'BloodHound', 'ldapdomaindump'],
        resources: [
          { title: 'HackTricks – Unconstrained Delegation', url: 'https://book.hacktricks.xyz/windows-hardening/active-directory-methodology/unconstrained-delegation' },
          { title: 'Hunting for Unconstrained Delegation with PowerView', url: 'https://blog.harmj0y.net/redteaming/the-printer-bug/' },
          { title: 'Taming the Beast – Turning Unconstrained Delegation to Full Compromise', url: 'https://dirkjanm.io/krbrelayx-unconstrained-delegation-abuse-toolkit/' }
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
        name: 'sAMAccountName Spoofing / noPac (CVE-2021-42278 + CVE-2021-42287)',
        description: { zh: '兩個 CVE 組合成 noPac 攻擊鏈：CVE-2021-42278 允許電腦帳戶名稱省略末尾「$」（冒充 DC 名稱），CVE-2021-42287 使 KDC 在找不到帳戶時自動補上「$」重試 TGT 申請，導致攻擊者建立的電腦帳戶取得 DC 身份的 TGT；noPac 工具鏈在數秒內從標準網域使用者提升至域管理員，CVSS 9.8', en: 'Two CVEs combine to form the noPac attack chain: CVE-2021-42278 allows computer account names to omit the trailing "$" (impersonating a DC name), while CVE-2021-42287 causes the KDC to automatically retry TGT requests by appending "$" when the account is not found — causing an attacker-created computer account to receive a DC-identity TGT. The noPac toolchain escalates from a standard domain user to Domain Admin in seconds (CVSS 9.8).', ja: '2 つの CVE が noPac 攻撃チェーンを形成する。CVE-2021-42278 はコンピューターアカウント名の末尾「$」省略（DC 名を偽装）を許可し、CVE-2021-42287 は KDC がアカウント未発見時に「$」付きで TGT リクエストを自動リトライする動作を悪用する。これにより攻撃者作成のコンピューターアカウントが DC 身元の TGT を取得。noPac ツールチェーンで標準ドメインユーザーから数秒でドメイン管理者に昇格（CVSS 9.8）。' },
        tools: ['noPac', 'sam-the-admin', 'Impacket'],
        cves: ['CVE-2021-42287', 'CVE-2021-42278'],
        resources: [
          { title: 'CVE-2021-42287/CVE-2021-42278 Weaponisation – noPac chain explained', url: 'https://exploit.ph/cve-2021-42287-cve-2021-42278-weaponisation.html' },
          { title: 'sAMAccountName Spoofing – The Hacker Recipes', url: 'https://www.thehacker.recipes/ad/movement/kerberos/samaccountname-spoofing' },
          { title: 'noPac: Exploit the Latest Microsoft AD Vulnerabilities – CrowdStrike', url: 'https://www.crowdstrike.com/blog/nopac-exploit-latest-microsoft-ad-flaw-may-lead-to-total-domain-compromise-in-seconds/' }
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
          { title: 'Abusing GPO Permissions', url: 'https://blog.harmj0y.net/redteaming/abusing-gpo-permissions/' },
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
      },
      {
        name: 'Print Spooler Service Abuse',
        description: { zh: '利用 Windows Print Spooler 服務強制 DC 發起 NTLM 認證（SpoolSample/PrinterBug），或配合 PrintNightmare（CVE-2021-34527）直接提權；常作為 Coercion 攻擊的入口點', en: "Abuses Windows Print Spooler to coerce DC NTLM authentication (SpoolSample/PrinterBug), or exploits PrintNightmare (CVE-2021-34527) for direct privilege escalation. Commonly used as the entry point for coercion attacks.", ja: 'Windows Print Spooler を悪用して DC の NTLM 認証を強制（SpoolSample/PrinterBug）、または PrintNightmare（CVE-2021-34527）で直接特権昇格。強制認証攻撃の入口点として頻繁に使用。' },
        tools: ['Coercer', 'Impacket'],
        cves: ['CVE-2021-34527'],
        resources: [{ title: 'MITRE ATT&CK T1547.012', url: 'https://attack.mitre.org/techniques/T1547/012/' }, { title: 'SpoolSample – @tifkin_', url: 'https://github.com/leechristensen/SpoolSample' }]
      },
      {
        name: 'Passwords in SYSVOL / Group Policy Preferences',
        description: { zh: 'MS14-025（CVE-2014-1812）：舊版 GPP（cpassword）使用固定 AES 金鑰加密，微軟已公開此金鑰；任何網域使用者均可讀取 SYSVOL 中的 Groups.xml、Services.xml 等檔案，解密後取得明文密碼', en: 'MS14-025 (CVE-2014-1812): Legacy GPP cpassword fields use a fixed AES key published by Microsoft. Any domain user can read SYSVOL files (Groups.xml, Services.xml, etc.) and decrypt credentials in plaintext.', ja: 'MS14-025（CVE-2014-1812）: 旧来の GPP cpassword はマイクロソフトが公開済みの固定 AES キーで暗号化。任意のドメインユーザーが SYSVOL 内のファイル（Groups.xml・Services.xml など）を読んで平文パスワードを復号できる。' },
        tools: ['PowerView', 'Impacket', 'netexec (nxc)'],
        cves: ['CVE-2014-1812'],
        resources: [
          { title: 'Finding Passwords in SYSVOL & Exploiting Group Policy Preferences', url: 'https://adsecurity.org/?p=2288' },
          { title: 'MS14-025: Vulnerability in Group Policy Preferences Could Allow Elevation of Privilege', url: 'https://learn.microsoft.com/en-us/security-updates/SecurityBulletins/2014/ms14-025' },
          { title: 'Get-GPPPassword – PowerSploit', url: 'https://github.com/PowerShellMafia/PowerSploit/blob/master/Exfiltration/Get-GPPPassword.ps1' }
        ]
      },
      {
        name: 'MS14-068 (Kerberos PAC Bypass)',
        description: { zh: 'CVE-2014-6324：Kerberos KDC 未驗證 PAC（Privilege Attribute Certificate）簽章，允許任意網域使用者偽造含域管理員 SID 的 PAC，取得域管理員 Kerberos 票據', en: 'CVE-2014-6324: The Kerberos KDC does not validate PAC (Privilege Attribute Certificate) signatures, allowing any domain user to forge a PAC containing Domain Admin SIDs and obtain Domain Admin Kerberos tickets.', ja: 'CVE-2014-6324: Kerberos KDC が PAC（特権属性証明書）署名を検証しないため、任意のドメインユーザーがドメイン管理者 SID を含む PAC を偽造して Kerberos チケットを取得できる。' },
        tools: ['Impacket', 'PyKEK'],
        cves: ['CVE-2014-6324'],
        resources: [
          { title: 'MS14-068: Vulnerability in Kerberos Could Allow Elevation of Privilege', url: 'https://learn.microsoft.com/en-us/security-updates/securitybulletins/2014/ms14-068' },
          { title: 'Digging into MS14-068, Exploitation and Defence', url: 'https://labs.withsecure.com/publications/digging-into-ms14-068-exploitation-and-defence' },
          { title: 'PyKEK – Python Kerberos Exploitation Kit', url: 'https://github.com/SecWiki/windows-kernel-exploits/tree/master/MS14-068/pykek' }
        ]
      },
      {
        name: 'Backup Operators / SeBackupPrivilege Abuse',
        description: { zh: 'Backup Operators 群組成員擁有 SeBackupPrivilege 與 SeRestorePrivilege；利用此特權可繞過 NTFS ACL，備份 NTDS.dit 與 SYSTEM 登錄機碼，離線提取所有網域帳戶雜湊，達成與 DCSync 相同效果但不需要複寫權限', en: 'Members of the Backup Operators group hold SeBackupPrivilege and SeRestorePrivilege. These allow bypassing NTFS ACLs to back up NTDS.dit and the SYSTEM registry hive, then extract all domain account hashes offline — achieving the same result as DCSync without requiring replication rights.', ja: 'Backup Operators グループのメンバーは SeBackupPrivilege と SeRestorePrivilege を保有する。これにより NTFS ACL をバイパスして NTDS.dit と SYSTEM レジストリハイブをバックアップし、全ドメインアカウントのハッシュをオフラインで抽出できる。複製権限なしに DCSync と同等の結果が得られる。' },
        tools: ['BackupOperatorToDA', 'Impacket', 'SeBackupPrivilegeCmdLets'],
        resources: [
          { title: 'HackTricks – Backup Operators Group', url: 'https://book.hacktricks.xyz/windows-hardening/active-directory-methodology/privileged-groups-and-token-privileges#backup-operators' },
          { title: 'Backup Operator Privilege Escalation – PentestLab', url: 'https://pentestlab.blog/2024/01/22/domain-escalation-backup-operator/' },
          { title: 'BackupOperatorToDA GitHub', url: 'https://github.com/mpgn/BackupOperatorToDA' }
        ]
      },
      {
        name: 'Built-in Groups Abuse (Server / Account / Print Operators)',
        description: { zh: '三個內建群組各有獨特提權路徑：Server Operators 可修改服務二進位路徑以 SYSTEM 執行任意程式；Account Operators 可建立帳戶並修改非受保護群組；Print Operators 擁有 SeLoadDriverPrivilege，可載入惡意驅動程式提升至 SYSTEM', en: 'Three built-in groups each provide distinct escalation paths: Server Operators can modify service binary paths to execute arbitrary code as SYSTEM; Account Operators can create accounts and modify unprotected groups; Print Operators hold SeLoadDriverPrivilege to load malicious kernel drivers and escalate to SYSTEM.', ja: '3 つの組み込みグループはそれぞれ独自の昇格経路を持つ。Server Operators はサービスのバイナリパスを変更して SYSTEM として任意コードを実行でき、Account Operators はアカウント作成と非保護グループの変更が可能、Print Operators は SeLoadDriverPrivilege で悪意のあるカーネルドライバーを読み込んで SYSTEM に昇格できる。' },
        tools: ['sc.exe', 'PowerView', 'SharpServiceHijack'],
        resources: [
          { title: 'HackTricks – Privileged AD Groups', url: 'https://book.hacktricks.xyz/windows-hardening/active-directory-methodology/privileged-groups-and-token-privileges' },
          { title: 'Server Operators Group – Lateral Movement to DA', url: 'https://cube0x0.github.io/Pocing-Beyond-DA/' },
          { title: 'Print Operators Group – SeLoadDriverPrivilege Abuse', url: 'https://www.tarlogic.com/blog/seloaddriverprivilege-privilege-escalation/' }
        ]
      },
      {
        name: 'KrbRelayUp (Kerberos Relay → RBCD → SYSTEM)',
        description: { zh: '在不需要 NTLM 的環境中，利用 Kerberos Relay（KrbRelay）強制本機服務向攻擊者的偽造 KDC 進行 Kerberos 認證，再透過 RBCD 設定委派，最終以 S4U2Self+S4U2Proxy 取得 SYSTEM 等級的服務票據；無需網路憑證即可從一般使用者提升至 SYSTEM', en: 'In environments without NTLM, use Kerberos Relay (KrbRelay) to force a local service to authenticate to an attacker-controlled KDC, then configure RBCD and use S4U2Self+S4U2Proxy to obtain a SYSTEM-level service ticket — escalating from a standard user to SYSTEM without any network credentials.', ja: 'NTLM のない環境で、Kerberos Relay（KrbRelay）を使ってローカルサービスを攻撃者制御の偽 KDC に認証させ、RBCD を設定して S4U2Self+S4U2Proxy でシステムレベルのサービスチケットを取得する。ネットワーク認証情報なしで一般ユーザーから SYSTEM に昇格可能。' },
        tools: ['KrbRelayUp', 'KrbRelay'],
        resources: [
          { title: 'KrbRelayUp GitHub', url: 'https://github.com/Dec0ne/KrbRelayUp' },
          { title: 'Relaying Kerberos over DNS using krbrelayx and mitm6', url: 'https://dirkjanm.io/relaying-kerberos-over-dns-with-krbrelayx-and-mitm6/' },
          { title: 'Detecting and Preventing KrbRelayUp – Microsoft Security Blog', url: 'https://www.microsoft.com/en-us/security/blog/2022/05/25/detecting-and-preventing-privilege-escalation-attacks-leveraging-kerberos-relaying-krbrelayup/' }
        ]
      },
      {
        name: 'Child-to-Parent Domain Escalation',
        description: { zh: '在 SID Filtering 未啟用的子域與父域信任關係中，取得子域 KRBTGT 雜湊後可偽造含 Enterprise Admins SID（S-1-5-21-<RootDomain>-519）的 Golden Ticket，該 SID 在父域中被視為合法，從而提升至根域 Enterprise Admin；HackTricks 稱此為「信任票據（Trust Ticket）」攻擊', en: 'When SID Filtering is disabled on a child-to-parent domain trust, compromising the child domain KRBTGT hash allows forging a Golden Ticket containing the Enterprise Admins SID (S-1-5-21-<RootDomain>-519). This SID is treated as legitimate in the parent domain, escalating to root domain Enterprise Admin — known as the "Trust Ticket" attack.', ja: '子ドメインと親ドメインの信頼関係で SID Filtering が無効な場合、子ドメインの KRBTGT ハッシュを取得後に Enterprise Admins SID（S-1-5-21-<RootDomain>-519）を含む Golden Ticket を偽造できる。この SID は親ドメインで正規として扱われ、ルートドメインの Enterprise Admin に昇格できる（「信頼チケット」攻撃）。' },
        tools: ['Mimikatz', 'Rubeus', 'Impacket'],
        resources: [
          { title: 'HackTricks – Abusing AD Trust', url: 'https://book.hacktricks.xyz/windows-hardening/active-directory-methodology/sid-history-injection' },
          { title: 'A Guide to Attacking Domain Trusts – harmj0y', url: 'https://blog.harmj0y.net/redteaming/a-guide-to-attacking-domain-trusts/' },
          { title: 'From Child to Parent – Escalating in Active Directory Forests', url: 'https://adsecurity.org/?p=1772' }
        ]
      },
      {
        name: 'Constrained Delegation S4U2Proxy Abuse',
        description: { zh: '若服務帳戶設有受限委派（Constrained Delegation），攻擊者取得該帳戶後可透過 S4U2Self 取得任意使用者（含 DA）的 Forwardable TGS，再以 S4U2Proxy 代替目標使用者存取委派允許的服務；Protocol Transition（任意服務）更為危險，可直接冒充 DA', en: 'If a service account has Constrained Delegation configured, an attacker who compromises that account can use S4U2Self to obtain a Forwardable TGS for any user (including DA), then use S4U2Proxy to access delegated services as that user. Protocol Transition (any service) is especially dangerous — it allows direct Domain Admin impersonation.', ja: 'サービスアカウントに制約委任が設定されている場合、攻撃者がそのアカウントを侵害すると S4U2Self で任意ユーザー（DA を含む）の Forwardable TGS を取得し、S4U2Proxy で委任許可されたサービスにそのユーザーとしてアクセスできる。プロトコル遷移（任意サービス）は特に危険で、DA への直接なりすましが可能。' },
        tools: ['Rubeus', 'Impacket', 'BloodHound'],
        resources: [
          { title: 'HackTricks – Constrained Delegation', url: 'https://book.hacktricks.xyz/windows-hardening/active-directory-methodology/constrained-delegation' },
          { title: 'Kerberos Delegation Explained – S4U2Self & S4U2Proxy', url: 'https://shenaniganslabs.io/2019/01/28/Wagging-the-Dog.html' },
          { title: 'Rubeus – S4U Module Documentation', url: 'https://github.com/GhostPack/Rubeus#s4u' }
        ]
      },
      {
        name: 'AD CS ESC4–ESC8 Extended Abuses',
        description: { zh: 'Certified Pre-Owned 論文描述的進階 AD CS 濫用類型：ESC4（修改憑證範本為 ESC1 可利用狀態）、ESC5（PKI 物件 ACL 濫用）、ESC6（EDITF_ATTRIBUTESUBJECTALTNAME2 旗標）、ESC7（CA 管理員特權）、ESC8（HTTP NTLM Relay 到 AD CS Web Enrollment）；ESC8 無需任何帳戶即可從網路存取取得域管理員憑證', en: 'Advanced AD CS abuse types from the Certified Pre-Owned paper: ESC4 (modify certificate templates to become ESC1-exploitable), ESC5 (PKI object ACL abuse), ESC6 (EDITF_ATTRIBUTESUBJECTALTNAME2 flag), ESC7 (CA administrator privileges), ESC8 (HTTP NTLM relay to AD CS Web Enrollment). ESC8 can obtain Domain Admin certificates from network access alone with no account required.', ja: 'Certified Pre-Owned 論文に記載された高度な AD CS 悪用タイプ: ESC4（証明書テンプレートを ESC1 悪用可能な状態に変更）、ESC5（PKI オブジェクト ACL 悪用）、ESC6（EDITF_ATTRIBUTESUBJECTALTNAME2 フラグ）、ESC7（CA 管理者権限）、ESC8（AD CS Web Enrollment への HTTP NTLM リレー）。ESC8 はアカウントなしのネットワークアクセスのみでドメイン管理者証明書を取得できる。' },
        tools: ['Certify', 'Certipy', 'Impacket'],
        resources: [
          { title: 'Certified Pre-Owned – Full Paper (ESC4–ESC8)', url: 'https://posts.specterops.io/certified-pre-owned-d95910965cd2' },
          { title: 'HackTricks – AD CS Domain Escalation ESC4–ESC8', url: 'https://book.hacktricks.xyz/windows-hardening/active-directory-methodology/ad-certificates/domain-escalation' },
          { title: 'Certipy – ESC8 NTLM Relay to AD CS', url: 'https://github.com/ly4k/Certipy#relay' }
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
          { title: 'PowerShell ScriptBlock Logging Bypass', url: 'https://seamlessintelligence.com.au/powershell_script_block_logging.html' },
          { title: 'PowerShell ScriptBlock Logging Bypass (Gist)', url: 'https://gist.github.com/cobbr/d8072d730b24fbae6ffe3aed8ca9c407' }
        ]
      },
      {
        name: 'In-Memory Evasion',
        description: { zh: '在記憶體中執行惡意程式碼，避免落地', en: 'Execute malicious code entirely in memory to avoid disk artifacts', ja: 'メモリ内で悪意のあるコードを実行し、ディスクへの書き込みを避ける' },
        tools: [],
        resources: [
          { title: 'Bring Your Own Land (BYOL) – A Novel Red Teaming Technique', url: 'https://cloud.google.com/blog/topics/threat-intelligence/bring-your-own-land-novel-red-teaming-technique/' }
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
          { title: 'Shhmon — Silencing Sysmon via Driver Unload', url: 'https://medium.com/@matterpreter/shhmon-silencing-sysmon-via-driver-unload-682b5be57650' }
        ]
      },
      {
        name: 'Microsoft ATA / Defender for Identity Evasion',
        description: { zh: '規避 Microsoft Advanced Threat Analytics（ATA）與 Microsoft Defender for Identity（MDI）感應器偵測；技術包含修改 Kerberos 加密類型（避免 RC4）、分散攻擊時序、使用 AES 票據取代 RC4 以繞過 Kerberoast 偵測特徵', en: 'Evade Microsoft ATA and Defender for Identity (MDI) sensor detections by modifying Kerberos encryption types (avoid RC4), distributing attack timing, and using AES tickets instead of RC4 to bypass Kerberoast detection signatures.', ja: 'Kerberos 暗号化タイプの変更（RC4 回避）、攻撃タイミングの分散、RC4 の代わりに AES チケットを使用して Kerberoast 検知シグネチャを回避することで、Microsoft ATA および Defender for Identity（MDI）センサーの検知を回避する。' },
        tools: ['Rubeus', 'Impacket'],
        resources: [
          { title: 'Evading Microsoft ATA for Active Directory Domination', url: 'https://blackhat.com/docs/us-17/thursday/us-17-Mittal-Evading-MicrosoftATA-for-ActiveDirectory-Domination.pdf' },
          { title: 'Bypassing Microsoft Defender for Identity Detections', url: 'https://blog.cyberadvisors.com/technical-blog/blog/bypassing-microsoft-defender-for-identity-detections' },
          { title: 'Microsoft Defender for Identity – Monitored Activities', url: 'https://learn.microsoft.com/en-us/defender-for-identity/monitored-activities' }
        ]
      },
      {
        name: 'Disabling Security Tools',
        description: { zh: '在取得本機管理員或 SYSTEM 權限後，停用 Windows Defender（含 Tamper Protection）、稽核原則、事件日誌服務或第三方 AV/EDR，以降低偵測風險並為後續橫向移動鋪路', en: 'After obtaining local admin or SYSTEM privileges, disable Windows Defender (including Tamper Protection), audit policies, event log services, or third-party AV/EDR to reduce detection risk and prepare for lateral movement.', ja: 'ローカル管理者または SYSTEM 権限取得後、Windows Defender（Tamper Protection を含む）・監査ポリシー・イベントログサービス・サードパーティ AV/EDR を無効化し、検出リスクを低下させて横方向移動の準備をする。' },
        tools: ['Invoke-Phant0m', 'PowerShell'],
        resources: [
          { title: 'Disabling Windows Event Logging – Invoke-Phant0m', url: 'https://www.ired.team/offensive-security/defense-evasion/disabling-windows-event-logs-by-suspending-eventlog-service-threads' },
          { title: 'Invoke-Phant0m', url: 'https://github.com/hlldz/Phant0m' },
          { title: 'T1562.001 – Impair Defenses: Disable or Modify Tools', url: 'https://attack.mitre.org/techniques/T1562/001/' },
          { title: 'Disabling Windows Defender via PowerShell and Group Policy', url: 'https://www.tenforums.com/tutorials/5918-turn-off-windows-defender-antivirus-windows-10-a.html' }
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
          { title: 'Pass-the-Hash Is Dead: Long Live LocalAccountTokenFilterPolicy', url: 'https://posts.specterops.io/pass-the-hash-is-dead-long-live-localaccounttokenfilterpolicy-506c25a7c167' }
        ]
      },
      {
        name: 'SQL Server DB Links',
        description: { zh: '利用 SQL Server 資料庫連結進行橫向移動', en: 'Leverage SQL Server database links for lateral movement', ja: 'SQL Server のデータベースリンクを利用して横方向に移動する' },
        tools: ['PowerUpSQL'],
        resources: [
          { title: 'SQL Server – Link… Link… Link… and Shell', url: 'https://www.netspi.com/blog/technical-blog/network-pentesting/how-to-hack-database-links-in-sql-server/' },
          { title: 'SQL Server Link Crawling with PowerUpSQL', url: 'https://www.netspi.com/blog/technical-blog/network-pentesting/sql-server-link-crawling-powerupsql/' }
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
          { title: 'Remote Weaponization of WSUS MITM', url: 'https://sixdub.medium.com/remote-weaponization-of-wsus-mitm-89c47a8c2561' },
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
      },
      {
        name: 'Automated Lateral Movement',
        description: { zh: '結合 BloodHound 攻擊路徑分析與 C2 框架（Cobalt Strike、Sliver、Havoc）自動化執行最短域管理員路徑；工具可自動讀取 BloodHound 圖資料庫、選擇最佳攻擊路徑並依序發動橫向移動', en: 'Combine BloodHound attack path analysis with C2 frameworks (Cobalt Strike, Sliver, Havoc) to automatically execute the shortest path to Domain Admin. Tools can read the BloodHound graph database, select optimal attack paths, and execute lateral movement sequences automatically.', ja: 'BloodHound の攻撃経路分析と C2 フレームワーク（Cobalt Strike・Sliver・Havoc）を組み合わせて、ドメイン管理者への最短経路を自動実行する。ツールが BloodHound のグラフデータベースを読んで最適な攻撃経路を選択し、横移動を自動的に実行できる。' },
        tools: ['BloodHound', 'aclpwn.py', 'CrackMapExec', 'netexec (nxc)'],
        resources: [
          { title: 'Automating the Boring Stuff: BloodHound + CrackMapExec', url: 'https://www.n00py.io/2022/03/using-bloodhound-to-automate-lateral-movement/' },
          { title: 'BloodHound Attack Paths – Automated Exploitation', url: 'https://hausec.com/2019/09/09/bloodhound-and-domain-attacks/' },
          { title: 'aclpwn.py – Automated ACL Abuse', url: 'https://github.com/fox-it/aclpwn.py' }
        ]
      },
      {
        name: 'Exchange Privilege Abuse (PrivExchange)',
        description: { zh: 'Exchange 伺服器預設具備 WriteDACL 至 AD 網域物件的權限；PrivExchange 攻擊強制 Exchange 向攻擊者進行 NTLM 認證，再中繼至 LDAP 賦予攻擊者 DCSync 權限；Organization Management 群組成員還可存取所有使用者信箱，竊取憑證或敏感資訊', en: 'Exchange servers have WriteDACL rights over AD domain objects by default. The PrivExchange attack coerces Exchange into NTLM authentication to the attacker, which is then relayed to LDAP to grant the attacker DCSync rights. Organization Management group members can also access all user mailboxes to steal credentials or sensitive information.', ja: 'Exchange サーバーはデフォルトで AD ドメインオブジェクトへの WriteDACL 権限を持つ。PrivExchange 攻撃は Exchange に攻撃者への NTLM 認証を強制し、LDAP にリレーして攻撃者に DCSync 権限を付与する。Organization Management グループメンバーは全ユーザーのメールボックスにアクセスして認証情報や機密情報を窃取できる。' },
        tools: ['PrivExchange', 'Impacket', 'NtlmRelayToEWS'],
        cves: ['CVE-2018-8581'],
        resources: [
          { title: 'Abusing Exchange: One API call away from Domain Admin', url: 'https://dirkjanm.io/abusing-exchange-one-api-call-away-from-domain-admin/' },
          { title: 'PrivExchange GitHub', url: 'https://github.com/dirkjanm/PrivExchange' },
          { title: 'HackTricks – Exchange Mailbox Escalation', url: 'https://book.hacktricks.xyz/network-services-pentesting/pentesting-smtp/ms-exchange-tricks' }
        ]
      },
      {
        name: 'WinRM / PSRemoting Lateral Movement',
        description: { zh: '利用 Windows Remote Management（WinRM / PowerShell Remoting）進行橫向移動；WinRM（Port 5985/5986）在現代 AD 環境中廣泛啟用；可用 evil-winrm 互動式 Shell、netexec 批次執行、或 Invoke-Command 遠端執行 PowerShell', en: 'Use Windows Remote Management (WinRM/PowerShell Remoting) for lateral movement. WinRM (Port 5985/5986) is widely enabled in modern AD environments. Supports interactive shells via evil-winrm, batch execution with netexec, or remote PowerShell via Invoke-Command.', ja: 'Windows Remote Management（WinRM/PowerShell Remoting）を使った横移動。WinRM（ポート 5985/5986）は現代の AD 環境で広く有効化されている。evil-winrm によるインタラクティブシェル、netexec によるバッチ実行、Invoke-Command によるリモート PowerShell が利用可能。' },
        tools: ['evil-winrm', 'netexec (nxc)', 'CrackMapExec'],
        resources: [
          { title: 'HackTricks – WinRM Lateral Movement', url: 'https://book.hacktricks.xyz/network-services-pentesting/5985-5986-pentesting-winrm' },
          { title: 'evil-winrm GitHub', url: 'https://github.com/Hackplayers/evil-winrm' },
          { title: 'T1021.006 – Remote Services: Windows Remote Management', url: 'https://attack.mitre.org/techniques/T1021/006/' }
        ]
      },
      {
        name: 'Kerberos Double Hop Problem',
        description: { zh: 'Kerberos 認證預設不支援憑證跨主機轉發（Double Hop）；在 PSRemoting / WinRM 場景下，認證在第二台主機上無法繼續使用，導致橫向移動受阻；繞過方式包含：Unconstrained Delegation、Constrained Delegation、CredSSP（有安全風險）、顯式憑證注入', en: 'Kerberos authentication does not support credential forwarding across multiple hops (Double Hop) by default. In PSRemoting/WinRM scenarios, credentials cannot be used on the second host, blocking lateral movement. Bypass methods include: Unconstrained Delegation, Constrained Delegation, CredSSP (security risk), and explicit credential injection.', ja: 'Kerberos 認証はデフォルトで複数ホップ間での認証情報の転送（Double Hop）をサポートしない。PSRemoting/WinRM シナリオでは、第 2 ホストで認証情報を使用できず横移動が阻害される。回避方法: 無制限委任・制約委任・CredSSP（セキュリティリスクあり）・明示的な認証情報注入。' },
        tools: ['Rubeus', 'PowerShell'],
        resources: [
          { title: 'HackTricks – Kerberos Double Hop Problem', url: 'https://book.hacktricks.xyz/windows-hardening/active-directory-methodology/kerberos-double-hop-problem' },
          { title: 'PowerShell Remoting Caveats – Kerberos Double Hop', url: 'https://learn.microsoft.com/en-us/powershell/scripting/security/remoting/ps-remoting-second-hop' },
          { title: 'Solving the Kerberos Double Hop Problem with S4U2Proxy', url: 'https://blog.harmj0y.net/powershell/kerberos-double-hop-and-powershell-remoting/' }
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
          { title: 'Kerberoasting Without Mimikatz', url: 'https://blog.harmj0y.net/powershell/kerberoasting-without-mimikatz/' },
          { title: 'Cracking Kerberos TGS Tickets Using Kerberoast', url: 'https://adsecurity.org/?p=2293' },
          { title: 'DerbyCon 2019 - Kerberoasting Revisited', url: 'https://www.slideshare.net/harmj0y/derbycon-2019-kerberoasting-revisited' }
        ]
      },
      {
        name: 'AS-REP Roasting',
        description: { zh: '針對不需要預身份驗證的帳戶，請求 AS-REP 並離線破解', en: 'Request AS-REP responses for accounts that do not require pre-authentication and crack them offline', ja: '事前認証が不要なアカウントの AS-REP をリクエストし、オフラインで解析する' },
        tools: ['Rubeus', 'Impacket'],
        resources: [
          { title: 'Roasting AS-REPs', url: 'https://blog.harmj0y.net/activedirectory/roasting-as-reps/' }
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
      },
      {
        name: 'SAM Database Extraction',
        description: { zh: '提取本機 SAM 資料庫中的本機帳戶 NTLM 雜湊值；可透過 reg save（需本機管理員）、VSS 陰影複製，或直接存取 HKLM\\SAM 登錄機碼；搭配 SYSTEM 登錄機碼解密 SAM', en: 'Extract local account NTLM hashes from the SAM database via reg save (requires local admin), VSS shadow copies, or direct access to the HKLM\\SAM registry hive. The SYSTEM hive is required to decrypt the SAM database.', ja: 'reg save（ローカル管理者必要）・VSS シャドウコピー・HKLM\\SAM レジストリハイブへの直接アクセスにより、SAM データベースからローカルアカウントの NTLM ハッシュを抽出する。復号には SYSTEM ハイブが必要。' },
        tools: ['Mimikatz', 'Impacket', 'CrackMapExec'],
        resources: [
          { title: 'Dumping Hashes from SAM via Registry – ired.team', url: 'https://www.ired.team/offensive-security/credential-access-and-credential-dumping/dumping-hashes-from-sam-registry' },
          { title: 'T1003.002 – OS Credential Dumping: Security Account Manager', url: 'https://attack.mitre.org/techniques/T1003/002/' },
          { title: 'Extracting SAM and SYSTEM Hives Using VSS', url: 'https://pentestlab.blog/2018/07/04/dumping-domain-password-hashes/' }
        ]
      },
      {
        name: 'Windows Credential Manager / Vault',
        description: { zh: '從 Windows 憑證管理員（Credential Manager）與 Vault（WinVault）提取儲存的 Web 憑證、RDP 連線憑證及網路共享密碼；cmdkey 可列舉已儲存的憑證，DPAPI 可解密 Vault 項目', en: 'Extract stored web credentials, RDP connection credentials, and network share passwords from Windows Credential Manager and Vault (WinVault). cmdkey enumerates stored credentials; DPAPI decrypts Vault entries.', ja: 'Windows Credential Manager と Vault（WinVault）から、保存された Web 認証情報・RDP 接続認証情報・ネットワーク共有パスワードを抽出する。cmdkey で保存済み認証情報を列挙し、DPAPI で Vault エントリを復号する。' },
        tools: ['Mimikatz', 'SharpDPAPI', 'LaZagne'],
        resources: [
          { title: 'Dumping Windows Credentials – Hacker Recipes', url: 'https://www.thehacker.recipes/ad/movement/credentials/dumping/windows-credentials' },
          { title: 'T1555.004 – Windows Credential Manager', url: 'https://attack.mitre.org/techniques/T1555/004/' },
          { title: 'LaZagne – Credentials Recovery Tool', url: 'https://github.com/AlessandroZ/LaZagne' }
        ]
      },
      {
        name: 'LSASS Memory Dump',
        description: { zh: '轉儲 LSASS（Local Security Authority Subsystem Service）程序記憶體，從中提取已登入使用者的明文密碼、NTLM 雜湊值與 Kerberos 票據；方法包含 ProcDump、comsvcs.dll MiniDump、Task Manager、以及 Mimikatz sekurlsa::logonpasswords', en: 'Dump the LSASS process memory to extract plaintext passwords, NTLM hashes, and Kerberos tickets of logged-in users. Methods include ProcDump, comsvcs.dll MiniDump, Task Manager, and Mimikatz sekurlsa::logonpasswords.', ja: 'LSASS プロセスメモリをダンプして、ログイン済みユーザーの平文パスワード・NTLM ハッシュ・Kerberos チケットを抽出する。方法: ProcDump・comsvcs.dll MiniDump・タスクマネージャー・Mimikatz sekurlsa::logonpasswords。' },
        tools: ['Mimikatz', 'ProcDump', 'SafetyKatz', 'SharpDump'],
        resources: [
          { title: 'T1003.001 – OS Credential Dumping: LSASS Memory', url: 'https://attack.mitre.org/techniques/T1003/001/' },
          { title: 'Dumping LSASS with comsvcs.dll', url: 'https://www.ired.team/offensive-security/credential-access-and-credential-dumping/dump-credentials-from-lsass-process-without-mimikatz' },
          { title: 'HackTricks – LSASS Memory Dump', url: 'https://book.hacktricks.xyz/windows-hardening/stealing-credentials/credentials-mimikatz#lsass' }
        ]
      },
      {
        name: 'UnPAC-the-Hash (PKINIT Credential Extraction)',
        description: { zh: '當使用 PKINIT（憑證或 Shadow Credentials）取得 TGT 後，TGT 的 PAC 中包含加密的 PAC_CREDENTIAL_INFO；透過 U2U（User-to-User）Kerberos 交換可解密此結構，提取目標帳戶的 NT/LM 雜湊值，即使沒有 DCSync 權限也能取得雜湊值並進行 Pass-the-Hash', en: 'After obtaining a TGT via PKINIT (certificate or Shadow Credentials), the TGT PAC contains an encrypted PAC_CREDENTIAL_INFO structure. A U2U (User-to-User) Kerberos exchange can decrypt this to extract the target account\'s NT/LM hashes — obtaining hashes for Pass-the-Hash even without DCSync rights.', ja: 'PKINIT（証明書または Shadow Credentials）で TGT を取得後、TGT の PAC に暗号化された PAC_CREDENTIAL_INFO が含まれる。U2U（User-to-User）Kerberos 交換でこれを復号してターゲットアカウントの NT/LM ハッシュを抽出できる。DCSync 権限なしでも Pass-the-Hash 用のハッシュが得られる。' },
        tools: ['PKINITtools', 'Rubeus', 'Certipy'],
        resources: [
          { title: 'UnPAC-the-Hash – The Hacker Recipes', url: 'https://www.thehacker.recipes/ad/movement/kerberos/unpac-the-hash' },
          { title: 'PKINITtools GitHub – gettgtpkinit & gets4uticket', url: 'https://github.com/dirkjanm/PKINITtools' },
          { title: 'Shadow Credentials + UnPAC-the-Hash Chain', url: 'https://posts.specterops.io/shadow-credentials-abusing-key-trust-account-mapping-for-takeover-8ee1a53566ab' }
        ]
      },
      {
        name: 'Forced AS-REP Roasting via ACL (WriteDACL)',
        description: { zh: '若攻擊者對目標帳戶擁有 GenericWrite 或 WriteDACL 權限，可設定 DONT_REQ_PREAUTH 旗標，使原本不可 Roast 的帳戶變得可被 AS-REP Roasting；此為 ACL 濫用與 AS-REP Roasting 的組合攻擊，不需要目標帳戶事先錯誤設定', en: 'If an attacker has GenericWrite or WriteDACL over a target account, they can set the DONT_REQ_PREAUTH flag, making previously non-roastable accounts vulnerable to AS-REP Roasting. This combines ACL abuse with AS-REP Roasting and requires no pre-existing misconfiguration on the target account.', ja: '攻撃者がターゲットアカウントに対して GenericWrite または WriteDACL 権限を持つ場合、DONT_REQ_PREAUTH フラグを設定して元々 Roast 不可能なアカウントを AS-REP Roasting に脆弱にできる。ACL 悪用と AS-REP Roasting を組み合わせた攻撃で、ターゲットアカウントの事前の設定ミスを必要としない。' },
        tools: ['PowerView', 'Rubeus', 'Impacket'],
        resources: [
          { title: 'Targeted AS-REP Roasting via ACL – The Hacker Recipes', url: 'https://www.thehacker.recipes/ad/movement/kerberos/asreproast#targeted-asreproast' },
          { title: 'Targeted Kerberoasting / AS-REP Roasting via ACL', url: 'https://blog.harmj0y.net/activedirectory/targeted-kerberoasting/' },
          { title: 'T1558.004 – Steal or Forge Kerberos Tickets: AS-REP Roasting', url: 'https://attack.mitre.org/techniques/T1558/004/' }
        ]
      },
      {
        name: 'Azure AD Connect Credential Theft',
        description: { zh: 'Azure AD Connect 服務帳戶（MSOL_* 或 AAD_*）在 AD 本地端持有複寫密碼（DCSync 等級）及 Azure AD 全域管理員同步憑證；透過 ADSyncDecrypt 或 AADInternals 可從 SQL LocalDB 提取加密憑證並解密，同時取得 on-premise AD 與 Azure AD 的最高控制權', en: 'The Azure AD Connect service account (MSOL_* or AAD_*) holds replication passwords (DCSync-level) for on-premises AD and Azure AD Global Admin sync credentials. Tools like ADSyncDecrypt or AADInternals can extract and decrypt these credentials from SQL LocalDB, granting simultaneous full control of both on-premises AD and Azure AD.', ja: 'Azure AD Connect サービスアカウント（MSOL_* または AAD_*）は、オンプレミス AD の複製パスワード（DCSync レベル）と Azure AD グローバル管理者同期認証情報を保有する。ADSyncDecrypt や AADInternals で SQL LocalDB から暗号化認証情報を抽出・復号し、オンプレミス AD と Azure AD の完全制御を同時に取得できる。' },
        tools: ['AADInternals', 'AdSyncDecrypt', 'Impacket'],
        resources: [
          { title: 'Abusing Azure AD Connect – dirkjanm', url: 'https://dirkjanm.io/azure-ad-privilege-escalation-application-admin/' },
          { title: 'AADInternals – Get-AADIntSyncCredentials', url: 'https://aadinternals.com/post/on-prem_admin/' },
          { title: 'Azure AD Connect for Red Teamers – XPN (MDSec)', url: 'https://blog.xpnsec.com/azuread-connect-for-redteam/' }
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
      },
      {
        name: 'WMI Event Subscription Persistence',
        description: { zh: '透過 WMI 永久事件訂閱（WMI Permanent Event Subscription）在系統事件觸發時執行惡意程式，隱蔽性極高，Autoruns 等一般工具難以偵測', en: 'Uses WMI Permanent Event Subscriptions to execute malicious code when system events occur. Highly stealthy — difficult to detect with common tools like Autoruns.', ja: 'WMI 永続的イベントサブスクリプションを使用し、システムイベント発生時に悪意のあるコードを実行。Autoruns などの一般的なツールでは検出が困難な高いステルス性を持つ。' },
        tools: ['PowerSploit', 'Impacket'],
        resources: [{ title: 'MITRE ATT&CK T1546.003 – Event Triggered Execution: WMI', url: 'https://attack.mitre.org/techniques/T1546/003/' }]
      },
      {
        name: 'GPO Logon Script / Scheduled Task Persistence',
        description: { zh: '若取得 AD 中 GPO 的修改權限（如 WriteDacl、WriteProperty），可注入登入腳本或排程工作，使指定 OU 內的所有機器或使用者在登入時執行惡意程式', en: 'If an attacker gains GPO modification rights (WriteDacl, WriteProperty), they can inject logon scripts or scheduled tasks that execute malicious code on all machines or users in the targeted OU.', ja: '攻撃者が GPO の変更権限（WriteDacl、WriteProperty）を取得すると、ログオンスクリプトやスケジュールタスクを注入し、対象 OU 内の全マシンまたはユーザーがログオン時に悪意のあるコードを実行させられる。' },
        tools: ['PowerView', 'SharpGPOAbuse'],
        resources: [{ title: 'MITRE ATT&CK T1037.001 – Boot or Logon Initialization Scripts', url: 'https://attack.mitre.org/techniques/T1037/001/' }, { title: 'SharpGPOAbuse', url: 'https://github.com/FSecureLABS/SharpGPOAbuse' }]
      },
      {
        name: 'Security Support Provider (SSP) Persistence',
        description: { zh: '將自訂 SSP DLL 植入 LSASS 程序（透過修改 HKLM\\SYSTEM\\CurrentControlSet\\Control\\Lsa\\Security Packages），每次系統啟動後 LSASS 會載入此 DLL，攔截所有登入認證並儲存明文密碼；無需修改現有系統檔案，偵測難度高', en: 'Plant a custom SSP DLL into LSASS (by modifying HKLM\\SYSTEM\\CurrentControlSet\\Control\\Lsa\\Security Packages). LSASS loads this DLL on every boot, intercepting all logon authentication and storing plaintext passwords. No existing system files are modified, making detection difficult.', ja: 'HKLM\\SYSTEM\\CurrentControlSet\\Control\\Lsa\\Security Packages を変更してカスタム SSP DLL を LSASS に植え付ける。システム起動ごとに LSASS がこの DLL を読み込み、全ログオン認証を傍受して平文パスワードを保存する。既存システムファイルを変更しないため検出が困難。' },
        tools: ['Mimikatz', 'mimilib.dll'],
        resources: [
          { title: 'Sneaky Active Directory Persistence #12: Malicious Security Support Provider (SSP)', url: 'https://adsecurity.org/?p=1760' },
          { title: 'T1547.005 – Boot or Logon Autostart: Security Support Provider', url: 'https://attack.mitre.org/techniques/T1547/005/' },
          { title: 'Mimikatz misc::memssp – In-Memory SSP Injection', url: 'https://github.com/gentilkiwi/mimikatz/wiki/module-~-misc#memssp' }
        ]
      },
      {
        name: 'SeEnableDelegationPrivilege Abuse',
        description: { zh: 'SeEnableDelegationPrivilege 僅預設授予 Domain Admins；取得此特權後可設定任意帳戶的無限制委派（Unconstrained Delegation），甚至新增自訂 SPN，作為持久性後門以持續竊取 TGT', en: 'SeEnableDelegationPrivilege is only granted to Domain Admins by default. Once obtained, it allows setting unconstrained delegation on arbitrary accounts or adding custom SPNs, creating a persistent backdoor to continuously steal TGTs.', ja: 'SeEnableDelegationPrivilege はデフォルトで Domain Admins のみに付与される。取得後は任意のアカウントに無制限委任を設定したりカスタム SPN を追加したりして、TGT を継続的に盗む永続バックドアを作成できる。' },
        tools: ['PowerView', 'Rubeus', 'Impacket'],
        resources: [
          { title: 'The Most Dangerous User Right You Probably Have Never Heard Of', url: 'https://blog.harmj0y.net/activedirectory/the-most-dangerous-user-right-you-probably-have-never-heard-of/' },
          { title: 'SeEnableDelegationPrivilege – Active Directory Security', url: 'https://adsecurity.org/?p=3800' },
          { title: 'T1078.002 – Valid Accounts: Domain Accounts', url: 'https://attack.mitre.org/techniques/T1078/002/' }
        ]
      },
      {
        name: 'RID Hijacking',
        description: { zh: '修改現有低權限帳戶的 RID（Relative Identifier）為 500（內建 Administrator），使 Windows 存取控制邏輯將其視為完整管理員；即使帳戶名稱不是 Administrator，也能取得等效特權；需要 SYSTEM 或 DCSync 等級的存取，但修改後帳戶難以被標準安全工具識別', en: 'Modify the RID (Relative Identifier) of an existing low-privilege account to 500 (built-in Administrator), causing Windows access control logic to treat it as a full administrator. Even if the account name is not "Administrator," it gains equivalent privileges. Requires SYSTEM or DCSync-level access, but the modified account is difficult for standard security tools to identify.', ja: '既存の低権限アカウントの RID（相対識別子）を 500（組み込み Administrator）に変更し、Windows アクセス制御ロジックがそれを完全な管理者として扱うようにする。アカウント名が "Administrator" でなくても等価な特権を取得できる。SYSTEM または DCSync レベルのアクセスが必要だが、変更されたアカウントは標準セキュリティツールでは特定が困難。' },
        tools: ['Impacket', 'Empire', 'Metasploit'],
        resources: [
          { title: 'HackTricks – RID Hijacking', url: 'https://book.hacktricks.xyz/windows-hardening/active-directory-methodology/rid-hijacking' },
          { title: 'RID Hijacking: When Guests Become Admins', url: 'https://sebastianrinaldi.medium.com/rid-hijacking-when-guests-become-admins-ec3c6c6d5c56' },
          { title: 'T1098.005 – Account Manipulation: Device Registration', url: 'https://attack.mitre.org/techniques/T1098/' }
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
    url: 'https://www.netspi.com/blog/technical-blog/network-pentesting/cve-2020-17049-kerberos-bronze-bit-overview/',
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
    url: 'https://learn.microsoft.com/en-us/security-updates/securitybulletins/2014/ms14-068',
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
  },
  {
    id: 'CVE-2022-37969',
    name: 'Windows CLFS Driver EoP',
    severity: 'high',
    year: 2022,
    description: { zh: 'Windows Common Log File System (CLFS) 驅動程式的越界寫入漏洞，允許本機攻擊者提權至 SYSTEM；常被 APT 及勒索軟體組合利用，在 AD 環境中用於提升網域機器權限', en: 'Out-of-bounds write in Windows CLFS driver allows local attackers to escalate to SYSTEM. Frequently chained with other exploits by APT groups and ransomware to elevate privileges on domain-joined machines.', ja: 'Windows CLFS ドライバの境界外書き込みにより、ローカル攻撃者が SYSTEM に昇格可能。APT グループやランサムウェアが他の脆弱性と組み合わせてドメイン参加マシンで権限昇格に悪用。' },
    category: 'Privilege Escalation',
    url: 'https://msrc.microsoft.com/update-guide/vulnerability/CVE-2022-37969',
    tools: []
  },
  {
    id: 'CVE-2023-23397',
    name: 'Microsoft Outlook NTLM Hash Leak',
    severity: 'critical',
    year: 2023,
    description: { zh: '攻擊者可傳送含 UNC 路徑的惡意行事曆邀請，受害者無需開啟即可觸發 NTLM 認證；適用 NTLM Relay 或離線破解，可取得 Net-NTLMv2 雜湊值', en: 'Attacker sends malicious calendar invites with UNC paths; victim triggers NTLM authentication without opening the email. Enables NTLM relay or offline cracking of Net-NTLMv2 hashes.', ja: '攻撃者が UNC パスを含む悪意のあるカレンダー招待を送信し、被害者がメールを開かずに NTLM 認証をトリガー。Net-NTLMv2 ハッシュの NTLM リレーまたはオフライン解析が可能。' },
    category: 'Credential Dumping',
    url: 'https://msrc.microsoft.com/update-guide/vulnerability/CVE-2023-23397',
    tools: []
  },
  {
    id: 'CVE-2023-28252',
    name: 'Windows CLFS Driver EoP (Zero-Day)',
    severity: 'high',
    year: 2023,
    description: { zh: 'CLFS 驅動程式的第二個嚴重提權漏洞，2023 年被 Nokoyawa 勒索軟體組織積極利用於野外攻擊（zero-day）；在 AD 環境中可被用於提升至 SYSTEM 後再橫向移動', en: 'Second critical CLFS driver EoP, actively exploited as a zero-day by the Nokoyawa ransomware group in 2023. In AD environments, used to escalate to SYSTEM before lateral movement.', ja: 'CLFS ドライバの2つ目の重大な EoP 脆弱性。2023年に Nokoyawa ランサムウェアグループによってゼロデイとして積極的に悪用。AD 環境では SYSTEM 昇格後の横移動に使用。' },
    category: 'Privilege Escalation',
    url: 'https://msrc.microsoft.com/update-guide/vulnerability/CVE-2023-28252',
    tools: []
  },
  {
    id: 'CVE-2024-21410',
    name: 'Exchange NTLM Relay (EoP)',
    severity: 'critical',
    year: 2024,
    description: { zh: 'Exchange Server 2019 的 NTLM 認證中繼漏洞；攻擊者可強制 Exchange 伺服器向攻擊者進行 NTLM 認證並中繼，取得受害者的 Net-NTLMv2 雜湊後冒充其身份存取 Exchange；與 CVE-2023-23397 Outlook 雜湊洩漏組合使用威脅倍增', en: 'NTLM authentication relay vulnerability in Exchange Server 2019. Attackers can force the Exchange server to authenticate to them via NTLM and relay the victim\'s Net-NTLMv2 hash to impersonate them. When combined with CVE-2023-23397 Outlook hash leakage, the threat is significantly amplified.', ja: 'Exchange Server 2019 の NTLM 認証リレー脆弱性。攻撃者が Exchange サーバーに NTLM 認証を強制してリレーし、被害者の Net-NTLMv2 ハッシュを使って成りすます。CVE-2023-23397 Outlook ハッシュ漏洩と組み合わせると脅威が倍増。' },
    category: 'Privilege Escalation',
    url: 'https://msrc.microsoft.com/update-guide/vulnerability/CVE-2024-21410',
    tools: ['Impacket', 'Responder']
  },
  {
    id: 'CVE-2024-38124',
    name: 'Netlogon EoP (Domain Spoofing)',
    severity: 'high',
    year: 2024,
    description: { zh: 'Windows Netlogon 服務的權限提升漏洞；攻擊者可在特定條件下欺騙 Netlogon 安全通道，冒充其他電腦帳戶取得提升的 Kerberos 票據；適用於已在網域內取得立足點的攻擊者進一步提升至域管理員', en: 'Elevation of privilege in the Windows Netlogon service. Under specific conditions, attackers can spoof a Netlogon secure channel to impersonate other computer accounts and obtain elevated Kerberos tickets. Applicable to attackers who already have a foothold in the domain and seek to escalate to Domain Admin.', ja: 'Windows Netlogon サービスの権限昇格脆弱性。特定の条件下で、攻撃者が Netlogon セキュアチャネルを偽装して他のコンピューターアカウントを成りすまし、昇格された Kerberos チケットを取得できる。ドメイン内に足掛かりを得た攻撃者がドメイン管理者への昇格に使用。' },
    category: 'Privilege Escalation',
    url: 'https://msrc.microsoft.com/update-guide/vulnerability/CVE-2024-38124',
    tools: []
  },
  {
    id: 'CVE-2024-49113',
    name: 'LDAPNightmare (LDAP DoS / RCE)',
    severity: 'critical',
    year: 2024,
    description: { zh: 'Windows LDAP 服務的嚴重漏洞；無需認證即可觸發 DC 的 LDAP 服務崩潰（PoC 已公開）；研究人員同時揭露相關 RCE 漏洞（CVE-2024-49112）；組合利用可對所有未修補的 DC 造成重大威脅', en: 'Critical Windows LDAP vulnerability. A public PoC can crash the LDAP service on a DC without authentication. Researchers also disclosed an associated RCE variant (CVE-2024-49112). When combined, they pose a major threat to all unpatched DCs.', ja: 'Windows LDAP サービスの重大な脆弱性。公開 PoC により認証なしで DC の LDAP サービスをクラッシュさせられる。関連する RCE 変種（CVE-2024-49112）も研究者が開示済み。組み合わせると未修正の全 DC に重大な脅威をもたらす。' },
    category: 'Initial Access',
    url: 'https://msrc.microsoft.com/update-guide/vulnerability/CVE-2024-49113',
    tools: []
  },
  {
    id: 'CVE-2024-26234',
    name: 'Proxy Driver Spoofing (WHCP Bypass)',
    severity: 'medium',
    year: 2024,
    description: { zh: 'Windows 硬體相容性計劃（WHCP）程式碼簽章繞過漏洞；攻擊者可使用合法微軟簽章的代理驅動程式載入未簽章的惡意 Kernel 驅動程式，在 AD 環境中常被用於繞過 EDR 驅動程式保護與 Credential Guard', en: 'Windows Hardware Compatibility Program (WHCP) code-signing bypass. Attackers can use a legitimately Microsoft-signed proxy driver to load unsigned malicious kernel drivers. In AD environments, frequently used to bypass EDR driver protection and Credential Guard.', ja: 'Windows ハードウェア互換性プログラム（WHCP）コード署名バイパス脆弱性。攻撃者が Microsoft の正規署名付きプロキシドライバーを使って未署名の悪意のあるカーネルドライバーを読み込む。AD 環境では EDR ドライバー保護や Credential Guard のバイパスに頻繁に使用。' },
    category: 'Defense Evasion',
    url: 'https://msrc.microsoft.com/update-guide/vulnerability/CVE-2024-26234',
    tools: []
  },
  {
    id: 'CVE-2021-26855',
    name: 'ProxyLogon (Exchange Server RCE)',
    severity: 'critical',
    year: 2021,
    description: { zh: 'Exchange Server SSRF 漏洞，允許未認證攻擊者繞過驗證執行任意程式碼；常與 CVE-2021-27065 組合使用，可在 Exchange 伺服器上植入 WebShell，取得 Exchange 服務帳戶（SYSTEM 等級）權限後再橫向移動至 AD', en: 'Exchange Server SSRF vulnerability allowing unauthenticated attackers to bypass authentication and execute arbitrary code. Often combined with CVE-2021-27065 to plant WebShells on Exchange servers, gaining Exchange service account (SYSTEM-level) access before lateral movement to AD.', ja: 'Exchange Server SSRF 脆弱性。未認証の攻撃者が認証をバイパスして任意のコードを実行できる。CVE-2021-27065 と組み合わせて Exchange サーバーに WebShell を設置し、Exchange サービスアカウント（SYSTEM レベル）権限を取得後に AD へ横移動する。' },
    category: 'Initial Access',
    url: 'https://msrc.microsoft.com/update-guide/vulnerability/CVE-2021-26855',
    tools: ['Impacket', 'ExchangeRelayX']
  },
  {
    id: 'CVE-2019-0724',
    name: 'PrivExchange (Exchange NTLM Relay)',
    severity: 'high',
    year: 2019,
    description: { zh: 'Exchange 訂閱 EWS Push Notification 功能可被濫用，強制 Exchange 伺服器向攻擊者進行 NTLM 認證，再中繼至 LDAP 賦予攻擊者 WriteDACL 至 AD 網域物件的權限，進而取得 DCSync 權限', en: 'The Exchange EWS Push Notification subscription feature can be abused to force the Exchange server to perform NTLM authentication to the attacker, which is then relayed to LDAP to grant WriteDACL over the AD domain object — enabling DCSync.', ja: 'Exchange EWS プッシュ通知サブスクリプション機能を悪用して Exchange サーバーに攻撃者への NTLM 認証を強制し、LDAP にリレーして AD ドメインオブジェクトへの WriteDACL 権限を取得。その後 DCSync が可能になる。' },
    category: 'Privilege Escalation',
    url: 'https://dirkjanm.io/abusing-exchange-one-api-call-away-from-domain-admin/',
    tools: ['PrivExchange', 'Impacket']
  },
  {
    id: 'CVE-2025-21293',
    name: 'AD DS Network Config Operators EoP',
    severity: 'high',
    year: 2025,
    description: { zh: 'Active Directory Domain Services 中 Network Configuration Operators 群組對特定登錄機碼的 DACL 設定不正確；攻擊者可建立惡意登錄子機碼並透過 WMI 查詢觸發系統載入惡意 DLL，以 SYSTEM 權限執行任意程式碼。CVSS 8.8，2025 年 1 月 Patch Tuesday 修補，PoC 已公開', en: 'Misconfigured DACL on specific registry keys grants the Network Configuration Operators group write access. An attacker can create a malicious registry subkey and trigger SYSTEM-level DLL loading via a WMI query, achieving arbitrary code execution. CVSS 8.8, patched January 2025 Patch Tuesday, public PoC available.', ja: 'Network Configuration Operators グループへの特定のレジストリキーの DACL 設定が不正確。攻撃者は悪意のあるレジストリサブキーを作成し、WMI クエリを介して SYSTEM レベルの DLL 読み込みをトリガーし、任意のコードを実行できる。CVSS 8.8、2025 年 1 月 Patch Tuesday で修正、PoC 公開済み。' },
    category: 'Privilege Escalation',
    url: 'https://www.picussecurity.com/resource/blog/microsoft-active-directory-domain-services-cve-2025-21293-vulnerability-explained',
    tools: []
  },
  {
    id: 'CVE-2025-26663',
    name: 'Windows LDAP Unauthenticated RCE (Wormable)',
    severity: 'critical',
    year: 2025,
    description: { zh: 'Windows LDAP 服務中的 Use-After-Free 漏洞；未認證的遠端攻擊者僅需向目標 LDAP 伺服器依序發送特製請求即可觸發競態條件，執行任意程式碼或導致 LSASS 崩潰。因 LDAP 幾乎在所有 Windows 環境中運作，此漏洞具備蠕蟲傳播能力；2025 年 4 月 Patch Tuesday 修補', en: 'Use-After-Free vulnerability in Windows LDAP service. An unauthenticated remote attacker can trigger a race condition by sending specially crafted LDAP requests sequentially, achieving arbitrary code execution or crashing LSASS. Since LDAP runs in virtually all Windows environments, this vulnerability is wormable. Patched in April 2025 Patch Tuesday.', ja: 'Windows LDAP サービスの Use-After-Free 脆弱性。未認証のリモート攻撃者が特製の LDAP リクエストを順次送信して競合状態をトリガーし、任意のコード実行または LSASS クラッシュを引き起こせる。LDAP はほぼすべての Windows 環境で動作するため、この脆弱性はワーム可能。2025 年 4 月 Patch Tuesday で修正。' },
    category: 'Initial Access',
    url: 'https://windowsforum.com/threads/cve-2025-26663-understanding-the-critical-ldap-vulnerability-in-windows.359952/',
    tools: []
  },
  {
    id: 'CVE-2025-26670',
    name: 'Windows LDAP Unauthenticated RCE (Companion)',
    severity: 'critical',
    year: 2025,
    description: { zh: 'CVE-2025-26663 的同系列漏洞，同樣是 Windows LDAP 的 Use-After-Free 競態條件 RCE；未認證攻擊者可遠端執行任意程式碼，攻擊面涵蓋所有開放 LDAP 服務的 Windows 主機（含 DC）；同於 2025 年 4 月 Patch Tuesday 修補，並與 CVE-2025-26663 組合時增加可靠性', en: 'A companion vulnerability to CVE-2025-26663 — also a Use-After-Free race condition RCE in Windows LDAP. Unauthenticated attackers can execute arbitrary code remotely, affecting all Windows hosts running LDAP (including DCs). Patched in April 2025 Patch Tuesday alongside CVE-2025-26663; combining both increases exploitation reliability.', ja: 'CVE-2025-26663 の同系列脆弱性。同様に Windows LDAP の Use-After-Free 競合状態 RCE。未認証の攻撃者がリモートで任意のコードを実行でき、LDAP を実行するすべての Windows ホスト（DC を含む）に影響する。CVE-2025-26663 と同時に 2025 年 4 月 Patch Tuesday で修正。組み合わせることで悪用の信頼性が高まる。' },
    category: 'Initial Access',
    url: 'https://www.thezdi.com/blog/2025/4/8/the-april-2025-security-update-review',
    tools: []
  },
  {
    id: 'CVE-2025-26647',
    name: 'Kerberos CBA Certificate Auth Bypass EoP',
    severity: 'high',
    year: 2025,
    description: { zh: 'Kerberos 憑證式認證（CBA）在處理「非 NTAuth Store 受信任但具備 SKI 對應」的憑證頒發機構時存在驗證漏洞；攻擊者可利用此漏洞繞過認證並取得提升的 Kerberos 票據。必須在所有 DC 安裝 2025 年 4 月更新並設定 AllowNtAuthPolicyBypass 為 Enforcement 模式才能完全修補', en: 'A Kerberos certificate-based authentication (CBA) validation flaw when the issuing CA is trusted but not in the NTAuth store while a Subject Key Identifier (SKI) mapping exists. Attackers can bypass authentication and obtain elevated Kerberos tickets. Full remediation requires applying the April 2025 update to all DCs and setting AllowNtAuthPolicyBypass to Enforcement mode.', ja: 'Kerberos 証明書ベース認証（CBA）において、発行 CA が信頼されているが NTAuth ストアにない状態で SKI マッピングが存在する場合の検証欠陥。攻撃者は認証をバイパスして昇格された Kerberos チケットを取得できる。完全な修正には、すべての DC に 2025 年 4 月の更新を適用し、AllowNtAuthPolicyBypass を Enforcement モードに設定する必要がある。' },
    category: 'Privilege Escalation',
    url: 'https://support.microsoft.com/en-us/topic/protections-for-cve-2025-26647-kerberos-authentication-5f5d753b-4023-4dd3-b7b7-c8b104933d53',
    tools: ['Certipy', 'Rubeus']
  },
  {
    id: 'CVE-2025-29809',
    name: 'Kerberos Credential Guard Bypass',
    severity: 'high',
    year: 2025,
    description: { zh: 'Kerberos TGT 中 krbtgt 服務名稱驗證不足，導致 Virtualization-Based Security（VBS）保護下的 Windows Defender Credential Guard 可被繞過，允許本機已授權攻擊者洩漏 Kerberos 憑證；修補後仍需重新部署 VBS 原則才能完全修復。CVSS 7.1，2025 年 4 月 Patch Tuesday', en: 'Insufficient validation of the Kerberos krbtgt service name within a TGT allows an authorized local attacker to bypass Windows Defender Credential Guard (protected by Virtualization-Based Security) and leak Kerberos credentials. Patching alone is insufficient — VBS policy must also be redeployed. CVSS 7.1, April 2025 Patch Tuesday.', ja: 'TGT 内の Kerberos krbtgt サービス名の検証が不十分で、仮想化ベースのセキュリティ（VBS）で保護された Windows Defender Credential Guard をバイパスし、認証されたローカル攻撃者が Kerberos 認証情報を漏洩できる。パッチ適用だけでは不十分で、VBS ポリシーの再展開も必要。CVSS 7.1、2025 年 4 月 Patch Tuesday。' },
    category: 'Credential Dumping',
    url: 'https://www.netspi.com/blog/technical-blog/adversary-simulation/cve-2025-21299-cve-2025-29809-unguarding-microsoft-credential-guard/',
    tools: []
  },
  {
    id: 'CVE-2025-53779',
    name: 'BadSuccessor (dMSA Kerberos Privilege Escalation)',
    severity: 'high',
    year: 2025,
    description: { zh: 'Windows Server 2025 的 dMSA（delegated Managed Service Account）功能設計缺陷；任何對 OU 具備 CreateChild 權限的使用者可建立 dMSA 並偽造單向的繼承連結指向任意 AD 帳戶（含 DA、Protected Users），KDC 將目標帳戶的 SID 與 Kerberos 金鑰合併至 dMSA PAC，達成帳戶完全接管；PoC 工具 SharpSuccessor 已公開，91% 受測環境受影響。CVSS 7.2，2025 年 8 月 Patch Tuesday 修補', en: 'Design flaw in the Windows Server 2025 dMSA (delegated Managed Service Account) feature. Any user with CreateChild permission on an OU can create a dMSA and forge a one-sided successor link targeting any AD account (including DA, Protected Users). The KDC merges the target\'s SIDs and Kerberos keys into the dMSA PAC, fully compromising the target account. PoC tool SharpSuccessor is public; 91% of tested environments are affected. CVSS 7.2, patched August 2025 Patch Tuesday.', ja: 'Windows Server 2025 の dMSA（委任マネージドサービスアカウント）機能の設計欠陥。OU に CreateChild 権限を持つユーザーが dMSA を作成し、任意の AD アカウント（DA・Protected Users を含む）への一方向の後継リンクを偽造できる。KDC はターゲットの SID と Kerberos キーを dMSA PAC にマージし、アカウントを完全に乗っ取る。PoC ツール SharpSuccessor 公開済み、テスト環境の 91% が影響を受ける。CVSS 7.2、2025 年 8 月 Patch Tuesday で修正。' },
    category: 'Privilege Escalation',
    url: 'https://www.akamai.com/blog/security-research/abusing-dmsa-for-privilege-escalation-in-active-directory',
    tools: ['SharpSuccessor', 'Impacket']
  },
  {
    id: 'CVE-2025-54918',
    name: 'NTLM LDAP Auth Bypass → SYSTEM (High Severity)',
    severity: 'high',
    year: 2025,
    description: { zh: 'Windows NTLM 認證邏輯缺陷，可結合強制認證攻擊（Coercion）與 NTLM Relay 修改認證封包，繞過 LDAP Channel Binding 與 LDAP Signing 等標準強化措施，將標準網域使用者的認證中繼至 LDAP 取得 SYSTEM 等級存取權；即使環境已實施標準防護仍受影響；CVSS 8.8，2025 年 9 月 Patch Tuesday 修補，已有 4 個公開 PoC', en: 'A Windows NTLM authentication logic flaw that, combined with coerced authentication (e.g., PrinterBug) and NTLM relay with modified authentication packets, bypasses standard hardening measures including LDAP Channel Binding and LDAP Signing — relaying a standard domain user\'s credentials to LDAP for SYSTEM-level access. Environments with standard hardening are still affected. CVSS 8.8, patched September 2025 Patch Tuesday, 4 public PoCs available.', ja: 'Windows NTLM 認証ロジックの欠陥。強制認証攻撃（PrinterBug など）と認証パケットを改変した NTLM リレーを組み合わせることで、LDAP チャネルバインディングと LDAP 署名などの標準的な強化対策をバイパスし、標準ドメインユーザーの認証情報を LDAP にリレーして SYSTEM レベルのアクセスを取得。標準的な強化が実施された環境でも影響を受ける。CVSS 8.8、2025 年 9 月 Patch Tuesday で修正、公開 PoC 4 件。' },
    category: 'Privilege Escalation',
    url: 'https://www.crowdstrike.com/en-us/blog/analyzing-ntlm-ldap-authentication-bypass-vulnerability/',
    tools: ['Impacket', 'Responder']
  },
  {
    id: 'CVE-2025-60704',
    name: 'CheckSum — Kerberos Constrained Delegation MitM EoP',
    severity: 'high',
    year: 2025,
    description: { zh: 'Kerberos 受限委派（Constrained Delegation）S4U 協定流程中缺少關鍵的密碼學驗證步驟；攻擊者可透過中間人攻擊（MitM）操控 Kerberos 票據，冒充任意使用者並最終控制整個網域；無需初始權限即可發起，受影響範圍涵蓋所有啟用 Kerberos Delegation 的 AD 環境。由 Silverfort 發現並於 Black Hat EU 2025 揭露，CVSS 7.5，2025 年 11 月 Patch Tuesday 修補', en: 'A missing cryptographic validation step in the Kerberos Constrained Delegation (S4U) protocol flow. An attacker using a Man-in-the-Middle technique can manipulate Kerberos tickets to impersonate arbitrary users and ultimately gain full domain control. No initial privileges required; affects all AD environments with Kerberos Delegation enabled. Discovered by Silverfort and presented at Black Hat EU 2025. CVSS 7.5, patched November 2025 Patch Tuesday.', ja: 'Kerberos 制約委任（S4U）プロトコルフローにおける重要な暗号検証ステップの欠如。中間者攻撃（MitM）を使用して Kerberos チケットを操作し、任意のユーザーを偽装して最終的にドメイン全体を制御できる。初期権限不要、Kerberos 委任を有効にしたすべての AD 環境が影響を受ける。Silverfort が発見し Black Hat EU 2025 で発表。CVSS 7.5、2025 年 11 月 Patch Tuesday で修正。' },
    category: 'Privilege Escalation',
    url: 'https://www.silverfort.com/blog/you-win-some-you-checksum-kerberos-delegation-vulnerability-cve-2025-60704/',
    tools: []
  },
  {
    id: 'CVE-2026-26119',
    name: 'Windows Admin Center Improper Auth EoP',
    severity: 'high',
    year: 2026,
    description: { zh: 'Windows Admin Center（WAC，Port 6516）的不正當驗證漏洞；攻擊者無需使用者互動即可低權限遠端利用，在 WAC 管理的 AD 加入主機、Windows Server 及 Hyper-V 叢集上提升至管理員；2025 年 7 月由 Andrea Pierini（Semperis）發現，同年 12 月以 WAC 版本 2511 修補，2026 年 2 月公開揭露', en: 'Improper authentication vulnerability in Windows Admin Center (WAC, Port 6516). An attacker can exploit this remotely with low privileges and no user interaction to escalate to administrator on WAC-managed AD-joined hosts, Windows Servers, and Hyper-V clusters. Discovered by Andrea Pierini (Semperis) in July 2025, patched in December 2025 with WAC version 2511, publicly disclosed February 2026.', ja: 'Windows Admin Center（WAC、ポート 6516）の不正な認証の脆弱性。攻撃者は低権限・ユーザー操作なしでリモートから悪用し、WAC 管理下の AD 参加ホスト・Windows Server・Hyper-V クラスターで管理者に昇格できる。2025 年 7 月に Andrea Pierini（Semperis）が発見、同年 12 月に WAC バージョン 2511 で修正、2026 年 2 月に公開開示。' },
    category: 'Privilege Escalation',
    url: 'https://www.helpnetsecurity.com/2026/02/19/windows-admin-center-cve-2026-26119/',
    tools: []
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
  },
  {
    attack: 'Audit/Event Log Cleared',
    category: 'defense-evasion',
    eventIds: ['1102', '517'],
    descriptions: [
      { zh: '1102: 安全性稽核日誌已清除（攻擊者清除入侵痕跡的常見操作）', en: '1102: The audit log was cleared (common attacker action to remove intrusion traces)', ja: '1102: 監査ログがクリアされた（攻撃者が侵入痕跡を消去する一般的な操作）' },
      { zh: '517: 舊版 Windows 等效事件 — 系統記錄已清除', en: '517: Legacy Windows equivalent — system log cleared', ja: '517: レガシー Windows 等価イベント — システムログのクリア' }
    ]
  },
  {
    attack: 'Account Manipulation / Password Reset',
    category: 'persistence',
    eventIds: ['4722', '4723', '4724', '4738'],
    descriptions: [
      { zh: '4722: 使用者帳戶已啟用', en: '4722: A user account was enabled', ja: '4722: ユーザーアカウントが有効化された' },
      { zh: '4723: 嘗試變更帳戶密碼', en: '4723: An attempt was made to change an account password', ja: '4723: アカウントのパスワード変更が試行された' },
      { zh: '4724: 嘗試重設帳戶密碼（管理員操作）', en: '4724: An attempt was made to reset an account password (admin action)', ja: '4724: アカウントのパスワードリセットが試行された（管理者操作）' },
      { zh: '4738: 使用者帳戶屬性已變更', en: '4738: A user account was changed', ja: '4738: ユーザーアカウントが変更された' }
    ]
  },
  {
    attack: 'Local Group Membership Manipulation',
    category: 'persistence',
    eventIds: ['4732', '4733', '4728', '4729'],
    descriptions: [
      { zh: '4732: 成員已加入安全性群組（本機）', en: '4732: A member was added to a security-enabled local group', ja: '4732: セキュリティ有効ローカルグループにメンバーが追加された' },
      { zh: '4733: 成員已從安全性群組移除（本機）', en: '4733: A member was removed from a security-enabled local group', ja: '4733: セキュリティ有効ローカルグループからメンバーが削除された' },
      { zh: '4728/4729: 全域群組成員新增 / 移除', en: '4728/4729: Member added to / removed from a global group', ja: '4728/4729: グローバルグループへのメンバー追加・削除' }
    ]
  },
  {
    attack: 'Network Share Access / Lateral Movement',
    category: 'lateral-movement',
    eventIds: ['5140', '5145', '5142', '5143'],
    descriptions: [
      { zh: '5140: 網路共享物件已被存取（監控 ADMIN$、C$ 等管理共享）', en: '5140: A network share object was accessed (monitor ADMIN$, C$ admin shares)', ja: '5140: ネットワーク共有オブジェクトへのアクセス（ADMIN$、C$ などの管理共有を監視）' },
      { zh: '5145: 共享物件詳細稽核（含操作類型、存取遮罩）', en: '5145: Detailed network share audit (includes operation type and access mask)', ja: '5145: 詳細ネットワーク共有監査（操作タイプとアクセスマスクを含む）' },
      { zh: '5142/5143: 網路共享建立 / 修改', en: '5142/5143: Network share created / modified', ja: '5142/5143: ネットワーク共有の作成・変更' }
    ]
  },
  {
    attack: 'WMI Event Subscription Persistence',
    category: 'persistence',
    eventIds: ['5857', '5858', '5859', '5860', '5861'],
    descriptions: [
      { zh: '5857: WMI 活動：EventFilter 已啟動（偵測新增的 WMI 永久事件訂閱）', en: '5857: WMI activity: EventFilter was activated (detects newly added WMI permanent event subscriptions)', ja: '5857: WMI アクティビティ: EventFilter がアクティブ化された（新たに追加された WMI 永続的イベントサブスクリプションを検出）' },
      { zh: '5858: WMI 活動：查詢錯誤（異常 WMI 查詢可能為惡意工具的識別特徵）', en: '5858: WMI activity: Query error (abnormal WMI queries may be signatures of malicious tools)', ja: '5858: WMI アクティビティ: クエリエラー（異常な WMI クエリは悪意のあるツールのシグネチャである可能性）' },
      { zh: '5859/5860: WMI 活動：訂閱 / 過濾器已建立（監控 CommandLineEventConsumer 的建立）', en: '5859/5860: WMI activity: Subscription/Filter created (watch for CommandLineEventConsumer creation)', ja: '5859/5860: WMI アクティビティ: サブスクリプション・フィルター作成（CommandLineEventConsumer の作成を監視）' },
      { zh: '5861: WMI 活動：Binding 已建立（EventFilter 綁定 EventConsumer，惡意訂閱的關鍵指標）', en: '5861: WMI activity: Binding created (EventFilter bound to EventConsumer — a key indicator of malicious subscriptions)', ja: '5861: WMI アクティビティ: バインディング作成（EventFilter と EventConsumer のバインド — 悪意のあるサブスクリプションの主要な指標）' }
    ]
  },
  {
    attack: 'GPO Modification',
    category: 'persistence',
    eventIds: ['5136', '5137', '5141', '4662'],
    descriptions: [
      { zh: '5136: 目錄服務物件已修改（監控 GroupPolicyContainer 物件的屬性修改，特別是 gPCFileSysPath）', en: '5136: A directory service object was modified (monitor attribute modifications to GroupPolicyContainer objects, especially gPCFileSysPath)', ja: '5136: ディレクトリサービスオブジェクトが変更された（GroupPolicyContainer オブジェクトの属性変更、特に gPCFileSysPath を監視）' },
      { zh: '5137: 目錄服務物件已建立（監控新 GPO 建立）', en: '5137: A directory service object was created (monitor new GPO creation)', ja: '5137: ディレクトリサービスオブジェクトが作成された（新しい GPO の作成を監視）' },
      { zh: '5141: 目錄服務物件已刪除（監控 GPO 刪除，可能為攻擊後清除痕跡）', en: '5141: A directory service object was deleted (monitor GPO deletion, possibly to cover attack traces)', ja: '5141: ディレクトリサービスオブジェクトが削除された（GPO 削除を監視、攻撃痕跡消去の可能性）' },
      { zh: '4662: 已對物件執行操作（監控非管理員帳戶對 GPO 物件的寫入操作）', en: '4662: An operation was performed on an object (monitor write operations to GPO objects by non-admin accounts)', ja: '4662: オブジェクトに対して操作が実行された（非管理者アカウントによる GPO オブジェクトへの書き込み操作を監視）' }
    ]
  },
  {
    attack: 'DPAPI Credential Theft',
    category: 'credential-dumping',
    eventIds: ['4688', '4663', '4656'],
    descriptions: [
      { zh: '4688: 新程序已建立（監控 dpapi.dll 載入，或 mimikatz / SharpDPAPI 程序建立）', en: '4688: A new process was created (monitor dpapi.dll loading or mimikatz/SharpDPAPI process creation)', ja: '4688: 新しいプロセスが作成された（dpapi.dll の読み込みまたは mimikatz/SharpDPAPI プロセス作成を監視）' },
      { zh: '4663: 嘗試存取物件（監控對 %APPDATA%\\Microsoft\\Credentials\\ 與 %APPDATA%\\Microsoft\\Protect\\ 目錄的存取）', en: '4663: An attempt was made to access an object (monitor access to %APPDATA%\\Microsoft\\Credentials\\ and %APPDATA%\\Microsoft\\Protect\\ directories)', ja: '4663: オブジェクトへのアクセスが試行された（%APPDATA%\\Microsoft\\Credentials\\ と %APPDATA%\\Microsoft\\Protect\\ ディレクトリへのアクセスを監視）' },
      { zh: '4656: 已要求物件的控制碼（未預期的處理程序存取 Master Key 檔案為高度可疑指標）', en: '4656: A handle to an object was requested (unexpected process access to Master Key files is a high-suspicion indicator)', ja: '4656: オブジェクトへのハンドルが要求された（予期しないプロセスによるマスターキーファイルへのアクセスは高度に疑わしい指標）' }
    ]
  },
  {
    attack: 'SAM / Registry Credential Dump',
    category: 'credential-dumping',
    eventIds: ['4663', '4656', '4688'],
    descriptions: [
      { zh: '4663: 嘗試存取物件（監控對 HKLM\\SAM、HKLM\\SYSTEM 登錄機碼的存取）', en: '4663: An attempt was made to access an object (monitor access to HKLM\\SAM and HKLM\\SYSTEM registry keys)', ja: '4663: オブジェクトへのアクセスが試行された（HKLM\\SAM および HKLM\\SYSTEM レジストリキーへのアクセスを監視）' },
      { zh: '4656: 已要求物件的控制碼（非 winlogon/lsass 程序存取 SAM 機碼為異常行為）', en: '4656: A handle to an object was requested (non-winlogon/lsass processes accessing the SAM key are abnormal)', ja: '4656: オブジェクトへのハンドルが要求された（winlogon/lsass 以外のプロセスによる SAM キーへのアクセスは異常）' },
      { zh: '4688: 新程序已建立（監控 reg.exe save SAM、vssadmin create shadow 等指令）', en: '4688: A new process was created (monitor commands like reg.exe save SAM or vssadmin create shadow)', ja: '4688: 新しいプロセスが作成された（reg.exe save SAM や vssadmin create shadow などのコマンドを監視）' }
    ]
  },
  {
    attack: 'Passwords in SYSVOL / GPP',
    category: 'privilege-escalation',
    eventIds: ['5140', '4663'],
    descriptions: [
      { zh: '5140: 網路共享物件已被存取（監控對 SYSVOL 共享的存取，特別是針對 Groups.xml、Services.xml、Drives.xml 等 GPP 檔案）', en: '5140: A network share object was accessed (monitor access to the SYSVOL share, especially GPP files like Groups.xml, Services.xml, and Drives.xml)', ja: '5140: ネットワーク共有オブジェクトへのアクセス（SYSVOL 共有、特に Groups.xml・Services.xml・Drives.xml などの GPP ファイルへのアクセスを監視）' },
      { zh: '4663: 嘗試存取物件（對 Groups.xml 等含 cpassword 欄位的檔案的存取為高風險指標）', en: '4663: An attempt was made to access an object (access to Groups.xml and other files containing cpassword fields is a high-risk indicator)', ja: '4663: オブジェクトへのアクセスが試行された（cpassword フィールドを含む Groups.xml などのファイルへのアクセスは高リスク指標）' }
    ]
  },
  {
    attack: 'LSASS Memory Dump',
    category: 'credential-dumping',
    eventIds: ['4656', '4663', '10'],
    descriptions: [
      { zh: '4656: 已要求物件的控制碼（非 System / Antimalware 程序請求 LSASS 的 PROCESS_VM_READ 存取為高度可疑）', en: '4656: A handle to an object was requested (non-System/Antimalware processes requesting PROCESS_VM_READ on LSASS are highly suspicious)', ja: '4656: オブジェクトへのハンドルが要求された（System/Antimalware 以外のプロセスが LSASS に PROCESS_VM_READ アクセスを要求するのは高度に疑わしい）' },
      { zh: '4663: 嘗試存取物件（結合 PID 過濾監控 LSASS 記憶體讀取操作）', en: '4663: An attempt was made to access an object (monitor LSASS memory read operations combined with PID filtering)', ja: '4663: オブジェクトへのアクセスが試行された（PID フィルタリングと組み合わせて LSASS メモリ読み取り操作を監視）' },
      { zh: 'Sysmon Event 10: ProcessAccess – 監控以 PROCESS_VM_READ | PROCESS_DUP_HANDLE 存取 lsass.exe 的程序（Sysmon 為最有效的 LSASS Dump 偵測手段）', en: 'Sysmon Event 10: ProcessAccess – monitor processes accessing lsass.exe with PROCESS_VM_READ | PROCESS_DUP_HANDLE (Sysmon is the most effective means to detect LSASS dumps)', ja: 'Sysmon Event 10: ProcessAccess – PROCESS_VM_READ | PROCESS_DUP_HANDLE で lsass.exe にアクセスするプロセスを監視（Sysmon が LSASS ダンプ検出に最も効果的）' }
    ]
  },
  {
    attack: 'Backup Operators / SeBackupPrivilege Abuse',
    category: 'privilege-escalation',
    eventIds: ['4672', '4688', '4663'],
    descriptions: [
      { zh: '4672: 管理員登入（含 SeBackupPrivilege 的登入為高風險指標）', en: '4672: Special privileges assigned to new logon (logon with SeBackupPrivilege is a high-risk indicator)', ja: '4672: 新しいログオンに特権が割り当てられた（SeBackupPrivilege を含むログオンは高リスク指標）' },
      { zh: '4688: 新程序已建立（監控 reg.exe save SAM/SYSTEM、ntdsutil.exe 等備份相關指令）', en: '4688: A new process was created (monitor backup-related commands like reg.exe save SAM/SYSTEM, ntdsutil.exe)', ja: '4688: 新しいプロセスが作成された（reg.exe save SAM/SYSTEM・ntdsutil.exe などのバックアップ関連コマンドを監視）' },
      { zh: '4663: 嘗試存取物件（對 NTDS.dit、SYSTEM、SAM 等檔案的非預期存取）', en: '4663: An attempt was made to access an object (unexpected access to NTDS.dit, SYSTEM, SAM files)', ja: '4663: オブジェクトへのアクセスが試行された（NTDS.dit・SYSTEM・SAM ファイルへの予期しないアクセス）' }
    ]
  },
  {
    attack: 'Constrained Delegation S4U Abuse',
    category: 'privilege-escalation',
    eventIds: ['4769', '4768', '4674'],
    descriptions: [
      { zh: '4769: Kerberos 服務票據已請求（監控由非委派服務帳戶發出的 S4U2Proxy 請求：AddressType=0, 請求者≠使用者）', en: '4769: A Kerberos service ticket was requested (monitor S4U2Proxy requests from non-delegation service accounts: AddressType=0, requester ≠ user)', ja: '4769: Kerberos サービスチケットがリクエストされた（非委任サービスアカウントからの S4U2Proxy リクエストを監視: AddressType=0、リクエスター≠ユーザー）' },
      { zh: '4768: Kerberos TGT 已請求（S4U2Self 使用服務帳戶名義為其他使用者請求 TGT，可疑的代理 TGT 申請）', en: '4768: A Kerberos TGT was requested (S4U2Self requesting a TGT on behalf of another user using a service account — suspicious proxy TGT request)', ja: '4768: Kerberos TGT がリクエストされた（S4U2Self がサービスアカウント名で別ユーザーのために TGT をリクエスト — 疑わしいプロキシ TGT 申請）' },
      { zh: '4674: 嘗試對特殊權限物件進行操作（監控委派帳戶的特殊服務呼叫）', en: '4674: An operation was attempted on a privileged object (monitor special service calls from delegation accounts)', ja: '4674: 特権オブジェクトへの操作が試行された（委任アカウントからの特殊サービス呼び出しを監視）' }
    ]
  },
  {
    attack: 'RID Hijacking',
    category: 'persistence',
    eventIds: ['4738', '4657', '4624'],
    descriptions: [
      { zh: '4738: 使用者帳戶屬性已變更（監控非正常管理操作的帳戶屬性修改，特別是 SAM 相關欄位）', en: '4738: A user account was changed (monitor account attribute modifications outside normal admin operations, especially SAM-related fields)', ja: '4738: ユーザーアカウントが変更された（通常の管理操作以外のアカウント属性変更、特に SAM 関連フィールドを監視）' },
      { zh: '4657: 登錄值已修改（監控 HKLM\\SAM\\SAM\\Domains\\Account\\Users 下的 RID 值異常修改）', en: '4657: A registry value was modified (monitor abnormal RID value modifications under HKLM\\SAM\\SAM\\Domains\\Account\\Users)', ja: '4657: レジストリ値が変更された（HKLM\\SAM\\SAM\\Domains\\Account\\Users 下の RID 値の異常な変更を監視）' },
      { zh: '4624: 帳戶登入成功（若低權限帳戶以 0x1F4/500 等效 RID 登入並獲得管理員權限，為明確的 RID Hijacking 跡象）', en: '4624: An account was successfully logged on (if a low-privilege account logs on with 0x1F4/500-equivalent RID and gains admin privileges, this is a clear RID Hijacking indicator)', ja: '4624: アカウントのログオンに成功した（低権限アカウントが 0x1F4/500 相当の RID でログオンして管理者権限を取得した場合、明確な RID Hijacking の指標）' }
    ]
  },
  {
    attack: 'Azure AD Connect Credential Theft',
    category: 'credential-dumping',
    eventIds: ['4688', '4624', '7045'],
    descriptions: [
      { zh: '4688: 新程序已建立（監控 ADSync.exe 相關程序的異常存取，或 AADInternals / AdSyncDecrypt 工具的啟動）', en: '4688: A new process was created (monitor abnormal access to ADSync.exe-related processes or execution of AADInternals/AdSyncDecrypt tools)', ja: '4688: 新しいプロセスが作成された（ADSync.exe 関連プロセスへの異常アクセス、または AADInternals/AdSyncDecrypt ツールの起動を監視）' },
      { zh: '4624: 帳戶登入成功（MSOL_* 或 AAD_* 帳戶的異常登入位置或時間為警示指標）', en: '4624: An account was successfully logged on (unusual login location or time for MSOL_* or AAD_* accounts is an alert indicator)', ja: '4624: アカウントのログオンに成功した（MSOL_* または AAD_* アカウントの異常なログオン場所や時間は警告指標）' },
      { zh: '7045: 系統安裝了新服務（非預期的 ADSync 相關服務安裝或修改為異常行為）', en: '7045: A new service was installed on the system (unexpected ADSync-related service installation or modification is abnormal)', ja: '7045: 新しいサービスがインストールされた（予期しない ADSync 関連サービスのインストールまたは変更は異常）' }
    ]
  },
  {
    attack: 'Exchange Privilege Abuse (PrivExchange)',
    category: 'lateral-movement',
    eventIds: ['4662', '4648', '4624'],
    descriptions: [
      { zh: '4662: 已對物件執行操作（監控 Exchange 帳戶對 AD 根域物件的 WriteDACL / GenericAll 操作）', en: '4662: An operation was performed on an object (monitor Exchange account WriteDACL/GenericAll operations on the AD root domain object)', ja: '4662: オブジェクトに対して操作が実行された（Exchange アカウントによる AD ルートドメインオブジェクトへの WriteDACL/GenericAll 操作を監視）' },
      { zh: '4648: 使用明確憑證嘗試登入（Exchange 伺服器向非正常目標進行 NTLM 認證為強制認證攻擊指標）', en: '4648: A logon was attempted using explicit credentials (Exchange server performing NTLM authentication to an unusual target is a coercion attack indicator)', ja: '4648: 明示的な認証情報を使用してログオンが試みられた（Exchange サーバーが通常でないターゲットへ NTLM 認証を行うのは強制認証攻撃の指標）' },
      { zh: '4624: 帳戶登入成功（Exchange 服務帳戶以網路登入（Type 3）連線至 LDAP 服務為異常行為）', en: '4624: An account was successfully logged on (Exchange service account connecting to LDAP services via network logon (Type 3) is abnormal)', ja: '4624: アカウントのログオンに成功した（Exchange サービスアカウントがネットワークログオン（タイプ 3）で LDAP サービスに接続するのは異常）' }
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
  { name: 'Kerbrute', type: 'offensive', url: 'https://github.com/ropnop/kerbrute', description: { zh: '以 Kerberos 協定進行使用者名稱列舉與密碼噴灑的 Go 語言工具；不產生 LDAP 查詢，隱蔽性較高；可枚舉有效帳戶並進行 AS-REP Roasting', en: 'Go-based tool for Kerberos username enumeration and password spraying. Avoids LDAP queries for lower detection; can enumerate valid accounts and perform AS-REP Roasting.', ja: 'Kerberos プロトコルを使用したユーザー名列挙とパスワードスプレーの Go 製ツール。LDAP クエリを回避して検出を下げる。有効なアカウントの列挙と AS-REP Roasting が可能。' }, tags: ['Kerberos', 'Go', '列舉', '密碼噴灑'] },
  { name: 'evil-winrm', type: 'offensive', url: 'https://github.com/Hackplayers/evil-winrm', description: { zh: '功能完整的 WinRM Shell 工具，支援檔案上傳下載、PowerShell 腳本載入、AMSI Bypass、Pass-the-Hash 及 Pass-the-Ticket 認證', en: 'Full-featured WinRM shell tool supporting file upload/download, PowerShell script loading, AMSI bypass, Pass-the-Hash, and Pass-the-Ticket authentication', ja: 'ファイルアップロード・ダウンロード・PowerShell スクリプト読み込み・AMSI バイパス・Pass-the-Hash・Pass-the-Ticket 認証をサポートする機能豊富な WinRM シェルツール' }, tags: ['WinRM', 'Ruby', '橫向移動', 'Shell'] },
  { name: 'PKINITtools', type: 'offensive', url: 'https://github.com/dirkjanm/PKINITtools', description: { zh: 'Dirk-jan Mollema 開發的 PKINIT 工具集；gettgtpkinit.py 以憑證取得 TGT，gets4uticket.py 以 U2U 解密 PAC_CREDENTIAL_INFO 提取 NT Hash（UnPAC-the-Hash）', en: 'PKINIT toolkit by Dirk-jan Mollema. gettgtpkinit.py obtains TGTs using certificates; gets4uticket.py decrypts PAC_CREDENTIAL_INFO via U2U to extract NT hashes (UnPAC-the-Hash)', ja: 'Dirk-jan Mollema 作の PKINIT ツールキット。gettgtpkinit.py で証明書を使って TGT を取得し、gets4uticket.py で U2U を使って PAC_CREDENTIAL_INFO を復号して NT ハッシュを抽出（UnPAC-the-Hash）' }, tags: ['PKINIT', 'Python', 'Kerberos', 'UnPAC'] },
  { name: 'KrbRelayUp', type: 'offensive', url: 'https://github.com/Dec0ne/KrbRelayUp', description: { zh: 'KrbRelay 的整合工具，自動化執行 Kerberos Relay → RBCD 設定 → S4U2Self+S4U2Proxy → 本機提升至 SYSTEM 的完整攻擊鏈，無需網路憑證', en: 'Integrated KrbRelay toolchain that automates the full attack chain: Kerberos Relay → RBCD configuration → S4U2Self+S4U2Proxy → local SYSTEM escalation, with no network credentials required', ja: 'KrbRelay の統合ツール。Kerberos Relay → RBCD 設定 → S4U2Self+S4U2Proxy → ローカル SYSTEM 昇格の完全な攻撃チェーンをネットワーク認証情報なしで自動化する' }, tags: ['KrbRelay', 'RBCD', 'C#', '提權'] },
  { name: 'BackupOperatorToDA', type: 'offensive', url: 'https://github.com/mpgn/BackupOperatorToDA', description: { zh: '利用 SeBackupPrivilege 從遠端備份 NTDS.dit 與 SYSTEM 登錄機碼，再透過 Impacket 離線提取所有網域帳戶雜湊值，達成 Backup Operators → Domain Admin 提升', en: 'Uses SeBackupPrivilege to remotely back up NTDS.dit and the SYSTEM registry hive, then extracts all domain account hashes offline via Impacket — achieving Backup Operators → Domain Admin escalation', ja: 'SeBackupPrivilege を使って NTDS.dit と SYSTEM レジストリハイブをリモートバックアップし、Impacket でオフライン全ドメインアカウントのハッシュを抽出。Backup Operators → Domain Admin 昇格を達成する' }, tags: ['SeBackupPrivilege', 'C#', '提權', 'NTDS'] },
  { name: 'PrivExchange', type: 'offensive', url: 'https://github.com/dirkjanm/PrivExchange', description: { zh: '利用 Exchange EWS PushSubscription 強制 Exchange 伺服器向攻擊者進行 NTLM 認證，再中繼至 LDAP 取得 DCSync 權限（CVE-2019-0724）', en: 'Abuses Exchange EWS PushSubscription to force the Exchange server to perform NTLM authentication to the attacker, relayed to LDAP to obtain DCSync rights (CVE-2019-0724)', ja: 'Exchange EWS PushSubscription を悪用して Exchange サーバーに攻撃者への NTLM 認証を強制し、LDAP にリレーして DCSync 権限を取得（CVE-2019-0724）' }, tags: ['Exchange', 'NTLM', 'Python', '提權'] },
  { name: 'LaZagne', type: 'offensive', url: 'https://github.com/AlessandroZ/LaZagne', description: { zh: '從 Windows 與 Linux 系統提取儲存在各種應用程式中的明文密碼，支援瀏覽器、WiFi、RDP、Windows Credential Manager 等數十種來源', en: 'Extract plaintext passwords stored in various applications on Windows and Linux, supporting dozens of sources including browsers, WiFi, RDP, and Windows Credential Manager', ja: 'Windows と Linux のさまざまなアプリケーションに保存された平文パスワードを抽出。ブラウザ・WiFi・RDP・Windows Credential Manager など数十種類のソースをサポート' }, tags: ['憑證', 'Python', '密碼', '多來源'] },
  { name: 'noPac', type: 'offensive', url: 'https://github.com/Ridter/noPac', description: { zh: 'CVE-2021-42278 + CVE-2021-42287 組合利用工具（noPac 攻擊鏈），可在數秒內從標準網域使用者提升至域管理員並取得 Shell', en: 'Combined exploit tool for CVE-2021-42278 + CVE-2021-42287 (noPac attack chain) that escalates from a standard domain user to Domain Admin and obtains a shell in seconds', ja: 'CVE-2021-42278 + CVE-2021-42287 の組み合わせ悪用ツール（noPac 攻撃チェーン）。数秒で標準ドメインユーザーからドメイン管理者に昇格してシェルを取得する' }, tags: ['CVE-2021-42278', 'CVE-2021-42287', 'Python', '提權'] },
  // Defensive Tools
  { name: 'PingCastle', type: 'defensive', url: 'https://www.pingcastle.com/', description: { zh: '快速評估 AD 安全層級的工具，基於風險評估與成熟度框架產生評分報告', en: 'Tool for rapid AD security level assessment, generating scored reports based on risk assessment and maturity frameworks', ja: 'リスク評価と成熟度フレームワークに基づいてスコアレポートを生成する AD セキュリティレベルの迅速評価ツール' }, tags: ['稽核', '評估', '報告', '合規'] },
  { name: 'ADRecon', type: 'defensive', url: 'https://github.com/sense-of-security/ADRecon', description: { zh: '收集 AD 環境全面資訊並產生 Excel 報告，提供整體安全狀況視圖', en: 'Collect comprehensive AD environment information and generate Excel reports providing an overall security posture view', ja: 'AD 環境の包括的な情報を収集して Excel レポートを生成し、全体的なセキュリティ状況を提供する' }, tags: ['稽核', 'Excel', '報告', '偵察'] },
  { name: 'Locksmith', type: 'defensive', url: 'https://github.com/TrimarcJake/Locksmith', description: { zh: '尋找並修復 AD CS 常見錯誤設定的小型工具', en: 'Small tool to find and fix common AD CS misconfigurations', ja: 'AD CS の一般的な設定ミスを発見・修正する小型ツール' }, tags: ['AD CS', '修復', '稽核', '合規'] },
  { name: 'FalconHound', type: 'defensive', url: 'https://github.com/FalconForceTeam/FalconHound', description: { zh: '藍隊多功能工具，結合 BloodHound 自動化分析，整合 SIEM', en: 'Multi-purpose blue team tool that integrates BloodHound automated analysis with SIEM', ja: 'BloodHound 自動分析と SIEM を統合した、ブルーチーム向け多目的ツール' }, tags: ['BloodHound', '藍隊', 'SIEM', '自動化'] },
  { name: 'PlumHound', type: 'defensive', url: 'https://github.com/PlumHound/PlumHound', description: { zh: '藍隊/紫隊的 BloodHound 工具，自動化產生安全報告', en: 'BloodHound-powered tool for blue/purple teams that automates security report generation', ja: 'セキュリティレポート生成を自動化する、ブルー・パープルチーム向け BloodHound ツール' }, tags: ['BloodHound', '藍隊', '紫隊', '報告'] },
  { name: 'Sigma', type: 'defensive', url: 'https://github.com/Neo23x0/sigma/', description: { zh: 'SIEM 系統通用簽章格式，可轉換為 Splunk/ELK 等平台規則', en: 'Generic signature format for SIEM systems, convertible to rules for platforms like Splunk and ELK', ja: 'Splunk や ELK などのプラットフォームのルールに変換できる SIEM システム向けの汎用シグネチャ形式' }, tags: ['SIEM', '偵測規則', '標準化', '日誌'] },
  { name: 'Sysmon', type: 'defensive', url: 'https://learn.microsoft.com/en-us/sysinternals/downloads/sysmon', description: { zh: 'Windows 系統監控服務，記錄詳細的程序、網路、檔案系統活動', en: 'Windows system monitoring service that records detailed process, network, and file system activity', ja: 'プロセス・ネットワーク・ファイルシステムの詳細な活動を記録する Windows システム監視サービス' }, tags: ['監控', '日誌', '事件', 'Microsoft'] },
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
          { type: 'cmd', text: { zh: '# 安裝 LAPS Schema 擴充（在 DC 以 Schema Admin 執行）\nImport-Module AdmPwd.PS\nUpdate-AdmPwdADSchema', en: '# Install LAPS Schema extension (run on DC as Schema Admin)\nImport-Module AdmPwd.PS\nUpdate-AdmPwdADSchema', ja: '# LAPS スキーマ拡張をインストールする（DC 上で Schema Admin として実行）\nImport-Module AdmPwd.PS\nUpdate-AdmPwdADSchema' } },
          { type: 'cmd', text: { zh: '# 授予電腦帳戶自行回報密碼的權限\nSet-AdmPwdComputerSelfPermission -OrgUnit "OU=Workstations,DC=corp,DC=local"', en: '# Grant computer accounts permission to self-report passwords\nSet-AdmPwdComputerSelfPermission -OrgUnit "OU=Workstations,DC=corp,DC=local"', ja: '# コンピューターアカウントに自己パスワード報告の権限を付与する\nSet-AdmPwdComputerSelfPermission -OrgUnit "OU=Workstations,DC=corp,DC=local"' } },
          { type: 'cmd', text: { zh: '# 授予特定群組讀取 LAPS 密碼的權限\nSet-AdmPwdReadPasswordPermission -OrgUnit "OU=Workstations,DC=corp,DC=local" -AllowedPrincipals "CORP\\HelpDesk"', en: '# Grant a specific group permission to read LAPS passwords\nSet-AdmPwdReadPasswordPermission -OrgUnit "OU=Workstations,DC=corp,DC=local" -AllowedPrincipals "CORP\\HelpDesk"', ja: '# 特定グループに LAPS パスワードの読み取り権限を付与する\nSet-AdmPwdReadPasswordPermission -OrgUnit "OU=Workstations,DC=corp,DC=local" -AllowedPrincipals "CORP\\HelpDesk"' } },
          { type: 'info', text: { zh: 'GPO 設定路徑：Computer Configuration → Administrative Templates → LAPS → Enable local admin password management → Enabled；Password Settings 設定長度 ≥ 15、複雜度開啟', en: 'GPO path: Computer Configuration → Administrative Templates → LAPS → Enable local admin password management → Enabled; set Password Settings length ≥ 15 and enable complexity', ja: 'GPO パス: コンピューターの構成 → 管理用テンプレート → LAPS → ローカル管理者パスワード管理を有効にする → 有効; パスワード設定で長さ ≥ 15、複雑さを有効に設定' } },
          { type: 'cmd', text: { zh: '# 驗證部署結果\nGet-ADComputer -Filter * -Properties ms-Mcs-AdmPwdExpirationTime | Where-Object { $_."ms-Mcs-AdmPwdExpirationTime" -ne $null }', en: '# Verify deployment results\nGet-ADComputer -Filter * -Properties ms-Mcs-AdmPwdExpirationTime | Where-Object { $_."ms-Mcs-AdmPwdExpirationTime" -ne $null }', ja: '# 展開結果を確認する\nGet-ADComputer -Filter * -Properties ms-Mcs-AdmPwdExpirationTime | Where-Object { $_."ms-Mcs-AdmPwdExpirationTime" -ne $null }' } }
        ]
      },
      {
        text: { zh: '啟用 RDP Restricted Admin Mode', en: 'Enable RDP Restricted Admin Mode', ja: 'RDP 制限付き管理者モードを有効にする' },
        detail: { zh: '防止憑證暴露在遠端系統', en: 'Prevent credentials from being exposed on remote systems', ja: 'リモートシステムへの認証情報の露出を防止する' },
        steps: [
          { type: 'cmd', text: { zh: '# 在目標系統啟用 Restricted Admin Mode\nreg add "HKLM\\System\\CurrentControlSet\\Control\\Lsa" /v DisableRestrictedAdmin /t REG_DWORD /d 0 /f', en: '# Enable Restricted Admin Mode on the target system\nreg add "HKLM\\System\\CurrentControlSet\\Control\\Lsa" /v DisableRestrictedAdmin /t REG_DWORD /d 0 /f', ja: '# ターゲットシステムで Restricted Admin Mode を有効にする\nreg add "HKLM\\System\\CurrentControlSet\\Control\\Lsa" /v DisableRestrictedAdmin /t REG_DWORD /d 0 /f' } },
          { type: 'info', text: { zh: '使用 Restricted Admin 連線：mstsc /v:目標主機 /RestrictedAdmin', en: 'Connect using Restricted Admin: mstsc /v:<target_host> /RestrictedAdmin', ja: '制限付き管理者で接続: mstsc /v:ターゲットホスト /RestrictedAdmin' } },
          { type: 'info', text: { zh: 'GPO 強制啟用：Computer Configuration → Windows Settings → Security Settings → Local Policies → Security Options → "Require use of Restricted Admin Mode for Remote Desktop connections"', en: 'Force via GPO: Computer Configuration → Windows Settings → Security Settings → Local Policies → Security Options → "Require use of Restricted Admin Mode for Remote Desktop connections"', ja: 'GPO で強制: コンピューターの構成 → Windows の設定 → セキュリティ設定 → ローカルポリシー → セキュリティオプション → "リモートデスクトップ接続に制限付き管理者モードの使用を要求する"' } },
          { type: 'warn', text: { zh: '注意：Restricted Admin Mode 本身可能遭受 Pass-the-Hash 攻擊，應搭配 Protected Users 群組使用', en: 'Warning: Restricted Admin Mode itself may be vulnerable to Pass-the-Hash attacks; use in conjunction with the Protected Users group', ja: '注意: 制限付き管理者モード自体が Pass-the-Hash 攻撃に対して脆弱な場合があります。Protected Users グループと併用してください' } }
        ]
      },
      {
        text: { zh: '確保所有管理員帳戶設定「敏感且不可委派」', en: 'Ensure all admin accounts are set to "Account is sensitive and cannot be delegated"', ja: '全管理者アカウントに「アカウントは重要であり、委任できない」を設定する' },
        detail: { zh: '防止 Kerberos 委派攻擊', en: 'Prevent Kerberos delegation attacks', ja: 'Kerberos 委任攻撃を防止する' },
        steps: [
          { type: 'cmd', text: { zh: '# 批次設定 Domain Admins 成員為不可委派\nGet-ADGroupMember "Domain Admins" -Recursive | Where-Object { $_.objectClass -eq "user" } | Set-ADUser -AccountNotDelegated $true', en: '# Batch-set all Domain Admins members to non-delegatable\nGet-ADGroupMember "Domain Admins" -Recursive | Where-Object { $_.objectClass -eq "user" } | Set-ADUser -AccountNotDelegated $true', ja: '# Domain Admins のメンバーを一括で委任不可に設定する\nGet-ADGroupMember "Domain Admins" -Recursive | Where-Object { $_.objectClass -eq "user" } | Set-ADUser -AccountNotDelegated $true' } },
          { type: 'cmd', text: { zh: '# 驗證設定結果\nGet-ADUser -Filter { AccountNotDelegated -ne $true } -SearchBase "OU=Admins,DC=corp,DC=local" | Select Name, AccountNotDelegated', en: '# Verify configuration results\nGet-ADUser -Filter { AccountNotDelegated -ne $true } -SearchBase "OU=Admins,DC=corp,DC=local" | Select Name, AccountNotDelegated', ja: '# 設定結果を確認する\nGet-ADUser -Filter { AccountNotDelegated -ne $true } -SearchBase "OU=Admins,DC=corp,DC=local" | Select Name, AccountNotDelegated' } },
          { type: 'info', text: { zh: 'GUI 設定：Active Directory Users and Computers → 帳戶屬性 → Account 頁籤 → 勾選 "Account is sensitive and cannot be delegated"', en: 'GUI setting: Active Directory Users and Computers → Account properties → Account tab → Check "Account is sensitive and cannot be delegated"', ja: 'GUI 設定: Active Directory ユーザーとコンピューター → アカウントのプロパティ → アカウント タブ → "アカウントは重要なので委任できない" にチェック' } }
        ]
      },
      {
        text: { zh: '將管理員帳戶加入 Protected Users 群組', en: 'Add admin accounts to the Protected Users group', ja: '管理者アカウントを Protected Users グループに追加する' },
        detail: { zh: '需要 Windows Server 2012 R2+ 功能等級', en: 'Requires Windows Server 2012 R2+ functional level', ja: 'Windows Server 2012 R2 以上の機能レベルが必要' },
        steps: [
          { type: 'cmd', text: { zh: '# 將管理員帳戶加入 Protected Users\nAdd-ADGroupMember -Identity "Protected Users" -Members "AdminUser1","AdminUser2"', en: '# Add admin accounts to Protected Users\nAdd-ADGroupMember -Identity "Protected Users" -Members "AdminUser1","AdminUser2"', ja: '# 管理者アカウントを Protected Users に追加する\nAdd-ADGroupMember -Identity "Protected Users" -Members "AdminUser1","AdminUser2"' } },
          { type: 'info', text: { zh: 'Protected Users 效果：禁止 NTLM/RC4/DES 認證、TGT 存活時間縮短至 4 小時、無法使用 CredSSP / WDigest / Digest 認證', en: 'Protected Users effects: Disables NTLM/RC4/DES authentication, reduces TGT lifetime to 4 hours, disables CredSSP/WDigest/Digest authentication', ja: 'Protected Users の効果: NTLM/RC4/DES 認証を無効化、TGT の有効期間を 4 時間に短縮、CredSSP/WDigest/Digest 認証を無効化' } },
          { type: 'warn', text: { zh: '注意：加入後若服務帳戶依賴 NTLM 可能造成認證失敗，先在測試環境驗證', en: 'Warning: If service accounts rely on NTLM, adding them may cause authentication failures; test in a non-production environment first', ja: '注意: サービスアカウントが NTLM に依存している場合、追加すると認証が失敗する可能性があります。事前にテスト環境で確認してください' } },
          { type: 'cmd', text: { zh: '# 確認網域功能等級 ≥ Windows Server 2012 R2\n(Get-ADDomain).DomainMode', en: '# Confirm domain functional level ≥ Windows Server 2012 R2\n(Get-ADDomain).DomainMode', ja: '# ドメイン機能レベル ≥ Windows Server 2012 R2 を確認する\n(Get-ADDomain).DomainMode' } }
        ]
      },
      {
        text: { zh: '停用所有非活躍管理員帳戶', en: 'Disable all inactive admin accounts', ja: 'すべての非アクティブな管理者アカウントを無効化する' },
        detail: { zh: '定期審查並移除不需要的特權帳戶', en: 'Periodically review and remove unnecessary privileged accounts', ja: '定期的に不要な特権アカウントを確認・削除する' },
        steps: [
          { type: 'cmd', text: { zh: '# 列出 90 天未使用的特權帳戶\nSearch-ADAccount -AccountInactive -TimeSpan (New-TimeSpan -Days 90) -UsersOnly | Where-Object { (Get-ADUser $_ -Properties MemberOf).MemberOf -match "Admin" }', en: '# List privileged accounts inactive for 90 days\nSearch-ADAccount -AccountInactive -TimeSpan (New-TimeSpan -Days 90) -UsersOnly | Where-Object { (Get-ADUser $_ -Properties MemberOf).MemberOf -match "Admin" }', ja: '# 90 日間使用されていない特権アカウントを一覧表示する\nSearch-ADAccount -AccountInactive -TimeSpan (New-TimeSpan -Days 90) -UsersOnly | Where-Object { (Get-ADUser $_ -Properties MemberOf).MemberOf -match "Admin" }' } },
          { type: 'cmd', text: { zh: '# 停用指定帳戶\nDisable-ADAccount -Identity "stale_admin"\nMove-ADObject -Identity "CN=stale_admin,OU=Admins,DC=corp,DC=local" -TargetPath "OU=Disabled,DC=corp,DC=local"', en: '# Disable the specified account\nDisable-ADAccount -Identity "stale_admin"\nMove-ADObject -Identity "CN=stale_admin,OU=Admins,DC=corp,DC=local" -TargetPath "OU=Disabled,DC=corp,DC=local"', ja: '# 指定したアカウントを無効化する\nDisable-ADAccount -Identity "stale_admin"\nMove-ADObject -Identity "CN=stale_admin,OU=Admins,DC=corp,DC=local" -TargetPath "OU=Disabled,DC=corp,DC=local"' } },
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
          { type: 'cmd', text: { zh: '# 第一次重設（在 PDC Emulator 上執行）\n.\\New-KrbtgtKeys.ps1 -OperationMode 1', en: '# First reset (run on PDC Emulator)\n.\\New-KrbtgtKeys.ps1 -OperationMode 1', ja: '# 1 回目のリセット（PDC エミュレーター上で実行）\n.\\New-KrbtgtKeys.ps1 -OperationMode 1' } },
          { type: 'warn', text: { zh: '等待 ≥ 10 小時（最大 Kerberos TGT 存活時間），確保所有 DC 完成複寫並讓現有 TGT 過期', en: 'Wait ≥ 10 hours (maximum Kerberos TGT lifetime) to ensure all DCs have replicated and existing TGTs have expired', ja: '≥ 10 時間待機（最大 Kerberos TGT 有効期間）して、すべての DC が複製を完了し既存の TGT が期限切れになることを確認する' } },
          { type: 'cmd', text: { zh: '# 驗證 DC 複寫正常後執行第二次重設\nrepadmin /replsummary\n.\\New-KrbtgtKeys.ps1 -OperationMode 1', en: '# Verify DC replication is healthy, then perform the second reset\nrepadmin /replsummary\n.\\New-KrbtgtKeys.ps1 -OperationMode 1', ja: '# DC レプリケーションが正常であることを確認してから 2 回目のリセットを実行する\nrepadmin /replsummary\n.\\New-KrbtgtKeys.ps1 -OperationMode 1' } },
          { type: 'cmd', text: { zh: '# 驗證 KRBTGT 密碼已更新（確認 PasswordLastSet 時間）\nGet-ADUser krbtgt -Properties PasswordLastSet | Select PasswordLastSet', en: '# Verify the KRBTGT password has been updated (confirm PasswordLastSet time)\nGet-ADUser krbtgt -Properties PasswordLastSet | Select PasswordLastSet', ja: '# KRBTGT パスワードが更新されたことを確認する（PasswordLastSet の時刻を確認）\nGet-ADUser krbtgt -Properties PasswordLastSet | Select PasswordLastSet' } }
        ]
      },
      {
        text: { zh: '限制 AD 管理員成員（DA、EA、Schema Admins）', en: 'Restrict AD admin group membership (DA, EA, Schema Admins)', ja: 'AD 管理者グループのメンバーシップを制限する（DA、EA、Schema Admins）' },
        detail: { zh: '僅使用自訂委派群組，避免過度授權', en: 'Use only custom delegation groups to avoid over-privileging', ja: 'カスタム委任グループのみを使用して過剰な権限付与を避ける' },
        steps: [
          { type: 'cmd', text: { zh: '# 檢查各高權限群組成員數\n@("Domain Admins","Enterprise Admins","Schema Admins") | ForEach-Object { "$_ : $((Get-ADGroupMember $_ -Recursive | Measure-Object).Count) 個成員" }', en: '# Check the member count of each high-privilege group\n@("Domain Admins","Enterprise Admins","Schema Admins") | ForEach-Object { "$_ : $((Get-ADGroupMember $_ -Recursive | Measure-Object).Count) 個成員" }', ja: '# 各高権限グループのメンバー数を確認する\n@("Domain Admins","Enterprise Admins","Schema Admins") | ForEach-Object { "$_ : $((Get-ADGroupMember $_ -Recursive | Measure-Object).Count) 個成員" }' } },
          { type: 'info', text: { zh: 'Domain Admins 建議成員數 ≤ 5；Enterprise Admins 平時應為空，需要時才臨時加入；Schema Admins 平時應為空', en: 'Domain Admins: ≤ 5 members recommended; Enterprise Admins: should be empty by default, added temporarily when needed; Schema Admins: should be empty by default', ja: 'Domain Admins: 推奨メンバー数 ≤ 5; Enterprise Admins: 通常は空にし、必要なときだけ一時的に追加; Schema Admins: 通常は空にする' } },
          { type: 'cmd', text: { zh: '# 移除不必要的成員\nRemove-ADGroupMember -Identity "Domain Admins" -Members "UserToRemove" -Confirm:$false', en: '# Remove unnecessary members\nRemove-ADGroupMember -Identity "Domain Admins" -Members "UserToRemove" -Confirm:$false', ja: '# 不要なメンバーを削除する\nRemove-ADGroupMember -Identity "Domain Admins" -Members "UserToRemove" -Confirm:$false' } },
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
          { type: 'cmd', text: { zh: '# GPO 限制 Tier 0 帳戶只能登入 DC（套用至 Domain Controllers OU）\n# Security Settings → Local Policies → User Rights Assignment:\n# "Allow log on locally" → 僅 Tier 0 管理員群組\n# "Deny log on locally" → Tier 1 / Tier 2 帳戶', en: '# GPO restricts Tier 0 accounts to log on to DCs only (apply to Domain Controllers OU)\n# Security Settings → Local Policies → User Rights Assignment:\n# "Allow log on locally" → Tier 0 admin group only\n# "Deny log on locally" → Tier 1 / Tier 2 accounts', ja: '# GPO で Tier 0 アカウントを DC のみにログオン制限する（Domain Controllers OU に適用）\n# Security Settings → Local Policies → User Rights Assignment:\n# "Allow log on locally" → Tier 0 管理者グループのみ\n# "Deny log on locally" → Tier 1 / Tier 2 アカウント' } },
          { type: 'cmd', text: { zh: '# 建立 Tier 0 帳戶登入限制（Authentication Policy）\nNew-ADAuthenticationPolicy -Name "Tier0-Policy" -UserAllowedToAuthenticateTo "O:SYG:SYD:(XA;OICI;CR;;;WD;(@USER.ad://ext/AuthenticationSilo == \\"Tier0Silo\\"))"', en: '# Create Tier 0 account login restriction (Authentication Policy)\nNew-ADAuthenticationPolicy -Name "Tier0-Policy" -UserAllowedToAuthenticateTo "O:SYG:SYD:(XA;OICI;CR;;;WD;(@USER.ad://ext/AuthenticationSilo == \\"Tier0Silo\\"))"', ja: '# Tier 0 アカウントのログイン制限を作成する（Authentication Policy）\nNew-ADAuthenticationPolicy -Name "Tier0-Policy" -UserAllowedToAuthenticateTo "O:SYG:SYD:(XA;OICI;CR;;;WD;(@USER.ad://ext/AuthenticationSilo == \\"Tier0Silo\\"))"' } }
        ]
      },
      {
        text: { zh: '稽核 Kerberos 委派設定', en: 'Audit Kerberos delegation configuration', ja: 'Kerberos 委任の設定を監査する' },
        detail: { zh: '識別並移除不必要的無限制委派', en: 'Identify and remove unnecessary unconstrained delegation', ja: '不要な無制限委任を特定して削除する' },
        steps: [
          { type: 'cmd', text: { zh: '# 查詢所有使用者帳戶的無限制委派\nGet-ADUser -Filter { TrustedForDelegation -eq $true } -Properties TrustedForDelegation,ServicePrincipalName | Select Name,SamAccountName,ServicePrincipalName', en: '# Query all user accounts with unconstrained delegation\nGet-ADUser -Filter { TrustedForDelegation -eq $true } -Properties TrustedForDelegation,ServicePrincipalName | Select Name,SamAccountName,ServicePrincipalName', ja: '# 無制限委任を持つすべてのユーザーアカウントを照会する\nGet-ADUser -Filter { TrustedForDelegation -eq $true } -Properties TrustedForDelegation,ServicePrincipalName | Select Name,SamAccountName,ServicePrincipalName' } },
          { type: 'cmd', text: { zh: '# 查詢所有電腦帳戶的無限制委派（DC 除外）\nGet-ADComputer -Filter { TrustedForDelegation -eq $true } -Properties TrustedForDelegation | Where-Object { $_.DistinguishedName -notmatch "OU=Domain Controllers" } | Select Name', en: '# Query all computer accounts with unconstrained delegation (excluding DCs)\nGet-ADComputer -Filter { TrustedForDelegation -eq $true } -Properties TrustedForDelegation | Where-Object { $_.DistinguishedName -notmatch "OU=Domain Controllers" } | Select Name', ja: '# 無制限委任を持つすべてのコンピューターアカウントを照会する（DC を除く）\nGet-ADComputer -Filter { TrustedForDelegation -eq $true } -Properties TrustedForDelegation | Where-Object { $_.DistinguishedName -notmatch "OU=Domain Controllers" } | Select Name' } },
          { type: 'cmd', text: { zh: '# 查詢受限制委派（Constrained Delegation）清單\nGet-ADObject -Filter { msDS-AllowedToDelegateTo -ne "$null" } -Properties msDS-AllowedToDelegateTo | Select Name,"msDS-AllowedToDelegateTo"', en: '# Query the list of constrained delegation\nGet-ADObject -Filter { msDS-AllowedToDelegateTo -ne "$null" } -Properties msDS-AllowedToDelegateTo | Select Name,"msDS-AllowedToDelegateTo"', ja: '# 制限委任（Constrained Delegation）の一覧を照会する\nGet-ADObject -Filter { msDS-AllowedToDelegateTo -ne "$null" } -Properties msDS-AllowedToDelegateTo | Select Name,"msDS-AllowedToDelegateTo"' } },
          { type: 'cmd', text: { zh: '# 移除不必要的無限制委派\nSet-ADUser -Identity "svc_account" -TrustedForDelegation $false', en: '# Remove unnecessary unconstrained delegation\nSet-ADUser -Identity "svc_account" -TrustedForDelegation $false', ja: '# 不要な無制限委任を削除する\nSet-ADUser -Identity "svc_account" -TrustedForDelegation $false' } },
          { type: 'info', text: { zh: '建議使用 BloodHound 視覺化分析委派攻擊路徑，找出可從非特權帳戶到達 DC 的委派鏈', en: 'Recommend using BloodHound to visually analyze delegation attack paths and find delegation chains from non-privileged accounts to DCs', ja: 'BloodHound を使用して委任攻撃経路を視覚的に分析し、非特権アカウントから DC に到達できる委任チェーンを見つけることを推奨' } }
        ]
      },
      {
        text: { zh: '使用 Managed Service Accounts (gMSA) 取代服務帳戶', en: 'Use Managed Service Accounts (gMSA) instead of service accounts', ja: 'サービスアカウントの代わりに Managed Service Accounts (gMSA) を使用する' },
        detail: { zh: '防止 Kerberoasting，密碼由系統自動管理', en: 'Prevent Kerberoasting; passwords are automatically managed by the system', ja: 'Kerberoasting を防止する。パスワードはシステムによって自動管理される' },
        steps: [
          { type: 'cmd', text: { zh: '# 建立 Key Distribution Service Root Key（每個網域只需一次）\nAdd-KdsRootKey -EffectiveImmediately  # 生產環境建議改用 -EffectiveTime (Get-Date).AddHours(-10)', en: '# Create the Key Distribution Service Root Key (needed once per domain)\nAdd-KdsRootKey -EffectiveImmediately  # 生產環境建議改用 -EffectiveTime (Get-Date).AddHours(-10)', ja: '# Key Distribution Service Root Key を作成する（ドメインごとに 1 回のみ必要）\nAdd-KdsRootKey -EffectiveImmediately  # 生產環境建議改用 -EffectiveTime (Get-Date).AddHours(-10)' } },
          { type: 'cmd', text: { zh: '# 建立 gMSA\nNew-ADServiceAccount -Name "svc-webapp" `\n  -DNSHostName "webapp.corp.local" `\n  -PrincipalsAllowedToRetrieveManagedPassword "WebServers"  # 可用電腦帳戶或群組', en: '# Create gMSA\nNew-ADServiceAccount -Name "svc-webapp" `\n  -DNSHostName "webapp.corp.local" `\n  -PrincipalsAllowedToRetrieveManagedPassword "WebServers"  # 可用電腦帳戶或群組', ja: '# gMSA を作成する\nNew-ADServiceAccount -Name "svc-webapp" `\n  -DNSHostName "webapp.corp.local" `\n  -PrincipalsAllowedToRetrieveManagedPassword "WebServers"  # 可用電腦帳戶或群組' } },
          { type: 'cmd', text: { zh: '# 在目標伺服器安裝並測試 gMSA\nInstall-ADServiceAccount -Identity "svc-webapp"\nTest-ADServiceAccount -Identity "svc-webapp"', en: '# Install and test the gMSA on the target server\nInstall-ADServiceAccount -Identity "svc-webapp"\nTest-ADServiceAccount -Identity "svc-webapp"', ja: '# ターゲットサーバーに gMSA をインストールしてテストする\nInstall-ADServiceAccount -Identity "svc-webapp"\nTest-ADServiceAccount -Identity "svc-webapp"' } },
          { type: 'info', text: { zh: '服務設定：services.msc → 服務屬性 → Log On → This account 填入 "CORP\\svc-webapp$"（注意尾端 $），密碼欄留空', en: 'Service configuration: services.msc → Service properties → Log On → Set "This account" to "CORP\\svc-webapp$" (note the trailing $); leave the password field blank', ja: 'サービス設定: services.msc → サービスのプロパティ → ログオン → 「このアカウント」に "CORP\\svc-webapp$"（末尾の $ に注意）を入力し、パスワード欄は空白のままにする' } },
          { type: 'cmd', text: { zh: '# 確認舊服務帳戶的 SPN，重新指向 gMSA\nGet-ADUser "old_svc" -Properties ServicePrincipalName | Select ServicePrincipalName', en: '# Verify the SPN of the old service account and redirect to gMSA\nGet-ADUser "old_svc" -Properties ServicePrincipalName | Select ServicePrincipalName', ja: '# 旧サービスアカウントの SPN を確認し、gMSA に再指定する\nGet-ADUser "old_svc" -Properties ServicePrincipalName | Select ServicePrincipalName' } }
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
          { type: 'cmd', text: { zh: '# Windows Firewall GPO（套用至 Domain Controllers OU）\n# Computer Configuration → Windows Settings → Security Settings → Windows Firewall\n# Outbound Rules → New Rule → Block TCP 80, 443 for All Programs', en: '# Windows Firewall GPO (apply to Domain Controllers OU)\n# Computer Configuration → Windows Settings → Security Settings → Windows Firewall\n# Outbound Rules → New Rule → Block TCP 80, 443 for All Programs', ja: '# Windows ファイアウォール GPO（Domain Controllers OU に適用）\n# Computer Configuration → Windows Settings → Security Settings → Windows Firewall\n# Outbound Rules → New Rule → Block TCP 80, 443 for All Programs' } },
          { type: 'info', text: { zh: '建議在網路層（防火牆/路由器）封鎖 DC IP 段（通常 /24）的所有 Outbound 連線，僅允許：DNS(53)、LDAP(389/636)、Kerberos(88)、AD Replication(135,49152-65535) 到指定目標', en: 'Recommend blocking all outbound connections from the DC IP subnet (/24) at the network layer (firewall/router), allowing only: DNS(53), LDAP(389/636), Kerberos(88), AD Replication(135,49152-65535) to specified targets', ja: 'ネットワーク層（ファイアウォール/ルーター）で DC IP サブネット（通常 /24）からのすべてのアウトバウンド接続をブロックし、指定したターゲットへの DNS(53)、LDAP(389/636)、Kerberos(88)、AD レプリケーション(135,49152-65535) のみを許可することを推奨' } },
          { type: 'cmd', text: { zh: '# 確認測試 DC 無法存取外部\nInvoke-Command -ComputerName DC01 { Test-NetConnection -ComputerName "8.8.8.8" -Port 80 }', en: '# Verify the test DC cannot access external networks\nInvoke-Command -ComputerName DC01 { Test-NetConnection -ComputerName "8.8.8.8" -Port 80 }', ja: '# テスト DC が外部にアクセスできないことを確認する\nInvoke-Command -ComputerName DC01 { Test-NetConnection -ComputerName "8.8.8.8" -Port 80 }' } }
        ]
      },
      {
        text: { zh: '停用 SMBv1', en: 'Disable SMBv1', ja: 'SMBv1 を無効化する' },
        detail: { zh: '防止 EternalBlue (CVE-2017-0143) 等攻擊', en: 'Prevent EternalBlue (CVE-2017-0143) and similar attacks', ja: 'EternalBlue (CVE-2017-0143) などの攻撃を防止する' },
        steps: [
          { type: 'cmd', text: { zh: '# 檢查目前 SMBv1 狀態\nGet-SmbServerConfiguration | Select EnableSMB1Protocol\nGet-WindowsOptionalFeature -Online -FeatureName SMB1Protocol', en: '# Check the current SMBv1 status\nGet-SmbServerConfiguration | Select EnableSMB1Protocol\nGet-WindowsOptionalFeature -Online -FeatureName SMB1Protocol', ja: '# 現在の SMBv1 の状態を確認する\nGet-SmbServerConfiguration | Select EnableSMB1Protocol\nGet-WindowsOptionalFeature -Online -FeatureName SMB1Protocol' } },
          { type: 'cmd', text: { zh: '# 停用 SMBv1（伺服器端）\nSet-SmbServerConfiguration -EnableSMB1Protocol $false -Force\n\n# 停用 SMBv1（客戶端）\nSet-SmbClientConfiguration -EnableSMB1Protocol $false -Force', en: '# Disable SMBv1 (server side)\nSet-SmbServerConfiguration -EnableSMB1Protocol $false -Force\n\n# Disable SMBv1 (client side)\nSet-SmbClientConfiguration -EnableSMB1Protocol $false -Force', ja: '# SMBv1 を無効化する（サーバー側）\nSet-SmbServerConfiguration -EnableSMB1Protocol $false -Force\n\n# SMBv1 を無効化する（クライアント側）\nSet-SmbClientConfiguration -EnableSMB1Protocol $false -Force' } },
          { type: 'cmd', text: { zh: '# 完全移除 SMBv1 功能\nDisable-WindowsOptionalFeature -Online -FeatureName SMB1Protocol -NoRestart', en: '# Completely remove the SMBv1 feature\nDisable-WindowsOptionalFeature -Online -FeatureName SMB1Protocol -NoRestart', ja: '# SMBv1 機能を完全に削除する\nDisable-WindowsOptionalFeature -Online -FeatureName SMB1Protocol -NoRestart' } },
          { type: 'info', text: { zh: 'GPO 強制停用：Computer Configuration → Administrative Templates → Network → Lanman Server → Enable insecure guest logons → Disabled', en: 'Force disable via GPO: Computer Configuration → Administrative Templates → Network → Lanman Server → Enable insecure guest logons → Disabled', ja: 'GPO で強制無効化: コンピューターの構成 → 管理用テンプレート → ネットワーク → Lanman サーバー → セキュリティで保護されていないゲストログオンを有効にする → 無効' } }
        ]
      },
      {
        text: { zh: '停用 LLMNR 和 NetBIOS-NS', en: 'Disable LLMNR and NetBIOS-NS', ja: 'LLMNR および NetBIOS-NS を無効化する' },
        detail: { zh: '防止 Responder 毒化攻擊', en: 'Prevent Responder poisoning attacks', ja: 'Responder ポイズニング攻撃を防止する' },
        steps: [
          { type: 'info', text: { zh: 'GPO 停用 LLMNR：Computer Configuration → Administrative Templates → Network → DNS Client → "Turn off multicast name resolution" → Enabled', en: 'Disable LLMNR via GPO: Computer Configuration → Administrative Templates → Network → DNS Client → "Turn off multicast name resolution" → Enabled', ja: 'GPO で LLMNR を無効化: コンピューターの構成 → 管理用テンプレート → ネットワーク → DNS クライアント → "マルチキャスト名前解決をオフにする" → 有効' } },
          { type: 'cmd', text: { zh: '# PowerShell 批次停用 NetBIOS over TCP/IP（所有 NIC）\nGet-WmiObject Win32_NetworkAdapterConfiguration | Where-Object { $_.IPEnabled } | ForEach-Object { $_.SetTcpipNetbios(2) }', en: '# Batch-disable NetBIOS over TCP/IP for all NICs via PowerShell\nGet-WmiObject Win32_NetworkAdapterConfiguration | Where-Object { $_.IPEnabled } | ForEach-Object { $_.SetTcpipNetbios(2) }', ja: '# PowerShell ですべての NIC の NetBIOS over TCP/IP を一括無効化する\nGet-WmiObject Win32_NetworkAdapterConfiguration | Where-Object { $_.IPEnabled } | ForEach-Object { $_.SetTcpipNetbios(2) }' } },
          { type: 'info', text: { zh: 'DHCP 停用 NetBIOS：在 DHCP 伺服器設定 Scope Options → 043 Vendor Specific Info，或各 NIC 屬性 → TCP/IP 進階設定 → WINS → Disable NetBIOS over TCP/IP', en: 'Disable NetBIOS via DHCP: set Scope Options → 043 Vendor Specific Info on the DHCP server, or each NIC properties → TCP/IP Advanced Settings → WINS → Disable NetBIOS over TCP/IP', ja: 'DHCP で NetBIOS を無効化: DHCP サーバーで Scope Options → 043 Vendor Specific Info を設定するか、各 NIC のプロパティ → TCP/IP 詳細設定 → WINS → TCP/IP 上の NetBIOS を無効にする' } },
          { type: 'cmd', text: { zh: '# 驗證：用 Responder 或 tcpdump 監聽是否還有 LLMNR/NBT-NS 廣播\n# (需在測試環境執行) Get-NetFirewallRule | Where-Object { $_.DisplayName -match "LLMNR" }', en: '# Verify: use Responder or tcpdump to listen for any remaining LLMNR/NBT-NS broadcasts\n# (run in a test environment) Get-NetFirewallRule | Where-Object { $_.DisplayName -match "LLMNR" }', ja: '# 確認: Responder や tcpdump を使って LLMNR/NBT-NS ブロードキャストが残っていないか確認する\n# (テスト環境で実行) Get-NetFirewallRule | Where-Object { $_.DisplayName -match "LLMNR" }' } }
        ]
      },
      {
        text: { zh: '移除不再需要的 Domain Trust', en: 'Remove unnecessary Domain Trusts', ja: '不要なドメイン信頼関係を削除する' },
        detail: { zh: '並為保留的信任啟用 SID Filtering', en: 'And enable SID Filtering for retained trusts', ja: '保持する信頼関係には SID フィルタリングを有効にする' },
        steps: [
          { type: 'cmd', text: { zh: '# 列出所有網域信任關係\nGet-ADTrust -Filter * | Select Name,Direction,TrustType,SIDFilteringQuarantined,SIDFilteringForestAware | Format-Table -AutoSize', en: '# List all domain trust relationships\nGet-ADTrust -Filter * | Select Name,Direction,TrustType,SIDFilteringQuarantined,SIDFilteringForestAware | Format-Table -AutoSize', ja: '# すべてのドメイン信頼関係を一覧表示する\nGet-ADTrust -Filter * | Select Name,Direction,TrustType,SIDFilteringQuarantined,SIDFilteringForestAware | Format-Table -AutoSize' } },
          { type: 'cmd', text: { zh: '# 移除不再需要的信任\nRemove-ADTrust -Identity "CN=old-partner.com,CN=System,DC=corp,DC=local" -Confirm:$false', en: '# Remove trusts that are no longer needed\nRemove-ADTrust -Identity "CN=old-partner.com,CN=System,DC=corp,DC=local" -Confirm:$false', ja: '# 不要になった信頼関係を削除する\nRemove-ADTrust -Identity "CN=old-partner.com,CN=System,DC=corp,DC=local" -Confirm:$false' } },
          { type: 'cmd', text: { zh: '# 為保留的外部信任啟用 SID Filtering\nnetdom trust corp.local /domain:partner.com /quarantine:yes\n\n# 驗證\nGet-ADTrust -Identity "partner.com" | Select SIDFilteringQuarantined', en: '# Enable SID Filtering for retained external trusts\nnetdom trust corp.local /domain:partner.com /quarantine:yes\n\n# Verify\nGet-ADTrust -Identity "partner.com" | Select SIDFilteringQuarantined', ja: '# 保持する外部信頼関係に SID フィルタリングを有効にする\nnetdom trust corp.local /domain:partner.com /quarantine:yes\n\n# 確認\nGet-ADTrust -Identity "partner.com" | Select SIDFilteringQuarantined' } },
          { type: 'warn', text: { zh: '注意：SID Filtering 可能影響跨網域群組成員的存取，啟用前需充分測試', en: 'Warning: SID Filtering may affect access for cross-domain group members; test thoroughly before enabling', ja: '注意: SID フィルタリングはドメイン間グループメンバーのアクセスに影響する可能性があります。有効化前に十分にテストしてください' } }
        ]
      },
      {
        text: { zh: '設定所有認證為 NTLMv2 only（拒絕 LM/NTLM）', en: 'Configure all authentication to NTLMv2 only (refuse LM/NTLM)', ja: 'すべての認証を NTLMv2 のみに設定する（LM/NTLM を拒否）' },
        detail: { zh: '防止降級攻擊', en: 'Prevent downgrade attacks', ja: 'ダウングレード攻撃を防止する' },
        steps: [
          { type: 'info', text: { zh: 'GPO 路徑：Computer Configuration → Windows Settings → Security Settings → Local Policies → Security Options', en: 'GPO path: Computer Configuration → Windows Settings → Security Settings → Local Policies → Security Options', ja: 'GPO パス: コンピューターの構成 → Windows の設定 → セキュリティ設定 → ローカルポリシー → セキュリティオプション' } },
          { type: 'info', text: { zh: '"Network security: LAN Manager authentication level" → 選擇 "Send NTLMv2 response only. Refuse LM & NTLM"（值為 5）', en: '"Network security: LAN Manager authentication level" → Select "Send NTLMv2 response only. Refuse LM & NTLM" (value 5)', ja: '"ネットワーク セキュリティ: LAN Manager 認証レベル" → "NTLMv2 応答のみ送信。LM と NTLM を拒否する" を選択（値 5）' } },
          { type: 'cmd', text: { zh: '# 登錄直接設定（值 5 = NTLMv2 only, Refuse LM & NTLM）\nreg add "HKLM\\SYSTEM\\CurrentControlSet\\Control\\Lsa" /v LmCompatibilityLevel /t REG_DWORD /d 5 /f', en: '# Set directly via registry (value 5 = NTLMv2 only, Refuse LM & NTLM)\nreg add "HKLM\\SYSTEM\\CurrentControlSet\\Control\\Lsa" /v LmCompatibilityLevel /t REG_DWORD /d 5 /f', ja: '# レジストリで直接設定する（値 5 = NTLMv2 のみ、LM & NTLM を拒否）\nreg add "HKLM\\SYSTEM\\CurrentControlSet\\Control\\Lsa" /v LmCompatibilityLevel /t REG_DWORD /d 5 /f' } },
          { type: 'cmd', text: { zh: '# 同時停用 LM Hash 儲存\nreg add "HKLM\\SYSTEM\\CurrentControlSet\\Control\\Lsa" /v NoLMHash /t REG_DWORD /d 1 /f', en: '# Also disable LM Hash storage\nreg add "HKLM\\SYSTEM\\CurrentControlSet\\Control\\Lsa" /v NoLMHash /t REG_DWORD /d 1 /f', ja: '# LM ハッシュの保存も同時に無効化する\nreg add "HKLM\\SYSTEM\\CurrentControlSet\\Control\\Lsa" /v NoLMHash /t REG_DWORD /d 1 /f' } },
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
          { type: 'cmd', text: { zh: '# 檢查目前稽核設定\nauditpol /get /category:*', en: '# Check the current audit configuration\nauditpol /get /category:*', ja: '# 現在の監査設定を確認する\nauditpol /get /category:*' } },
          { type: 'info', text: { zh: 'GPO 路徑：Computer Configuration → Windows Settings → Security Settings → Advanced Audit Policy Configuration → Audit Policies', en: 'GPO path: Computer Configuration → Windows Settings → Security Settings → Advanced Audit Policy Configuration → Audit Policies', ja: 'GPO パス: コンピューターの構成 → Windows の設定 → セキュリティ設定 → 高度な監査ポリシーの構成 → 監査ポリシー' } },
          { type: 'info', text: { zh: '建議啟用（Success & Failure）：Account Logon / Account Management / DS Access (Directory Service Changes) / Logon/Logoff / Object Access / Policy Change / Privilege Use / System', en: 'Recommended to enable (Success & Failure): Account Logon / Account Management / DS Access (Directory Service Changes) / Logon/Logoff / Object Access / Policy Change / Privilege Use / System', ja: '有効化を推奨（成功と失敗）: アカウント ログオン / アカウント管理 / DS アクセス（ディレクトリ サービスの変更）/ ログオン/ログオフ / オブジェクト アクセス / ポリシーの変更 / 特権の使用 / システム' } },
          { type: 'cmd', text: { zh: '# 批次啟用關鍵稽核策略\nauditpol /set /subcategory:"Logon" /success:enable /failure:enable\nauditpol /set /subcategory:"Account Lockout" /success:enable /failure:enable\nauditpol /set /subcategory:"Kerberos Service Ticket Operations" /success:enable /failure:enable\nauditpol /set /subcategory:"Directory Service Changes" /success:enable /failure:enable', en: '# Batch-enable critical audit policies\nauditpol /set /subcategory:"Logon" /success:enable /failure:enable\nauditpol /set /subcategory:"Account Lockout" /success:enable /failure:enable\nauditpol /set /subcategory:"Kerberos Service Ticket Operations" /success:enable /failure:enable\nauditpol /set /subcategory:"Directory Service Changes" /success:enable /failure:enable', ja: '# 重要な監査ポリシーを一括で有効にする\nauditpol /set /subcategory:"Logon" /success:enable /failure:enable\nauditpol /set /subcategory:"Account Lockout" /success:enable /failure:enable\nauditpol /set /subcategory:"Kerberos Service Ticket Operations" /success:enable /failure:enable\nauditpol /set /subcategory:"Directory Service Changes" /success:enable /failure:enable' } }
        ]
      },
      {
        text: { zh: '啟用 PowerShell 模組與 ScriptBlock 日誌', en: 'Enable PowerShell Module and ScriptBlock logging', ja: 'PowerShell モジュールと ScriptBlock のログを有効にする' },
        detail: { zh: '並集中轉發至 SIEM', en: 'And forward centrally to SIEM', ja: 'SIEM に集中転送する' },
        steps: [
          { type: 'info', text: { zh: 'GPO 路徑：Computer Configuration → Administrative Templates → Windows Components → Windows PowerShell', en: 'GPO path: Computer Configuration → Administrative Templates → Windows Components → Windows PowerShell', ja: 'GPO パス: コンピューターの構成 → 管理用テンプレート → Windows コンポーネント → Windows PowerShell' } },
          { type: 'info', text: { zh: '啟用以下三項：(1) Turn on Module Logging → Enabled，Module Names 填 * (2) Turn on PowerShell Script Block Logging → Enabled (3) Turn on Script Execution → Enabled', en: 'Enable the following three: (1) Turn on Module Logging → Enabled, Module Names set to * (2) Turn on PowerShell Script Block Logging → Enabled (3) Turn on Script Execution → Enabled', ja: '以下の 3 項目を有効にする: (1) モジュール ログを有効にする → 有効、モジュール名を * に設定 (2) PowerShell スクリプト ブロックのログを有効にする → 有効 (3) スクリプトの実行を有効にする → 有効' } },
          { type: 'cmd', text: { zh: '# 登錄方式啟用 ScriptBlock Logging\nreg add "HKLM\\SOFTWARE\\Policies\\Microsoft\\Windows\\PowerShell\\ScriptBlockLogging" /v EnableScriptBlockLogging /t REG_DWORD /d 1 /f\nreg add "HKLM\\SOFTWARE\\Policies\\Microsoft\\Windows\\PowerShell\\ModuleLogging" /v EnableModuleLogging /t REG_DWORD /d 1 /f', en: '# Enable ScriptBlock Logging via registry\nreg add "HKLM\\SOFTWARE\\Policies\\Microsoft\\Windows\\PowerShell\\ScriptBlockLogging" /v EnableScriptBlockLogging /t REG_DWORD /d 1 /f\nreg add "HKLM\\SOFTWARE\\Policies\\Microsoft\\Windows\\PowerShell\\ModuleLogging" /v EnableModuleLogging /t REG_DWORD /d 1 /f', ja: '# レジストリで ScriptBlock Logging を有効にする\nreg add "HKLM\\SOFTWARE\\Policies\\Microsoft\\Windows\\PowerShell\\ScriptBlockLogging" /v EnableScriptBlockLogging /t REG_DWORD /d 1 /f\nreg add "HKLM\\SOFTWARE\\Policies\\Microsoft\\Windows\\PowerShell\\ModuleLogging" /v EnableModuleLogging /t REG_DWORD /d 1 /f' } },
          { type: 'info', text: { zh: 'PowerShell 日誌儲存於：Event Log → Applications and Services Logs → Microsoft → Windows → PowerShell → Operational (Event ID 4103/4104)', en: 'PowerShell logs are stored in: Event Log → Applications and Services Logs → Microsoft → Windows → PowerShell → Operational (Event ID 4103/4104)', ja: 'PowerShell ログの保存場所: イベント ログ → アプリケーションとサービス ログ → Microsoft → Windows → PowerShell → 操作 (Event ID 4103/4104)' } }
        ]
      },
      {
        text: { zh: '部署並設定 Sysmon', en: 'Deploy and configure Sysmon', ja: 'Sysmon を展開して設定する' },
        detail: { zh: '使用 sysmon-modular 等成熟設定範本', en: 'Use mature configuration templates such as sysmon-modular', ja: 'sysmon-modular などの成熟した設定テンプレートを使用する' },
        steps: [
          { type: 'info', text: { zh: '下載 Sysmon：https://learn.microsoft.com/en-us/sysinternals/downloads/sysmon；建議使用 SwiftOnSecurity sysmon-config 或 sysmon-modular 作為設定基礎', en: 'Download Sysmon: https://learn.microsoft.com/en-us/sysinternals/downloads/sysmon; recommend using SwiftOnSecurity sysmon-config or sysmon-modular as a configuration baseline', ja: 'Sysmon のダウンロード: https://learn.microsoft.com/en-us/sysinternals/downloads/sysmon; SwiftOnSecurity の sysmon-config または sysmon-modular を設定のベースとして使用することを推奨' } },
          { type: 'cmd', text: { zh: '# 初次安裝（使用自訂設定檔）\nsysmon64.exe -accepteula -i sysmonconfig.xml', en: '# Initial installation (using a custom configuration file)\nsysmon64.exe -accepteula -i sysmonconfig.xml', ja: '# 初回インストール（カスタム設定ファイルを使用）\nsysmon64.exe -accepteula -i sysmonconfig.xml' } },
          { type: 'cmd', text: { zh: '# 更新設定檔（不中斷服務）\nsysmon64.exe -c sysmonconfig.xml', en: '# Update configuration file (without interrupting service)\nsysmon64.exe -c sysmonconfig.xml', ja: '# 設定ファイルを更新する（サービスを中断せずに）\nsysmon64.exe -c sysmonconfig.xml' } },
          { type: 'cmd', text: { zh: '# 驗證 Sysmon 運行狀態\nGet-Service Sysmon64\n# 確認日誌位置：Event Viewer → Applications and Services Logs → Microsoft → Windows → Sysmon → Operational', en: '# Verify Sysmon is running\nGet-Service Sysmon64\n# Confirm log location: Event Viewer → Applications and Services Logs → Microsoft → Windows → Sysmon → Operational', ja: '# Sysmon の動作状態を確認する\nGet-Service Sysmon64\n# ログの場所を確認: イベント ビューアー → アプリケーションとサービス ログ → Microsoft → Windows → Sysmon → 操作' } },
          { type: 'info', text: { zh: 'Sysmon 關鍵事件：Event ID 1 (Process Create), 3 (Network Connect), 7 (Image Load), 8 (CreateRemoteThread), 10 (ProcessAccess), 11 (FileCreate), 25 (ProcessTampering)', en: 'Key Sysmon events: Event ID 1 (Process Create), 3 (Network Connect), 7 (Image Load), 8 (CreateRemoteThread), 10 (ProcessAccess), 11 (FileCreate), 25 (ProcessTampering)', ja: 'Sysmon の重要イベント: Event ID 1 (プロセス作成), 3 (ネットワーク接続), 7 (イメージ読み込み), 8 (CreateRemoteThread), 10 (ProcessAccess), 11 (ファイル作成), 25 (ProcessTampering)' } }
        ]
      },
      {
        text: { zh: '建立 SIEM 偵測規則（Sigma）', en: 'Create SIEM detection rules using Sigma', ja: 'Sigma を使用した SIEM 検知ルールを作成する' },
        detail: { zh: '針對 DCSync、Kerberoasting、Pass-the-Hash 等攻擊建立警示', en: 'Create alerts targeting DCSync, Kerberoasting, Pass-the-Hash, and other attacks', ja: 'DCSync、Kerberoasting、Pass-the-Hash などの攻撃に対するアラートを作成する' },
        steps: [
          { type: 'cmd', text: { zh: '# 安裝 Sigma 工具\npip install sigmatools\n# 或使用新版 sigma-cli\npip install sigma-cli', en: '# Install Sigma tools\npip install sigmatools\n# Or use the newer sigma-cli\npip install sigma-cli', ja: '# Sigma ツールをインストールする\npip install sigmatools\n# または新しい sigma-cli を使用する\npip install sigma-cli' } },
          { type: 'cmd', text: { zh: '# 下載 Sigma 規則庫\ngit clone https://github.com/SigmaHQ/sigma', en: '# Download the Sigma rule library\ngit clone https://github.com/SigmaHQ/sigma', ja: '# Sigma ルールライブラリをダウンロードする\ngit clone https://github.com/SigmaHQ/sigma' } },
          { type: 'cmd', text: { zh: '# 轉換為 Splunk 格式（以 DCSync 為例）\nsigma convert -t splunk -p splunk_windows rules/windows/builtin/security/win_security_dcsync.yml\n\n# 轉換為 Elastic/KQL 格式\nsigma convert -t lucene rules/windows/builtin/security/win_security_kerberoasting.yml', en: '# Convert to Splunk format (DCSync as example)\nsigma convert -t splunk -p splunk_windows rules/windows/builtin/security/win_security_dcsync.yml\n\n# Convert to Elastic/KQL format\nsigma convert -t lucene rules/windows/builtin/security/win_security_kerberoasting.yml', ja: '# Splunk 形式に変換する（DCSync を例に）\nsigma convert -t splunk -p splunk_windows rules/windows/builtin/security/win_security_dcsync.yml\n\n# Elastic/KQL 形式に変換する\nsigma convert -t lucene rules/windows/builtin/security/win_security_kerberoasting.yml' } },
          { type: 'info', text: { zh: '優先部署規則：DCSync (4662), Kerberoasting (4769 RC4), AS-REP Roasting (4768), Password Spraying (4625 大量失敗), Golden/Silver Ticket (4672 不尋常的特殊權限)', en: 'Priority rules to deploy: DCSync (4662), Kerberoasting (4769 RC4), AS-REP Roasting (4768), Password Spraying (4625 high-volume failures), Golden/Silver Ticket (4672 unusual privileges)', ja: '優先して展開するルール: DCSync (4662)、Kerberoasting (4769 RC4)、AS-REP Roasting (4768)、パスワードスプレー (4625 大量失敗)、Golden/Silver Ticket (4672 異常な特権)' } }
        ]
      },
      {
        text: { zh: '啟用命令列程序記錄', en: 'Enable command-line process logging', ja: 'コマンドライン プロセスのログを有効にする' },
        detail: { zh: 'KB3004375，記錄所有程序命令列參數', en: 'KB3004375; logs all process command-line arguments', ja: 'KB3004375; すべてのプロセスコマンドライン引数を記録する' },
        steps: [
          { type: 'info', text: { zh: 'GPO 路徑：Computer Configuration → Administrative Templates → System → Audit Process Creation → "Include command line in process creation events" → Enabled', en: 'GPO path: Computer Configuration → Administrative Templates → System → Audit Process Creation → "Include command line in process creation events" → Enabled', ja: 'GPO パス: コンピューターの構成 → 管理用テンプレート → システム → プロセス作成の監査 → "プロセス作成イベントにコマンド ラインを含める" → 有効' } },
          { type: 'cmd', text: { zh: '# 登錄方式啟用\nreg add "HKLM\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Policies\\System\\Audit" /v ProcessCreationIncludeCmdLine_Enabled /t REG_DWORD /d 1 /f', en: '# Enable via registry\nreg add "HKLM\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Policies\\System\\Audit" /v ProcessCreationIncludeCmdLine_Enabled /t REG_DWORD /d 1 /f', ja: '# レジストリで有効にする\nreg add "HKLM\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Policies\\System\\Audit" /v ProcessCreationIncludeCmdLine_Enabled /t REG_DWORD /d 1 /f' } },
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
          { type: 'cmd', text: { zh: '# 使用 Certify 掃描脆弱憑證範本（需網域使用者權限）\nCertify.exe find /vulnerable\nCertify.exe find /enrolleeSuppliesSubject  # ESC1 特定掃描', en: '# Use Certify to scan for vulnerable certificate templates (requires domain user privileges)\nCertify.exe find /vulnerable\nCertify.exe find /enrolleeSuppliesSubject  # ESC1 特定掃描', ja: '# Certify を使用して脆弱な証明書テンプレートをスキャンする（ドメインユーザー権限が必要）\nCertify.exe find /vulnerable\nCertify.exe find /enrolleeSuppliesSubject  # ESC1 特定掃描' } },
          { type: 'cmd', text: { zh: '# 使用 Locksmith 自動稽核並提供修復建議\nImport-Module .\\Locksmith.psd1\nInvoke-Locksmith -Mode 0  # 模式 0 = 僅報告問題，不修復', en: '# Use Locksmith for automated auditing and remediation suggestions\nImport-Module .\\Locksmith.psd1\nInvoke-Locksmith -Mode 0  # 模式 0 = 僅報告問題，不修復', ja: '# Locksmith を使用して自動監査と修復の提案を行う\nImport-Module .\\Locksmith.psd1\nInvoke-Locksmith -Mode 0  # 模式 0 = 僅報告問題，不修復' } },
          { type: 'info', text: { zh: '常見錯誤設定：ESC1 (範本允許 enrollee 自訂 SAN), ESC2 (Any Purpose EKU), ESC3 (Enrollment Agent), ESC4 (範本 ACL 可寫), ESC6 (EDITF_ATTRIBUTESUBJECTALTNAME2 旗標), ESC8 (HTTP NTLM 中繼)', en: 'Common misconfigurations: ESC1 (template allows enrollee to specify SAN), ESC2 (Any Purpose EKU), ESC3 (Enrollment Agent), ESC4 (template ACL writable), ESC6 (EDITF_ATTRIBUTESUBJECTALTNAME2 flag), ESC8 (HTTP NTLM relay)', ja: '一般的な設定ミス: ESC1 (テンプレートで登録者が SAN を指定可能), ESC2 (Any Purpose EKU), ESC3 (Enrollment Agent), ESC4 (テンプレート ACL が書き込み可能), ESC6 (EDITF_ATTRIBUTESUBJECTALTNAME2 フラグ), ESC8 (HTTP NTLM リレー)' } },
          { type: 'cmd', text: { zh: '# 使用 PSPKIAudit 稽核 CA 設定\nInstall-Module -Name PSPKI\nImport-Module PSPKI\nGet-CertificationAuthority | Get-CATemplate', en: '# Use PSPKIAudit to audit CA configuration\nInstall-Module -Name PSPKI\nImport-Module PSPKI\nGet-CertificationAuthority | Get-CATemplate', ja: '# PSPKIAudit を使用して CA の設定を監査する\nInstall-Module -Name PSPKI\nImport-Module PSPKI\nGet-CertificationAuthority | Get-CATemplate' } }
        ]
      },
      {
        text: { zh: '停用 NTLM 認證至 IIS/AD CS', en: 'Disable NTLM authentication to IIS/AD CS', ja: 'IIS/AD CS への NTLM 認証を無効化する' },
        detail: { zh: '防止 PetitPotam NTLM 中繼攻擊', en: 'Prevent PetitPotam NTLM relay attacks', ja: 'PetitPotam NTLM リレー攻撃を防止する' },
        steps: [
          { type: 'info', text: { zh: 'IIS Manager 設定：開啟 IIS → 選取 CertSrv 虛擬目錄 → Authentication → Windows Authentication → Providers → 移除 NTLM，只保留 Negotiate (Kerberos)', en: 'IIS Manager setting: Open IIS → Select CertSrv virtual directory → Authentication → Windows Authentication → Providers → Remove NTLM, keep only Negotiate (Kerberos)', ja: 'IIS Manager の設定: IIS を開く → CertSrv 仮想ディレクトリを選択 → 認証 → Windows 認証 → プロバイダー → NTLM を削除し、Negotiate (Kerberos) のみ残す' } },
          { type: 'cmd', text: { zh: "# 透過 appcmd 設定（IIS 8+）\n%windir%\\system32\\inetsrv\\appcmd.exe set config \"Default Web Site/CertSrv\" /section:windowsAuthentication /-providers.[value='NTLM']", en: "# Configure via appcmd (IIS 8+)\n%windir%\\system32\\inetsrv\\appcmd.exe set config \"Default Web Site/CertSrv\" /section:windowsAuthentication /-providers.[value='NTLM']", ja: "# appcmd で設定する（IIS 8+）\n%windir%\\system32\\inetsrv\\appcmd.exe set config \"Default Web Site/CertSrv\" /section:windowsAuthentication /-providers.[value='NTLM']" } },
          { type: 'info', text: { zh: '啟用 Extended Protection for Authentication (EPA)：IIS → Windows Authentication → Advanced Settings → Extended Protection → Required', en: 'Enable Extended Protection for Authentication (EPA): IIS → Windows Authentication → Advanced Settings → Extended Protection → Required', ja: '認証の拡張保護（EPA）を有効にする: IIS → Windows 認証 → 詳細設定 → 拡張保護 → 必須' } },
          { type: 'info', text: { zh: '若環境使用 Web Enrollment，建議將 AD CS Web 介面設定為要求 HTTPS 並停用 HTTP', en: 'If the environment uses Web Enrollment, configure the AD CS web interface to require HTTPS and disable HTTP', ja: '環境で Web 登録を使用している場合、AD CS の Web インターフェイスを HTTPS 必須に設定し HTTP を無効にすることを推奨' } }
        ]
      },
      {
        text: { zh: '移除不必要的憑證範本', en: 'Remove unnecessary certificate templates', ja: '不要な証明書テンプレートを削除する' },
        detail: { zh: '特別是允許 SAN 指定或 EKU 允許智慧卡登入的範本', en: 'Especially templates allowing SAN specification or EKUs permitting smart card login', ja: '特に SAN の指定を許可するテンプレートや、スマートカードログインを許可する EKU のテンプレート' },
        steps: [
          { type: 'cmd', text: { zh: '# 列出 CA 上發布的所有範本\ncertutil -catemplates\n# 或使用 PowerShell\nGet-CATemplate | Select Name,DisplayName | Sort Name', en: '# List all templates published on the CA\ncertutil -catemplates\n# Or use PowerShell\nGet-CATemplate | Select Name,DisplayName | Sort Name', ja: '# CA で発行されているすべてのテンプレートを一覧表示する\ncertutil -catemplates\n# または PowerShell を使用する\nGet-CATemplate | Select Name,DisplayName | Sort Name' } },
          { type: 'info', text: { zh: 'CA 管理主控台：certsrv.msc → Certificate Templates → 右鍵刪除不必要的範本；重點移除：WebServer（若不用）、User（預設允許 SAN）、DomainController（若不用 smartcard）', en: 'CA management console: certsrv.msc → Certificate Templates → right-click to delete unnecessary templates; key removals: WebServer (if not used), User (allows SAN by default), DomainController (if smart card not used)', ja: 'CA 管理コンソール: certsrv.msc → 証明書テンプレート → 右クリックして不要なテンプレートを削除。主な削除対象: WebServer（未使用の場合）、User（デフォルトで SAN 許可）、DomainController（スマートカード未使用の場合）' } },
          { type: 'cmd', text: { zh: '# 停用特定危險範本的發布\nGet-CATemplate | Where-Object { $_.Name -eq "WebServer" } | Remove-CATemplate -Force', en: '# Disable the publishing of a specific dangerous template\nGet-CATemplate | Where-Object { $_.Name -eq "WebServer" } | Remove-CATemplate -Force', ja: '# 特定の危険なテンプレートの発行を無効にする\nGet-CATemplate | Where-Object { $_.Name -eq "WebServer" } | Remove-CATemplate -Force' } },
          { type: 'warn', text: { zh: '注意：移除範本前確認無任何系統依賴它；可先設定範本為「停用」而非直接刪除', en: 'Warning: Confirm no systems depend on a template before removing it; consider setting it to "disabled" instead of deleting directly', ja: '注意: テンプレートを削除する前に、それに依存しているシステムがないことを確認してください。直接削除する代わりに「無効」に設定することを検討してください' } }
        ]
      },
      {
        text: { zh: '啟用 AD CS HTTP 端點的 EPA（Extended Protection for Authentication）', en: 'Enable EPA (Extended Protection for Authentication) on AD CS HTTP endpoints', ja: 'AD CS HTTP エンドポイントで EPA（認証の拡張保護）を有効にする' },
        detail: { zh: '防止 NTLM 中繼', en: 'Prevent NTLM relay attacks', ja: 'NTLM リレー攻撃を防止する' },
        steps: [
          { type: 'info', text: { zh: 'IIS Manager → Default Web Site → CertSrv → Windows Authentication → Advanced Settings → Extended Protection → Required（最強，需測試相容性）或 Accept（過渡期使用）', en: 'IIS Manager → Default Web Site → CertSrv → Windows Authentication → Advanced Settings → Extended Protection → Required (strongest, test compatibility first) or Accept (transition period)', ja: 'IIS Manager → 既定の Web サイト → CertSrv → Windows 認証 → 詳細設定 → 拡張保護 → 必須（最強、互換性をテスト済み）または 受け入れる（移行期間中）' } },
          { type: 'cmd', text: { zh: '# 驗證 EPA 設定\nGet-WebConfigurationProperty -Filter "//security/authentication/windowsAuthentication" -PSPath "IIS:\\Sites\\Default Web Site\\CertSrv" -Name extendedProtection', en: '# Verify EPA configuration\nGet-WebConfigurationProperty -Filter "//security/authentication/windowsAuthentication" -PSPath "IIS:\\Sites\\Default Web Site\\CertSrv" -Name extendedProtection', ja: '# EPA の設定を確認する\nGet-WebConfigurationProperty -Filter "//security/authentication/windowsAuthentication" -PSPath "IIS:\\Sites\\Default Web Site\\CertSrv" -Name extendedProtection' } },
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
          { type: 'cmd', text: { zh: '# 檢查 DC 是否安裝補丁\nGet-HotFix -Id KB4571694\n# 確認強制模式已生效\nreg query "HKLM\\SYSTEM\\CurrentControlSet\\Services\\Netlogon\\Parameters" /v FullSecureChannelProtection', en: '# Check whether the patch is installed on the DC\nGet-HotFix -Id KB4571694\n# Confirm Enforcement Mode is in effect\nreg query "HKLM\\SYSTEM\\CurrentControlSet\\Services\\Netlogon\\Parameters" /v FullSecureChannelProtection', ja: '# DC にパッチがインストールされているか確認する\nGet-HotFix -Id KB4571694\n# 強制モードが有効になっていることを確認する\nreg query "HKLM\\SYSTEM\\CurrentControlSet\\Services\\Netlogon\\Parameters" /v FullSecureChannelProtection' } },
          { type: 'cmd', text: { zh: '# 查看是否有不合規客戶端日誌（Event ID 5829/5827）\nGet-WinEvent -LogName "System" | Where-Object { $_.Id -in 5829,5827 } | Select TimeCreated,Message | Format-List', en: '# Check for non-compliant client logs (Event ID 5829/5827)\nGet-WinEvent -LogName "System" | Where-Object { $_.Id -in 5829,5827 } | Select TimeCreated,Message | Format-List', ja: '# 非準拠クライアントのログを確認する（Event ID 5829/5827）\nGet-WinEvent -LogName "System" | Where-Object { $_.Id -in 5829,5827 } | Select TimeCreated,Message | Format-List' } },
          { type: 'warn', text: { zh: '若有 Event ID 5829 日誌，表示仍有使用舊 Netlogon 的裝置，需先更新這些裝置再啟用強制模式', en: 'If Event ID 5829 is logged, it indicates devices still using old Netlogon; update those devices before enabling Enforcement Mode', ja: 'Event ID 5829 が記録されている場合、古い Netlogon を使用しているデバイスがまだ存在することを示します。強制モードを有効にする前に、これらのデバイスを更新してください' } }
        ]
      },
      {
        text: { zh: '套用 PetitPotam 緩解措施 (CVE-2021-36942)', en: 'Apply PetitPotam mitigation (CVE-2021-36942)', ja: 'PetitPotam 緩和策 (CVE-2021-36942) を適用する' },
        detail: { zh: 'KB5005413，並停用 EFSRPC 介面（如不需要）', en: 'KB5005413; and disable the EFSRPC interface if not needed', ja: 'KB5005413; 必要でない場合は EFSRPC インターフェイスを無効にする' },
        steps: [
          { type: 'cmd', text: { zh: '# 確認 KB5005413 已安裝\nGet-HotFix -Id KB5005413', en: '# Confirm KB5005413 is installed\nGet-HotFix -Id KB5005413', ja: '# KB5005413 がインストールされていることを確認する\nGet-HotFix -Id KB5005413' } },
          { type: 'info', text: { zh: '若 EFS 在環境中未使用，可透過防火牆封鎖 DC 上的 MS-EFSRPC 介面（TCP Port 445 的 EFSRPC）；或使用 Windows RPC 篩選', en: 'If EFS is not used in the environment, block the MS-EFSRPC interface on DCs via firewall (EFSRPC on TCP Port 445), or use Windows RPC filtering', ja: '環境で EFS が使用されていない場合、ファイアウォールで DC の MS-EFSRPC インターフェイス（TCP ポート 445 の EFSRPC）をブロックするか、Windows RPC フィルタリングを使用する' } },
          { type: 'cmd', text: { zh: '# 使用 netsh 封鎖 EFSRPC（需 Windows Server 2019+）\nnetsh rpc filter add rule layer=um actiontype=block\nnetsh rpc filter add condition field=if_uuid matchtype=equal data=c681d488-d850-11d0-8c52-00c04fd90f7e\nnetsh rpc filter add filter', en: '# Block EFSRPC using netsh (requires Windows Server 2019+)\nnetsh rpc filter add rule layer=um actiontype=block\nnetsh rpc filter add condition field=if_uuid matchtype=equal data=c681d488-d850-11d0-8c52-00c04fd90f7e\nnetsh rpc filter add filter', ja: '# netsh を使用して EFSRPC をブロックする（Windows Server 2019+ 必要）\nnetsh rpc filter add rule layer=um actiontype=block\nnetsh rpc filter add condition field=if_uuid matchtype=equal data=c681d488-d850-11d0-8c52-00c04fd90f7e\nnetsh rpc filter add filter' } },
          { type: 'info', text: { zh: '同時停用 IIS/AD CS 的 NTLM 認證（搭配 EPA），防止 NTLM 中繼到 AD CS 的攻擊鏈', en: 'Also disable NTLM authentication on IIS/AD CS (with EPA) to prevent NTLM relay attack chains to AD CS', ja: 'IIS/AD CS の NTLM 認証も無効にし（EPA と組み合わせ）、AD CS への NTLM リレー攻撃チェーンを防止する' } }
        ]
      },
      {
        text: { zh: '套用 sAMAccountName 漏洞補丁 (CVE-2021-42278/42287)', en: 'Apply sAMAccountName vulnerability patches (CVE-2021-42278/42287)', ja: 'sAMAccountName 脆弱性パッチ (CVE-2021-42278/42287) を適用する' },
        detail: { zh: 'KB5008102、KB5008380', en: 'KB5008102, KB5008380', ja: 'KB5008102、KB5008380' },
        steps: [
          { type: 'cmd', text: { zh: '# 確認補丁已安裝\nGet-HotFix -Id KB5008102  # CVE-2021-42278\nGet-HotFix -Id KB5008380  # CVE-2021-42287', en: '# Confirm patches are installed\nGet-HotFix -Id KB5008102  # CVE-2021-42278\nGet-HotFix -Id KB5008380  # CVE-2021-42287', ja: '# パッチがインストールされていることを確認する\nGet-HotFix -Id KB5008102  # CVE-2021-42278\nGet-HotFix -Id KB5008380  # CVE-2021-42287' } },
          { type: 'cmd', text: { zh: '# 確認 MachineAccountQuota 已降低（防止一般使用者建立電腦帳戶）\nGet-ADDomain | Select -Expand DistinguishedName | Get-ADObject -Properties ms-DS-MachineAccountQuota\n# 建議改為 0\nSet-ADDomain -Identity corp.local -Replace @{"ms-DS-MachineAccountQuota"=0}', en: '# Confirm MachineAccountQuota has been lowered (prevent regular users from creating computer accounts)\nGet-ADDomain | Select -Expand DistinguishedName | Get-ADObject -Properties ms-DS-MachineAccountQuota\n# Recommend changing to 0\nSet-ADDomain -Identity corp.local -Replace @{"ms-DS-MachineAccountQuota"=0}', ja: '# MachineAccountQuota が低減されていることを確認する（一般ユーザーによるコンピューターアカウント作成を防止）\nGet-ADDomain | Select -Expand DistinguishedName | Get-ADObject -Properties ms-DS-MachineAccountQuota\n# 0 に変更することを推奨\nSet-ADDomain -Identity corp.local -Replace @{"ms-DS-MachineAccountQuota"=0}' } },
          { type: 'cmd', text: { zh: '# 啟用「强制 DC 驗證電腦帳戶名稱」（需 2021-11 後的更新）\n# 以下補丁安裝後進入部署模式，2022-04 後強制啟用\nreg query "HKLM\\SYSTEM\\CurrentControlSet\\Services\\Kdc" /v SamAccountNameSuffix', en: '# Enable "Force DC to verify computer account names" (requires post-November 2021 update)\n# After installing the patch below, enters deployment mode; enforcement begins after April 2022\nreg query "HKLM\\SYSTEM\\CurrentControlSet\\Services\\Kdc" /v SamAccountNameSuffix', ja: '# 「DC にコンピューターアカウント名の検証を強制する」を有効にする（2021 年 11 月以降の更新が必要）\n# 以下のパッチをインストール後、展開モードに入り、2022 年 4 月以降に強制有効化される\nreg query "HKLM\\SYSTEM\\CurrentControlSet\\Services\\Kdc" /v SamAccountNameSuffix' } }
        ]
      },
      {
        text: { zh: '確認 MS14-068 補丁已安裝', en: 'Confirm MS14-068 patch is installed', ja: 'MS14-068 パッチがインストールされていることを確認する' },
        detail: { zh: 'KB3011780，防止 Kerberos PAC 偽造', en: 'KB3011780; prevent Kerberos PAC forgery', ja: 'KB3011780; Kerberos PAC の偽造を防止する' },
        steps: [
          { type: 'cmd', text: { zh: '# 確認 KB3011780 已安裝\nGet-HotFix -Id KB3011780\n\n# 若系統已更新至 2014-11 之後的累積更新，此修補已包含在內\n(Get-HotFix | Sort InstalledOn -Descending | Select -First 1).InstalledOn', en: '# Confirm KB3011780 is installed\nGet-HotFix -Id KB3011780\n\n# If the system has been updated to cumulative updates after November 2014, this patch is already included\n(Get-HotFix | Sort InstalledOn -Descending | Select -First 1).InstalledOn', ja: '# KB3011780 がインストールされていることを確認する\nGet-HotFix -Id KB3011780\n\n# 2014 年 11 月以降の累積更新が適用されていれば、このパッチは既に含まれている\n(Get-HotFix | Sort InstalledOn -Descending | Select -First 1).InstalledOn' } },
          { type: 'info', text: { zh: 'MS14-068 修補 Kerberos KDC 未驗證 PAC Checksum 的漏洞；任何 Windows Server 2012 R2 + 2014-11 之後的更新均已包含此修補', en: 'MS14-068 fixes the Kerberos KDC vulnerability that did not validate PAC checksums; any Windows Server 2012 R2 + updates after November 2014 already include this patch', ja: 'MS14-068 は Kerberos KDC が PAC チェックサムを検証しない脆弱性を修正します。Windows Server 2012 R2 および 2014 年 11 月以降のすべての更新プログラムにはこのパッチが含まれています' } },
          { type: 'cmd', text: { zh: '# 確認 DC 的 OS 版本與補丁狀態\nGet-ADDomainController -Filter * | Select Name,OperatingSystem,OperatingSystemVersion | Format-Table', en: '# Confirm DC OS version and patch status\nGet-ADDomainController -Filter * | Select Name,OperatingSystem,OperatingSystemVersion | Format-Table', ja: '# DC の OS バージョンとパッチ状況を確認する\nGet-ADDomainController -Filter * | Select Name,OperatingSystem,OperatingSystemVersion | Format-Table' } }
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
          { type: 'cmd', text: { zh: '# 確認目前 KDC 支援的加密類型\nGet-ADDefaultDomainPasswordPolicy | Select *\nGet-ADDomainController -Filter * | ForEach-Object { Get-ADComputer $_.ComputerObjectDN -Properties msDS-SupportedEncryptionTypes | Select Name,"msDS-SupportedEncryptionTypes" }', en: '# Confirm the encryption types currently supported by the KDC\nGet-ADDefaultDomainPasswordPolicy | Select *\nGet-ADDomainController -Filter * | ForEach-Object { Get-ADComputer $_.ComputerObjectDN -Properties msDS-SupportedEncryptionTypes | Select Name,"msDS-SupportedEncryptionTypes" }', ja: '# KDC が現在サポートしている暗号化の種類を確認する\nGet-ADDefaultDomainPasswordPolicy | Select *\nGet-ADDomainController -Filter * | ForEach-Object { Get-ADComputer $_.ComputerObjectDN -Properties msDS-SupportedEncryptionTypes | Select Name,"msDS-SupportedEncryptionTypes" }' } },
          { type: 'cmd', text: { zh: '# 設定所有帳戶使用 AES128/AES256（排除 RC4 = 4）\n# msDS-SupportedEncryptionTypes：AES128=8, AES256=16, 合計=24\nGet-ADUser -Filter * | Set-ADUser -KerberosEncryptionType AES128,AES256', en: '# Configure all accounts to use AES128/AES256 (exclude RC4 = 4)\n# msDS-SupportedEncryptionTypes: AES128=8, AES256=16, total=24\nGet-ADUser -Filter * | Set-ADUser -KerberosEncryptionType AES128,AES256', ja: '# すべてのアカウントを AES128/AES256 を使用するよう設定する（RC4 = 4 を除外）\n# msDS-SupportedEncryptionTypes: AES128=8、AES256=16、合計=24\nGet-ADUser -Filter * | Set-ADUser -KerberosEncryptionType AES128,AES256' } },
          { type: 'cmd', text: { zh: '# 確認 KrbSupportedEncryptionTypes GPO 設定\n# GPO 路徑: Computer Configuration → Windows Settings → Security Settings → Local Policies → Security Options\n# "Network security: Configure encryption types allowed for Kerberos" → 僅勾選 AES128_HMAC_SHA1, AES256_HMAC_SHA1, Future encryption types', en: '# Confirm KrbSupportedEncryptionTypes GPO settings\n# GPO path: Computer Configuration → Windows Settings → Security Settings → Local Policies → Security Options\n# "Network security: Configure encryption types allowed for Kerberos" → Check only AES128_HMAC_SHA1, AES256_HMAC_SHA1, Future encryption types', ja: '# KrbSupportedEncryptionTypes の GPO 設定を確認する\n# GPO パス: コンピューターの構成 → Windows の設定 → セキュリティ設定 → ローカルポリシー → セキュリティオプション\n# "ネットワーク セキュリティ: Kerberos で許可する暗号化の種類を構成する" → AES128_HMAC_SHA1、AES256_HMAC_SHA1、将来の暗号化の種類のみチェック' } },
          { type: 'info', text: { zh: '在強制 AES256 前，需確認環境中無 Windows XP/Server 2003 舊系統（不支援 AES）。Kerberoasting 最常利用 RC4 票據；停用後攻擊難度大幅提升', en: 'Before enforcing AES256, verify no legacy Windows XP/Server 2003 systems exist in the environment (they do not support AES). Kerberoasting most commonly exploits RC4 tickets; disabling RC4 greatly increases attack difficulty', ja: 'AES256 を強制する前に、環境内に Windows XP/Server 2003 などのレガシーシステムがないことを確認してください（AES 非対応）。Kerberoasting は RC4 チケットを最もよく悪用します。RC4 を無効化すると攻撃難度が大幅に上がります' } },
          { type: 'warn', text: { zh: '注意：停用 RC4 前務必先更新 krbtgt 帳戶以支援 AES；並驗證所有服務帳戶的 SPN 已設定 AES 加密', en: 'Warning: Before disabling RC4, update the krbtgt account to support AES and verify that all service account SPNs are configured for AES encryption', ja: '注意: RC4 を無効化する前に、krbtgt アカウントを AES に対応させ、すべてのサービスアカウント SPN が AES 暗号化に設定されていることを確認してください' } }
        ]
      },
      {
        text: { zh: '升級並啟用 Windows LAPS v2（內建 LAPS）', en: 'Upgrade to and enable Windows LAPS v2 (built-in LAPS)', ja: 'Windows LAPS v2（組み込み LAPS）にアップグレードして有効化する' },
        detail: { zh: 'Windows Server 2019/2022 + 2023-04 更新內建 Windows LAPS，支援 Entra ID 儲存、加密密碼及帳戶名稱輪換，取代舊版 Microsoft LAPS', en: 'Windows Server 2019/2022 with April 2023 update includes built-in Windows LAPS, supporting Entra ID storage, encrypted passwords, and account name rotation, replacing the legacy Microsoft LAPS', ja: 'Windows Server 2019/2022 の 2023 年 4 月更新で組み込み Windows LAPS が利用可能に。Entra ID ストレージ・暗号化パスワード・アカウント名ローテーションをサポートし、レガシー Microsoft LAPS を置き換える' },
        steps: [
          { type: 'cmd', text: { zh: '# 確認 Windows LAPS 已啟用（需 KB5025175 或更新的累積更新）\nGet-WindowsCapability -Online -Name "Rsat.ActiveDirectory*"\nImport-Module LAPS\nGet-LapsAADPassword  # 若使用 Entra ID 儲存模式', en: '# Confirm Windows LAPS is enabled (requires KB5025175 or a newer cumulative update)\nGet-WindowsCapability -Online -Name "Rsat.ActiveDirectory*"\nImport-Module LAPS\nGet-LapsAADPassword  # 若使用 Entra ID 儲存模式', ja: '# Windows LAPS が有効になっていることを確認する（KB5025175 以降の累積更新が必要）\nGet-WindowsCapability -Online -Name "Rsat.ActiveDirectory*"\nImport-Module LAPS\nGet-LapsAADPassword  # 若使用 Entra ID 儲存模式' } },
          { type: 'cmd', text: { zh: '# 更新 AD Schema 以支援 Windows LAPS（在 Schema Admin 帳戶下執行）\nUpdate-LapsADSchema', en: '# Update the AD Schema to support Windows LAPS (run as Schema Admin)\nUpdate-LapsADSchema', ja: '# Windows LAPS をサポートするために AD スキーマを更新する（Schema Admin アカウントで実行）\nUpdate-LapsADSchema' } },
          { type: 'cmd', text: { zh: '# 設定 Windows LAPS GPO\n# 路徑: Computer Configuration → Administrative Templates → System → LAPS\n# 啟用: Configure password backup directory → Active Directory\n# 啟用: Enable password encryption → Enabled\n# 設定: Password Settings → 長度 ≥ 15, 複雜度 4, 最大效期 30 天\n# 啟用: Post-authentication actions → Reset password and sign out (3)', en: '# Configure Windows LAPS GPO\n# Path: Computer Configuration → Administrative Templates → System → LAPS\n# Enable: Configure password backup directory → Active Directory\n# Enable: Enable password encryption → Enabled\n# Set: Password Settings → length ≥ 15, complexity 4, max expiry 30 days\n# Enable: Post-authentication actions → Reset password and sign out (3)', ja: '# Windows LAPS の GPO を設定する\n# パス: コンピューターの構成 → 管理用テンプレート → システム → LAPS\n# 有効化: パスワードのバックアップ ディレクトリの設定 → Active Directory\n# 有効化: パスワードの暗号化を有効にする → 有効\n# 設定: パスワード設定 → 長さ ≥ 15、複雑さ 4、最大有効期限 30 日\n# 有効化: 認証後のアクション → パスワードのリセットとサインアウト (3)' } },
          { type: 'info', text: { zh: 'Windows LAPS v2 新功能：(1) 密碼在 AD 中加密儲存（需 Domain Functional Level 2016+）(2) 支援 Entra ID 和 AD 雙重備份 (3) 登入後自動輪換密碼 (4) 支援管理員帳戶名稱輪換防止暴力破解', en: 'Windows LAPS v2 new features: (1) Encrypted password storage in AD (requires DFL 2016+) (2) Support for both Entra ID and AD backup (3) Automatic post-authentication password rotation (4) Support for admin account name rotation to prevent brute force', ja: 'Windows LAPS v2 の新機能: (1) AD での暗号化パスワードストレージ（DFL 2016+ 必要）(2) Entra ID と AD の両方へのバックアップ対応 (3) 認証後の自動パスワードローテーション (4) ブルートフォース防止のための管理者アカウント名ローテーション対応' } },
          { type: 'cmd', text: { zh: '# 驗證密碼備份狀態\nGet-LapsADPassword -Identity "WORKSTATION01" -AsPlainText\n\n# 批次確認所有工作站是否已正確備份密碼\nGet-ADComputer -Filter * -SearchBase "OU=Workstations,DC=corp,DC=local" -Properties "ms-LAPS-PasswordExpirationTime" | Where-Object { $_."ms-LAPS-PasswordExpirationTime" -eq $null } | Select Name', en: '# Verify password backup status\nGet-LapsADPassword -Identity "WORKSTATION01" -AsPlainText\n\n# Batch-confirm that all workstations have correctly backed up their passwords\nGet-ADComputer -Filter * -SearchBase "OU=Workstations,DC=corp,DC=local" -Properties "ms-LAPS-PasswordExpirationTime" | Where-Object { $_."ms-LAPS-PasswordExpirationTime" -eq $null } | Select Name', ja: '# パスワードのバックアップ状態を確認する\nGet-LapsADPassword -Identity "WORKSTATION01" -AsPlainText\n\n# すべてのワークステーションのパスワードが正しくバックアップされているかを一括確認する\nGet-ADComputer -Filter * -SearchBase "OU=Workstations,DC=corp,DC=local" -Properties "ms-LAPS-PasswordExpirationTime" | Where-Object { $_."ms-LAPS-PasswordExpirationTime" -eq $null } | Select Name' } }
        ]
      },
      {
        text: { zh: '啟用 Credential Guard（VBS 虛擬化安全性）', en: 'Enable Credential Guard (Virtualization-Based Security)', ja: 'Credential Guard（仮想化ベースのセキュリティ）を有効化する' },
        detail: { zh: '將 LSASS 移至 VTL1（Virtual Trust Level 1）隔離環境，防止 Mimikatz 等工具從記憶體提取明文密碼和 NTLM 雜湊值', en: 'Move LSASS to a VTL1 (Virtual Trust Level 1) isolated environment, preventing tools like Mimikatz from extracting plaintext passwords and NTLM hashes from memory', ja: 'LSASS を VTL1（仮想信頼レベル 1）の隔離環境に移行し、Mimikatz などのツールによるメモリからの平文パスワードや NTLM ハッシュの抽出を防止する' },
        steps: [
          { type: 'cmd', text: { zh: '# 確認硬體需求（需 UEFI + Secure Boot + VT-x/AMD-V + SLAT/EPT）\n(Get-WmiObject -Class Win32_ComputerSystem).HypervisorPresent\msinfo32  # 確認 Virtualization-based security: Running', en: '# Confirm hardware requirements (requires UEFI + Secure Boot + VT-x/AMD-V + SLAT/EPT)\n(Get-WmiObject -Class Win32_ComputerSystem).HypervisorPresent\msinfo32  # 確認 Virtualization-based security: Running', ja: '# ハードウェア要件を確認する（UEFI + Secure Boot + VT-x/AMD-V + SLAT/EPT が必要）\n(Get-WmiObject -Class Win32_ComputerSystem).HypervisorPresent\msinfo32  # 確認 Virtualization-based security: Running' } },
          { type: 'info', text: { zh: 'GPO 路徑：Computer Configuration → Administrative Templates → System → Device Guard → Turn On Virtualization Based Security\n設定：(1) Select Platform Security Level: Secure Boot and DMA Protection (2) Credential Guard Configuration: Enabled with UEFI lock (3) Secure Launch Configuration: Enabled', en: 'GPO path: Computer Configuration → Administrative Templates → System → Device Guard → Turn On Virtualization Based Security\nSettings: (1) Select Platform Security Level: Secure Boot and DMA Protection (2) Credential Guard Configuration: Enabled with UEFI lock (3) Secure Launch Configuration: Enabled', ja: 'GPO パス: コンピューターの構成 → 管理用テンプレート → システム → Device Guard → 仮想化ベースのセキュリティを有効にする\n設定: (1) プラットフォームのセキュリティ レベルを選択: セキュア ブートと DMA 保護 (2) Credential Guard の構成: UEFI ロックで有効にする (3) セキュア ローンチの構成: 有効' } },
          { type: 'cmd', text: { zh: '# 使用 LGPO 或登錄方式啟用（須重新開機生效）\nreg add "HKLM\\SYSTEM\\CurrentControlSet\\Control\\DeviceGuard" /v EnableVirtualizationBasedSecurity /t REG_DWORD /d 1 /f\nreg add "HKLM\\SYSTEM\\CurrentControlSet\\Control\\DeviceGuard" /v RequirePlatformSecurityFeatures /t REG_DWORD /d 3 /f\nreg add "HKLM\\SYSTEM\\CurrentControlSet\\Control\\Lsa" /v LsaCfgFlags /t REG_DWORD /d 1 /f', en: '# Enable using LGPO or registry (requires a reboot to take effect)\nreg add "HKLM\\SYSTEM\\CurrentControlSet\\Control\\DeviceGuard" /v EnableVirtualizationBasedSecurity /t REG_DWORD /d 1 /f\nreg add "HKLM\\SYSTEM\\CurrentControlSet\\Control\\DeviceGuard" /v RequirePlatformSecurityFeatures /t REG_DWORD /d 3 /f\nreg add "HKLM\\SYSTEM\\CurrentControlSet\\Control\\Lsa" /v LsaCfgFlags /t REG_DWORD /d 1 /f', ja: '# LGPO またはレジストリで有効にする（有効化には再起動が必要）\nreg add "HKLM\\SYSTEM\\CurrentControlSet\\Control\\DeviceGuard" /v EnableVirtualizationBasedSecurity /t REG_DWORD /d 1 /f\nreg add "HKLM\\SYSTEM\\CurrentControlSet\\Control\\DeviceGuard" /v RequirePlatformSecurityFeatures /t REG_DWORD /d 3 /f\nreg add "HKLM\\SYSTEM\\CurrentControlSet\\Control\\Lsa" /v LsaCfgFlags /t REG_DWORD /d 1 /f' } },
          { type: 'cmd', text: { zh: '# 驗證 Credential Guard 已運行\n(Get-WmiObject -Class Win32_DeviceGuard -Namespace root\\Microsoft\\Windows\\DeviceGuard).SecurityServicesRunning\n# 2 = Credential Guard 已啟用並運行', en: '# Verify Credential Guard is running\n(Get-WmiObject -Class Win32_DeviceGuard -Namespace root\\Microsoft\\Windows\\DeviceGuard).SecurityServicesRunning\n# 2 = Credential Guard is enabled and running', ja: '# Credential Guard が実行中であることを確認する\n(Get-WmiObject -Class Win32_DeviceGuard -Namespace root\\Microsoft\\Windows\\DeviceGuard).SecurityServicesRunning\n# 2 = Credential Guard が有効で実行中' } },
          { type: 'warn', text: { zh: '注意：Credential Guard 啟用後，Kerberos 委派（unconstrained delegation）和 NTLMv1 將無法使用；測試環境中務必先驗證相容性', en: 'Warning: After enabling Credential Guard, Kerberos unconstrained delegation and NTLMv1 will not work; verify compatibility in a test environment first', ja: '注意: Credential Guard を有効化すると、Kerberos 無制限委任と NTLMv1 が使用不可になります。事前にテスト環境で互換性を確認してください' } }
        ]
      },
      {
        text: { zh: '實施 Enterprise Access Model（三層存取管理架構）', en: 'Implement Enterprise Access Model (three-tier access management)', ja: 'Enterprise Access Model（三層アクセス管理アーキテクチャ）を実装する' },
        detail: { zh: 'Microsoft 於 2022 年更新的 Tiered Administration Model，將管理存取分為 Control Plane / Management Plane / User Access Plane 三層，搭配 PAW（Privileged Access Workstation）', en: 'Microsoft updated Tiered Administration Model (2022), dividing management access into Control Plane, Management Plane, and User Access Plane, combined with PAW (Privileged Access Workstation)', ja: 'Microsoft が 2022 年に更新した階層管理モデルで、管理アクセスをコントロール プレーン・管理プレーン・ユーザー アクセス プレーンの 3 層に分割し、PAW（特権アクセス ワークステーション）と組み合わせる' },
        steps: [
          { type: 'info', text: { zh: '三層架構定義：\n① Control Plane（舊 Tier 0）：網域控制器、AD、PKI、Entra ID Connect — 僅可從 PAW 存取\n② Management Plane（舊 Tier 1）：伺服器、雲端資源管理 — 使用專屬 Tier 1 管理帳戶\n③ User Access Plane（舊 Tier 2）：工作站、一般使用者資源', en: 'Three-tier architecture definition:\n① Control Plane (formerly Tier 0): Domain Controllers, AD, PKI, Entra ID Connect — accessible only from PAW\n② Management Plane (formerly Tier 1): Servers, cloud resource management — use dedicated Tier 1 admin accounts\n③ User Access Plane (formerly Tier 2): Workstations, general user resources', ja: '三層アーキテクチャの定義:\n① コントロール プレーン（旧 Tier 0）: ドメインコントローラー・AD・PKI・Entra ID Connect — PAW からのみアクセス可能\n② 管理プレーン（旧 Tier 1）: サーバー・クラウドリソース管理 — 専用の Tier 1 管理アカウントを使用\n③ ユーザー アクセス プレーン（旧 Tier 2）: ワークステーション・一般ユーザーリソース' } },
          { type: 'cmd', text: { zh: '# 建立各層 OU 結構\nNew-ADOrganizationalUnit -Name "Control-Plane-Admins" -Path "OU=AdminAccounts,DC=corp,DC=local"\nNew-ADOrganizationalUnit -Name "Management-Plane-Admins" -Path "OU=AdminAccounts,DC=corp,DC=local"\n\n# 建立各層專屬管理帳戶（禁止跨層登入）\nNew-ADUser -Name "adm-t0-alice" -SamAccountName "adm-t0-alice" -UserPrincipalName "adm-t0-alice@corp.local" -Path "OU=Control-Plane-Admins,OU=AdminAccounts,DC=corp,DC=local" -AccountPassword (ConvertTo-SecureString "P@ssw0rd123!" -AsPlainText -Force) -Enabled $true', en: '# Create the OU structure for each tier\nNew-ADOrganizationalUnit -Name "Control-Plane-Admins" -Path "OU=AdminAccounts,DC=corp,DC=local"\nNew-ADOrganizationalUnit -Name "Management-Plane-Admins" -Path "OU=AdminAccounts,DC=corp,DC=local"\n\n# Create dedicated admin accounts for each tier (cross-tier login is prohibited)\nNew-ADUser -Name "adm-t0-alice" -SamAccountName "adm-t0-alice" -UserPrincipalName "adm-t0-alice@corp.local" -Path "OU=Control-Plane-Admins,OU=AdminAccounts,DC=corp,DC=local" -AccountPassword (ConvertTo-SecureString "P@ssw0rd123!" -AsPlainText -Force) -Enabled $true', ja: '# 各層の OU 構造を作成する\nNew-ADOrganizationalUnit -Name "Control-Plane-Admins" -Path "OU=AdminAccounts,DC=corp,DC=local"\nNew-ADOrganizationalUnit -Name "Management-Plane-Admins" -Path "OU=AdminAccounts,DC=corp,DC=local"\n\n# 各層専用の管理アカウントを作成する（層をまたいだログインを禁止）\nNew-ADUser -Name "adm-t0-alice" -SamAccountName "adm-t0-alice" -UserPrincipalName "adm-t0-alice@corp.local" -Path "OU=Control-Plane-Admins,OU=AdminAccounts,DC=corp,DC=local" -AccountPassword (ConvertTo-SecureString "P@ssw0rd123!" -AsPlainText -Force) -Enabled $true' } },
          { type: 'cmd', text: { zh: '# 建立 GPO 防止 Tier 0 帳戶登入低層系統（User Rights: Deny logon locally）\n# 針對工作站 GPO 加入：\n# Computer Configuration → Windows Settings → Security Settings → Local Policies → User Rights Assignment\n# "Deny log on locally" → 加入 Control-Plane-Admins 群組', en: '# Create a GPO to prevent Tier 0 accounts from logging into lower-tier systems (User Rights: Deny logon locally)\n# Add to the workstation GPO:\n# Computer Configuration → Windows Settings → Security Settings → Local Policies → User Rights Assignment\n# "Deny log on locally" → Add the Control-Plane-Admins group', ja: '# Tier 0 アカウントが下位層システムにログオンしないよう GPO を作成する（ユーザー権利: ローカル ログオンを拒否する）\n# ワークステーション GPO に追加:\n# Computer Configuration → Windows Settings → Security Settings → Local Policies → User Rights Assignment\n# "Deny log on locally" → Control-Plane-Admins グループを追加する' } },
          { type: 'info', text: { zh: 'PAW 建議：使用專用實體工作站或硬體隔離 VM；禁止瀏覽網際網路、收發 Email；啟用 Windows Defender Application Control (WDAC)；搭配 MFA', en: 'PAW recommendations: Use dedicated physical workstations or hardware-isolated VMs; prohibit internet browsing and email; enable Windows Defender Application Control (WDAC); combine with MFA', ja: 'PAW の推奨: 専用の物理ワークステーションまたはハードウェア分離 VM を使用。インターネット閲覧・メール禁止。Windows Defender Application Control (WDAC) を有効化。MFA と組み合わせる' } }
        ]
      },
      {
        text: { zh: '部署無密碼驗證（FIDO2 / Windows Hello for Business）', en: 'Deploy passwordless authentication (FIDO2 / Windows Hello for Business)', ja: 'パスワードレス認証（FIDO2 / Windows Hello for Business）を展開する' },
        detail: { zh: '消除密碼竊取攻擊的根源；WHfB 使用 TPM 綁定的非對稱金鑰取代密碼，FIDO2 安全金鑰支援完全無密碼登入', en: 'Eliminate the root cause of credential theft attacks; WHfB uses TPM-bound asymmetric keys to replace passwords, and FIDO2 security keys support fully passwordless login', ja: '認証情報窃取攻撃の根本原因を排除。WHfB は TPM バインドされた非対称鍵でパスワードを置き換え、FIDO2 セキュリティキーは完全なパスワードレスログインをサポートする' },
        steps: [
          { type: 'info', text: { zh: 'Windows Hello for Business（WHfB）需求：(1) Windows 10 1703+ / Windows 11 (2) TPM 2.0（建議）或 TPM 1.2 (3) Azure AD / Entra ID 或 AD Domain Functional Level 2016 (4) PKI 或 Entra ID Certificate-based auth', en: 'Windows Hello for Business (WHfB) requirements: (1) Windows 10 1703+ / Windows 11 (2) TPM 2.0 (recommended) or TPM 1.2 (3) Azure AD / Entra ID or AD Domain Functional Level 2016 (4) PKI or Entra ID Certificate-based auth', ja: 'Windows Hello for Business (WHfB) の要件: (1) Windows 10 1703+ / Windows 11 (2) TPM 2.0（推奨）または TPM 1.2 (3) Azure AD / Entra ID または AD ドメイン機能レベル 2016 (4) PKI または Entra ID 証明書ベースの認証' } },
          { type: 'cmd', text: { zh: '# 啟用 WHfB（Cloud Trust 模式，最簡單的混合部署）\n# 需求：Entra ID Connect + Windows Server 2016 DC + Windows 10 21H2+\n# GPO 路徑：Computer Configuration → Administrative Templates → Windows Components → Windows Hello for Business\n# 設定：Use Windows Hello for Business → Enabled\n# 設定：Use cloud trust for on-premises authentication → Enabled', en: '# Enable WHfB (Cloud Trust mode, the simplest hybrid deployment)\n# Requirements: Entra ID Connect + Windows Server 2016 DC + Windows 10 21H2+\n# GPO path: Computer Configuration → Administrative Templates → Windows Components → Windows Hello for Business\n# Setting: Use Windows Hello for Business → Enabled\n# Setting: Use cloud trust for on-premises authentication → Enabled', ja: '# WHfB を有効にする（Cloud Trust モード、最もシンプルなハイブリッド展開）\n# 要件: Entra ID Connect + Windows Server 2016 DC + Windows 10 21H2+\n# GPO パス: コンピューターの構成 → 管理用テンプレート → Windows コンポーネント → Windows Hello for Business\n# 設定: Use Windows Hello for Business → 有効\n# 設定: Use cloud trust for on-premises authentication → 有効' } },
          { type: 'cmd', text: { zh: '# 確認 TPM 狀態\nGet-Tpm\n\n# 確認 WHfB 已啟用\nGet-WmiObject -Class Win32_PinGesture -Namespace root\\Microsoft\\Windows\\Biometric 2>$null || Write-Host "使用 Intune/GPO 確認 WHfB 部署狀態"', en: '# Confirm TPM status\nGet-Tpm\n\n# Confirm WHfB is enabled\nGet-WmiObject -Class Win32_PinGesture -Namespace root\\Microsoft\\Windows\\Biometric 2>$null || Write-Host "使用 Intune/GPO 確認 WHfB 部署狀態"', ja: '# TPM の状態を確認する\nGet-Tpm\n\n# WHfB が有効になっていることを確認する\nGet-WmiObject -Class Win32_PinGesture -Namespace root\\Microsoft\\Windows\\Biometric 2>$null || Write-Host "使用 Intune/GPO 確認 WHfB 部署狀態"' } },
          { type: 'info', text: { zh: 'FIDO2 安全金鑰（YubiKey、Feitian 等）：適合無 TPM 裝置或 Kiosk 模式；在 Entra ID 中啟用 FIDO2 Authentication Method Policy，搭配條件式存取要求強身份驗證', en: 'FIDO2 security keys (YubiKey, Feitian, etc.): Suitable for devices without TPM or Kiosk mode; enable FIDO2 Authentication Method Policy in Entra ID and combine with Conditional Access to require strong authentication', ja: 'FIDO2 セキュリティキー（YubiKey、Feitian など）: TPM のないデバイスやキオスクモードに適しています。Entra ID で FIDO2 認証方法ポリシーを有効化し、強力な認証を要求する条件付きアクセスと組み合わせてください' } },
          { type: 'warn', text: { zh: '注意：WHfB 不儲存密碼，但 AD 仍保有密碼雜湊值，需同步強化 Kerberos AES 與 Credential Guard 防止雜湊竊取', en: 'Warning: WHfB does not store passwords, but AD still retains password hashes; also harden Kerberos AES and Credential Guard to prevent hash theft', ja: '注意: WHfB はパスワードを保存しませんが、AD にはパスワードハッシュが残ります。ハッシュ窃取を防ぐために Kerberos AES と Credential Guard も強化してください' } }
        ]
      },
      {
        text: { zh: '啟用 AD CS 強化設定（Certifried / ESC 後補強）', en: 'Apply AD CS hardening (post-Certifried / ESC mitigations)', ja: 'AD CS のセキュリティ強化（Certifried / ESC 対応）を適用する' },
        detail: { zh: '2022 年 Certifried（CVE-2022-26923）及早期 ESC1-8 漏洞揭露了 AD CS 的嚴重風險；需全面審查 CA 設定、憑證範本與 Web 註冊端點', en: 'The 2022 Certifried (CVE-2022-26923) and earlier ESC1-8 vulnerabilities exposed critical AD CS risks; requires a comprehensive review of CA configuration, certificate templates, and web enrollment endpoints', ja: '2022 年の Certifried（CVE-2022-26923）と ESC1-8 の脆弱性は AD CS の深刻なリスクを明らかにした。CA 設定・証明書テンプレート・Web 登録エンドポイントの包括的な見直しが必要' },
        steps: [
          { type: 'cmd', text: { zh: '# 使用 Certipy 全面稽核 AD CS 設定\n# pip install certipy-ad\ncertipy find -u "auditor@corp.local" -p "Password" -dc-ip 192.168.1.1 -vulnerable', en: '# Use Certipy for a comprehensive audit of AD CS configuration\n# pip install certipy-ad\ncertipy find -u "auditor@corp.local" -p "Password" -dc-ip 192.168.1.1 -vulnerable', ja: '# Certipy を使用して AD CS の設定を包括的に監査する\n# pip install certipy-ad\ncertipy find -u "auditor@corp.local" -p "Password" -dc-ip 192.168.1.1 -vulnerable' } },
          { type: 'cmd', text: { zh: '# 使用 Locksmith 快速尋找和修復常見 AD CS 錯誤設定\n# Install-Module -Name Locksmith\nImport-Module Locksmith\nInvoke-Locksmith -Mode 0  # 稽核模式\nInvoke-Locksmith -Mode 1  # 自動修復（先在測試環境執行）', en: '# Use Locksmith to quickly find and fix common AD CS misconfigurations\n# Install-Module -Name Locksmith\nImport-Module Locksmith\nInvoke-Locksmith -Mode 0  # 稽核模式\nInvoke-Locksmith -Mode 1  # 自動修復（先在測試環境執行）', ja: '# Locksmith を使用して一般的な AD CS の設定ミスを素早く発見・修正する\n# Install-Module -Name Locksmith\nImport-Module Locksmith\nInvoke-Locksmith -Mode 0  # 稽核模式\nInvoke-Locksmith -Mode 1  # 自動修復（先在測試環境執行）' } },
          { type: 'info', text: { zh: 'AD CS 高風險設定清單（務必逐一確認）：\n① 停用 Web 登錄端點（http://ca/certsrv）或改用 HTTPS + EPA（Extended Protection for Authentication）\n② 移除憑證範本的「Subject Alternative Name (SAN)」可由申請人指定的設定\n③ 確認 CA 伺服器不允許 NTLM 中繼（啟用 EPA / Require SSL）\n④ 限制「Enroll」權限，避免 Authenticated Users 可申請高權限憑證\n⑤ 停用 ESC1/ESC2/ESC4/ESC6 相關高危設定', en: 'AD CS high-risk configuration checklist (verify each one):\n① Disable web enrollment endpoint (http://ca/certsrv) or switch to HTTPS + EPA (Extended Protection for Authentication)\n② Remove certificate template settings that allow applicants to specify Subject Alternative Names (SAN)\n③ Ensure CA servers do not allow NTLM relay (enable EPA / Require SSL)\n④ Restrict "Enroll" permissions so Authenticated Users cannot request high-privilege certificates\n⑤ Disable high-risk settings related to ESC1/ESC2/ESC4/ESC6', ja: 'AD CS 高リスク設定チェックリスト（各項目を確認してください）:\n① Web 登録エンドポイント（http://ca/certsrv）を無効化するか、HTTPS + EPA（拡張保護認証）に切り替える\n② 申請者が SAN（サブジェクト代替名）を指定できる証明書テンプレート設定を削除する\n③ CA サーバーで NTLM リレーを許可しないことを確認する（EPA を有効化 / SSL を必須にする）\n④ Authenticated Users が高権限証明書を申請できないよう「Enroll」権限を制限する\n⑤ ESC1/ESC2/ESC4/ESC6 関連の高リスク設定を無効化する' } },
          { type: 'cmd', text: { zh: '# 針對 Web 登錄啟用 EPA（Extended Protection for Authentication）\n# 在 CA Web 伺服器（IIS）的應用程式 certsrv 設定：\nImport-Module WebAdministration\nSet-WebConfigurationProperty -Filter "system.webServer/security/authentication/windowsAuthentication" -Name "extendedProtection.tokenChecking" -Value "Require" -PSPath "IIS:\\Sites\\Default Web Site\\certsrv"', en: '# Enable EPA (Extended Protection for Authentication) for Web Enrollment\n# Configure in the certsrv application on the CA web server (IIS):\nImport-Module WebAdministration\nSet-WebConfigurationProperty -Filter "system.webServer/security/authentication/windowsAuthentication" -Name "extendedProtection.tokenChecking" -Value "Require" -PSPath "IIS:\\Sites\\Default Web Site\\certsrv"', ja: '# Web 登録に EPA（拡張保護認証）を有効にする\n# CA Web サーバー（IIS）の certsrv アプリケーションで設定:\nImport-Module WebAdministration\nSet-WebConfigurationProperty -Filter "system.webServer/security/authentication/windowsAuthentication" -Name "extendedProtection.tokenChecking" -Value "Require" -PSPath "IIS:\\Sites\\Default Web Site\\certsrv"' } }
        ]
      },
      {
        text: { zh: '部署 Microsoft Sentinel 進行 AD 威脅偵測', en: 'Deploy Microsoft Sentinel for AD threat detection', ja: 'Microsoft Sentinel を展開して AD 脅威を検知する' },
        detail: { zh: '整合 Microsoft Defender for Identity（MDI）、Microsoft Entra ID Protection 和 Microsoft Sentinel，實現跨身份平台的統一威脅偵測與回應', en: 'Integrate Microsoft Defender for Identity (MDI), Microsoft Entra ID Protection, and Microsoft Sentinel for unified threat detection and response across identity platforms', ja: 'Microsoft Defender for Identity（MDI）・Microsoft Entra ID Protection・Microsoft Sentinel を統合し、アイデンティティ プラットフォーム全体で統一された脅威検知と対応を実現する' },
        steps: [
          { type: 'info', text: { zh: 'Microsoft Defender for Identity（MDI）部署步驟：\n① 在 Microsoft 365 Defender 入口網站建立 MDI 工作區\n② 在所有 DC 安裝 MDI 感應器（Sensor）\n③ 設定 Directory Services Account 讀取 AD 事件\n④ 啟用 Lateral Movement Paths 分析', en: 'Microsoft Defender for Identity (MDI) deployment steps:\n① Create an MDI workspace in the Microsoft 365 Defender portal\n② Install the MDI sensor on all Domain Controllers\n③ Configure the Directory Services Account to read AD events\n④ Enable Lateral Movement Paths analysis', ja: 'Microsoft Defender for Identity（MDI）の展開手順:\n① Microsoft 365 Defender ポータルで MDI ワークスペースを作成\n② すべての DC に MDI センサーをインストール\n③ Directory Services Account を AD イベント読み取り用に設定\n④ Lateral Movement Paths 分析を有効化' } },
          { type: 'cmd', text: { zh: '# 安裝 MDI 感應器（在每台 DC 上執行）\n# 1. 從 MDI 入口下載感應器安裝檔\n# 2. 靜默安裝\nAzure-AdvancedThreatProtection.exe /quiet NetFrameworkCommandLineArguments="/q" AccessKey="<your-access-key>"', en: '# Install MDI sensor (run on each DC)\n# 1. Download the sensor installer from the MDI portal\n# 2. Silent installation\nAzure-AdvancedThreatProtection.exe /quiet NetFrameworkCommandLineArguments="/q" AccessKey="<your-access-key>"', ja: '# MDI センサーをインストールする（各 DC で実行）\n# 1. MDI ポータルからセンサーのインストーラーをダウンロードする\n# 2. サイレント インストール\nAzure-AdvancedThreatProtection.exe /quiet NetFrameworkCommandLineArguments="/q" AccessKey="<your-access-key>"' } },
          { type: 'info', text: { zh: 'Microsoft Sentinel AD 連接器：\n① Microsoft Defender for Identity 連接器（即時 AD 攻擊告警）\n② Windows Security Events（Event ID 4624/4625/4662/4769 等）\n③ Azure Active Directory（Entra ID）登入日誌\n④ Microsoft Entra ID Protection（Identity Risk 事件）', en: 'Microsoft Sentinel AD connectors:\n① Microsoft Defender for Identity connector (real-time AD attack alerts)\n② Windows Security Events (Event IDs 4624/4625/4662/4769, etc.)\n③ Azure Active Directory (Entra ID) sign-in logs\n④ Microsoft Entra ID Protection (Identity Risk events)', ja: 'Microsoft Sentinel AD コネクター:\n① Microsoft Defender for Identity コネクター（リアルタイム AD 攻撃アラート）\n② Windows セキュリティ イベント（Event ID 4624/4625/4662/4769 など）\n③ Azure Active Directory（Entra ID）サインイン ログ\n④ Microsoft Entra ID Protection（Identity リスク イベント）' } },
          { type: 'cmd', text: { zh: '# 在 Sentinel 中啟用 MDI 相關偵測規則\n# 使用 Microsoft Sentinel Analytics 規則（內建 AD 威脅偵測）：\n# - "Suspected DCSync attack (replication of directory services)" \n# - "Suspected Golden ticket usage (forged authorization data)"\n# - "Suspected identity theft (pass-the-hash)"\n# - "Suspicious additions to privileged groups"\n# 路徑：Microsoft Sentinel → Analytics → Rule Templates → 搜尋 "Identity"', en: '# Enable MDI-related detection rules in Sentinel\n# Use Microsoft Sentinel Analytics rules (built-in AD threat detection):\n# - "Suspected DCSync attack (replication of directory services)" \n# - "Suspected Golden ticket usage (forged authorization data)"\n# - "Suspected identity theft (pass-the-hash)"\n# - "Suspicious additions to privileged groups"\n# Path: Microsoft Sentinel → Analytics → Rule Templates → search "Identity"', ja: '# Sentinel で MDI 関連の検知ルールを有効にする\n# Microsoft Sentinel Analytics ルール（組み込み AD 脅威検知）を使用:\n# - "Suspected DCSync attack (replication of directory services)" \n# - "Suspected Golden ticket usage (forged authorization data)"\n# - "Suspected identity theft (pass-the-hash)"\n# - "Suspicious additions to privileged groups"\n# パス: Microsoft Sentinel → Analytics → Rule Templates → "Identity" を検索' } },
          { type: 'warn', text: { zh: '注意：MDI 需要 DC 上有足夠的事件日誌儲存空間（建議 Security Log 最大 4GB）；並確認 Directory Services Account 具備讀取 SAMR 的權限', en: 'Warning: MDI requires sufficient event log storage on DCs (recommended Security Log maximum 4 GB); also ensure the Directory Services Account has SAMR read permissions', ja: '注意: MDI は DC に十分なイベント ログ ストレージが必要です（セキュリティ ログの最大値を 4GB 推奨）。Directory Services Account が SAMR 読み取り権限を持っていることも確認してください' } }
        ]
      },
      {
        text: { zh: '實施 Entra ID 混合加入 + Cloud Kerberos Trust', en: 'Implement Entra ID hybrid join with Cloud Kerberos Trust', ja: 'Entra ID ハイブリッド参加 + Cloud Kerberos Trust を実装する' },
        detail: { zh: 'Cloud Kerberos Trust（2022 年推出）讓混合加入裝置可用 WHfB 存取內部資源，無需傳統憑證信任；大幅降低 PKI 複雜度', en: 'Cloud Kerberos Trust (introduced 2022) allows hybrid-joined devices to use WHfB to access on-premises resources without traditional certificate trust, greatly reducing PKI complexity', ja: 'Cloud Kerberos Trust（2022 年導入）により、ハイブリッド参加デバイスが従来の証明書信頼なしで WHfB を使って社内リソースにアクセスできるようになり、PKI の複雑さが大幅に低減する' },
        steps: [
          { type: 'info', text: { zh: 'Cloud Kerberos Trust 需求：\n① Windows 11 21H2+ 或 Windows 10 21H2+ (KB5010415)\n② Entra ID Connect 2.0.89.0 或以上\n③ Windows Server 2016+ 網域控制器\n④ Entra ID P1/P2 授權', en: 'Cloud Kerberos Trust requirements:\n① Windows 11 21H2+ or Windows 10 21H2+ (KB5010415)\n② Entra ID Connect 2.0.89.0 or later\n③ Windows Server 2016+ Domain Controllers\n④ Entra ID P1/P2 license', ja: 'Cloud Kerberos Trust の要件:\n① Windows 11 21H2+ または Windows 10 21H2+（KB5010415）\n② Entra ID Connect 2.0.89.0 以降\n③ Windows Server 2016+ ドメインコントローラー\n④ Entra ID P1/P2 ライセンス' } },
          { type: 'cmd', text: { zh: '# 步驟1：在 Entra ID 建立 Kerberos Server 物件\n# 安裝 AzureADHybridAuthenticationManagement 模組\nInstall-Module -Name AzureADHybridAuthenticationManagement -AllowClobber\n\n# 建立 Kerberos 伺服器物件（需 Domain Admin 和 Global Admin 權限）\nSet-AzureADKerberosServer -Domain corp.local -CloudCredential $cloudCredential -DomainCredential $domainCredential', en: '# Step 1: Create a Kerberos Server object in Entra ID\n# Install the AzureADHybridAuthenticationManagement module\nInstall-Module -Name AzureADHybridAuthenticationManagement -AllowClobber\n\n# Create the Kerberos server object (requires Domain Admin and Global Admin permissions)\nSet-AzureADKerberosServer -Domain corp.local -CloudCredential $cloudCredential -DomainCredential $domainCredential', ja: '# 手順 1: Entra ID に Kerberos Server オブジェクトを作成する\n# AzureADHybridAuthenticationManagement モジュールをインストールする\nInstall-Module -Name AzureADHybridAuthenticationManagement -AllowClobber\n\n# Kerberos サーバーオブジェクトを作成する（Domain Admin および Global Admin 権限が必要）\nSet-AzureADKerberosServer -Domain corp.local -CloudCredential $cloudCredential -DomainCredential $domainCredential' } },
          { type: 'cmd', text: { zh: '# 步驟2：啟用 WHfB Cloud Trust GPO\n# GPO 路徑：Computer Configuration → Administrative Templates → Windows Components → Windows Hello for Business\n# "Use cloud trust for on-premises authentication" → Enabled\n\n# 步驟3：確認 Kerberos 伺服器物件已建立\nGet-AzureADKerberosServer -Domain corp.local -CloudCredential $cloudCredential -DomainCredential $domainCredential', en: '# Step 2: Enable WHfB Cloud Trust GPO\n# GPO path: Computer Configuration → Administrative Templates → Windows Components → Windows Hello for Business\n# "Use cloud trust for on-premises authentication" → Enabled\n\n# Step 3: Confirm the Kerberos server object has been created\nGet-AzureADKerberosServer -Domain corp.local -CloudCredential $cloudCredential -DomainCredential $domainCredential', ja: '# 手順 2: WHfB Cloud Trust GPO を有効にする\n# GPO パス: コンピューターの構成 → 管理用テンプレート → Windows コンポーネント → Windows Hello for Business\n# "Use cloud trust for on-premises authentication" → 有効\n\n# 手順 3: Kerberos サーバーオブジェクトが作成されたことを確認する\nGet-AzureADKerberosServer -Domain corp.local -CloudCredential $cloudCredential -DomainCredential $domainCredential' } },
          { type: 'info', text: { zh: '相比傳統憑證信任：Cloud Kerberos Trust 不需要 AD FS 或 PKI 基礎架構，大幅簡化部署；Entra ID 作為 Kerberos 代理頒發 TGT，安全性更高', en: 'Compared to traditional certificate trust: Cloud Kerberos Trust does not require AD FS or PKI infrastructure, greatly simplifying deployment; Entra ID acts as a Kerberos proxy to issue TGTs with improved security', ja: '従来の証明書信頼との比較: Cloud Kerberos Trust は AD FS や PKI インフラを必要とせず、展開を大幅に簡素化。Entra ID が Kerberos プロキシとして TGT を発行することでセキュリティが向上する' } }
        ]
      },
      {
        text: { zh: '定期執行 AD 攻擊路徑分析（BloodHound / Purple Knight）', en: 'Regularly run AD attack path analysis (BloodHound / Purple Knight)', ja: '定期的に AD 攻撃経路分析（BloodHound / Purple Knight）を実施する' },
        detail: { zh: '每季至少一次主動演練 BloodHound 攻擊路徑分析，找出域管理員的最短路徑並提前修補', en: 'Conduct BloodHound attack path analysis at least quarterly to proactively identify the shortest path to Domain Admin and remediate in advance', ja: '少なくとも四半期に一度、BloodHound 攻撃経路分析を積極的に実施し、Domain Admin への最短経路を発見して事前に修正する' },
        steps: [
          { type: 'cmd', text: { zh: '# 使用 SharpHound 收集 AD 資料（在測試帳戶下執行）\n# 下載 SharpHound.exe\n.\\SharpHound.exe -c All --zipfilename corp_bloodhound_$(Get-Date -Format "yyyyMMdd").zip', en: '# Use SharpHound to collect AD data (run under a test account)\n# Download SharpHound.exe\n.\\SharpHound.exe -c All --zipfilename corp_bloodhound_$(Get-Date -Format "yyyyMMdd").zip', ja: '# SharpHound を使用して AD データを収集する（テストアカウントで実行）\n# SharpHound.exe をダウンロードする\n.\\SharpHound.exe -c All --zipfilename corp_bloodhound_$(Get-Date -Format "yyyyMMdd").zip' } },
          { type: 'cmd', text: { zh: '# 啟動 BloodHound 分析\n# 將 zip 檔匯入 BloodHound GUI\n# 執行重要查詢：\n# ① Find Shortest Paths to Domain Admins\n# ② Find all Domain Admins\n# ③ Find Principals with DCSync Rights\n# ④ Shortest Paths to Unconstrained Delegation Systems\n# ⑤ Find Computers where Domain Users are Local Admin', en: '# Launch BloodHound analysis\n# Import the zip file into the BloodHound GUI\n# Run important queries:\n# ① Find Shortest Paths to Domain Admins\n# ② Find all Domain Admins\n# ③ Find Principals with DCSync Rights\n# ④ Shortest Paths to Unconstrained Delegation Systems\n# ⑤ Find Computers where Domain Users are Local Admin', ja: '# BloodHound 分析を起動する\n# zip ファイルを BloodHound GUI にインポートする\n# 重要なクエリを実行する:\n# ① Find Shortest Paths to Domain Admins\n# ② Find all Domain Admins\n# ③ Find Principals with DCSync Rights\n# ④ Shortest Paths to Unconstrained Delegation Systems\n# ⑤ Find Computers where Domain Users are Local Admin' } },
          { type: 'cmd', text: { zh: '# 使用 Purple Knight 執行評估（不需 BloodHound 環境）\n# 下載並執行 PurpleKnight.exe（需要 AD 讀取權限）\n.\\PurpleKnight.exe -outputformat HTML -output .\\pk_report_$(Get-Date -Format "yyyyMMdd")', en: '# Run an assessment using Purple Knight (no BloodHound environment needed)\n# Download and run PurpleKnight.exe (requires AD read permissions)\n.\\PurpleKnight.exe -outputformat HTML -output .\\pk_report_$(Get-Date -Format "yyyyMMdd")', ja: '# Purple Knight を使用して評価を実行する（BloodHound 環境は不要）\n# PurpleKnight.exe をダウンロードして実行する（AD 読み取り権限が必要）\n.\\PurpleKnight.exe -outputformat HTML -output .\\pk_report_$(Get-Date -Format "yyyyMMdd")' } },
          { type: 'info', text: { zh: '建議建立「Purple Team 演練行事曆」：\n① 每季：BloodHound 攻擊路徑全掃描 + 修補報告\n② 每月：PingCastle 評分追蹤\n③ 每週：新建立的高權限群組成員審查\n④ 每日：MDI 告警回顧（透過 Microsoft Sentinel）', en: 'Recommend establishing a "Purple Team Exercise Calendar":\n① Quarterly: Full BloodHound attack path scan + remediation report\n② Monthly: PingCastle score tracking\n③ Weekly: Review of newly created privileged group members\n④ Daily: MDI alert review (via Microsoft Sentinel)', ja: '「パープルチーム演習カレンダー」の設立を推奨:\n① 四半期ごと: BloodHound による攻撃経路の全スキャン + 修正レポート\n② 毎月: PingCastle スコアの追跡\n③ 毎週: 新規に作成された特権グループメンバーのレビュー\n④ 毎日: MDI アラートのレビュー（Microsoft Sentinel 経由）' } }
        ]
      }
    ]
  }
];

// ── REFERENCES ──────────────────────────────────────────────────────────────
const REFERENCES = [
  {
    category: { zh: '官方文件 & 標準', en: 'Official Documentation & Standards', ja: '公式ドキュメントと標準' },
    icon: 'bi-file-earmark-text',
    color: 'var(--accent-blue)',
    refs: [
      { title: { zh: 'MITRE ATT&CK for Enterprise', en: 'MITRE ATT&CK for Enterprise', ja: 'MITRE ATT&CK for Enterprise' }, desc: { zh: '業界最廣泛使用的攻擊技術分類框架，涵蓋戰術、技術與子技術', en: 'The most widely used attack technique classification framework, covering tactics, techniques, and sub-techniques', ja: '最も広く使用される攻撃技術分類フレームワーク。戦術・技術・サブ技術を網羅' }, url: 'https://attack.mitre.org/', tags: ['framework'] },
      { title: { zh: 'Microsoft: Active Directory のベスト プラクティスとセキュリティ', en: 'Microsoft: Best Practices for Securing Active Directory', ja: 'Microsoft: Active Directory のセキュリティ ベスト プラクティス' }, desc: { zh: 'Microsoft 官方 AD 安全加固指南', en: 'Official Microsoft AD security hardening guide', ja: 'Microsoft 公式 AD セキュリティ強化ガイド' }, url: 'https://learn.microsoft.com/en-us/windows-server/identity/ad-ds/plan/security-best-practices/best-practices-for-securing-active-directory', tags: ['official'] },
      { title: { zh: 'Microsoft: Enterprise Access Model', en: 'Microsoft: Enterprise Access Model', ja: 'Microsoft: Enterprise Access Model' }, desc: { zh: '微軟更新版的三層特權存取架構（取代舊版 Tier Model）', en: 'Microsoft updated three-tier privileged access architecture (replaces the legacy Tier Model)', ja: 'Microsoft が更新した三層特権アクセスアーキテクチャ（旧 Tier Model の後継）' }, url: 'https://learn.microsoft.com/en-us/security/privileged-access-workstations/privileged-access-access-model', tags: ['official', 'framework'] },
      { title: { zh: 'CIS Benchmark for Windows Server', en: 'CIS Benchmark for Windows Server', ja: 'CIS Benchmark for Windows Server' }, desc: { zh: 'CIS 提供的 Windows Server 安全基準設定指南', en: 'CIS-provided Windows Server security baseline configuration guide', ja: 'CIS が提供する Windows Server セキュリティ基準設定ガイド' }, url: 'https://www.cisecurity.org/cis-benchmarks/', tags: ['official', 'framework'] },
      { title: { zh: 'NIST SP 800-207: Zero Trust Architecture', en: 'NIST SP 800-207: Zero Trust Architecture', ja: 'NIST SP 800-207: ゼロトラストアーキテクチャ' }, desc: { zh: 'NIST 零信任架構標準文件，適用於 AD 現代化改造', en: 'NIST Zero Trust Architecture standard; applicable to AD modernization', ja: 'NIST ゼロトラストアーキテクチャ標準。AD の近代化に適用可能' }, url: 'https://csrc.nist.gov/publications/detail/sp/800-207/final', tags: ['official', 'framework'] },
      { title: { zh: 'Microsoft Defender for Identity documentation', en: 'Microsoft Defender for Identity documentation', ja: 'Microsoft Defender for Identity ドキュメント' }, desc: { zh: 'MDI 部署、感應器設定與告警詳解', en: 'MDI deployment, sensor configuration, and alert details', ja: 'MDI の展開・センサー設定・アラートの詳細' }, url: 'https://learn.microsoft.com/en-us/defender-for-identity/', tags: ['official', 'tool'] },
      { title: { zh: 'Microsoft Sentinel documentation', en: 'Microsoft Sentinel documentation', ja: 'Microsoft Sentinel ドキュメント' }, desc: { zh: 'SIEM 設定、分析規則與 SOAR 自動化', en: 'SIEM configuration, analytics rules, and SOAR automation', ja: 'SIEM 設定・分析ルール・SOAR 自動化' }, url: 'https://learn.microsoft.com/en-us/azure/sentinel/', tags: ['official', 'tool'] },
      { title: { zh: 'Microsoft: Kerberos Authentication Overview', en: 'Microsoft: Kerberos Authentication Overview', ja: 'Microsoft: Kerberos 認証の概要' }, desc: { zh: 'Kerberos 認證流程、票據結構及 PAC 的官方說明', en: 'Official explanation of Kerberos authentication flow, ticket structure, and PAC', ja: 'Kerberos 認証フロー・チケット構造・PAC の公式説明' }, url: 'https://learn.microsoft.com/en-us/windows-server/security/kerberos/kerberos-authentication-overview', tags: ['official'] },
      { title: { zh: 'Windows LAPS documentation', en: 'Windows LAPS documentation', ja: 'Windows LAPS ドキュメント' }, desc: { zh: '內建 Windows LAPS（v2）的部署與設定說明', en: 'Deployment and configuration guide for built-in Windows LAPS (v2)', ja: '組み込み Windows LAPS（v2）の展開と設定ガイド' }, url: 'https://learn.microsoft.com/en-us/windows-server/identity/laps/laps-overview', tags: ['official', 'tool'] },
    ]
  },
  {
    category: { zh: 'AD 攻防研究資源', en: 'AD Attack & Defense Research', ja: 'AD 攻防研究リソース' },
    icon: 'bi-search-heart',
    color: 'var(--color-lateral)',
    refs: [
      { title: 'ADSecurity.org', desc: { zh: 'Sean Metcalf 整理的 AD 安全研究資料庫，包含攻擊技術詳解、防禦建議與 Golden Ticket 等重要議題', en: "Sean Metcalf's AD security research database covering attack technique details, defense recommendations, and key topics like Golden Ticket", ja: 'Sean Metcalf による AD セキュリティ研究データベース。攻撃技術の詳細・防御推奨事項・Golden Ticket などの重要トピックを収録' }, url: 'https://adsecurity.org/', tags: ['research'] },
      { title: 'harmj0y.net (Will Schroeder)', desc: { zh: 'PowerView、Rubeus、SharpHound 作者的攻擊研究部落格', en: 'Attack research blog by the author of PowerView, Rubeus, and SharpHound', ja: 'PowerView・Rubeus・SharpHound の作者による攻撃研究ブログ' }, url: 'https://blog.harmj0y.net/', tags: ['research'] },
      { title: 'dirkjanm.io (Dirk-jan Mollema)', desc: { zh: 'Impacket 貢獻者，NTLM Relay、Kerberos 委派、AD CS 研究', en: 'Impacket contributor; research on NTLM Relay, Kerberos delegation, and AD CS', ja: 'Impacket 貢献者。NTLM リレー・Kerberos 委任・AD CS の研究' }, url: 'https://dirkjanm.io/', tags: ['research'] },
      { title: 'exploit.ph (Charlie Clark)', desc: { zh: 'Kerberos 協定深度研究，AS-REP Roasting 等攻擊手法首次公開', en: 'In-depth Kerberos protocol research; first disclosure of AS-REP Roasting and other attacks', ja: 'Kerberos プロトコルの深層研究。AS-REP Roasting などの攻撃手法を初めて公開' }, url: 'https://exploit.ph/', tags: ['research'] },
      { title: 'Posts by @gentilkiwi (Mimikatz)', desc: { zh: 'Benjamin Delpy 的 Mimikatz 工具研究與 Kerberos 深度技術分析', en: "Benjamin Delpy's Mimikatz tool research and deep Kerberos technical analysis", ja: 'Benjamin Delpy による Mimikatz ツールの研究と Kerberos の深層技術分析' }, url: 'https://blog.gentilkiwi.com/', tags: ['research', 'tool'] },
      { title: { zh: 'SANS: Protecting Privileged Domain Accounts', en: 'SANS: Protecting Privileged Domain Accounts', ja: 'SANS: 特権ドメインアカウントの保護' }, desc: { zh: 'SANS 發布的 AD 特權帳戶保護白皮書', en: 'SANS white paper on protecting AD privileged accounts', ja: 'SANS が発行した AD 特権アカウント保護のホワイトペーパー' }, url: 'https://www.sans.org/white-papers/protecting-privileged-domain-accounts-network-authentication-best-practices-34837/', tags: ['research'] },
      { title: { zh: 'SpecterOps: Attack Paths in Active Directory', en: 'SpecterOps: Attack Paths in Active Directory', ja: 'SpecterOps: Active Directory の攻撃パス' }, desc: { zh: 'BloodHound 開發團隊的 AD 攻擊路徑分析系列文章', en: 'AD attack path analysis series by the BloodHound development team', ja: 'BloodHound 開発チームによる AD 攻撃パス分析シリーズ記事' }, url: 'https://posts.specterops.io/tagged/active-directory', tags: ['research'] },
    ]
  },
  {
    category: { zh: '攻擊工具文件', en: 'Offensive Tool Documentation', ja: '攻撃ツールドキュメント' },
    icon: 'bi-lightning-charge',
    color: 'var(--severity-high)',
    refs: [
      { title: 'Mimikatz (gentilkiwi)', desc: { zh: '最廣泛使用的 Windows 憑證提取工具，支援 Pass-the-Hash、Golden Ticket 等多種攻擊', en: 'The most widely used Windows credential extraction tool, supporting Pass-the-Hash, Golden Ticket, and many other attacks', ja: '最も広く使用される Windows 認証情報抽出ツール。Pass-the-Hash・Golden Ticket など多数の攻撃をサポート' }, url: 'https://github.com/gentilkiwi/mimikatz', tags: ['tool'] },
      { title: 'BloodHound / SharpHound', desc: { zh: '以圖論分析 AD 攻擊路徑，快速找出 DA 的最短路徑', en: 'Uses graph theory to analyze AD attack paths and quickly identify the shortest path to DA', ja: 'グラフ理論で AD 攻撃パスを分析し、DA への最短経路を迅速に特定する' }, url: 'https://github.com/BloodHoundAD/BloodHound', tags: ['tool', 'research'] },
      { title: 'Impacket', desc: { zh: '純 Python 實作的 AD 協定庫，支援 SMB、Kerberos、DCSync、Secretsdump 等', en: 'Pure Python implementation of AD protocol library, supporting SMB, Kerberos, DCSync, Secretsdump, and more', ja: 'AD プロトコルの純粋 Python 実装ライブラリ。SMB・Kerberos・DCSync・Secretsdump などをサポート' }, url: 'https://github.com/fortra/impacket', tags: ['tool'] },
      { title: 'Rubeus', desc: { zh: 'C# 實作的 Kerberos 攻擊工具集，支援 Kerberoasting、AS-REP Roasting、Pass-the-Ticket 等', en: 'C# Kerberos attack toolkit supporting Kerberoasting, AS-REP Roasting, Pass-the-Ticket, and more', ja: 'C# で実装された Kerberos 攻撃ツールキット。Kerberoasting・AS-REP Roasting・Pass-the-Ticket などをサポート' }, url: 'https://github.com/GhostPack/Rubeus', tags: ['tool'] },
      { title: 'PowerView / PowerSploit', desc: { zh: 'AD 偵察與漏洞分析的 PowerShell 工具集', en: 'PowerShell toolkit for AD reconnaissance and vulnerability analysis', ja: 'AD 偵察と脆弱性分析のための PowerShell ツールキット' }, url: 'https://github.com/PowerShellMafia/PowerSploit', tags: ['tool'] },
      { title: 'CrackMapExec (CME / NetExec)', desc: { zh: 'AD 環境的後滲透框架，支援橫向移動、憑證測試、SMB 列舉', en: 'Post-exploitation framework for AD environments, supporting lateral movement, credential testing, and SMB enumeration', ja: 'AD 環境のポスト・エクスプロイテーション フレームワーク。横移動・認証情報テスト・SMB 列挙をサポート' }, url: 'https://github.com/Pennyw0rth/NetExec', tags: ['tool'] },
      { title: 'Certipy', desc: { zh: 'AD CS（Active Directory Certificate Services）枚舉與攻擊工具，涵蓋 ESC1-13', en: 'AD CS enumeration and attack tool covering ESC1–13', ja: 'AD CS（Active Directory 証明書サービス）の列挙・攻撃ツール。ESC1〜13 に対応' }, url: 'https://github.com/ly4k/Certipy', tags: ['tool', 'research'] },
      { title: 'Responder', desc: { zh: 'LLMNR/NBT-NS/mDNS 毒化與 NTLM 中繼工具', en: 'LLMNR/NBT-NS/mDNS poisoning and NTLM relay tool', ja: 'LLMNR/NBT-NS/mDNS ポイズニングと NTLM リレーツール' }, url: 'https://github.com/lgandx/Responder', tags: ['tool'] },
    ]
  },
  {
    category: { zh: '防禦、稽核與監控工具', en: 'Defense, Audit & Monitoring Tools', ja: '防御・監査・監視ツール' },
    icon: 'bi-shield-check',
    color: 'var(--color-defense)',
    refs: [
      { title: 'PingCastle', desc: { zh: 'AD 健康狀態稽核工具，以評分方式呈現 AD 安全風險', en: 'AD health audit tool that presents AD security risks as a scored report', ja: 'AD 健康状態監査ツール。AD セキュリティリスクをスコア形式で提示する' }, url: 'https://www.pingcastle.com/', tags: ['tool'] },
      { title: 'Purple Knight (Semperis)', desc: { zh: '免費 AD 安全評估工具，快速找出高危錯誤設定', en: 'Free AD security assessment tool for quickly identifying high-risk misconfigurations', ja: '無料の AD セキュリティ評価ツール。高リスクな設定ミスを迅速に特定する' }, url: 'https://www.purple-knight.com/', tags: ['tool'] },
      { title: 'Locksmith', desc: { zh: 'PowerShell 工具，自動尋找並修復 AD CS 錯誤設定（ESC 漏洞）', en: 'PowerShell tool that automatically finds and remediates AD CS misconfigurations (ESC vulnerabilities)', ja: 'AD CS の設定ミス（ESC 脆弱性）を自動検出・修正する PowerShell ツール' }, url: 'https://github.com/TrimarcJake/Locksmith', tags: ['tool'] },
      { title: 'Sysmon (System Monitor)', desc: { zh: 'Windows 系統監控工具，提供程序、網路、登錄等詳細事件日誌', en: 'Windows system monitoring tool providing detailed event logs for processes, network, registry, and more', ja: 'プロセス・ネットワーク・レジストリなどの詳細なイベントログを提供する Windows システム監視ツール' }, url: 'https://learn.microsoft.com/en-us/sysinternals/downloads/sysmon', tags: ['tool', 'official'] },
      { title: 'New-KrbtgtKeys.ps1 (Microsoft)', desc: { zh: 'Microsoft 官方 KRBTGT 帳戶密碼重設腳本', en: 'Official Microsoft script for resetting the KRBTGT account password', ja: 'KRBTGT アカウントのパスワードをリセットするための Microsoft 公式スクリプト' }, url: 'https://github.com/microsoft/New-KrbtgtKeys.ps1', tags: ['tool', 'official'] },
      { title: 'Sigma Rules (SigmaHQ)', desc: { zh: '通用 SIEM 偵測規則格式，可轉換至 Splunk、Elastic、Sentinel 等平台', en: 'Generic SIEM detection rule format that can be converted for Splunk, Elastic, Sentinel, and other platforms', ja: 'Splunk・Elastic・Sentinel などのプラットフォームに変換可能な汎用 SIEM 検知ルール形式' }, url: 'https://github.com/SigmaHQ/sigma', tags: ['tool', 'framework'] },
      { title: 'AD CS ESC Attack Paths (Certifried Research)', desc: { zh: 'Will Schroeder & Lee Christensen 的 AD CS 攻擊路徑完整研究', en: "Will Schroeder & Lee Christensen's complete research on AD CS attack paths", ja: 'Will Schroeder & Lee Christensen による AD CS 攻撃パスの完全な研究' }, url: 'https://specterops.io/assets/resources/Certified_Pre-Owned.pdf', tags: ['research', 'tool'] },
    ]
  },
  {
    category: { zh: '重要 CVE 公告', en: 'Key CVE Advisories', ja: '重要な CVE アドバイザリ' },
    icon: 'bi-bug',
    color: 'var(--severity-critical)',
    refs: [
      { title: 'CVE-2020-1472 – Zerologon', desc: { zh: 'Netlogon 協定漏洞，允許未授權者重設 DC 的機器帳戶密碼並取得 DA', en: 'Netlogon protocol vulnerability allowing an unauthorized party to reset a DC machine account password and gain DA', ja: 'Netlogon プロトコルの脆弱性。未認証者が DC のマシンアカウントパスワードをリセットして DA を取得可能' }, url: 'https://msrc.microsoft.com/update-guide/vulnerability/CVE-2020-1472', tags: ['cve'] },
      { title: 'CVE-2021-42278 / CVE-2021-42287 – noPac / sAMAccountName Spoofing', desc: { zh: '一般使用者可建立電腦帳戶並偽造 DC 身份以取得 TGT，進一步提權至 DA', en: 'Regular users can create computer accounts and impersonate a DC to obtain a TGT, then escalate to DA', ja: '一般ユーザーがコンピューターアカウントを作成して DC になりすまし TGT を取得し、DA に昇格できる' }, url: 'https://msrc.microsoft.com/update-guide/vulnerability/CVE-2021-42278', tags: ['cve'] },
      { title: 'CVE-2022-26923 – Certifried (AD CS)', desc: { zh: '低權限使用者可申請 DC 憑證，進而執行 DCSync 以完整提取 AD 資料', en: 'Low-privileged users can request DC certificates and then execute DCSync to fully extract AD data', ja: '低権限ユーザーが DC 証明書を申請し、DCSync を実行して AD データを完全に抽出できる' }, url: 'https://msrc.microsoft.com/update-guide/vulnerability/CVE-2022-26923', tags: ['cve'] },
      { title: 'CVE-2014-6324 – MS14-068 (Kerberos PAC)', desc: { zh: 'Kerberos KDC 未驗證 PAC Checksum，允許任何帳戶偽造 DA 票據', en: 'Kerberos KDC does not validate PAC checksums, allowing any account to forge DA tickets', ja: 'Kerberos KDC が PAC チェックサムを検証せず、任意のアカウントが DA チケットを偽造可能' }, url: 'https://msrc.microsoft.com/update-guide/vulnerability/CVE-2014-6324', tags: ['cve'] },
      { title: 'CVE-2019-1040 – NTLM MIC Bypass', desc: { zh: 'NTLM 訊息完整性碼（MIC）繞過，結合 NTLM Relay 可對 LDAP 進行中繼攻擊（PrivExchange 前置）', en: 'NTLM Message Integrity Code (MIC) bypass; combined with NTLM Relay, enables relay attacks against LDAP (prerequisite for PrivExchange)', ja: 'NTLM メッセージ整合性コード（MIC）のバイパス。NTLM リレーと組み合わせると LDAP へのリレー攻撃が可能（PrivExchange の前提条件）' }, url: 'https://msrc.microsoft.com/update-guide/vulnerability/CVE-2019-1040', tags: ['cve'] },
      { title: 'CVE-2021-36942 – PetitPotam (LSA Spoofing)', desc: { zh: 'LSARPC 介面允許未授權呼叫 EfsRpcOpenFileRaw，迫使 DC 向攻擊者 NTLM 認證（可結合 AD CS 提權）', en: 'The LSARPC interface allows unauthorized calls to EfsRpcOpenFileRaw, forcing the DC to NTLM-authenticate to the attacker (can be combined with AD CS for privilege escalation)', ja: 'LSARPC インターフェースが未認証の EfsRpcOpenFileRaw 呼び出しを許可し、DC を攻撃者に NTLM 認証させる（AD CS と組み合わせて特権昇格可能）' }, url: 'https://msrc.microsoft.com/update-guide/vulnerability/CVE-2021-36942', tags: ['cve'] },
    ]
  },
  {
    category: { zh: 'Kerberos 協定深度研究', en: 'Kerberos Protocol In-Depth Research', ja: 'Kerberos プロトコル詳細研究' },
    icon: 'bi-key',
    color: 'var(--severity-medium)',
    refs: [
      { title: { zh: 'Kerberoasting (Tim Medin, DerbyCon 2014)', en: 'Kerberoasting (Tim Medin, DerbyCon 2014)', ja: 'Kerberoasting (Tim Medin, DerbyCon 2014)' }, desc: { zh: 'Kerberoasting 攻擊首次公開演說，解說如何離線破解 Kerberos 服務票據', en: 'First public presentation of Kerberoasting, explaining how to crack Kerberos service tickets offline', ja: 'Kerberoasting 攻撃を初めて公開発表。Kerberos サービスチケットをオフラインで解析する方法を解説' }, url: 'https://www.youtube.com/watch?v=PUyhlN-E5MU', tags: ['research'] },
      { title: { zh: 'Roasting AS-REPs (harmj0y)', en: 'Roasting AS-REPs (harmj0y)', ja: 'Roasting AS-REPs (harmj0y)' }, desc: { zh: 'AS-REP Roasting 攻擊首次完整技術說明（不需預認證的帳戶）', en: 'First complete technical description of AS-REP Roasting (accounts that do not require pre-authentication)', ja: 'AS-REP Roasting 攻撃の初の完全な技術解説（事前認証を要求しないアカウントを対象）' }, url: 'https://blog.harmj0y.net/activedirectory/roasting-as-reps/', tags: ['research'] },
      { title: { zh: 'Golden Ticket Attacks (Sean Metcalf)', en: 'Golden Ticket Attacks (Sean Metcalf)', ja: 'Golden Ticket 攻撃 (Sean Metcalf)' }, desc: { zh: 'Golden Ticket 攻擊原理、防禦與偵測方式的詳細說明', en: 'Detailed explanation of Golden Ticket attack principles, defense, and detection methods', ja: 'Golden Ticket 攻撃の原理・防御・検知方法の詳細説明' }, url: 'https://adsecurity.org/?p=1515', tags: ['research'] },
      { title: { zh: 'Abusing Active Directory Certificate Services (Will Schroeder / Lee Christensen)', en: 'Abusing Active Directory Certificate Services', ja: 'Active Directory 証明書サービスの悪用' }, desc: { zh: '完整的 AD CS 攻擊路徑研究（ESC1–ESC8），此論文引發 Certifried 等後續研究', en: 'Comprehensive AD CS attack path research (ESC1–ESC8); this paper led to subsequent research including Certifried', ja: '包括的な AD CS 攻撃パス研究（ESC1〜ESC8）。この論文が Certifried など後続研究のきっかけとなった' }, url: 'https://specterops.io/assets/resources/Certified_Pre-Owned.pdf', tags: ['research'] },
      { title: { zh: 'DCSync Attack Explained (Sean Metcalf)', en: 'DCSync Attack Explained (Sean Metcalf)', ja: 'DCSync 攻撃の解説 (Sean Metcalf)' }, desc: { zh: '使用 Mimikatz DCSync 功能模擬 DC 複寫以提取所有密碼雜湊值的技術說明', en: 'Technical explanation of using Mimikatz DCSync to simulate DC replication and extract all password hashes', ja: 'Mimikatz DCSync を使用して DC 複製をシミュレートし、すべてのパスワードハッシュを抽出する技術解説' }, url: 'https://adsecurity.org/?p=1729', tags: ['research'] },
    ]
  }
];
