import { createSlice, PayloadAction } from '@reduxjs/toolkit';

/**
 * Redux Slice for Template Management
 *
 * This slice manages the state related to templates in the application.
 * It includes actions to manage a list of templates, such as setting templates, adding a new template, and removing a template.
 *
 * State Structure:
 * - `templates`: An array that holds all templates. The templates are represented as objects, and the array can contain any number of template objects.
 *
 * Actions:
 * - `setTemplates`: Sets the `templates` state to the payload, which should be an array of template objects.
 *   This action is typically dispatched to load or initialize the templates in the state (e.g., after fetching them from an API).
 * - `addTemplate`: Adds a new template object to the `templates` array.
 *   This action is dispatched when a new template is created or added to the collection.
 * - `removeTemplate`: Removes a template from the `templates` array based on the template's `id`.
 *   This action is dispatched when a template needs to be deleted.
 * Notes:
 * - The `templates` array can contain any type of template object, but ideally, each template should have a unique `id` to facilitate removal or updates.
 * - This slice is useful for managing a collection of templates, whether you're fetching them from an API, creating new ones, or removing unwanted ones.
 */


interface TemplateState {
  templates: any[]; 
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
 