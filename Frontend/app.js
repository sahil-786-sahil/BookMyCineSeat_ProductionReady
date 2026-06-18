/* ═══════════════════════════════════════════════════════════
   BookMyCineSeat — app.js  (v2 — rich data + fixed auth)
   Backend: https://bookmycineseat-productionready.onrender.com
═══════════════════════════════════════════════════════════ */
'use strict';

const API = 'https://bookmycineseat-***********-2-1.onrender.com';

/* ════════════════════════════════════════════
   50 REAL-FEEL MOVIES  (local catalogue)
════════════════════════════════════════════ */
const LOCAL_MOVIES = [
  { id:1,  title:'Dune: Part Two',          genre:'Sci-Fi',    language:'English', duration:166, posterUrl:'posters/dune-part-two.jpg', rating:8.5, description:'Paul Atreides unites with Chani and the Fremen while on a warpath of revenge against the conspirators who destroyed his family.',  emoji:'🏜️' },
  { id:2,  title:'Oppenheimer',              genre:'Drama',     language:'English', duration:180, posterUrl:'posters/oppenheimer.jpg', rating:8.9, description:'The story of American scientist J. Robert Oppenheimer and his role in the development of the atomic bomb.', emoji:'☢️' },
  { id:3,  title:'Kalki 2898 AD',            genre:'Action',    language:'Hindi',   duration:181, posterUrl:'posters/kalki-2898-ad.jpg', rating:7.8, description:'Set in the future, the mythological avatar Kalki arrives on Earth to rid it of its ultimate evil.',         emoji:'🤖' },
  { id:4,  title:'Stree 2',                  genre:'Horror',    language:'Hindi',   duration:143, posterUrl:'posters/stree-2.jpg', rating:8.2, description:'Chanderi is once again haunted — but this time the terror has a new face and old grudges.',               emoji:'👻' },
  { id:5,  title:'Animal',                   genre:'Action',    language:'Hindi',   duration:201, posterUrl:'posters/animal.jpg', rating:7.2, description:'A son idolises his father, but the revelation of dark secrets transforms his devotion into obsession.',    emoji:'🐾' },
  { id:6,  title:'12th Fail',                genre:'Drama',     language:'Hindi',   duration:147, posterUrl:'posters/12th-fail.jpg', rating:9.0, description:'Based on the true story of IPS officer Manoj Kumar Sharma who cleared UPSC despite failing his 12th boards.', emoji:'📚' },
  { id:7,  title:'Pushpa 2: The Rule',       genre:'Action',    language:'Telugu',  duration:200, posterUrl:'posters/pushpa-2-the-rule.jpg', rating:8.0, description:'Pushpa Raj expands his red sandalwood smuggling empire while confronting a dangerous new rival.',         emoji:'🔥' },
  { id:8,  title:'RRR',                      genre:'Action',    language:'Telugu',  duration:182, posterUrl:'posters/rrr.jpg', rating:7.9, description:'Two legendary revolutionaries and their journey away from home before they started fighting for their country.', emoji:'⚡' },
  { id:9,  title:'Jawan',                    genre:'Thriller',  language:'Hindi',   duration:169, posterUrl:'posters/jawan.jpg', rating:7.0, description:'A man is driven by a personal vendetta to rectify the wrongs in society through a series of daring heists.', emoji:'🎭' },
  { id:10, title:'Pathaan',                  genre:'Action',    language:'Hindi',   duration:146, posterUrl:'posters/pathaan.jpg', rating:6.9, description:'An exiled spy must return to save India from a rogue operative hell-bent on revenge.',                   emoji:'🕵️' },
  { id:11, title:'The Batman',               genre:'Action',    language:'English', duration:176, posterUrl:'posters/the-batman.jpg', rating:7.8, description:'In his second year of crime-fighting, Batman uncovers corruption in Gotham City that connects to his own family.', emoji:'🦇' },
  { id:12, title:'Top Gun: Maverick',        genre:'Action',    language:'English', duration:130, posterUrl:'posters/top-gun-maverick.jpg', rating:8.2, description:'After more than thirty years of service, Pete "Maverick" Mitchell is back, pushing the limits as a test pilot.', emoji:'✈️' },
  { id:13, title:'Avatar: The Way of Water', genre:'Sci-Fi',    language:'English', duration:192, posterUrl:'posters/avatar-the-way-of-water.jpg', rating:7.6, description:'Jake Sully and Ney\'tiri have formed a family and are living in peace until conflict disrupts their life.', emoji:'💙' },
  { id:14, title:'Spider-Man: No Way Home',  genre:'Action',    language:'English', duration:148, posterUrl:'posters/spider-man-no-way-home.jpg', rating:8.2, description:'With Spider-Man\'s identity now revealed, Peter asks Doctor Strange for help, unleashing a multiverse crisis.', emoji:'🕷️' },
  { id:15, title:'Interstellar',             genre:'Sci-Fi',    language:'English', duration:169, posterUrl:'posters/interstellar.jpg', rating:8.7, description:'A team of explorers travel through a wormhole in space in an attempt to ensure humanity\'s survival.', emoji:'🌌' },
  { id:16, title:'Leo',                      genre:'Thriller',  language:'Tamil',   duration:164, posterUrl:'posters/leo.jpg', rating:7.1, description:'A mild-mannered coffee shop owner is forced to confront his dangerous past when a drug lord threatens his family.', emoji:'🦁' },
  { id:17, title:'Jailer',                   genre:'Action',    language:'Tamil',   duration:168, posterUrl:'posters/jailer.jpg', rating:7.5, description:'A retired jailer embarks on a brutal rescue mission to save his son from a notorious criminal.',           emoji:'⚓' },
  { id:18, title:'Salaar',                   genre:'Action',    language:'Telugu',  duration:175, posterUrl:'posters/salaar.jpg', rating:6.8, description:'A violent man who promised a friend he would protect his son must keep that vow at any cost.',             emoji:'💀' },
  { id:19, title:'Fighter',                  genre:'Action',    language:'Hindi',   duration:166, posterUrl:'posters/fighter.jpg', rating:6.5, description:'The first aerial action franchise of India follows elite IAF officers on a dangerous cross-border mission.', emoji:'🚀' },
  { id:20, title:'Crew',                     genre:'Comedy',    language:'Hindi',   duration:124, posterUrl:'posters/crew.jpg', rating:6.8, description:'Three flight attendants get entangled in a shady deal when they discover their airline is going bankrupt.', emoji:'✈️' },
  { id:21, title:'Munjya',                   genre:'Horror',    language:'Hindi',   duration:123, posterUrl:'posters/munjya.jpg', rating:7.2, description:'A young boy accidentally releases a supernatural creature that has been locked away for decades.',          emoji:'😱' },
  { id:22, title:'Kill',                     genre:'Thriller',  language:'Hindi',   duration:105, posterUrl:'posters/kill.jpg', rating:7.4, description:'An elite commando sets out to rescue his love from kidnappers — on a speeding train.',                  emoji:'🚂' },
  { id:23, title:'Maharaj',                  genre:'Drama',     language:'Hindi',   duration:131, posterUrl:'posters/maharaj.jpg', rating:7.0, description:'Based on a 19th-century landmark legal case that shook the foundations of religious power in India.',      emoji:'⚖️' },
  { id:24, title:'Raayan',                   genre:'Action',    language:'Tamil',   duration:145, posterUrl:'posters/raayan.jpg', rating:7.6, description:'A gang leader\'s attempt to free himself from violence is shattered when tragedy strikes his family.',    emoji:'🌊' },
  { id:25, title:'Indian 2',                 genre:'Action',    language:'Tamil',   duration:180, posterUrl:'posters/indian-2.jpg', rating:5.9, description:'Senapathy returns to clean up corruption — but discovers the enemy is far closer this time.',            emoji:'🇮🇳' },
  { id:26, title:'Deadpool & Wolverine',     genre:'Action',    language:'English', duration:128, posterUrl:'posters/deadpool-and-wolverine.jpg', rating:7.8, description:'Deadpool is recruited by the TVA and unwillingly partners with Wolverine to save the multiverse.',       emoji:'🔴' },
  { id:27, title:'Inside Out 2',             genre:'Animation', language:'English', duration:96, posterUrl:'posters/inside-out-2.jpg', rating:7.9, description:'Riley faces new challenges as she enters teenage years — and new emotions arrive to take over Headquarters.', emoji:'🎨' },
  { id:28, title:'Twisters',                 genre:'Action',    language:'English', duration:122, posterUrl:'posters/twisters.jpg', rating:7.0, description:'A storm chaser haunted by a past tragedy returns to the field and must face even more violent storms.',   emoji:'🌪️' },
  { id:29, title:'Alien: Romulus',           genre:'Sci-Fi',    language:'English', duration:119, posterUrl:'posters/alien-romulus.jpg', rating:7.3, description:'A group of young space colonisers face the most terrifying life form in the universe.',                  emoji:'👾' },
  { id:30, title:'Despicable Me 4',          genre:'Animation', language:'English', duration:94, posterUrl:'posters/despicable-me-4.jpg',  rating:6.4, description:'Gru and his family are forced to go undercover when a new villain threatens their perfect life.',        emoji:'💛' },
  { id:31, title:'Devara: Part 1',           genre:'Action',    language:'Telugu',  duration:177, posterUrl:'posters/devara-part-1.jpg', rating:7.3, description:'A fearless man of the sea uses fear as a weapon — but his son must now fill impossible shoes.',         emoji:'⚓' },
  { id:32, title:'Singham Again',            genre:'Action',    language:'Hindi',   duration:144, posterUrl:'posters/singham-again.jpg', rating:6.7, description:'Bajirao Singham returns to rescue his wife in a crossover of Rohit Shetty\'s cop universe.',            emoji:'👮' },
  { id:33, title:'Bhool Bhulaiyaa 3',        genre:'Horror',    language:'Hindi',   duration:158, posterUrl:'posters/bhool-bhulaiyaa-3.jpg', rating:7.0, description:'Rooh Baba faces a terrifying supernatural rival who may be the real Manjulika.',                        emoji:'🪔' },
  { id:34, title:'The Wild Robot',           genre:'Animation', language:'English', duration:102, posterUrl:'posters/the-wild-robot.jpg', rating:8.3, description:'A robot washed ashore on a wild island must learn to adapt and raises a gosling.',                     emoji:'🤖' },
  { id:35, title:'Joker: Folie à Deux',      genre:'Drama',     language:'English', duration:138, posterUrl:'posters/joker-folie-a-deux.jpg', rating:5.5, description:'Arthur Fleck awaits trial and finds love while imprisoned at Arkham State Hospital.',                  emoji:'🃏' },
  { id:36, title:'Vettaiyan',                genre:'Action',    language:'Tamil',   duration:163, posterUrl:'posters/vettaiyan.jpg', rating:7.2, description:'A seasoned cop from a different era faces a modern criminal justice dilemma.',                          emoji:'🔫' },
  { id:37, title:'Amaran',                   genre:'Drama',     language:'Tamil',   duration:169, posterUrl:'posters/amaran.jpg', rating:8.6, description:'The inspiring true story of Major Mukund Varadarajan, one of India\'s bravest soldiers.',              emoji:'🎖️' },
  { id:38, title:'Lucky Baskhar',            genre:'Thriller',  language:'Telugu',  duration:150, posterUrl:'posters/lucky-baskhar.jpg', rating:8.0, description:'A seemingly ordinary bank employee hides a brilliant criminal mind when his family is threatened.',      emoji:'💰' },
  { id:39, title:'Venom: The Last Dance',    genre:'Action',    language:'English', duration:109, posterUrl:'posters/venom-the-last-dance.jpg', rating:6.0, description:'Eddie Brock and Venom are on the run, pursued by both government agencies and an ancient symbiote god.', emoji:'🕸️' },
  { id:40, title:'Moana 2',                  genre:'Animation', language:'English', duration:100, posterUrl:'posters/moana-2.jpg', rating:7.1, description:'Moana embarks on a new, far-flung voyage with her crew across the seas of Oceania.',                  emoji:'🌊' },
  { id:41, title:'Pushpa: The Rise',         genre:'Action',    language:'Telugu',  duration:179, posterUrl:'posters/pushpa-the-rise.jpg', rating:7.6, description:'A laborer rises through the ranks of a red sandalwood smuggling syndicate.',                          emoji:'🌹' },
  { id:42, title:'KGF: Chapter 2',           genre:'Action',    language:'Kannada', duration:168, posterUrl:'posters/kgf-chapter-2.jpg', rating:8.2, description:'Rocky takes control of the Kolar Gold Fields and faces the wrath of both government and rivals.',      emoji:'🪙' },
  { id:43, title:'Doctor Strange MOM',       genre:'Action',    language:'English', duration:126, posterUrl:'posters/doctor-strange-mom.jpg', rating:6.9, description:'Doctor Strange uses the Darkhold to travel the multiverse to protect America Chavez.',                emoji:'🌀' },
  { id:44, title:'Baahubali 2',              genre:'Action',    language:'Telugu',  duration:167, posterUrl:'posters/baahubali-2.jpg', rating:8.2, description:'The conclusion reveals the mystery of why Kattappa killed Baahubali.',                                emoji:'👑' },
  { id:45, title:'Tanhaji',                  genre:'Action',    language:'Hindi',   duration:135, posterUrl:'posters/tanhaji.jpg', rating:7.6, description:'The untold story of the Maratha warrior Tanhaji Malusare and the battle of Kondhana fort.',            emoji:'⚔️' },
  { id:46, title:'Padmaavat',                genre:'Drama',     language:'Hindi',   duration:164, posterUrl:'posters/padmaavat.jpg', rating:7.0, description:'The story of Rajput queen Padmavati whose honour is coveted by Sultan Alauddin Khilji.',             emoji:'💎' },
  { id:47, title:'Kantara',                  genre:'Thriller',  language:'Kannada', duration:148, posterUrl:'posters/kantara.jpg', rating:8.5, description:'A peon of the forest department clashes with a tribe\'s tradition and the supernatural forces protecting it.', emoji:'🌿' },
  { id:48, title:'HanuMan',                  genre:'Action',    language:'Telugu',  duration:158, posterUrl:'posters/hanuman.jpg', rating:7.5, description:'A small-time thief in Anjanadri gains superpowers from a divine armlet and becomes a hero.',           emoji:'🐒' },
  { id:49, title:'Varisu',                   genre:'Drama',     language:'Tamil',   duration:169, posterUrl:'posters/varisu.jpg', rating:6.2, description:'A carefree son must step up to save his father\'s business empire from a powerful rival.',             emoji:'🏛️' },
  { id:50, title:'Dunki',                    genre:'Drama',     language:'Hindi',   duration:161, posterUrl:'posters/dunki.jpg', rating:6.8, description:'Friends embark on a perilous illegal immigration journey to reach their dream country.',               emoji:'🌍' },
  { id:51, title:'Sam Bahadur',              genre:'Drama',     language:'Hindi',   duration:149, posterUrl:'posters/sam-bahadur.jpg', rating:7.8, description:'The biopic of Field Marshal Sam Manekshaw, India\'s most celebrated war hero.',                      emoji:'🎖️' },
  { id:52, title:'Merry Christmas',          genre:'Thriller',  language:'Hindi',   duration:144, posterUrl:'posters/merry-christmas.jpg', rating:7.0, description:'A chance meeting on Christmas Eve draws two strangers into a web of murder and deception.',           emoji:'🎄' },
  { id:53, title:'Shaitaan',                 genre:'Horror',    language:'Hindi',   duration:132, posterUrl:'posters/shaitaan.jpg', rating:7.2, description:'A family vacation turns into a nightmare when a stranger with dark powers enters their lives.',        emoji:'😈' },
  { id:54, title:'Yodha',                    genre:'Action',    language:'Hindi',   duration:131, posterUrl:'posters/yodha.jpg', rating:6.0, description:'An army officer must single-handedly stop a plane hijacking at 30,000 feet.',                        emoji:'🛩️' },
  { id:55, title:'Bade Miyan Chote Miyan',   genre:'Action',    language:'Hindi',   duration:164, posterUrl:'posters/bade-miyan-chote-miyan.jpg', rating:4.8, description:'Two rogue soldiers with different approaches team up to stop a catastrophic terrorist plot.',         emoji:'💣' },
];

