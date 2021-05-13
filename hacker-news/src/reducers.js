import { SET_LOADING, SET_STORIES, REMOVE_STORY, HANDLE_SEARCH, HANDLE_PAGE } from "./actions";

const reducer = (state, action) => {
    switch (action.type) {
        case SET_LOADING:
            return { ...state, isLoading: true };
        case SET_STORIES:
            return {
                ...state,
                isLoading: false,
                hits: action.payload.hits,
                nbPages: action.payload.nbPages,
            };
        case REMOVE_STORY:
            return {
                ...state,
                hits: state.hits.filter(
                    (story) => story.objectID !== action.payload
                ),
            };
        case HANDLE_SEARCH:
            return {
                ...state,
                query: action.payload,
                page: 0 // every time rearch, page should be 0
            };
        case HANDLE_PAGE:
            if(action.payload==='inc'){
                let nextPage = (state.page + 1) % state.nbPages;
                return{
                    ...state,
                    page: nextPage
                };
            }
            if(action.payload==='dec'){
                let prevPage = (state.page - 1 + state.nbPages) % state.nbPages;
                return{
                    ...state,
                    page: prevPage
                };
            }
            break;
        default:
            throw new Error(`no matching ${action.type} action type`);
    }
};

export default reducer;
