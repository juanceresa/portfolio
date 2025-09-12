import { NextResponse } from 'next/server';

export async function GET() {
  const WAKATIME_API_KEY = process.env.WAKATIME_API_KEY;
  
  if (!WAKATIME_API_KEY) {
    return NextResponse.json(
      { error: 'WakaTime API key not configured' },
      { status: 500 }
    );
  }

  try {
    // Fetch last year stats for better representation
    const lastYearResponse = await fetch(`https://wakatime.com/api/v1/users/current/stats/last_year`, {
      headers: {
        Authorization: `Basic ${Buffer.from(WAKATIME_API_KEY).toString('base64')}`,
      },
      next: { revalidate: 1800 },
    });

    if (!lastYearResponse.ok) {
      throw new Error(`WakaTime API error: ${lastYearResponse.status}`);
    }

    const lastYearData = await lastYearResponse.json();

    // Transform the data to match our component interface
    const transformedData = {
      // Daily average from last year
      daily_average_text: lastYearData.data.human_readable_daily_average || '0 mins',
      
      // Best day from last year
      best_day: lastYearData.data.best_day ? {
        date: lastYearData.data.best_day.date,
        text: lastYearData.data.best_day.text,
        total_seconds: lastYearData.data.best_day.total_seconds,
      } : null,
      
      // Top project from last year
      top_project: (lastYearData.data.projects && lastYearData.data.projects.length > 0) ? {
        name: lastYearData.data.projects[0].name,
        text: lastYearData.data.projects[0].text,
        hours: lastYearData.data.projects[0].hours,
        minutes: lastYearData.data.projects[0].minutes,
      } : null,
      
      // Top language from last year
      top_language: (lastYearData.data.languages && lastYearData.data.languages.length > 0) ? {
        name: lastYearData.data.languages[0].name,
        text: lastYearData.data.languages[0].text,
        hours: lastYearData.data.languages[0].hours,
        minutes: lastYearData.data.languages[0].minutes,
      } : null,
    };

    return NextResponse.json(transformedData);
  } catch (error) {
    console.error('WakaTime API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch WakaTime stats' },
      { status: 500 }
    );
  }
}