export const normalizeJobLevelTagName = (name) => {
    if(!name) return 
    return name.replace(/😎 /g,'').replace(/🧓🏽 /g,'').replace(/🐥 /g,'').replace(/🐣 /g,'')
}

export const normalizeJobLangTagName = (name) => {
    if(!name) return 
    return name.replace(/💬 /g,'')
}