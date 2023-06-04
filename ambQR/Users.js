//File to manipulate the database

import supabase from './helper.js'

export async function getCurrentUserID(){
    const { data, error } = await supabase.auth.api.getUser()
    if (error) console.log(error)
    return data.id
}

export async function getCurrentScore(){
    const { data, error } = await supabase.auth.api.getUser()
    if (error) console.log(error)
    return data.user_metadata.full_name
}

export async function setCurrentScore(score){
    const { data, error } = await supabase.auth.api.updateUser({
        data: { full_name: score },
    })
    if (error) console.log(error)
    return data
}

export async function getScoreByID(userId){
    const { data, error } = await supabase
    .from('Users')
    .select('full_name')
    .eq('id', userId)
    if (error) console.log(error)
    return data[0].full_name
}

export async function setUserNameByID(userId,score){
    const { data, error } = await supabase
    .from('Users')
    .update({ full_name: score })
    .eq('id', userId)
    if (error) console.log(error)
    return data
}