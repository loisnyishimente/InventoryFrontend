import axios from "axios";

const BASE_URL = "http://172.16.0.101:5000";

// Example login function (you may need to adjust this according to your actual API)
export const login = async (email: string, password: string): Promise<{ token: string, role: string }> => {
    const response = await fetch(`${BASE_URL}/api/auth/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });
  
    if (!response.ok) {
      throw new Error('Invalid credentials');
    }
  
    const data = await response.json();
    return {
      token: data.token, // Assuming the API returns a token
      role: data.role,   // Assuming the API returns a role
    };
  };
  
  

// api/auth.ts
export async function signup({
    name,
    email,
    password,
    role, // Add role to the parameter type
  }: {
    name: string;
    email: string;
    password: string;
    role: string; // Add role as a string type
  }) {
    try {
      const response = await fetch(`${BASE_URL}/api/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, role }), // Pass role in the body
      });
      return await response.json();
    } catch (error) {
      console.log(error);
      return { success: false, message: "Network error" };
    }
  }
  