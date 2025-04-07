import { supabase } from '../supabaseClient';

export const trackSession = async (event: string, session: any) => {
  if (event === 'SIGNED_IN') {
    const start = Date.now();
    localStorage.setItem('session_start', start.toString());

    // Insert session start record in Supabase
    const { data, error } = await supabase.from('session_logs').insert([
      {
        user_id: session?.user?.id,
        start_time: new Date(start).toISOString(),
        duration_ms: 0, // placeholder until logout
      },
    ]).select();

    if (error) {
      console.error('Error logging session start:', error.message);
    } else {
      // Store session log ID for future update
      localStorage.setItem('session_log_id', data?.[0]?.id);
    }
  }

  if (event === 'SIGNED_OUT') {
    const end = Date.now();
    const start = Number(localStorage.getItem('session_start') || '0');
    const duration = end - start;
    const sessionLogId = localStorage.getItem('session_log_id');

    if (sessionLogId) {
      // Update session record with end_time and duration
      const { error } = await supabase.from('session_logs').update({
        end_time: new Date(end).toISOString(),
        duration_ms: duration,
      }).eq('id', sessionLogId);

      if (error) {
        console.error('Error updating session log:', error.message);
      }
    } else {
      console.warn('No session_log_id found in localStorage');
    }

    // Clean up
    localStorage.removeItem('session_start');
    localStorage.removeItem('session_log_id');
  }
};
