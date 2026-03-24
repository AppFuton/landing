export async function onRequestPost(context: { request: Request; env: { DISCORD_WEBHOOK_URL_UNSUBSCRIBE: string } }) {
  try {
    const { email } = await context.request.json();
    
    if (!email || !email.includes('@')) {
      return new Response(JSON.stringify({ error: 'Invalid email' }), { status: 400 });
    }

    const response = await fetch(context.env.DISCORD_WEBHOOK_URL_UNSUBSCRIBE, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        content: `${email}`
      })
    });

    if (!response.ok) {
      throw new Error('Discord webhook failed');
    }

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to unsubscribe' }), { status: 500 });
  }
}
