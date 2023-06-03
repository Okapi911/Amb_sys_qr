import { useState, useEffect } from 'react'
import { supabase } from './helper.js'
import { StyleSheet, View, Alert, Text } from 'react-native'
import { Button, Input } from 'react-native-elements'
import QRCode from 'react-native-qrcode-svg';
import { useNavigation } from '@react-navigation/native';


export function Qr_printer({ session }) {

    const navigation = useNavigation();

    const handleButtonPress_scan = () => {
        navigation.navigate('ScanScreen');
      };

    const [loading, setLoading] = useState(true);
    const [id, setId] = useState('');
    useEffect(() => {
        if (session) getId();
      }, [session]);

    async function getId() {
        try {
          setLoading(true);
          if (!session?.user) throw new Error('No user on the session!');
    
          let { data, error, status } = await supabase
            .from('profiles')
            .select(`id`)
            .eq('id', session?.user.id)
            .single();
          if (error && status !== 406) {
            throw error;
          }
    
          if (data) {
            setId(data.id);
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
        <View style={styles.verticallySpaced}>
          <Input label="Votre ID" value={id || ''} />
          <View style={[styles.container,{textAlign:"center", marginLeft:"10%"}]}>
            <Text style={{marginBottom:"5%", fontWeight:"bold"}}>Voici votre QR code</Text>
            <QRCode
        value={id || 'unvalid qr code'}
        logoSize={300}
        size={300}
        logoBackgroundColor='transparent'
        />
          </View>
          <View style={[styles.verticallySpaced,{marginLeft:"10%", marginRight:"10%", marginTop:"5%"}]}>
          <Button title="Jouer" onPress={handleButtonPress_scan} />
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