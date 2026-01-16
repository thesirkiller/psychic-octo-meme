import { useState, useEffect } from 'react'
import { supabase } from '../services/supabase'

export function useExpenses(userId) {
    const [expenses, setExpenses] = useState([])
    const [loading, setLoading] = useState(true)

    const fetchExpenses = async () => {
        try {
            setLoading(true)
            const { data, error } = await supabase
                .from('expenses')
                .select('*')
                .order('date', { ascending: false })

            if (error) throw error
            setExpenses(data || [])
        } catch (error) {
            console.error('Error fetching expenses:', error.message)
        } finally {
            setLoading(false)
        }
    }

    const addExpense = async ({ description, amount, category, date }) => {
        try {
            const { data, error } = await supabase
                .from('expenses')
                .insert([{
                    description,
                    amount: parseFloat(amount),
                    category,
                    date: date || new Date().toISOString().split('T')[0],
                    user_id: userId
                }])
                .select()

            if (error) throw error
            setExpenses([data[0], ...expenses])
            return { success: true }
        } catch (error) {
            console.error('Error adding expense:', error.message)
            return { success: false, error: error.message }
        }
    }

    const deleteExpense = async (id) => {
        try {
            const { error } = await supabase
                .from('expenses')
                .delete()
                .eq('id', id)

            if (error) throw error
            setExpenses(expenses.filter(e => e.id !== id))
        } catch (error) {
            console.error('Error deleting expense:', error.message)
        }
    }

    useEffect(() => {
        if (userId) fetchExpenses()
    }, [userId])

    return { expenses, loading, addExpense, deleteExpense, refresh: fetchExpenses }
}
