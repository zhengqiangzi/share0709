let { faker } = require('@faker-js/faker')
const { findIndex } = require('lodash')
let companys = []

Array(10)
  .fill(0)
  .map((x, index) => {
    companys.push({
      name: faker.company.companyName(),
      id: String(index + 1),
      address: (() => {
        let _r = {}
        for (var prop in faker.address) {
          if (faker.address[prop] instanceof Function) {
            _r[prop] = faker.address[prop]()
          }
        }
        return _r
      })(),

      employees: (() => {
        let _list = []
        for (var i = 0; i < 10; i++) {
          let _r = {}
          for (var prop in faker.name) {
            if (faker.name[prop] instanceof Function) {
              _r[prop] = faker.name[prop]()
            }
          }
          //console.log(_r)

          _list.push(_r)
        }

        return _list
      })(),
    })
  })
module.exports = {
  getData: ({ id }) => {
    let _index = findIndex(companys, { id: id })
    return [companys[_index]]
  },
}
