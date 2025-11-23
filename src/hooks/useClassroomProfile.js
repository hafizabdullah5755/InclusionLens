import { useEffect, useState } from "react";

const STORAGE_KEY = "inclusionlens_classroom_profile_v1";

const DEFAULT_PROFILE = {
  needs: [],   // e.g., ["ADHD", "Dyslexia"]
  notes: "",   // teacher free text
};

export default function useClassroomProfile() {
  const [profile, setProfile] = useState(DEFAULT_PROFILE);
  const [loaded, setLoaded] = useState(false);

  // Load from localStorage once
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setProfile(JSON.parse(raw));
    } catch (e) {
      console.warn("Profile load failed, using default.", e);
    } finally {
      setLoaded(true);
    }
  }, []);

  // Save whenever profile changes
  useEffect(() => {
    if (!loaded) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
    } catch (e) {
      console.warn("Profile save failed.", e);
    }
  }, [profile, loaded]);

  const toggleNeed = (need) => {
    setProfile((prev) => {
      const exists = prev.needs.includes(need);
      return {
        ...prev,
        needs: exists
          ? prev.needs.filter((n) => n !== need)
          : [...prev.needs, need],
      };
    });
  };

  const clearProfile = () => setProfile(DEFAULT_PROFILE);

  return { profile, setProfile, toggleNeed, clearProfile, loaded };
}
