// NOTE: these limits are mirrored in supabase/security-and-constraints.sql
// (the enforce_session_limits trigger). If you change one, change the other.
const PLAN_LIMITS = {
  free: { maxGuests: 15, durationHours: 2 },
  party_pass: { maxGuests: null, durationHours: 24 },
  venue: { maxGuests: null, durationHours: 24 * 30 }, // 30 days
};

export function getSessionLimits(plan) {
  return PLAN_LIMITS[plan] ?? PLAN_LIMITS.free;
}

export function calculateExpiry(durationHours) {
  if (!durationHours) return null; // null = no expiry
  return new Date(Date.now() + durationHours * 60 * 60 * 1000).toISOString();
}

// Unambiguous alphabet (no I, O, 0, 1). 32 characters, so a random byte maps
// onto it with `% 32` without modulo bias (256 is an exact multiple of 32).
const JOIN_CODE_CHARS = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

export function generateJoinCode(length = 6) {
  // Cryptographically secure randomness instead of Math.random(), so codes
  // can't be predicted from previously seen codes.
  const bytes = crypto.getRandomValues(new Uint8Array(length));
  let code = "";
  for (let i = 0; i < length; i++) {
    code += JOIN_CODE_CHARS[bytes[i] % JOIN_CODE_CHARS.length];
  }
  return code;
}

export function planAllowsLogo(plan) {
  return plan === "venue";
}

// PostgREST filter for "this session hasn't expired yet". Treats a NULL
// expires_at as "never expires" (a plain .gt("expires_at", now) would
// silently exclude those rows). Use with: query.or(notExpiredFilter())
export function notExpiredFilter() {
  return `expires_at.is.null,expires_at.gt.${new Date().toISOString()}`;
}
