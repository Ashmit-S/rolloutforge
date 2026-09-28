import { RolloutForgeClient } from '@ashmit-s/rolloutforge-sdk';

// Local mode: poll a snapshot in the background and evaluate flags locally,
// with no network request per check. Falls back to the last good snapshot if a
// refresh fails, and to the default value before any snapshot has loaded.
const rolloutForge = new RolloutForgeClient({
  host: 'https://rolloutforge.fly.dev',
  environment: 'production',
  mode: 'local',
  pollIntervalSeconds: 30,
});

await rolloutForge.start();

const enabled = await rolloutForge.evaluate('new-checkout-flow', false, 'user-123');
console.log(`new-checkout-flow enabled: ${enabled}`);

// evaluateWithTrace explains the decision (reason + trace).
const { reason, trace } = await rolloutForge.evaluateWithTrace('new-checkout-flow', false, 'user-123');
console.log(`reason: ${reason}, bucket: ${trace.bucket}, stale: ${trace.stale}`);

rolloutForge.stop();
