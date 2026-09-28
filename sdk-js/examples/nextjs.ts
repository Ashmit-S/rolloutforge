import { RolloutForgeClient } from '@ashmit-s/rolloutforge-sdk';

const rolloutForge = new RolloutForgeClient({
  host: process.env.ROLLOUTFORGE_API_URL || 'https://rolloutforge.fly.dev',
  environment: 'production',
  cacheTTL: 30,
});

export async function getCheckoutVariant(userId: string) {
  return rolloutForge.evaluate('new-checkout-flow', false, userId);
}
