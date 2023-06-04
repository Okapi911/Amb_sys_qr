//File to manipulate the database

import supabase from './helper.js'

export async function getUserData(userID){
    const { data, error } = await supabase
    .from('Users')
    .select('*')
    .eq('id', userID)
    if (error) console.log(error)
    return data
}

export async function getCurrentUserID(){
    const { data, error } = await supabase.auth.api.getUser()
    if (error) console.log(error)
    return data.id
}

export async function getCurrentUserName(){
    const { data, error } = await supabase.auth.api.getUser()
    if (error) console.log(error)
    return data.user_metadata.full_name
}

//faire un Score