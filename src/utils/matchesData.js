import { CAPTAINS } from './captains';

export const WC_START = new Date('2026-06-11T19:00:00-05:00'); // Central Time (CT) is UTC-5
export const WC_END = new Date('2026-07-19T23:59:59-04:00'); // Eastern Time (ET) is UTC-4

export const TEAM_DATA = {
  MEX: { color:'#006847', iso2:'mx', name:'Mexico' },
  RSA: { color:'#007A4D', iso2:'za', name:'S. Africa' },
  KOR: { color:'#CD2E3A', iso2:'kr', name:'S. Korea' },
  CZE: { color:'#11457E', iso2:'cz', name:'Czechia' },
  CAN: { color:'#FF0000', iso2:'ca', name:'Canada' },
  BIH: { color:'#0033A0', iso2:'ba', name:'Bosnia' },
  USA: { color:'#002868', iso2:'us', name:'USA' },
  PAR: { color:'#D21034', iso2:'py', name:'Paraguay' },
  GHA: { color:'#FCD116', iso2:'gh', name:'Ghana' },
  ENG: { color:'#002040', iso2:'gb-eng', name:'England' },
  BRA: { color:'#009B3A', iso2:'br', name:'Brazil' },
  MAR: { color:'#C1272D', iso2:'ma', name:'Morocco' },
  CHI: { color:'#D52B1E', iso2:'cl', name:'Chile' },
  SEN: { color:'#00853F', iso2:'sn', name:'Senegal' },
  FRA: { color:'#003189', iso2:'fr', name:'France' },
  ARG: { color:'#74ACDF', iso2:'ar', name:'Argentina' },
  AUS: { color:'#00843D', iso2:'au', name:'Australia' },
  TUR: { color:'#E30A17', iso2:'tr', name:'Türkiye' },
  GER: { color:'#000000', iso2:'de', name:'Germany' },
  JAP: { color:'#BC002D', iso2:'jp', name:'Japan' },
  ESP: { color:'#AA151B', iso2:'es', name:'Spain' },
  POR: { color:'#006600', iso2:'pt', name:'Portugal' },
  NED: { color:'#FF6600', iso2:'nl', name:'Netherlands' },
  BEL: { color:'#8B0000', iso2:'be', name:'Belgium' },
  NOR: { color:'#EF2B2D', iso2:'no', name:'Norway' },
  URU: { color:'#5EB6E4', iso2:'uy', name:'Uruguay' },
  QAT: { color:'#8D1B3D', iso2:'qa', name:'Qatar' },
  SUI: { color:'#FF0000', iso2:'ch', name:'Switzerland' },
  SCO: { color:'#003380', iso2:'gb-sct', name:'Scotland' },
  HAI: { color:'#00209F', iso2:'ht', name:'Haiti' },
  NGR: { color:'#008751', iso2:'ng', name:'Nigeria' },
  UKR: { color:'#005BBB', iso2:'ua', name:'Ukraine' },
  IRN: { color:'#239F40', iso2:'ir', name:'Iran' },
  IRQ: { color:'#007A3D', iso2:'iq', name:'Iraq' },
  CPV: { color:'#003893', iso2:'cv', name:'Cabo Verde' },
  SAU: { color:'#006C35', iso2:'sa', name:'Saudi Arabia' },
  ECU: { color:'#FFCC00', iso2:'ec', name:'Ecuador' },
  COL: { color:'#FCD116', iso2:'co', name:'Colombia' },
  NZL: { color:'#00247D', iso2:'nz', name:'New Zealand' },
  SWE: { color:'#006AA7', iso2:'se', name:'Sweden' },
  TUN: { color:'#E70013', iso2:'tn', name:'Tunisia' },
  EGY: { color:'#CE1126', iso2:'eg', name:'Egypt' },
  CRC: { color:'#002B7F', iso2:'cr', name:'Costa Rica' },
  CRO: { color:'#FF0000', iso2:'hr', name:'Croatia' },
  PAN: { color:'#DA121A', iso2:'pa', name:'Panama' },
  ALG: { color:'#006233', iso2:'dz', name:'Algeria' },
  SRB: { color:'#C6363C', iso2:'rs', name:'Serbia' },
  HON: { color:'#0073CF', iso2:'hn', name:'Honduras' },
  DRC: { color:'#007FFF', iso2:'cd', name:'DR Congo' },
  UZB: { color:'#1EB53A', iso2:'uz', name:'Uzbekistan' },
  AUT: { color:'#ED2939', iso2:'at', name:'Austria' },
  JOR: { color:'#007A3D', iso2:'jo', name:'Jordan' },
  CUW: { color:'#002B7F', iso2:'cw', name:'Curaçao' },
  CIV: { color:'#F77F00', iso2:'ci', name:'Ivory Coast' },
  SSD: { color:'#078930', iso2:'ss', name:'S. Sudan' },
  CMR: { color:'#007A5E', iso2:'cm', name:'Cameroon' },
  GTM: { color:'#4997D0', iso2:'gt', name:'Guatemala' }
};

