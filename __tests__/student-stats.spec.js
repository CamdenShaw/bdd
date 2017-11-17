jest.setMock("../src/process-data", require("../__mocks__/process-data.mock"))

const studentStats = require("../src/student-stats.js")

describe("Student stats", () => {
    beforeEach(() => {
        test = {}
        test.projectName = "aloha"
        test.cohorts = "adp4"
        test.processedData = {
            cohort:{
                [test.cohorts]: {
                    demographics: {
                        averageAge: 26.2,
                        averageExperience: 3.2
                    }
                }
            },
            experience: {
                1:{
                    sampleSize: 2,
                    averageSatisfaction: 2.4
                },
                2:{
                    sampleSize: 4,
                    averageSatisfaction: 3.2
                },
                3:{
                    sampleSize: 0,
                    averageSatisfaction: 5
                },
                4:{
                    sampleSize: 3,
                    averageSatisfaction:3
                }
            },
            projects: {
                [test.projectName]: {
                    pass: {number: 40, satisfaction: 100},
                    fail: {number: 10, satisfaction: 80},
                }
            }
        }
        test.subject = new studentStats(test.processedData)
        test.project = test.subject.queryProject(test.projectName)
    })
    describe("When a given project name exists", () => {
        it("Should return the numbers of students who passed the project", () => {
            expect(test.project.pass.number).toBe(40)
        })
        it("Should tell me the satisfaction level of students who passed the project", () => {
            expect(test.project.pass.satisfaction).toBe(100)
        })
        it("Should tell me the satisfaction level of students who failed the project", () => {
            expect(test.project.fail.number).toBe(10)
        })
    })
    describe("When the project name doesn't exist", () => {
        it("Should return an error.", () => {
            expect(() => test.subject.queryProject("bad name")).toThrow()
        })
    })
    describe("When Querying experience level", () => {
        describe("Average satisfaction for given range of years of experience", () => {
            it("Should return average when satisfaction range exists", () => {
                expect(test.subject.queryRange(1, 4)).toBe(3.4)
            })
            it("Should return undefined when satisfaction level does not exist", () => {
                expect(() => test.subject.queryRange().toThrow())
            })
        })
    })
    describe("When grabbing demographics of a particular cohort", () => {
        describe("Returning object of a particular cohort's demographics", () => {
            it("Should return an object with information in it", () => {
                expect(test.subject.queryCohorts("adp4")).toEqual({"demographics": {
                                                                        "averageAge": 26.2, 
                                                                        "averageExperience": 3.2
                                                                    }
                                                                })
            })
        })
    })
})