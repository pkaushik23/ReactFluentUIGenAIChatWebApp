-- Ensure the 'uuid-ossp' extension is created if not already present
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create the Users table only if it does not exist
CREATE TABLE IF NOT EXISTS Users (
    user_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),  -- Generate UUID for each new row
    azure_ad_id VARCHAR(255) NOT NULL,
    tenant_id VARCHAR(255) NOT NULL,
    email VARCHAR(255),
    full_name VARCHAR(255),
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    last_login_at TIMESTAMPTZ,
    UNIQUE (azure_ad_id, tenant_id)  -- Ensure uniqueness of azure_ad_id and tenant_id
);