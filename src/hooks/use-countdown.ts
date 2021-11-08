const { useSyncedState, useEffect, waitForTask } = figma.widget;

export function useCountdown(onDone: () => void) {
  const [running, setRunning] = useSyncedState('countdown-running', false);
  const [countdown, setCountdown] = useSyncedState<number | null>(
    'countdown',
    null,
  );

  useEffect(() => {
    if (countdown == null) return;

    function tick() {
      if (!running) return;

      const nextCountdown = countdown - 1;

      if (nextCountdown === 0) {
        setRunning(false);
        onDone();
        return;
      }

      setCountdown(nextCountdown);
    }

    wait(tick, 1000);
  });

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

function wait(callback: () => void, timeout: number) {
  waitForTask(
    new Promise<void>((resolve) => {
      setTimeout(() => {
        callback();
        resolve();
      }, timeout);
    }),
  );
}
