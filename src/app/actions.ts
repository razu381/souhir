'use server';

import { revalidatePath } from 'next/cache';
import { createWriteClient } from '@/sanity/writeClient';

export type FormState = { status: 'idle' | 'sent' | 'error'; message?: string };

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Contact + newsletter, one action (plan §10). Submissions land as `message`
 * documents — the client reads correspondence in the same studio as content. */
export async function submitMessage(
  _prev: FormState,
  formData: FormData,
): Promise<FormState> {
  // Honeypot: filled by bots, invisible to people — drop silently.
  if (formData.get('company')) return { status: 'sent' };

  const kind = formData.get('kind') === 'newsletter' ? 'newsletter' : 'contact';
  const email = String(formData.get('email') ?? '').trim();
  if (!EMAIL.test(email)) {
    return { status: 'error', message: 'A valid email address, please.' };
  }
  const name = String(formData.get('name') ?? '').trim().slice(0, 200);
  const message = String(formData.get('message') ?? '').trim().slice(0, 5000);

  const client = createWriteClient();
  if (!client) {
    return {
      status: 'error',
      message: 'The letterbox is not connected yet — write to hello@darsf.com.',
    };
  }

  try {
    await client.create({
      _type: 'message',
      kind,
      name,
      email,
      message,
      createdAt: new Date().toISOString(),
    });
    // A new message never changes the public pages; refresh the correspondence
    // desk for any open studio session.
    revalidatePath('/studio');
    return { status: 'sent' };
  } catch {
    return {
      status: 'error',
      message: 'Could not send just now — write to hello@darsf.com.',
    };
  }
}
