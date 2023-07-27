const LOADER_ID = 'loader'
const VISIBLE_CLASS = 'visible'

const getLoader = () => document.getElementById(LOADER_ID)

export const showLoader = () => getLoader().classList.add(VISIBLE_CLASS)

export const hideLoader = () => getLoader().classList.remove(VISIBLE_CLASS)
