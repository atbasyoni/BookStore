export interface User{
  id: string;
  userName: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  phoneNumber?: string;
  dateOfBirth?: string;
  password: string;
  confirmPassword?: string;

  // ... other relevant user details (address, phone number, etc.)
  // ... additional fields based on your specific requirements
  //createdAt?: Date;
  //updatedAt?: Date;
  //role?: string; // User role (e.g., "customer", "admin")
  // ... authentication-related fields (password hash, tokens, etc.)
  // ... other custom user data as needed
}