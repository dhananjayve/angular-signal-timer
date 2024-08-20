import { Component, signal, computed, effect, Signal } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
function getTimerNoCleanup(
  frequency: number,
  cleanAt: number = 0
): Signal<number> {
  const timer = signal(0);
  let lastTimeout;
  const loop = () => {
    timer.update((value) => value + 1);
    console.log('getTimerNoCleanup loop is running', timer());
    lastTimeout = setTimeout(loop, frequency);
    const timerCurrentValue = timer();
    if (cleanAt > 0 && timerCurrentValue === cleanAt) {
      clearInterval(lastTimeout);
      timer.set(0);
      lastTimeout = setTimeout(loop, frequency);
    }
  };
  lastTimeout = setTimeout(loop, frequency);

  return timer;
  // No more cleanup!
}
@Component({
  selector: 'app-root',
  standalone: true,
  template: `
    signal value is {{noCleanup()}}
    signal value is {{noCleanup123()}}
    <br/>
    Hello world!
  `,
})
export class PlaygroundComponent {
  protected readonly noCleanup = getTimerNoCleanup(1000);
  protected readonly noCleanup123 = getTimerNoCleanup(1000, 10);

  constructor() {}
}

bootstrapApplication(PlaygroundComponent);
