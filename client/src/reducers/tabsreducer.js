export function tabsReducer(state = { tabValue: "/" }, action) {
    if (action.type === "CHANGE_TAB") {
        return {
            responseObj: {},
            tabValue: action.payload
        };
    }
    return state;
}