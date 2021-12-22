export function format_date(node) {
    const date = node.textContent.trim()
    node.textContent = new Date(date).toLocaleDateString(undefined,{day:'numeric',month:'long',year:'numeric'})
}