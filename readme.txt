drop table if exists profiles;
create table public.profiles (
  id uuid default uuid_generate_v4 (),
  user_id uuid not null,
  username varchar not null unique,
  inserted_at timestamp with time zone default timezone('utc'::text, now()) not null,

  primary key(id),
  foreign key(user_id) references auth.users(id) on delete cascade
);

https://api.themoviedb.org/3/configuration?api_key=7b001081a601a5c4964d650d6e62048b