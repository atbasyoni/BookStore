export interface User{
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  fullName?: string; // Optional computed property
  // ... other relevant user details (address, phone number, etc.)
  // ... additional fields based on your specific requirements
  createdAt?: Date;
  updatedAt?: Date;
  role?: string; // User role (e.g., "customer", "admin")
  // ... authentication-related fields (password hash, tokens, etc.)
  // ... other custom user data as needed
}