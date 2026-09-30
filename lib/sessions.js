const PLAN_LIMITS = {
  free: { maxGuests: 15, durationHours: 2 },
  party_pass: { maxGuests: null, durationHours: 24 },
  venue: { maxGuests: null, durationHours: 24 * 30 }, // never expires
};

export function getSessionLimits(plan) {
  return PLAN_LIMITS[plan] ?? PLAN_LIMITS.free;
}

export function calculateExpiry(durationHours) {
  if (!durationHours) return null;
  return new Date(Date.now() + durationHours * 60 * 60 * 1000).toISOString();
}

export function generateJoinCode(length = 6) {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let code = "";
  for (let i = 0; i < length; i++) {
    code += chars[Math.floor(Math.random() * chars.length)];
  }
  return code;
}

export function planAllowsLogo(plan) {
  return plan === "venue";

}