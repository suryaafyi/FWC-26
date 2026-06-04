// Real-time state check logic for FIFA World Cup 2026

export const WC_START = new Date('2026-06-11T19:00:00-05:00'); // Central Time (CT) is UTC-5
export const WC_END   = new Date('2026-07-19T23:59:59-04:00'); // Eastern Time (ET) is UTC-4

export function getTournamentState() {
  const now = new Date();
  
  if (now < WC_START) {
    return 'PRE_TOURNAMENT';
  } else if (now > WC_END) {
    return 'POST_TOURNAMENT';
  } else {
    return 'LIVE_TOURNAMENT';
  }
}
