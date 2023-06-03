import { useState, useEffect } from 'react'
import { supabase } from './helper.js'
import { StyleSheet, View, Alert, Text } from 'react-native'
import { Button, Input } from 'react-native-elements'
import QRCode from 'react-native-qrcode-svg';
import { useNavigation } from '@react-navigation/native';
import { Scanner } from './Scanner.js'

export function Qr_scanner ({session}){

    const navigation = useNavigation();

    const handleButtonPress_game = () => {
        navigation.navigate('GameScreen');
      };

      const [loading, setLoading] = useState(true);
      const [id, setId] = useState('');
      const [score, setScore] = useState(''); //Changer toute mention de score si autre nom dans la database

      useEffect(() => {
          if (session) getScore();
        }, [session]);
  
      async function getScore() {
          try {
            setLoading(true);
            if (!session?.user) throw new Error('No user on the session!');
      
            let { data, error, status } = await supabase
              .from('profiles')
              .select(`id, score`)
              .eq('id', session?.user.id)
              .single();
            if (error && status !== 406) {
              throw error;
            }
      
            if (data) {
              setId(data.id);
                setScore(data.score);
            }
          } catch (error) {
            if (error instanceof Error) {
              Alert.alert(error.message);
            }
          } finally {
            setLoading(false);
          }
        }
    
    return (
        <View>
        <View style={styles.verticallySpaced}>
          <Input label="Votre ID" value={session?.user.id || ''} />
          <Input label="Votre Score" value={score || '0'} />
        </View>
        <Scanner />
        <View style={[styles.verticallySpaced,{marginLeft:"10%", marginRight:"10%"}]}>
        <Button title="Jouer" onPress={handleButtonPress_game} />
      </View>
      </View>
        
    )
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