import axios from "axios";

const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
    headers: {
        "Content-Type": "application/json"
    }
})

axiosInstance.interceptors.request.use((config) => {
    const token = sessionStorage.getItem("token");
    if (token) {
        config.headers["Authorization"] = `Bearer ${token}`
    }
    return config;
}, (error) => {
    return Promise.reject(error);
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
        return err.data;
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
        return err.data;
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
        return err.data;
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
        return err.data;
    }
}

// All Transactions Routes

// -------------------------

// All Budget Routes

// Get Budget
export const getBudgets = async (id) => {

    try {
        const response = await axiosInstance.get(`/budgets/${id}`)
        if (response) {
            return response.data;
        }
    } catch (err) {
        return err.data;
    }
}

// Create Budget
export const createBudget = async (accountId, categoryId, amount, date_start, date_end) => {
    const parsedData = { account_id: accountId, category_id: categoryId, amount: amount, date_start: date_start, date_end: date_end };
    try {
        const response = await axiosInstance.post(`/budgets/create-budget`, parsedData)
        if (response) {
            return response.data;
        }
    } catch (err) {
        return err.data;
    }
}

// Update Budget
export const updateBudget = async (id, parsedData) => {
    try {
        const response = await axiosInstance.put(`/budgets/update-budget/${id}`, parsedData)
        if (response) {
            return response.data;
        }
    } catch (err) {
        return err.data;
    }
}

// Delete Budget
export const deleteBudget = async (id, accountId) => {
    const parsedData = { account_id: accountId };
    try {
        const response = await axiosInstance.put(`/budgets/delete-budget/${id}`, parsedData)
        if (response) {
            return response.data;
        }
    } catch (err) {
        return err.data;
    }
}

// All Budget Routes
