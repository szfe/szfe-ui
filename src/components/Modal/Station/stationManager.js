const stationMap = {}
export const DEFAULT_STATION_NAME = '__defaultModalStation'

export const mount = (name, station) => {
  stationMap[name] = station
}

export const unmount = (name) => {
  delete stationMap[name]
}

export const get = (name) => stationMap[name]

export const keys = () => Object.keys(stationMap)

export const values = () => Object.values(stationMap)
