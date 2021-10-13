import { containsObjectId } from '.';
import { supabase } from './supabase';

export async function handleAdd(m, items, setItems) {
  // verifica se já está na lista
  const contain = containsObjectId(m.id, items);

  if (contain) {
    alert('Já tem esse item na lista.');
    return;
  } else {
    setItems([...items, m]);
  }
}

export async function handleRemove(m, items, setItems) {
  const contain = containsObjectId(m.id, items);

  if (!contain) {
    alert('Esse filme não está na lista.');
    return;
  } else {
    let array = items.filter((x) => x.id !== m.id);
    setItems(array);
  }
}

export async function handleSearch(e, term, setData) {
  console.log(e);
  e.preventDefault();

  const adult = false;
  const page = 1;

  const url = `https://api.themoviedb.org/3/search/${'movie'}?api_key=${
    process.env.NEXT_PUBLIC_TMDB_KEY
  }&language=pt-BR&page=${page}&include_adult=${adult}&query=${term}`;

  let response = await fetch(url);

  if (response.status === 200) {
    let json = await response.json();
    if (json) setData(json);
  } else {
    alert('Erro na busca');
  }
}

/**
 *
 * @param {String} name da lista
 * @param {Array} items da lista
 * @param {UUID} user_id
 * @param {useState} setMessage
 * @returns
 */
export async function handleSave(e, name, items, user_id, setMessage) {
  e.preventDefault();
  // verifica se a lista tem nome
  if (!name) {
    alert('A lista não tem nome.');
    return;
  }
  if (items.length === 0) {
    // Verifica se a lista está vazia
    alert('A lista esta vazia');
  } else {
    // cria o objeto para inserir os dados na tabela lists
    const body = {
      user_id,
      listname: name,
      items,
    };

    // insere os dados na tabela
    const { data: listsData, error: listsDataError } = await supabase
      .from('lists')
      .insert([body])
      .eq('user_id', user_id)
      .single();

    if (listsDataError) alert(`listsDataError`);
    if (listsData) {
      // pega o id da nova linha da tabela lists
      const newListId = listsData.id;

      // pega as listas do profile
      const { data: profileLists, error: profileListsError } = await supabase
        .from('profiles')
        .select('lists')
        .eq('user_id', user_id)
        .single();

      if (profileListsError) {
        alert(`profileListsError`);
        return;
      }
      let newArray = [];

      if (!profileLists?.lists) {
        newArray = [newListId];
      } else {
        // adicionar o novo item nas listas
        newArray = [...profileLists.lists, newListId];
      }

      // atualiza o profile com a nova array
      const { data, error } = await supabase
        .from('profiles')
        .update({ lists: newArray })
        .eq('user_id', user_id);

      if (error) alert(error);
      setMessage(true);
      setTimeout(() => setMessage(false), 2000);
    }
  }
}
