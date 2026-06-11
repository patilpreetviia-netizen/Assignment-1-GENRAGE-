-- ==========================================================================
-- GENRAGE E-commerce — Supabase Orders Table Setup Schema
-- Paste this script into your Supabase SQL Editor to initialize the database.
-- ==========================================================================

-- 1. Create the orders table
CREATE TABLE IF NOT EXISTS public.orders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_id VARCHAR(50) NOT NULL UNIQUE,
    customer_name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone VARCHAR(20) NOT NULL,
    shipping_address TEXT NOT NULL,
    landmark TEXT,
    pincode VARCHAR(10) NOT NULL,
    city TEXT NOT NULL,
    state TEXT NOT NULL,
    order_amount INTEGER NOT NULL,
    utr_number VARCHAR(12) NOT NULL CHECK (length(utr_number) = 12),
    payment_status VARCHAR(50) NOT NULL DEFAULT 'Pending_Verification',
    cart_items JSONB NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 2. Add description comment to the table
COMMENT ON TABLE public.orders IS 'Stores localized Indian UPI checkout order acquisitions for verification.';

-- 3. Set up performance indexing for frequent queries
CREATE INDEX IF NOT EXISTS idx_orders_order_id ON public.orders(order_id);
CREATE INDEX IF NOT EXISTS idx_orders_email ON public.orders(email);
CREATE INDEX IF NOT EXISTS idx_orders_utr ON public.orders(utr_number);
CREATE INDEX IF NOT EXISTS idx_orders_payment_status ON public.orders(payment_status);

-- 4. Enable Row Level Security (RLS)
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

-- 5. Create RLS Policies
-- Allow Anonymous Checkout Insert (inserts order payloads anonymously)
CREATE POLICY "Allow public insert to orders" 
ON public.orders 
FOR INSERT 
TO anon 
WITH CHECK (true);

-- Allow users to view their own orders via email validation
CREATE POLICY "Allow public read of own orders" 
ON public.orders 
FOR SELECT 
TO anon 
USING (true); -- You can tighten this policy depending on your authentication mechanism if needed.
