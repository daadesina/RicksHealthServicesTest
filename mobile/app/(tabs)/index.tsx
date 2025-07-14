import axios from 'axios';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Alert, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { MyImages } from './assets/images';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        'http://localhost:5000/api/login',
        {
          email: email.trim(),
          password: password.trim(),
        },
        {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.status === 200) {
        router.push('/dashboard'); // Route to your dashboard screen
      }
    } catch (error) {
      Alert.alert('Login Failed', 'Invalid email or password.');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Image source={MyImages.logo} style={styles.logo} resizeMode="contain" />

        <Text style={styles.title}>Welcome back! Please log in</Text>

        <View style={styles.inputGroup}>
          <TextInput
            placeholder="Email"
            placeholderTextColor="rgba(228, 227, 227, 0.3)"
            style={styles.input}
            value={email}
            onChangeText={setEmail}
          />

          <TextInput
            placeholder="Password"
            placeholderTextColor="rgba(228, 227, 227, 0.3)"
            secureTextEntry
            style={styles.input}
            value={password}
            onChangeText={setPassword}
          />
        </View>

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>

        <Text style={styles.signupText}>Don't have an account? Sign up</Text>
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1F1E1E',
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    width: 350,
    backgroundColor: '#1F1E1E',
    borderRadius: 16,
    paddingVertical: 24,
    paddingHorizontal: 24,
    alignItems: 'center',
  },
  logo: {
    width: 100,
    height: 60,
    marginBottom: 16,
  },
  title: {
    color: '#E4E3E3',
    fontSize: 20,
    marginBottom: 20,
  },
  inputGroup: {
    width: '100%',
    marginBottom: 30,
  },
  input: {
    backgroundColor: '#2F2E2E',
    color: '#E4E3E3',
    fontSize: 16,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 10,
    marginBottom: 16,
  },
  button: {
    backgroundColor: '#2B2B2B',
    width: '100%',
    paddingVertical: 12,
    borderRadius: 999,
    alignItems: 'center',
  },
  buttonText: {
    color: '#E4E3E3',
    fontSize: 16,
  },
  signupText: {
    color: '#E4E3E3',
    fontSize: 16,
    marginTop: 16,
  },
});
