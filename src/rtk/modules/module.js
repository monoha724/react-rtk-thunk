import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const __getCards = createAsyncThunk(
    "getCards",
    async (payload, thunkAPI) => {
        try {
            const result = await axios.get('https://json-server-mauve.vercel.app/cards');
            return thunkAPI.fulfillWithValue(result.data);
        } catch(error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);

export const __newCard = createAsyncThunk(
    "newCard",
    async (payload, thunkAPI) => {
        try {
            const result = await axios.post('https://json-server-mauve.vercel.app/cards', payload)
            return thunkAPI.fulfillWithValue(result.data);
        } catch(error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);

export const __deleteCard = createAsyncThunk(
    "deleteCard",
    async (payload, thunkAPI) => {
        try {
            await axios.delete(`https://json-server-mauve.vercel.app/cards/${payload}`);
            return thunkAPI.fulfillWithValue(payload);
        } catch(error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);

export const __editState = createAsyncThunk(
    "editState",
    async (payload, thunkAPI) => {
        try {
            await axios.get(`https://json-server-mauve.vercel.app/cards/${payload}`, payload);
            return thunkAPI.fulfillWithValue(payload);
        } catch(error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);

export const __fixCard = createAsyncThunk(
    "fixCard",
    async ({id, fixTitle, fixContent, img, edit}, thunkAPI) => {
        try {
            const result = await axios.put(`https://json-server-mauve.vercel.app/cards/${id}`, {title: fixTitle, content: fixContent, img: img, edit: edit});
            return thunkAPI.fulfillWithValue(result.data);
        } catch(error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);

const initialState = {
    cards: [],
    isLoading: false,
    isError: false,
    error: null,
}

const cardsSlice = createSlice({
    name: "cards",
    initialState,
    reducers: {},
    extraReducers: {

        //__getCards
        [__getCards.pending]: (state) => {
            state.isLoading = true;
            state.isError = false;
        },
        [__getCards.fulfilled]: (state, {payload}) => {
            state.isLoading = false;
            state.isError = false;
            state.cards = payload;
        },
        [__getCards.rejected]: (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.error = action.payload;
        },

        //__newCard
        [__newCard.pending]: (state) => {
            state.isLoading = true;
            state.isError = false;
        },
        [__newCard.fulfilled]: (state, {payload}) => {
            state.isLoading = false;
            state.isError = false;
            state.cards = [...state.cards, payload]
        },
        [__newCard.rejected]: (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.error = action.payload;
        },

        //__deleteCard
        [__deleteCard.pending]: (state) => {
            state.isLoading = true;
            state.isError = false;
        },
        [__deleteCard.fulfilled]: (state, {payload}) => {
            state.isLoading = false;
            state.isError = false;
            state.cards = state.cards.filter((item) => item.id !== payload);
        },
        [__deleteCard.rejected]: (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.error = action.payload;
        },

        //__editState
        [__editState.pending]: (state) => {
            state.isLoading = true;
            state.isError = false;
        },
        [__editState.fulfilled]: (state, {payload}) => {
            state.isLoading = false;
            state.isError = false;
            state.cards = state.cards.map((item) => item.id === payload ? {...item, edit: !item.edit} : item);
        },
        [__editState.rejected]: (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.error = action.payload;
        },

        //__fixCard
        [__fixCard.pending]: (state) => {
            state.isLoading = true;
            state.isError = false;
        },
        [__fixCard.fulfilled]: (state, {payload}) => {
            state.isLoading = false;
            state.isError = false;
            console.log(payload)
            state.cards = [...state.cards, payload]
        },
        [__fixCard.rejected]: (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.error = action.payload;
        },
    },
})

export const { newCard } = cardsSlice.actions
export default cardsSlice.reducer