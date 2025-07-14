-- Add new fields to clients table
ALTER TABLE public.clients 
ADD COLUMN cpf TEXT,
ADD COLUMN birth_date DATE,
ADD COLUMN gender TEXT CHECK (gender IN ('masculino', 'feminino', 'outro'));