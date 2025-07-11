interface User {
  id: number;
  email: string;
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  role: string;
}

interface LoginCredentials {
  email: string;
  password: string;
}

interface RegisterData {
  email: string;
  username: string;
  password: string;
}

interface UserData {
  id: number;
  email: string;
  username: string;
  firstName: string;
  lastName: string;
  role: string;
  token: string;
}

interface LoginResponse {
  success: boolean;
  user?: UserData;
  token?: string;
  error?: string;
}

interface RegisterResponse {
  success: boolean;
  message?: string;
  error?: string;
}

interface TokenData {
  userId: number;
  email: string;
  exp: number;
}

export const mockAuthService = {
  defaultUser: {
    id: 1,
    email: "admin@themesbrand.com",
    username: "admin",
    password: "123456",
    firstName: "Admin",
    lastName: "User",
    role: "admin",
  } as User,

  getUsers: (): User[] => {
    const users = localStorage.getItem("users");
    if (users) {
      return JSON.parse(users);
    } else {
      const defaultUsers = [mockAuthService.defaultUser];
      localStorage.setItem("users", JSON.stringify(defaultUsers));
      return defaultUsers;
    }
  },

  saveUsers: (users: User[]): void => {
    localStorage.setItem("users", JSON.stringify(users));
  },

  login: async (credentials: LoginCredentials): Promise<LoginResponse> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const { email, password } = credentials;
        const users = mockAuthService.getUsers();

        const user = users.find(
          (u: User) => u.email === email && u.password === password
        );

        if (user) {
          const token = btoa(
            JSON.stringify({
              userId: user.id,
              email: user.email,
              exp: Date.now() + 24 * 60 * 60 * 1000,
            })
          );

          const userData: UserData = {
            id: user.id,
            email: user.email,
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            role: user.role,
            token: token,
          };

          localStorage.setItem("authToken", token);
          localStorage.setItem("userData", JSON.stringify(userData));

          resolve({
            success: true,
            user: userData,
            token: token,
          });
        } else {
          reject(new Error("Invalid email or password"));
        }
      }, 1000);
    });
  },

  register: async (userData: RegisterData): Promise<RegisterResponse> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const { email, username, password } = userData;
        const users = mockAuthService.getUsers();

        const existingUser = users.find(
          (u: User) => u.email === email || u.username === username
        );

        if (existingUser) {
          reject(new Error("User already exists with this email or username"));
        } else {
          const newUser: User = {
            id: users.length + 1,
            email,
            username,
            password,
            firstName: username,
            lastName: "",
            role: "user",
          };

          users.push(newUser);
          mockAuthService.saveUsers(users);

          resolve({
            success: true,
            message: "User registered successfully",
          });
        }
      }, 1000);
    });
  },

  isAuthenticated: (): boolean => {
    const token = localStorage.getItem("authToken");
    if (!token) return false;

    try {
      const tokenData: TokenData = JSON.parse(atob(token));
      return tokenData.exp > Date.now();
    } catch (error) {
      return false;
    }
  },

  getCurrentUser: (): UserData | null => {
    const userData = localStorage.getItem("userData");
    return userData ? JSON.parse(userData) : null;
  },

  logout: (): void => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userData");
  },
};
