import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://vcwbkynouizkrnadqmma.supabase.co';
const supabaseAnonKey = 'sb_publishable_lPK-Jyl4Y0o8zy4iqiewgA_8z948eRp';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function test() {
  console.log("Testing Supabase insert...");
  const { data, error } = await supabase.from('profiles').insert([{ id: 'b0a701e6-b076-4d2a-81a1-7787df0b0ee6', full_name: 'Test', email: 'test@example.com' }]);
  if (error) {
    console.error("Error inserting profile:", error);
  } else {
    console.log("Success inserting profile:", data);
  }
}
test();
