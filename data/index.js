import driversData from './drivers.json'
import teamsData from './teams.json'
import racesData from './racesData.json'

function simulateServerResponse(file, key, delay = 500) {
  return new Promise((resolve) => {
    setTimeout(() => {
      switch(file) {
        case 'drivers':
          resolve(driversData[key])
          break
        case 'teams':
          resolve(teamsData[key])
          break
        default: 
          resolve(racesData[key])
          break
      }
    }, delay)
  })
}

export {
  simulateServerResponse
}