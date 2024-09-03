
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://fmkryepsrulmkvhujwlc.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZta3J5ZXBzcnVsbWt2aHVqd2xjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjUxMTc2MDYsImV4cCI6MjA0MDY5MzYwNn0.TcStZZb16C75enH2f0hnlkAF6EPFzIzL_UX_p-z95UU'
export const supabase = createClient(supabaseUrl, supabaseKey)