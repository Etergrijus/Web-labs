import {nextTick} from "vue";

//Рассчитываем геометрию для показа tooltip-ов с ошибками
export const updateTooltipPosition = async (errorVar: boolean, inputRef: HTMLElement, spanRef: HTMLElement) => {
  if (errorVar && inputRef && spanRef) {
    await nextTick()

    const inputRect = inputRef.getBoundingClientRect()
    console.log(inputRect.top)
    console.log(inputRect.left)
    console.log(inputRect.height)

    const mediaQuery768 = window.matchMedia('screen and (max-width: 768px)')
    const mediaQuery500 = window.matchMedia('screen and (max-width: 500px)')
    if (mediaQuery500.matches) {
      spanRef.style.top = `${inputRect.top + inputRect.height * 0.5}px` //50%
      spanRef.style.left = `${inputRect.left + 80}px`
      spanRef.style.transform = 'translateY(-50%)'
      spanRef.style.fontSize = '8px'
    } else if (mediaQuery768.matches) {
      spanRef.style.top = `${inputRect.bottom + 12}px`
      spanRef.style.left = `${inputRect.left + 5}px`
      spanRef.style.transform = 'translateX(50%)'
      spanRef.style.fontSize = '14px'
    } else {
      spanRef.style.top = `${inputRect.top + inputRect.height * 0.5}px` //50%
      spanRef.style.left = `${inputRect.right + 12}px`
      spanRef.style.transform = 'translateY(-50%)'
      spanRef.style.fontSize = '14px'
    }
  }
}

