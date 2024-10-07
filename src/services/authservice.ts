// services/authService.ts
import { supabase } from '@/services/supabaseClient';
import bcrypt from 'bcryptjs';
import { createJWT, verifyJWT } from './jwt'; // Import createJWT and verifyJWT
import { NextResponse } from 'next/server';

export const loginUser = async (username: string, password: string) => {
  console.log("Attempting login with:", { username, password });

  const { data, error } = await supabase
    .from("users")
    .select("id, username, password")
    .eq("username", username)
    .single();

  if (error || !data) {
    console.log("Login failed: User not found");
    throw new Error("Invalid username or password");
  }

  const isPasswordMatch = await bcrypt.compare(password, data.password);
  if (!isPasswordMatch) {
    console.log("Login failed: Incorrect password");
    throw new Error("Invalid username or password");
  }

  // Create JWT upon successful login
  const token = await createJWT({ id: data.id, username: data.username });
  console.log("Login successful:", { id: data.id, username: data.username, token });

  // Decrypt and log the token payload
  try {
    const decryptedPayload = await verifyJWT(token); // Use the verifyJWT function to get the payload
    console.log('Decrypted Payload after Login:', decryptedPayload);
  } catch (error) {
    console.error('Failed to decrypt token:', error);
  }

  return { id: data.id, username: data.username, token };
};

export const decryptToken = async (token: string) => {
  if (!token) {
    throw new Error("No token provided");
  }

  try {
    // Use the correct secret for verification
    const payload = await verifyJWT(token);
    console.log('Decrypted Payload:', payload);
    return payload;
  } catch (error) {
    console.error('Error decrypting token:', error);
    throw new Error("Failed to decrypt token");
  }
};

export const signupUser = async (username: string, email: string, password: string) => {
  console.log("Attempting signup with:", { username, email });

  // Hash the password before storing it
  const hashedPassword = await bcrypt.hash(password, 10);

  const { error } = await supabase
    .from("users")
    .insert([{ username, email, password: hashedPassword }]);

  if (error) {
    console.log("Signup failed:", error.message);
    throw new Error("Signup failed, please try again.");
  }

  console.log("Signup successful:", { username });
  return { username };
};

export const logoutUser = async () => {
  // Simulate an API call to log out the user
  return true;
};
