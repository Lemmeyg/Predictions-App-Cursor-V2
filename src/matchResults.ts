import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

interface MatchResult {
  homeTeam: string;
  awayTeam: string;
  score: string;
  status: string;
  league: string;
  matchDate: string;
}

async function getMatchDayResults(): Promise<MatchResult[]> {
  try {
    console.log('Starting API fetch...');
    const options = {
      method: 'GET',
      url: 'https://api-football-v1.p.rapidapi.com/v3/fixtures',
      params: {
        date: new Date().toISOString().split('T')[0], // Today's date in YYYY-MM-DD format
        timezone: 'Europe/London'
      },
      headers: {
        'X-RapidAPI-Key': process.env.RAPID_API_KEY,
        'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com'
      }
    };

    const response = await axios.request(options);
    
    return response.data.response.map((match: any) => ({
      homeTeam: match.teams.home.name,
      awayTeam: match.teams.away.name,
      score: `${match.goals.home ?? '-'} - ${match.goals.away ?? '-'}`,
      status: match.fixture.status.long,
      league: match.league.name,
      matchDate: new Date(match.fixture.date).toLocaleString()
    }));

  } catch (error) {
    console.error('Error fetching match results:', error);
    return [];
  }
}

// Example usage
async function main() {
  const results = await getMatchDayResults();
  console.log('Today\'s Match Results:');
  results.forEach(match => {
    console.log(`
    ${match.league}
    ${match.homeTeam} vs ${match.awayTeam}
    Score: ${match.score}
    Status: ${match.status}
    Date: ${match.matchDate}
    -------------------
    `);
  });
}

main();

// Add this at the bottom of your file to run when directly executed
if (require.main === module) {
  console.log('Running match results test...');
  fetchMatches()
    .then(() => console.log('Test completed'))
    .catch(err => console.error('Test failed:', err));
} 