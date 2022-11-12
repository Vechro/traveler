create table profiles (
  id uuid references auth.users not null,
  updated_at timestamp with time zone,
  markers jsonb,
  primary key (id)
);

alter table profiles enable row level security;

create policy "Public profiles are viewable by the owner."
  on profiles for select
  using ( auth.uid() = id );

create policy "Users can insert their own profile."
  on profiles for insert
  with check ( auth.uid() = id );

create policy "Users can update own profile."
  on profiles for update
  using ( auth.uid() = id );

-- Set up Storage
insert into storage.buckets (id, name)
values ('images', 'images');

create policy "Marker images are accessible."
  on storage.objects for select
  using ( bucket_id = 'images' );

create policy "Anyone can upload a marker image."
  on storage.objects for insert
  with check ( bucket_id = 'images' );

create policy "Anyone can update a marker image."
  on storage.objects for update
  with check ( bucket_id = 'images' );