export const GROUP_TEAMS = {
  A: ['MEX', 'RSA', 'KOR', 'CZE'],
  B: ['CAN', 'BIH', 'QAT', 'SUI'],
  C: ['BRA', 'MAR', 'HAI', 'SCO'],
  D: ['USA', 'PAR', 'AUS', 'TUR'],
  E: ['GER', 'CUW', 'CIV', 'ECU'],
  F: ['NED', 'JAP', 'SWE', 'TUN'],
  G: ['BEL', 'EGY', 'IRN', 'NZL'],
  H: ['ESP', 'CPV', 'SAU', 'URU'],
  I: ['FRA', 'SEN', 'IRQ', 'NOR'],
  J: ['ARG', 'ALG', 'AUT', 'JOR'],
  K: ['POR', 'DRC', 'UZB', 'COL'],
  L: ['ENG', 'CRO', 'GHA', 'PAN']
};

export const GROUP_DATES = {
  A: ['2026-06-11', '2026-06-16', '2026-06-20'],
  B: ['2026-06-12', '2026-06-17', '2026-06-21'],
  C: ['2026-06-13', '2026-06-17', '2026-06-21'],
  D: ['2026-06-13', '2026-06-18', '2026-06-22'],
  E: ['2026-06-14', '2026-06-18', '2026-06-22'],
  F: ['2026-06-14', '2026-06-19', '2026-06-23'],
  G: ['2026-06-15', '2026-06-19', '2026-06-23'],
  H: ['2026-06-15', '2026-06-20', '2026-06-24'],
  I: ['2026-06-15', '2026-06-20', '2026-06-24'],
  J: ['2026-06-16', '2026-06-20', '2026-06-25'],
  K: ['2026-06-16', '2026-06-21', '2026-06-25'],
  L: ['2026-06-17', '2026-06-22', '2026-06-26']
};

export const VENUES = [
  { city: 'Mexico City', venue: 'Estadio Azteca', country: 'MX' },
  { city: 'East Rutherford, NJ', venue: 'MetLife Stadium', country: 'US' },
  { city: 'Arlington, TX', venue: 'AT&T Stadium', country: 'US' },
  { city: 'Miami, FL', venue: 'Hard Rock Stadium', country: 'US' },
  { city: 'Toronto', venue: 'BMO Field', country: 'CA' },
  { city: 'Vancouver', venue: 'BC Place', country: 'CA' },
  { city: 'Inglewood, CA', venue: 'SoFi Stadium', country: 'US' },
  { city: 'Atlanta, GA', venue: 'Mercedes-Benz Stadium', country: 'US' },
  { city: 'Foxborough, MA', venue: 'Gillette Stadium', country: 'US' },
  { city: 'Guadalajara', venue: 'Estadio Akron', country: 'MX' },
  { city: 'Houston, TX', venue: 'NRG Stadium', country: 'US' },
  { city: 'Kansas City, MO', venue: 'Arrowhead Stadium', country: 'US' },
  { city: 'Monterrey', venue: 'Estadio BBVA', country: 'MX' },
  { city: 'Philadelphia, PA', venue: 'Lincoln Financial Field', country: 'US' },
  { city: 'Santa Clara, CA', venue: 'Levi\'s Stadium', country: 'US' },
  { city: 'Seattle, WA', venue: 'Lumen Field', country: 'US' }
];

export function getMatchStatus(match) {
  const kickoff = new Date(match.date);
  const now = new Date();
  const diff = now - kickoff;
  if (now < WC_START) return 'upcoming';      // tournament not started
  if (diff < 0) return 'upcoming';            // match hasn't kicked off
  if (diff < 105 * 60 * 1000) return 'live'; // within 105 mins
  return 'ft';                                // after 105 mins
}

export function getFlagUrl(iso2, size = 80) {
  return `https://cdn.jsdelivr.net/gh/lipis/flag-icons/flags/4x3/${iso2.toLowerCase()}.svg`;
}