/* ════════════════════════════════════════════
   50 SHOWS  (7 venues × time slots)
════════════════════════════════════════════ */
const VENUES = [
  { name:'PVR IMAX Juhu', city:'Mumbai',    screen:'IMAX Screen 1' },
  { name:'INOX Infinity',  city:'Mumbai',    screen:'Screen 4' },
  { name:'Cinepolis MDK',  city:'Delhi',     screen:'Screen 2' },
  { name:'PVR Select City',city:'Delhi',     screen:'Dolby Atmos 3' },
  { name:'INOX GVK One',   city:'Hyderabad', screen:'Screen 5' },
  { name:'SPI Sathyam',    city:'Chennai',   screen:'Screen 7' },
  { name:'PVR Forum Mall', city:'Bangalore', screen:'4DX Screen 1' },
];
const TIMES   = ['10:00 AM','12:30 PM','3:00 PM','6:15 PM','9:30 PM','11:55 PM'];
const DATES   = ['Jun 11, 2026','Jun 12, 2026','Jun 13, 2026','Jun 14, 2026','Jun 15, 2026'];
const FORMATS = ['2D','3D','IMAX 3D','4DX','Dolby Atmos','2D'];

function generateShows() {
  const shows = [];
  let id = 1;
  // Spread 50 shows across the 55 movies
  const movieIds = LOCAL_MOVIES.map(m=>m.id);
  for (let i = 0; i < 50; i++) {
    const mid  = movieIds[i % movieIds.length];
    const movie= LOCAL_MOVIES.find(m=>m.id===mid);
    const venue= VENUES[i % VENUES.length];
    const time = TIMES[i % TIMES.length];
    const date = DATES[Math.floor(i/10) % DATES.length];
    const fmt  = FORMATS[i % FORMATS.length];
    const avail= [12,25,38,50,67,80,0,120,9,42][i%10];
    shows.push({
      id, movieId:mid, movieTitle:movie.title,
      showDate:date, showTime:time,
      theaterName:venue.name, city:venue.city, screen:venue.screen,
      format:fmt, availableSeats:avail,
      priceRegular: fmt.includes('IMAX')||fmt==='4DX' ? 450 : fmt.includes('Dolby')||fmt==='3D' ? 320 : 220,
      pricePremium: fmt.includes('IMAX')||fmt==='4DX' ? 650 : fmt.includes('Dolby')||fmt==='3D' ? 450 : 380,
    });
    id++;
  }
  return shows;
}
const LOCAL_SHOWS = generateShows();

