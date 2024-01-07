export default (state, action) => {
    const { type, payload } = action;
    switch (type) {
      case 'GET_users':
        return payload; 
        case 'UPDATE_USERS':
          
            state = [...payload];
            return state;
            break;
      case 'FIND_BY_ID':
        return state.filter(item => item.id === payload);
      case 'ADD_RESORT':
        return [...state, payload];
      case 'EDIT_RESORT':
        return state.map(item => (item.id === payload.id ? { ...item, ...payload.updateResort } : item));
      default:
        return state;
    }
    
  };
  