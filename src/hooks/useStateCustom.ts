function useStateCustom<T>(initialState: T): [T, (inputState: T) => void] {
  let currentInput: T | undefined

  if (currentInput === undefined) {
    currentInput = initialState
  }
  function useState(inputState: T) {

    return currentInput = inputState

  }

  return [currentInput, useState]


}

export default useStateCustom
