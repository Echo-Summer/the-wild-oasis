import { createClient } from '@supabase/supabase-js'

export const supabaseUrl = 'https://erddkbcfunxmuhukaruh.supabase.co'
const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVyZGRrYmNmdW54bXVodWthcnVoIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1ODA5NTM5NywiZXhwIjoyMDczNjcxMzk3fQ.cfwN-ZkrLibwbgiy6Jm7PdfraY_chiVY0iP09QM3Kqw'
const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase
