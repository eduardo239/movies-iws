export function containsObjectId(obj_id, list) {
  var i;
  for (i = 0; i < list.length; i++) {
    if (list[i].id === obj_id) {
      return true;
    }
  }
  return false;
}

// export function containsObject(obj, list) {
//   var i;
//   for (i = 0; i < list.length; i++) {
//     if (list[i] === obj) {
//       return true;
//     }
//   }

//   return false;
// }

// export function containsObject2(obj, list) {
//   var x;
//   for (x in list) {
//     if (list.hasOwnProperty(x) && list[x] === obj) {
//       return true;
//     }
//   }

//   return false;
// }

export function dateFormat(date) {
  const D = new Date(date);
  return D.toLocaleString('en-US', {
    // weekday: 'short', // long, short, narrow
    day: 'numeric', // numeric, 2-digit
    year: 'numeric', // numeric, 2-digit
    month: 'long', // numeric, 2-digit, long, short, narrow
    hour: 'numeric', // numeric, 2-digit
    // minute: 'numeric', // numeric, 2-digit
    // second: 'numeric', // numeric, 2-digit
  });
  // return newDate;
}
