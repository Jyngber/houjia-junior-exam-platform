insert into storage.buckets (id, name, public) values ('documents','documents',false) on conflict (id) do update set public = excluded.public;

create policy "documents_insert_own_folder" on storage.objects for insert to authenticated
with check (bucket_id='documents' and (storage.foldername(name))[1]=auth.uid()::text);

create policy "documents_select_own_folder" on storage.objects for select to authenticated
using (bucket_id='documents' and (storage.foldername(name))[1]=auth.uid()::text);

create policy "documents_update_own_folder" on storage.objects for update to authenticated
using (bucket_id='documents' and (storage.foldername(name))[1]=auth.uid()::text)
with check (bucket_id='documents' and (storage.foldername(name))[1]=auth.uid()::text);

create policy "documents_delete_own_folder" on storage.objects for delete to authenticated
using (bucket_id='documents' and (storage.foldername(name))[1]=auth.uid()::text);