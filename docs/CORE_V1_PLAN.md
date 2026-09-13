# Core V1 implementation plan

## Delivered foundation
- Supabase tables: documents, question_banks, questions, quiz_records.
- Foreign keys, status/type/mode constraints, timestamps.
- Initial RLS policies for owner and published-bank access.
- Storage setup guidance.

## Next implementation slices
1. Replace local question state with Supabase client queries.
2. Add authenticated teacher upload flow and Storage upload.
3. Add server-side PDF/DOCX/TXT/MD extraction and ZIP validation.
4. Add OpenAI structured-output generation with source-preservation validation.
5. Add teacher review/publish workflow.
6. Add student identity lookup through a controlled Google Sheets sync service.
7. Persist quiz records and build analytics/export endpoints.

## Safety and correctness
- Never expose OpenAI API keys in browser code.
- Treat generated questions as drafts until teacher approval.
- Reject malformed JSON and questions whose answer/options are not grounded in extracted source text.
- Keep student identifiers out of public URLs and client logs.
