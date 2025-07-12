import React, { useState, useEffect, useCallback } from 'react';
import { GiftedChat } from 'react-native-gifted-chat';
import { useRoute } from '@react-navigation/native';
import { collection, query, orderBy, onSnapshot, addDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '../../services/firebase';

export default function ChatRoomView() {
  const route = useRoute();
  const { roomId } = route.params;
  const uid = auth.currentUser?.uid;

  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const q = query(collection(db, 'rooms', roomId, 'messages'), orderBy('createdAt', 'desc'));
    const unsub = onSnapshot(q, (snap) => {
      const data = snap.docs.map((d) => {
        const f = d.data();
        return {
          _id: d.id,
          text: f.text,
          createdAt: f.createdAt?.toDate() || new Date(),
          user: f.user,
        };
      });
      setMessages(data);
    });
    return () => unsub();
  }, [roomId]);

  const onSend = useCallback(async (msgs = []) => {
    const m = msgs[0];
    await addDoc(collection(db, 'rooms', roomId, 'messages'), {
      text: m.text,
      createdAt: serverTimestamp(),
      user: {
        _id: uid,
        name: auth.currentUser.displayName || auth.currentUser.email,
        avatar: auth.currentUser.photoURL || null,
      },
    });
  }, [roomId, uid]);

  return (
    <GiftedChat
      messages={messages}
      onSend={(msgs) => onSend(msgs)}
      user={{
        _id: uid,
        name: auth.currentUser.displayName || 'Me',
        avatar: auth.currentUser.photoURL || undefined,
      }}
    />
  );
}