import { wait } from '../utils';

const { useSyncedState, useEffect } = figma.widget;

export function useCountdown(onDone: () => void) {
  const [running, setRunning] = useSyncedState('countdown-running', false);
  // I tried using null to mean not running, but that causes the plugin to continue
  // counting down behind the scenes because the stale countdown value in the closure
  // overwrites the null that gets set on cancel.
  const [countdown, setCountdown] = useSyncedState('countdown', 0);

  useEffect(() => {
    if (!running) return;

    function tick() {
      if (!running) return;

      const nextCountdown = countdown - 1;

      if (nextCountdown === 0) {
        setRunning(false);
        onDone();
      } else {
        setCountdown(nextCountdown);
      }
    }

    wait(tick, 1000);
  });

  /** Start the countdown. Seconds must be greater than 0. */
  function start(seconds: number) {
    if (!running) {
      setCountdown(seconds);
      setRunning(true);
    }
  }

  function cancel() {
    setRunning(false);
  }

  return { start, cancel, countdown };
}