/* ════════════════════════════════════════════
   STATE
════════════════════════════════════════════ */
const state = {
  user:  JSON.parse(localStorage.getItem('bms_user')  || 'null'),
  token: localStorage.getItem('bms_token') || null,
  movies: [...LOCAL_MOVIES],
  filteredMovies: [...LOCAL_MOVIES],
  currentMovieId: null,
  selectedSeats: [],
  bookings: JSON.parse(localStorage.getItem('bms_bookings') || '[]'),
  activeGenre: '',
  paymentMethod: 'UPI',
};

const SEAT_CONFIG = {
  rows:['A','B','C','D','E','F','G','H'],
  cols:10,
  premiumRows:['A','B'],
  convenienceFee:35,
};

/* ════════════════════════════════════════════
   UTILS
════════════════════════════════════════════ */
function toast(msg, type='info', dur=3400) {
  const el = document.getElementById('toast');
  if (!el) return;
  el.textContent = msg;
  el.className = `toast show ${type}`;
  clearTimeout(el._t);
  el._t = setTimeout(() => el.classList.remove('show'), dur);
}

function showPage(id) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  const target = document.getElementById(`page-${id}`);
  if (target) { target.classList.add('active'); window.scrollTo({ top:0, behavior:'smooth' }); }
  updateNav(id);
  if (id === 'movies')      loadMoviesPage();
  if (id === 'shows')       loadShowsPage();
  if (id === 'home')        loadHomeMovies();
  if (id === 'my-bookings') renderMyBookings();
}

function updateNav(activePage) {
  document.querySelectorAll('.nav-link').forEach(l =>
    l.classList.toggle('active', l.dataset.page === activePage)
  );
  renderNavActions();
}

function renderNavActions() {
  const area = document.getElementById('navActions');
  if (!area) return;
  if (state.user && state.token) {
    // Prefer proper name; fall back to the part before @ in the email
    const fullName = state.user.name ||
                     (state.user.email ? state.user.email.split('@')[0] : 'User');
    const email    = state.user.email || '';
    // Build initials: up to 2 letters from the name words
    const initials = fullName.split(/\s+/)
                             .filter(Boolean)
                             .map(w => w[0])
                             .join('')
                             .toUpperCase()
                             .slice(0, 2);
    // Capitalise first letter of each word for display
    const displayName = fullName.split(/\s+/)
                                .map(w => w.charAt(0).toUpperCase() + w.slice(1))
                                .join(' ');
    area.innerHTML = `
      <div class="nav-user" onclick="showPage('my-bookings')" title="View My Bookings">
        <div class="user-avatar">${initials}</div>
        <div class="nav-user-info">
          <span class="nav-user-name">${esc(displayName)}</span>
          ${email ? `<span class="nav-user-email">${esc(email)}</span>` : ''}
        </div>
      </div>
      <button class="btn btn-ghost" onclick="handleLogout()">Sign out</button>`;
  } else {
    area.innerHTML = `
      <button class="btn btn-ghost" onclick="showPage('login')">Sign in</button>
      <button class="btn btn-primary" onclick="showPage('register')">Register</button>`;
  }
}


function requireAuth(cb) {
  if (!state.token) { toast('Please sign in first', 'error'); showPage('login'); return; }
  cb();
}

