const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!;

type SupabaseResponse<T = Record<string, unknown>> = {
  data: T | null;
  error: string | null;
};

export async function insertRow<T = Record<string, unknown>>(
  table: string,
  row: Record<string, unknown>,
): Promise<SupabaseResponse<T>> {
  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/${table}`, {
      method: "POST",
      headers: {
        apikey: SUPABASE_KEY,
        Authorization: `Bearer ${SUPABASE_KEY}`,
        "Content-Type": "application/json",
        Prefer: "return=representation",
      },
      body: JSON.stringify(row),
    });

    const body = await res.json();

    if (!res.ok) {
      const msg = body?.message || body?.error || JSON.stringify(body);
      console.error(`[Supabase] INSERT ${table} failed (${res.status}):`, msg);
      return { data: null, error: msg };
    }

    const data = Array.isArray(body) ? body[0] : body;
    return { data: data as T, error: null };
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Unknown error";
    console.error(`[Supabase] INSERT ${table} exception:`, msg);
    return { data: null, error: msg };
  }
}

export async function updateRow(
  table: string,
  id: string,
  updates: Record<string, unknown>,
): Promise<SupabaseResponse> {
  try {
    const res = await fetch(
      `${SUPABASE_URL}/rest/v1/${table}?id=eq.${id}`,
      {
        method: "PATCH",
        headers: {
          apikey: SUPABASE_KEY,
          Authorization: `Bearer ${SUPABASE_KEY}`,
          "Content-Type": "application/json",
          Prefer: "return=representation",
        },
        body: JSON.stringify(updates),
      },
    );

    const body = await res.json();

    if (!res.ok) {
      const msg = body?.message || body?.error || JSON.stringify(body);
      console.error(`[Supabase] UPDATE ${table} failed (${res.status}):`, msg);
      return { data: null, error: msg };
    }

    const data = Array.isArray(body) ? body[0] : body;
    return { data: data ?? null, error: null };
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Unknown error";
    console.error(`[Supabase] UPDATE ${table} exception:`, msg);
    return { data: null, error: msg };
  }
}
