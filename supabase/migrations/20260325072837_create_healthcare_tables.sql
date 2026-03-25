/*
  # Create Healthcare Analytics Tables

  ## Overview
  Creates tables for storing disease information and user diagnosis history for the Predictive Healthcare Analytics application.

  ## New Tables
  
  ### `diseases`
  - `id` (uuid, primary key) - Unique identifier for each disease
  - `name` (text, not null) - Disease name (e.g., "Flu", "Migraine")
  - `symptoms` (text[], not null) - Array of symptoms associated with this disease
  - `medicines` (text[], not null) - Array of recommended medicines
  - `alternative_medicines` (text[], not null) - Array of alternative/ayurvedic/home remedies
  - `precautions` (text[], not null) - Array of precautions and health warnings
  - `doctor_advice` (text, not null) - Advice on when to consult a doctor
  - `severity` (text, not null) - Severity level: 'mild', 'moderate', 'severe'
  - `created_at` (timestamptz) - Record creation timestamp
  
  ### `user_diagnoses`
  - `id` (uuid, primary key) - Unique identifier for each diagnosis
  - `symptoms_entered` (text[], not null) - Array of symptoms the user entered
  - `predicted_disease_id` (uuid) - Foreign key to diseases table
  - `predicted_disease_name` (text) - Name of predicted disease (denormalized for quick access)
  - `created_at` (timestamptz) - When the diagnosis was made
  
  ## Security
  - Enable RLS on both tables
  - Public read access for diseases table (anonymous users can view diseases)
  - Public insert access for user_diagnoses (anonymous users can save their diagnoses)
  - Public read access for user_diagnoses (for viewing diagnosis history)
*/

-- Create diseases table
CREATE TABLE IF NOT EXISTS diseases (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  symptoms text[] NOT NULL,
  medicines text[] NOT NULL,
  alternative_medicines text[] NOT NULL,
  precautions text[] NOT NULL,
  doctor_advice text NOT NULL,
  severity text NOT NULL DEFAULT 'moderate',
  created_at timestamptz DEFAULT now()
);

-- Create user_diagnoses table
CREATE TABLE IF NOT EXISTS user_diagnoses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  symptoms_entered text[] NOT NULL,
  predicted_disease_id uuid REFERENCES diseases(id),
  predicted_disease_name text,
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE diseases ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_diagnoses ENABLE ROW LEVEL SECURITY;

-- Create policies for diseases table (public read access)
CREATE POLICY "Anyone can read diseases"
  ON diseases
  FOR SELECT
  TO anon, authenticated
  USING (true);

-- Create policies for user_diagnoses table (public insert and read)
CREATE POLICY "Anyone can insert diagnoses"
  ON user_diagnoses
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Anyone can read diagnoses"
  ON user_diagnoses
  FOR SELECT
  TO anon, authenticated
  USING (true);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_diseases_symptoms ON diseases USING GIN (symptoms);
CREATE INDEX IF NOT EXISTS idx_user_diagnoses_created_at ON user_diagnoses(created_at DESC);