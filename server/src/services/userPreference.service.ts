import UserPreference from "../models/UserPreference";

interface UpdatePreferenceData {
  targetIndustries?: string[];
  targetPlatforms?: string[];
  keywords?: string[];
  excludedKeywords?: string[];
  preferredCountries?: string[];
  notificationFrequency?: "instant" | "daily" | "weekly";
  aiModel?: string;
  leadScoreThreshold?: number;
}

class UserPreferenceService {
  async getPreferences(userId: string) {
    let preferences = await UserPreference.findOne({ user: userId });

    if (!preferences) {
      preferences = await UserPreference.create({
        user: userId,
      });
    }

    return preferences;
  }

  async updatePreferences(
    userId: string,
    data: UpdatePreferenceData
  ) {
    const preferences = await UserPreference.findOneAndUpdate(
      { user: userId },
      { $set: data },
      {
        new: true,
        upsert: true,
        runValidators: true,
      }
    );

    return preferences;
  }
}

export default new UserPreferenceService();