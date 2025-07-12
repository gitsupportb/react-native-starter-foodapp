import React, { useEffect, useState, useCallback, useRef } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import Swiper from 'react-native-deck-swiper';
import * as Haptics from 'expo-haptics';
import { collection, query, onSnapshot, addDoc, doc, setDoc, serverTimestamp } from 'firebase/firestore';
import RestaurantCard from '../../components/RestaurantCard';
import Button from '../../components/Button';
import { auth, db } from '../../services/firebase';
import { colors } from '../../styles';
import { Text } from '../../components/StyledText';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function SwipeView() {
  const route = useRoute();
  const navigation = useNavigation();
  const { roomId } = route.params;

  const user = auth.currentUser;
  const uid = user?.uid;

  const [venues, setVenues] = useState([]);
  const swiperRef = useRef(null);

  /* ---------- Subscribe to venue list ---------- */
  useEffect(() => {
    const q = query(collection(db, 'rooms', roomId, 'venues'));
    const unsub = onSnapshot(q, (snap) => {
      const list = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
      setVenues(list);
    });
    return () => unsub();
  }, [roomId]);

  /* ---------- Handle like ---------- */
  const handleLike = useCallback(
    async (venue) => {
      if (!uid) return;
      try {
        const id = `${uid}_${venue.id}`;
        await setDoc(doc(db, 'rooms', roomId, 'likes', id), {
          userId: uid,
          venueId: venue.id,
          createdAt: serverTimestamp(),
        });
      } catch (e) {
        console.error('Error liking', e);
      }
    },
    [uid, roomId],
  );

  const onSwipedRight = (cardIndex) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    const v = venues[cardIndex];
    if (v) handleLike(v);
  };
  const onSwipedLeft = () => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
  };

  /* ---------- Buttons ---------- */
  const swipeLeft = () => swiperRef.current?.swipeLeft();
  const swipeRight = () => swiperRef.current?.swipeRight();

  /* ---------- Chat ---------- */
  const openChat = () => navigation.navigate('ChatRoom', { roomId });

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.chatBtn} onPress={openChat}>
        <Icon name="comments" size={26} color={colors.white} />
      </TouchableOpacity>

      {venues.length === 0 ? (
        <Text>No venues loaded.</Text>
      ) : (
        <Swiper
          ref={swiperRef}
          cards={venues}
          renderCard={(c) => <RestaurantCard venue={c} />}
          onSwipedRight={onSwipedRight}
          onSwipedLeft={onSwipedLeft}
          backgroundColor="transparent"
          cardHorizontalMargin={0}
          stackSize={3}
          stackSeparation={15}
          disableTopSwipe
          disableBottomSwipe
        />
      )}

      <View style={styles.buttonsRow}>
        <Button
          caption="✖"
          bordered
          onPress={swipeLeft}
          style={styles.actionBtn}
        />
        <Button
          caption="❤️"
          onPress={swipeRight}
          style={styles.actionBtn}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.white,
  },
  buttonsRow: {
    flexDirection: 'row',
    marginTop: 20,
  },
  actionBtn: {
    width: 70,
    marginHorizontal: 20,
  },
  chatBtn: {
    position: 'absolute',
    top: 40,
    right: 20,
    backgroundColor: colors.primary,
    padding: 10,
    borderRadius: 30,
    zIndex: 2,
  },
});