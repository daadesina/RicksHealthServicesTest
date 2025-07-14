import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {
  Alert,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { MyImages } from './assets/images';

type Shift = {
  id: number;
  date: string;
  time: {
    start: string;
    end: string;
  };
  is_booked: boolean;
};

export default function Dashboard() {
  const [shifts, setShifts] = useState<Shift[]>([]);
  const navigation = useNavigation();

  const fetchShifts = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/shifts', {
        withCredentials: true,
      });
      setShifts(response.data);
    } catch (error) {
      Alert.alert('Login Required', 'Please log in to access the dashboard.', [
        { text: 'OK', onPress: () => navigation.navigate('Login' as never) },
      ]);
    }
  };

  const handleBookShift = async (shiftId: number) => {
    try {
      const response = await axios.post(
        `http://localhost:5000/api/book/${shiftId}`,
        {},
        { withCredentials: true }
      );
      if (response.status === 200) {
        Alert.alert('Success', 'Shift Booked Successfully');
        fetchShifts();
      }
    } catch (error) {
      Alert.alert('Error', 'Something went wrong');
    }
  };

  const handleLogOut = async () => {
    Alert.alert('Confirm Logout', 'Are you sure you want to log out?', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Log Out',
        style: 'destructive',
        onPress: async () => {
          try {
            const response = await axios.post(
              'http://localhost:5000/api/logout',
              {},
              { withCredentials: true }
            );
            if (response.status === 200) {
              navigation.navigate('Login' as never);
            }
          } catch (error) {
            Alert.alert('Error', 'Logout failed');
          }
        },
      },
    ]);
  };

  useEffect(() => {
    fetchShifts();
  }, []);

  const renderItem = ({ item }: { item: Shift }) => {
    const dateStr = new Date(item.date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

    return (
      <View style={styles.card}>
        <Text style={styles.date}>{dateStr}</Text>
        <Text style={styles.time}>
          {item.time.start} to {item.time.end}
        </Text>

        {item.is_booked ? (
          <Image source={MyImages.mark_badge} style={styles.badge} />
        ) : (
          <Text style={styles.available}>Available</Text>
        )}

        {item.is_booked ? (
          <Text style={styles.booked}>Booked</Text>
        ) : (
          <TouchableOpacity
            style={styles.bookButton}
            onPress={() => handleBookShift(item.id)}
          >
            <Text style={styles.bookButtonText}>Book Shift</Text>
          </TouchableOpacity>
        )}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('Login' as never)}>
          <Image source={MyImages.logo} style={styles.logo} />
        </TouchableOpacity>

        <TouchableOpacity onPress={handleLogOut}>
          <Image source={MyImages.logo} style={styles.profilePic} />
        </TouchableOpacity>
      </View>

      {/* Shifts Grid */}
      <FlatList
        data={shifts}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        contentContainerStyle={styles.grid}
        renderItem={renderItem}
      />
    </View>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logo: {
    width: 60,
    height: 60,
    resizeMode: 'contain',
  },
  profilePic: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
  },
  grid: {
    paddingTop: 20,
    paddingBottom: 50,
  },
  card: {
    backgroundColor: '#E4E3E3',
    borderRadius: 20,
    padding: 15,
    width: '45%',
    margin: 10,
    justifyContent: 'space-between',
    height: 180,
  },
  date: {
    fontSize: 16,
    color: '#1F1E1E',
    fontWeight: '600',
  },
  time: {
    fontSize: 13,
    color: '#1F1E1E',
    marginVertical: 4,
  },
  available: {
    backgroundColor: '#D4D2D2',
    color: '#1F1E1E',
    fontSize: 12,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
    alignSelf: 'flex-start',
    marginTop: 4,
  },
  badge: {
    width: 28,
    height: 28,
    marginTop: 6,
  },
  booked: {
    backgroundColor: '#D4D2D2',
    textAlign: 'center',
    paddingVertical: 8,
    borderRadius: 10,
    marginTop: 10,
    color: '#1F1E1E',
    fontWeight: '500',
  },
  bookButton: {
    backgroundColor: '#2B2B2B',
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 10,
  },
  bookButtonText: {
    color: '#E4E3E3',
    textAlign: 'center',
    fontWeight: '600',
  },
});
