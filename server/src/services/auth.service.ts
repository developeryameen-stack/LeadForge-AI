import User from "../models/User";
import { generateToken } from "../utils/jwt";

interface RegisterUserData {
  name: string;
  email: string;
  password: string;
}

class AuthService {
  async register(data: RegisterUserData) {
    const { name, email, password } = data;

    // Check if user already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      throw new Error("User already exists with this email.");
    }

    // Create new user
    const user = await User.create({
      name,
      email,
      password,
    });

    // Generate JWT
    const token = generateToken(user._id.toString());

    return {
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        isVerified: user.isVerified,
      },
      token,
    };
  }
}

export default new AuthService();