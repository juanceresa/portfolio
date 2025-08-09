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
    // Fetch last 30 days stats for rolling window
    const last30DaysResponse = await fetch(`https://wakatime.com/api/v1/users/current/stats/last_30_days`, {
      headers: {
        Authorization: `Basic ${Buffer.from(WAKATIME_API_KEY).toString('base64')}`,
      },
      next: { revalidate: 1800 },
    });

    if (!last30DaysResponse.ok) {
      throw new Error(`WakaTime API error: ${last30DaysResponse.status}`);
    }

    const last30DaysData = await last30DaysResponse.json();

    // Transform the data to match our component interface
    const transformedData = {
      // Daily average from last 30 days
      daily_average_text: last30DaysData.data.human_readable_daily_average || '0 mins',
      
      // Best day from last 30 days
      best_day: last30DaysData.data.best_day ? {
        date: last30DaysData.data.best_day.date,
        text: last30DaysData.data.best_day.text,
        total_seconds: last30DaysData.data.best_day.total_seconds,
      } : null,
      
      // Top project from last 30 days
      top_project: (last30DaysData.data.projects && last30DaysData.data.projects.length > 0) ? {
        name: last30DaysData.data.projects[0].name,
        text: last30DaysData.data.projects[0].text,
        hours: last30DaysData.data.projects[0].hours,
        minutes: last30DaysData.data.projects[0].minutes,
      } : null,
      
      // Top language from last 30 days
      top_language: (last30DaysData.data.languages && last30DaysData.data.languages.length > 0) ? {
        name: last30DaysData.data.languages[0].name,
        text: last30DaysData.data.languages[0].text,
        hours: last30DaysData.data.languages[0].hours,
        minutes: last30DaysData.data.languages[0].minutes,
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