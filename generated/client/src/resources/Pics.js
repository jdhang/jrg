'use strict'

function getPics (num) {
  const pics = [];
  for (let i = 0; i < num; i++) {
    pics.push(`http://placeimg.com/500/500/any?random${i}`);
  }
  return pics;
}

export default getPics
