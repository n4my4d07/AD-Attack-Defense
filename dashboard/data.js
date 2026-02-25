// AD Kill Chain Attack & Defense - Structured Data
// Extracted from README.md

const CATEGORIES = [
  {
    id: 'discovery',
    name: 'Discovery',
    icon: 'bi-search',
    color: '#58a6ff',
    mitre: 'TA0007',
    description: '對 Active Directory 環境進行偵察，列舉服務、帳戶與設定資訊',
    techniques: [
      {
        name: 'SPN Scanning',
        description: '掃描 Service Principal Names，在不使用網路埠掃描的情況下發現服務',
        tools: ['PowerView', 'PowerUpSQL'],
        resources: [
          { title: 'SPN Scanning – Service Discovery without Network Port Scanning', url: 'https://adsecurity.org/?p=1508' },
          { title: 'Active Directory: PowerShell script to list all SPNs used', url: 'https://social.technet.microsoft.com/wiki/contents/articles/18996.active-directory-powershell-script-to-list-all-spns-used.aspx' },
          { title: 'Discovering Service Accounts Without Using Privileges', url: 'https://blog.stealthbits.com/discovering-service-accounts-without-using-privileges/' }
        ]
      },
      {
        name: 'Data Mining',
        description: '在網域 SQL 伺服器與郵件系統中搜尋敏感資料',
        tools: ['PowerUpSQL', 'MailSniper'],
        resources: [
          { title: 'A Data Hunting Overview', url: 'https://thevivi.net/2018/05/23/a-data-hunting-overview/' },
          { title: 'Finding Sensitive Data on Domain SQL Servers using PowerUpSQL', url: 'https://blog.netspi.com/finding-sensitive-data-domain-sql-servers-using-powerupsql/' },
          { title: 'I Hunt Sysadmins', url: 'https://blog.harmj0y.net/penetesting/i-hunt-sysadmins/' }
        ]
      },
      {
        name: 'User Hunting',
        description: '在 AD 環境中尋找高價值帳戶與管理員',
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
        description: '列舉 Local Administrator Password Solution 設定',
        tools: ['LAPSToolkit', 'PowerView'],
        resources: [
          { title: 'Microsoft LAPS Security & Active Directory LAPS Configuration Recon', url: 'https://adsecurity.org/?p=3164' },
          { title: 'Running LAPS with PowerView', url: 'https://blog.harmj0y.net/powershell/running-laps-with-powerview/' }
        ]
      },
      {
        name: 'AppLocker Enumeration',
        description: '列舉 AppLocker 設定，找出繞過路徑',
        tools: [],
        resources: [
          { title: 'Enumerating AppLocker Config', url: 'https://rastamouse.me/blog/applocker/' }
        ]
      },
      {
        name: 'ADFS Reconnaissance',
        description: '對 Active Directory Federation Services 進行攻擊與偵察',
        tools: ['PowerShell'],
        resources: [
          { title: 'Attacking ADFS Endpoints with PowerShell', url: 'https://www.youtube.com/watch?v=oTyLdAUjw30' },
          { title: 'Using PowerShell to Identify Federated Domains', url: 'https://blog.netspi.com/using-powershell-identify-federated-domains/' }
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
    description: '從一般使用者提升至域管理員或更高權限',
    techniques: [
      {
        name: 'sAMAccountName Spoofing',
        description: 'CVE-2021-42287/42278：利用電腦帳戶冒充 DC，取得域管理員 TGT',
        tools: ['sam-the-admin', 'noPac'],
        cves: ['CVE-2021-42287', 'CVE-2021-42278'],
        resources: [
          { title: 'sAMAccountName spoofing', url: 'https://www.thehacker.recipes/ad/movement/kerberos/samaccountname-spoofing' },
          { title: 'CVE-2021-42287/CVE-2021-42278 Weaponisation', url: 'https://exploit.ph/cve-2021-42287-cve-2021-42278-weaponisation.html' }
        ]
      },
      {
        name: 'AD CS Abuse (Certified Pre-Owned)',
        description: '濫用 AD 憑證服務中的錯誤設定，進行權限提升',
        tools: ['Certify', 'PSPKIAudit', 'Locksmith'],
        resources: [
          { title: 'Certified Pre-Owned', url: 'https://posts.specterops.io/certified-pre-owned-d95910965cd2' },
          { title: 'AD CS Domain Escalation', url: 'https://book.hacktricks.xyz/windows-hardening/active-directory-methodology/ad-certificates/domain-escalation' }
        ]
      },
      {
        name: 'PetitPotam',
        description: '強制 DC 向攻擊者進行 NTLM 認證，再中繼到 AD CS 取得域管理員',
        tools: ['PetitPotam', 'Impacket'],
        cves: ['CVE-2021-36942'],
        resources: [
          { title: 'PetitPotam GitHub', url: 'https://github.com/topotam/PetitPotam' },
          { title: 'From Stranger to DA using PetitPotam', url: 'https://blog.truesec.com/2021/08/05/from-stranger-to-da-using-petitpotam-to-ntlm-relay-to-active-directory/' }
        ]
      },
      {
        name: 'Zerologon',
        description: 'CVE-2020-1472：利用 Netlogon 加密漏洞，無需憑證即可成為域管理員',
        tools: ['Impacket'],
        cves: ['CVE-2020-1472'],
        resources: [
          { title: 'Zerologon: instantly become domain admin (CVE-2020-1472)', url: 'https://www.secura.com/blog/zero-logon' },
          { title: 'CVE-2020-1472 POC', url: 'https://github.com/dirkjanm/CVE-2020-1472' }
        ]
      },
      {
        name: 'Kerberos Delegation',
        description: '利用無限制/受限制/資源型 Kerberos 委派進行提權',
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
        description: '利用 AD ACL 的不安全設定進行橫向/垂直移動',
        tools: ['PowerView', 'BloodHound', 'aclpwn.py', 'RACE'],
        resources: [
          { title: 'Escalating privileges with ACLs in Active Directory', url: 'https://blog.fox-it.com/2018/04/26/escalating-privileges-with-acls-in-active-directory/' },
          { title: 'Abusing Active Directory Permissions with PowerView', url: 'https://blog.harmj0y.net/redteaming/abusing-active-directory-permissions-with-powerview/' },
          { title: 'BloodHound 1.3 – The ACL Attack Path Update', url: 'https://wald0.com/?p=112' }
        ]
      },
      {
        name: 'GPO Abuse',
        description: '利用不安全的 Group Policy Object 設定進行提權',
        tools: ['PowerView', 'SharpGPOAbuse', 'Grouper'],
        resources: [
          { title: 'Abusing GPO Permissions', url: 'https://www.harmj0y.net/blog/redteaming/abusing-gpo-permissions/' },
          { title: 'A Red Teamer\'s Guide to GPOs and OUs', url: 'https://wald0.com/?p=179' }
        ]
      },
      {
        name: 'Domain Trust Attacks',
        description: '利用跨域/跨林信任關係進行橫向移動',
        tools: ['Rubeus', 'Mimikatz', 'PowerView'],
        resources: [
          { title: 'A Guide to Attacking Domain Trusts', url: 'https://blog.harmj0y.net/redteaming/a-guide-to-attacking-domain-trusts/' },
          { title: 'Not A Security Boundary: Breaking Forest Trusts', url: 'https://posts.specterops.io/not-a-security-boundary-breaking-forest-trusts-cd125829518d' }
        ]
      },
      {
        name: 'DNSAdmins Privilege Abuse',
        description: '利用 DNSAdmins 群組成員身份載入惡意 DLL，提升至系統層級',
        tools: ['PowerView'],
        resources: [
          { title: 'Abusing DNSAdmins privilege for escalation in Active Directory', url: 'http://www.labofapenetrationtester.com/2017/05/abusing-dnsadmins-privilege-for-escalation-in-active-directory.html' },
          { title: 'From DNSAdmins to Domain Admin', url: 'https://adsecurity.org/?p=4064' }
        ]
      },
      {
        name: 'NTLM Relay & LLMNR/NBNS Poisoning',
        description: '利用 NTLM 中繼攻擊或 LLMNR/NBNS 毒化取得憑證',
        tools: ['Responder', 'Impacket', 'mitm6'],
        cves: ['CVE-2019-1040'],
        resources: [
          { title: 'Pwning with Responder – A Pentester\'s Guide', url: 'https://www.notsosecure.com/pwning-with-responder-a-pentesters-guide/' },
          { title: 'Practical guide to NTLM Relaying in 2017', url: 'https://byt3bl33d3r.github.io/practical-guide-to-ntlm-relaying-in-2017-aka-getting-a-foothold-in-under-5-minutes.html' },
          { title: 'mitm6 – compromising IPv4 networks via IPv6', url: 'https://www.fox-it.com/en/news/blog/mitm6-compromising-ipv4-networks-via-ipv6/' }
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
    description: '規避安全工具偵測，維持在網路中的存在',
    techniques: [
      {
        name: 'AMSI Bypass',
        description: '繞過 Anti-Malware Scan Interface，執行惡意 PowerShell 程式碼',
        tools: ['Invisi-Shell'],
        resources: [
          { title: 'How to bypass AMSI and execute ANY malicious Powershell code', url: 'https://0x00-0x00.github.io/research/2018/10/28/How-to-bypass-AMSI-and-Execute-ANY-malicious-powershell-code.html' },
          { title: 'AMSI Bypass: Patching Technique', url: 'https://www.cyberark.com/threat-research-blog/amsi-bypass-patching-technique/' },
          { title: 'AmsiScanBuffer Bypass - Part 1', url: 'https://rastamouse.me/2018/10/amsiscanbuffer-bypass---part-1/' }
        ]
      },
      {
        name: 'EDR Evasion',
        description: '繞過端點偵測與回應工具',
        tools: ['Sharp-Suite'],
        resources: [
          { title: 'Red Team Tactics: Combining Direct System Calls and sRDI to bypass AV/EDR', url: 'https://outflank.nl/blog/2019/06/19/red-team-tactics-combining-direct-system-calls-and-srdi-to-bypass-av-edr/' },
          { title: 'Bypassing Cylance and other AVs/EDRs by Unhooking Windows APIs', url: 'https://ired.team/offensive-security/defense-evasion/bypassing-cylance-and-other-avs-edrs-by-unhooking-windows-apis' }
        ]
      },
      {
        name: 'PowerShell ScriptBlock Logging Bypass',
        description: '繞過 PowerShell ScriptBlock 日誌記錄',
        tools: [],
        resources: [
          { title: 'PowerShell ScriptBlock Logging Bypass', url: 'https://cobbr.io/ScriptBlock-Logging-Bypass.html' }
        ]
      },
      {
        name: 'In-Memory Evasion',
        description: '在記憶體中執行惡意程式碼，避免落地',
        tools: [],
        resources: [
          { title: 'Bring Your Own Land (BYOL) – A Novel Red Teaming Technique', url: 'https://www.fireeye.com/blog/threat-research/2018/06/bring-your-own-land-novel-red-teaming-technique.html' }
        ]
      },
      {
        name: 'AppLocker & LOLBins Bypass',
        description: '利用系統內建二進位檔繞過 AppLocker 限制',
        tools: [],
        resources: [
          { title: 'Living Off The Land Binaries And Scripts (LOLBins)', url: 'https://lolbas-project.github.io/' }
        ]
      },
      {
        name: 'Sysmon Evasion',
        description: '規避 Sysmon 監控',
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
    description: '在網路中橫向移動，擴大存取範圍',
    techniques: [
      {
        name: 'Pass The Hash',
        description: '使用 NTLM 雜湊值進行認證，無需明文密碼',
        tools: ['Mimikatz', 'CrackMapExec', 'Impacket'],
        resources: [
          { title: 'Performing Pass-the-hash Attacks With Mimikatz', url: 'https://blog.stealthbits.com/passing-the-hash-with-mimikatz' },
          { title: 'Pass-the-Hash Is Dead: Long Live LocalAccountTokenFilterPolicy', url: 'https://www.harmj0y.net/blog/redteaming/pass-the-hash-is-dead-long-live-localaccounttokenfilterpolicy/' }
        ]
      },
      {
        name: 'SQL Server DB Links',
        description: '利用 SQL Server 資料庫連結進行橫向移動',
        tools: ['PowerUpSQL'],
        resources: [
          { title: 'SQL Server – Link… Link… Link… and Shell', url: 'https://blog.netspi.com/how-to-hack-database-links-in-sql-server/' },
          { title: 'SQL Server Link Crawling with PowerUpSQL', url: 'https://blog.netspi.com/sql-server-link-crawling-powerupsql/' }
        ]
      },
      {
        name: 'SCCM Abuse',
        description: '利用 System Center Configuration Manager 進行橫向移動',
        tools: ['PowerSCCM'],
        resources: [
          { title: 'Targeted Workstation Compromise With Sccm', url: 'https://enigma0x3.net/2015/10/27/targeted-workstation-compromise-with-sccm/' }
        ]
      },
      {
        name: 'WSUS Exploitation',
        description: '利用 Windows Server Update Services 進行 MITM 攻擊',
        tools: ['WSUSpendu'],
        resources: [
          { title: 'Remote Weaponization of WSUS MITM', url: 'https://www.sixdub.net/?p=623' },
          { title: 'Leveraging WSUS – Part One', url: 'https://ijustwannared.team/2018/10/15/leveraging-wsus-part-one/' }
        ]
      },
      {
        name: 'Password Spraying',
        description: '對大量帳戶嘗試少數常見密碼',
        tools: ['DomainPasswordSpray', 'SprayingToolkit', 'MailSniper'],
        resources: [
          { title: 'Password Spraying Windows Active Directory Accounts', url: 'https://www.youtube.com/watch?v=xB26QhnL64c' },
          { title: 'Attacking Exchange with MailSniper', url: 'https://www.blackhillsinfosec.com/attacking-exchange-with-mailsniper/' }
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
    description: '從系統記憶體或資料庫中竊取憑證',
    techniques: [
      {
        name: 'Kerberoasting',
        description: '請求服務 TGS Ticket 並離線破解服務帳戶密碼',
        tools: ['Rubeus', 'Impacket', 'PowerView'],
        resources: [
          { title: 'Kerberoasting Without Mimikatz', url: 'https://www.harmj0y.net/blog/powershell/kerberoasting-without-mimikatz/' },
          { title: 'Cracking Kerberos TGS Tickets Using Kerberoast', url: 'https://adsecurity.org/?p=2293' },
          { title: 'DerbyCon 2019 - Kerberoasting Revisited', url: 'https://www.slideshare.net/harmj0y/derbycon-2019-kerberoasting-revisited' }
        ]
      },
      {
        name: 'AS-REP Roasting',
        description: '針對不需要預身份驗證的帳戶，請求 AS-REP 並離線破解',
        tools: ['Rubeus', 'Impacket'],
        resources: [
          { title: 'Roasting AS-REPs', url: 'http://www.harmj0y.net/blog/activedirectory/roasting-as-reps/' }
        ]
      },
      {
        name: 'DCSync',
        description: '模擬 DC 複寫，從 DC 拉取密碼雜湊值',
        tools: ['Mimikatz', 'Impacket'],
        resources: [
          { title: 'Mimikatz DCSync Usage, Exploitation, and Detection', url: 'https://adsecurity.org/?p=1729' },
          { title: 'Dump Clear-Text Passwords for All Admins in the Domain Using Mimikatz DCSync', url: 'https://adsecurity.org/?p=2053' }
        ]
      },
      {
        name: 'NTDS.DIT Extraction',
        description: '直接從 DC 提取 AD 資料庫',
        tools: ['Impacket', 'ntdsutil'],
        resources: [
          { title: 'How Attackers Pull the Active Directory Database (NTDS.dit)', url: 'https://adsecurity.org/?p=451' },
          { title: 'Extracting Password Hashes From The Ntds.dit File', url: 'https://blog.stealthbits.com/extracting-password-hashes-from-the-ntds-dit-file/' }
        ]
      },
      {
        name: 'LLMNR/NBT-NS Poisoning',
        description: '毒化 LLMNR/NBT-NS 回應，擷取 NTLM 雜湊值',
        tools: ['Responder'],
        resources: [
          { title: 'LLMNR/NBT-NS Poisoning Using Responder', url: 'https://www.4armed.com/blog/llmnr-nbtns-poisoning-using-responder/' }
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
    description: '在 AD 環境中建立長期存取後門',
    techniques: [
      {
        name: 'Golden Ticket',
        description: '偽造 Kerberos TGT，使用 KRBTGT 帳戶雜湊值建立持久存取',
        tools: ['Mimikatz', 'Rubeus', 'Impacket'],
        resources: [
          { title: 'Golden Ticket', url: 'https://pentestlab.blog/2018/04/09/golden-ticket/' },
          { title: 'Kerberos Golden Tickets are Now More Golden', url: 'https://adsecurity.org/?p=1640' }
        ]
      },
      {
        name: 'Silver Ticket',
        description: '偽造 Kerberos TGS，針對特定服務建立後門存取',
        tools: ['Mimikatz', 'Impacket'],
        resources: [
          { title: 'How Attackers Use Kerberos Silver Tickets to Exploit Systems', url: 'https://adsecurity.org/?p=2011' }
        ]
      },
      {
        name: 'Diamond Ticket',
        description: '修改合法 TGT 而非偽造，較難偵測的 Golden Ticket 變體',
        tools: ['Rubeus'],
        resources: [
          { title: 'A Diamond (Ticket) in the Ruff', url: 'https://www.semperis.com/blog/a-diamond-ticket-in-the-ruff/' }
        ]
      },
      {
        name: 'Skeleton Key',
        description: '在 DC 上植入 Skeleton Key，允許以任意密碼登入任何帳戶',
        tools: ['Mimikatz'],
        resources: [
          { title: 'Skeleton Key', url: 'https://pentestlab.blog/2018/04/10/skeleton-key/' },
          { title: 'Unlocking All The Doors To Active Directory With The Skeleton Key Attack', url: 'https://blog.stealthbits.com/unlocking-all-the-doors-to-active-directory-with-the-skeleton-key-attack/' }
        ]
      },
      {
        name: 'AdminSDHolder Backdoor',
        description: '修改 AdminSDHolder ACL，建立隱藏的持久管理員存取',
        tools: ['PowerView', 'RACE'],
        resources: [
          { title: 'Leverage AdminSDHolder & SDProp to (Re)Gain Domain Admin Rights', url: 'https://adsecurity.org/?p=1906' },
          { title: 'Persistence Using Adminsdholder And Sdprop', url: 'https://blog.stealthbits.com/persistence-using-adminsdholder-and-sdprop/' }
        ]
      },
      {
        name: 'SID History Abuse',
        description: '在帳戶 SID History 屬性中植入高權限 SID',
        tools: ['Mimikatz'],
        resources: [
          { title: 'Sneaky Active Directory Persistence #14: SID History', url: 'https://adsecurity.org/?p=1772' }
        ]
      },
      {
        name: 'DSRM Persistence',
        description: '利用 Directory Services Restore Mode 帳戶建立後門',
        tools: [],
        resources: [
          { title: 'Sneaky Active Directory Persistence #11: DSRM', url: 'https://adsecurity.org/?p=1714' },
          { title: 'Sneaky Active Directory Persistence #13: DSRM Persistence v2', url: 'https://adsecurity.org/?p=1785' }
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
    description: '允許標準網域使用者透過電腦帳戶冒充 DC，以 S4U2Self 取得域管理員 ST',
    category: 'Privilege Escalation',
    url: 'https://exploit.ph/cve-2021-42287-cve-2021-42278-weaponisation.html',
    tools: ['sam-the-admin', 'noPac']
  },
  {
    id: 'CVE-2021-42278',
    name: 'Computer Account Name Spoofing',
    severity: 'high',
    year: 2021,
    description: '允許電腦帳戶名稱不以 $ 結尾，配合 CVE-2021-42287 提升至域管理員',
    category: 'Privilege Escalation',
    url: 'https://exploit.ph/cve-2021-42287-cve-2021-42278-weaponisation.html',
    tools: ['sam-the-admin', 'noPac']
  },
  {
    id: 'CVE-2021-36942',
    name: 'PetitPotam',
    severity: 'critical',
    year: 2021,
    description: '利用 MS-EFSRPC 強制 DC 向攻擊者進行 NTLM 認證，可中繼至 AD CS',
    category: 'Privilege Escalation',
    url: 'https://github.com/topotam/PetitPotam',
    tools: ['PetitPotam']
  },
  {
    id: 'CVE-2020-1472',
    name: 'Zerologon',
    severity: 'critical',
    year: 2020,
    description: 'Netlogon 加密弱點，允許未認證攻擊者建立安全通道連線，重設 DC 電腦帳戶密碼',
    category: 'Privilege Escalation',
    url: 'https://www.secura.com/blog/zero-logon',
    tools: ['Impacket']
  },
  {
    id: 'CVE-2020-17049',
    name: 'Kerberos Bronze Bit',
    severity: 'high',
    year: 2020,
    description: '允許攻擊者繞過 Kerberos 委派保護，偽造可轉發 TGS 票據',
    category: 'Privilege Escalation',
    url: 'https://blog.netspi.com/cve-2020-17049-kerberos-bronze-bit-overview/',
    tools: ['Rubeus']
  },
  {
    id: 'CVE-2019-1040',
    name: 'NTLM MIC Bypass',
    severity: 'high',
    year: 2019,
    description: 'NTLM MIC（Message Integrity Check）保護被繞過，允許 NTLM 中繼攻擊',
    category: 'Lateral Movement',
    url: 'https://portal.msrc.microsoft.com/en-US/security-guidance/advisory/CVE-2019-1040',
    tools: ['Impacket']
  },
  {
    id: 'CVE-2019-0683',
    name: 'AD Trust Elevation',
    severity: 'high',
    year: 2019,
    description: '信任森林的 TGT 委派預設設定允許跨森林票據偽造',
    category: 'Privilege Escalation',
    url: 'https://portal.msrc.microsoft.com/en-US/security-guidance/advisory/CVE-2019-0683',
    tools: []
  },
  {
    id: 'CVE-2019-0708',
    name: 'BlueKeep (RDP RCE)',
    severity: 'critical',
    year: 2019,
    description: 'Remote Desktop Services 遠端程式碼執行漏洞，無需認證即可攻擊',
    category: 'Initial Access',
    url: 'https://portal.msrc.microsoft.com/en-US/security-guidance/advisory/CVE-2019-0708',
    tools: []
  },
  {
    id: 'CVE-2018-8581',
    name: 'Exchange EoP',
    severity: 'high',
    year: 2018,
    description: 'Exchange Server 權限提升漏洞，可中繼到 DC 並取得域管理員',
    category: 'Privilege Escalation',
    url: 'https://portal.msrc.microsoft.com/en-US/security-guidance/advisory/CVE-2018-8518',
    tools: ['NtlmRelayToEWS']
  },
  {
    id: 'CVE-2017-0143',
    name: 'EternalBlue (SMB)',
    severity: 'critical',
    year: 2017,
    description: 'SMBv1 遠端程式碼執行漏洞，由 WannaCry 和 NotPetya 廣泛利用',
    category: 'Lateral Movement',
    url: 'https://portal.msrc.microsoft.com/en-US/security-guidance/advisory/CVE-2017-0143',
    tools: []
  },
  {
    id: 'CVE-2016-0128',
    name: 'BADLOCK (SAM/LSAD)',
    severity: 'high',
    year: 2016,
    description: 'SAM 和 LSAD 協定實作允許 MITM 攻擊者降級 RPC 通道',
    category: 'Credential Dumping',
    url: 'https://portal.msrc.microsoft.com/en-US/security-guidance/advisory/CVE-2016-0128',
    tools: []
  },
  {
    id: 'CVE-2014-6324',
    name: 'MS14-068 (Kerberos)',
    severity: 'critical',
    year: 2014,
    description: 'Kerberos KDC 驗證弱點，允許一般使用者取得域管理員 Kerberos 票據',
    category: 'Privilege Escalation',
    url: 'https://docs.microsoft.com/en-us/security-updates/securitybulletins/2014/ms14-068',
    tools: []
  },
  {
    id: 'CVE-2014-1812',
    name: 'GPP Password (MS14-025)',
    severity: 'high',
    year: 2014,
    description: 'Group Policy Preferences 使用可逆加密儲存密碼，任何網域使用者均可讀取',
    category: 'Credential Dumping',
    url: 'https://support.microsoft.com/en-us/help/2962486/ms14-025-vulnerability-in-group-policy-preferences-could-allow-elevati',
    tools: ['PowerView']
  }
];

const DETECTION_EVENTS = [
  {
    attack: 'Account & Group Enumeration',
    category: 'discovery',
    eventIds: ['4798', '4799'],
    descriptions: [
      '4798: 使用者的本機群組成員資格已被列舉',
      '4799: 已啟用安全性的本機群組成員資格已被列舉'
    ]
  },
  {
    attack: 'AdminSDHolder Modification',
    category: 'persistence',
    eventIds: ['4780'],
    descriptions: ['4780: ACL 已在管理員群組成員帳戶上設定']
  },
  {
    attack: 'Golden Ticket',
    category: 'persistence',
    eventIds: ['4624', '4672'],
    descriptions: ['4624: 帳戶登入成功', '4672: 管理員登入（特殊權限）']
  },
  {
    attack: 'Silver Ticket',
    category: 'persistence',
    eventIds: ['4624', '4634', '4672'],
    descriptions: ['4624: 帳戶登入成功', '4634: 帳戶登出', '4672: 管理員登入']
  },
  {
    attack: 'Kerberoasting',
    category: 'credential-dumping',
    eventIds: ['4769'],
    descriptions: ['4769: Kerberos 服務票據已請求（加密類型 0x17 = RC4）']
  },
  {
    attack: 'AS-REP Roasting',
    category: 'credential-dumping',
    eventIds: ['4768'],
    descriptions: ['4768: Kerberos TGT 已請求（預先驗證失敗）']
  },
  {
    attack: 'DCSync',
    category: 'credential-dumping',
    eventIds: ['4662'],
    descriptions: ['4662: 已對物件執行作業（DS-Replication-Get-Changes）']
  },
  {
    attack: 'DCShadow',
    category: 'privilege-escalation',
    eventIds: ['4742', '5137', '5141', '4929'],
    descriptions: [
      '4742: 電腦帳戶已變更',
      '5137: 目錄服務物件已建立',
      '5141: 目錄服務物件已刪除',
      '4929: Active Directory 複本來源命名內容已移除'
    ]
  },
  {
    attack: 'Skeleton Key',
    category: 'persistence',
    eventIds: ['4673', '4611', '4688', '4689'],
    descriptions: [
      '4673: 已呼叫特殊權限服務',
      '4611: 信任的登入程序已向 LSA 登錄',
      '4688: 新程序已建立',
      '4689: 程序已結束'
    ]
  },
  {
    attack: 'Lateral Movement',
    category: 'lateral-movement',
    eventIds: ['4688', '4689', '4624', '4625'],
    descriptions: [
      '4688: 新程序已建立',
      '4689: 程序已結束',
      '4624: 帳戶登入成功',
      '4625: 帳戶登入失敗'
    ]
  },
  {
    attack: 'Password Spraying',
    category: 'lateral-movement',
    eventIds: ['4625', '4771', '4648'],
    descriptions: [
      '4625: 帳戶登入失敗（大量失敗警示）',
      '4771: Kerberos 預先驗證失敗',
      '4648: 使用明確憑證嘗試登入'
    ]
  },
  {
    attack: 'DNSAdmin DLL Load',
    category: 'privilege-escalation',
    eventIds: ['770', '541', '150'],
    descriptions: [
      '770: DNS 伺服器外掛程式 DLL 已載入',
      '541: 伺服器層級外掛程式 DLL 設定已變更',
      '150: DNS 伺服器無法載入或初始化外掛程式 DLL'
    ]
  },
  {
    attack: 'PowerShell Execution',
    category: 'defense-evasion',
    eventIds: ['4103', '4104', '400', '403', '600'],
    descriptions: [
      '4103: PowerShell 模組日誌',
      '4104: PowerShell ScriptBlock 日誌',
      '400: PowerShell 引擎生命週期',
      '403: PowerShell 引擎生命週期（已停止）',
      '600: PowerShell 提供者生命週期'
    ]
  },
  {
    attack: 'MS14-068 (PYKEK)',
    category: 'privilege-escalation',
    eventIds: ['4672', '4624', '4768'],
    descriptions: ['4672: 管理員登入', '4624: 帳戶登入', '4768: Kerberos TGT 請求']
  }
];

const TOOLS = [
  // Offensive Tools
  { name: 'BloodHound', type: 'offensive', url: 'https://github.com/BloodHoundAD/BloodHound', description: 'AD 攻擊路徑視覺化分析工具，使用圖論找出最短域管理員路徑', tags: ['AD', '圖論', '偵察', '路徑分析'] },
  { name: 'PowerView', type: 'offensive', url: 'https://github.com/PowerShellMafia/PowerSploit', description: 'PowerShell AD 情境感知框架，提供豐富的 AD 列舉函式', tags: ['PowerShell', 'AD', '偵察', '列舉'] },
  { name: 'Mimikatz', type: 'offensive', url: 'https://github.com/gentilkiwi/mimikatz', description: '從 Windows 記憶體提取明文密碼、NTLM 雜湊值及 Kerberos 票據', tags: ['憑證', 'Kerberos', 'NTLM', '記憶體'] },
  { name: 'Rubeus', type: 'offensive', url: 'https://github.com/GhostPack/Rubeus', description: 'C# Kerberos 互動與濫用工具集，支援 Kerberoast、AS-REP Roast、Pass-the-Ticket', tags: ['Kerberos', 'C#', '票據', '偵察'] },
  { name: 'Impacket', type: 'offensive', url: 'https://github.com/SecureAuthCorp/impacket', description: 'Python 網路協定類別庫，支援 SMB、Kerberos、LDAP 等協定互動', tags: ['Python', 'SMB', 'Kerberos', 'LDAP'] },
  { name: 'CrackMapExec', type: 'offensive', url: 'https://github.com/byt3bl33d3r/CrackMapExec', description: '網路滲透測試瑞士刀，支援 SMB、WinRM、LDAP 等協定大規模作業', tags: ['SMB', 'WinRM', '橫向移動', '自動化'] },
  { name: 'Certify', type: 'offensive', url: 'https://github.com/GhostPack/Certify', description: 'C# AD CS 列舉與濫用工具，用於尋找和利用憑證服務錯誤設定', tags: ['AD CS', 'C#', '憑證', '權限提升'] },
  { name: 'PowerUpSQL', type: 'offensive', url: 'https://github.com/NetSPI/PowerUpSQL', description: '攻擊 SQL Server 的 PowerShell 工具集，支援提權與資料挖掘', tags: ['SQL Server', 'PowerShell', '提權'] },
  { name: 'aclpwn.py', type: 'offensive', url: 'https://github.com/fox-it/aclpwn.py', description: '結合 BloodHound 自動化利用 AD ACL 錯誤設定', tags: ['ACL', 'BloodHound', '自動化', '提權'] },
  { name: 'ADACLScanner', type: 'offensive', url: 'https://github.com/canix1/ADACLScanner', description: '產生 AD DACL/SACL 報告的工具，支援 GUI 或命令列', tags: ['ACL', '稽核', '報告'] },
  { name: 'sam-the-admin', type: 'offensive', url: 'https://github.com/WazeHell/sam-the-admin', description: '利用 CVE-2021-42278 與 CVE-2021-42287 從標準使用者提升至域管理員', tags: ['CVE-2021-42278', 'CVE-2021-42287', '提權'] },
  { name: 'DomainPasswordSpray', type: 'offensive', url: 'https://github.com/mdavis332/DomainPasswordSpray', description: 'PowerShell 密碼噴灑工具，自動列舉使用者並控制鎖定風險', tags: ['密碼噴灑', 'PowerShell', 'AD'] },
  { name: 'MailSniper', type: 'offensive', url: 'https://github.com/dafthack/MailSniper', description: '在 Exchange 環境中搜尋敏感資訊的滲透測試工具', tags: ['Exchange', 'O365', '資料挖掘'] },
  { name: 'LAPSToolkit', type: 'offensive', url: 'https://github.com/leoloobeek/LAPSToolkit', description: 'LAPS 環境稽核與攻擊工具', tags: ['LAPS', 'PowerShell', '提權'] },
  { name: 'Grouper', type: 'offensive', url: 'https://github.com/l0ss/Grouper', description: 'PowerShell 工具，尋找 AD 群組原則中的脆弱設定', tags: ['GPO', 'PowerShell', '稽核'] },
  { name: 'SafetyKatz', type: 'offensive', url: 'https://github.com/GhostPack/SafetyKatz', description: 'Mimikatz 的改良版，使用 .NET PE 載入器執行，降低 AV 偵測率', tags: ['Mimikatz', 'C#', '規避', '憑證'] },
  { name: 'SharpDump', type: 'offensive', url: 'https://github.com/GhostPack/SharpDump', description: 'PowerSploit Out-Minidump 的 C# 版本，產生 LSASS 記憶體轉儲', tags: ['LSASS', 'C#', '憑證', '記憶體轉儲'] },
  { name: 'Powermad', type: 'offensive', url: 'https://github.com/Kevin-Robertson/Powermad', description: 'MachineAccountQuota 和 DNS 利用工具，用於 RBCD 攻擊', tags: ['MachineAccountQuota', 'DNS', 'RBCD', 'PowerShell'] },
  { name: 'ldapdomaindump', type: 'offensive', url: 'https://github.com/dirkjanm/ldapdomaindump', description: '透過 LDAP 轉儲 AD 資訊，輸出 JSON/HTML/CSV 格式', tags: ['LDAP', 'AD', '偵察', 'Python'] },
  // Defensive Tools
  { name: 'PingCastle', type: 'defensive', url: 'https://www.pingcastle.com/', description: '快速評估 AD 安全層級的工具，基於風險評估與成熟度框架產生評分報告', tags: ['稽核', '評估', '報告', '合規'] },
  { name: 'ADRecon', type: 'defensive', url: 'https://github.com/sense-of-security/ADRecon', description: '收集 AD 環境全面資訊並產生 Excel 報告，提供整體安全狀況視圖', tags: ['稽核', 'Excel', '報告', '偵察'] },
  { name: 'Locksmith', type: 'defensive', url: 'https://github.com/TrimarcJake/Locksmith', description: '尋找並修復 AD CS 常見錯誤設定的小型工具', tags: ['AD CS', '修復', '稽核', '合規'] },
  { name: 'FalconHound', type: 'defensive', url: 'https://github.com/FalconForceTeam/FalconHound', description: '藍隊多功能工具，結合 BloodHound 自動化分析，整合 SIEM', tags: ['BloodHound', '藍隊', 'SIEM', '自動化'] },
  { name: 'PlumHound', type: 'defensive', url: 'https://github.com/PlumHound/PlumHound', description: '藍隊/紫隊的 BloodHound 工具，自動化產生安全報告', tags: ['BloodHound', '藍隊', '紫隊', '報告'] },
  { name: 'Sigma', type: 'defensive', url: 'https://github.com/Neo23x0/sigma/', description: 'SIEM 系統通用簽章格式，可轉換為 Splunk/ELK 等平台規則', tags: ['SIEM', '偵測規則', '標準化', '日誌'] },
  { name: 'Sysmon', type: 'defensive', url: 'https://docs.microsoft.com/en-us/sysinternals/downloads/sysmon', description: 'Windows 系統監控服務，記錄詳細的程序、網路、檔案系統活動', tags: ['監控', '日誌', '事件', 'Microsoft'] },
  { name: 'WatchAD', type: 'defensive', url: 'https://github.com/0Kee-Team/WatchAD', description: 'AD 安全入侵偵測系統，即時監控 AD 攻擊行為', tags: ['IDS', '即時偵測', 'AD', '安全'] },
  { name: 'LogonTracer', type: 'defensive', url: 'https://github.com/JPCERTCC/LogonTracer', description: 'JPCERT 開發，視覺化分析 Windows 登入事件日誌，調查惡意登入', tags: ['登入分析', '視覺化', 'DFIR', '日誌'] },
  { name: 'DCSYNCMonitor', type: 'defensive', url: 'https://github.com/shellster/DCSYNCMonitor', description: '監控 DCSync 和 DCShadow 攻擊，產生自訂 Windows 事件', tags: ['DCSync', 'DCShadow', '監控', '事件'] },
  { name: 'Deploy-Deception', type: 'defensive', url: 'https://github.com/samratashok/Deploy-Deception', description: 'PowerShell 模組，在 AD 中部署誘餌物件（蜜罐）', tags: ['誘餌', 'HoneyToken', '偵測', 'PowerShell'] },
  { name: 'RiskySPN', type: 'defensive', url: 'https://github.com/cyberark/RiskySPN', description: '偵測和列舉與 SPN 關聯的高風險帳戶，評估 Kerberoast 風險', tags: ['SPN', 'Kerberoasting', '稽核', 'PowerShell'] },
  { name: 'ADTimeline', type: 'defensive', url: 'https://github.com/ANSSI-FR/ADTimeline', description: '基於 AD 複寫元資料產生時間軸，用於事件回應調查', tags: ['DFIR', '時間軸', 'AD', 'ANSSI'] },
  { name: 'SilkETW', type: 'defensive', url: 'https://github.com/fireeye/SilkETW', description: 'ETW（Event Tracing for Windows）的 C# 封裝，簡化 ETW 研究與監控', tags: ['ETW', 'C#', '監控', 'FireEye'] },
  // Azure Tools
  { name: 'ROADtools', type: 'azure', url: 'https://github.com/dirkjanm/ROADtools', description: 'Azure AD 互動框架，支援列舉、資料收集與攻擊', tags: ['Azure AD', 'Python', '列舉', '互動'] },
  { name: 'AADInternals', type: 'azure', url: 'https://github.com/Gerenios/AADInternals', description: 'Azure AD 與 Office 365 管理 PowerShell 模組，支援攻防兩用', tags: ['Azure AD', 'O365', 'PowerShell', '管理'] },
  { name: 'Stormspotter', type: 'azure', url: 'https://github.com/Azure/Stormspotter', description: '產生 Azure 訂閱資源攻擊圖，視覺化 Azure 安全狀況', tags: ['Azure', '攻擊圖', '視覺化', 'Microsoft'] },
  { name: 'MicroBurst', type: 'azure', url: 'https://github.com/NetSPI/MicroBurst', description: 'Azure 服務發現、弱點稽核與後滲透 PowerShell 工具集', tags: ['Azure', 'PowerShell', '稽核', '後滲透'] }
];

const DEFENSE_CHECKLIST = [
  {
    category: '管理員憑證保護',
    priority: 'critical',
    items: [
      {
        text: '部署 LAPS 管理本機管理員密碼',
        detail: '避免使用相同本機管理員密碼導致橫向移動',
        steps: [
          { type: 'cmd', text: '# 安裝 LAPS Schema 擴充（在 DC 以 Schema Admin 執行）\nImport-Module AdmPwd.PS\nUpdate-AdmPwdADSchema' },
          { type: 'cmd', text: '# 授予電腦帳戶自行回報密碼的權限\nSet-AdmPwdComputerSelfPermission -OrgUnit "OU=Workstations,DC=corp,DC=local"' },
          { type: 'cmd', text: '# 授予特定群組讀取 LAPS 密碼的權限\nSet-AdmPwdReadPasswordPermission -OrgUnit "OU=Workstations,DC=corp,DC=local" -AllowedPrincipals "CORP\\HelpDesk"' },
          { type: 'info', text: 'GPO 設定路徑：Computer Configuration → Administrative Templates → LAPS → Enable local admin password management → Enabled；Password Settings 設定長度 ≥ 15、複雜度開啟' },
          { type: 'cmd', text: '# 驗證部署結果\nGet-ADComputer -Filter * -Properties ms-Mcs-AdmPwdExpirationTime | Where-Object { $_."ms-Mcs-AdmPwdExpirationTime" -ne $null }' }
        ]
      },
      {
        text: '啟用 RDP Restricted Admin Mode',
        detail: '防止憑證暴露在遠端系統',
        steps: [
          { type: 'cmd', text: '# 在目標系統啟用 Restricted Admin Mode\nreg add "HKLM\\System\\CurrentControlSet\\Control\\Lsa" /v DisableRestrictedAdmin /t REG_DWORD /d 0 /f' },
          { type: 'info', text: '使用 Restricted Admin 連線：mstsc /v:目標主機 /RestrictedAdmin' },
          { type: 'info', text: 'GPO 強制啟用：Computer Configuration → Windows Settings → Security Settings → Local Policies → Security Options → "Require use of Restricted Admin Mode for Remote Desktop connections"' },
          { type: 'warn', text: '注意：Restricted Admin Mode 本身可能遭受 Pass-the-Hash 攻擊，應搭配 Protected Users 群組使用' }
        ]
      },
      {
        text: '確保所有管理員帳戶設定「敏感且不可委派」',
        detail: '防止 Kerberos 委派攻擊',
        steps: [
          { type: 'cmd', text: '# 批次設定 Domain Admins 成員為不可委派\nGet-ADGroupMember "Domain Admins" -Recursive | Where-Object { $_.objectClass -eq "user" } | Set-ADUser -AccountNotDelegated $true' },
          { type: 'cmd', text: '# 驗證設定結果\nGet-ADUser -Filter { AccountNotDelegated -ne $true } -SearchBase "OU=Admins,DC=corp,DC=local" | Select Name, AccountNotDelegated' },
          { type: 'info', text: 'GUI 設定：Active Directory Users and Computers → 帳戶屬性 → Account 頁籤 → 勾選 "Account is sensitive and cannot be delegated"' }
        ]
      },
      {
        text: '將管理員帳戶加入 Protected Users 群組',
        detail: '需要 Windows Server 2012 R2+ 功能等級',
        steps: [
          { type: 'cmd', text: '# 將管理員帳戶加入 Protected Users\nAdd-ADGroupMember -Identity "Protected Users" -Members "AdminUser1","AdminUser2"' },
          { type: 'info', text: 'Protected Users 效果：禁止 NTLM/RC4/DES 認證、TGT 存活時間縮短至 4 小時、無法使用 CredSSP / WDigest / Digest 認證' },
          { type: 'warn', text: '注意：加入後若服務帳戶依賴 NTLM 可能造成認證失敗，先在測試環境驗證' },
          { type: 'cmd', text: '# 確認網域功能等級 ≥ Windows Server 2012 R2\n(Get-ADDomain).DomainMode' }
        ]
      },
      {
        text: '停用所有非活躍管理員帳戶',
        detail: '定期審查並移除不需要的特權帳戶',
        steps: [
          { type: 'cmd', text: '# 列出 90 天未使用的特權帳戶\nSearch-ADAccount -AccountInactive -TimeSpan (New-TimeSpan -Days 90) -UsersOnly | Where-Object { (Get-ADUser $_ -Properties MemberOf).MemberOf -match "Admin" }' },
          { type: 'cmd', text: '# 停用指定帳戶\nDisable-ADAccount -Identity "stale_admin"\nMove-ADObject -Identity "CN=stale_admin,OU=Admins,DC=corp,DC=local" -TargetPath "OU=Disabled,DC=corp,DC=local"' },
          { type: 'info', text: '建議建立自動化排程任務，每月產生閒置特權帳戶報告並通知審查' }
        ]
      }
    ]
  },
  {
    category: 'Kerberos 與 AD 安全',
    priority: 'high',
    items: [
      {
        text: '每年至少一次重設 KRBTGT 帳戶密碼',
        detail: '防止 Golden Ticket 長期有效，需重設兩次（延遲 10 小時）',
        steps: [
          { type: 'info', text: '下載 Microsoft 官方腳本：New-KrbtgtKeys.ps1 (https://github.com/microsoft/New-KrbtgtKeys.ps1)' },
          { type: 'cmd', text: '# 第一次重設（在 PDC Emulator 上執行）\n.\\New-KrbtgtKeys.ps1 -OperationMode 1' },
          { type: 'warn', text: '等待 ≥ 10 小時（最大 Kerberos TGT 存活時間），確保所有 DC 完成複寫並讓現有 TGT 過期' },
          { type: 'cmd', text: '# 驗證 DC 複寫正常後執行第二次重設\nrepadmin /replsummary\n.\\New-KrbtgtKeys.ps1 -OperationMode 1' },
          { type: 'cmd', text: '# 驗證 KRBTGT 密碼已更新（確認 PasswordLastSet 時間）\nGet-ADUser krbtgt -Properties PasswordLastSet | Select PasswordLastSet' }
        ]
      },
      {
        text: '限制 AD 管理員成員（DA、EA、Schema Admins）',
        detail: '僅使用自訂委派群組，避免過度授權',
        steps: [
          { type: 'cmd', text: '# 檢查各高權限群組成員數\n@("Domain Admins","Enterprise Admins","Schema Admins") | ForEach-Object { "$_ : $((Get-ADGroupMember $_ -Recursive | Measure-Object).Count) 個成員" }' },
          { type: 'info', text: 'Domain Admins 建議成員數 ≤ 5；Enterprise Admins 平時應為空，需要時才臨時加入；Schema Admins 平時應為空' },
          { type: 'cmd', text: '# 移除不必要的成員\nRemove-ADGroupMember -Identity "Domain Admins" -Members "UserToRemove" -Confirm:$false' },
          { type: 'info', text: '建議建立自訂委派群組取代直接使用 DA，例如：Server-Admins（僅 Tier 1 登入）、Workstation-Admins（僅 Tier 2 登入）' }
        ]
      },
      {
        text: '實施三層（Tier）管理模式',
        detail: 'Tier 0: DC/AD, Tier 1: Server, Tier 2: Workstation',
        steps: [
          { type: 'info', text: 'Tier 0（最高敏感）：Domain Controllers、AD、PKI、ADFS。僅透過 Privileged Access Workstation (PAW) 管理，管理帳戶不可登入 Tier 1/2 系統' },
          { type: 'info', text: 'Tier 1（高敏感）：成員伺服器、應用伺服器。使用獨立 Tier 1 管理員帳戶，不可登入 Tier 0' },
          { type: 'info', text: 'Tier 2（一般）：Workstations、使用者裝置。使用獨立 Tier 2 管理員帳戶' },
          { type: 'cmd', text: '# GPO 限制 Tier 0 帳戶只能登入 DC（套用至 Domain Controllers OU）\n# Security Settings → Local Policies → User Rights Assignment:\n# "Allow log on locally" → 僅 Tier 0 管理員群組\n# "Deny log on locally" → Tier 1 / Tier 2 帳戶' },
          { type: 'cmd', text: '# 建立 Tier 0 帳戶登入限制（Authentication Policy）\nNew-ADAuthenticationPolicy -Name "Tier0-Policy" -UserAllowedToAuthenticateTo "O:SYG:SYD:(XA;OICI;CR;;;WD;(@USER.ad://ext/AuthenticationSilo == \\"Tier0Silo\\"))"' }
        ]
      },
      {
        text: '稽核 Kerberos 委派設定',
        detail: '識別並移除不必要的無限制委派',
        steps: [
          { type: 'cmd', text: '# 查詢所有使用者帳戶的無限制委派\nGet-ADUser -Filter { TrustedForDelegation -eq $true } -Properties TrustedForDelegation,ServicePrincipalName | Select Name,SamAccountName,ServicePrincipalName' },
          { type: 'cmd', text: '# 查詢所有電腦帳戶的無限制委派（DC 除外）\nGet-ADComputer -Filter { TrustedForDelegation -eq $true } -Properties TrustedForDelegation | Where-Object { $_.DistinguishedName -notmatch "OU=Domain Controllers" } | Select Name' },
          { type: 'cmd', text: '# 查詢受限制委派（Constrained Delegation）清單\nGet-ADObject -Filter { msDS-AllowedToDelegateTo -ne "$null" } -Properties msDS-AllowedToDelegateTo | Select Name,"msDS-AllowedToDelegateTo"' },
          { type: 'cmd', text: '# 移除不必要的無限制委派\nSet-ADUser -Identity "svc_account" -TrustedForDelegation $false' },
          { type: 'info', text: '建議使用 BloodHound 視覺化分析委派攻擊路徑，找出可從非特權帳戶到達 DC 的委派鏈' }
        ]
      },
      {
        text: '使用 Managed Service Accounts (gMSA) 取代服務帳戶',
        detail: '防止 Kerberoasting，密碼由系統自動管理',
        steps: [
          { type: 'cmd', text: '# 建立 Key Distribution Service Root Key（每個網域只需一次）\nAdd-KdsRootKey -EffectiveImmediately  # 生產環境建議改用 -EffectiveTime (Get-Date).AddHours(-10)' },
          { type: 'cmd', text: '# 建立 gMSA\nNew-ADServiceAccount -Name "svc-webapp" `\n  -DNSHostName "webapp.corp.local" `\n  -PrincipalsAllowedToRetrieveManagedPassword "WebServers"  # 可用電腦帳戶或群組' },
          { type: 'cmd', text: '# 在目標伺服器安裝並測試 gMSA\nInstall-ADServiceAccount -Identity "svc-webapp"\nTest-ADServiceAccount -Identity "svc-webapp"' },
          { type: 'info', text: '服務設定：services.msc → 服務屬性 → Log On → This account 填入 "CORP\\svc-webapp$"（注意尾端 $），密碼欄留空' },
          { type: 'cmd', text: '# 確認舊服務帳戶的 SPN，重新指向 gMSA\nGet-ADUser "old_svc" -Properties ServicePrincipalName | Select ServicePrincipalName' }
        ]
      }
    ]
  },
  {
    category: '網路與系統安全',
    priority: 'high',
    items: [
      {
        text: '封鎖 DC 的網際網路存取',
        detail: 'DC 只應存取內部系統',
        steps: [
          { type: 'cmd', text: '# Windows Firewall GPO（套用至 Domain Controllers OU）\n# Computer Configuration → Windows Settings → Security Settings → Windows Firewall\n# Outbound Rules → New Rule → Block TCP 80, 443 for All Programs' },
          { type: 'info', text: '建議在網路層（防火牆/路由器）封鎖 DC IP 段（通常 /24）的所有 Outbound 連線，僅允許：DNS(53)、LDAP(389/636)、Kerberos(88)、AD Replication(135,49152-65535) 到指定目標' },
          { type: 'cmd', text: '# 測試 DC 是否無法存取外部\nInvoke-Command -ComputerName DC01 { Test-NetConnection -ComputerName "8.8.8.8" -Port 80 }' }
        ]
      },
      {
        text: '停用 SMBv1',
        detail: '防止 EternalBlue (CVE-2017-0143) 等攻擊',
        steps: [
          { type: 'cmd', text: '# 檢查目前 SMBv1 狀態\nGet-SmbServerConfiguration | Select EnableSMB1Protocol\nGet-WindowsOptionalFeature -Online -FeatureName SMB1Protocol' },
          { type: 'cmd', text: '# 停用 SMBv1（伺服器端）\nSet-SmbServerConfiguration -EnableSMB1Protocol $false -Force\n\n# 停用 SMBv1（客戶端）\nSet-SmbClientConfiguration -EnableSMB1Protocol $false -Force' },
          { type: 'cmd', text: '# 完全移除 SMBv1 功能\nDisable-WindowsOptionalFeature -Online -FeatureName SMB1Protocol -NoRestart' },
          { type: 'info', text: 'GPO 強制停用：Computer Configuration → Administrative Templates → Network → Lanman Server → Enable insecure guest logons → Disabled' }
        ]
      },
      {
        text: '停用 LLMNR 和 NetBIOS-NS',
        detail: '防止 Responder 毒化攻擊',
        steps: [
          { type: 'info', text: 'GPO 停用 LLMNR：Computer Configuration → Administrative Templates → Network → DNS Client → "Turn off multicast name resolution" → Enabled' },
          { type: 'cmd', text: '# PowerShell 批次停用 NetBIOS over TCP/IP（所有 NIC）\nGet-WmiObject Win32_NetworkAdapterConfiguration | Where-Object { $_.IPEnabled } | ForEach-Object { $_.SetTcpipNetbios(2) }' },
          { type: 'info', text: 'DHCP 停用 NetBIOS：在 DHCP 伺服器設定 Scope Options → 043 Vendor Specific Info，或各 NIC 屬性 → TCP/IP 進階設定 → WINS → Disable NetBIOS over TCP/IP' },
          { type: 'cmd', text: '# 驗證：用 Responder 或 tcpdump 監聽是否還有 LLMNR/NBT-NS 廣播\n# (需在測試環境執行) Get-NetFirewallRule | Where-Object { $_.DisplayName -match "LLMNR" }' }
        ]
      },
      {
        text: '移除不再需要的 Domain Trust',
        detail: '並為保留的信任啟用 SID Filtering',
        steps: [
          { type: 'cmd', text: '# 列出所有網域信任關係\nGet-ADTrust -Filter * | Select Name,Direction,TrustType,SIDFilteringQuarantined,SIDFilteringForestAware | Format-Table -AutoSize' },
          { type: 'cmd', text: '# 移除不再需要的信任\nRemove-ADTrust -Identity "CN=old-partner.com,CN=System,DC=corp,DC=local" -Confirm:$false' },
          { type: 'cmd', text: '# 為保留的外部信任啟用 SID Filtering\nnetdom trust corp.local /domain:partner.com /quarantine:yes\n\n# 驗證\nGet-ADTrust -Identity "partner.com" | Select SIDFilteringQuarantined' },
          { type: 'warn', text: '注意：SID Filtering 可能影響跨網域群組成員的存取，啟用前需充分測試' }
        ]
      },
      {
        text: '設定所有認證為 NTLMv2 only（拒絕 LM/NTLM）',
        detail: '防止降級攻擊',
        steps: [
          { type: 'info', text: 'GPO 路徑：Computer Configuration → Windows Settings → Security Settings → Local Policies → Security Options' },
          { type: 'info', text: '"Network security: LAN Manager authentication level" → 選擇 "Send NTLMv2 response only. Refuse LM & NTLM"（值為 5）' },
          { type: 'cmd', text: '# 登錄直接設定（值 5 = NTLMv2 only, Refuse LM & NTLM）\nreg add "HKLM\\SYSTEM\\CurrentControlSet\\Control\\Lsa" /v LmCompatibilityLevel /t REG_DWORD /d 5 /f' },
          { type: 'cmd', text: '# 同時停用 LM Hash 儲存\nreg add "HKLM\\SYSTEM\\CurrentControlSet\\Control\\Lsa" /v NoLMHash /t REG_DWORD /d 1 /f' },
          { type: 'warn', text: '注意：先確認環境中無 Windows XP / Server 2003 等舊系統仍需要 NTLM/LM 認證，否則會中斷服務' }
        ]
      }
    ]
  },
  {
    category: '日誌與監控',
    priority: 'high',
    items: [
      {
        text: '啟用增強型稽核策略',
        detail: '啟用成功/失敗的認證、帳戶管理、目錄服務存取等',
        steps: [
          { type: 'cmd', text: '# 檢查目前稽核設定\nauditpol /get /category:*' },
          { type: 'info', text: 'GPO 路徑：Computer Configuration → Windows Settings → Security Settings → Advanced Audit Policy Configuration → Audit Policies' },
          { type: 'info', text: '建議啟用（Success & Failure）：Account Logon / Account Management / DS Access (Directory Service Changes) / Logon/Logoff / Object Access / Policy Change / Privilege Use / System' },
          { type: 'cmd', text: '# 批次啟用關鍵稽核策略\nauditpol /set /subcategory:"Logon" /success:enable /failure:enable\nauditpol /set /subcategory:"Account Lockout" /success:enable /failure:enable\nauditpol /set /subcategory:"Kerberos Service Ticket Operations" /success:enable /failure:enable\nauditpol /set /subcategory:"Directory Service Changes" /success:enable /failure:enable' }
        ]
      },
      {
        text: '啟用 PowerShell 模組與 ScriptBlock 日誌',
        detail: '並集中轉發至 SIEM',
        steps: [
          { type: 'info', text: 'GPO 路徑：Computer Configuration → Administrative Templates → Windows Components → Windows PowerShell' },
          { type: 'info', text: '啟用以下三項：(1) Turn on Module Logging → Enabled，Module Names 填 * (2) Turn on PowerShell Script Block Logging → Enabled (3) Turn on Script Execution → Enabled' },
          { type: 'cmd', text: '# 登錄方式啟用 ScriptBlock Logging\nreg add "HKLM\\SOFTWARE\\Policies\\Microsoft\\Windows\\PowerShell\\ScriptBlockLogging" /v EnableScriptBlockLogging /t REG_DWORD /d 1 /f\nreg add "HKLM\\SOFTWARE\\Policies\\Microsoft\\Windows\\PowerShell\\ModuleLogging" /v EnableModuleLogging /t REG_DWORD /d 1 /f' },
          { type: 'info', text: 'PowerShell 日誌儲存於：Event Log → Applications and Services Logs → Microsoft → Windows → PowerShell → Operational (Event ID 4103/4104)' }
        ]
      },
      {
        text: '部署並設定 Sysmon',
        detail: '使用 sysmon-modular 等成熟設定範本',
        steps: [
          { type: 'info', text: '下載 Sysmon：https://docs.microsoft.com/sysinternals/downloads/sysmon；建議使用 SwiftOnSecurity sysmon-config 或 sysmon-modular 作為設定基礎' },
          { type: 'cmd', text: '# 初次安裝（使用自訂設定檔）\nsysmon64.exe -accepteula -i sysmonconfig.xml' },
          { type: 'cmd', text: '# 更新設定檔（不中斷服務）\nsysmon64.exe -c sysmonconfig.xml' },
          { type: 'cmd', text: '# 驗證 Sysmon 運行狀態\nGet-Service Sysmon64\n# 確認日誌位置：Event Viewer → Applications and Services Logs → Microsoft → Windows → Sysmon → Operational' },
          { type: 'info', text: 'Sysmon 關鍵事件：Event ID 1 (Process Create), 3 (Network Connect), 7 (Image Load), 8 (CreateRemoteThread), 10 (ProcessAccess), 11 (FileCreate), 25 (ProcessTampering)' }
        ]
      },
      {
        text: '建立 SIEM 偵測規則（Sigma）',
        detail: '針對 DCSync、Kerberoasting、Pass-the-Hash 等攻擊建立警示',
        steps: [
          { type: 'cmd', text: '# 安裝 Sigma 工具\npip install sigmatools\n# 或使用新版 sigma-cli\npip install sigma-cli' },
          { type: 'cmd', text: '# 下載 Sigma 規則庫\ngit clone https://github.com/SigmaHQ/sigma' },
          { type: 'cmd', text: '# 轉換為 Splunk 格式（以 DCSync 為例）\nsigma convert -t splunk -p splunk_windows rules/windows/builtin/security/win_security_dcsync.yml\n\n# 轉換為 Elastic/KQL 格式\nsigma convert -t lucene rules/windows/builtin/security/win_security_kerberoasting.yml' },
          { type: 'info', text: '優先部署規則：DCSync (4662), Kerberoasting (4769 RC4), AS-REP Roasting (4768), Password Spraying (4625 大量失敗), Golden/Silver Ticket (4672 不尋常的特殊權限)' }
        ]
      },
      {
        text: '啟用命令列程序記錄',
        detail: 'KB3004375，記錄所有程序命令列參數',
        steps: [
          { type: 'info', text: 'GPO 路徑：Computer Configuration → Administrative Templates → System → Audit Process Creation → "Include command line in process creation events" → Enabled' },
          { type: 'cmd', text: '# 登錄方式啟用\nreg add "HKLM\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Policies\\System\\Audit" /v ProcessCreationIncludeCmdLine_Enabled /t REG_DWORD /d 1 /f' },
          { type: 'info', text: '配合 Event ID 4688 (Process Creation) 使用；需同時啟用「稽核程序建立」(Audit Process Creation)' },
          { type: 'warn', text: '注意：命令列可能包含敏感資訊（密碼），確保日誌儲存環境已加密且存取受控' }
        ]
      }
    ]
  },
  {
    category: 'AD CS 憑證服務',
    priority: 'high',
    items: [
      {
        text: '使用 Certify 或 Locksmith 稽核 AD CS 設定',
        detail: '尋找 ESC1-ESC8 等錯誤設定',
        steps: [
          { type: 'cmd', text: '# 使用 Certify 掃描脆弱憑證範本（需網域使用者權限）\nCertify.exe find /vulnerable\nCertify.exe find /enrolleeSuppliesSubject  # ESC1 特定掃描' },
          { type: 'cmd', text: '# 使用 Locksmith 自動稽核並提供修復建議\nImport-Module .\\Locksmith.psd1\nInvoke-Locksmith -Mode 0  # 模式 0 = 僅報告問題，不修復' },
          { type: 'info', text: '常見錯誤設定：ESC1 (範本允許 enrollee 自訂 SAN), ESC2 (Any Purpose EKU), ESC3 (Enrollment Agent), ESC4 (範本 ACL 可寫), ESC6 (EDITF_ATTRIBUTESUBJECTALTNAME2 旗標), ESC8 (HTTP NTLM 中繼)' },
          { type: 'cmd', text: '# 使用 PSPKIAudit 稽核 CA 設定\nInstall-Module -Name PSPKI\nImport-Module PSPKI\nGet-CertificationAuthority | Get-CATemplate' }
        ]
      },
      {
        text: '停用 NTLM 認證至 IIS/AD CS',
        detail: '防止 PetitPotam NTLM 中繼攻擊',
        steps: [
          { type: 'info', text: 'IIS Manager 設定：開啟 IIS → 選取 CertSrv 虛擬目錄 → Authentication → Windows Authentication → Providers → 移除 NTLM，只保留 Negotiate (Kerberos)' },
          { type: 'cmd', text: '# 透過 appcmd 設定（IIS 8+）\n%windir%\\system32\\inetsrv\\appcmd.exe set config "Default Web Site/CertSrv" /section:windowsAuthentication /-providers.[value=\'NTLM\']' },
          { type: 'info', text: '啟用 Extended Protection for Authentication (EPA)：IIS → Windows Authentication → Advanced Settings → Extended Protection → Required' },
          { type: 'info', text: '若環境使用 Web Enrollment，建議將 AD CS Web 介面設定為要求 HTTPS 並停用 HTTP' }
        ]
      },
      {
        text: '移除不必要的憑證範本',
        detail: '特別是允許 SAN 指定或 EKU 允許智慧卡登入的範本',
        steps: [
          { type: 'cmd', text: '# 列出 CA 上發布的所有範本\ncertutil -catemplates\n# 或使用 PowerShell\nGet-CATemplate | Select Name,DisplayName | Sort Name' },
          { type: 'info', text: 'CA 管理主控台：certsrv.msc → Certificate Templates → 右鍵刪除不必要的範本；重點移除：WebServer（若不用）、User（預設允許 SAN）、DomainController（若不用 smartcard）' },
          { type: 'cmd', text: '# 停用特定危險範本的發布\nGet-CATemplate | Where-Object { $_.Name -eq "WebServer" } | Remove-CATemplate -Force' },
          { type: 'warn', text: '注意：移除範本前確認無任何系統依賴它；可先設定範本為「停用」而非直接刪除' }
        ]
      },
      {
        text: '啟用 AD CS HTTP 端點的 EPA（Extended Protection for Authentication）',
        detail: '防止 NTLM 中繼',
        steps: [
          { type: 'info', text: 'IIS Manager → Default Web Site → CertSrv → Windows Authentication → Advanced Settings → Extended Protection → Required（最強，需測試相容性）或 Accept（過渡期使用）' },
          { type: 'cmd', text: '# 驗證 EPA 設定\nGet-WebConfigurationProperty -Filter "//security/authentication/windowsAuthentication" -PSPath "IIS:\\Sites\\Default Web Site\\CertSrv" -Name extendedProtection' },
          { type: 'info', text: '同時確保 CA Web Enrollment 和 Certificate Enrollment Web Service (CES) 端點也已設定 EPA' },
          { type: 'info', text: '套用 KB5005413 修補（CVE-2021-36942 PetitPotam），並考慮以 Windows Defender Credential Guard 保護 DC' }
        ]
      }
    ]
  },
  {
    category: '重要安全更新',
    priority: 'critical',
    items: [
      {
        text: '套用 Zerologon 補丁 (CVE-2020-1472)',
        detail: 'KB4571694 及後續更新，並完全執行強制模式',
        steps: [
          { type: 'info', text: '安裝 KB4571694（2020-08 更新）後，Netlogon 進入「部署模式」（允許不合規客戶端連線但記錄警告）' },
          { type: 'info', text: '2021-02 後的更新已進入「強制模式」，所有不合規的 Netlogon 連線將被拒絕' },
          { type: 'cmd', text: '# 檢查 DC 是否安裝補丁\nGet-HotFix -Id KB4571694\n# 確認強制模式已生效\nreg query "HKLM\\SYSTEM\\CurrentControlSet\\Services\\Netlogon\\Parameters" /v FullSecureChannelProtection' },
          { type: 'cmd', text: '# 查看是否有不合規客戶端日誌（Event ID 5829/5827）\nGet-WinEvent -LogName "System" | Where-Object { $_.Id -in 5829,5827 } | Select TimeCreated,Message | Format-List' },
          { type: 'warn', text: '若有 Event ID 5829 日誌，表示仍有使用舊 Netlogon 的裝置，需先更新這些裝置再啟用強制模式' }
        ]
      },
      {
        text: '套用 PetitPotam 緩解措施 (CVE-2021-36942)',
        detail: 'KB5005413，並停用 EFSRPC 介面（如不需要）',
        steps: [
          { type: 'cmd', text: '# 確認 KB5005413 已安裝\nGet-HotFix -Id KB5005413' },
          { type: 'info', text: '若 EFS 在環境中未使用，可透過防火牆封鎖 DC 上的 MS-EFSRPC 介面（TCP Port 445 的 EFSRPC）；或使用 Windows RPC 篩選' },
          { type: 'cmd', text: '# 使用 netsh 封鎖 EFSRPC（需 Windows Server 2019+）\nnetsh rpc filter add rule layer=um actiontype=block\nnetsh rpc filter add condition field=if_uuid matchtype=equal data=c681d488-d850-11d0-8c52-00c04fd90f7e\nnetsh rpc filter add filter' },
          { type: 'info', text: '同時停用 IIS/AD CS 的 NTLM 認證（搭配 EPA），防止 NTLM 中繼到 AD CS 的攻擊鏈' }
        ]
      },
      {
        text: '套用 sAMAccountName 漏洞補丁 (CVE-2021-42278/42287)',
        detail: 'KB5008102、KB5008380',
        steps: [
          { type: 'cmd', text: '# 確認補丁已安裝\nGet-HotFix -Id KB5008102  # CVE-2021-42278\nGet-HotFix -Id KB5008380  # CVE-2021-42287' },
          { type: 'cmd', text: '# 確認 MachineAccountQuota 已降低（防止一般使用者建立電腦帳戶）\nGet-ADDomain | Select -Expand DistinguishedName | Get-ADObject -Properties ms-DS-MachineAccountQuota\n# 建議改為 0\nSet-ADDomain -Identity corp.local -Replace @{"ms-DS-MachineAccountQuota"=0}' },
          { type: 'cmd', text: '# 啟用「强制 DC 驗證電腦帳戶名稱」（需 2021-11 後的更新）\n# 以下補丁安裝後進入部署模式，2022-04 後強制啟用\nreg query "HKLM\\SYSTEM\\CurrentControlSet\\Services\\Kdc" /v SamAccountNameSuffix' }
        ]
      },
      {
        text: '確認 MS14-068 補丁已安裝',
        detail: 'KB3011780，防止 Kerberos PAC 偽造',
        steps: [
          { type: 'cmd', text: '# 確認 KB3011780 已安裝\nGet-HotFix -Id KB3011780\n\n# 若系統已更新至 2014-11 之後的累積更新，此修補已包含在內\n(Get-HotFix | Sort InstalledOn -Descending | Select -First 1).InstalledOn' },
          { type: 'info', text: 'MS14-068 修補 Kerberos KDC 未驗證 PAC Checksum 的漏洞；任何 Windows Server 2012 R2 + 2014-11 之後的更新均已包含此修補' },
          { type: 'cmd', text: '# 確認 DC 的 OS 版本與補丁狀態\nGet-ADDomainController -Filter * | Select Name,OperatingSystem,OperatingSystemVersion | Format-Table' }
        ]
      }
    ]
  }
];
