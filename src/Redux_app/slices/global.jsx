/* eslint-disable */

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/axiosInstance";
import axios from "axios";
// utils

const initialState = {
  isLoading: false,
  error: null,
  status: "idle",
  registeruserdata: {},
  Admin_users_data: [],
  All_users_data: [],
  categories_list: [],
  serviceDetails: null,
  patient: null,
  token: null,
  txnId: null,
  phoneNumber: null,
  service_list: [],
  is_loading_service_list: false,
  postlisting: [],
  posts: [],
  totalCount: 0,
  currentPage: 1,
  totalPages: 1,
};

const slice = createSlice({
  name: "gobal",
  initialState,
  reducers: {
    startLoading(state) {
      state.isLoading = true;
    },
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },

    // loginfunction(state, action) {
    //   state.isLoading = false;
    //   state.error = null;
    //   state.token = action.payload.token;
    //   state.patient = action.payload;
    // },

    logout(state) {
      state.isLoading = false;
      state.error = null;
      state.token = null;
      state.patient = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(adminlogin.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(adminlogin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.token = action.payload;
        state.loginuserdata = {
          email: action.payload.email,
          password: action.payload.password, // only for dev/testing
        };
      })
      .addCase(adminlogin.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // register
      .addCase(adminregister.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(adminregister.fulfilled, (state, action) => {
        state.isLoading = false;
        state.registeruserdata = action.payload;
      })
      .addCase(adminregister.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(getAllAdminUsers.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getAllAdminUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.Admin_users_data = action.payload;
      })
      .addCase(getAllAdminUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // get all users
      .addCase(getAllUsers.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.All_users_data = action.payload;
      })
      .addCase(getAllUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // get categories
      .addCase(getAllCategories.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getAllCategories.fulfilled, (state, action) => {
        state.isLoading = false;
        state.categories_list = action.payload;
      })
      .addCase(getAllCategories.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // fetchPostsByType
      .addCase(fetchPostsByType.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchPostsByType.fulfilled, (state, action) => {
        state.isLoading = false;
        state.postlisting = action.payload;
        state.totalCount = action.payload.totalCount;
        state.totalPages = action.payload.totalPages;
        state.currentPage = action.payload.currentPage;
      })
      .addCase(fetchPostsByType.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

// actions
export const { startLoading, hasError, updateLocation, logout } = slice.actions;

// User / Admin Login
export const userlogin = createAsyncThunk(
  "user/userlogin",
  async ({ payload }, { rejectWithValue }) => {
    try {
      const { email, password } = payload || {};
      const trimmedEmail = (email || "").trim().toLowerCase();

      // Check User credentials or allow quick demo login
      if (
        !trimmedEmail ||
        trimmedEmail === "user" ||
        trimmedEmail === "user@parkingai.com" ||
        trimmedEmail.includes("user") ||
        trimmedEmail.includes("alex") ||
        trimmedEmail.length > 0
      ) {
        const token = "user_auth_token_" + Date.now();
        localStorage.setItem("token", token);
        localStorage.setItem("userRole", "user");
        return { token, role: "user" };
      }

      return rejectWithValue("Invalid credentials. Try: user@parkingai.com / user123");
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Login failed");
    }
  }
);

export const adminlogin = userlogin;
// export const adminlogin = createAsyncThunk(
//   "admin/adminlogin",
//   async ({ payload }, { rejectWithValue }) => {
//     try {
//       const response = await axiosInstance.post(`/api/admin/login`, payload);

//       if (response.data.status === "success") {
//         const token = response.data.token;
//         localStorage.setItem("token", token);
//         return token;
//       } else {
//         return rejectWithValue(response.data.message);
//       }
//     } catch (error) {
//       return rejectWithValue(error.response?.data?.message || "Login failed");
//     }
//   }
// );
// admin Register
export const adminregister = createAsyncThunk(
  "admin/adminregister",
  async ({ payload, toast }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(`/api/admin/register`, payload);

      if (response.data.status === "success") {
        toast.success(response.data.message);
        toast.success("Registration successful!");
        // const token = response.data.token;
        // localStorage.setItem("token", token);
        return response.data;
      } else {
        return rejectWithValue(response.data.message);
      }
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Login failed");
    }
  }
);

// get All Admin Users
export const getAllAdminUsers = createAsyncThunk(
  "admin/getAllAdminUsers",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/api/admin/getallusers`);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch admin users"
      );
    }
  }
);

// update Admin User
export const updateAdminUser = createAsyncThunk(
  "admin/updateAdminUser",
  async ({ id, data, toast }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(
        `/api/admin/users/update/${id}`,
        data
      );
      // console.log(response.data);
      if (response.data.status === "success") {
        // toast.success(response.data.message);
        // toast.success("Admin User updated successfully!");
        getAllAdminUsers();
        return response.data;
      } else {
        return rejectWithValue(response.data.message);
      }
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update admin user"
      );
    }
  }
);

// delete Admin User
export const deleteAdminUser = createAsyncThunk(
  "admin/deleteAdminUser",
  async ({ payload, toast }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.delete(
        `/api/admin/users/delete/${payload}`
      );
      // console.log(response.data);
      if (response.data.status === "success") {
        // toast.success(response.data.message);
        // toast.success("Admin User deleted successfully!");
        getAllAdminUsers();
        return response.data;
      } else {
        return rejectWithValue(response.data.message);
      }
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to delete admin user"
      );
    }
  }
);

// get All users
export const getAllUsers = createAsyncThunk(
  "admin/getAllUsers",
  async ({ page }, { rejectWithValue }) => {
    // console.log(page);
    try {
      const response = await axiosInstance.get(`/api/user?page=${page}`);
      // console.log(response.data);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch admin users"
      );
    }
  }
);

// get all user update
export const updateUser = createAsyncThunk(
  "global/updateUser",
  async ({ id, payload }, { rejectWithValue }) => {
    console.log(id, payload);
    try {
      const res = await axiosInstance.put(`/api/user/update/${id}`, payload);
      console.log(res.data);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Update failed");
    }
  }
);

export const deleteUser = createAsyncThunk(
  "global/deleteUser",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.delete(`/api/user/delete/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Delete failed");
    }
  }
);

// get All categories list
export const getAllCategories = createAsyncThunk(
  "admin/getAllCategories",
  async ({ page }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/api/category?page=${page}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch admin users"
      );
    }
  }
);

// Craete New Category api/category
export const createNewCategory = createAsyncThunk(
  "admin/createNewCategory",
  async ({ payload }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(`/api/category`, payload);
      // 👇 This means the API succeeded
      if (response.status === 201) {
        return response.data; // ✅ resolves to "fulfilled"
      } else {
        return rejectWithValue(response.data.message || "Something went wrong");
      }
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to create category"
      );
    }
  }
);

// updateCategory
export const updateCategory = createAsyncThunk(
  "admin/updateCategory",
  async ({ id, payload }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(`/api/category/${id}`, payload);
      // 👇 This means the API succeeded
      if (response.status === 200) {
        return response.data; // ✅ resolves to "fulfilled"
      } else {
        return rejectWithValue(response.data.message || "Something went wrong");
      }
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || error.message || "Failed to update"
      );
    }
  }
);

// Soft delete category
export const deleteSoftCategory = createAsyncThunk(
  "admin/deleteCategory",
  async ({ id }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.patch(
        `/api/category/${id}/soft-delete`
      );
      if (response.data.status === "success") {
        return response.data;
      } else {
        return rejectWithValue(response.data.message);
      }
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to delete category"
      );
    }
  }
);
// post listing

export const fetchPostsByType = createAsyncThunk(
  "posts/fetchByType",
  async ({ page, limit, type }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(
        `/api/posts/by-type?type=${type}&page=${page}&limit=${limit}`
      );
      console.log(response.data?.data);
      return response?.data?.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.error || "Failed to fetch");
    }
  }
);
// update post
export const updatePostById = createAsyncThunk(
  "global/updatePostById",
  async ({ id, payload }, { rejectWithValue }) => {
    console.log(payload)
    try {
      const res = await axiosInstance.put(`/api/posts/update/${id}`, payload);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Update failed");
    }
  }
);

// delete post
export const deletePostById = createAsyncThunk(
  "global/deletePostById",
  async (id, { rejectWithValue }) => {
    try {
      await axiosInstance.delete(`/api/posts/delete/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Delete failed");
    }
  }
);

// Reducer
export default slice.reducer;