// Deterministic mock scores/minutes for live/finished matches
export const getMatchScores = (matchNumber, status, date) => {
  if (status === 'upcoming') {
    return { score1: null, score2: null, minute: null };
  }
  const hash1 = (matchNumber * 7) % 5;  // 0 to 4 goals
  const hash2 = (matchNumber * 13) % 4; // 0 to 3 goals
  if (status === 'live') {
    const kickoff = new Date(date);
    const elapsed = Math.floor((new Date() - kickoff) / (60 * 1000));
    const minute = Math.min(90, Math.max(1, elapsed));
    const score1 = Math.floor(hash1 * (minute / 90));
    const score2 = Math.floor(hash2 * (minute / 90));
    return { score1, score2, minute: `${minute}'` };
  }
  // full time (ft)
  return { score1: hash1, score2: hash2, minute: null };
};

// Generate all 104 matches
const generateMatches = () => {
  const matchesList = [];
  const groups = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L'];
  const featuredOverrides = {
    'FRA_SEN': { matchNumber: 49, isFeatured: true, date: '2026-06-15T15:00:00-05:00', venue: 'MetLife Stadium', city: 'East Rutherford, NJ' },
    'BRA_MAR': { matchNumber: 13, isFeatured: true, date: '2026-06-13T15:00:00-05:00', venue: 'MetLife Stadium', city: 'East Rutherford, NJ' },
    'ARG_CHI': { matchNumber: 37, isFeatured: true, date: '2026-06-15T15:00:00-05:00', venue: 'MetLife Stadium', city: 'East Rutherford, NJ' },
    'USA_PAR': { matchNumber: 19, isFeatured: true, date: '2026-06-13T18:00:00-05:00', venue: 'MetLife Stadium', city: 'East Rutherford, NJ' }
  };

  const usedNumbers = new Set([13, 19, 37, 49]);
  let nextAvailable = 1;
  const getNextNumber = () => {
    while (usedNumbers.has(nextAvailable)) {
      nextAvailable++;
    }
    usedNumbers.add(nextAvailable);
    return nextAvailable;
  };

  // 1. Generate Group Stage (72 matches)
  groups.forEach(g => {
    const teams = GROUP_TEAMS[g];
    const dates = GROUP_DATES[g];
    const pairings = [
      [ {t1: teams[0], t2: teams[1]}, {t1: teams[2], t2: teams[3]} ], // Matchday 1
      [ {t1: teams[0], t2: teams[2]}, {t1: teams[1], t2: teams[3]} ], // Matchday 2
      [ {t1: teams[0], t2: teams[3]}, {t1: teams[1], t2: teams[2]} ]  // Matchday 3
    ];

    pairings.forEach((dayPairings, dayIdx) => {
      dayPairings.forEach((pair, pairIdx) => {
        let t1 = pair.t1;
        let t2 = pair.t2;

        // Replace Jordan with Chile in Group J Matchday 1 to match featured Chile game
        if (g === 'J' && dayIdx === 0 && pairIdx === 0) {
          t2 = 'CHI';
        }

        const key = `${t1}_${t2}`;
        const override = featuredOverrides[key];
        
        const mNum = override ? override.matchNumber : getNextNumber();
        const mDate = override ? override.date : `${dates[dayIdx]}T${pairIdx === 0 ? '15:00' : '19:00'}:00-05:00`;
        const mVenue = override ? override.venue : VENUES[mNum % 16].venue;
        const mCity = override ? override.city : VENUES[mNum % 16].city;
        const mCountry = override ? (override.city === 'East Rutherford, NJ' ? 'US' : 'US') : VENUES[mNum % 16].country;
        const isFeatured = !!override;

        const kickoff = new Date(mDate);
        const now = new Date();
        const diff = now - kickoff;
        
        let status = 'upcoming';
        if (now >= WC_START) {
          if (diff >= 0) {
            status = diff < 105 * 60 * 1000 ? 'live' : 'ft';
          }
        }
        const scores = getMatchScores(mNum, status, mDate);

        matchesList.push({
          id: `m${mNum}`,
          matchNumber: mNum,
          phase: 'group',
          group: g,
          matchday: dayIdx + 1,
          date: mDate,
          venue: mVenue,
          city: mCity,
          country: mCountry,
          team1: {
            name: TEAM_DATA[t1].name,
            code: t1,
            iso2: TEAM_DATA[t1].iso2,
            kitColor: TEAM_DATA[t1].color,
            captainImg: CAPTAINS[t1]?.img || null,
            isFeatured
          },
          team2: {
            name: TEAM_DATA[t2].name,
            code: t2,
            iso2: TEAM_DATA[t2].iso2,
            kitColor: TEAM_DATA[t2].color,
            captainImg: CAPTAINS[t2]?.img || null,
            isFeatured
          },
          score1: scores.score1,
          score2: scores.score2,
          minute: scores.minute,
          status,
          isFeatured
        });
      });
    });
  });

  // 2. Generate Knockouts (32 matches, match numbers 73 to 104)
  const knockoutPhases = [
    { phase: 'r32', count: 16, startNum: 73, name: 'Round of 32', dateStart: '2026-06-28' },
    { phase: 'r16', count: 8, startNum: 89, name: 'Round of 16', dateStart: '2026-07-04' },
    { phase: 'qf', count: 4, startNum: 97, name: 'Quarter-Finals', dateStart: '2026-07-09' },
    { phase: 'sf', count: 2, startNum: 101, name: 'Semi-Finals', dateStart: '2026-07-14' },
    { phase: 'final', count: 1, startNum: 103, name: 'Third Place Play-off', dateStart: '2026-07-18' },
    { phase: 'final', count: 1, startNum: 104, name: 'Final', dateStart: '2026-07-19' }
  ];

  knockoutPhases.forEach(kp => {
    for (let i = 0; i < kp.count; i++) {
      const mNum = kp.startNum + i;
      
      // placeholder teams
      let t1Code, t2Code, t1Name, t2Name;
      if (kp.phase === 'r32') {
        t1Code = `1${String.fromCharCode(65 + (i % 12))}`; // 1A, 1B...
        t2Code = `2${String.fromCharCode(65 + ((i + 1) % 12))}`;
        t1Name = `Winner Group ${t1Code.substring(1)}`;
        t2Name = `Runner-up Group ${t2Code.substring(1)}`;
      } else if (kp.phase === 'r16') {
        t1Code = `W${73 + i * 2}`;
        t2Code = `W${74 + i * 2}`;
        t1Name = `Winner Match ${73 + i * 2}`;
        t2Name = `Winner Match ${74 + i * 2}`;
      } else if (kp.phase === 'qf') {
        t1Code = `W${89 + i * 2}`;
        t2Code = `W${90 + i * 2}`;
        t1Name = `Winner Match ${89 + i * 2}`;
        t2Name = `Winner Match ${90 + i * 2}`;
      } else if (kp.phase === 'sf') {
        t1Code = `W${97 + i * 2}`;
        t2Code = `W${98 + i * 2}`;
        t1Name = `Winner Match ${97 + i * 2}`;
        t2Name = `Winner Match ${98 + i * 2}`;
      } else if (mNum === 103) {
        t1Code = 'L101';
        t2Code = 'L102';
        t1Name = 'Loser Match 101';
        t2Name = 'Loser Match 102';
      } else {
        t1Code = 'W101';
        t2Code = 'W102';
        t1Name = 'Winner Match 101';
        t2Name = 'Winner Match 102';
      }

      const mDate = `${kp.dateStart}T18:00:00-05:00`;
      const mVenue = VENUES[mNum % 16].venue;
      const mCity = VENUES[mNum % 16].city;
      const mCountry = VENUES[mNum % 16].country;

      const kickoff = new Date(mDate);
      const now = new Date();
      const diff = now - kickoff;
      
      let status = 'upcoming';
      if (now >= WC_START) {
        if (diff >= 0) {
          status = diff < 105 * 60 * 1000 ? 'live' : 'ft';
        }
      }
      const scores = getMatchScores(mNum, status, mDate);

      matchesList.push({
        id: `m${mNum}`,
        matchNumber: mNum,
        phase: kp.phase,
        group: null,
        matchday: null,
        date: mDate,
        venue: mVenue,
        city: mCity,
        country: mCountry,
        team1: {
          name: t1Name,
          code: t1Code,
          iso2: 'us', // fallback
          kitColor: '#444444',
          captainImg: null,
          isFeatured: false
        },
        team2: {
          name: t2Name,
          code: t2Code,
          iso2: 'us', // fallback
          kitColor: '#666666',
          captainImg: null,
          isFeatured: false
        },
        score1: scores.score1,
        score2: scores.score2,
        minute: scores.minute,
        status,
        isFeatured: false
      });
    }
  });

  // Sort sequentially by match number
  return matchesList.sort((a, b) => a.matchNumber - b.matchNumber);
};

export const matchesData = generateMatches();
