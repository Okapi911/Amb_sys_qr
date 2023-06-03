import 'react-native-url-polyfill/auto'
import { useState, useEffect } from 'react'
import { supabase } from './helper.js'
import {Auth} from './Auth.js'
import {Account} from './Account.js'
import {ConnexionPage} from './page_connexion.js'
import {Qr_scanner} from './qr_scanner.js'
import { StyleSheet, View, Alert, Text } from 'react-native'

export function ScanScreen () {
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
        {session && session.user ? <Qr_scanner key={session.user.id} session={session} /> : <ConnexionPage />}
      </View>
    );
  }

  const styles = StyleSheet.create({
    container: {
      marginTop: 40,
      padding: 12,
    },
    verticallySpaced: {
      paddingTop: 4,
      paddingBottom: 4,
      alignSelf: 'stretch',
    },
    mt20: {
      marginTop: 20,
    },
  })