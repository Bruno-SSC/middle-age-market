import {
  trigger,
  style,
  animate,
  transition,
  group,
  query,
  stagger,
  animateChild,
  state,
} from '@angular/animations';

const opt = { optional: true };

// Section animations

export const scrollInOut = trigger('scrollInOut', [
  state('scrollOut', style({ opacity: 0, transform: 'translateX(-10%)' })),
  state('scrollIn', style({ opacity: 1, transform: 'translateX(0%)' })),
  transition('scrollOut <=> scrollIn', [
    group([
      animate(1000, style({ opacity: 1 })),
      animate(600, style({ transform: 'translateX(0%)' })),
      query('@*', animateChild(), opt),
    ]),
  ]),
]);

export const fadeInSeq = trigger('FIS', [
  transition('scrollOut <=> scrollIn', [
    query('.itemToReveal', [
      style({ opacity: 0, position: 'relative', left: 0, top: '-10%' }),
      stagger('0.5s', [animate('1s ease-in', style({ opacity: 1, top: 0 }))]),
    ]),
  ]),
]);

// Projects animations

export const listReveal = trigger('listReveal', [
  transition(
    '* => *',
    query('.itemToReveal', [
      style({ opacity: 0, position: 'relative', top: 0, right: '-100%' }),
      stagger('0.3s', animate('1s ease-in', style({ opacity: 1, right: 0 }))),
    ])
  ),
]);

export const projChange = trigger('projChange', [
  transition('center => left', [
    animate(500, style({ left: '-100%', opacity: 0 })),
    style({ left: '100%' }),
    animate('0.4s 100ms', style({ left: 0, opacity: 1 })),
  ]),

  transition('center => right', [
    animate(500, style({ left: '100%', opacity: 0 })),
    style({ left: '-100%' }),
    animate('0.4s 100ms', style({ left: 0, opacity: 1 })),
  ]),
]);

// navbar animations

export const slideDown = trigger('slideDown', [
  transition(':enter', [
    style({ transform: 'translateY(-100%)' }),
    animate('1s ease-out'),
  ]),
]);

export const slideUp = trigger('slideUp', [
  transition(':enter', [
    style({ transform: 'translateY(100%)' }),
    animate('1.4s ease-out'),
  ]),
]);

export const expandOptions = trigger('expandOptions', [
  state(
    'visible',
    style({
      backgroundColor: '#f1a661',
      height: '240px',
    })
  ),
  transition('hidden => visible', [
    group([animate(500), query('.option', stagger(500, animateChild()))]),
  ]),
  transition('visible => hidden', [
    query('.option', stagger(-200, animateChild())),
    animate(200),
  ]),
]);

export const showOpt = trigger('showOpt', [
  state('visible', style({ opacity: 1, height: '60px' })),
  transition('hidden <=> visible', [animate(200)]),
]);

// bio animations

export const slowContentChange = trigger('slowContentChange', [
  state('leaving', style({ opacity: 0 })),
  state('entering', style({ opacity: 1 })),
  transition('leaving <=> entering', [animate(500)]),
]);

// alert animations

export const showLeft = trigger('showLeft', [
  transition(':enter', [
    style({ transform: 'translateX(100%)', opacity: 0 }),
    animate('1.4s ease', style({ transform: 'translateX(0%)', opacity: 1 })),
  ]),
  transition(':leave', [
    animate('1s ease', style({ transform: 'translateX(100%)', opacity: 0 })),
  ]),
]);

export const showUp = trigger('showUp', [
  transition(':enter', [
    style({ opacity: 0 }),
    animate('1s ease', style({ opacity: 1 })),
  ]),
  transition(':leave', [animate('1s ease-in', style({ opacity: 0 }))]),
]);
