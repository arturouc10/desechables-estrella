const rateLimitMap = new Map();

export function rateLimit(ip: string, limit: number, windowMs: number) {
  const now = Date.now();
  const windowStart = now - windowMs;

  let requestData = rateLimitMap.get(ip) || { count: 0, startTime: now };

  // Reset if the window has passed
  if (requestData.startTime < windowStart) {
    requestData = { count: 0, startTime: now };
  }

  requestData.count++;
  rateLimitMap.set(ip, requestData);

  // Clean up old entries occasionally to prevent memory leaks
  if (rateLimitMap.size > 1000) {
    const keys = Array.from(rateLimitMap.keys());
    for (const key of keys) {
      if (rateLimitMap.get(key).startTime < windowStart) {
        rateLimitMap.delete(key);
      }
    }
  }

  return requestData.count <= limit;
}
