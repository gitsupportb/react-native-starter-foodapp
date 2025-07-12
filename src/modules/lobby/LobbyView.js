import React, { useEffect, useState, useCallback } from 'react';
import { View, StyleSheet, FlatList, Alert } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { onSnapshot, doc, updateDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Text } from '../../components/StyledText';
import Button from '../../components/Button';
import Avatar from '../../components/Avatar';
import { auth, db } from '../../services/firebase';
import { colors } from '../../styles';

export default function LobbyView() {
  const route = useRoute();
  const navigation = useNavigation();
  const { roomId } = route.params;

  const user = auth.currentUser;
  const uid = user?.uid;

  const [room, setRoom] = useState(null);
  const [ready, setReady] = useState(false);

  /* ---------- Join room & subscribe ---------- */
  useEffect(() => {
    if (!uid) return;

    const roomRef = doc(db, 'rooms', roomId);

    // Ensure user is in room members list
    (async () => {
      try {
        await setDoc(
          roomRef,
          {
            members: {
              [uid]: {
                ready: false,
                displayName: user.displayName || user.email,
                photoURL: user.photoURL || null,
              },
            },
            updatedAt: serverTimestamp(),
          },
          { merge: true },
        );
        await AsyncStorage.setItem('lastRoomId', roomId);
      } catch (e) {
        console.error('Error joining room', e);
      }
    })();

    const unsub = onSnapshot(roomRef, (snap) => {
      setRoom(snap.data());
      if (snap.exists() && snap.data()?.members?.[uid]) {
        setReady(snap.data().members[uid].ready);
      }
    });

    return () => unsub();
  }, [roomId, uid]);

  /* ---------- Toggle ready ---------- */
  const toggleReady = useCallback(async () => {
    try {
      await updateDoc(doc(db, 'rooms', roomId), {
        [`members.${uid}.ready`]: !ready,
      });
    } catch (e) {
      Alert.alert('Error', 'Could not update status');
    }
  }, [ready, roomId, uid]);

  /* ---------- Render ---------- */
  const renderMember = ({ item }) => {
    const member = room.members[item];
    return (
      <View style={styles.memberItem}>
        {member.photoURL ? (
          <Avatar src={{ uri: member.photoURL }} rounded />
        ) : (
          <Avatar rounded>{member.displayName?.charAt(0) || 'U'}</Avatar>
        )}
        <Text style={{ marginLeft: 10 }}>{member.displayName}</Text>
        {member.ready && (
          <Text style={{ marginLeft: 'auto', color: colors.green }}>Ready</Text>
        )}
      </View>
    );
  };

  if (!room) {
    return (
      <View style={styles.container}>
        <Text>Loading room...</Text>
      </View>
    );
  }

  const isHost = room?.host === uid;
  const allReady = room && Object.values(room.members).every((m) => m.ready);

  return (
    <View style={styles.container}>
      <Text size={24} bold style={{ marginBottom: 15 }}>
        Lobby
      </Text>
      <Text size={18} style={{ marginBottom: 10 }}>
        PIN: {room.pin || roomId}
      </Text>

      <FlatList
        data={Object.keys(room.members || {})}
        keyExtractor={(id) => id}
        renderItem={renderMember}
        style={{ alignSelf: 'stretch' }}
      />

      <Button
        caption={ready ? 'Unready' : 'Ready'}
        onPress={toggleReady}
        style={{ marginTop: 20, alignSelf: 'stretch' }}
      />
      {isHost && allReady && (
        <Button
          caption="Start Swiping"
          onPress={() => navigation.navigate('Swipe', { roomId })}
          style={{ marginTop: 10, alignSelf: 'stretch' }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
    backgroundColor: colors.white,
  },
  memberItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
});