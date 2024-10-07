// services/authService.ts
import { supabase } from '@/services/supabaseClient';
import bcrypt from 'bcryptjs';

export const loginUser = async (username: string, password: string) => {
  console.log("Attempting login with:", { username, password });

  // Fetch the user from the Supabase database
  const { data, error } = await supabase
    .from("users")
    .select("id, username, password") // Assuming the password is stored in hashed format
    .eq("username", username)
    .single();

  if (error || !data) {
    console.log("Login failed: User not found");
    throw new Error("Invalid username or password");
  }

  // Compare the plain text password with the hashed password
  const isPasswordMatch = await bcrypt.compare(password, data.password);
  if (!isPasswordMatch) {
    console.log("Login failed: Incorrect password");
    throw new Error("Invalid username or password");
  }

  console.log("Login successful:", { id: data.id, username: data.username });
  return { id: data.id, username: data.username };
};

export const signupUser = async (username: string, email: string, password: string) => {
  console.log("Attempting signup with:", { username, email });

  // Hash the password before storing it
  const hashedPassword = await bcrypt.hash(password, 10);

  // Insert the new user into the Supabase database
  const { error } = await supabase
    .from("users")
    .insert([{ username, email, password: hashedPassword }]); // Store the hashed password

  if (error) {
    console.log("Signup failed:", error.message);
    throw new Error("Signup failed, please try again.");
  }

  console.log("Signup successful:", { username });
  return { username }; // Only return the username
};

export const logoutUser = async () => {
  // Simulate an API call to log out the user
  return true;
};
