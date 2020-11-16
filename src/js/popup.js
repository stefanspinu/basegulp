const popupLinks = document.querySelectorAll('.popup-link')
const body = document.querySelector('body')
const lockPadding = document.querySelectorAll('.lock-padding')

let unlock = true

const timeout = 800 // from transition

if (popupLinks.length > 0) {
  for (let i = 0; i < popupLinks.length; i++) {
    const popupLink = popupLinks[i]
    popupLink.addEventListener("click", (e) => {
      const popupName = popupLink.getAttribute('href').replace('#', '')
      const curentPopup = document.getElementById(popupName)
      popupOpen(curentPopup)
      e.preventDefault()
    })
  }
}

const popupCloseIcon = document.querySelectorAll('.close-popup')
if (popupCloseIcon.length > 0) {
  for (let i = 0; i < popupCloseIcon.length; i++) {
    const el = popupCloseIcon[i]
    el.addEventListener('click', (e) => {
      popupClose(el.closest('.popup'))
      e.preventDefault()
    })
  }
}

function popupOpen(curentPopup) {
  if (curentPopup && unlock) {
    const popupActive = document.querySelector('.popup-open')
    if (popupActive) {
      popupClose(popupActive, false)
    }
    else {
      bodyLock()
    }
    curentPopup.classList.add('open')
    curentPopup.addEventListener('click', (e) => {
      if (!e.target.closest('.popup__content')) {
        popupClose(e.target.closest('.popup'))
      }
    })
  }
}

function popupClose(popupActive, doUnlock = true) {
  if (unlock) {
    popupActive.classList.remove('open')
    if (doUnlock) {
      bodyUnLock()
    }
  }
}

function bodyLock() {
  const lockPaddingValue = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px'
  if (lockPadding.length > 0) {
    for (let i = 0; i < lockPadding.length; i++) {
      const el = lockPadding[i]// for fixed objects ex: header
      el.style.paddingRight = lockPaddingValue
    }
  }
  body.style.paddingRight = lockPaddingValue
  body.classList.add('lock')

  unlock = false
  setTimeout(function () {
    unlock = true
  }, timeout)
}

function bodyUnlock() {
  setTimeout(function () {
    if (lockPadding.length > 0) {
      for (let i = 0; i < lockPadding.length; i++) {
        const el = lockPadding[i]
        el.style.paddingRight = '0px'
      }
    }
    body.style.paddingRight = '0px'
    body.classList.remove('lock')
  }, timeout)
}

//close on esc
document.addEventListener('keydown', (e) => {
  if (e.which === 27) {
    const popupActive = document.querySelector('.popup.open')
    popupClose(popupActive)
  }
})