import axios from "axios";

const token = sessionStorage.getItem("token");

const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
    headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
    }
})

// All Categories Routes

// Get Category
export const getCategories = async (id) => {
    try {
        const response = await axiosInstance.get(`/categories/${id}`)
        if (response) {
            return response.data;
        }
    } catch (err) {
        return err;
    }
}

// Create Category
export const createCategories = async (accountId, categoryName) => {
    const parsedData = { account_id: accountId, category_name: categoryName };

    try {
        const response = await axiosInstance.post(`/categories/create-category`, parsedData)
        if (response) {
            return response.data;
        }
    } catch (err) {
        return err;
    }
}

// Update Category
export const updateCategory = async (id, parsedData) => {
    try {
        const response = await axiosInstance.put(`/categories/update-category/${id}`, parsedData)
        if (response) {
            return response.data;
        }
    } catch (err) {
        return err;
    }
}

// Delete Category
export const deleteCategory = async (id, accountId) => {
    const parsedData = { account_id: accountId };
    try {
        const response = await axiosInstance.put(`/categories/delete-category/${id}`, parsedData)
        if (response) {
            return response.data;
        }
    } catch (err) {
        return err;
    }
}

// All Categories Routes

// -------------------------

// All Transactions Routes

// Get Transactions
export const getTransactions = async (id) => {

    try {
        const response = await axiosInstance.get(`/transactions/${id}`)
        if (response) {
            return response.data;
        }
    } catch (err) {
        return err;
    }
}

// Create Transaction
export const createTransaction = async (accountId, amount, type, categoryId, description, date) => {
    const parsedData = { account_id: accountId, amount: amount, category_id: categoryId, description: description, date: date };
    try {
        const response = await axiosInstance.post(`/transactions/create-transaction`, parsedData)
        if (response) {
            return response.data;
        }
    } catch (err) {
        return err;
    }
}

// Update Transaction
export const updateTransaction = async (id, parsedData) => {
    try {
        const response = await axiosInstance.put(`/transactions/update-transaction/${id}`, parsedData)
        if (response) {
            return response.data;
        }
    } catch (err) {
        return err;
    }
}

// Delete Transaction
export const deleteTransaction = async (id, accountId) => {
    const parsedData = { account_id: accountId };
    try {
        const response = await axiosInstance.put(`/transactions/delete-transaction/${id}`, parsedData)
        if (response) {
            return response.data;
        }
    } catch (err) {
        return err;
    }
}

// All Transactions Routes

// -------------------------
