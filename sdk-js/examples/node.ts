import { RolloutForgeClient } from '@ashmit-s/rolloutforge-sdk';

const rolloutForge = new RolloutForgeClient({
  host: 'https://rolloutforge.fly.dev',
  environment: 'production',
  cacheTTL: 30,
});

const enabled = await rolloutForge.evaluate('new-checkout-flow', false, 'user-123');

console.log(`new-checkout-flow enabled: ${enabled}`);
