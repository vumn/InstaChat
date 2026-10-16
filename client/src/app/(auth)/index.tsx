import { View, Text, KeyboardAvoidingView, Platform, ScrollView, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native'
import { useState } from 'react'
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from '@/assets/styles/AuthScreen.styles';
import { LinearGradient } from 'expo-linear-gradient'
import { Colors } from '../../../constants/Colors';
import { SvgXml } from 'react-native-svg';
import {Ionicons} from '@react-native-vector-icons/ionicons'

type Mode = "login" | "register";

export default function AuthScreen() {

  const [mode, setMode] = useState<Mode>("login");
  const [name, setName] = useState("");
  const [handle, setHandle] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [verification, setVerification] = useState("");
  const [loading, setLoading] = useState(false);
  const [verifying, setVerifying] = useState(false);

  const router = useRouter();

  const svgMarkup = `<svg viewBox="0 0 256 256" preserveAspectRatio="xMidYMid"><defs><radialGradient id="messenger__a" cx="19.247%" cy="99.465%" r="108.96%" fx="19.247%" fy="99.465%"><stop offset="0%" stop-color="#09F"/><stop offset="60.975%" stop-color="#A033FF"/><stop offset="93.482%" stop-color="#FF5280"/><stop offset="100%" stop-color="#FF7061"/></radialGradient></defs><path fill="url(#messenger__a)" d="M128 0C55.894 0 0 52.818 0 124.16c0 37.317 15.293 69.562 40.2 91.835 2.09 1.871 3.352 4.493 3.438 7.298l.697 22.77c.223 7.262 7.724 11.988 14.37 9.054L84.111 243.9a10.218 10.218 0 0 1 6.837-.501c11.675 3.21 24.1 4.92 37.052 4.92 72.106 0 128-52.818 128-124.16S200.106 0 128 0Z"/><path fill="#FFF" d="m51.137 160.47 37.6-59.653c5.98-9.49 18.788-11.853 27.762-5.123l29.905 22.43a7.68 7.68 0 0 0 9.252-.027l40.388-30.652c5.39-4.091 12.428 2.36 8.82 8.085l-37.6 59.654c-5.981 9.489-18.79 11.852-27.763 5.122l-29.906-22.43a7.68 7.68 0 0 0-9.25.027l-40.39 30.652c-5.39 4.09-12.427-2.36-8.818-8.085Z"/></svg>
`

  return (
   <SafeAreaView style={styles.safe}>
    <KeyboardAvoidingView style={styles.kav} behavior={Platform.OS === "ios" ? "padding" : undefined}>
      <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">
        {/* Logo */}
        <View style={styles.logoRow}>
          <LinearGradient colors={[Colors.primary, Colors.primaryContainer]} style={styles.logoBox}>
            <SvgXml xml={svgMarkup} width="50%" height="50%" />
          </LinearGradient>
          <Text style={styles.appName}>InstaChat</Text>
        </View>

        {/* Hero text */}
        <Text style={styles.heading}>{mode === "login" ? "Welcome back" : "Create account"}</Text>

        <Text style={styles.subheading}>{mode === "login" ? "Sign in to continue chatting" : "Fill in your details to get started"}</Text>

        {/* Form */}
        <View style={styles.form}>
          {mode === "register" && (
            <>
              <View style={styles.field}>
                <Text style={styles.fieldLabel}>Full Name</Text>
                <TextInput style={styles.input} value={name} onChangeText={setName} placeholder='Your Name' placeholderTextColor={Colors.outlineVariant} autoCapitalize='words'/>
              </View>
              <View style={styles.field}>
                <Text style={styles.fieldLabel}>Username Handle</Text>
                <View style={styles.handleRow}>
                  <Text style={styles.atSign}>@</Text>
                  <TextInput style={[styles.input, styles.handleInput]}
                  value={handle} onChangeText={(v) => setHandle(v.toLowerCase().replace(/\s/g, ""))} placeholder='username' placeholderTextColor={Colors.outlineVariant}/>
                </View>
              </View>
            </>
          )}

          <View style={styles.field}>
            <Text style={styles.fieldLabel}>Email</Text>
            <TextInput style={styles.input} value={email} onChangeText={setEmail} placeholder='youremail@example.com' placeholderTextColor={Colors.outlineVariant}
            keyboardType='email-address' autoCapitalize='none'/>
          </View>
          <View style={styles.field}>
            <Text style={styles.fieldLabel}>Password</Text>
            <TextInput style={styles.input} value={password} onChangeText={setPassword} placeholder='**********' placeholderTextColor={Colors.outlineVariant}
            secureTextEntry/>
          </View>

          {/* Toggle mode */}
          <View style={styles.toggleRow}>
            <Text style={styles.toggleText}>
              {mode === "login" ? "Don't have an account?" : "Already have an account?"}
            </Text>
            <TouchableOpacity onPress={() => setMode(mode === "login" ? "register" : "login")}>
              <Text style={styles.toggleLink}>{mode === "login" ? "Sign up" : "Sign in"}</Text>
            </TouchableOpacity>
          </View>

          {/* submit */}
          <TouchableOpacity disabled={loading} activeOpacity={0.88} style={styles.btnWrapper}>
            <LinearGradient colors={[Colors.primary, Colors.primaryContainer]} start={{x: 0, y: 0}} end={{x: 1, y: 1}} style={styles.btn}>
              {loading ? (
                <ActivityIndicator color={Colors.onPrimary} size="small"/>
              ) : (
                <>
                  <Text style={styles.btnText}>{mode === 'login' ? "Sign In" : "Create Account"}</Text>
                  <Ionicons name='arrow-forward' size={18} color={Colors.onPrimary}/>
                </>
              )}
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
   </SafeAreaView>
  )
}