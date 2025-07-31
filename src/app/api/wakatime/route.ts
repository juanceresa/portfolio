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
    // Get current month in YYYY-MM format
    const now = new Date();
    const currentMonth = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
    
    // Fetch this month's stats only
    const thisMonthResponse = await fetch(`https://wakatime.com/api/v1/users/current/stats/${currentMonth}`, {
      headers: {
        Authorization: `Basic ${Buffer.from(WAKATIME_API_KEY).toString('base64')}`,
      },
      next: { revalidate: 3600 },
    });

    if (!thisMonthResponse.ok) {
      throw new Error(`WakaTime API error: ${thisMonthResponse.status}`);
    }

    const thisMonthData = await thisMonthResponse.json();

    // Transform the data to match our component interface
    const transformedData = {
      // Daily average from this month
      daily_average_text: thisMonthData.data.human_readable_daily_average || '0 mins',
      
      // Best day from this month
      best_day: thisMonthData.data.best_day ? {
        date: thisMonthData.data.best_day.date,
        text: thisMonthData.data.best_day.text,
        total_seconds: thisMonthData.data.best_day.total_seconds,
      } : null,
      
      // Top project this month
      top_project: thisMonthData.data.projects?.[0] ? {
        name: thisMonthData.data.projects[0].name,
        text: thisMonthData.data.projects[0].text,
        percent: thisMonthData.data.projects[0].percent,
      } : null,
      
      // Top language this month
      top_language: thisMonthData.data.languages?.[0] ? {
        name: thisMonthData.data.languages[0].name,
        text: thisMonthData.data.languages[0].text,
        percent: thisMonthData.data.languages[0].percent,
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