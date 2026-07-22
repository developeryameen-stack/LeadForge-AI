import User from "../models/User";
import { generateToken } from "../utils/jwt";

interface RegisterUserData {
  name: string;
  email: string;
  password: string;
}

interface UpdateProfileData {
  companyName?: string;
  jobTitle?: string;
  website?: string;
  industry?: string;
  country?: string;
  timezone?: string;
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

  // 👇 Add this method here
  async login(email: string, password: string) {
    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      throw new Error("Invalid email or password.");
    }

    const isPasswordValid = await user.comparePassword(password);

    if (!isPasswordValid) {
      throw new Error("Invalid email or password.");
    }

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


  async updateProfile(userId: string, data: UpdateProfileData) {
  const user = await User.findByIdAndUpdate(
    userId,
    {
      $set: data,
    },
    {
      new: true,
      runValidators: true,
    }
  ).select("-password");

  if (!user) {
    throw new Error("User not found.");
  }

  return user;
}

}

export default new AuthService();