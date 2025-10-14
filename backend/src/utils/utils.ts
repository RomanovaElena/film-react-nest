export function generateId(): string {
  const timestamp = Date.now().toString(36);
  const random = Math.floor(Math.random() * 1e8).toString(36);
  return `${timestamp}-${random}`;
}