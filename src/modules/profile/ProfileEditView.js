import React, { useEffect, useState, useCallback } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  Alert,
  FlatList,
  Text,
  TouchableOpacity,
  Image,
} from 'react-native';
import { Avatar, Button, CheckBox } from 'react-native-elements';
import * as ImagePicker from 'expo-image-picker';
import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  collection,
  query,
  where,
  getDocs,
} from 'firebase/firestore';
import {
  ref as storageRef,
  uploadBytes,
  getDownloadURL,
} from 'firebase/storage';
import { auth, db, storage } from '../../services/firebase';
import { colors } from '../../styles';

const DIETARY_OPTIONS = [
  { key: 'vegan', label: 'Vegan' },
  { key: 'halal', label: 'Halal' },
  { key: 'glutenFree', label: 'Gluten-Free' },
];

const CUISINES = [
  'Italian',
  'Chinese',
  'Indian',
  'Mexican',
  'Japanese',
  'Thai',
  'French',
  'American',
  'Lebanese',
  'Greek',
  'Spanish',
  'Korean',
];

export default function ProfileEditView() {
  const user = auth.currentUser;
  const uid = user?.uid;

  const [photoURL, setPhotoURL] = useState(user?.photoURL || '');
  const [dietary, setDietary] = useState({ vegan: false, halal: false, glutenFree: false });
  const [cuisines, setCuisines] = useState([]);
  const [matches, setMatches] = useState([]);
  const [isSaving, setIsSaving] = useState(false);

  /* ---------- Helpers ---------- */
  const toggleDiet = (key) => setDietary((prev) => ({ ...prev, [key]: !prev[key] }));
  const toggleCuisine = (name) =>
    setCuisines((prev) => (prev.includes(name) ? prev.filter((c) => c !== name) : [...prev, name]));

  /* ---------- Fetch profile ---------- */
  useEffect(() => {
    if (!uid) return;
    const loadProfile = async () => {
      try {
        const snap = await getDoc(doc(db, 'users', uid));
        if (snap.exists()) {
          const data = snap.data();
          if (data.photoURL) setPhotoURL(data.photoURL);
          if (data.dietary) setDietary(data.dietary);
          if (data.cuisines) setCuisines(data.cuisines);
        }
      } catch (e) {
        console.error('Error loading profile', e);
      }
    };
    loadProfile();
  }, [uid]);

  /* ---------- Past matches ---------- */
  useEffect(() => {
    if (!uid) return;
    const fetchMatches = async () => {
      try {
        const q = query(collection(db, 'matches'), where('participants', 'array-contains', uid));
        const snap = await getDocs(q);
        setMatches(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
      } catch (e) {
        console.error('Error fetching matches', e);
      }
    };
    fetchMatches();
  }, [uid]);

  /* ---------- Image picking ---------- */
  const pickImage = useCallback(async () => {
    if (!uid) return;
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.status !== 'granted') {
      Alert.alert('Permission required', 'Camera roll permissions are needed to change the avatar');
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.7,
    });
    if (result.cancelled) return;

    try {
      const response = await fetch(result.uri);
      const blob = await response.blob();
      const avatarRef = storageRef(storage, `avatars/${uid}.jpg`);
      await uploadBytes(avatarRef, blob);
      const url = await getDownloadURL(avatarRef);
      await updateDoc(doc(db, 'users', uid), { photoURL: url });
      await user.updateProfile({ photoURL: url });
      setPhotoURL(url);
    } catch (e) {
      console.error('Upload error', e);
      Alert.alert('Upload failed', 'Sorry, we could not upload the photo.');
    }
  }, [uid]);

  /* ---------- Save ---------- */
  const handleSave = async () => {
    if (!uid) return;
    setIsSaving(true);
    try {
      await setDoc(
        doc(db, 'users', uid),
        { dietary, cuisines, photoURL },
        { merge: true },
      );
      Alert.alert('Saved', 'Your profile was updated');
    } catch (e) {
      console.error('Save error', e);
      Alert.alert('Error', 'Could not save profile');
    } finally {
      setIsSaving(false);
    }
  };

  /* ---------- Render ---------- */
  const renderCuisine = ({ item }) => (
    <CheckBox
      title={item}
      checked={cuisines.includes(item)}
      onPress={() => toggleCuisine(item)}
      containerStyle={styles.checkboxContainer}
    />
  );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Avatar */}
      <TouchableOpacity onPress={pickImage} style={styles.avatarWrapper}>
        <Avatar
          size="xlarge"
          rounded
          source={photoURL ? { uri: photoURL } : require('../../../assets/images/avatar.png')}
        >
          <Avatar.Accessory size={30} />
        </Avatar>
        <Text style={styles.changePhotoTxt}>Change photo</Text>
      </TouchableOpacity>

      {/* Dietary preferences */}
      <Text style={styles.sectionTitle}>Dietary preferences</Text>
      {DIETARY_OPTIONS.map((opt) => (
        <CheckBox
          key={opt.key}
          title={opt.label}
          checked={dietary[opt.key]}
          onPress={() => toggleDiet(opt.key)}
          containerStyle={styles.checkboxContainer}
        />
      ))}

      {/* Favourite cuisines */}
      <Text style={styles.sectionTitle}>Favourite cuisines</Text>
      <FlatList
        data={CUISINES}
        keyExtractor={(item) => item}
        renderItem={renderCuisine}
        scrollEnabled={false}
      />

      {/* Save */}
      <Button
        title="Save"
        loading={isSaving}
        onPress={handleSave}
        buttonStyle={{ backgroundColor: colors.primary, marginVertical: 20 }}
      />

      {/* Past matches */}
      <Text style={styles.sectionTitle}>Past matches</Text>
      {matches.length === 0 ? (
        <Text style={{ color: colors.gray, marginBottom: 30 }}>No past matches yet.</Text>
      ) : (
        matches.map((m) => (
          <View key={m.id} style={styles.matchItem}>
            <Text style={{ fontWeight: 'bold' }}>{m.winnerName || m.venueName}</Text>
            <Text style={{ color: colors.gray }}>{new Date(m.matchedAt?.seconds * 1000).toDateString()}</Text>
          </View>
        ))
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  avatarWrapper: {
    alignItems: 'center',
    marginBottom: 20,
  },
  changePhotoTxt: {
    color: colors.primary,
    marginTop: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 15,
  },
  checkboxContainer: {
    backgroundColor: 'transparent',
    borderWidth: 0,
    paddingHorizontal: 0,
  },
  matchItem: {
    marginBottom: 15,
  },
});