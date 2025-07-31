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
    // Fetch last 7 days stats
    const [last7DaysResponse, allTimeResponse] = await Promise.all([
      fetch('https://wakatime.com/api/v1/users/current/stats/last_7_days', {
        headers: {
          Authorization: `Basic ${Buffer.from(WAKATIME_API_KEY).toString('base64')}`,
        },
        next: { revalidate: 3600 },
      }),
      fetch('https://wakatime.com/api/v1/users/current/stats/all_time', {
        headers: {
          Authorization: `Basic ${Buffer.from(WAKATIME_API_KEY).toString('base64')}`,
        },
        next: { revalidate: 3600 },
      })
    ]);

    if (!last7DaysResponse.ok) {
      throw new Error(`WakaTime API error: ${last7DaysResponse.status}`);
    }

    const last7DaysData = await last7DaysResponse.json();
    const allTimeData = allTimeResponse.ok ? await allTimeResponse.json() : null;

    // Transform the data to match our component interface
    const transformedData = {
      // Daily average from last 7 days (as per Stats API docs)
      daily_average_seconds: last7DaysData.data.daily_average || 0,
      daily_average_text: last7DaysData.data.human_readable_daily_average || '0 mins',
      
      // Best day from all time stats (has date, text, total_seconds per API docs)
      best_day: allTimeData?.data?.best_day ? {
        date: allTimeData.data.best_day.date,
        text: allTimeData.data.best_day.text, // human readable from API
        total_seconds: allTimeData.data.best_day.total_seconds,
      } : null,
      
      // All time project breakdown with total hours
      all_time_projects: allTimeData?.data?.projects?.map((project: any) => ({
        name: project.name,
        total_seconds: project.total_seconds,
        text: project.text, // human readable total from API
        hours: project.hours,
        minutes: project.minutes,
        percent: project.percent,
      })) || [],
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