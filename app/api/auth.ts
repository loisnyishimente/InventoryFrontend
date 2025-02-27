import axios from "axios";

const BASE_URL = "http://172.16.0.114:5000";

export interface LoginResponse {
  token: string;
  role: string;
  message?: string;

}export const login = async (email: string, password: string) => {
  try {
    const response = await fetch(`${BASE_URL}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    console.log("Login API Response:", data); // Debugging

    return data;
  } catch (error) {
    console.error("Login request failed:", error);
    throw new Error("Network error");
  }
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
  