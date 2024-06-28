
export function genId( arg:  any []): string{
    const id = arg.length > 0 ? Math.max(...arg.map(item => item.id)) + 1 : 1

    return id.toString()
}