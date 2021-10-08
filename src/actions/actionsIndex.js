export const storeClipObjectsJSON = (clipObjectsJSON) => {
  return {
    type: 'STORE JSON',
    payload: clipObjectsJSON
  }
}

export const storePathname = (pathname) => {
  return {
    type: 'STORE PATHNAME',
    payload: pathname
  }
}