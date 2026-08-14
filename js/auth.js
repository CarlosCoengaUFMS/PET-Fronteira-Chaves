const SUPABASE_URL = 'https://qgcwgnwbtlcrqghbrzwr.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_QQBVEwlaoqgZ3a5aGxnKVQ_KKKCs2EC';

// Define o cliente do Supabase no escopo global para que admin, login e visitor possam usá-lo
window.supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

async function signup(email, password, name) {
  try {
    const { data, error } = await window.supabase.auth.signUp({ email, password, options: { data: { name: name } } });
    if (error) throw new Error(error.message);
    return { success: true, user: data.user };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

async function login(email, password) {
  try {
    const { data, error } = await window.supabase.auth.signInWithPassword({ email, password });
    if (error) throw new Error(error.message);
    return { success: true, user: data.user };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

async function getCurrentUser() {
  const { data: { user } } = await window.supabase.auth.getUser();
  return user;
}