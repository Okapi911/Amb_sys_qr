import { useState, useEffect } from 'react'
import { supabase } from './helper.js'
import { StyleSheet, View, Alert, Text } from 'react-native'
import { Button, Input } from 'react-native-elements'
import QRCode from 'react-native-qrcode-svg';
import { useNavigation } from '@react-navigation/native';
import { BarCodeScanner } from 'expo-barcode-scanner';
// import {Users} from './Users.js';


export function Scanner () {
    const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    };

    getBarCodeScannerPermissions();
  }, []);

  /*Lorsqu'un QR code est scanné cette fonction est appelée. data est le texte contenu dans le qr_code, à utiliser pour modifier le score  du joueur adverse*/
  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);

    //Current player gains points
    // setCurrentScore(getCurrentScore()+1)

    //Scanned player looses points
    // setScoreByID(data, Math.max(getScoreByID(data)-1, 0))
    alert(`Le QR code du joueur ${data} a été scanné avec succès!`);
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={[styles.container,{marginTop:"50%", paddingBottom:"10%",marginBottom:"50%"}]}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={[StyleSheet.absoluteFillObject,{marginTop:"-40%", paddingTop:"50%", marginBottom:"10%"}]}
      />
      <View style={[styles.container,{marginBottom:"-65%", marginTop:"50%"}]}>
      {scanned && <Button title={'Appuyer pour scanner un autre code'} onPress={() => setScanned(false)} style={[styles.container, styles.verticallySpaced, {color:'#ff0000'}]} />}
      </View>
      </View>
  );
}

const styles = StyleSheet.create({
    container: {
      marginTop: 40,
      padding: 12,
      width:"100%"
    },
    verticallySpaced: {
      paddingTop: 4,
      paddingBottom: 4,
      alignSelf: 'stretch',
    },
    mt20: {
      marginTop: 20,
    },
    absoluteFillObject: {
        width: '100%',
        height: '100%'
        }
  })