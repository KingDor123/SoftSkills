
-- Drop table if it exists
DROP TABLE IF EXISTS Users;


-- Table: users
-- Stores all users in the system (trainees, coaches, admins)
CREATE TABLE Users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  full_name VARCHAR(100) NOT NULL,         -- Full name of the user
  email VARCHAR(100) UNIQUE NOT NULL,      -- Email used for login
  password VARCHAR(255) NOT NULL,          -- Hashed password
  user_type ENUM('trainee', 'coach', 'admin') DEFAULT 'trainee', -- Role in the system
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP -- When the account was created
);


-- =======================================================================dummy data=========================================================================== --

-- Insert users (2 trainees, 1 coach)
INSERT INTO Users (full_name, email, password, user_type) VALUES
('Alice Green', 'alice@example.com', 'hashedpassword1', 'trainee'),
('Ben Cohen', 'ben@example.com', 'hashedpassword2', 'trainee'),
('Coach Daniel', 'daniel@example.com', 'hashedpassword3', 'coach');

