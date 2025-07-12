import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { collection, doc, setDoc, serverTimestamp } from 'firebase/firestore';
import Button from '../../components/Button';
import { Text } from '../../components/StyledText';
import { colors } from '../../styles';
import { db, auth } from '../../services/firebase';

export default function HomeScreen() {
  const navigation = useNavigation();
  const [lastRoomId, setLastRoomId] = useState(null);

  /* ---------- Load last room ---------- */
  useEffect(() => {
    const fetchLast = async () => {
      const id = await AsyncStorage.getItem('lastRoomId');
      if (id) setLastRoomId(id);
    };
    fetchLast();
  }, []);

  /* ---------- Create new room ---------- */
  const handleStartMatch = async () => {
    const uid = auth.currentUser?.uid;
    if (!uid) {
      Alert.alert('Not signed in', 'Please log in first');
      return;
    }

    // generate 6 digit pin
    const pin = Math.floor(100000 + Math.random() * 900000).toString();

    try {
      await setDoc(doc(collection(db, 'rooms'), pin), {
        host: uid,
        pin,
        createdAt: serverTimestamp(),
        members: {
          [uid]: {
            ready: false,
            displayName: auth.currentUser.displayName || auth.currentUser.email,
            photoURL: auth.currentUser.photoURL || null,
          },
        },
      });
      await AsyncStorage.setItem('lastRoomId', pin);
      navigation.navigate('Lobby', { roomId: pin });
    } catch (e) {
      console.error('Error creating room', e);
      Alert.alert('Error', 'Could not create room');
    }
  };

  const handleContinue = () => {
    if (lastRoomId) {
      navigation.navigate('Lobby', { roomId: lastRoomId });
    }
  };

  return (
    <View style={styles.container}>
      <Text size={28} bold style={{ marginBottom: 40 }}>
        Food Buddy
      </Text>

      <Button
        caption="Start Match"
        onPress={handleStartMatch}
        style={{ marginBottom: 20, width: '70%' }}
      />

      <Button
        caption="Continue Last Match"
        onPress={handleContinue}
        disabled={!lastRoomId}
        bordered
        style={{ width: '70%' }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: colors.white,
  },
});
