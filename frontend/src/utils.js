export async function copyText(text, toast) {
  try {
    await navigator.clipboard.writeText(text);
    toast("Link copied");
  } catch {
    toast("Copy failed. Select the link and copy it manually.");
  }
}