/* ── apiFetch with smart error parsing ── */
async function apiFetch(path, opts={}) {
  const headers = { 'Content-Type':'application/json', ...(opts.headers||{}) };
  if (state.token) headers['Authorization'] = state.token;
  const res = await fetch(`${API}${path}`, { ...opts, headers });
  if (!res.ok) {
    let msg = `Error ${res.status}`;
    try {
      const body = await res.text();
      const j = JSON.parse(body);
      msg = j.message || j.error || j.errorMessage || body || msg;
    } catch {}
    const e = new Error(msg);
    e.status = res.status;
    throw e;
  }
  const ct = res.headers.get('content-type') || '';
  if (ct.includes('application/json')) return res.json();
  // plain text (e.g. "Bearer xxx")
  return res.text().then(t => t || null);
}

/* ════════════════════════════════════════════
   KNOWN EMAILS — local registry of emails that
   have successfully registered/logged in on this
   device. Used to tell "wrong password" apart
   from "no such account" when the backend itself
   returns a generic 401 for both cases.
════════════════════════════════════════════ */
function getKnownEmails() {
  try { return JSON.parse(localStorage.getItem('bms_known_emails') || '[]'); }
  catch { return []; }
}
function isEmailKnown(email) {
  return getKnownEmails().includes(String(email).trim().toLowerCase());
}
function rememberEmail(email) {
  const norm = String(email).trim().toLowerCase();
  const list = getKnownEmails();
  if (!list.includes(norm)) {
    list.push(norm);
    localStorage.setItem('bms_known_emails', JSON.stringify(list));
  }
}
/* Show "Already registered? Sign in here" hint under the register form */
function showSignInHint() {
  document.getElementById('reg-already-exists-hint')?.remove();
  const form = document.querySelector('#page-register form');
  if (!form) return;
  const hint = document.createElement('p');
  hint.id = 'reg-already-exists-hint';
  hint.style.cssText = 'text-align:center;margin-top:14px;font-size:13.5px;color:var(--muted)';
  hint.innerHTML = `Already registered? <a href="#" style="color:var(--crimson);font-weight:600" onclick="showPage('login');return false;">Sign in here →</a>`;
  form.appendChild(hint);
}

/* ════════════════════════════════════════════
   AUTH  —  fixed loop, smart error messages
════════════════════════════════════════════ */
/* ── Trigger browser native Save Password dialog using PasswordCredential API ── */
async function tryOfferPasswordSave(email, password) {
  if (window.PasswordCredential) {
    try {
      const cred = new PasswordCredential({ id: email, password, name: email });
      await navigator.credentials.store(cred);
    } catch (credErr) {
      // Browser declined or doesn't support — silently ignore
    }
  }
}

