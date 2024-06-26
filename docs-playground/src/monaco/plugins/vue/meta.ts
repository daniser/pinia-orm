import { CompletionItem } from 'vscode-html-languageservice'

export const EventModifiers = {
  stop: 'call event.stopPropagation().',
  prevent: 'call event.preventDefault().',
  capture: 'add event listener in capture mode.',
  self: 'only trigger handler if event was dispatched from this element.',
  // {keyAlias}: 'only trigger handler on certain keys.',
  once: 'trigger handler at most once.',
  left: 'only trigger handler for left button mouse events.',
  right: 'only trigger handler for right button mouse events.',
  middle: 'only trigger handler for middle button mouse events.',
  passive: 'attaches a DOM event with { passive: true }.',
}

export const CustomTags = [
  'slot',
]

interface CompletionItemNotStrict extends Omit<CompletionItem, 'label'> {
  label?: string
}

export interface CompletionDirective {
  name: string
  extra?: CompletionItemNotStrict
}

export const Directives: CompletionDirective[] = [
  {
    name: 'if',
    extra: {
      sortText: '0',
    },
  },
  {
    name: 'else-if',
  },
  {
    name: 'v-else',
    extra: {
      insertText: undefined,
    },
  },
  {
    name: 'for',
  },
]

export const Events: string[] = [
  'abort',
  'animationend',
  'aimationiteration',
  'animationstart',
  'auxclick',
  'beforeinput',
  'blur',
  'canplay',
  'canplaythrough',
  'change',
  'click',
  'compositionend',
  'compositionstart',
  'compositionupdate',
  'contextmenu',
  'copy',
  'cut',
  'dblclick',
  'drag',
  'dragend',
  'dragenter',
  'dragexit',
  'dragleave',
  'dragover',
  'dragstart',
  'drop',
  'durationchange',
  'emptied',
  'encrypted',
  'ended',
  'error',
  'focus',
  'focusin',
  'focusout',
  'input',
  'invalid',
  'keydown',
  'keypress',
  'keyup',
  'load',
  'loaddata',
  'loadedmetadata',
  'loadstart',
  'mousedown',
  'mouseenter',
  'mouseleave',
  'mousemove',
  'mouseout',
  'mouseover',
  'mouseup',
  'paste',
  'pause',
  'play',
  'playing',
  'pointercancel',
  'pointerdown',
  'pointerenter',
  'pointerleave',
  'pointermove',
  'pointerout',
  'pointerover',
  'pointerup',
  'progress',
  'ratechange',
  'reset',
  'scroll',
  'seeked',
  'seeking',
  'select',
  'stalled',
  'submit',
  'suspend',
  'timeupdate',
  'touchcancel',
  'touchend',
  'touchmove',
  'touchstart',
  'transitionend',
  'transitionstart',
  'vnode-before-mount',
  'vnode-before-unmount',
  'vnode-before-update',
  'vnode-mounted',
  'vnode-unmounted',
  'vnode-updated',
  'volumechange',
  'waiting',
  'wheel',
]
