import { supabase } from "@/lib/supabase";

const LS_PREFIX = "nsh-guide-";

interface GuideField {
  guide_id: string;
  field_id: string;
  value: string;
}

// ── localStorage helpers ──────────────────────────────

function lsKey(guideId: string): string {
  return `${LS_PREFIX}${guideId}`;
}

function readLocal(guideId: string): Record<string, string> {
  try {
    const raw = localStorage.getItem(lsKey(guideId));
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function writeLocal(guideId: string, fieldId: string, value: string): void {
  const data = readLocal(guideId);
  data[fieldId] = value;
  localStorage.setItem(lsKey(guideId), JSON.stringify(data));
}

function readAllLocal(guideId: string): GuideField[] {
  const data = readLocal(guideId);
  return Object.entries(data).map(([field_id, value]) => ({
    guide_id: guideId,
    field_id,
    value,
  }));
}

// ── Supabase helpers ──────────────────────────────────

async function getUserId(): Promise<string | null> {
  const { data } = await supabase.auth.getUser();
  return data.user?.id ?? null;
}

// ── Public API ────────────────────────────────────────

/**
 * Save a single field value. Writes to localStorage immediately,
 * then upserts to Supabase if authenticated.
 */
export async function saveField(
  guideId: string,
  fieldId: string,
  value: string,
): Promise<void> {
  // Always write locally first (instant)
  writeLocal(guideId, fieldId, value);

  // Attempt Supabase upsert
  const userId = await getUserId();
  if (!userId) return;

  await supabase.from("guide_responses").upsert(
    {
      user_id: userId,
      guide_id: guideId,
      field_id: fieldId,
      value,
    },
    { onConflict: "user_id,guide_id,field_id" },
  );
}

/**
 * Load all fields for a guide. Tries Supabase first, falls back to localStorage.
 * Merges: Supabase wins on conflict, localStorage fills gaps.
 */
export async function loadGuide(
  guideId: string,
): Promise<Record<string, string>> {
  const local = readLocal(guideId);

  const userId = await getUserId();
  if (!userId) return local;

  const { data, error } = await supabase
    .from("guide_responses")
    .select("field_id, value")
    .eq("user_id", userId)
    .eq("guide_id", guideId);

  if (error || !data) return local;

  // Merge: Supabase values take precedence
  const merged = { ...local };
  for (const row of data) {
    merged[row.field_id] = row.value;
  }

  // Update localStorage with merged data
  localStorage.setItem(lsKey(guideId), JSON.stringify(merged));

  return merged;
}

/**
 * Sync all localStorage data to Supabase.
 * Called on reconnect or when user logs in.
 */
export async function syncToSupabase(guideId: string): Promise<void> {
  const userId = await getUserId();
  if (!userId) return;

  const fields = readAllLocal(guideId);
  if (fields.length === 0) return;

  const rows = fields.map((f) => ({
    user_id: userId,
    guide_id: f.guide_id,
    field_id: f.field_id,
    value: f.value,
  }));

  await supabase
    .from("guide_responses")
    .upsert(rows, { onConflict: "user_id,guide_id,field_id" });
}
