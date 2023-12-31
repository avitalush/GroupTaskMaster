export default (state, action) => {
    const { type, payload } = action;
    switch (type) {
        case 'GET_users':
            state = payload;
            break;
            case 'UPDATE_USERS':
                state = payload;
                break;
        case 'DELETE_RESORTS':
            state = state.filter(item => { item.id != payload })
            break;
        case 'ADD_RESORT':
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