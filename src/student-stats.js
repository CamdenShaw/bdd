const processedData = require("./process-data")

class StudentStats {
    constructor(data) {
        this.data = processedData(data)
    }

    queryProject(name) {
        const project =  this.data.projects[name]
        if(!project) throw new Error("You need a project name.")
        else return project
    }
    queryRange(min, max) {
        const range = Object.keys(this.data.experience).map(num => parseInt(num))
        if(!range.includes(min) || !range.includes(max) || min > max) throw new Error("invalid input, you need a min number and a max number and the min must be smaller than the max.")
        else{
            const average = range.reduce((avg, val) => {
                avg += this.data.experience[val].averageSatisfaction
                return avg
            }, 0)
            return average/range.length
        }
    }
    queryCohorts(cohort) {
        if(typeof cohort !== "string" || cohort === '') throw new Error("dude.... come one.")
        else return this.data.cohort[cohort]
    }
}

module.exports = StudentStats