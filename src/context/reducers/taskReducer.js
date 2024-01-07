export default (state, action) => {
    const { type, payload } = action;
    switch (type) {
        case 'GET_PROJECTS':
            state = payload;
            break;
            case 'UPDATE_TASKS':
            state = [...payload];
            return state;
                break;
        case 'DELETE_RESORTS':
            state = state.filter(item => { item.id != payload })
            break;
        case 'ADD_TASK':
            return  [...state, payload];
            break;
        case 'EDIT_RESORT':
            state = state.map(item => (item.id === payload.id ? { ...item, ...payload.updateResort } : item));
            break;
        default:
            break;
    }
    return state;
}