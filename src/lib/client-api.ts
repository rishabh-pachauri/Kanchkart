export function readCookie(name: string) {
  if (typeof document === "undefined") return "";
  return document.cookie
    .split("; ")
    .find((row) => row.startsWith(`${name}=`))
    ?.split("=")[1];
}

export async function apiFetch<T>(url: string, init: RequestInit = {}) {
  const headers = new Headers(init.headers);
  if (!(init.body instanceof FormData) && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }
  const csrf = readCookie("kk_csrf");
  if (csrf) headers.set("x-csrf-token", decodeURIComponent(csrf));

  const response = await fetch(url, {
    ...init,
    headers,
    credentials: "include"
  });
  const payload = (await response.json().catch(() => ({}))) as T & {
    error?: { message?: string };
  };
  if (!response.ok) throw new Error(payload.error?.message ?? "Request failed");
  return payload as T;
}

export function addCartItem(item: { id: string; name: string; price: number; image: string; slug: string }) {
  const current = JSON.parse(localStorage.getItem("kanchkart_cart") ?? "[]") as Array<
    typeof item & { quantity: number }
  >;
  const existing = current.find((cartItem) => cartItem.id === item.id);
  const next = existing
    ? current.map((cartItem) =>
        cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
      )
    : [...current, { ...item, quantity: 1 }];
  localStorage.setItem("kanchkart_cart", JSON.stringify(next));
  window.dispatchEvent(new CustomEvent("kanchkart-cart"));
}
