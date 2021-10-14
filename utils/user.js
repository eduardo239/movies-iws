import { removeItemFromProfile } from '../utils/movies';

/**
 *
 * @param {Object} m item, movie, show
 * @param {useState} setMessage
 * @param {Object} profile
 */
export async function removeFromWatched(m, setMessage, profile) {
  setMessage(false);
  await removeItemFromProfile(m, profile.user_id, 0);
  setMessage(true);
  setTimeout(() => setMessage(false), 2000);
}

/**
 *
 * @param {Object} m item, movie, show
 * @param {useState} setMessage
 * @param {useState} setWatched
 * @param {Object} profile
 */
export async function removeFromToSee(m, setMessage, setWatched, profile) {
  setMessage(false);
  const data = await removeItemFromProfile(m, profile.user_id, 1);
  setToSee(data.movies_to_see);
  setMessage(true);
  setTimeout(() => setMessage(false), 2000);
}
