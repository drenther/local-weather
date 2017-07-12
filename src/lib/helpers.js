export const round = (x) => Math.round(x * 100) / 100

export const tempConverter = (value, unit) => unit === 'C' ? round(value - 273.15) : round((value * (9/5)) - 459.67)