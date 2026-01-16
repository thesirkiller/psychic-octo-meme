import { useState, useEffect } from 'react'
import { supabase } from '../services/supabase'

export function useTransactions(userId) {
    const [transactions, setTransactions] = useState([])
    const [loading, setLoading] = useState(true)

    const fetchTransactions = async () => {
        try {
            setLoading(true)
            const { data, error } = await supabase
                .from('transactions')
                .select('*')
                .order('date', { ascending: false })

            if (error) throw error
            setTransactions(data || [])
        } catch (error) {
            console.error('Error fetching transactions:', error.message)
        } finally {
            setLoading(false)
        }
    }

    const addTransaction = async ({ description, amount, category, date, type = 'expense' }) => {
        try {
            const { data, error } = await supabase
                .from('transactions')
                .insert([{
                    description,
                    amount: parseFloat(amount),
                    category,
                    type,
                    date: date || new Date().toISOString().split('T')[0],
                    user_id: userId
                }])
                .select()

            if (error) throw error
            setTransactions([data[0], ...transactions])
            return { success: true }
        } catch (error) {
            console.error('Error adding transaction:', error.message)
            return { success: false, error: error.message }
        }
    }

    const deleteTransaction = async (id) => {
        try {
            const { error } = await supabase
                .from('transactions')
                .delete()
                .eq('id', id)

            if (error) throw error
            setTransactions(transactions.filter(t => t.id !== id))
        } catch (error) {
            console.error('Error deleting transaction:', error.message)
        }
    }

    useEffect(() => {
        if (userId) fetchTransactions()
    }, [userId])

    return { transactions, loading, addTransaction, deleteTransaction, refresh: fetchTransactions }
}
