import { createClient } from '@supabase/supabase-js'

 const supabase = createClient('https://rpupgviwtxokbkhzylfc.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJwdXBndml3dHhva2JraHp5bGZjIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODEyMDc0MjMsImV4cCI6MTk5Njc4MzQyM30.HU4Ct_xmF1kn4hQV-oaIumoasOV0165cVfccBHThMvA')
 
 export default supabase;