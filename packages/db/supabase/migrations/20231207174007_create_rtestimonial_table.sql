CREATE TABLE testimonial (
    id SERIAL PRIMARY KEY,
    createdAt DATE NOT NULL,
    email VARCHAR(50),
    skills VARCHAR(255)[],  -- Assuming skills is an array of strings, adjust size if needed
    role VARCHAR(50),
    details TEXT,  -- Assuming details is a long string
    company VARCHAR(50)
);