async function handleLogin(e) {
  e.preventDefault();
  const btn      = document.getElementById('loginBtn');
  const email    = document.getElementById('loginEmail').value.trim();
  const password = document.getElementById('loginPassword').value;

  if (!email || !password) { toast('Please fill all fields', 'error'); return; }

  btn.disabled = true;
  btn.innerHTML = '<span class="spinner" style="width:16px;height:16px;display:inline-block;border-width:2px;margin-right:6px"></span>Signing in…';

  try {
    const raw = await apiFetch('/api/users/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });

    // Backend returns the plain token string — read it cleanly
    const token = (typeof raw === 'string') ? raw.trim() : (raw?.token || raw?.accessToken || '');
    if (!token) throw new Error('No token received — please try again.');

    const formattedToken = token.startsWith('Bearer ') ? token : `Bearer ${token}`;

    // Store session — use name from raw if available, otherwise derive from email
    const userName = raw?.name || raw?.fullName || email.split('@')[0];
    state.token = formattedToken;
    state.user  = { email, name: userName };
    localStorage.setItem('bms_token', formattedToken);
    localStorage.setItem('bms_user', JSON.stringify({ email, name: userName }));

    // Login worked, so this email is confirmed to belong to a real account
    rememberEmail(email);

    // Offer browser Save Password dialog
    await tryOfferPasswordSave(email, password);

    // Show success splash then go home
    showLoginSuccess(userName, email);

  } catch (err) {
    const lower = (err.message || '').toLowerCase();
    const isNetworkError = err.status === undefined &&
      (lower.includes('fetch') || lower.includes('network') || lower.includes('load failed'));

    let friendly;
    if (isNetworkError) {
      friendly = 'Network error — check your connection.';
    } else if (isEmailKnown(email)) {
      // We've seen this email register/login successfully before on this
      // device, so any failure here means the password itself was wrong —
      // regardless of what status code / message the backend sent back.
      friendly = 'Wrong password. Please try again.';
    } else {
      friendly = 'User does not exist with this email, please register.';
    }
    toast(friendly, 'error', 4500);
    btn.disabled = false;
    btn.textContent = 'Sign In';
  }
}

function showLoginSuccess(name, email) {
  const card = document.querySelector('#page-login .auth-card');
  const displayName = name || email;
  if (!card) { finishLogin(name); return; }
  card.innerHTML = `
    <div style="text-align:center;padding:20px 0">
      <div style="font-size:56px;margin-bottom:16px">🎬</div>
      <div style="font-family:var(--font-display);font-size:26px;font-weight:800;letter-spacing:-1px;margin-bottom:8px">Welcome back, ${esc(displayName.split(' ')[0])}!</div>
      <div style="color:var(--muted);font-size:14px;margin-bottom:28px">${esc(email)}</div>
      <div class="spinner" style="margin:0 auto 16px;width:28px;height:28px"></div>
      <div style="font-size:13px;color:var(--muted)">Taking you home…</div>
    </div>`;
  renderNavActions();
  setTimeout(() => { finishLogin(name); }, 1400);
}

function finishLogin(name) {
  const greet = name ? name.split(' ')[0] : (state.user?.email || 'there');
  toast(`Welcome, ${greet}! 🎬`, 'success');
  showPage('home');
  // Restore login form for next time
  const loginPage = document.getElementById('page-login');
  if (loginPage) {
    const authCard = loginPage.querySelector('.auth-card');
    if (authCard && LOGIN_FORM_HTML) authCard.innerHTML = LOGIN_FORM_HTML;
  }
}

async function handleRegister(e) {
  e.preventDefault();
  const btn         = document.getElementById('registerBtn');
  const name        = document.getElementById('regName').value.trim();
  const email       = document.getElementById('regEmail').value.trim();
  const phoneNumber = document.getElementById('regPhone').value.trim();
  const password    = document.getElementById('regPassword').value;

  if (!name || !email || !phoneNumber || !password)
    { toast('Please fill all fields', 'error'); return; }
  if (password.length < 8)
    { toast('Password must be at least 8 characters', 'error'); return; }

  // Don't even hit the API if this email already registered on this device
  if (isEmailKnown(email)) {
    toast('An account with this email already exists. Please sign in instead.', 'error', 5000);
    showSignInHint();
    return;
  }

  btn.disabled = true;
  btn.innerHTML = '<span class="spinner" style="width:16px;height:16px;display:inline-block;border-width:2px;margin-right:6px"></span>Creating account…';

  try {
    // Step 1: Register the user
    await apiFetch('/api/users/register', {
      method: 'POST',
      body: JSON.stringify({ name, email, phoneNumber, password }),
    });

    // Registration succeeded — remember this email so future login/register
    // attempts can give precise "wrong password" / "already exists" messages
    rememberEmail(email);

    // Step 2: Show success briefly then auto-login
    const card = document.querySelector('#page-register .auth-card');
    if (card) {
      card.innerHTML = `
        <div style="text-align:center;padding:20px 0">
          <div style="font-size:56px;margin-bottom:16px">🎉</div>
          <div style="font-family:var(--font-display);font-size:26px;font-weight:800;letter-spacing:-1px;margin-bottom:8px">You're in, ${esc(name.split(' ')[0])}!</div>
          <div style="color:var(--muted);font-size:14px;margin-bottom:28px">Account created for <strong style="color:var(--ice)">${esc(email)}</strong></div>
          <div class="spinner" style="margin:0 auto 16px;width:28px;height:28px"></div>
          <div style="font-size:13px;color:var(--muted)">Signing you in automatically…</div>
        </div>`;
    }

    // Step 3: Auto-login immediately after successful registration
    const raw = await apiFetch('/api/users/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });

    const token = (typeof raw === 'string') ? raw.trim() : (raw?.token || raw?.accessToken || '');
    if (!token) throw new Error('Account created! Please sign in manually.');

    const formattedToken = token.startsWith('Bearer ') ? token : `Bearer ${token}`;
    state.token = formattedToken;
    state.user  = { email, name };
    localStorage.setItem('bms_token', formattedToken);
    localStorage.setItem('bms_user', JSON.stringify({ email, name }));

    // Step 4: Trigger browser Save Password dialog
    await tryOfferPasswordSave(email, password);

    // Step 5: Update nav immediately then go home
    renderNavActions();
    setTimeout(() => {
      toast(`Welcome to BookMyCineSeat, ${name.split(' ')[0]}! 🎬`, 'success', 4000);
      showPage('home');
      // Restore register form for next time
      const regPage = document.getElementById('page-register');
      if (regPage && REGISTER_FORM_HTML) {
        const authCard = regPage.querySelector('.auth-card');
        if (authCard) authCard.innerHTML = REGISTER_FORM_HTML;
      }
    }, 1200);

  } catch (err) {
    // If it's a post-login failure (account was created but login failed)
    if (state.token) {
      toast('Account created! Redirecting…', 'success');
      showPage('home');
      return;
    }

    const lower = (err.message || '').toLowerCase();
    const isNetworkError = err.status === undefined &&
      (lower.includes('fetch') || lower.includes('network') || lower.includes('load failed'));
    const isPhoneError = lower.includes('phone');

    let friendly;
    if (isNetworkError) {
      friendly = 'Network error — check your connection.';
    } else if (isPhoneError) {
      friendly = 'Invalid phone number format.';
    } else {
      // The only realistic reason registration fails here (network and
      // phone-format issues already handled above) is that the email is
      // already registered — regardless of what status code / message text
      // the backend actually sent back.
      friendly = 'An account with this email already exists. Please sign in instead.';
      rememberEmail(email);
    }

    toast(friendly, 'error', 5000);

    // If already exists → offer to login
    if (friendly.includes('already exists')) {
      setTimeout(showSignInHint, 300);
    }

    btn.disabled = false;
    btn.textContent = 'Create Account';
  }
}

function handleLogout() {
  state.token = null; state.user = null;
  localStorage.removeItem('bms_token');
  localStorage.removeItem('bms_user');
  toast('Signed out — see you next time 👋', 'info');
  renderNavActions();
  showPage('home');
}

/* Save original form HTML to restore after success states */
let LOGIN_FORM_HTML = '';
let REGISTER_FORM_HTML = '';

/* ════════════════════════════════════════════
   MOVIES
════════════════════════════════════════════ */
async function loadHomeMovies() {
  const grid = document.getElementById('homeMoviesGrid');
  if (!grid) return;

  // Merge API movies with local, dedupe by title
  let movies = [...LOCAL_MOVIES];
  try {
    const apiMovies = await apiFetch('/api/movies');
    if (Array.isArray(apiMovies) && apiMovies.length) {
      const localTitles = new Set(LOCAL_MOVIES.map(m=>m.title.toLowerCase()));
      const extras = apiMovies.filter(m => !localTitles.has((m.title||'').toLowerCase()));
      movies = [...extras, ...LOCAL_MOVIES];
    }
  } catch {}
  state.movies = movies;
  state.filteredMovies = [...movies];

  const featured = shuffle([...movies]).slice(0, 8);
  grid.innerHTML = featured.map(m => movieCardHTML(m)).join('');
}

async function loadMoviesPage() {
  const grid = document.getElementById('allMoviesGrid');
  if (!grid) return;
  if (!state.movies.length) await loadHomeMovies();
  buildGenreChips(state.movies);
  renderMoviesGrid(state.movies);
}

function renderMoviesGrid(movies) {
  const grid = document.getElementById('allMoviesGrid');
  if (!grid) return;
  grid.innerHTML = movies.length
    ? movies.map(m => movieCardHTML(m)).join('')
    : `<div class="empty-state" style="grid-column:1/-1"><div class="empty-state-icon">🎞️</div><h3>No movies found</h3><p>Try a different search or genre.</p></div>`;
}

function movieCardHTML(m) {
  const genre = m.genre || m.movieGenre || '';
  const lang  = m.language || '';
  const dur   = m.duration ? `${m.duration} min` : '';
  const em    = m.emoji || genreEmoji(genre);
  const ratingBadge = m.rating ? `<div class="movie-rating-badge">⭐ ${m.rating}</div>` : '';
  return `
  <div class="movie-card" onclick="loadMovieDetail(${m.id})">
    <div class="movie-poster">
      ${m.posterUrl
        ? `<img class="movie-poster-img" src="${m.posterUrl}" alt="${esc(m.title)}" loading="lazy">`
        : `<span class="movie-poster-placeholder" style="font-size:60px">${em}</span>`}
      ${genre ? `<div class="movie-genre-badge">${esc(genre)}</div>` : ''}
      ${ratingBadge}
      <div class="movie-overlay"><div class="movie-overlay-btn">Book Now →</div></div>
    </div>
    <div class="movie-info">
      <div class="movie-title">${esc(m.title)}</div>
      <div class="movie-meta">
        ${lang ? `<span>${esc(lang)}</span>` : ''}
        ${dur  ? `<span>${esc(dur)}</span>`  : ''}
      </div>
    </div>
  </div>`;
}

function buildGenreChips(movies) {
  const tabs = document.getElementById('genreTabs');
  if (!tabs) return;
  const genres = [...new Set(movies.map(m=>m.genre||m.movieGenre).filter(Boolean))].sort();
  tabs.innerHTML =
    `<button class="filter-chip active" onclick="filterByGenre('',this)">All (${movies.length})</button>` +
    genres.map(g => {
      const count = movies.filter(m=>(m.genre||m.movieGenre)===g).length;
      return `<button class="filter-chip" onclick="filterByGenre('${esc(g)}',this)">${esc(g)} (${count})</button>`;
    }).join('');
}

function filterByGenre(genre, btn) {
  state.activeGenre = genre;
  document.querySelectorAll('.filter-chip').forEach(b=>b.classList.remove('active'));
  if (btn) btn.classList.add('active');
  applyMovieFilters();
}

function filterMovies() { applyMovieFilters(); }

function applyMovieFilters() {
  const q = (document.getElementById('movieSearch')?.value || '').toLowerCase();
  const filtered = state.movies.filter(m => {
    const matchQ = !q || (m.title||'').toLowerCase().includes(q) || (m.genre||m.movieGenre||'').toLowerCase().includes(q) || (m.language||'').toLowerCase().includes(q);
    const matchG = !state.activeGenre || (m.genre||m.movieGenre||'') === state.activeGenre;
    return matchQ && matchG;
  });
  state.filteredMovies = filtered;
  renderMoviesGrid(filtered);
}

/* ════════════════════════════════════════════
   MOVIE DETAIL
════════════════════════════════════════════ */
async function loadMovieDetail(id) {
  state.currentMovieId = id;
  showPage('movie-detail');
  const cont = document.getElementById('movieDetailContent');
  cont.innerHTML = `<div class="spinner-wrap"><div class="spinner"></div><p>Loading…</p></div>`;

  // Try API first, fall back to local
  let movie = LOCAL_MOVIES.find(m=>m.id===id);
  try {
    const apiMovie = await apiFetch(`/api/movies/${id}`);
    if (apiMovie?.title) movie = { ...movie, ...apiMovie };
  } catch {}
  if (!movie) { cont.innerHTML = `<div class="empty-state"><div class="empty-state-icon">🎞️</div><h3>Movie not found</h3></div>`; return; }

  // Get shows for this movie
  const shows = LOCAL_SHOWS.filter(s => s.movieId === id);
  // Also try API shows
  try {
    const apiShows = await apiFetch('/api/shows');
    if (Array.isArray(apiShows)) {
      const apiFiltered = apiShows.filter(s => s.movieId===id || s.movie?.id===id);
      if (apiFiltered.length) shows.unshift(...apiFiltered);
    }
  } catch {}

  cont.innerHTML = movieDetailHTML(movie, shows);
}

function movieDetailHTML(m, shows) {
  const em = m.emoji || genreEmoji(m.genre||'');
  const showsHTML = shows.length
    ? shows.map(s => showCardHTML(s, m)).join('')
    : `<div class="show-empty"><div class="show-empty-icon">📅</div><p>No shows scheduled yet — check back soon.</p></div>`;
  return `
  <div class="detail-hero">
    <div class="detail-backdrop"></div>
    <div class="detail-inner">
      <button class="back-btn" onclick="showPage('movies')">← All Movies</button>
    </div>
    <div class="detail-inner" style="padding-top:0">
      <div class="detail-poster">${m.posterUrl ? `<img style="width:100%;height:100%;object-fit:cover" src="${m.posterUrl}" alt="${esc(m.title)}">` : em}</div>
      <div class="detail-info">
        <div class="detail-title">${esc(m.title)}</div>
        <div class="detail-tags">
          ${m.genre       ? `<span class="detail-tag">${esc(m.genre)}</span>` : ''}
          ${m.language    ? `<span class="detail-tag">${esc(m.language)}</span>` : ''}
          ${m.duration    ? `<span class="detail-tag">${m.duration} min</span>` : ''}
          ${m.rating      ? `<span class="detail-rating">⭐ ${m.rating}/10</span>` : ''}
        </div>
        ${m.description ? `<p class="detail-desc">${esc(m.description)}</p>` : ''}
        <div style="display:flex;gap:12px;flex-wrap:wrap">
          <button class="btn btn-primary btn-lg" onclick="scrollToShows()">View Shows →</button>
          <button class="btn btn-outline btn-lg" onclick="scrollToShows()">🎟️ Book Tickets</button>
        </div>
      </div>
    </div>
  </div>
  <div class="detail-body" id="showsSection">
    <div class="shows-title">Available Shows (${shows.length})</div>
    <div class="shows-list">${showsHTML}</div>
  </div>`;
}

function showCardHTML(show, movie) {
  const time  = show.showTime||show.time||'';
  const date  = show.showDate||show.date||'';
  const venue = show.theaterName||show.venue||'Cinema Hall';
  const city  = show.city ? ` · ${show.city}` : '';
  const fmt   = show.format ? ` · ${show.format}` : '';
  const avail = show.availableSeats ?? 80;
  const seatsClass = avail===0?'show-seats-none': avail<20?'show-seats-low':'show-seats-avail';
  const seatsLabel = avail===0?'Housefull': avail<20?`⚠️ Only ${avail} left`:`✓ ${avail} seats available`;
  const priceR = show.priceRegular || 220;
  const priceP = show.pricePremium || 380;
  return `
  <div class="show-card">
    <div class="show-time-group">
      <div class="show-time">${esc(time)}</div>
      <div class="show-date">${esc(date)}</div>
    </div>
    <div class="show-venue">🏛 <strong>${esc(venue)}</strong><span style="color:var(--dim)">${esc(city)}${esc(fmt)}</span></div>
    <div class="show-format-price" style="font-size:12px;color:var(--muted)">₹${priceR} · Premium ₹${priceP}</div>
    <div class="${seatsClass}">${seatsLabel}</div>
    ${avail!==0
      ? `<button class="btn btn-primary" onclick="openSeatSelect(${show.id},'${esc(movie?.title||'')}','${esc(time)}','${esc(date)}','${esc(venue)}',${priceR},${priceP})">Select Seats</button>`
      : `<button class="btn btn-ghost" disabled>Housefull</button>`}
  </div>`;
}

function scrollToShows() {
  document.getElementById('showsSection')?.scrollIntoView({ behavior:'smooth', block:'start' });
}

/* ════════════════════════════════════════════
   SHOWS PAGE
════════════════════════════════════════════ */
async function loadShowsPage() {
  const list = document.getElementById('allShowsList');
  if (!list) return;
  list.innerHTML = `<div class="spinner-wrap"><div class="spinner"></div><p>Loading…</p></div>`;

  let shows = [...LOCAL_SHOWS];
  try {
    const api = await apiFetch('/api/shows');
    if (Array.isArray(api) && api.length) {
      const apiIds = new Set(api.map(s=>s.id));
      shows = [...api, ...LOCAL_SHOWS.filter(s=>!apiIds.has(s.id))];
    }
  } catch {}

  if (!shows.length) {
    list.innerHTML = `<div class="empty-state"><div class="empty-state-icon">📭</div><h3>No shows yet</h3></div>`;
    return;
  }

  // Group by movie
  const byMovie = {};
  shows.forEach(s => {
    const mid = s.movieId || s.movie?.id;
    const title = s.movieTitle || s.movie?.title || `Movie #${mid}`;
    if (!byMovie[mid]) byMovie[mid] = { title, id:mid, shows:[] };
    byMovie[mid].shows.push(s);
  });

  list.innerHTML = Object.values(byMovie).map(g => `
    <div style="margin-bottom:44px">
      <h2 style="font-family:var(--font-display);font-size:22px;font-weight:800;letter-spacing:-0.8px;margin-bottom:16px;cursor:pointer;transition:color 0.2s" onmouseenter="this.style.color='var(--crimson)'" onmouseleave="this.style.color=''" onclick="loadMovieDetail(${g.id})">${esc(g.title)} <span style="font-size:14px;color:var(--muted);font-family:var(--font-body);font-weight:400">(${g.shows.length} shows)</span></h2>
      <div class="shows-list">${g.shows.map(s => showCardHTML(s, {title:g.title})).join('')}</div>
    </div>`).join('');
}

/* ════════════════════════════════════════════
   SEAT SELECTION
════════════════════════════════════════════ */
function openSeatSelect(showId, movieTitle, time, date, venue, priceR=220, priceP=380) {
  requireAuth(() => {
    state.currentShowId = showId;
    state.selectedSeats = [];
    state._seatPriceR = priceR;
    state._seatPriceP = priceP;
    showPage('seat-select');
    renderSeatSelect({ showId, movieTitle, time, date, venue, priceR, priceP });
  });
}

async function renderSeatSelect({ showId, movieTitle, time, date, venue, priceR, priceP }) {
  const cont = document.getElementById('seatSelectionContent');

  let bookedSeats = [];
  // Simulate some booked seats locally based on showId for realism
  const seed = showId * 17;
  const { rows, cols } = SEAT_CONFIG;
  rows.forEach(r => {
    for (let c=1; c<=cols; c++) {
      if (((seed + r.charCodeAt(0) + c) % 5) === 0) bookedSeats.push(`${r}${c}`);
    }
  });

  function seatsHTML() {
    return rows.map(row => {
      const isPremium = SEAT_CONFIG.premiumRows.includes(row);
      const price = isPremium ? priceP : priceR;
      let cells = Array.from({length:cols}, (_,i) => {
        const col = i+1;
        const sid = `${row}${col}`;
        const booked = bookedSeats.includes(sid);
        const cls = `seat ${booked?'booked':'available'} ${isPremium?'premium':''}`;
        return `<div class="${cls}" id="seat-${sid}" data-seat="${sid}" data-price="${price}" ${booked?'':` onclick="toggleSeat('${sid}',${price})"`}>${sid}</div>`;
      });
      cells.splice(5,0,`<div class="seat-gap"></div>`);
      return `<div class="seat-row"><span class="seat-row-label">${row}</span>${cells.join('')}</div>`;
    }).join('');
  }

  cont.innerHTML = `
    <button class="back-btn" onclick="goBackFromSeats()">← Back</button>
    <div class="seat-hd">
      <div class="seat-page-title">${esc(movieTitle)}</div>
      <div class="seat-page-sub">${esc(date)} · ${esc(time)} · ${esc(venue)}</div>
    </div>
    <div class="seats-layout">
      <div>
        <div class="screen-wrap"><div class="screen"></div><div class="screen-label">Screen — All eyes this way</div></div>
        <div style="text-align:center;margin-bottom:16px;font-size:12px;color:var(--muted)">
          🎟️ Premium (Rows A–B): <strong style="color:var(--amber)">₹${priceP}</strong> &nbsp;·&nbsp; Regular: <strong style="color:var(--ice)">₹${priceR}</strong>
        </div>
        <div class="seat-legend">
          <div class="legend-item"><div class="legend-box available"></div> Available</div>
          <div class="legend-item"><div class="legend-box selected"></div> Selected</div>
          <div class="legend-item"><div class="legend-box booked"></div> Booked</div>
          <div class="legend-item"><div class="legend-box premium"></div> Premium</div>
        </div>
        <div class="seats-container">${seatsHTML()}</div>
      </div>
      <div>
        <div class="booking-panel" id="bookingPanel">
          <div class="panel-title">🛒 Your Order</div>
          <div id="summaryLines"><p style="color:var(--muted);font-size:13px;text-align:center;padding:20px 0">Tap seats to select them</p></div>
          <div class="payment-opts" id="paymentOpts">
            ${['UPI','Card','Wallet','NetBanking'].map(p =>
              `<div class="pay-opt ${state.paymentMethod===p?'active':''}" onclick="selectPayment('${p}')">${p}</div>`
            ).join('')}
          </div>
          <button class="btn btn-primary btn-full" id="confirmBookingBtn" onclick="confirmBooking(${showId},'${esc(movieTitle)}','${esc(time)}','${esc(date)}','${esc(venue)}')" disabled>
            Select seats to book
          </button>
          <p style="font-size:11px;color:var(--dim);text-align:center;margin-top:10px">₹${SEAT_CONFIG.convenienceFee} convenience fee included</p>
        </div>
      </div>
    </div>`;
}

function toggleSeat(seatId, price) {
  const el = document.getElementById(`seat-${seatId}`);
  if (!el) return;
  const idx = state.selectedSeats.findIndex(s=>s.id===seatId);
  if (idx > -1) {
    state.selectedSeats.splice(idx,1);
    el.classList.remove('selected'); el.classList.add('available');
  } else {
    if (state.selectedSeats.length >= 8) { toast('Max 8 seats per booking', 'error'); return; }
    state.selectedSeats.push({ id:seatId, price:Number(price) });
    el.classList.remove('available'); el.classList.add('selected');
  }
  updateSummary();
}

function updateSummary() {
  const lines = document.getElementById('summaryLines');
  const btn   = document.getElementById('confirmBookingBtn');
  if (!lines||!btn) return;
  if (!state.selectedSeats.length) {
    lines.innerHTML = `<p style="color:var(--muted);font-size:13px;text-align:center;padding:20px 0">Tap seats to select them</p>`;
    btn.disabled = true; btn.textContent = 'Select seats to book'; return;
  }
  const subtotal = state.selectedSeats.reduce((a,s)=>a+s.price,0);
  const total    = subtotal + SEAT_CONFIG.convenienceFee;
  lines.innerHTML = `
    <div class="summary-line"><span class="lbl">Seats</span><span>${state.selectedSeats.map(s=>s.id).join(', ')}</span></div>
    <div class="summary-line"><span class="lbl">Tickets (${state.selectedSeats.length})</span><span>₹${subtotal}</span></div>
    <div class="summary-line"><span class="lbl">Convenience fee</span><span>₹${SEAT_CONFIG.convenienceFee}</span></div>
    <hr style="border:none;border-top:1px solid var(--border);margin:10px 0">
    <div class="total-line"><span>Total</span><span>₹${total}</span></div>`;
  btn.disabled = false;
  btn.textContent = `Pay ₹${total} via ${state.paymentMethod}`;
}

function selectPayment(method) {
  state.paymentMethod = method;
  document.querySelectorAll('.pay-opt').forEach(el=>el.classList.toggle('active', el.textContent===method));
  updateSummary();
}

function goBackFromSeats() {
  if (state.currentMovieId) loadMovieDetail(state.currentMovieId);
  else showPage('shows');
}

/* ════════════════════════════════════════════
   BOOKING (local + API attempt)
════════════════════════════════════════════ */
async function confirmBooking(showId, movieTitle, time, date, venue) {
  if (!state.selectedSeats.length) return;
  requireAuth(async () => {
    const btn = document.getElementById('confirmBookingBtn');
    btn.disabled = true;
    btn.innerHTML = '<span class="spinner" style="width:16px;height:16px;display:inline-block;border-width:2px;margin-right:6px"></span>Processing payment…';

    const subtotal = state.selectedSeats.reduce((a,s)=>a+s.price,0);
    const total    = subtotal + SEAT_CONFIG.convenienceFee;
    const seatNums = state.selectedSeats.map(s=>s.id);

    let booking = null;
    try {
      booking = await apiFetch('/api/bookings', {
        method:'POST',
        body: JSON.stringify({ showId, seatNumbers:seatNums, numberOfSeats:seatNums.length, paymentMethod:state.paymentMethod }),
      });
    } catch {}

    // Build local booking record regardless
    const localBooking = {
      id:    booking?.id || Date.now(),
      movieTitle, showTime:time, showDate:date, venue,
      seatNumbers: seatNums,
      totalAmount: booking?.totalAmount || total,
      paymentMethod: state.paymentMethod,
      status:'CONFIRMED',
      bookedAt: new Date().toLocaleString(),
    };
    state.bookings.unshift(localBooking);
    localStorage.setItem('bms_bookings', JSON.stringify(state.bookings.slice(0,50)));

    toast('Booking confirmed! 🎉', 'success', 4000);
    showBookingConfirm(localBooking);
  });
}

function showBookingConfirm(b) {
  showPage('booking-confirm');
  const cont = document.getElementById('bookingConfirmContent');
  cont.innerHTML = `
  <div class="confirm-card">
    <span class="confirm-icon">🎉</span>
    <div class="confirm-title">You're all set!</div>
    <p class="confirm-sub">Your seats are locked in. See you at the movies.</p>
    <div class="ticket-card">
      <div class="ticket-number">BMS-${b.id}</div>
      <div style="height:12px"></div>
      <div class="ticket-row"><span class="lbl">Movie</span><span>${esc(b.movieTitle)}</span></div>
      <div class="ticket-row"><span class="lbl">Date & Time</span><span>${esc(b.showDate)} · ${esc(b.showTime)}</span></div>
      <div class="ticket-row"><span class="lbl">Venue</span><span>${esc(b.venue)}</span></div>
      <div class="ticket-row"><span class="lbl">Seats</span><span style="font-weight:700">${esc(b.seatNumbers.join(', '))}</span></div>
      <div class="ticket-row"><span class="lbl">Payment</span><span>${esc(b.paymentMethod)}</span></div>
      <div class="ticket-row"><span class="lbl">Amount Paid</span><span style="font-weight:800;color:var(--green)">₹${b.totalAmount}</span></div>
    </div>
    <div style="display:flex;gap:12px;justify-content:center;flex-wrap:wrap">
      <button class="btn btn-primary btn-lg" onclick="showPage('my-bookings')">My Bookings</button>
      <button class="btn btn-ghost btn-lg" onclick="showPage('movies')">Book Another</button>
    </div>
  </div>`;
}

/* ════════════════════════════════════════════
   MY BOOKINGS (local store)
════════════════════════════════════════════ */
function renderMyBookings() {
  requireAuth(() => {
    const list = document.getElementById('myBookingsList');
    if (!list) return;
    const bookings = state.bookings;
    if (!bookings.length) {
      list.innerHTML = `<div class="empty-state"><div class="empty-state-icon">🎟️</div><h3>No bookings yet</h3><p>Browse movies and book your first seat!</p><button class="btn btn-primary" style="margin-top:20px" onclick="showPage('movies')">Browse Movies</button></div>`;
      return;
    }
    list.innerHTML = bookings.map(b => `
      <div class="booking-item">
        <div class="booking-item-hd">
          <div>
            <div class="booking-item-movie">${esc(b.movieTitle||'Movie')}</div>
            <div class="booking-item-id">#BMS-${b.id}</div>
          </div>
          <span class="status-pill status-confirmed">${b.status||'CONFIRMED'}</span>
        </div>
        <div class="booking-item-details">
          ${b.seatNumbers?.length ? `<div class="bk-detail">🪑 <strong>${esc(b.seatNumbers.join(', '))}</strong></div>` : ''}
          ${b.showTime   ? `<div class="bk-detail">🕐 <strong>${esc(b.showTime)}</strong></div>` : ''}
          ${b.showDate   ? `<div class="bk-detail">📅 <strong>${esc(b.showDate)}</strong></div>` : ''}
          ${b.venue      ? `<div class="bk-detail">🏛 <strong>${esc(b.venue)}</strong></div>` : ''}
          ${b.totalAmount? `<div class="bk-detail">💳 <strong>₹${b.totalAmount}</strong></div>` : ''}
          ${b.paymentMethod ? `<div class="bk-detail">📲 <strong>${esc(b.paymentMethod)}</strong></div>` : ''}
        </div>
      </div>`).join('');
  });
}

/* ════════════════════════════════════════════
   HELPERS
════════════════════════════════════════════ */
function esc(s) {
  return String(s??'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#39;');
}
function shuffle(arr) {
  for (let i=arr.length-1;i>0;i--) { const j=Math.floor(Math.random()*(i+1));[arr[i],arr[j]]=[arr[j],arr[i]]; }
  return arr;
}
function genreEmoji(genre) {
  const map={Action:'💥',Comedy:'😂',Drama:'🎭',Horror:'👻',Romance:'💕',Thriller:'🔪','Sci-Fi':'🌌',Fantasy:'🧙',Animation:'🎨',Crime:'🕵️',Mystery:'🔎',Adventure:'🗺️',Musical:'🎵'};
  return map[genre] || map[Object.keys(map).find(k=>(genre||'').toLowerCase().includes(k.toLowerCase()))] || '🎬';
}

/* ════════════════════════════════════════════
   TICKER
════════════════════════════════════════════ */
function buildTicker() {
  const items = [
    '🎬 Dune: Part Two — Now Booking','🍿 Stree 2 — Limited Seats','⭐ Oppenheimer — 8.9 Rating',
    '🔥 Pushpa 2: The Rule — Blockbuster','🎟️ IMAX & 4DX Available','💳 Zero charges on UPI',
    '🏆 12th Fail — Critics Choice 9.0','🎭 50+ Movies Now Live','✈️ Top Gun: Maverick — Back in Theatres',
    '🌌 Interstellar — IMAX Re-release','🎨 Inside Out 2 — Family Show','🕷️ Spider-Man: No Way Home',
  ];
  const html = [...items,...items].map(t=>`<span class="ticker-item">${t}<span class="ticker-sep"> · </span></span>`).join('');
  const inner = document.querySelector('.ticker-inner');
  if (inner) inner.innerHTML = html;
}

/* ════════════════════════════════════════════
   ANIMATED COUNTERS
════════════════════════════════════════════ */
function animateCounters() {
  document.querySelectorAll('[data-count]').forEach(el => {
    const target = parseInt(el.dataset.count);
    let cur = 0;
    const step = Math.ceil(target/60);
    const t = setInterval(()=>{
      cur = Math.min(cur+step, target);
      el.textContent = cur.toLocaleString()+(el.dataset.suffix||'');
      if (cur>=target) clearInterval(t);
    }, 18);
  });
}

/* ════════════════════════════════════════════
   INIT
════════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {
  buildTicker();
  renderNavActions();

  // Save original form HTML for restoration after success states
  const loginCard = document.querySelector('#page-login .auth-card');
  const regCard   = document.querySelector('#page-register .auth-card');
  if (loginCard) LOGIN_FORM_HTML = loginCard.innerHTML;
  if (regCard)   REGISTER_FORM_HTML = regCard.innerHTML;

  showPage('home');

  // Scroll nav
  const nav = document.getElementById('mainNav');
  window.addEventListener('scroll', ()=>nav?.classList.toggle('scrolled', window.scrollY>20), {passive:true});

  // Counter observer
  const stats = document.querySelector('.hero-stats');
  if (stats) new IntersectionObserver((e)=>{ if(e[0].isIntersecting) animateCounters(); },{threshold:0.5}).observe(stats);

  // Keyboard
  document.addEventListener('keydown', e => {
    if (e.key==='Escape') {
      const active = document.querySelector('.page.active');
      if (active?.id==='page-movie-detail') showPage('movies');
      if (active?.id==='page-seat-select') goBackFromSeats();
    }
  });
});
