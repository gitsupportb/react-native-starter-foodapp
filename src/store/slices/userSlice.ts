import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { User, UserPreferences, FirebaseError } from '../../types';
import { auth, db } from '../../../App';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  signOut,
  updateProfile,
  GoogleAuthProvider,
  signInWithCredential
} from 'firebase/auth';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';

interface UserState {
  currentUser: User | null;
  isLoading: boolean;
  error: string | null;
  isAuthenticated: boolean;
}

const initialState: UserState = {
  currentUser: null,
  isLoading: false,
  error: null,
  isAuthenticated: false,
};

// Async thunks
export const loginWithEmail = createAsyncThunk(
  'user/loginWithEmail',
  async ({ email, password }: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const userDoc = await getDoc(doc(db, 'users', userCredential.user.uid));
      
      if (userDoc.exists()) {
        return { id: userCredential.user.uid, ...userDoc.data() } as User;
      } else {
        throw new Error('User profile not found');
      }
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const registerWithEmail = createAsyncThunk(
  'user/registerWithEmail',
  async ({ 
    email, 
    password, 
    displayName 
  }: { 
    email: string; 
    password: string; 
    displayName: string;
  }, { rejectWithValue }) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      
      // Update auth profile
      await updateProfile(userCredential.user, { displayName });
      
      // Create user profile in Firestore
      const newUser: User = {
        id: userCredential.user.uid,
        email: email,
        displayName: displayName,
        photoURL: undefined,
        phoneNumber: undefined,
        createdAt: new Date(),
        updatedAt: new Date(),
        preferences: {
          dietaryRestrictions: [],
          favoriteCuisines: [],
          preferredPriceRange: [1, 2, 3, 4],
          defaultRadius: 5,
          notifications: {
            matchFound: true,
            friendJoined: true,
            newSuggestions: true,
            marketing: false,
          }
        },
        stats: {
          totalMatches: 0,
          totalSwipes: 0,
          favoriteRestaurants: 0,
          friendsConnected: 0,
        }
      };
      
      await setDoc(doc(db, 'users', userCredential.user.uid), newUser);
      return newUser;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const loginWithGoogle = createAsyncThunk(
  'user/loginWithGoogle',
  async (googleCredential: any, { rejectWithValue }) => {
    try {
      const credential = GoogleAuthProvider.credential(googleCredential.idToken);
      const userCredential = await signInWithCredential(auth, credential);
      
      const userDoc = await getDoc(doc(db, 'users', userCredential.user.uid));
      
      if (userDoc.exists()) {
        return { id: userCredential.user.uid, ...userDoc.data() } as User;
      } else {
        // Create new user profile for Google sign-in
        const newUser: User = {
          id: userCredential.user.uid,
          email: userCredential.user.email!,
          displayName: userCredential.user.displayName!,
          photoURL: userCredential.user.photoURL || undefined,
          phoneNumber: userCredential.user.phoneNumber || undefined,
          createdAt: new Date(),
          updatedAt: new Date(),
          preferences: {
            dietaryRestrictions: [],
            favoriteCuisines: [],
            preferredPriceRange: [1, 2, 3, 4],
            defaultRadius: 5,
            notifications: {
              matchFound: true,
              friendJoined: true,
              newSuggestions: true,
              marketing: false,
            }
          },
          stats: {
            totalMatches: 0,
            totalSwipes: 0,
            favoriteRestaurants: 0,
            friendsConnected: 0,
          }
        };
        
        await setDoc(doc(db, 'users', userCredential.user.uid), newUser);
        return newUser;
      }
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const logout = createAsyncThunk(
  'user/logout',
  async (_, { rejectWithValue }) => {
    try {
      await signOut(auth);
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateUserProfile = createAsyncThunk(
  'user/updateProfile',
  async (updates: Partial<User>, { rejectWithValue, getState }) => {
    try {
      const state = getState() as any;
      const userId = state.user.currentUser?.id;
      
      if (!userId) {
        throw new Error('User not authenticated');
      }
      
      const updatedData = {
        ...updates,
        updatedAt: new Date(),
      };
      
      await updateDoc(doc(db, 'users', userId), updatedData);
      return updatedData;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateUserPreferences = createAsyncThunk(
  'user/updatePreferences',
  async (preferences: Partial<UserPreferences>, { rejectWithValue, getState }) => {
    try {
      const state = getState() as any;
      const userId = state.user.currentUser?.id;
      
      if (!userId) {
        throw new Error('User not authenticated');
      }
      
      await updateDoc(doc(db, 'users', userId), {
        preferences: preferences,
        updatedAt: new Date(),
      });
      
      return preferences;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

// Slice
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    setUser: (state, action: PayloadAction<User>) => {
      state.currentUser = action.payload;
      state.isAuthenticated = true;
      state.isLoading = false;
      state.error = null;
    },
    clearUser: (state) => {
      state.currentUser = null;
      state.isAuthenticated = false;
      state.isLoading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Login with email
    builder
      .addCase(loginWithEmail.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginWithEmail.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentUser = action.payload;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(loginWithEmail.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    // Register with email
    builder
      .addCase(registerWithEmail.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(registerWithEmail.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentUser = action.payload;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(registerWithEmail.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    // Login with Google
    builder
      .addCase(loginWithGoogle.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginWithGoogle.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentUser = action.payload;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(loginWithGoogle.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    // Logout
    builder
      .addCase(logout.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logout.fulfilled, (state) => {
        state.isLoading = false;
        state.currentUser = null;
        state.isAuthenticated = false;
        state.error = null;
      })
      .addCase(logout.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    // Update profile
    builder
      .addCase(updateUserProfile.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        if (state.currentUser) {
          state.currentUser = { ...state.currentUser, ...action.payload };
        }
        state.error = null;
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    // Update preferences
    builder
      .addCase(updateUserPreferences.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateUserPreferences.fulfilled, (state, action) => {
        state.isLoading = false;
        if (state.currentUser) {
          state.currentUser.preferences = { ...state.currentUser.preferences, ...action.payload };
        }
        state.error = null;
      })
      .addCase(updateUserPreferences.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearError, setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;