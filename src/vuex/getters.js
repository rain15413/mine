//test
export const getCount = state => {
    return state.count
}
export const getTag = state => {
    return state.tag
}
export const getCurrent = state => {
    return state.tag.name
}
export const getTagList = state => {
    return state.tagList
}
export const getCollapse = state => {
    return state.collapsed
}