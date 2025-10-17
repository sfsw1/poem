import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://xtseaguzjzwvodbsefpl.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh0c2VhZ3V6anp3dm9kYnNlZnBsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjAzNjk4NzAsImV4cCI6MjA3NTk0NTg3MH0.duMe3HmhKWRDylULNEdrJwOW6AHeNNbTlClYFf86YE4'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)