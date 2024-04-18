export async function handle({ event, resolve }) {
  const response = await resolve(event, {
    preload: () => false,
  });

  return response;
}
