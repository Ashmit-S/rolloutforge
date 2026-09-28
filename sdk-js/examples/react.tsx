import { useEffect, useState } from 'react';
import { RolloutForgeClient } from '@ashmit-s/rolloutforge-sdk';

const rolloutForge = new RolloutForgeClient({
  host: 'https://rolloutforge.fly.dev',
  environment: 'production',
  cacheTTL: 30,
});

export function CheckoutGate({ userId }: { userId: string }) {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    let cancelled = false;

    rolloutForge.evaluate('new-checkout-flow', false, userId).then((value) => {
      if (!cancelled) {
        setEnabled(value);
      }
    });

    return () => {
      cancelled = true;
    };
  }, [userId]);

  return enabled ? <NewCheckout /> : <LegacyCheckout />;
}

function NewCheckout() {
  return <div>New checkout</div>;
}

function LegacyCheckout() {
  return <div>Legacy checkout</div>;
}
