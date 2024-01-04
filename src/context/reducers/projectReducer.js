export default (state, action) => {
    const { type, payload } = action;
    switch (type) {
        case 'GET_PROJECTS':
            state = payload;
            break;
            case 'UPDATE_PROJECTS':
                state = payload;
                break;
        case 'DELETE_PROJECTS':
            state = state.filter(item =>  item.id !== payload )
            break;
            case 'GET_BY_ID':
               return state.filter(item => { item.id === payload })
                break;
        case 'ADD_PROJECT':
            state = [...state, payload];
            break;
        case 'EDIT_RESORT':
            state = state.map(item => (item.id === payload.id ? { ...item, ...payload.updateResort } : item));
            break;
        default:
            break;
    }
    return state;
}