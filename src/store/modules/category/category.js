var categoryinfodata = {
    id: null,
    category_Name: null,

};

const state = {
    categorydata: { ...categoryinfodata },
};

const getters = {

};

const mutations = {
    setCategoryInfo(state, categorydata) {
        state.categorydata = categorydata;
    },
    resetCategoryInfo(state) {
        state.categorydata = { ...categoryinfodata };
    },

};

const actions = {

};

export default {
    state,
    getters,
    actions,
    mutations,
};
