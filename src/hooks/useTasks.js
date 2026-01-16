import { useState, useEffect } from 'react'
import { supabase } from '../services/supabase'

export function useTasks(userId) {
    const [tasks, setTasks] = useState([])
    const [loading, setLoading] = useState(true)

    const fetchTasks = async () => {
        try {
            setLoading(true)
            const { data, error } = await supabase
                .from('tasks')
                .select('*')
                .order('created_at', { ascending: false })

            if (error) throw error
            setTasks(data || [])
        } catch (error) {
            console.error('Error fetching tasks:', error.message)
        } finally {
            setLoading(false)
        }
    }

    const addTask = async (title) => {
        try {
            const { data, error } = await supabase
                .from('tasks')
                .insert([{ title, user_id: userId }])
                .select()

            if (error) throw error
            setTasks([data[0], ...tasks])
            return { success: true }
        } catch (error) {
            console.error('Error adding task:', error.message)
            return { success: false, error: error.message }
        }
    }

    const toggleTask = async (id, isCompleted) => {
        try {
            const { error } = await supabase
                .from('tasks')
                .update({ is_completed: !isCompleted })
                .eq('id', id)

            if (error) throw error
            setTasks(tasks.map(t => t.id === id ? { ...t, is_completed: !isCompleted } : t))
        } catch (error) {
            console.error('Error updating task:', error.message)
        }
    }

    const deleteTask = async (id) => {
        try {
            const { error } = await supabase
                .from('tasks')
                .delete()
                .eq('id', id)

            if (error) throw error
            setTasks(tasks.filter(t => t.id !== id))
        } catch (error) {
            console.error('Error deleting task:', error.message)
        }
    }

    useEffect(() => {
        if (userId) fetchTasks()
    }, [userId])

    return { tasks, loading, addTask, toggleTask, deleteTask, refresh: fetchTasks }
}
