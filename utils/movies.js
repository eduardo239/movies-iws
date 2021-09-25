import { containsObjectId } from '.';
import { supabase } from './supabase';

/**
 *
 * @param {Object} item, movie
 * @param {UUID} user_id, uuid
 */
export const removeItemFromProfile = async (item, user_id, action) => {
  let { data: profile, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('user_id', user_id)
    .single();

  // verifica se já está na lista
  let array;
  action === 0 && (array = profile?.movies_watched ?? []);
  action === 1 && (array = profile?.movies_to_see ?? []);

  const to_see = containsObjectId(item.id, array);

  if (to_see) {
    // remove from array
    const newArray = array.filter((m) => m.id !== item.id);

    // inserir
    let body;
    action === 0 && (body = { movies_watched: newArray });
    action === 1 && (body = { movies_to_see: newArray });

    const { data, error } = await supabase
      .from('profiles')
      .update([body])
      .eq('user_id', user_id)
      .single();
    if (error) alert('erro !updating');
    return data;
  } else {
    alert('Este filme não está na lista.');
  }
  // const newArray = [...array, data];
};
