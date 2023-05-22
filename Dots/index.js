const points = (currentStr, index = 0, isAddDot = false, result = '') => {
  const newResult = `${result}${isAddDot ? '.' : ''}${currentStr[index]}`

  if (currentStr.length === index + 1) {
    return newResult
  }

  const addedDot = points(currentStr, index + 1, true,  newResult)
  const noAddedDot = points(currentStr, index + 1, false, newResult)

  return [addedDot, noAddedDot].flat(1)
}

console.log(points('abcd'), 'result');
