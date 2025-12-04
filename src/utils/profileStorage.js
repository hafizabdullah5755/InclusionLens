// src/utils/profileStorage.js

const STORAGE_KEY = "inclusionlens_demo_profile_v1";

const EMPTY_PROFILE = {
  classes: [],
};

// Safe localStorage access (so it won't break if disabled)
function canUseLocalStorage() {
  try {
    const testKey = "__il_test__";
    window.localStorage.setItem(testKey, "1");
    window.localStorage.removeItem(testKey);
    return true;
  } catch {
    return false;
  }
}

export function loadProfile() {
  if (!canUseLocalStorage()) return { ...EMPTY_PROFILE };

  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (!raw) {
    return { ...EMPTY_PROFILE };
  }

  try {
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object") return { ...EMPTY_PROFILE };
    if (!Array.isArray(parsed.classes)) parsed.classes = [];
    return parsed;
  } catch {
    return { ...EMPTY_PROFILE };
  }
}

export function saveProfile(profile) {
  if (!canUseLocalStorage()) return;

  try {
    const safeProfile = {
      classes: Array.isArray(profile.classes) ? profile.classes : [],
    };
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(safeProfile));
  } catch {
    // Fail silently – never crash the UI
  }
}

// Optional: seed with a demo class if profile is empty
export function ensureDemoProfile(profile) {
  if (profile.classes.length > 0) return profile;

  const demoClassId = "year3-demo";
  return {
    classes: [
      {
        id: demoClassId,
        label: "Year 3 – Demo Class",
        phase: "Primary",
        year: 3,
        learners: [
          {
            id: "learner-a",
            alias: "Learner A",
            needs: ["ADHD", "SLCN"],
            notes:
              "Prefers short, clear instructions and benefits from movement breaks.",
            keySupports: [
              "Visual checklist on desk",
              "Pre-agreed non-verbal cue for refocus",
            ],
          },
          {
            id: "learner-b",
            alias: "Learner B",
            needs: ["Autism"],
            notes:
              "Values predictable routines and advance warning of transitions.",
            keySupports: [
              "Visual timetable",
              "Quiet working space available when overwhelmed",
            ],
          },
        ],
      },
    ],
  };
}
