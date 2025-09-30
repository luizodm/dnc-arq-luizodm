export const getApiData = async (endpoint, params = {}) => {
    try {
        // monta /api/files/<endpoint>?a=1&b=2
        const url = new URL(`/api/files/${endpoint}`, window.location.origin)
        Object.entries(params).forEach(([k, v]) => {
            if (v !== undefined && v !== null) url.searchParams.append(k, v)
        })

        const response = await fetch(url.toString(), { method: 'GET' })

        if (!response.ok) {
            // lança para o caller poder tratar
            throw new Error(`HTTP ${response.status}`)
        }

        return await response.json()
    } catch (error) {
        console.error(error)
        // repassa o erro para quem chamou (ProjectsList, por ex.)
        throw error
    }
}