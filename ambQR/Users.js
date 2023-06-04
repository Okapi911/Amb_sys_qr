//File to manipulate the database

import supabase from './helper.js'

export async function getCurrentUserID(){
    const { data, error } = await supabase.auth.api.getUser()
    if (error) console.log(error)
    return data.id
}

//façon très sale de gérer des scores, mais au moins ça marche

//returns an integer
export async function getCurrentScore(){
    const { data, error } = await supabase.auth.api.getUser()
    if (error) console.log(error)
    return parseInt(data.user_metadata.full_name)
}

//score is an integer
export async function setCurrentScore(score){
    const { data, error } = await supabase.auth.api.updateUser({
        data: { full_name: score.toString() },
    })
    if (error) console.log(error)
    return data
}

//returns an integer
export async function getScoreByID(userId){
    const { data, error } = await supabase
    .from('Users')
    .select('full_name')
    .eq('id', userId)
    if (error) console.log(error)
    return parseInt(data[0].full_name)
}

export async function setScoreByID(userId,score){
    const { data, error } = await supabase
    .from('Users')
    .update({ full_name: score.toString() })
    .eq('id', userId)
    if (error) console.log(error)
    return data
}