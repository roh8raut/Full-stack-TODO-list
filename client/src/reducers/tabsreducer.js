export function tabsReducer(state = { tabValue: "/" }, action) {
    if (action.type === "CHANGE_TAB") {
        console.log("change tab action", action)
        return {
            ...state,
            tabValue: action.payload
        };
    }
    return state;
}