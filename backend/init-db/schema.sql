-- Table: users
-- Stores all users in the system (trainees, coaches, admins)
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  full_name VARCHAR(100) NOT NULL,         -- Full name of the user
  email VARCHAR(100) UNIQUE NOT NULL,      -- Email used for login
  password VARCHAR(255) NOT NULL,          -- Hashed password
  user_type ENUM('trainee', 'coach', 'admin') DEFAULT 'trainee', -- Role in the system
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP -- When the account was created
);

-- Table: simulations
-- Each record represents a social situation scenario
CREATE TABLE simulations (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(100) NOT NULL,             -- Title of the simulation (e.g. "Grocery Store")
  description TEXT,                        -- Description of the situation
  category VARCHAR(50),                    -- Category (e.g. "Work", "Friends", "Public")
  difficulty ENUM('easy', 'medium', 'hard') DEFAULT 'medium', -- Difficulty level
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP -- Creation timestamp
);

-- Table: avatar_scripts
-- Represents each step (message or line) the avatar speaks in the simulation
CREATE TABLE avatar_scripts (
  id INT AUTO_INCREMENT PRIMARY KEY,
  simulation_id INT NOT NULL,              -- Which simulation this line belongs to
  step_number INT NOT NULL,                -- The order of the step in the conversation
  script_text TEXT NOT NULL,               -- Text the avatar says
  video_url VARCHAR(255),                  -- Optional video URL (avatar video)
  audio_url VARCHAR(255),                  -- Optional audio file of the line
  FOREIGN KEY (simulation_id) REFERENCES simulations(id) ON DELETE CASCADE
);

-- Table: user_responses
-- Stores what the user answered at each step of a simulation
CREATE TABLE user_responses (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,                    -- The user who is responding
  simulation_id INT NOT NULL,              -- Simulation ID
  step_number INT NOT NULL,                -- Which step of the simulation
  response_text TEXT,                      -- Text response from user
  audio_url VARCHAR(255),                  -- Optional audio recording
  submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- When it was submitted
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (simulation_id) REFERENCES simulations(id)
);

-- Table: feedback
-- Stores feedback (score/comments) for a user's response
CREATE TABLE feedback (
  id INT AUTO_INCREMENT PRIMARY KEY,
  response_id INT NOT NULL,                -- Reference to the user's response
  score INT CHECK (score BETWEEN 1 AND 5), -- Score (e.g. 1 = poor, 5 = excellent)
  comment TEXT,                            -- Optional comment on the response
  generated_by ENUM('ai', 'coach') DEFAULT 'ai', -- Who gave the feedback
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- When the feedback was given
  FOREIGN KEY (response_id) REFERENCES user_responses(id)
);


--=======================================================================dummy data=========================================================================== --

-- Insert users (2 trainees, 1 coach)
INSERT INTO users (full_name, email, password, user_type) VALUES
('Alice Green', 'alice@example.com', 'hashedpassword1', 'trainee'),
('Ben Cohen', 'ben@example.com', 'hashedpassword2', 'trainee'),
('Coach Daniel', 'daniel@example.com', 'hashedpassword3', 'coach');

-- Insert a simulation
INSERT INTO simulations (title, description, category, difficulty) VALUES
('Coffee Shop Small Talk', 'Practice casual conversation while ordering coffee.', 'Public', 'easy');

-- Insert avatar script (2 steps for the avatar)
INSERT INTO avatar_scripts (simulation_id, step_number, script_text, video_url, audio_url) VALUES
(1, 1, 'Hi there! What can I get started for you today?', 'https://cdn.example.com/videos/coffee_step1.mp4', 'https://cdn.example.com/audio/coffee_step1.mp3'),
(1, 2, 'Would you like anything else with that?', 'https://cdn.example.com/videos/coffee_step2.mp4', 'https://cdn.example.com/audio/coffee_step2.mp3');

-- Insert user responses (trainee Alice replies to step 1 and 2)
INSERT INTO user_responses (user_id, simulation_id, step_number, response_text, audio_url) VALUES
(1, 1, 1, 'Hi! I’ll take a cappuccino, please.', 'https://cdn.example.com/audio/alice_response1.mp3'),
(1, 1, 2, 'Yes, I’d like a chocolate chip cookie.', 'https://cdn.example.com/audio/alice_response2.mp3');

-- Insert feedback on responses (AI-generated)
INSERT INTO feedback (response_id, score, comment, generated_by) VALUES
(1, 4, 'Great tone and clear request. Consider adding a “please” next time.', 'ai'),
(2, 5, 'Perfect! Natural and polite.', 'ai');