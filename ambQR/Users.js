//File to manipulate the database

import { useState, useEffect } from 'react';
import {supabase} from './helper.js'
import { Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const [loading, setLoading] = useState(true);

// useEffect(()=>{
//     if (session)
// })

export async function getCurrentUserID(){
    try {
    setLoading(true);
    if(!session?.user) throw new Error('No user on the session!');

    const { data, error } = await supabase.auth.api.getUser();

    if (error) throw error;

    return data.id;

    } catch (error) {
        if (error instanceof Error) {
            Alert.alert(error.message);
        }
    } finally {
        setLoading(false);
    }
}

//façon très sale de gérer des scores, mais au moins ça marche

//returns an integer
export async function getCurrentScore(){
    try {
        setLoading(true);
        if(!session?.user) throw new Error('No user on the session!');

        const { data, error } = await supabase.auth.api.getUser();

        if (error) throw error;

        if (!data.user_metadata.full_name.isInteger()) return 0;
        return Number(data.user_metadata.full_name);

    } catch (error) {
        if (error instanceof Error) {
            Alert.alert(error.message);
        }
    } finally {
        setLoading(false);
    }

}

//score is an integer
export async function setCurrentScore(score){
    try{
        setLoading(true);
        if(!session?.user) throw new Error('No user on the session!');

        const { data, error } = await supabase.auth.api.updateUser({
        data: { full_name: score},
        });

        if (error) throw error;
        
    } catch (error) {
        if (error instanceof Error) {
            Alert.alert(error.message);
        }
    } finally {
        setLoading(false);
    }
}

//returns an integer
export async function getScoreByID(userId){
    try {
        setLoading(true);
        if (userId == null) throw new Error('No user on the session!');

        const { data, error } = await supabase
        .from('Users')
        .select('full_name')
        .eq('id', userId);
        
        if (error) throw error;

        if(!data[0].full_name.isInteger()) return 0;
        return Number(data[0].full_name);

    } catch (error) {
        if (error instanceof Error) {
            Alert.alert(error.message);
        }
    } finally {
        setLoading(false);
    }
}

export async function setScoreByID(userId,score){
    try {
        setLoading(true);
        if (userId == null) throw new Error('No user on the session!');
        
        const { data, error } = await supabase
        .from('Users')
        .update({ full_name: String(score)})
        .eq('id', userId);

        if (error) throw error;

    } catch {
        if (error instanceof Error) {
            Alert.alert(error.message);
        }
    } finally {
        setLoading(false);
    }
}