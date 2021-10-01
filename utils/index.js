import { supabase } from './supabase';

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

export async function addMovieTo(section, user_id, item) {
  let table = section === 0 ? 'movies_watched' : 'movies_to_see';

  let { data: movies_list, error: error_movies_list } = await supabase
    .from('profiles')
    .select(table)
    .eq('user_id', user_id)
    .single();

  if (error_movies_list) console.log(error_movies_list);

  let array =
    table === 'movies_watched'
      ? movies_list.movies_watched
      : movies_list.movies_to_see;

  // verifica se já está na lista
  const watched = containsObjectId(item.id, array);
  // cria uma nova array com o item novo
  const newArray = [...array, item];

  if (!watched) {
    let body =
      table === 'movies_watched'
        ? { movies_watched: newArray }
        : { movies_to_see: newArray };

    const { data, error: error_profile } = await supabase
      .from('profiles')
      .update([body])
      .eq('user_id', user_id);
    if (error_profile) console.log(error_profile);
  } else {
    alert('Este filme já está na sua lista.');
  }
}

export function removeMovieTo(section) {
  console.log(section);
}
