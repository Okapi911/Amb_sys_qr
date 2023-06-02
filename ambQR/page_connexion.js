import {View} from 'react-native'
import 'react-native-url-polyfill/auto'
import { useState, useEffect } from 'react'
import { supabase } from './helper.js'
import {Auth} from './Auth.js'
import {Account} from './Account.js'


export function Test() {
    const [session, setSession] = useState(null);
  
    useEffect(() => {
      supabase.auth.getSession().then(({ data: session }) => {
        setSession(session);
      });
  
      supabase.auth.onAuthStateChange((_event, session) => {
        setSession(session);
      });
    }, []);
  
    return (
      <View>
        {session && session.user ? <Account key={session.user.id} session={session} /> : <Auth />}
      </View>
    );
  }