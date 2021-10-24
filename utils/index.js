import { supabase } from './supabase';

/**
 *
 * @param {UUID} object_id UUID
 * @param {Array} list [] Array
 * @returns
 */
export function containsObjectId(object_id, list) {
  if (list === undefined || list == null) {
    return false;
  } else {
    var i;
    for (i = 0; i < list.length; i++) {
      if (list[i].id === parseInt(object_id)) {
        return true;
      }
    }
  }

  return false;
}

/**
 *
 * @param {Date} date new Date()
 * @returns Date
 */
export function dateFormat(date) {
  const D = new Date(date);
  return D.toLocaleString('pt-BR', {
    // weekday: 'short', // long, short, narrow
    day: 'numeric', // numeric, 2-digit
    year: 'numeric', // numeric, 2-digit
    month: 'long', // numeric, 2-digit, long, short, narrow
    // hour: 'numeric', // numeric, 2-digit
    // minute: 'numeric', // numeric, 2-digit
    // second: 'numeric', // numeric, 2-digit
  });
  // return newDate;
}

/**
 *
 * @param {String} table 0 = `movies_watched` ? 1 = `movies_to_see`
 * @param {UUID} user_id user.id
 * @param {Object} item Object
 */
export async function addMovieTo(table, user_id, item) {
  let table_name = table === 0 ? 'movies_watched' : 'movies_to_see';

  let { data: movies_list, error: error_movies_list } = await supabase
    .from('profiles')
    .select(table_name)
    .eq('user_id', user_id)
    .single();

  if (error_movies_list) console.error(error_movies_list);

  let array =
    table_name === 'movies_watched'
      ? movies_list.movies_watched
      : movies_list.movies_to_see;

  // verifica se já está na lista
  const watched = containsObjectId(item.id, array);

  // cria uma nova array com o item novo
  let newArray = [];
  if (!array) {
    newArray = [item];
  } else {
    newArray = [...array, item];
  }

  if (!watched) {
    let body =
      table_name === 'movies_watched'
        ? { movies_watched: newArray }
        : { movies_to_see: newArray };

    const { data, error: error_profile } = await supabase
      .from('profiles')
      .update([body])
      .eq('user_id', user_id)
      .single();

    if (error_profile) {
      console.error(error_profile);
      return false;
    } else {
      return true;
    }
  } else {
    console.error('Este filme já está na sua lista.');
    return false;
  }
}

/**
 *
 * @param {String} table 0 = `movies_watched` ? 1 = `movies_to_see`
 * @param {UUID} user_id user.id
 * @param {Object} item Object
 * @returns
 */
export async function removeMovieFrom(table, user_id, item) {
  let table_name = table === 0 ? 'movies_watched' : 'movies_to_see';

  let { data: movies_list, error: error_movies_list } = await supabase
    .from('profiles')
    .select(table_name)
    .eq('user_id', user_id)
    .single();

  if (error_movies_list) console.error(error_movies_list);

  let array =
    table_name === 'movies_watched'
      ? movies_list.movies_watched
      : movies_list.movies_to_see;

  // verifica se já está na lista
  const watched = containsObjectId(item.id, array);

  if (watched) {
    let newArray = array.filter((x) => x.id !== item.id);

    let body =
      table_name === 'movies_watched'
        ? { movies_watched: newArray }
        : { movies_to_see: newArray };

    const { data, error: error_profile } = await supabase
      .from('profiles')
      .update([body])
      .eq('user_id', user_id)
      .single();

    if (error_profile) {
      console.error(error_profile);
      return false;
    } else {
      return true;
    }
  } else {
    console.error('Este filme não está na sua lista.');
    return false;
  }
}

/**
 *
 * @param {UUID} user_id user.id
 * @param {id} item_id item.id
 * @returns
 */
export async function checkIfContain(user_id, item_id) {
  let mw = 'movies_watched';
  let ts = 'movies_to_see';

  let { data: movies_list, error: error_movies_list } = await supabase
    .from('profiles')
    .select('movies_watched, movies_to_see')
    .eq('user_id', user_id)
    .single();

  if (error_movies_list) console.error(error_movies_list);

  let arrayMW = movies_list.movies_watched;
  let arrayMTS = movies_list.movies_to_see;

  if (!arrayMW && !arrayMTS) {
    return false;
  } else {
    // verifica se já está na lista
    const isMW = containsObjectId(item_id, arrayMW);
    const isMTS = containsObjectId(item_id, arrayMTS);
    return { toSeeOK: isMTS, watchedOK: isMW };
  }
}

// splice string if it's too long
export function spliceString(string, maxLength) {
  if (string.length > maxLength) {
    return string.substring(0, maxLength) + '...';
  } else {
    return string;
  }
}
