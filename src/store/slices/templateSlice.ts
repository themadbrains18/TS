import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface TemplateState {
  templates: any[]; // Define the type as per your requirements
}

const initialState: TemplateState = {
  templates: [],
};

const templateSlice = createSlice({
  name: 'template',
  initialState,
  reducers: {
    setTemplates(state, action: PayloadAction<any[]>) {
      state.templates = action.payload;
    },
    addTemplate(state, action: PayloadAction<any>) {
      state.templates.push(action.payload);
    },
    removeTemplate(state, action: PayloadAction<string>) {
      state.templates = state.templates.filter(template => template.id !== action.payload);
    },
    // Add other actions as needed
  },
});

export const { setTemplates, addTemplate, removeTemplate } = templateSlice.actions;
export default templateSlice.reducer;
 