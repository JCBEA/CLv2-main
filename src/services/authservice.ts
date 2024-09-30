// services/authService.ts
export const loginUser = async (email: string, password: string) => {
    // Simulate an API call to authenticate the user
    if (email === 'test@example.com' && password === 'password') {
      return { id: '1', name: 'John Doe', email };
    } else {
      throw new Error('Invalid email or password');
    }
  };
  
  export const logoutUser = async () => {
    // Simulate an API call to log out the user
    return true;
  };
  