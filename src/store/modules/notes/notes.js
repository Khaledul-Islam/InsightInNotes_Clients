var notesinfodata = {
    noteID: null,
    noteCategoryID: null,
    noteCategory: null,
    noteTitle:null,
    noteDescription: null,
    reminder: null,
    createDate: null,
    dueDate: null,
    isCompleted: true,
    userName: null,
    email: null,
    flag:null,

};

const state = {
    notesdata: { ...notesinfodata },
};

const getters = {

};

const mutations = {
    setNotesInfo(state, notesdata) {
        state.notesdata = notesdata;
    },
    resetNotesInfo(state) {
        state.notesdata = { ...notesinfodata };
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
