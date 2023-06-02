import 'react-native-url-polyfill/auto'
import * as SecureStore from 'expo-secure-store'
import { createClient } from '@supabase/supabase-js'

const ExpoSecureStoreAdapter = {
  getItem: (key) => {
    return SecureStore.getItemAsync(key)
  },
  setItem: (key, value) => {
    SecureStore.setItemAsync(key, value)
  },
  removeItem: (key) => {
    SecureStore.deleteItemAsync(key)
  },
}

const supabaseUrl = "https://tnulyvcapocbmfakkyzt.supabase.co"
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRudWx5dmNhcG9jYm1mYWtreXp0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODU3MjU0NDAsImV4cCI6MjAwMTMwMTQ0MH0.DGyXe7WRO7PZ_neO9-mUo2a1ipk-ZASOHRXAWcpBqmQ"

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: ExpoSecureStoreAdapter,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
})